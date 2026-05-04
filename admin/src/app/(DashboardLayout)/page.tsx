import { BarChart3, ShoppingCart, FolderOpen, FileText, Quote } from "lucide-react";

export default function DashboardPage() {
  const stats = [
    { title: "Total Orders", value: "2,453", icon: ShoppingCart, color: "bg-blue-50", iconColor: "text-blue-600" },
    { title: "Total Products", value: "1,280", icon: FolderOpen, color: "bg-purple-50", iconColor: "text-purple-600" },
    { title: "Total Categories", value: "45", icon: FileText, color: "bg-green-50", iconColor: "text-green-600" },
    { title: "Total Quotes", value: "328", icon: Quote, color: "bg-orange-50", iconColor: "text-orange-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-500 mt-2">Welcome back! Here&apos;s an overview of your business</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className={`${stat.iconColor}`} size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Order #2089</p>
                <p className="text-sm text-gray-500">March 15, 2024</p>
              </div>
              <span className="text-sm font-semibold text-green-600">Completed</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Order #2088</p>
                <p className="text-sm text-gray-500">March 14, 2024</p>
              </div>
              <span className="text-sm font-semibold text-yellow-600">Pending</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">Order #2087</p>
                <p className="text-sm text-gray-500">March 13, 2024</p>
              </div>
              <span className="text-sm font-semibold text-blue-600">Processing</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full py-2 px-4 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
              + Add Product
            </button>
            <button className="w-full py-2 px-4 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
              + Add Category
            </button>
            <button className="w-full py-2 px-4 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
              + Create Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

