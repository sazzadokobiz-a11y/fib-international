import type { QuoteListResponse, QuoteStatus } from "@/types/quote";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const fallbackList: QuoteListResponse = {
    data: [],
    meta: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 1
    }
};

export const getQuotes = async(search: string, status: string, limit: string, page: string)=>{
    try {
        if (!baseUrl) {
            return { success: false, data: fallbackList };
        }

        const params = new URLSearchParams({
            search,
            status,
            limit,
            page
        });

        const res = await fetch(`${baseUrl}/quote/get?${params.toString()}`, {
            cache: "no-store"
        });
        return res.json();
    } catch (error) {
        return {
            success: false,
            message: "Failed to fetch quote data",
            error,
            data: fallbackList
        }
    }
}

export const getQuoteDetail = async(id: string)=>{
    try {
        const res = await fetch(`${baseUrl}/quote/${id}`, {
            cache: "no-store"
        });
        return res.json();
    } catch (error) {
        return { success: false, message: "Failed to fetch quote", error, data: null }
    }
}

export const updateQuoteStatus = async(id: string, status: QuoteStatus)=>{
    try {
        const res = await fetch(`${baseUrl}/quote/status/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status })
        });
        return res.json();
    } catch (error) {
        return { success: false, message: "Failed to update quote status", error }
    }
}

export const getUnreadQuoteCount = async()=>{
    try {
        const res = await fetch(`${baseUrl}/quote/unread-count`, {
            cache: "no-store"
        });
        return res.json();
    } catch (error) {
        return { success: false, data: { count: 0 }, error }
    }
}

export const markAllQuotesRead = async()=>{
    try {
        const res = await fetch(`${baseUrl}/quote/mark-all-read`, {
            method: "PATCH"
        });
        return res.json();
    } catch (error) {
        return { success: false, message: "Failed to mark quotes as read", error }
    }
}
