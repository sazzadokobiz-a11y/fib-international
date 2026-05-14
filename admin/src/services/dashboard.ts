import type { DashboardStats } from "@/types/dashboard";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

const emptyStats: DashboardStats = {
    totalOrders: 0,
    undeliveredOrders: 0,
    totalSales: 0,
    totalExportProducts: 0,
    totalImportProducts: 0,
    stockByCategory: [],
    stockBySubCategory: []
};

export const getDashboardStats = async()=>{
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!baseUrl) {
            return { success: false, data: emptyStats };
        }

        const res = await fetchWithAuth(`${baseUrl}/dashboard/stats`, {
            cache: "no-store"
        });

        if (!res.ok) {
            return { success: false, data: emptyStats };
        }

        return res.json();
    } catch (error) {
        return { success: false, data: emptyStats, error };
    }
}
