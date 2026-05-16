"use server"

import { IContact } from "@/types/contact"

export const sendMessage = async(payLoad: IContact)=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payLoad)
        })
        return res.json();
    } catch (error) {
        console.log(error)
        return {success: false, message: "Message not sent", error: error}
    }
}