"use server"
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers"

export const loginAdmin = async(payload: {email: string, password: string})=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/admin-login`, {
            method: "Post", 
            headers: {
                "Content-Type": "Application/json"
            },
            body: JSON.stringify(payload)
        })
        const result = await res.json()
        const storeCookie = await cookies()
        if (result.success) {
            storeCookie.set("token", result.data.token)
        }
        return result
    } catch (error) {
        return {success: false, message: "login failed", error: error}
    }
}



export const getAdmin = async () => {
    try {
        const storeCookie = await cookies();
        const currentTime = Date.now() / 1000;
        const token = storeCookie.get("token")?.value
        let decoded = null;
        if (token) {
            decoded = await jwtDecode(token);
            if (decoded.exp < currentTime) {
                storeCookie.delete("token");
                decoded = null;
                return null
            }
            return decoded;
        } else {
            return null
        }
    } catch (error) {
        return {success: false, message: "Admin fetch error", error: error}
    }
}