import { Plus, Search, Edit2, Eye, Download } from "lucide-react";

export default function OrderPage() {
  const orders = [
    { id: "ORD-001", customer: "John Smith", date: "Mar 15, 2024", total: "$2,499", status: "Completed" },
    { id: "ORD-002", customer: "Sarah Johnson", date: "Mar 14, 2024", total: "$899", status: "Pending" },
    { id: "ORD-003", customer: "Mike Davis", date: "Mar 13, 2024", total: "$3,299", status: "Processing" },
    { id: "ORD-004", customer: "Emma Wilson", date: "Mar 12, 2024", total: "$599", status: "Completed" },
    { id: "ORD-005", customer: "David Brown", date: "Mar 11, 2024", total: "$1,299", status: "Shipped" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-50 text-green-700";
      case "Pending":
        return "bg-yellow-50 text-yellow-700";
      case "Processing":
        return "bg-blue-50 text-blue-700";
      case "Shipped":
        return "bg-purple-50 text-purple-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-500 mt-2">Manage customer orders</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-all hover:opacity-90"
          style={{ backgroundColor: "#5D4037" }}
        >
          <Plus size={20} />
          Create Order
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-500 text-sm font-medium">Total Orders</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">2,453</p>
          <p className="text-green-600 text-sm mt-2">+12% from last month</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-500 text-sm font-medium">Completed</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">1,890</p>
          <p className="text-gray-500 text-sm mt-2">77% of total</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-500 text-sm font-medium">Processing</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">312</p>
          <p className="text-gray-500 text-sm mt-2">13% of total</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-500 text-sm font-medium">Pending</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">251</p>
          <p className="text-gray-500 text-sm mt-2">10% of total</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg mb-6 max-w-md">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search orders..."
            className="bg-transparent outline-none text-sm text-gray-600 w-full"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Order ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Customer</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Total</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{order.id}</td>
                  <td className="py-3 px-4 text-gray-600">{order.customer}</td>
                  <td className="py-3 px-4 text-gray-600">{order.date}</td>
                  <td className="py-3 px-4 font-semibold text-gray-900">{order.total}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 hover:bg-green-50 rounded-lg text-green-600 transition-colors">
                        <Download size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
