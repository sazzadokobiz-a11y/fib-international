"use client"

import type { DashboardStats } from "@/types/dashboard";
import { FolderOpen, Package, ShoppingCart, TrendingUp, Truck, Wallet } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const formatNumber = (value: number) => Number(value || 0).toLocaleString();
const formatPrice = (value: number) => `৳${Number(value || 0).toLocaleString()}`;

// ─── Explicit color palette (avoids CSS variable resolution issues) ───────────
const CHART_COLORS = {
  blue: "#3b82f6",
  violet: "#8b5cf6",
  emerald: "#10b981",
  amber: "#f59e0b",
  rose: "#f43f5e",
  cyan: "#06b6d4",
  orange: "#f97316",
  indigo: "#6366f1",
};

// ─── Chart Configs ────────────────────────────────────────────────────────────


const ordersChartConfig = {
  Delivered: { label: "Delivered", color: CHART_COLORS.emerald },
  Undelivered: { label: "Undelivered", color: CHART_COLORS.rose },
} satisfies ChartConfig;

const productsChartConfig = {
  Export: { label: "Export", color: CHART_COLORS.blue },
  Import: { label: "Import", color: CHART_COLORS.orange },
} satisfies ChartConfig;

const salesChartConfig = {
  sales: { label: "Sales (৳)", color: CHART_COLORS.emerald },
} satisfies ChartConfig;

// ─── Stat Card ────────────────────────────────────────────────────────────────

const STAT_STYLES = {
  blue: { bg: "bg-blue-50", icon: "text-blue-600" },
  amber: { bg: "bg-amber-50", icon: "text-amber-600" },
  emerald: { bg: "bg-emerald-50", icon: "text-emerald-600" },
  purple: { bg: "bg-violet-50", icon: "text-violet-600" },
  orange: { bg: "bg-orange-50", icon: "text-orange-600" },
} as const;



interface StatItem {
  title: string;
  value: string;
  icon: React.ElementType;
  badge?: string;
  trend?: string;
  color: keyof typeof STAT_STYLES;
}

function StatCard({ title, value, icon: Icon, badge, trend, color }: StatItem) {
  const s = STAT_STYLES[color];
  return (
    <Card className="group hover:shadow-md transition-all duration-200 border-gray-100 bg-white">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest truncate">
              {title}
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1.5 tabular-nums tracking-tight">
              {value}
            </p>
            {trend && (
              <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                <TrendingUp size={10} className="text-emerald-500" />
                {trend}
              </p>
            )}
          </div>
          <div className={`${s.bg} p-2.5 rounded-xl shrink-0 group-hover:scale-110 transition-transform duration-200`}>
            <Icon size={18} className={s.icon} />
          </div>
        </div>
        {badge && (
          <div className="mt-3 pt-3 border-t border-gray-50">
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-500">
              {badge}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}



// ─── Section Divider ──────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 whitespace-nowrap">
        {children}
      </span>
      <div className="flex-1 h-px bg-gray-100" />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface DashboardChartsProps {
  statsData: DashboardStats;
}

export function DashboardCharts({ statsData }: DashboardChartsProps) {
  const deliveredOrders = statsData.totalOrders - statsData.undeliveredOrders;

  const stats: StatItem[] = [
    {
      title: "Total Orders",
      value: formatNumber(statsData.totalOrders),
      icon: ShoppingCart,
      badge: `${formatNumber(deliveredOrders)} delivered`,
      color: "blue",
    },
    {
      title: "Undelivered",
      value: formatNumber(statsData.undeliveredOrders),
      icon: Truck,
      badge: statsData.totalOrders
        ? `${Math.round((statsData.undeliveredOrders / statsData.totalOrders) * 100)}% pending`
        : undefined,
      color: "amber",
    },
    {
      title: "Total Sales",
      value: formatPrice(statsData.totalSales),
      icon: Wallet,
      trend: "Current period",
      color: "emerald",
    },
    {
      title: "Export Products",
      value: formatNumber(statsData.totalExportProducts),
      icon: FolderOpen,
      color: "purple",
    },
    {
      title: "Import Products",
      value: formatNumber(statsData.totalImportProducts),
      icon: Package,
      color: "orange",
    },
  ];

  const ordersChartData = [
    { name: "Delivered", value: deliveredOrders, fill: CHART_COLORS.emerald },
    { name: "Undelivered", value: statsData.undeliveredOrders, fill: CHART_COLORS.rose },
  ];

  const productsChartData = [
    { name: "Export", value: statsData.totalExportProducts, fill: CHART_COLORS.blue },
    { name: "Import", value: statsData.totalImportProducts, fill: CHART_COLORS.orange },
  ];

  const salesChartData = [
    { month: "Jan", sales: 0 },
    { month: "Feb", sales: 0 },
    { month: "Mar", sales: 0 },
    { month: "Apr", sales: 0 },
    { month: "May", sales: 0 },
    { month: "Jun", sales: statsData.totalSales },
  ];



  return (
    <div className="space-y-8 p-4 md:p-6 bg-gray-50/60 min-h-screen">

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Live overview of your business performance
          </p>
        </div>
      </div>

      {/* ── Stats ── */}
      <section>
        <SectionLabel>Overview</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-3">
          {stats.map((stat) => <StatCard key={stat.title} {...stat} />)}
        </div>
      </section>

      {/* ── Sales Trend — Full Width ── */}
      <section>
        <SectionLabel>Revenue</SectionLabel>
        <Card className="border-gray-100 shadow-sm bg-white">
          <CardHeader className="pb-1">
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div>
                <CardTitle className="text-sm font-semibold text-gray-700">Sales Trend</CardTitle>
                <CardDescription className="text-xs">Monthly revenue — current period</CardDescription>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest">Total</p>
                <p className="text-2xl font-bold text-gray-900 tabular-nums tracking-tight mt-0.5">
                  {formatPrice(statsData.totalSales)}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ChartContainer config={salesChartConfig} className="h-50 w-full">
              <AreaChart data={salesChartData} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={CHART_COLORS.emerald} stopOpacity={0.18} />
                    <stop offset="100%" stopColor={CHART_COLORS.emerald} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f3f4f6" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 11, fill: "#9ca3af" }}
                  tickFormatter={(v) => `৳${Number(v).toLocaleString()}`}
                  width={70}
                />
                <ChartTooltip
                  content={<ChartTooltipContent formatter={(v) => formatPrice(v as number)} />}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke={CHART_COLORS.emerald}
                  strokeWidth={2.5}
                  fill="url(#salesGradient)"
                  dot={{ r: 3.5, fill: CHART_COLORS.emerald, strokeWidth: 0 }}
                  activeDot={{ r: 5.5, fill: CHART_COLORS.emerald, strokeWidth: 2, stroke: "#fff" }}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>

      {/* ── Pie Charts ── */}
      <section>
        <SectionLabel>Distribution</SectionLabel>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Card className="border-gray-100 shadow-sm bg-white">
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-semibold text-gray-700">Order Status</CardTitle>
              <CardDescription className="text-xs">Delivered vs undelivered breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={ordersChartConfig} className="h-65 w-full">
                <PieChart>
                  <ChartTooltip
                    content={<ChartTooltipContent formatter={(v) => formatNumber(v as number)} nameKey="name" hideLabel />}
                  />
                  <Pie
                    data={ordersChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={95}
                    innerRadius={55}
                    paddingAngle={3}
                    strokeWidth={0}
                  >
                    {ordersChartData.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="border-gray-100 shadow-sm bg-white">
            <CardHeader className="pb-1">
              <CardTitle className="text-sm font-semibold text-gray-700">Product Distribution</CardTitle>
              <CardDescription className="text-xs">Export vs import breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={productsChartConfig} className="h-65 w-full">
                <PieChart>
                  <ChartTooltip
                    content={<ChartTooltipContent formatter={(v) => formatNumber(v as number)} nameKey="name" hideLabel />}
                  />
                  <Pie
                    data={productsChartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={95}
                    paddingAngle={3}
                    strokeWidth={0}
                  >
                    {productsChartData.map((entry, index) => (
                      <Cell key={index} fill={entry.fill} />
                    ))}
                  </Pie>
                  <ChartLegend content={<ChartLegendContent nameKey="name" />} />
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}