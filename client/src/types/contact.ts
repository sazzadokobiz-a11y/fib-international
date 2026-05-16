export interface IContact {
    fullName: string;
    email: string;
    subject: string;
    message: string;
    isRead?: boolean;
    status?: "pending" | "replied"
}