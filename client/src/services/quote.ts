export type QuoteRequestPayload = {
    fullName: string;
    companyName: string;
    email: string;
    phoneNumber: string;
    country: string;
    message: string;
    requestedQuantity: number;
    productId: string;
}

export const submitQuoteRequest = async(payload: QuoteRequestPayload) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.BASE_API_URL;

    if (!baseUrl) {
        return { success: false, message: "API URL is not configured" };
    }

    const res = await fetch(`${baseUrl}/quote/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();
    return result;
}
