import { Product } from "@/types/product";

export const addExportProduct = async (data: Product)=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/export-product/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        return res.json()
    } catch (error) {
        return {
            success: false,
            message: "Failed to add product",
            error: error instanceof Error ? error.message : error
        }
    }
}