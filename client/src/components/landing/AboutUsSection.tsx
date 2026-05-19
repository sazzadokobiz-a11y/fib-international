import React from 'react'
import Container from '../shared/Container'
import Image from 'next/image'

const AboutUsSection = () => {
    return (
        <section className="py-32 bg-[#f5f0e6] overflow-hidden">
            <Container>
                <div className="px-8 md:px-16 lg:px-24">
                    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
                        <div className="w-full lg:w-5/12 relative">
                            <div className="absolute -inset-4 bg-surface-container-highest rounded-2xl -z-10 translate-y-8 translate-x-8"></div>
                            <Image alt=""
                                className="w-full aspect-4/5 object-cover rounded-xl shadow-lg shadow-gray-700"
                                data-alt="Wide angle view of a modern sunlit corporate boardroom with floor to ceiling windows overlooking a major global city skyline"
                                width={800}
                                height={800}
                                src="https://images.unsplash.com/photo-1718289518008-2a6e78a87488?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
                            {/* Glassmorphic accent overlay */}
                            <div className="absolute -bottom-8 -right-8 bg-surface/80 backdrop-blur-sm p-8 rounded-xl max-w-70 shadow-[0_20px_40px_-10px_rgba(27,27,30,0.08)] hidden md:block">
                                <span className="text-4xl font-headline font-bold text-primary block mb-2">8+</span>
                                <span className="text-on-surface-variant text-sm font-medium">Years of unyielding excellence in global markets.</span>
                            </div>
                        </div>
                        <div className="w-full lg:w-7/12">
                            <span className="block text-secondary tracking-[0.05em] uppercase text-sm font-bold mb-6 font-label">Our Legacy</span>
                            <h2 className="text-primary font-headline font-bold text-4xl md:text-5xl leading-[1.1] tracking-[-0.02em] mb-8">
                                Bridging Continental Divides.
                            </h2>
                            <p className="font-body text-on-surface-variant text-lg leading-[1.8] mb-8">
                                Family JV International Business Ltd. is not merely a facilitator of trade; we are architects of global supply chains. With roots deeply embedded in maritime heritage and eyes fixed firmly on the digital horizon, we engineer pathways for commerce that defy friction.
                            </p>
                            <p className="font-body text-on-surface-variant text-base leading-[1.8] mb-12">
                                Our commitment is absolute: to deliver meticulous curation, ironclad compliance, and strategic foresight in every container we move. We partner with sovereign entities and private enterprises alike to ensure that goods flow not just seamlessly, but beautifully.
                            </p>
                            <p className="inline-flex items-center gap-3 text-primary font-semibold border-b-2 border-outline-variant pb-1 hover:border-primary transition-colors">
                                Join us in shaping the future of global trade.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    )
}

export default AboutUsSection