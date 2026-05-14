"use server"
import { Product } from "@/types/product";
import { fetchWithAuth } from "@/lib/fetchWithAuth";


export const addImportProduct = async(payload: Product)=>{
    try {
        const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/import-product/create`, {
            method: "POST",
            body: JSON.stringify(payload)
        });
        return res.json();
    } catch (error) {
        console.log(error)
        return error
    }
}




export const getImportProduct = async(search: string, category: string, subCategory:string, limit: string, page: string)=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/import-product/get?search=${search}&category=${category}&subCategory=${subCategory}&limit=${limit}&page=${page}`)
        return res.json();
    } catch (error) {
        return {
            success: false,
            message: "Failed to fetch product data",
            error: error
        }
    }
}




export const getImportProductDetail = async(id: string)=>{
    try {
        const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/import-product/get/${id}`)
        return res.json();
    } catch (error) {
        return {
            success: false,
            message: "Failed to fetch product data",
            error: error
        }
    }
}




export const updateImportProduct = async(id: string, payload: Product)=>{
    try {
        const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/import-product/update/${id}`,{
            method: "PUT",
            body: JSON.stringify(payload)
        });
        return res.json()
    } catch (error) {
        return {
            success: false,
            message: "Failed to fetch product data",
            error: error
        }
    }
}



export const deleteImportProduct = async(id: string)=>{
    try {
        const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/import-product/delete/${id}`, {
            method: "DELETE"
        });
        return res.json();
    } catch (error) {
        return {
            success: false,
            message: "Failed to delete product",
            error: error
        }
    }
}