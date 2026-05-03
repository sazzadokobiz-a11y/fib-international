import React from 'react'
import Container from '@/components/shared/Container'

function Term() {
    return (
        <div className="py-20 bg-gradient-to-b from-white to-[#f5f0e6]">

            <Container>

                {/* Header */}
                <div className="text-center mb-14">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary">
                        Terms & Services
                    </h1>
                    <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
                        Please read these terms carefully before using JV Family International services.
                        By accessing our platform, you agree to comply with the following terms.
                    </p>
                </div>

                {/* Content */}
                <div className="bg-white rounded-2xl shadow-sm border p-10 space-y-10">

                    {/* 1 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-3">
                            1. Acceptance of Terms
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            By accessing or using our website and services, you agree to be bound by these Terms & Conditions.
                            If you do not agree, please discontinue use of our services immediately.
                        </p>
                    </section>

                    {/* 2 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-3">
                            2. Services Overview
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            JV Family International provides import, export, sourcing, and international trade facilitation services.
                            All services are subject to availability, supplier conditions, and international trade regulations.
                        </p>
                    </section>

                    {/* 3 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-3">
                            3. Orders & Transactions
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            All orders are subject to confirmation. Pricing, availability, and shipping timelines may vary
                            depending on supplier and logistics conditions.
                        </p>
                    </section>

                    {/* 4 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-3">
                            4. Payment Terms
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            Payments must be made according to agreed terms. JV Family International reserves the right
                            to hold or cancel orders in case of non-payment or suspicious activity.
                        </p>
                    </section>

                    {/* 5 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-3">
                            5. Shipping & Delivery
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            Delivery timelines are estimates and may vary due to customs clearance, shipping delays,
                            or unforeseen international logistics issues.
                        </p>
                    </section>

                    {/* 6 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-3">
                            6. Liability
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            We are not liable for indirect losses, delays, or damages caused by third-party logistics,
                            suppliers, or customs authorities.
                        </p>
                    </section>

                    {/* 7 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-3">
                            7. Changes to Terms
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            JV Family International reserves the right to update or modify these terms at any time
                            without prior notice. Continued use of our services implies acceptance of changes.
                        </p>
                    </section>

                    {/* 8 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-3">
                            8. Contact Information
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            For any questions regarding these Terms & Services, please contact us via our official email
                            or contact page.
                        </p>
                    </section>

                </div>

                {/* Footer Note */}
                <p className="text-center text-sm text-slate-500 mt-10">
                    Last updated: April 2026 · JV Family International
                </p>

            </Container>
        </div>
    )
}

export default Term