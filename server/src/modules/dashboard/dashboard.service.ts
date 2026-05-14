import { ExportProduct } from "../../models/exportProduct/exportProductSchema";
import { ImportProduct } from "../../models/importProduct/importProductSchema";
import { Order } from "../../models/order/orderSchema";

const getDashboardStats = async()=>{
    const [
        totalOrders,
        undeliveredOrders,
        totalExportProducts,
        totalImportProducts,
        salesAggregate,
        importStockByCategory,
        exportStockByCategory,
        stockBySubCategory
    ] = await Promise.all([
        Order.countDocuments(),
        Order.countDocuments({ orderStatus: { $nin: ["Delivered", "Cancelled"] } }),
        ExportProduct.countDocuments(),
        ImportProduct.countDocuments(),
        Order.aggregate([
            { $match: { orderStatus: { $ne: "Cancelled" } } },
            { $group: { _id: null, total: { $sum: "$total" } } }
        ]),
        ImportProduct.aggregate([
            { $group: { _id: "$category", stock: { $sum: { $ifNull: ["$stock", 0] } } } },
            { $sort: { stock: -1 } }
        ]),
        ExportProduct.aggregate([
            { $group: { _id: "$category", stock: { $sum: { $ifNull: ["$stock", 0] } } } },
            { $sort: { stock: -1 } }
        ]),
        ImportProduct.aggregate([
            { $group: { _id: "$subCategory", stock: { $sum: { $ifNull: ["$stock", 0] } } } },
            { $sort: { stock: -1 } }
        ])
    ]);

    const stockByCategory = mergeStockData(importStockByCategory, exportStockByCategory);

    return {
        totalOrders,
        undeliveredOrders,
        totalSales: salesAggregate[0]?.total || 0,
        totalExportProducts,
        totalImportProducts,
        stockByCategory: stockByCategory.map((item) => ({ label: item._id || "Uncategorized", value: item.stock })),
        stockBySubCategory: stockBySubCategory.map((item) => ({ label: item._id || "Uncategorized", value: item.stock }))
    };
}

const mergeStockData = (importData: any[], exportData: any[]) => {
    const merged: { [key: string]: number } = {};

    importData.forEach(item => {
        const key = item._id || "Uncategorized";
        merged[key] = (merged[key] || 0) + item.stock;
    });

    exportData.forEach(item => {
        const key = item._id || "Uncategorized";
        merged[key] = (merged[key] || 0) + item.stock;
    });

    return Object.entries(merged).map(([_id, stock]) => ({ _id, stock })).sort((a, b) => b.stock - a.stock);
}

export const dashboardService = {
    getDashboardStats
}
