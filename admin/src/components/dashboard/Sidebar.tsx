"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

const navItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Category", href: "/dashboard/category" },
    { label: "Sub Category", href: "/dashboard/sub-category" },
    { label: "Product", href: "/dashboard/product" },
    { label: "Order", href: "/dashboard/order" },
    { label: "Quote", href: "/dashboard/quote" },
];

export function Sidebar() {
    const pathname = usePathname();

    const isActive = (href: string) => {
        return pathname === href || pathname.startsWith(href + "/");
    };

    return (
        <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col h-screen">
            <div className="p-6">
                <h1 className="text-2xl font-bold" style={{ color: "#5D4037" }}>
                    FIB International
                </h1>
                <p className="text-sm text-gray-500">Admin Panel</p>
            </div>

            <nav className="flex-1 space-y-1 px-3 overflow-y-auto">
                {navItems.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                            isActive(item.href)
                                ? "bg-opacity-10 text-[#5D4037] font-semibold"
                                : "text-gray-600 hover:bg-gray-50"
                        }`}
                        style={
                            isActive(item.href)
                                ? { backgroundColor: "rgba(93, 64, 55, 0.1)" }
                                : {}
                        }
                    >
                        <ChevronRight size={18} />
                        <span>{item.label}</span>
                    </Link>
                ))}
            </nav>
        </aside>
    );
}
