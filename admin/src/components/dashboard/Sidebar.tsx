"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderOpen, Grid3x3, ShoppingCart, FileText, MessageSquare, Menu, X, Contact, Image, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge"
import { getUnreadMessage } from "@/services/contact";

const navItems = [
    {label: "Dashboard", href: "/", icon: LayoutDashboard},
    { label: "Order", href: "/order", icon: FileText },
    { label: "Quote", href: "/quote", icon: MessageSquare },
    { label: "Category", href: "/category", icon: FolderOpen },
    { label: "Sub Category", href: "/sub-category", icon: Grid3x3 },
    { label: "Product", href: "/product", icon: ShoppingCart },
    {label: "Hero image", href: "/hero-image", icon: Image},
    { label: "Banners", href: "/banner", icon: Image },
    { label: "Partners", href: "/partners", icon: Users },
    {label: "Contact", href: "/contact", icon: Contact}
];

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [unreadMessage, setUnreadMessage] = useState(0);

    useEffect(()=>{
        const fetchUnreadCount = async()=>{
            const result = await getUnreadMessage();
            setUnreadMessage(result.data)
        }
        fetchUnreadCount();
    }, [])

    const isActive = (href: string) => {
        return pathname === href || pathname.startsWith(href + "/");
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`lg:hidden fixed top-3 left-4 z-50 p-2 bg-primary text-white rounded-lg ${isOpen && "left-65"} transition-all`}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-screen w-64 border-r bg-white border-primary/20 flex flex-col transition-transform duration-300 z-40 ${
                isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
            }`}>
                <div className="p-6 border-b border-primary/20">
                    <h1 className="text-2xl font-bold text-primary">
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
                                        ? "text-white font-semibold shadow-sm bg-primary/50"
                                    : "text-gray-600 hover:bg-primary/50 hover:text-white"
                                }`}
                            >
                                <Icon size={20} />
                                <span className="flex-1">{item.label}</span>
                                {
                                    item.href === "/contact" ? unreadMessage > 0 ? <Badge variant="destructive">{unreadMessage}</Badge> : "" : ""
                                }
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-primary/20 text-xs text-gray-500 text-center">
                    <p>© {new Date().getFullYear()} FIB International</p>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-white/70 z-30 lg:hidden backdrop-blur-2xl"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
}

