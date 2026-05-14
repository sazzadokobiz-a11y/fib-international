"use server"
import { cookies } from "next/headers";

interface FetchOptions extends RequestInit {
    headers?: Record<string, string>;
}

/**
 * Centralized fetch utility for authenticated API requests
 * Automatically includes the token from cookies in all requests
 * Supports both Cookie header and Authorization header methods
 */
export const fetchWithAuth = async (
    url: string,
    options: FetchOptions = {}
): Promise<Response> => {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
    };

    // Include token in both ways for maximum compatibility
    if (token) {
        // Method 1: Include in Cookie header (for Express cookie parsing)
        headers["Cookie"] = cookieStore.toString();

        // Method 2: Include as Authorization header (standard approach)
        headers["Authorization"] = `Bearer ${token}`;
    }

    // Preserve existing headers while adding auth headers
    const finalOptions: RequestInit = {
        ...options,
        credentials: "include",
        headers,
    };

    return fetch(url, finalOptions);
};
