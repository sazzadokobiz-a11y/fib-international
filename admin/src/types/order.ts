export type OrderStatus = "Pending" | "Processing" | "Shipped" | "Delivered" | "Cancelled";

export type OrderProduct = {
    productId: string;
    name: string;
    slug: string;
    sku?: string;
    thumbnail?: string;
    price: number;
    quantity: number;
    total: number;
}

export type Order = {
    _id: string;
    orderId: string;
    customer: {
        fullName: string;
        mobileNumber: string;
        shippingAddress: string;
        thana: string;
        district: string;
    };
    products: OrderProduct[];
    subtotal: number;
    shipping: number;
    total: number;
    paymentMethod: string;
    paymentStatus: string;
    orderStatus: OrderStatus;
    courierStatus: string;
    courier?: string;
    courierResponse?: unknown;
    createdAt: string;
    updatedAt: string;
}

export type OrderListResponse = {
    data: Order[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}
