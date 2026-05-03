import React from 'react'
import Container from '@/components/shared/Container'
import Link from 'next/link'

function SiteMap() {
    return (
        <div className="py-20 bg-gradient-to-b from-white to-[#f5f0e6]">

            <Container>

                {/* Header */}
                <div className="text-center mb-14">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary">
                        Sitemap
                    </h1>
                    <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
                        Explore all pages of JV Family International in one place for easy navigation
                        and quick access to our services.
                    </p>
                </div>

                {/* Sitemap Grid */}
                <div className="grid md:grid-cols-3 gap-8">

                    {/* Company */}
                    <div className="bg-white rounded-2xl shadow-sm border p-6">
                        <h2 className="text-xl font-semibold text-primary mb-4">
                            Company
                        </h2>
                        <ul className="space-y-3 text-slate-600">
                            <li><Link href="/" className="hover:text-secondary">Home</Link></li>
                            <li><Link href="/about" className="hover:text-secondary">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-secondary">Contact</Link></li>
                            <li><Link href="/terms" className="hover:text-secondary">Terms & Services</Link></li>
                            <li><Link href="/privacy" className="hover:text-secondary">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="bg-white rounded-2xl shadow-sm border p-6">
                        <h2 className="text-xl font-semibold text-primary mb-4">
                            Services
                        </h2>
                        <ul className="space-y-3 text-slate-600">
                            <li><Link href="/export" className="hover:text-secondary">Export Products</Link></li>
                            <li><Link href="/import" className="hover:text-secondary">Import Services</Link></li>
                            <li><Link href="/compliance" className="hover:text-secondary">Global Compliance</Link></li>
                            <li><Link href="/sourcing" className="hover:text-secondary">Product Sourcing</Link></li>
                        </ul>
                    </div>

                    {/* Products / Categories */}
                    <div className="bg-white rounded-2xl shadow-sm border p-6">
                        <h2 className="text-xl font-semibold text-primary mb-4">
                            Export Categories
                        </h2>
                        <ul className="space-y-3 text-slate-600">
                            <li><Link href="/export/agriculture" className="hover:text-secondary">Agricultural Commodities</Link></li>
                            <li><Link href="/export/textiles" className="hover:text-secondary">Textiles & Garments</Link></li>
                            <li><Link href="/export/industrial" className="hover:text-secondary">Industrial Components</Link></li>
                            <li><Link href="/export/raw-materials" className="hover:text-secondary">Raw Materials</Link></li>
                        </ul>
                    </div>

                </div>

                {/* Footer Note */}
                <div className="text-center mt-12 text-sm text-slate-500">
                    JV Family International · Global Trade Network
                </div>

            </Container>
        </div>
    )
}

export default SiteMap