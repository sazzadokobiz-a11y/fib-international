'use client'

import React from 'react'
import Container from '@/components/shared/Container'
import { Globe, ShieldCheck, Users, Truck } from 'lucide-react'
import Image from 'next/image'

const AboutPage = () => {
    return (
        <div className="pb-20">

            {/* HERO */}
            <div className="bg-gradient-to-br from-secondary/20 via-secondary/10 to-transparent py-16">
                <Container>
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                            About JV Family International
                        </h1>
                        <p className="text-slate-600 leading-relaxed">
                            We are a global trading company committed to connecting markets,
                            delivering quality products, and building long-term partnerships
                            across borders.
                        </p>
                    </div>
                </Container>
            </div>

            <Container>

                {/* OUR STORY */}
                <div className="mt-16 grid md:grid-cols-2 gap-10 items-center">
                    <div>
                        <h2 className="text-3xl font-semibold mb-4">Our Story</h2>
                        <p className="text-slate-600 leading-relaxed mb-4">
                            JV Family International was founded with a vision to simplify global trade.
                            Starting as a small trading initiative, we have grown into a trusted partner
                            for businesses worldwide—bridging the gap between suppliers and buyers.
                        </p>
                        <p className="text-slate-600 leading-relaxed">
                            Our journey is built on integrity, reliability, and a deep understanding
                            of international markets. Today, we proudly serve clients across multiple
                            industries, ensuring smooth import and export operations.
                        </p>
                    </div>

                    <div className="bg-[#f5f0e6] rounded-2xl p-8 shadow-sm">
                        <h3 className="text-xl font-semibold mb-6">Our Core Values</h3>
                        <ul className="space-y-4 text-slate-700">
                            <li>✔ Integrity & Transparency</li>
                            <li>✔ Quality Assurance</li>
                            <li>✔ Customer Commitment</li>
                            <li>✔ Global Collaboration</li>
                        </ul>
                    </div>
                </div>

                {/* MISSION & VISION */}
                <div className="mt-20 grid md:grid-cols-2 gap-8">
                    <div className="p-8 bg-white rounded-xl shadow-sm border">
                        <h3 className="text-2xl font-semibold mb-3">Our Mission</h3>
                        <p className="text-slate-600">
                            To deliver high-quality products globally while ensuring seamless
                            trade operations, competitive pricing, and long-term client satisfaction.
                        </p>
                    </div>

                    <div className="p-8 bg-white rounded-xl shadow-sm border">
                        <h3 className="text-2xl font-semibold mb-3">Our Vision</h3>
                        <p className="text-slate-600">
                            To become a leading global trading partner recognized for trust,
                            innovation, and excellence in import and export services.
                        </p>
                    </div>
                </div>

                {/* WHY CHOOSE US */}
                <div className="mt-20">
                    <h2 className="text-3xl font-semibold text-center mb-10">
                        Why Choose Us
                    </h2>

                    <div className="grid md:grid-cols-4 gap-6 text-center">
                        {[
                            { icon: Globe, title: "Global Network" },
                            { icon: ShieldCheck, title: "Trusted Quality" },
                            { icon: Truck, title: "Reliable Logistics" },
                            { icon: Users, title: "Client Focused" },
                        ].map((item, i) => (
                            <div key={i} className="p-6 bg-[#f9fafb] rounded-xl hover:shadow-md transition">
                                <item.icon className="mx-auto text-secondary mb-3" size={28} />
                                <h4 className="font-medium">{item.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>

                {/* STATS */}
                <div className="mt-20 bg-gradient-to-r from-secondary/10 to-transparent p-10 rounded-2xl">
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                        <div>
                            <h3 className="text-3xl font-bold text-secondary">50+</h3>
                            <p className="text-slate-600">Countries Served</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-secondary">200+</h3>
                            <p className="text-slate-600">Business Partners</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-secondary">10K+</h3>
                            <p className="text-slate-600">Shipments Delivered</p>
                        </div>
                    </div>
                </div>


                {/* EXECUTIVE BOARD */}
                <div className="mt-20">
                    <h2 className="text-3xl font-semibold text-center mb-10">
                        Executive Leadership
                    </h2>

                    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {[
                            {
                                name: "John Doe",
                                role: "Chief Executive Officer (CEO)",
                                image: "https://randomuser.me/api/portraits/men/1.jpg",
                            },
                            {
                                name: "Jane Smith",
                                role: "General Manager (GM)",
                                image: "https://randomuser.me/api/portraits/women/2.jpg",
                            },
                            {
                                name: "Michael Rahman",
                                role: "Assistant General Manager (AGM)",
                                image: "https://randomuser.me/api/portraits/men/1.jpg",
                            },
                            {
                                name: "Sarah Khan",
                                role: "Business Head",
                                image: "https://randomuser.me/api/portraits/women/2.jpg",
                            },
                            {
                                name: "David Lee",
                                role: "Operations Manager",
                                image: "https://randomuser.me/api/portraits/men/1.jpg",
                            },
                        ].map((member, i) => (
                            <div
                                key={i}
                                className="bg-white border rounded-xl p-5 text-center shadow-sm hover:shadow-md transition"
                            >
                                {/* Avatar placeholder */}
                                <div className="w-16 h-16 mx-auto rounded-full bg-secondary/20 mb-4 flex items-center justify-center text-secondary font-bold">
                                    <Image src={member.image} alt='profile image' height={800} width={800} className='rounded-full border-2 border-green-800 p-1 h-full w-full'/>
                                </div>

                                <h4 className="font-semibold text-primary">{member.name}</h4>
                                <p className="text-sm text-slate-600 mt-1">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-20 text-center">
                    <h2 className="text-3xl font-semibold mb-4">
                        Let’s Build Global Trade Together
                    </h2>
                    <p className="text-slate-600 mb-6">
                        Partner with JV Family International and experience seamless import-export solutions.
                    </p>
                    <button className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-secondary/90 transition">
                        Contact Us
                    </button>
                </div>

            </Container>
        </div>
    )
}

export default AboutPage