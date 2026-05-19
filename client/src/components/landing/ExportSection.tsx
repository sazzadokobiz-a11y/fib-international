import React from 'react'
import Container from '../shared/Container'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getExportProducts } from '@/services/product'
import { ExportProduct } from '@/types/product'

const ExportSection = async() => {
    const {data} = await getExportProducts({limit: 4, sortBy: "createdAt", sortOrder: "desc"});
    const products: ExportProduct[] = data.data;
    
    return (
        <section className="py-32 bg-[#f5f0e6]">
            <Container>
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <div>
                        <span className="block text-secondary tracking-[0.05em] uppercase text-sm font-bold mb-4 font-label">Outbound Logistics</span>
                        <h2 className="text-primary font-headline font-semibold text-4xl md:text-[2.5rem] leading-[1.2] tracking-tight">
                            Premium Export Products
                        </h2>
                    </div>
                    <Link
                        href="/export"
                        className="flex items-center gap-2 text-primary font-medium hover:text-secondary transition-colors duration-300 group"
                    >
                        View All Exports
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {
                        products?.map((prod: ExportProduct) => <div key={prod._id} className="group bg-[#fcf9f4] rounded-xl overflow-hidden cursor-pointer transition-transform duration-500 hover:-translate-y-2">
                            <div className="h-64 overflow-hidden">
                                <Image
                                    alt="Lush green agricultural fields viewed"
                                    src={prod.thumbnail}
                                    height={800}
                                    width={800}
                                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                            </div>
                            <div className="p-8">
                                <h3 className="font-headline font-semibold text-xl text-primary mb-3">{prod.name.length > 20 ? prod?.name?.slice(0, 20) + "..." : prod.name}</h3>
                                <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-6">{prod.description.length > 150 ? prod?.description?.slice(0, 150) + "..." : prod.description}</p>
                                <div className="h-1 w-8 bg-surface-variant group-hover:bg-secondary transition-colors duration-300"></div>
                            </div>
                        </div>)
                    }
                </div>

            </Container>

        </section>
    )
}

export default ExportSection
