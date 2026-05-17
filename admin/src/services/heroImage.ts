"use server"
import { fetchWithAuth } from "@/lib/fetchWithAuth";

export const getHeroImage = async () => {
    try {
        const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/hero-image/all`);
        return res.json();
    } catch (error) {
        console.log(error);
        return { success: false, message: "Failed to fetch hero image", data: [] };
    }
};



export const createHeroImage = async (hero: {
    image: string;
    isActive?: boolean;
}) => {
    try {
        const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/hero-image/create`, {
            method: "POST",
            body: JSON.stringify(hero),
        });
        return res.json();
    } catch (error) {
        return { success: false, message: "Failed to create hero image", error };
    }
};



export const updateHeroImage = async (
    id: string,
    hero: Partial<{
        title: string;
        subtitle: string;
        content: string;
        image: string;
        isActive: boolean;
    }>
) => {
    try {
        const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/hero-image/update/${id}`, {
            method: "PUT",
            body: JSON.stringify(hero),
        });
        return res.json();
    } catch (error) {
        return { success: false, message: "Failed to update hero image", error };
    }
};



export const deleteHeroImage = async (id: string) => {
    try {
        const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/hero-image/delete/${id}`, {
            method: "DELETE",
        });
        return res.json();
    } catch (error) {
        return { success: false, message: "Failed to delete hero image", error };
    }
};