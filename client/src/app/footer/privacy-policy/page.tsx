import React from 'react'
import Container from '@/components/shared/Container'

function Privacy() {
    return (
        <div className="py-20 bg-gradient-to-b from-white to-[#f5f0e6]">

            <Container>

                {/* Header */}
                <div className="text-center mb-14">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary">
                        Privacy Policy
                    </h1>
                    <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
                        At JV Family International, we value your privacy.
                        This policy explains how we collect, use, and protect your information.
                    </p>
                </div>

                {/* Content */}
                <div className="bg-white rounded-2xl shadow-sm border p-10 space-y-10">

                    {/* 1 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-3">
                            1. Information We Collect
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            We may collect personal information such as your name, email address,
                            phone number, company details, and inquiry messages when you interact
                            with our website or services.
                        </p>
                    </section>

                    {/* 2 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-3">
                            2. How We Use Your Information
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            Your information is used to respond to inquiries, process quotations,
                            improve our services, and communicate important updates regarding
                            import and export operations.
                        </p>
                    </section>

                    {/* 3 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-3">
                            3. Data Protection
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            We implement appropriate security measures to protect your personal data
                            from unauthorized access, alteration, disclosure, or destruction.
                        </p>
                    </section>

                    {/* 4 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-3">
                            4. Sharing of Information
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            We do not sell or rent your personal information.
                            Data may only be shared with trusted logistics partners, suppliers,
                            or legal authorities when required for business operations.
                        </p>
                    </section>

                    {/* 5 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-3">
                            5. Cookies & Tracking
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            Our website may use cookies to enhance user experience, analyze traffic,
                            and improve website functionality. You can disable cookies in your browser settings.
                        </p>
                    </section>

                    {/* 6 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-3">
                            6. Third-Party Services
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            We may use third-party services (such as analytics or email providers)
                            that follow their own privacy policies. We are not responsible for their practices.
                        </p>
                    </section>

                    {/* 7 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-3">
                            7. Your Rights
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            You have the right to request access, correction, or deletion of your personal data
                            by contacting us directly.
                        </p>
                    </section>

                    {/* 8 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-3">
                            8. Updates to This Policy
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            We may update this Privacy Policy from time to time.
                            Changes will be posted on this page with an updated revision date.
                        </p>
                    </section>

                    {/* 9 */}
                    <section>
                        <h2 className="text-2xl font-semibold text-primary mb-3">
                            9. Contact Us
                        </h2>
                        <p className="text-slate-600 leading-relaxed">
                            If you have any questions about this Privacy Policy,
                            please contact JV Family International through our official contact page or email.
                        </p>
                    </section>

                </div>

                {/* Footer */}
                <p className="text-center text-sm text-slate-500 mt-10">
                    Last updated: April 2026 · JV Family International
                </p>

            </Container>
        </div>
    )
}

export default Privacy