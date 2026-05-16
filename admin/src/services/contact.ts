"use server"

import { fetchWithAuth } from "@/lib/fetchWithAuth"

export const getAllCotact = async (status: string)=>{
    try {
        const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/contact/get?status=${status}`);
        return res.json();
    } catch (error) {
        console.log(error)
        return {status: 500, success: false, message: "Contact can't fetch", error: error}
    }
}


export const getContactStats = async()=>{
    try {
        const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/contact/get-stats`);
        return res.json();
    } catch (error) {
        console.log(error)
        return { status: 500, success: false, message: "Contact stats can't fetch", error: error }
    }
}


export const updateContactStatus = async(id: string, status: {status: string})=>{
    try {
        const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/contact/status/${id}`, { 
            method: "PUT",
            headers:  {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(status)
        });
        return res.json();
    } catch (error) {
        console.log(error)
        return error
    }
}


export const getUnreadMessage = async()=>{
    try {
        const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/contact/unread-count`);
        return res.json();
    } catch (error) {
        console.log(error)
        return error
    }
}


export const markAssRead = async(id: string)=>{
    try {
        const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/contact/read/${id}`, {
            method: "PATCH",
        })
        return res.json();
    } catch (error) {
        console.log(error)
        return error
    }
}



export const deleteContact = async(id: string)=>{
    try {
        const res = await fetchWithAuth(`${process.env.NEXT_PUBLIC_API_URL}/contact/delete/${id}`, {method: "DELETE"});
        return res.json();
    } catch (error) {
        console.log(error)
        return error
    }
}