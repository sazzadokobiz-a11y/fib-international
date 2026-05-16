"use server"
import { fetchWithAuth } from "@/lib/fetchWithAuth";

export const getAllBanners = async () => {
    try {
        const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/banner/all`);
        return res.json();
    } catch (error) {
        console.log(error);
        return { success: false, message: "Failed to fetch banners", data: [] };
    }
};

export const createBanner = async (banner: {
    title: string;
    subtitle: string;
    image: string;
    type: string;
    isActive?: boolean;
    order?: number;
}) => {
    try {
        const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/banner/create`, {
            method: "POST",
            body: JSON.stringify(banner),
        });
        return res.json();
    } catch (error) {
        return { success: false, message: "Failed to create banner", error };
    }
};

export const updateBanner = async (
    id: string,
    banner: Partial<{
        title: string;
        subtitle: string;
        image: string;
        type: string;
        isActive: boolean;
        order: number;
    }>
) => {
    try {
        const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/banner/update/${id}`, {
            method: "PUT",
            body: JSON.stringify(banner),
        });
        return res.json();
    } catch (error) {
        return { success: false, message: "Failed to update banner", error };
    }
};

export const deleteBanner = async (id: string) => {
    try {
        const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/banner/delete/${id}`, {
            method: "DELETE",
        });
        return res.json();
    } catch (error) {
        return { success: false, message: "Failed to delete banner", error };
    }
};
