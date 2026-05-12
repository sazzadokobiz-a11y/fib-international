import { getDashboardStats } from "@/services/dashboard";
import type { DashboardStats, StockChartItem } from "@/types/dashboard";
import { FolderOpen, Package, ShoppingCart, Truck, Wallet } from "lucide-react";

const formatNumber = (value: number) => Number(value || 0).toLocaleString();
const formatPrice = (value: number) => `৳${Number(value || 0).toLocaleString()}`;

export default async function DashboardPage() {
  const result = await getDashboardStats();
  const statsData: DashboardStats = result.data;

  const stats = [
    { title: "Total Orders", value: formatNumber(statsData.totalOrders), icon: ShoppingCart, color: "bg-blue-50", iconColor: "text-blue-600" },
    { title: "Undelivered Orders", value: formatNumber(statsData.undeliveredOrders), icon: Truck, color: "bg-yellow-50", iconColor: "text-yellow-600" },
    { title: "Total Sales", value: formatPrice(statsData.totalSales), icon: Wallet, color: "bg-green-50", iconColor: "text-green-600" },
    { title: "Export Products", value: formatNumber(statsData.totalExportProducts), icon: FolderOpen, color: "bg-purple-50", iconColor: "text-purple-600" },
    { title: "Import Products", value: formatNumber(statsData.totalImportProducts), icon: Package, color: "bg-orange-50", iconColor: "text-orange-600" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-2 text-sm md:text-base">Welcome back! Here&apos;s an overview of your business</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 md:gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.title} className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 hover:shadow-lg transition-shadow">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <StockChart title="Stock by Category" data={statsData.stockByCategory} />
        <StockChart title="Stock by SubCategory" data={statsData.stockBySubCategory} />
      </div>
    </div>
  );
}

function StockChart({ title, data }: { title: string; data: StockChartItem[] }) {
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      {data.length === 0 ? (
        <p className="rounded-lg bg-gray-50 p-6 text-center text-sm text-gray-500">No stock data available</p>
      ) : (
        <div className="space-y-4">
          {data.slice(0, 8).map((item) => {
            const width = `${Math.max(6, (item.value / maxValue) * 100)}%`;

            return (
              <div key={item.label}>
                <div className="mb-1 flex items-center justify-between gap-4 text-sm">
                  <span className="truncate font-medium text-gray-700">{item.label}</span>
                  <span className="font-semibold text-gray-900">{formatNumber(item.value)}</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                  <div className="h-full rounded-full bg-primary" style={{ width }} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
