"use server"
import type { OrderListResponse, OrderStatus } from "@/types/order";
import { fetchWithAuth } from "@/lib/fetchWithAuth";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const fallbackList: OrderListResponse = {
    data: [],
    meta: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1
    }
};

export const getOrders = async(query: {
    search: string;
    status: string;
    dateFrom: string;
    dateTo: string;
    limit: string;
    page: string;
})=>{
    try {
        if (!baseUrl) {
            return { success: false, data: fallbackList };
        }
        const params = new URLSearchParams(query);
        const res = await fetchWithAuth(`${baseUrl}/order/get?${params.toString()}`, {
            cache: "no-store"
        });
        return res.json();
    } catch (error) {
        return {
            success: false,
            message: "Failed to fetch order data",
            error,
            data: fallbackList
        }
    }
}

export const getOrderDetail = async(id: string)=>{
    try {
        const res = await fetchWithAuth(`${baseUrl}/order/${id}`, {
            cache: "no-store"
        });
        return res.json();
    } catch (error) {
        return { success: false, message: "Failed to fetch order", error, data: null }
    }
}

export const updateOrderStatus = async(id: string, status: OrderStatus)=>{
    try {
        const res = await fetchWithAuth(`${baseUrl}/order/status/${id}`, {
            method: "PATCH",
            body: JSON.stringify({ status })
        });
        return res.json();
    } catch (error) {
        return { success: false, message: "Failed to update order status", error }
    }
}

export const sendOrderToCourier = async(id: string)=>{
    try {
        const res = await fetchWithAuth(`${baseUrl}/order/send-courier/${id}`, {
            method: "POST"
        });
        return res.json();
    } catch (error) {
        return { success: false, message: "Failed to send order to courier", error }
    }
}
