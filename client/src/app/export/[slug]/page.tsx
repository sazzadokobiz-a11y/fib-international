'use client'

import { products } from "@/data/products"
import { useParams } from "next/navigation"
import React, { useState } from "react"
import Container from '@/components/shared/Container'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import QuoteForm, { QuoteFormData } from '@/components/forms/QuoteForm'
import Image from 'next/image'
import {
    CheckCircle2,
    ShieldCheck,
    Truck,
    Headset,
    PackageCheck,
    CreditCard
} from "lucide-react"

const featureItems = [
    { text: "Certified International Quality Standards", icon: ShieldCheck },
    { text: "Competitive Global Pricing Advantage", icon: CreditCard },
    { text: "Fast & Reliable Worldwide Shipping", icon: Truck },
    { text: "Dedicated Export Expert Support", icon: Headset },
    { text: "Customizable Bulk Order Solutions", icon: PackageCheck },
    { text: "Flexible Trade & Payment Terms", icon: CheckCircle2 },
]

export default function ExportDetailsPage() {

    const params = useParams()
    const slug = params.slug as string

    // ✅ FIX: array lookup
    const product = products.find(p => p.slug === slug)

    if (!product) {
        return (
            <div className="p-10 text-center text-red-500">
                Product not found
            </div>
        )
    }

    const [quantity, setQuantity] = useState(product.moq)
    const [selectedImage, setSelectedImage] = useState(
        product.images?.[0] || product.image
    )

    const handleQuoteSubmit = async (formData: QuoteFormData) => {
        console.log('Quote:', {
            ...formData,
            productName: product.name,
            quantity
        })
        alert('Quote request submitted successfully!')
    }

    // 🔍 Magnifier Component
    function Magnifier({ src, alt }: { src: string; alt: string }) {
        const [showZoom, setShowZoom] = useState(false)
        const [position, setPosition] = useState({ x: 0, y: 0 })
        const [size, setSize] = useState({ width: 0, height: 0 })

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
                            backgroundPosition: `
                                ${(position.x / size.width) * 100}% 
                                ${(position.y / size.height) * 100}%
                            `
                        }}
                    />
                )}
            </div>
        )
    }

    return (
        <>
            {/* BREADCRUMB */}
            <div className="pt-10 md:pt-20">
                <Container className="flex items-center gap-2 text-sm text-slate-600">
                    <Link href="/">Home</Link>
                    <ChevronRight size={16} />
                    <Link href="/export">Export</Link>
                    <ChevronRight size={16} />
                    <span className="text-primary font-medium">
                        {product.name}
                    </span>
                </Container>
            </div>

            <section className="py-10 md:pb-24">
                <Container>

                    <div className="grid md:grid-cols-2 gap-12 mb-16">

                        {/* IMAGE */}
                        <div>
                            <Magnifier src={selectedImage} alt={product.name} />

                            {product.images?.length > 0 && (
                                <div className="mt-5 flex gap-3">
                                    {product.images.map((img, i) => (
                                        <Image
                                            key={i}
                                            src={img}
                                            alt="thumbnail"
                                            width={100}
                                            height={100}
                                            onClick={() => setSelectedImage(img)}
                                            className={`cursor-pointer border shadow-2xl shadow-gray-700 rounded-lg hover:scale-105 transition ${selectedImage === img ? 'border-primary border-2 scale-105' : 'border-transparent'} trans transition duration-300`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* RIGHT SIDE */}
                        <div>

                            {/* DESCRIPTION CARD */}
                            <div className="bg-gradient-to-br from-white to-[#f9f7f2] border rounded-2xl p-6 shadow-sm mb-6">

                                <h2 className="text-2xl font-semibold text-primary mb-2">
                                    {product.name}
                                </h2>

                                <p className="text-slate-600 leading-relaxed mb-4">
                                    {product.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 text-xs bg-primary/10 text-primary rounded-full">
                                        {product.category}
                                    </span>
                                    <span className="px-3 py-1 text-xs bg-secondary/10 text-secondary rounded-full">
                                        MOQ: {product.moq}
                                    </span>
                                    <span className="px-3 py-1 text-xs bg-gray-100 rounded-full">
                                        {product.brand}
                                    </span>
                                </div>
                            </div>

                            {/* SPECIFICATIONS */}
                            <div className="bg-white border rounded-2xl p-6 shadow-sm mb-6">

                                <h3 className="text-lg font-semibold mb-4 text-primary">
                                    Product Specifications
                                </h3>

                                <div className="grid grid-cols-2 gap-4 text-sm">

                                    <div>
                                        <span className="text-gray-500">Brand</span>
                                        <p className="font-medium">{product.brand}</p>
                                    </div>

                                    <div>
                                        <span className="text-gray-500">Color</span>
                                        <p className="font-medium">{product.color}</p>
                                    </div>

                                    <div>
                                        <span className="text-gray-500">Size</span>
                                        <p className="font-medium">{product.size}</p>
                                    </div>

                                    <div>
                                        <span className="text-gray-500">Gender</span>
                                        <p className="font-medium">{product.gender}</p>
                                    </div>

                                    <div>
                                        <span className="text-gray-500">MOQ</span>
                                        <p className="font-medium">{product.moq}</p>
                                    </div>

                                    <div>
                                        <span className="text-gray-500">Category</span>
                                        <p className="font-medium">{product.category}</p>
                                    </div>

                                    <div className="col-span-2">
                                        <span className="text-gray-500">Materials</span>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {product.materials.map((m, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1 text-xs bg-[#f5f0e6] text-primary rounded-full border"
                                                >
                                                    {m}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* QUOTE FORM */}
                            <QuoteForm
                                productName={product.name}
                                quantity={quantity}
                                moq={product.moq}
                                onQuantityChange={setQuantity}
                                onSubmit={handleQuoteSubmit}
                            />
                        </div>
                    </div>

                    {/* FEATURES */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

                        {featureItems.map((item, i) => {
                            const Icon = item.icon

                            return (
                                <div
                                    key={i}
                                    className="
                    group relative overflow-hidden
                    rounded-2xl border border-gray-200
                    bg-white/80 backdrop-blur-md
                    p-6 shadow-sm
                    transition-all duration-300
                    hover:shadow-xl hover:-translate-y-1
                "
                                >
                                    {/* gradient glow background */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

                                    {/* top accent line */}
                                    <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-secondary group-hover:w-full transition-all duration-500" />

                                    <div className="relative flex items-start gap-4">

                                        {/* icon */}
                                        <div
                                            className="
                            flex items-center justify-center
                            w-12 h-12 rounded-xl
                            bg-primary/10
                            group-hover:bg-primary
                            transition-all duration-300
                            shadow-sm
                        "
                                        >
                                            <Icon
                                                className="text-primary group-hover:text-white transition-colors duration-300"
                                                size={22}
                                            />
                                        </div>

                                        {/* text */}
                                        <div>
                                            <p className="font-semibold text-gray-900 text-sm leading-relaxed">
                                                {item.text}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-1">
                                                Export-grade assurance & global compliance
                                            </p>
                                        </div>
                                    </div>

                                    {/* subtle corner decoration */}
                                    <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition" />
                                </div>
                            )
                        })}

                    </div>

                </Container>
            </section>
        </>
    )
}