import type { CartItem } from "@/context/CartContext";

export type CheckoutPayload = {
    customer: {
        fullName: string;
        mobileNumber: string;
        shippingAddress: string;
        thana: string;
        district: string;
    };
    products: {
        productId: string;
        quantity: number;
    }[];
    shipping: number;
}

export const createOrder = async(payload: CheckoutPayload) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.BASE_API_URL;

    if (!baseUrl) {
        return { success: false, message: "API URL is not configured" };
    }

    const res = await fetch(`${baseUrl}/order/create`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const result = await res.json();
    return result;
}

export const mapCartItemsToOrderProducts = (items: CartItem[]) => {
    return items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity
    }));
}
