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




export const getExportProduct = async(search: string, category: string, subCategory: string, limit: string, page: string)=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/export-product/get-all?search=${search}&category=${category}&subCategory=${subCategory}&limit=${limit}&page=${page}`)
        return res.json();
    } catch (error) {
        return {
            success: false,
            message: "Failed to fetch product data",
            error: error
        }
    }
}



export const getExportProductDetail = async(id: string)=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/export-product/get/${id}`)
        return res.json();
    } catch (error) {
        return {
            success: false,
            message: "Failed to fetch product data",
            error: error
        }
    }
}



export const updateExportProduct = async(id: string, payload: Product)=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/export-product/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })
        return res.json();
    } catch (error) {
        return {
            success: false,
            message: "Failed to fetch product data",
            error: error
        }
    }
}