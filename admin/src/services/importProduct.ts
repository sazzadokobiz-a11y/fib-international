import { Product } from "@/types/product";


export const addImportProduct = async(payload: Product)=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/import-product/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });
        return res.json();
    } catch (error) {
        console.log(error)
        return error
    }
}




export const getImportProduct = async(search: string, category: string, limit: string, page: string)=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/import-product/get?search=${search}&category=${category}&limit=${limit}&page=${page}`)
        return res.json();
    } catch (error) {
        return {
            success: false,
            message: "Failed to fetch product data",
            error: error
        }
    }
}