"use client";
import { Bell, User } from "lucide-react";

export function Header() {
    return (
        <header className="h-16 bg-secondary/50 border-b border-gray-200 flex items-center justify-end px-4 md:px-6 sticky top-0 z-30 backdrop-blur-2xl">
            <div className="flex items-center gap-2 md:gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors">
                    <Bell size={20} className="text-gray-600" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="flex items-center gap-2 md:gap-3 pl-2 md:pl-4 border-l border-primary/20">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                        <User size={18} className="text-white" />
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-gray-700">Admin</span>
                </div>
            </div>
        </header>
    );
}

