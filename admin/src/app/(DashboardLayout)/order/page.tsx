"use client";

import { getOrders, sendOrderToCourier, updateOrderStatus } from "@/services/order";
import type { Order, OrderListResponse, OrderStatus, CourierName } from "@/types/order";
import { PaginationControls } from "@/components/shared/PaginationControls";
import { ConfirmationDialog } from "@/components/shared/ConfirmationDialog";
import { Download, Eye, Search, Send } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const statuses: OrderStatus[] = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

const emptyOrders: OrderListResponse = {
  data: [],
  meta: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1
  }
};

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case "Delivered":
      return "bg-green-50 text-green-700";
    case "Processing":
      return "bg-blue-50 text-blue-700";
    case "Shipped":
      return "bg-purple-50 text-purple-700";
    case "Cancelled":
      return "bg-red-50 text-red-700";
    default:
      return "bg-yellow-50 text-yellow-700";
  }
};

const formatPrice = (value: number) => `৳${Number(value || 0).toLocaleString()}`;
const formatDate = (date: string) => new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" }).format(new Date(date));
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" }[char] || char));

const buildInvoiceHtml = (order: Order) => `
<!doctype html>
<html>
  <head>
    <title>Invoice ${escapeHtml(order.orderId)}</title>
    <style>
      body { font-family: Arial, sans-serif; color: #222; margin: 32px; }
      .header { display: flex; align-items: center; justify-content: space-between; border-bottom: 2px solid #5D4037; padding-bottom: 16px; }
      .logo { width: 72px; height: 72px; border-radius: 12px; background: #5D4037; color: #fff; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 22px; }
      h1 { color: #5D4037; margin: 0; }
      table { width: 100%; border-collapse: collapse; margin-top: 24px; }
      th, td { border-bottom: 1px solid #ddd; padding: 10px; text-align: left; }
      th { background: #f5f0e6; }
      .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 24px; }
      .summary { margin-left: auto; width: 320px; margin-top: 24px; }
      .summary div { display: flex; justify-content: space-between; padding: 8px 0; }
      .total { border-top: 2px solid #5D4037; font-weight: 800; color: #5D4037; }
      .print { margin-top: 24px; padding: 10px 16px; background: #5D4037; color: #fff; border: 0; border-radius: 8px; cursor: pointer; }
      @media print { .print { display: none; } body { margin: 0; } }
    </style>
  </head>
  <body>
    <div class="header">
      <div style="display:flex;align-items:center;gap:16px">
        <div><img src="/assets/logo.png" width="100" height="100"/></div>
        <div>
          <h1>Family JV International</h1>
          <p>Import Order Invoice</p>
        </div>
      </div>
      <div>
        <strong>Invoice</strong><br />
        ${escapeHtml(order.orderId)}<br />
        ${escapeHtml(formatDate(order.createdAt))}
      </div>
    </div>
    <div class="grid">
      <div>
        <h3>Order Info</h3>
        <p>Status: ${escapeHtml(order.orderStatus)}</p>
        <p>Payment: ${escapeHtml(order.paymentMethod)} (${escapeHtml(order.paymentStatus)})</p>
      </div>
      <div>
        <h3>Customer Info</h3>
        <p>${escapeHtml(order.customer.fullName)}</p>
        <p>${escapeHtml(order.customer.mobileNumber)}</p>
        <p>${escapeHtml(order.customer.shippingAddress)}, ${escapeHtml(order.customer.thana)}, ${escapeHtml(order.customer.district)}</p>
      </div>
    </div>
    <table>
      <thead>
        <tr><th>Product</th><th>SKU</th><th>Qty</th><th>Price</th><th>Total</th></tr>
      </thead>
      <tbody>
        ${order.products.map((product) => `
          <tr>
            <td>${escapeHtml(product.name)}</td>
            <td>${escapeHtml(product.sku || "N/A")}</td>
            <td>${product.quantity}</td>
            <td>${formatPrice(product.price)}</td>
            <td>${formatPrice(product.total)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
    <div class="summary">
      <div><span>Subtotal</span><strong>${formatPrice(order.subtotal)}</strong></div>
      <div><span>Shipping</span><strong>${formatPrice(order.shipping)}</strong></div>
      <div class="total"><span>Total</span><strong>${formatPrice(order.total)}</strong></div>
    </div>
    <button class="print" onclick="window.print()">Print Invoice</button>
  </body>
</html>
`;

export default function OrderPage() {
  const [orders, setOrders] = useState<OrderListResponse>(emptyOrders);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [page, setPage] = useState("1");
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingOrder, setPendingOrder] = useState<Order | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [selectedCourier, setCourier] = useState<CourierName>();


  const getDateRange = (filter: string) => {
    const today = new Date();
    let dateFrom = "";
    const dateTo = today.toISOString().split('T')[0];

    switch (filter) {
      case "today":
        dateFrom = dateTo;
        break;
      case "last7days":
        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 7);
        dateFrom = sevenDaysAgo.toISOString().split('T')[0];
        break;
      case "lastMonth":
        const oneMonthAgo = new Date(today);
        oneMonthAgo.setMonth(today.getMonth() - 1);
        dateFrom = oneMonthAgo.toISOString().split('T')[0];
        break;
      case "lastYear":
        const oneYearAgo = new Date(today);
        oneYearAgo.setFullYear(today.getFullYear() - 1);
        dateFrom = oneYearAgo.toISOString().split('T')[0];
        break;
      default:
        return { dateFrom: "", dateTo: "" };
    }

    return { dateFrom, dateTo };
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      const { dateFrom, dateTo } = getDateRange(dateFilter);
      const result = await getOrders({ search, status, dateFrom, dateTo, limit: "10", page });
      setOrders(result.data || emptyOrders);
      setIsLoading(false);
    }

    fetchOrders();
  }, [search, status, dateFilter, page]);

  const updateQuery = (key: string, value: string) => {
    if (key === "search") {
      setSearch(value);
    }
    if (key === "status") {
      setStatus(value);
    }
    if (key === "dateFilter") {
      setDateFilter(value);
    }
    setPage("1");
  };

  const handleStatusUpdate = async (id: string, nextStatus: OrderStatus) => {
    const toastId = toast.loading("Updating order status...");
    const result = await updateOrderStatus(id, nextStatus);

    if (result.success) {
      toast.success("Order status updated", { id: toastId });
      setOrders((current) => ({
        ...current,
        data: current.data.map((order) => order._id === id ? result.data : order)
      }));

      if (nextStatus === "Delivered" && result.data?.courierStatus !== "Sent") {
        await handleCourierSend(result.data);
      }
    } else {
      toast.error(result.message || "Failed to update order status", { id: toastId });
    }
  };

  const handleCourierSend = async (order: Order) => {
    if(!selectedCourier){
      toast.error("Please select a courier")
      return
    }
    setPendingOrder(order);
    setShowConfirm(true);
  };


  const confirmCourierSend = async () => {
    if (!pendingOrder) return;

    setIsSending(true);
    const toastId = toast.loading("Sending order to courier...");
    const result = await sendOrderToCourier(pendingOrder._id, selectedCourier as CourierName);


    if (result.success) {
      toast.success("Order sent to courier", { id: toastId });
      setOrders((current) => ({
        ...current,
        data: current.data.map((item) => item._id === pendingOrder._id ? result.data : item)
      }));
    } else {
      toast.error(result.message || "Failed to send courier request", { id: toastId });
    }

    setIsSending(false);
    setShowConfirm(false);
    setPendingOrder(null);
  };

  const handleInvoicePrint = (order: Order) => {
    const printWindow = window.open("", "_blank", "width=900,height=700");
    if (!printWindow) {
      toast.error("Unable to open print window");
      return;
    }
    printWindow.document.write(buildInvoiceHtml(order));
    printWindow.document.close();
    printWindow.focus();
  };

  const deliveredCount = orders.data.filter((order) => order.orderStatus === "Delivered").length;
  const pendingCount = orders.data.filter((order) => order.orderStatus === "Pending").length;
  const processingCount = orders.data.filter((order) => order.orderStatus === "Processing").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-500 mt-2">Manage customer orders</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-500 text-sm font-medium">Total Orders</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{orders.meta.total}</p>
          <p className="text-gray-500 text-sm mt-2">All orders</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-500 text-sm font-medium">Delivered</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{deliveredCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-500 text-sm font-medium">Processing</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{processingCount}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-500 text-sm font-medium">Pending</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{pendingCount}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6 grid gap-3 lg:grid-cols-[1fr_auto_auto]">
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => updateQuery("search", e.target.value)}
              placeholder="Search orders..."
              className="bg-transparent outline-none text-sm text-gray-600 w-full"
            />
          </div>
          <select
            value={dateFilter}
            onChange={(e) => updateQuery("dateFilter", e.target.value)}
            className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-[#5D4037]"
          >
            <option value="">All Dates</option>
            <option value="today">Today</option>
            <option value="last7days">Last 7 Days</option>
            <option value="lastMonth">Past Month</option>
            <option value="lastYear">Past Year</option>
          </select>
          <select
            value={status}
            onChange={(e) => updateQuery("status", e.target.value)}
            className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-[#5D4037]"
          >
            <option value="">All Statuses</option>
            {statuses.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-362.5">
            <thead>
              <tr className="border-b border-gray-200 text-nowrap">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">SL</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Order ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Products Info</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Subtotal</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Shipping</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Total</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Payment</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Update Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Courier Status</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Courier Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Select Courier</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Send Courier</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Invoice</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td className="py-8 text-center text-gray-500" colSpan={14}>Loading orders...</td>
                </tr>
              ) : orders.data.length === 0 ? (
                <tr>
                  <td className="py-8 text-center text-gray-500" colSpan={14}>No orders found</td>
                </tr>
              ) : orders.data.map((order, index) => (
                <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50 text-nowrap">
                  <td className="py-3 px-4 font-medium text-gray-900">{(orders.meta.page - 1) * orders.meta.limit + index + 1}</td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-gray-900">{order.orderId}</p>
                    <p className="text-xs text-gray-500">{formatDate(order.createdAt)}</p>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    <p className="font-medium text-gray-900">{order.customer.fullName}</p>
                    <p className="text-xs">{order.customer.mobileNumber}</p>
                    <p className="text-xs">{order.customer.thana}, {order.customer.district}</p>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    <div className="space-y-1">
                      {order.products.map((product) => (
                        <p key={`${order._id}-${product.productId}`} className="text-xs">
                          <span className="font-medium text-gray-900">{product.name}</span> x {product.quantity}
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-900">{formatPrice(order.subtotal)}</td>
                  <td className="py-3 px-4 font-semibold text-gray-900">{formatPrice(order.shipping)}</td>
                  <td className="py-3 px-4 font-bold text-gray-900">{formatPrice(order.total)}</td>
                  <td className="py-3 px-4 text-gray-600">
                    <p>{order.paymentMethod}</p>
                    <p className="text-xs">{order.paymentStatus}</p>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.orderStatus)}`}>
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={order.orderStatus}
                      onChange={(e) => handleStatusUpdate(order._id, e.target.value as OrderStatus)}
                      className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#5D4037]"
                    >
                      {statuses.map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${order.courierStatus === "Sent" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                      {order.courierStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="text-gray-500">{order.courier || "—"}</span>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      // value={order.courier}
                      onChange={(e) => setCourier(e.target.value as CourierName)}
                      className="rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[#5D4037]"
                    >

                      <option value="">Select a courier</option>
                      <option value="steadfast">Steadfast</option>
                      {/* <option value="Pathao">Pathao</option>
                      <option value="redx">Redx</option> */}
                    </select>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleCourierSend(order)}
                        className="inline-flex items-center gap-1 rounded-lg bg-green-50 px-2 py-1 text-xs font-semibold text-green-700 hover:bg-green-100"
                      >
                        <Send size={14} />
                        Send
                      </button>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      type="button"
                      onClick={() => handleInvoicePrint(order)}
                      className="inline-flex items-center gap-1 rounded-lg bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700 hover:bg-blue-100"
                    >
                      <Download size={14} />
                      Print
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link href={`/order/${order._id}`} className="inline-flex p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors">
                      <Eye size={18} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {orders.meta.totalPages > 1 && (
          <PaginationControls meta={orders.meta} onPageChange={(pageNumber) => setPage(String(pageNumber))} />
        )}
      </div>

      <ConfirmationDialog
        open={showConfirm}
        title="Send to Courier"
        description={`Are you sure you want to send ${pendingOrder?.orderId} to courier?`}
        onConfirm={confirmCourierSend}
        onCancel={() => {
          setShowConfirm(false);
          setPendingOrder(null);
        }}
        confirmText="Send"
        cancelText="Cancel"
        isLoading={isSending}
      />
    </div>
  );
}
