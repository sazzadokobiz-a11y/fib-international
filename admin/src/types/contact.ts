export interface IContact {
    _id?: string;
    fullName: string;
    email: string;
    subject: string;
    message: string;
    isRead: boolean;
    status: "pending" | "replied",
    createdAt?: string;
    updatedAt?: string;
    __v?: number
}


export interface IContactResponse {
    data: IContact[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}