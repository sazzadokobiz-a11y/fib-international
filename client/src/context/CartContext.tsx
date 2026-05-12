'use client'

import type { ImportProduct } from "@/types/product";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";

export const SHIPPING_CHARGE = 100;

export type CartItem = {
    productId: string;
    name: string;
    slug: string;
    thumbnail?: string;
    sku?: string;
    price: number;
    stock?: number;
    quantity: number;
}

type CartContextValue = {
    items: CartItem[];
    cartCount: number;
    subtotal: number;
    shipping: number;
    total: number;
    addItem: (product: ImportProduct, quantity?: number) => void;
    removeItem: (productId: string) => void;
    increaseQuantity: (productId: string) => void;
    decreaseQuantity: (productId: string) => void;
    setItemQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const CART_STORAGE_KEY = "family-jv-cart";

const getProductPrice = (product: ImportProduct) => Number(product.discountPrice || product.price || 0);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
        if (storedCart) {
            try {
                setItems(JSON.parse(storedCart));
            } catch {
                setItems([]);
            }
        }
        setIsHydrated(true);
    }, []);

    useEffect(() => {
        if (isHydrated) {
            window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
        }
    }, [isHydrated, items]);

    const addItem = useCallback((product: ImportProduct, quantity = 1) => {
        setItems((currentItems) => {
            const existing = currentItems.find((item) => item.productId === product._id);
            const stock = product.stock;
            const safeQuantity = Math.max(1, quantity);

            if (existing) {
                const nextQuantity = stock ? Math.min(existing.quantity + safeQuantity, stock) : existing.quantity + safeQuantity;
                return currentItems.map((item) => item.productId === product._id ? { ...item, quantity: nextQuantity } : item);
            }

            const initialQuantity = stock ? Math.min(safeQuantity, stock) : safeQuantity;

            return [
                ...currentItems,
                {
                    productId: product._id,
                    name: product.name,
                    slug: product.slug,
                    thumbnail: product.thumbnail,
                    sku: product.sku,
                    price: getProductPrice(product),
                    stock,
                    quantity: initialQuantity
                }
            ];
        });
    }, []);

    const removeItem = useCallback((productId: string) => {
        setItems((currentItems) => currentItems.filter((item) => item.productId !== productId));
    }, []);

    const setItemQuantity = useCallback((productId: string, quantity: number) => {
        setItems((currentItems) => currentItems.map((item) => {
            if (item.productId !== productId) {
                return item;
            }

            const nextQuantity = item.stock ? Math.min(quantity, item.stock) : quantity;
            return {
                ...item,
                quantity: Math.max(1, nextQuantity)
            };
        }));
    }, []);

    const increaseQuantity = useCallback((productId: string) => {
        setItems((currentItems) => currentItems.map((item) => {
            if (item.productId !== productId) {
                return item;
            }

            const nextQuantity = item.stock ? Math.min(item.quantity + 1, item.stock) : item.quantity + 1;
            return { ...item, quantity: nextQuantity };
        }));
    }, []);

    const decreaseQuantity = useCallback((productId: string) => {
        setItems((currentItems) => currentItems.map((item) => (
            item.productId === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item
        )));
    }, []);

    const clearCart = useCallback(() => {
        setItems([]);
    }, []);

    const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
    const cartCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
    const shipping = items.length > 0 ? SHIPPING_CHARGE : 0;
    const total = subtotal + shipping;

    return (
        <CartContext.Provider value={{
            items,
            cartCount,
            subtotal,
            shipping,
            total,
            addItem,
            removeItem,
            increaseQuantity,
            decreaseQuantity,
            setItemQuantity,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used inside CartProvider");
    }

    return context;
}
