'use client'

import { useCart } from "@/context/CartContext";
import { useToast } from "@/components/shared/ToastProvider";
import type { ImportProduct } from "@/types/product";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const formatPrice = (value?: number) => `৳${Number(value || 0).toLocaleString()}`;

export default function ImportProductCard({ product }: { product: ImportProduct }) {
    const { addItem } = useCart();
    const { showToast } = useToast();
    const imageSrc = product.thumbnail || product.images?.[0] || "/window.svg";
    const sellPrice = product.discountPrice || product.price;
    const hasDiscount = Boolean(product.discountPrice && product.discountPrice < product.price);
    const inStock = Number(product.stock || 0) > 0;

    const handleAddToCart = () => {
        if (!inStock) {
            showToast("This product is out of stock", "error");
            return;
        }

        addItem(product, 1);
        showToast("Product added to cart", "success");
    }

    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition hover:shadow-lg">
            <Link href={`/import/${product.slug}`} className="relative block bg-gray-50">
                <Image src={imageSrc} alt={product.name} width={400} height={400} className="h-64 w-full object-cover" />
                {product.isFeatured && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                        <Star size={13} />
                        Featured
                    </span>
                )}
            </Link>

            <div className="space-y-3 p-4">
                <div>
                    <Link href={`/import/${product.slug}`} className="line-clamp-2 text-lg font-semibold text-primary hover:underline">
                        {product.name}
                    </Link>
                    <p className="mt-1 text-xs text-gray-500">{product.category} {product.subCategory ? ` / ${product.subCategory}` : ""}</p>
                </div>

                <div className="flex items-end justify-between gap-3">
                    <div>
                        <p className="text-xl font-bold text-gray-900">{formatPrice(sellPrice)}</p>
                        {hasDiscount && (
                            <p className="text-sm text-gray-500 line-through">{formatPrice(product.price)}</p>
                        )}
                    </div>
                </div>

                <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={!inStock}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <ShoppingCart size={18} />
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
