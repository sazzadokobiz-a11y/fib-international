import { getDashboardStats } from "@/services/dashboard";
import { DashboardCharts } from "@/components/dashboard-charts";

export default async function DashboardPage() {
  const result = await getDashboardStats();
  console.log(result)
  const statsData = result.data;

  return <DashboardCharts statsData={statsData} />;
}
