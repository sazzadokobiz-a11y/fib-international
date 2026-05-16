"use server"
import { fetchWithAuth } from "@/lib/fetchWithAuth";

export const getAllContents = async () => {
    try {
        const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/content/all`);
        return res.json();
    } catch (error) {
        console.log(error);
        return { success: false, message: "Failed to fetch contents", data: [] };
    }
};

export const getContentByKey = async (key: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/content/key/${key}`);
        return res.json();
    } catch (error) {
        return { success: false, message: "Failed to fetch content", error };
    }
};

export const createContent = async (content: {
    key: string;
    title: string;
    subtitle?: string;
    body: string;
    image?: string;
    isActive?: boolean;
    metaTitle?: string;
    metaDescription?: string;
}) => {
    try {
        const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/content/create`, {
            method: "POST",
            body: JSON.stringify(content),
        });
        return res.json();
    } catch (error) {
        return { success: false, message: "Failed to create content", error };
    }
};

export const updateContent = async (
    id: string,
    content: Partial<{
        title: string;
        subtitle: string;
        body: string;
        image: string;
        isActive: boolean;
        metaTitle: string;
        metaDescription: string;
    }>
) => {
    try {
        const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/content/update/${id}`, {
            method: "PUT",
            body: JSON.stringify(content),
        });
        return res.json();
    } catch (error) {
        return { success: false, message: "Failed to update content", error };
    }
};

export const deleteContent = async (id: string) => {
    try {
        const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/content/delete/${id}`, {
            method: "DELETE",
        });
        return res.json();
    } catch (error) {
        return { success: false, message: "Failed to delete content", error };
    }
};
