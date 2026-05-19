'use client'

import React from 'react'
import Container from '@/components/shared/Container'
import Link from 'next/link';

const AboutPage = () => {
    const globalBrands = [
        "Gillette", "BIC", "British American Tobacco", "Head & Shoulders", "Pantene", "Finish",
        "Braun", "Crest & Scope", "Colgate", "Pringles", "Loreal", "Kerastase", "Mondelez",
        "Perfetti", "Pepsico", "Danone", "Heinz", "Reckitt", "Johnson & Johnson", "SC Johnson",
        "Nivea", "Clorox", "McCormick", "Red Bull", "Monster", "Ferrero"
    ];

    const localBrands = [
        "Unilever", "Reckitt Benckiser", "Lipton Tea", "Leather Products", "Jute Products",
        "Home Textiles", "Melamine Products", "Handicrafts"
    ];

    return (
        <div className="pb-16">
            {/* HERO */}
            <div className="bg-linear-to-br from-secondary/20 via-secondary/10 to-transparent py-12">
                <Container>
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3">
                            About Family JV International Business Ltd
                        </h1>
                        <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                            A Joint venture company delivering high-quality FMCG and international products with proven expertise in global import-export operations.
                        </p>
                    </div>
                </Container>
            </div>

            <Container>
                {/* OUR STORY & QUICK FACTS */}
                <div className="mt-12 grid md:grid-cols-2 gap-8 items-start">
                    <div>
                        <h2 className="text-2xl font-semibold mb-3">Our Story</h2>
                        <p className="text-slate-600 text-sm leading-relaxed mb-3">
                            Family JV International Business Ltd is a Joint venture with Korean-American Partner Mr. Duck Kyu Hwang (Director). As a sister concern of I&M General Business Ltd (established 2003), we bring decades of experience in global trade—import-export, civil construction, electro-mechanical services, and smart automation.
                        </p>
                        <p className="text-slate-600 text-sm leading-relaxed">
                            We specialize in supplying FMCG and branded products through parallel trading channels, serving valued customers worldwide.
                        </p>
                    </div>

                    <div className="bg-secondary/5 rounded-lg p-6 text-sm">
                        <h3 className="font-semibold mb-4 text-secondary">Company Info</h3>
                        <ul className="space-y-2 text-slate-700">
                            <li><strong>Type:</strong> Limited Company</li>
                            <li><strong>Email:</strong> rmatiur777@yahoo.com</li>
                            <li><strong>Phone:</strong> +88-01730-437306</li>
                            {/* <li><strong>Website:</strong> www.fib-bd.com</li> */}
                        </ul>
                        <div className="mt-4 pt-4 border-t text-xs text-slate-600">
                            <p className="mb-2"><strong>HQ:</strong> 50 Purana Paltan Lane, Dhaka, Bangladesh</p>
                            <p className="mb-2"><strong>USA:</strong> 7661 Stage rd Buena Park, CA 90621, USA</p>
                            <p><strong>Warehouse:</strong> 464/2 west shewrapara, Mirpur, Dhaka-1216 <strong>Tel: </strong>+880-1784-378375</p>
                        </div>
                    </div>
                </div>

                {/* MISSION & VISION */}
                <div className="mt-10 grid md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                        <h3 className="font-semibold mb-2 text-secondary">Our Mission</h3>
                        <p className="text-slate-600 text-sm">
                            Be the preferred supplier for high-quality FMCG and international branded products, ensuring integrity and seamless import-export operations.
                        </p>
                    </div>

                    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
                        <h3 className="font-semibold mb-2 text-secondary">Our Vision</h3>
                        <p className="text-slate-600 text-sm">
                            A leading global trading partner recognized for trust, quality, and excellence in FMCG parallel trading solutions.
                        </p>
                    </div>
                </div>

                {/* BRANDS - COMPACT */}
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold text-center mb-6">Brands We Represent</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-semibold text-secondary mb-3 text-sm">Global FMCG Brands</h3>
                            <div className="flex flex-wrap gap-2">
                                {globalBrands.map((brand, i) => (
                                    <span key={i} className="text-xs bg-secondary/10 text-slate-700 px-2 py-1 rounded">
                                        {brand}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold text-secondary mb-3 text-sm">Bangladeshi Brands</h3>
                            <div className="flex flex-wrap gap-2">
                                {localBrands.map((brand, i) => (
                                    <span key={i} className="text-xs bg-secondary/10 text-slate-700 px-2 py-1 rounded">
                                        {brand}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* WHY CHOOSE US - COMPACT */}
                <div className="mt-10">
                    <h2 className="text-2xl font-semibold text-center mb-6">Why Choose Us</h2>
                    <div className="grid md:grid-cols-4 gap-4">
                        <div className="p-4 bg-secondary/5 rounded-lg text-center text-sm">
                            <div className="text-2xl mb-2">🏆</div>
                            <p className="font-medium">Proven Track Record</p>
                        </div>
                        <div className="p-4 bg-secondary/5 rounded-lg text-center text-sm">
                            <div className="text-2xl mb-2">🌍</div>
                            <p className="font-medium">Global Presence</p>
                        </div>
                        <div className="p-4 bg-secondary/5 rounded-lg text-center text-sm">
                            <div className="text-2xl mb-2">✅</div>
                            <p className="font-medium">Quality Assured</p>
                        </div>
                        <div className="p-4 bg-secondary/5 rounded-lg text-center text-sm">
                            <div className="text-2xl mb-2">💼</div>
                            <p className="font-medium">Expert Partnership</p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-12 text-center bg-linear-to-r from-secondary/10 to-transparent p-8 rounded-lg">
                    <h2 className="text-2xl font-semibold mb-2">
                        Partner for Global Success
                    </h2>
                    <p className="text-slate-600 text-sm mb-4">
                        Experience seamless import-export of premium FMCG and international products.
                    </p>
                    <Link href="/contact" className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-secondary/90 transition text-sm font-medium">
                        Get in Touch
                    </Link>
                </div>
            </Container>
        </div>
    )
}

export default AboutPage
