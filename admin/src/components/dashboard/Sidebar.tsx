"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FolderOpen, Grid3x3, ShoppingCart, FileText, MessageSquare, Menu, X } from "lucide-react";
import { useState } from "react";

const navItems = [
    { label: "Product", href: "/product", icon: ShoppingCart },
    { label: "Order", href: "/order", icon: FileText },
    { label: "Quote", href: "/quote", icon: MessageSquare },
    { label: "Category", href: "/category", icon: FolderOpen },
    { label: "Sub Category", href: "/sub-category", icon: Grid3x3 },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (href: string) => {
        return pathname === href || pathname.startsWith(href + "/");
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 z-40 ${
                isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
            }`}>
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-2xl font-bold" style={{ color: "#5D4037" }}>
                        FIB International
                    </h1>
                    <p className="text-sm text-gray-500 mt-1">Admin Panel</p>
                </div>

                <nav className="flex-1 space-y-2 px-3 py-4 overflow-y-auto">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const active = isActive(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                    active
                                        ? "text-[#5D4037] font-semibold shadow-sm"
                                        : "text-gray-600 hover:bg-gray-50"
                                }`}
                                style={
                                    active
                                        ? { backgroundColor: "rgba(93, 64, 55, 0.1)" }
                                        : {}
                                }
                            >
                                <Icon size={20} />
                                <span className="flex-1">{item.label}</span>
                                {active && (
                                    <div
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: "#5D4037" }}
                                    ></div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-gray-200 text-xs text-gray-500 text-center">
                    <p>© 2024 FIB International</p>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}

