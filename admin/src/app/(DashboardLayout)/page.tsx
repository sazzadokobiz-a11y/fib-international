import { ShoppingCart, FolderOpen, FileText, Quote } from "lucide-react";

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
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">Welcome back! Here&apos;s an overview of your business</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="min-w-0">
                  <p className="text-gray-500 text-xs md:text-sm font-medium truncate">{stat.title}</p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                      <div className={`${stat.color} p-3 rounded-lg shrink-0`}>
                  <Icon className={`${stat.iconColor}`} size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 p-4 md:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Orders</h2>
          <div className="space-y-3 overflow-x-auto">
            {[1, 2, 3].map((_, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-lg flex-col sm:flex-row gap-3">
                <div className="w-full sm:flex-1">
                  <p className="font-medium text-gray-900 text-sm md:text-base">Order #{2089 - idx}</p>
                  <p className="text-xs md:text-sm text-gray-500">March {15 - idx}, 2024</p>
                </div>
                    <span className={`text-xs md:text-sm font-semibold px-2 md:px-3 py-1 rounded-full shrink-0 ${
                  idx === 0 ? "text-green-600 bg-green-50" : idx === 1 ? "text-yellow-600 bg-yellow-50" : "text-blue-600 bg-blue-50"
                }`}>
                  {idx === 0 ? "Completed" : idx === 1 ? "Pending" : "Processing"}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full py-2 px-4 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm md:text-base">
              + Add Product
            </button>
            <button className="w-full py-2 px-4 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm md:text-base">
              + Add Category
            </button>
            <button className="w-full py-2 px-4 rounded-lg border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm md:text-base">
              + Create Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


