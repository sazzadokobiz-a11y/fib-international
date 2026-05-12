export type QuoteStatus = "Pending" | "Contacted" | "Closed";

export type Quote = {
    _id: string;
    fullName: string;
    companyName: string;
    email: string;
    phoneNumber: string;
    country: string;
    message: string;
    requestedQuantity: number;
    product: {
        productId: string;
        name: string;
        slug: string;
        thumbnail?: string;
        category?: string;
        subCategory?: string;
    };
    status: QuoteStatus;
    isRead: boolean;
    createdAt: string;
    updatedAt: string;
}

export type QuoteListResponse = {
    data: Quote[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}
