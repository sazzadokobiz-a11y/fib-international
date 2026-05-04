import React from 'react'
import Container from '@/components/shared/Container'
import ProductCard from '@/components/cards/ProductCard'
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import {
    NativeSelect,
    NativeSelectOption,
} from "@/components/ui/native-select"
import { SearchIcon, Globe, Truck, ShieldCheck, Package } from 'lucide-react'
import { products } from "@/data/products"
import { getSubCategories, type SubCategory } from '@/services/subCategory';

export const dynamic = "force-dynamic";

const ImportPage = async () => {
    const { data: allSubCategories } = await getSubCategories("Import");

    return (
        <div className="pb-20">

            {/* HERO */}
            <div className="bg-linear-to-br from-secondary/20 via-secondary/10 to-transparent py-16">
                <Container>
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight mb-4">
                                Global Import Solutions <br /> Made Simple
                            </h1>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                Source high-quality products from trusted international suppliers.
                                We streamline logistics, compliance, and delivery—so you can focus on growing your business.
                            </p>

                            <div className="flex gap-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-secondary">50+</h3>
                                    <p className="text-sm text-slate-500">Countries</p>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-secondary">10K+</h3>
                                    <p className="text-sm text-slate-500">Products</p>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-secondary">24/7</h3>
                                    <p className="text-sm text-slate-500">Support</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white shadow-xl rounded-2xl p-6">
                            <h3 className="text-lg font-semibold mb-4">Why Import With Us?</h3>
                            <div className="space-y-4">
                                <div className="flex gap-3 items-center">
                                    <ShieldCheck className="text-secondary" />
                                    <p className="text-sm">Verified suppliers</p>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <Truck className="text-secondary" />
                                    <p className="text-sm">Fast global shipping</p>
                                </div>
                                <div className="flex gap-3 items-center">
                                    <Globe className="text-secondary" />
                                    <p className="text-sm">Worldwide sourcing</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            <Container>

                {/* FILTER */}
                <div className="bg-white border shadow-sm rounded-xl p-4 flex flex-col lg:flex-row gap-4 lg:items-center justify-between mt-10">
                    <InputGroup className="w-full lg:max-w-md">
                        <InputGroupInput placeholder="Search import products..." />
                        <InputGroupAddon>
                            <SearchIcon size={18} />
                        </InputGroupAddon>
                    </InputGroup>

                    <div className="flex gap-3">
                        <NativeSelect className="bg-gray-50 rounded-lg">
                            <NativeSelectOption value="">All Categories</NativeSelectOption>
                            {allSubCategories.map((subCategory: SubCategory) => (
                                <NativeSelectOption key={subCategory._id} value={subCategory.name.toLowerCase()}>
                                    {subCategory.name}
                                </NativeSelectOption>
                            ))}
                        </NativeSelect>

                        <NativeSelect className="bg-gray-50 rounded-lg">
                            <NativeSelectOption>Sort</NativeSelectOption>
                            <NativeSelectOption>Latest</NativeSelectOption>
                            <NativeSelectOption>Price</NativeSelectOption>
                        </NativeSelect>
                    </div>
                </div>

                {/* GRID */}
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>

                {/* HOW IT WORKS */}
                <div className="mt-20">
                    <h2 className="text-3xl font-semibold text-center mb-10">
                        How Import Works
                    </h2>

                    <div className="grid md:grid-cols-4 gap-6 text-center">
                        {[
                            { icon: Package, title: "Choose Product" },
                            { icon: Globe, title: "Source Globally" },
                            { icon: Truck, title: "We Ship" },
                            { icon: ShieldCheck, title: "Safe Delivery" },
                        ].map((step, i) => (
                            <div key={i} className="p-6 bg-[#f9fafb] rounded-xl hover:shadow-md transition">
                                <step.icon className="mx-auto text-secondary mb-3" size={28} />
                                <h4 className="font-medium">{step.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>

                {/* TRUST SECTION */}
                <div className="mt-20 bg-linear-to-r from-secondary/10 to-transparent p-10 rounded-2xl">
                    <h2 className="text-2xl font-semibold mb-6 text-center">
                        Trusted by Businesses Worldwide
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6 text-center">
                        <div>
                            <h3 className="text-3xl font-bold text-secondary">500+</h3>
                            <p className="text-slate-600">Global Clients</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-secondary">120+</h3>
                            <p className="text-slate-600">Verified Suppliers</p>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-secondary">99%</h3>
                            <p className="text-slate-600">Delivery Success</p>
                        </div>
                    </div>
                </div>

            </Container>
        </div>
    )
}

export default ImportPage
