"use client";
import { Search, Bell, User } from "lucide-react";

export function Header() {
    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
            <div className="flex items-center gap-2 md:gap-4 flex-1">
                <div className="hidden sm:flex items-center gap-2 bg-gray-100 px-3 md:px-4 py-2 rounded-lg flex-1 max-w-md">
                    <Search size={18} className="text-gray-500 flex-shrink-0" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent outline-none text-sm text-gray-600 w-full"
                    />
                </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg relative transition-colors">
                    <Bell size={20} className="text-gray-600" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="flex items-center gap-2 md:gap-3 pl-2 md:pl-4 border-l border-gray-200">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: "#B08968" }}>
                        <User size={18} className="text-white" />
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-gray-700">Admin</span>
                </div>
            </div>
        </header>
    );
}

