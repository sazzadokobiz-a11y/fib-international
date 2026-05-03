import React from 'react'
import Container from '../shared/Container'
import { Globe, Eye } from 'lucide-react'

const MissionVision = () => {
    return (
        <section className="py-28 bg-gradient-to-b from-white to-[#f5f0e6]">
            <Container>

                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-primary">
                        Mission & Vision
                    </h2>
                    <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
                        Driving global trade with trust, precision, and long-term international partnerships.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                    {/* Mission Card */}
                    <div className="relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">

                        <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary opacity-95 group-hover:opacity-100 transition"></div>

                        <div className="relative p-12 md:p-16 text-white">

                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                    <Globe className="text-white" />
                                </div>
                                <h3 className="text-3xl font-bold">Our Mission</h3>
                            </div>

                            <p className="text-white/90 text-lg leading-relaxed">
                                To simplify global trade by delivering reliable, compliant,
                                and efficient import-export solutions that empower businesses
                                to expand beyond borders with confidence and consistency.
                            </p>

                            <div className="mt-10 h-1 w-20 bg-white/40 group-hover:w-32 transition-all duration-500"></div>
                        </div>
                    </div>

                    {/* Vision Card */}
                    <div className="relative group rounded-2xl overflow-hidden bg-white border shadow-sm hover:shadow-xl transition-all duration-500">

                        <div className="absolute inset-0 bg-gradient-to-tr from-[#f5f0e6] to-white opacity-0 group-hover:opacity-100 transition"></div>

                        <div className="relative p-12 md:p-16">

                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                                    <Eye className="text-secondary" />
                                </div>
                                <h3 className="text-3xl font-bold text-primary">
                                    Our Vision
                                </h3>
                            </div>

                            <p className="text-slate-600 text-lg leading-relaxed">
                                To become a globally trusted trading partner recognized for excellence,
                                transparency, and innovation in international supply chain solutions.
                            </p>

                            <div className="mt-10 h-1 w-20 bg-secondary/40 group-hover:w-32 transition-all duration-500"></div>
                        </div>
                    </div>

                </div>
            </Container>
        </section>
    )
}

export default MissionVision