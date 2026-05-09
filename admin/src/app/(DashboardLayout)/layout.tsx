import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
                <Header />
                <main className="flex-1 min-w-0 overflow-auto p-4 lg:p-6 pt-0">
                    {children}
                </main>
            </div>
        </div>
    );
}
