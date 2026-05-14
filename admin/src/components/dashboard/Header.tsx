"use client";
import { Bell } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getUnreadQuoteCount, markAllQuotesRead } from "@/services/quote";
import { Button } from "../ui/button";
import { adminLogOut } from "@/services/admin";
import { toast } from "sonner";

export function Header() {
    const router = useRouter();
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const fetchUnreadCount = async () => {
            const result = await getUnreadQuoteCount();
            if (result.success) {
                setUnreadCount(result.data.count || 0);
            }
        }

        fetchUnreadCount();
    }, []);

    const handleNotificationClick = async () => {
        if (unreadCount > 0) {
            await markAllQuotesRead();
            setUnreadCount(0);
        }
        router.push("/quote");
    }


    const handleLogout = ()=>{
        adminLogOut();
        toast.success("Log out successfull")
        router.push("/login")
    }

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-4 md:px-6 sticky top-0 z-30 backdrop-blur-2xl">
            <div className="flex items-center gap-2 md:gap-4">
                <button onClick={handleNotificationClick} className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors" aria-label="Unread quotes">
                    <Bell size={20} className="text-gray-600" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 min-w-5 rounded-full bg-red-500 px-1.5 py-0.5 text-center text-xs font-semibold text-white">
                            {unreadCount}
                        </span>
                    )}
                </button>
                <div className="flex items-center gap-2 md:gap-3 pl-2 md:pl-4 border-l border-primary/20">
                    <Button onClick={handleLogout} className="cursor-pointer rounded-xl">Log out</Button>
                </div>
            </div>
        </header>
    );
}

