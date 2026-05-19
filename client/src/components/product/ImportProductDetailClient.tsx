'use client'

import ImportProductCard from "@/components/cards/ImportProductCard";
import Container from "@/components/shared/Container";
import { useToast } from "@/components/shared/ToastProvider";
import { useCart } from "@/context/CartContext";
import type { ImportProduct } from "@/types/product";
import { ChevronRight, Minus, Plus, ShoppingCart, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formatPrice = (value?: number) => `৳${Number(value || 0).toLocaleString()}`;

const formatDimensions = (product: ImportProduct) => {
    if (!product.dimensions) {
        return "N/A";
    }

    const { length, width, height, unit = "cm" } = product.dimensions;
    return [length, width, height].filter(Boolean).join(" x ") + ` ${unit}`;
}

function Magnifier({ src, alt }: { src: string; alt: string }) {
    const [showZoom, setShowZoom] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [size, setSize] = useState({ width: 1, height: 1 });
    const lensSize = 150;
    const zoomLevel = 2.5;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
        setSize({ width: rect.width, height: rect.height });
    }

    return (
        <div
            className="relative aspect-square w-full overflow-hidden rounded-xl bg-white shadow-lg"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setShowZoom(true)}
            onMouseLeave={() => setShowZoom(false)}
        >
            <Image src={src} alt={alt} width={900} height={900} className="h-full w-full object-cover" />
            {showZoom && (
                <div
                    className="pointer-events-none absolute rounded-full border-2 border-white shadow-lg"
                    style={{
                        width: lensSize,
                        height: lensSize,
                        top: position.y - lensSize / 2,
                        left: position.x - lensSize / 2,
                        backgroundImage: `url(${src})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: `${zoomLevel * 300}%`,
                        backgroundPosition: `${(position.x / size.width) * 100}% ${(position.y / size.height) * 100}%`
                    }}
                />
            )}
        </div>
    );
}

export default function ImportProductDetailClient({
    product,
    relatedProducts
}: {
    product: ImportProduct;
    relatedProducts: ImportProduct[];
}) {
    const router = useRouter();
    const { addItem } = useCart();
    const { showToast } = useToast();
    const images = product.images?.length ? product.images : [product.thumbnail || "/window.svg"];
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [quantity, setQuantity] = useState(1);
    const inStock = Number(product.stock || 0) > 0;
    const sellPrice = product.discountPrice || product.price;

    const handleAddToCart = () => {
        if (!inStock) {
            showToast("This product is out of stock", "error");
            return;
        }

        addItem(product, quantity);
        showToast("Product added to cart", "success");
    }

    const handleBuyNow = () => {
        if (!inStock) {
            showToast("This product is out of stock", "error");
            return;
        }

        addItem(product, quantity);
        router.push("/checkout");
    }

    return (
        <section className="py-10 md:py-16">
            <Container>
                <div className="mb-8 flex items-center gap-2 text-sm text-slate-600">
                    <Link href="/">Home</Link>
                    <ChevronRight size={16} />
                    <Link href="/import">Import</Link>
                    <ChevronRight size={16} />
                    <span className="font-medium text-primary">{product.name}</span>
                </div>

                <div className="grid gap-10 lg:grid-cols-2">
                    <div>
                        <Magnifier src={selectedImage} alt={product.name} />
                        <div className="mt-4 flex flex-wrap gap-3">
                            {images.map((image, index) => (
                                <button
                                    type="button"
                                    key={`${image}-${index}`}
                                    onClick={() => setSelectedImage(image)}
                                    className={`overflow-hidden rounded-lg border bg-white p-1 transition ${selectedImage === image ? "border-primary" : "border-gray-200"}`}
                                >
                                    <Image src={image} alt={product.name} width={90} height={90} className="h-20 w-20 object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="flex flex-wrap items-start justify-between gap-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-primary">{product.name}</h1>
                                    <p className="mt-2 text-sm text-gray-500">SKU: {product.sku || "N/A"}</p>
                                </div>
                                {product.isFeatured && (
                                    <span className="rounded-full bg-secondary/20 px-3 py-1 text-sm font-semibold text-primary">Featured</span>
                                )}
                            </div>

                            <p className="mt-4 leading-relaxed text-gray-600">{product.description}</p>

                            <div className="mt-5 flex flex-wrap items-end gap-3">
                                <span className="text-3xl font-bold text-gray-900">{formatPrice(sellPrice)}</span>
                                {product.discountPrice && product.discountPrice < product.price && (
                                    <span className="text-lg text-gray-500 line-through">{formatPrice(product.price)}</span>
                                )}
                                <span className={`rounded-full px-3 py-1 text-sm font-medium ${inStock ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                                    {inStock ? `in stock` : "Out of stock"}
                                </span>
                            </div>

                            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                <div className="flex h-11 w-32 items-center justify-between rounded-lg border border-gray-200 bg-gray-50 px-2">
                                    <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="rounded-md p-1 hover:bg-white">
                                        <Minus size={16} />
                                    </button>
                                    <span className="font-semibold">{quantity}</span>
                                    <button type="button" onClick={() => setQuantity((value) => product.stock ? Math.min(product.stock, value + 1) : value + 1)} className="rounded-md p-1 hover:bg-white">
                                        <Plus size={16} />
                                    </button>
                                </div>

                                <button type="button" onClick={handleAddToCart} disabled={!inStock} className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50">
                                    <ShoppingCart size={18} />
                                    Add to Cart
                                </button>

                                <button type="button" onClick={handleBuyNow} disabled={!inStock} className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-secondary px-5 py-3 font-semibold text-primary transition hover:bg-secondary/80 disabled:opacity-50">
                                    <Zap size={18} />
                                    Buy Now
                                </button>
                            </div>
                        </div>

                        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                            <h2 className="mb-4 text-lg font-semibold text-primary">Product Information</h2>
                            <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                                <Info label="Brand" value={product.brand} />
                                <Info label="Category" value={product.category} />
                                <Info label="Subcategory" value={product.subCategory || "N/A"} />
                                <Info label="Color" value={product.color || "N/A"} />
                                <Info label="Size" value={product.size || "N/A"} />
                                <Info label="Gender" value={product.gender || "N/A"} />
                                <Info label="Dimensions" value={formatDimensions(product)} />
                                <Info label="Weight" value={product.weight ? `${product.weight} kg` : "N/A"} />
                                <Info label="Warranty" value={product.warranty || "N/A"} />
                                <Info label="Return Policy" value={product.returnPolicy || "N/A"} />
                                <div className="sm:col-span-2">
                                    <span className="text-gray-500">Materials</span>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        {product.materials?.length ? product.materials.map((material) => (
                                            <span key={material} className="rounded-full bg-[#f5f0e6] px-3 py-1 text-xs font-medium text-primary">
                                                {material}
                                            </span>
                                        )) : "N/A"}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {relatedProducts.length > 0 && (
                    <div className="mt-16">
                        <div className="mb-5">
                            <h2 className="text-2xl font-semibold text-primary">Related Products</h2>
                            <p className="text-sm text-gray-600">More import products from the same collection</p>
                        </div>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            {relatedProducts.map((relatedProduct) => (
                                <ImportProductCard key={relatedProduct._id} product={relatedProduct} />
                            ))}
                        </div>
                    </div>
                )}
            </Container>
        </section>
    );
}

function Info({ label, value }: { label: string; value: string }) {
    return (
        <div>
            <span className="text-gray-500">{label}</span>
            <p className="font-medium text-gray-900">{value}</p>
        </div>
    );
}
