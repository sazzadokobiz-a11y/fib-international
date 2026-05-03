import React from 'react'
import Container from '@/components/shared/Container'

function Compliance() {
    return (
        <div className="py-20 bg-gradient-to-b from-white to-[#f5f0e6]">

            <Container>

                {/* Header */}
                <div className="text-center mb-14">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary">
                        Global Compliance
                    </h1>
                    <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
                        JV Family International operates in full compliance with international trade laws,
                        ethical sourcing standards, and regulatory frameworks across global markets.
                    </p>
                </div>

                {/* Content */}
                <div className="bg-white rounded-2xl shadow-sm border p-10 space-y-10">

                    {/* 1 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-3">
                            1. Regulatory Compliance
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            We strictly adhere to international trade regulations, export-import laws,
                            customs requirements, and country-specific compliance standards to ensure
                            smooth and lawful global operations.
                        </p>
                    </section>

                    {/* 2 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-3">
                            2. Ethical Sourcing
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            All products and materials are sourced responsibly from verified suppliers
                            who meet ethical labor, environmental, and sustainability standards.
                        </p>
                    </section>

                    {/* 3 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-3">
                            3. Anti-Money Laundering (AML)
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            We follow strict AML policies to prevent financial fraud, illegal transactions,
                            and ensure transparency in all financial operations.
                        </p>
                    </section>

                    {/* 4 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-3">
                            4. Know Your Customer (KYC)
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            We implement KYC verification processes to ensure all business partners,
                            clients, and suppliers are legitimate and verified entities.
                        </p>
                    </section>

                    {/* 5 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-3">
                            5. Sanctions & Restricted Entities
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            We comply with global sanctions lists and do not engage with restricted
                            individuals, organizations, or countries under international law.
                        </p>
                    </section>

                    {/* 6 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-3">
                            6. Sustainability Standards
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            We actively promote sustainable sourcing, reduced environmental impact,
                            and responsible supply chain practices across all operations.
                        </p>
                    </section>

                    {/* 7 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-3">
                            7. Data & Trade Transparency
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            We ensure transparency in documentation, trade records, and communication
                            to maintain trust with clients and regulatory bodies.
                        </p>
                    </section>

                    {/* 8 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-3">
                            8. Continuous Monitoring
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            Our compliance systems are regularly reviewed and updated to match evolving
                            international trade laws and global market requirements.
                        </p>
                    </section>

                </div>

                {/* Footer */}
                <p className="text-center text-sm text-slate-500 mt-10">
                    JV Family International · Global Trade Compliance Standards
                </p>

            </Container>
        </div>
    )
}

export default Compliance