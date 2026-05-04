'use client'

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Globe, Truck, ShieldCheck, type LucideIcon } from "lucide-react"

type Banner = {
    id: number
    title: string
    subtitle: string
    image: string
    type: "Offer" | "Sale" | "Announcement"
}

const banners: Banner[] = [
    {
        id: 1,
        title: "Mega Export Sale",
        subtitle: "Up to 30% off on bulk orders this week",
        image: "https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?q=80&w=1171&auto=format&fit=crop",
        type: "Sale",
    },
    {
        id: 2,
        title: "Special Offer for New Clients",
        subtitle: "Free shipping on first international order",
        image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=1215&auto=format&fit=crop",
        type: "Offer",
    },
    {
        id: 3,
        title: "Global Trade Expansion",
        subtitle: "New shipping routes across Asia & Europe",
        image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=1170&auto=format&fit=crop",
        type: "Announcement",
    },
]

function AddBanner() {

    const [current, setCurrent] = useState(0)

    const nextSlide = () => {
        setCurrent((prev) => (prev + 1) % banners.length)
    }

    const prevSlide = () => {
        setCurrent((prev) => (prev - 1 + banners.length) % banners.length)
    }

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide()
        }, 6000)

        return () => clearInterval(interval)
    }, [])

    const active = banners[current]

    return (
        <div className="max-w-6xl mx-auto my-16 px-4">

            {/* MAIN CARD */}
            <div className="grid lg:grid-cols-2 bg-white shadow-xl rounded-2xl overflow-hidden border h-96">

                {/* LEFT INFO PANEL */}
                <div className="p-8 bg-gradient-to-br from-primary/5 to-white flex flex-col justify-between">

                    <div>
                        <p className="text-xs uppercase tracking-widest text-gray-500">
                            JV Family International
                        </p>

                        <h2 className="text-3xl font-bold mt-2 text-primary">
                            Daily Trade Promotions
                        </h2>

                        <p className="text-gray-600 mt-3">
                            Stay updated with exclusive export offers, shipping deals,
                            and global trade announcements.
                        </p>

                        {/* STATS */}
                        <div className="grid grid-cols-3 gap-3 mt-6">
                            <Stat icon={Globe} label="50+ Countries" />
                            <Stat icon={Truck} label="Fast Shipping" />
                            <Stat icon={ShieldCheck} label="Verified Trade" />
                        </div>
                    </div>

                    <div className="mt-6 text-sm text-gray-500">
                        Updated daily by admin dashboard
                    </div>
                </div>

                {/* RIGHT CAROUSEL */}
                <div className="relative">

                    {/* IMAGE */}
                    <div className="relative h-[320px] lg:h-full">
                        <Image
                            src={active.image}
                            alt={active.title}
                            fill
                            sizes="(max-width: 1024px) 100vw, 50vw"
                            className="object-cover"
                        />

                        <div className="absolute inset-0 bg-black/40" />
                    </div>

                    {/* CONTENT */}
                    <div className="absolute inset-0 flex flex-col justify-center p-6 text-white space-y-3">

                        <span className={`
                            w-fit text-xs px-3 py-1 rounded-full font-medium
                            ${active.type === "Sale" ? "bg-red-500" :
                                active.type === "Offer" ? "bg-green-500" :
                                    "bg-blue-500"}
                        `}>
                            {active.type}
                        </span>

                        <h3 className="text-2xl font-bold">
                            {active.title}
                        </h3>

                        <p className="text-white/90 text-sm">
                            {active.subtitle}
                        </p>

                        <button className="bg-white text-black px-4 py-2 rounded-lg w-fit font-medium hover:bg-white/90 transition">
                            View Details
                        </button>
                    </div>

                    {/* NAV */}
                    <button
                        onClick={prevSlide}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
                    >
                        <ChevronLeft />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
                    >
                        <ChevronRight />
                    </button>

                    {/* DOTS */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                        {banners.map((_, i) => (
                            <div
                                key={i}
                                onClick={() => setCurrent(i)}
                                className={`h-2 rounded-full cursor-pointer transition-all
                                ${i === current ? "bg-white w-6" : "bg-white/50 w-2"}`}
                            />
                        ))}
                    </div>

                    {/* PROGRESS BAR */}
                    <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/20">
                        <div
                            className="h-full bg-white transition-all duration-500"
                            style={{
                                width: `${((current + 1) / banners.length) * 100}%`
                            }}
                        />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddBanner

/* SMALL STAT COMPONENT */
function Stat({ icon: Icon, label }: { icon: LucideIcon, label: string }) {
    return (
        <div className="bg-white border rounded-lg p-2 text-center shadow-sm">
            <Icon size={16} className="mx-auto text-primary mb-1" />
            <p className="text-[11px] text-gray-600">{label}</p>
        </div>
    )
}
