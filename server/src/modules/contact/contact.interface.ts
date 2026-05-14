export interface IContact {
    fullName: string;
    email: string;
    message: string;
    isRead: boolean;
    status: "pending" | "replied"
}