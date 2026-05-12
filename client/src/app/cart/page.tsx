'use client'

import Container from "@/components/shared/Container";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const formatPrice = (value: number) => `৳${value.toLocaleString()}`;

export default function CartPage() {
    const {
        items,
        subtotal,
        shipping,
        total,
        removeItem,
        increaseQuantity,
        decreaseQuantity
    } = useCart();

    return (
        <section className="py-10 md:py-16">
            <Container>
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-primary">Cart</h1>
                    <p className="mt-2 text-gray-600">Review your selected import products before checkout.</p>
                </div>

                {items.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
                        <p className="text-gray-600">Your cart is empty.</p>
                        <Link href="/import" className="mt-5 inline-block rounded-lg bg-primary px-5 py-2.5 font-semibold text-white">
                            Browse Import Products
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div key={item.productId} className="grid gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:grid-cols-[120px_1fr_auto]">
                                    <Image src={item.thumbnail || "/window.svg"} alt={item.name} width={120} height={120} className="h-28 w-full rounded-lg object-cover sm:w-28" />
                                    <div>
                                        <Link href={`/import/${item.slug}`} className="text-lg font-semibold text-primary hover:underline">
                                            {item.name}
                                        </Link>
                                        <p className="mt-1 text-sm text-gray-500">SKU: {item.sku || "N/A"}</p>
                                        <p className="mt-3 font-semibold text-gray-900">{formatPrice(item.price)}</p>
                                    </div>
                                    <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                                        <div className="flex h-10 items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 px-2">
                                            <button type="button" onClick={() => decreaseQuantity(item.productId)} className="rounded-md p-1 hover:bg-white">
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-7 text-center font-semibold">{item.quantity}</span>
                                            <button type="button" onClick={() => increaseQuantity(item.productId)} className="rounded-md p-1 hover:bg-white">
                                                <Plus size={16} />
                                            </button>
                                        </div>
                                        <button type="button" onClick={() => removeItem(item.productId)} className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
                                            <Trash2 size={16} />
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="h-fit rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="text-xl font-semibold text-primary">Cart Summary</h2>
                            <div className="mt-5 space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping Charge</span>
                                    <span className="font-semibold">{formatPrice(shipping)}</span>
                                </div>
                                <div className="border-t border-gray-200 pt-3 flex justify-between text-base">
                                    <span className="font-semibold">Total</span>
                                    <span className="font-bold text-primary">{formatPrice(total)}</span>
                                </div>
                            </div>
                            <Link href="/checkout" className="mt-6 block rounded-lg bg-primary px-5 py-3 text-center font-semibold text-white hover:bg-primary/90">
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                )}
            </Container>
        </section>
    );
}
