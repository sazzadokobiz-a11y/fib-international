"use client";
import { Button } from "@/components/ui/button";
import { Menu, Search, Bell, User } from "lucide-react";

export function Header() {
    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
            <div className="flex items-center gap-4">
                <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
                    <Menu size={20} className="text-gray-600" />
                </button>
                <div className="hidden sm:flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                    <Search size={18} className="text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent outline-none text-sm text-gray-600 w-48"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2 hover:bg-gray-100 rounded-lg relative">
                    <Bell size={20} className="text-gray-600" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                <div className="flex items-center gap-2 pl-4 border-l border-gray-200">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "#B08968" }}>
                        <User size={18} className="text-white" />
                    </div>
                </div>
            </div>
        </header>
    );
}
