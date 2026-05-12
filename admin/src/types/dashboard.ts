export type StockChartItem = {
    label: string;
    value: number;
}

export type DashboardStats = {
    totalOrders: number;
    undeliveredOrders: number;
    totalSales: number;
    totalExportProducts: number;
    totalImportProducts: number;
    stockByCategory: StockChartItem[];
    stockBySubCategory: StockChartItem[];
}
