'use client'

import { useState } from "react";
import Link from "next/link";
import { Menu, ShoppingCart, X } from "lucide-react";
import Container from "./Container";
import Logo from "./Logo";
import { useCart } from "@/context/CartContext";


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { cartCount } = useCart();

    const Links = <>
        <li>
            <Link href={"/"} className="hover:text-primary transition-colors duration-200 text-lg">Home</Link>
        </li>
        <li>
            <Link href={"/export"} className="hover:text-primary transition-colors duration-200 text-lg">Export</Link>
        </li>
        <li>
            <Link href={"/import"} className="hover:text-primary transition-colors duration-200 text-lg">Import</Link>
        </li>
        <li>
            <Link href={"/about"} className="hover:text-primary transition-colors duration-200 text-lg">About</Link>
        </li>
        <li>
            <Link href={"/contact"} className="hover:text-primary transition-colors duration-200 text-lg">Contact</Link>
        </li>
    </>

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    return (
        <nav className="w-full bg-secondary/50 shadow-xl">
            <Container className="flex items-center justify-between">
                <Logo/>

                <ul className="hidden md:flex items-center gap-8 font-headline tracking-tight text-sm font-medium text-slate-700 dark:text-slate-200">
                    {Links}
                </ul>

                <div className="flex items-center gap-3">
                    <Link href="/cart" className="relative p-3 rounded-lg bg-white/70 text-primary hover:bg-white transition-all duration-200 cursor-pointer font-medium" aria-label="Cart">
                        <ShoppingCart size={20} />
                        {cartCount > 0 && (
                            <span className="absolute -right-2 -top-2 min-w-5 rounded-full bg-primary px-1.5 py-0.5 text-center text-xs text-white">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                    <Link href="/request-quote" className="hidden md:block p-3 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all duration-200 cursor-pointer font-medium">
                        Request Quote
                    </Link>
                    <button
                        className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors duration-200"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} className="text-slate-900 dark:text-white" /> : <Menu size={24} className="text-slate-900 dark:text-white" />}
                    </button>
                </div>

            </Container>

            {isOpen && (
                <div className="md:hidden bg-background/95 backdrop-blur-sm border-t border-border animate-in fade-in slide-in-from-top-2 duration-200">
                    <Container className="py-6 space-y-4">
                        <ul className="flex flex-col gap-4 font-headline tracking-tight text-sm font-medium text-slate-700 dark:text-slate-200">
                            <li>
                                <Link href={"/"} onClick={handleLinkClick} className="hover:text-primary transition-colors duration-200 text-lg">Home</Link>
                            </li>
                            <li>
                                <Link href={"/export"} onClick={handleLinkClick} className="hover:text-primary transition-colors duration-200 text-lg">Export</Link>
                            </li>
                            <li>
                                <Link href={"/import"} onClick={handleLinkClick} className="hover:text-primary transition-colors duration-200 text-lg">Import</Link>
                            </li>
                            <li>
                                <Link href={"/about"} onClick={handleLinkClick} className="hover:text-primary transition-colors duration-200 text-lg">About</Link>
                            </li>
                            <li>
                                <Link href={"/contact"} onClick={handleLinkClick} className="hover:text-primary transition-colors duration-200 text-lg">Contact</Link>
                            </li>
                        </ul>
                        <Link
                            href="/request-quote"
                            className="w-full py-2.5 px-6 rounded-lg bg-primary text-white hover:bg-primary/90 transition-all duration-200 cursor-pointer font-medium mt-4"
                        >
                            Request Quote
                        </Link>
                    </Container>
                </div>
            )}
        </nav>
    );
}
