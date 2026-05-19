import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ImportSection = () => {
    return (
        <section className="py-28 bg-linear-to-b from-white to-[#f5f0e6]">

            <div className="max-w-360 mx-auto px-6 md:px-12 lg:px-20">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">

                    <div>
                        <span className="block text-secondary tracking-[0.2em] uppercase text-xs font-bold mb-3">
                            Products to work with
                        </span>

                        <h2 className="text-primary font-bold text-4xl md:text-5xl leading-tight">
                            Proven FMCG Re-Export Expertise
                        </h2>

                        <p className="text-slate-500 mt-4 max-w-xl">
                            We source high-value industrial, technological, and essential goods
                            from trusted global suppliers ensuring quality and reliability.
                        </p>
                    </div>

                    <Link href="/import" className="group flex items-center gap-2 text-primary font-semibold hover:text-secondary transition">
                        View All Imports
                        <span className="transition-transform group-hover:translate-x-1">
                            →
                        </span>
                    </Link>

                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* MAIN CARD */}
                    <div className="lg:col-span-7 group relative overflow-hidden rounded-2xl shadow-lg bg-white">

                        <div className="flex flex-col md:flex-row">

                            {/* image */}
                            <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                                <Image width={800} height={800} src="https://www.faces.sa/on/demandware.static/-/Library-Sites-FacesSharedLibrary/default/dw47ac662c/0%20-%20Blogs/Niche%20Fragrances%20-%20Forat/MB-LP_banner-WInter_FR.jpg"
                                    alt='lorem5'
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />


                                {/* overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
                            </div>

                            {/* content */}
                            <div className="md:w-1/2 p-10 flex flex-col">

                                <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition">
                                    Major global FMCG brands
                                </h3>

                                <p className="text-slate-600 leading-relaxed">
                                    <strong>Gillette</strong> (Shaving products), <strong>BIC</strong> (Stationery and razors), <strong>British American Tobacco</strong> (555 Cigarettes), Branded Parfum&apos;s
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE STACK */}
                    <div className="lg:col-span-5 flex flex-col gap-6">

                        {/* CARD 1 */}
                        <div className="group bg-white rounded-2xl p-6 flex sm:flex-row flex-col items-center gap-6 shadow-md hover:shadow-xl transition cursor-pointer">

                            <div className="sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0">
                                <Image width={500} height={500} src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxp7WYd0_cXpwCnehIJIxgQuHgWY21Ysv5gmJMfUgs3P5FYUxlLQunTMRCuHeefx4EHFKRNiZa6tuKA0RbubSWkmRDC56SOpVPYtfFAdZZPO49vSYDZNhj95oQP4o7kfEsXpP11zpsJvvVkP0f95GqRnqcaMeMgCn2zGuH_cImfx4kgGuOX4QApV4R6Z89RvdkJ7L37vA614EwJ1PUviqDRY9MA9DADS0OI2pdS-nfxgbAnb2KmkvZd0dcEK76m2xiWOC0fGk2M7w"
                                    className="w-full h-full object-cover group-hover:scale-110 transition" alt='lorem5' />

                            </div>

                            <div>
                                <h3 className="font-bold text-lg text-primary group-hover:text-secondary transition">
                                    For Import
                                </h3>
                                <p className="text-slate-500 text-sm mt-1">
                                    Imported products include honey, sauces, jerky, chocolates, Korean drinks, snacks, canned food, bakery items, and premium lifestyle products from the USA, South Korea, and other countries.
                                </p>
                            </div>

                        </div>

                        {/* CARD 2 */}
                        <div className="group bg-white rounded-2xl p-6 flex sm:flex-row flex-col items-center gap-6 shadow-md hover:shadow-xl transition cursor-pointer">

                            <div className="sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0">
                                <Image width={500} height={500} src="https://lh3.googleusercontent.com/aida-public/AB6AXuDS6YHII5aAFnw1XosBTNeGH2Ya3V1OWBHCKpgVsb_mPRLhGu239EqpwnjMSIOLG0GGXVxONokukdXqhAVly8JUmFoCez11xSOX73hNUlRlz4SD5F4N4ig18W9ytQCtslFMlRxPGRpBT-RPLFSZHpUuH1JvX_YQsF8YtwPGZB9bwtGb_VyMW5vod3xZ__GAxhZXTJphej8yxcGs8g2OL00RCzO6uEW87eWoFe4-_o3KUPkvi44i1HvtCr-k0Ap2LwEHJwC7uiB7_aE"
                                className="w-full h-full object-cover group-hover:scale-110 transition" alt='lorem5' />

                            </div>

                            <div>
                                <h3 className="font-bold text-lg text-primary group-hover:text-secondary transition">
                                    For Export
                                </h3>
                                <p className="text-slate-500 text-sm mt-1">
                                    Exporting eco-friendly jute products, leather goods, handicrafts, and branded items from Bangladesh to global markets including the USA and Canada.
                                </p>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </section>
    )
}

export default ImportSection