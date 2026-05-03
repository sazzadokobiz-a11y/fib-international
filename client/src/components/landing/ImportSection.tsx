import Image from 'next/image'
import React from 'react'

const ImportSection = () => {
    return (
        <section className="py-28 bg-gradient-to-b from-white to-[#f5f0e6]">

            <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">

                    <div>
                        <span className="block text-secondary tracking-[0.2em] uppercase text-xs font-bold mb-3">
                            Global Import Network
                        </span>

                        <h2 className="text-primary font-bold text-4xl md:text-5xl leading-tight">
                            Strategic Import Acquisition
                        </h2>

                        <p className="text-slate-500 mt-4 max-w-xl">
                            We source high-value industrial, technological, and essential goods
                            from trusted global suppliers ensuring quality and reliability.
                        </p>
                    </div>

                    <button className="group flex items-center gap-2 text-primary font-semibold hover:text-secondary transition">
                        View All Imports
                        <span className="transition-transform group-hover:translate-x-1">
                            →
                        </span>
                    </button>

                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* MAIN CARD */}
                    <div className="lg:col-span-7 group relative overflow-hidden rounded-2xl shadow-lg bg-white">

                        <div className="flex flex-col md:flex-row">

                            {/* image */}
                            <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                                <Image width={800} height={800} src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwpFxmfbq3NsWA2kfzAjgNhclhMuZTxbAGJG1K34stiIYnGjNoqLUyxmImS7kTog3SX0J65w3o-Ciu9ly9MKG3yLRDcFXECyFvQd_W9DLsoe67u_h1v5SI6xbunKj2elLEo-Qt8oWMrXk5AO1Df5ILCZ12Kz1LCP8EqzFkzgpCHbLywhBJc9OqzsNU7BSwJ0rciG_RZG7NdT0SfT6xtaXa4oA07Nsl3fDcvEF7BTj-GLlN-lpPS1u2l1JWHO8HWUNBpBVGHhZOmXc"
                                    alt='lorem5'
                                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />


                                {/* overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                            </div>

                            {/* content */}
                            <div className="md:w-1/2 p-10 flex flex-col justify-center">

                                <h3 className="text-2xl font-bold text-primary mb-4 group-hover:text-secondary transition">
                                    Advanced Technology Imports
                                </h3>

                                <p className="text-slate-600 leading-relaxed mb-6">
                                    Procuring cutting-edge electronics, semiconductors, and industrial systems
                                    to empower domestic innovation and manufacturing growth.
                                </p>

                                <span className="text-secondary font-semibold uppercase tracking-widest text-sm cursor-pointer hover:text-primary transition">
                                    Explore Sector →
                                </span>

                            </div>
                        </div>
                    </div>

                    {/* RIGHT SIDE STACK */}
                    <div className="lg:col-span-5 flex flex-col gap-6">

                        {/* CARD 1 */}
                        <div className="group bg-white rounded-2xl p-6 flex items-center gap-6 shadow-md hover:shadow-xl transition cursor-pointer">

                            <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                                <Image width={800} height={800} src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxp7WYd0_cXpwCnehIJIxgQuHgWY21Ysv5gmJMfUgs3P5FYUxlLQunTMRCuHeefx4EHFKRNiZa6tuKA0RbubSWkmRDC56SOpVPYtfFAdZZPO49vSYDZNhj95oQP4o7kfEsXpP11zpsJvvVkP0f95GqRnqcaMeMgCn2zGuH_cImfx4kgGuOX4QApV4R6Z89RvdkJ7L37vA614EwJ1PUviqDRY9MA9DADS0OI2pdS-nfxgbAnb2KmkvZd0dcEK76m2xiWOC0fGk2M7w"
                                    className="w-full h-full object-cover group-hover:scale-110 transition" alt='lorem5' />

                            </div>

                            <div>
                                <h3 className="font-bold text-lg text-primary group-hover:text-secondary transition">
                                    Pharmaceuticals
                                </h3>
                                <p className="text-slate-500 text-sm mt-1">
                                    Safe handling of critical medical supply chains.
                                </p>
                            </div>

                        </div>

                        {/* CARD 2 */}
                        <div className="group bg-white rounded-2xl p-6 flex items-center gap-6 shadow-md hover:shadow-xl transition cursor-pointer">

                            <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                                <Image width={800} height={800} src="https://lh3.googleusercontent.com/aida-public/AB6AXuDS6YHII5aAFnw1XosBTNeGH2Ya3V1OWBHCKpgVsb_mPRLhGu239EqpwnjMSIOLG0GGXVxONokukdXqhAVly8JUmFoCez11xSOX73hNUlRlz4SD5F4N4ig18W9ytQCtslFMlRxPGRpBT-RPLFSZHpUuH1JvX_YQsF8YtwPGZB9bwtGb_VyMW5vod3xZ__GAxhZXTJphej8yxcGs8g2OL00RCzO6uEW87eWoFe4-_o3KUPkvi44i1HvtCr-k0Ap2LwEHJwC7uiB7_aE"
                                className="w-full h-full object-cover group-hover:scale-110 transition" alt='lorem5' />

                            </div>

                            <div>
                                <h3 className="font-bold text-lg text-primary group-hover:text-secondary transition">
                                    Automotive Parts
                                </h3>
                                <p className="text-slate-500 text-sm mt-1">
                                    Just-in-time supply for manufacturing lines.
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