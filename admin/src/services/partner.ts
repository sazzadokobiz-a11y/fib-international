"use server"
import { fetchWithAuth } from "@/lib/fetchWithAuth";

export const getAllPartners = async () => {
    try {
        const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/partner/all`);
        return res.json();
    } catch (error) {
        console.log(error);
        return { success: false, message: "Failed to fetch partners", data: [] };
    }
};

export const createPartner = async (partner: {
    name: string;
    logo: string;
    website?: string;
    country?: string;
    isActive?: boolean;
    order?: number;
}) => {
    try {
        const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/partner/create`, {
            method: "POST",
            body: JSON.stringify(partner),
        });
        return res.json();
    } catch (error) {
        return { success: false, message: "Failed to create partner", error };
    }
};

export const updatePartner = async (
    id: string,
    partner: Partial<{
        name: string;
        logo: string;
        website: string;
        country: string;
        isActive: boolean;
        order: number;
    }>
) => {
    try {
        const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/partner/update/${id}`, {
            method: "PUT",
            body: JSON.stringify(partner),
        });
        return res.json();
    } catch (error) {
        return { success: false, message: "Failed to update partner", error };
    }
};

export const deletePartner = async (id: string) => {
    try {
        const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/partner/delete/${id}`, {
            method: "DELETE",
        });
        return res.json();
    } catch (error) {
        return { success: false, message: "Failed to delete partner", error };
    }
};
