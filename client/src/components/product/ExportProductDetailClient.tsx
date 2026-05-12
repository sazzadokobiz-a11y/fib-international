'use client'

import QuoteForm from "@/components/forms/QuoteForm";
import Container from "@/components/shared/Container";
import type { ExportProduct } from "@/types/product";
import {
    CheckCircle2,
    ChevronRight,
    CreditCard,
    Headset,
    PackageCheck,
    ShieldCheck,
    Truck
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import ProductCard from "../cards/ProductCard";

const featureItems = [
    { text: "Certified International Quality Standards", icon: ShieldCheck },
    { text: "Competitive Global Pricing Advantage", icon: CreditCard },
    { text: "Fast & Reliable Worldwide Shipping", icon: Truck },
    { text: "Dedicated Export Expert Support", icon: Headset },
    { text: "Customizable Bulk Order Solutions", icon: PackageCheck },
    { text: "Flexible Trade & Payment Terms", icon: CheckCircle2 },
]

function Magnifier({ src, alt }: { src: string; alt: string }) {
    const [showZoom, setShowZoom] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [size, setSize] = useState({ width: 1, height: 1 })

    const lensSize = 150
    const zoomLevel = 2.5

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        setPosition({ x, y })
        setSize({ width: rect.width, height: rect.height })
    }

    return (
        <div
            className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg bg-[#f5f0e6]"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setShowZoom(true)}
            onMouseLeave={() => setShowZoom(false)}
        >
            <Image
                src={src}
                alt={alt}
                width={800}
                height={800}
                className="w-full h-full object-cover shadow-2xl shadow-gray-700 rounded-xl"
            />

            {showZoom && (
                <div
                    className="absolute border-2 border-white rounded-full pointer-events-none"
                    style={{
                        width: lensSize,
                        height: lensSize,
                        top: position.y - lensSize / 2,
                        left: position.x - lensSize / 2,
                        backgroundImage: `url(${src})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: `${zoomLevel * 300}%`,
                        backgroundPosition: `${(position.x / size.width) * 100}% ${(position.y / size.height) * 100}%`
                    }}
                />
            )}
        </div>
    )
}

export default function ExportProductDetailClient({
    product,
    relatedProducts
}: {
    product: ExportProduct;
    relatedProducts: ExportProduct[];
}) {
    const [quantity, setQuantity] = useState(product.moq)
    const images = product.images?.length ? product.images : [product.thumbnail || "/window.svg"]
    const [selectedImage, setSelectedImage] = useState(images[0])

    return (
        <>
            <div className="pt-10 md:pt-20">
                <Container className="flex items-center gap-2 text-sm text-slate-600">
                    <Link href="/">Home</Link>
                    <ChevronRight size={16} />
                    <Link href="/export">Export</Link>
                    <ChevronRight size={16} />
                    <span className="text-primary font-medium">{product.name}</span>
                </Container>
            </div>

            <section className="py-10 md:pb-24">
                <Container>
                    <div className="grid md:grid-cols-2 gap-12 mb-16">
                        <div>
                            <Magnifier src={selectedImage} alt={product.name} />

                            {images.length > 0 && (
                                <div className="mt-5 flex flex-wrap gap-3">
                                    {images.map((img, i) => (
                                        <Image
                                            key={`${img}-${i}`}
                                            src={img}
                                            alt={product.name}
                                            width={100}
                                            height={100}
                                            onClick={() => setSelectedImage(img)}
                                            className={`h-24 w-24 cursor-pointer border object-cover shadow-lg shadow-gray-300 rounded-lg hover:scale-105 transition ${selectedImage === img ? 'border-primary border-2 scale-105' : 'border-transparent'}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="bg-gradient-to-br from-white to-[#f9f7f2] border rounded-2xl p-6 shadow-sm mb-6">
                                <h2 className="text-2xl font-semibold text-primary mb-2">{product.name}</h2>
                                <p className="text-slate-600 leading-relaxed mb-4">{product.description}</p>

                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full">{product.category}</span>
                                    {product.subCategory && (
                                        <span className="px-3 py-1 text-xs bg-gray-100 rounded-full">{product.subCategory}</span>
                                    )}
                                    <span className="px-3 py-1 text-xs bg-secondary/10 text-secondary rounded-full">MOQ: {product.moq}</span>
                                    <span className="px-3 py-1 text-xs bg-gray-100 rounded-full">{product.brand}</span>
                                </div>
                            </div>

                            <div className="bg-white border rounded-2xl p-6 shadow-sm mb-6">
                                <h3 className="text-lg font-semibold mb-4 text-primary">Product Specifications</h3>

                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-500">Brand</span>
                                        <p className="font-medium">{product.brand}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Color</span>
                                        <p className="font-medium">{product.color || "N/A"}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Size</span>
                                        <p className="font-medium">{product.size || "N/A"}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Gender</span>
                                        <p className="font-medium">{product.gender || "N/A"}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">MOQ</span>
                                        <p className="font-medium">{product.moq}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Category</span>
                                        <p className="font-medium">{product.category}</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Subcategory</span>
                                        <p className="font-medium">{product.subCategory || "N/A"}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <span className="text-gray-500">Materials</span>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {product.materials?.map((material) => (
                                                <span key={material} className="px-3 py-1 text-xs bg-[#f5f0e6] text-primary rounded-full border">
                                                    {material}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <QuoteForm
                                productId={product._id}
                                productName={product.name}
                                quantity={quantity}
                                moq={product.moq}
                                onQuantityChange={setQuantity}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                        {featureItems.map((item) => {
                            const Icon = item.icon

                            return (
                                <div key={item.text} className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-md p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
                                    <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500" />

                                    <div className="relative flex items-start gap-4">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 group-hover:bg-primary transition-all duration-300 shadow-sm">
                                            <Icon className="text-primary group-hover:text-white transition-colors duration-300" size={22} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900 text-sm leading-relaxed">{item.text}</p>
                                            <p className="text-xs text-gray-500 mt-1">Export-grade assurance & global compliance</p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {relatedProducts.length > 0 && (
                        <div className="mt-16">
                            <div className="mb-5">
                                <h2 className="text-2xl font-semibold">Related Products</h2>
                                <p className="text-sm text-gray-600">Similar export items you may also be interested in</p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                                {relatedProducts.map((relatedProduct) => (
                                    <ProductCard key={relatedProduct._id} product={relatedProduct} />
                                ))}
                            </div>
                        </div>
                    )}
                </Container>
            </section>
        </>
    )
}
