import { getOrderDetail } from "@/services/order";
import type { Order } from "@/types/order";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const formatPrice = (value: number) => `৳${Number(value || 0).toLocaleString()}`;
const formatDate = (date: string) => new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric"
}).format(new Date(date));

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getOrderDetail(id);
  const order = result.data as Order | null;

  if (!order) {
    return (
      <div className="space-y-6">
        <Link href="/order" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary">
          <ChevronLeft size={18} />
          Back to Orders
        </Link>
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-500">Order not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/order" className="p-2 hover:bg-gray-100 rounded-lg">
          <ChevronLeft size={20} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Order #{order.orderId}</h1>
          <p className="text-gray-500 mt-1">Order Details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Information</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <Info label="Order ID" value={order.orderId} />
              <Info label="Order Date" value={formatDate(order.createdAt)} />
              <Info label="Customer" value={order.customer.fullName} />
              <Info label="Mobile" value={order.customer.mobileNumber} />
              <Info label="Status" value={order.orderStatus} />
              <Info label="Payment" value={`${order.paymentMethod} (${order.paymentStatus})`} />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Product</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">SKU</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Qty</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.products.map((product) => (
                    <tr key={`${order._id}-${product.productId}`} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-900">{product.name}</td>
                      <td className="py-3 px-4 text-gray-700">{product.sku || "N/A"}</td>
                      <td className="py-3 px-4 text-gray-700">{product.quantity}</td>
                      <td className="py-3 px-4 text-gray-700">{formatPrice(product.price)}</td>
                      <td className="py-3 px-4 font-semibold text-gray-900">{formatPrice(product.total)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h2>
            <p className="text-gray-700">{order.customer.shippingAddress}, {order.customer.thana}, {order.customer.district}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3">
              <Summary label="Subtotal" value={formatPrice(order.subtotal)} />
              <Summary label="Shipping" value={formatPrice(order.shipping)} />
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg">{formatPrice(order.total)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Courier</h3>
            <Info label="Courier" value={order.courier || "N/A"} />
            <div className="mt-4">
              <Info label="Courier Status" value={order.courierStatus} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}
