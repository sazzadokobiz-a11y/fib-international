'use client'

import React from 'react'
import Image from 'next/image'

const logos = [
    { name: "Unilever", src: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_Unilever.svg" },
    { name: "Nestlé", src: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Nestle_textlogo.svg" },
    { name: "Samsung", src: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
    { name: "Toyota", src: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg" },
    { name: "Alibaba", src: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Alibaba_en_logo.svg/640px-Alibaba_en_logo.svg.png" },
    { name: "Siemens", src: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Siemens-logo.svg" },
]

const PartnerLogoSection = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-[#f5f0e6] border-y border-slate-200/60 overflow-hidden">

            <div className="max-w-[1400px] mx-auto px-6 md:px-12">

                {/* Heading */}
                <div className="text-center mb-14">
                    <span className="text-sm uppercase tracking-widest text-secondary font-semibold">
                        Trusted Worldwide
                    </span>

                    <h2 className="text-3xl md:text-4xl font-bold text-primary mt-3">
                        Partnering with Global Leaders
                    </h2>

                    <p className="text-slate-500 mt-4 max-w-xl mx-auto">
                        We work with internationally recognized brands ensuring quality and trust.
                    </p>
                </div>

                {/* SLIDER */}
                <div className="relative w-full overflow-hidden">

                    {/* LEFT FADE */}
                    <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10"></div>

                    {/* RIGHT FADE */}
                    <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-[#f5f0e6] to-transparent z-10"></div>

                    <div className="flex w-max animate-slide gap-16 hover:[animation-play-state:paused]">

                        {/* duplicate for infinite loop */}
                        {[...logos, ...logos].map((logo, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center min-w-[160px] h-[80px] bg-white rounded-xl shadow-sm border grayscale hover:grayscale-0 hover:shadow-md transition"
                            >
                                <Image
                                    src={logo.src}
                                    alt={logo.name}
                                    width={120}
                                    height={60}
                                    className="object-contain h-10"
                                />
                            </div>
                        ))}

                    </div>
                </div>

            </div>
        </section>
    )
}

export default PartnerLogoSection