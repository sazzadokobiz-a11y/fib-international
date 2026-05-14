import Container from '@/components/shared/Container'
import ImportProductCard from '@/components/cards/ImportProductCard'
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
import { getSubCategories, type SubCategory } from '@/services/subCategory';
import { getImportProducts } from '@/services/product';
import { PaginationControls } from '@/components/shared/PaginationControls'

export const dynamic = "force-dynamic";

type PageProps = {
    searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

const getParam = (params: Record<string, string | string[] | undefined>, key: string) => {
    const value = params[key];
    return Array.isArray(value) ? value[0] || "" : value || "";
}

const getSort = (sort: string) => {
    switch (sort) {
        case "price-low":
            return { sortBy: "price", sortOrder: "asc" as const };
        case "price-high":
            return { sortBy: "price", sortOrder: "desc" as const };
        case "name":
            return { sortBy: "name", sortOrder: "asc" as const };
        default:
            return { sortBy: "createdAt", sortOrder: "desc" as const };
    }
}


const ImportPage = async ({ searchParams }: PageProps) => {
    const resolvedParams = await searchParams || {};
    const search = getParam(resolvedParams, "search");
    const subCategory = getParam(resolvedParams, "subCategory");
    const sort = getParam(resolvedParams, "sort");
    const page = getParam(resolvedParams, "page") || "1";
    const sortQuery = getSort(sort);

    const [{ data: allSubCategories }, productResponse] = await Promise.all([
        getSubCategories("Import"),
        getImportProducts({
            search,
            subCategory,
            page,
            limit: 12,
            ...sortQuery
        })
    ]);

    const products = productResponse.data.data;
    const meta = productResponse.data.meta;

    return (
        <div className="pb-20">
            <div className="bg-linear-to-br from-secondary/20 via-secondary/10 to-transparent py-16">
                <Container>
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight mb-4">
                                Global Import Solutions <br /> Made Simple
                            </h1>
                            <p className="text-slate-600 mb-6 leading-relaxed">
                                Source high-quality products from trusted international suppliers.
                                We streamline logistics, compliance, and delivery so you can focus on growing your business.
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
                <form action="/import" className="bg-white border shadow-sm rounded-xl p-4 flex flex-col lg:flex-row gap-4 lg:items-center justify-between mt-10">
                    <InputGroup className="w-full lg:max-w-md">
                        <InputGroupInput name="search" defaultValue={search} placeholder="Search import products..." />
                        <InputGroupAddon>
                            <SearchIcon size={18} />
                        </InputGroupAddon>
                    </InputGroup>

                    <div className="flex flex-col sm:flex-row gap-3">
                        <NativeSelect name="subCategory" defaultValue={subCategory} className="bg-gray-50 rounded-lg">
                            <NativeSelectOption value="">All Import Subcategories</NativeSelectOption>
                            {allSubCategories.map((subCat: SubCategory) => (
                                <NativeSelectOption key={subCat._id} value={subCat.name}>
                                    {subCat.name}
                                </NativeSelectOption>
                            ))}
                        </NativeSelect>

                        <NativeSelect name="sort" defaultValue={sort} className="bg-gray-50 rounded-lg">
                            <NativeSelectOption value="">Latest</NativeSelectOption>
                            <NativeSelectOption value="price-low">Price Low</NativeSelectOption>
                            <NativeSelectOption value="price-high">Price High</NativeSelectOption>
                            <NativeSelectOption value="name">Name A-Z</NativeSelectOption>
                        </NativeSelect>

                        <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90">
                            Filter
                        </button>
                    </div>
                </form>

                {products.length === 0 ? (
                    <div className="mt-10 rounded-lg border border-dashed border-gray-300 bg-white py-16 text-center text-gray-500">
                        No import products found.
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
                        {products.map(product => (
                            <ImportProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}

                {meta.totalPages > 1 && (
                    <PaginationControls meta={meta} href='/import'/>
                )}

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
                        ].map((step) => (
                            <div key={step.title} className="p-6 bg-[#f9fafb] rounded-xl hover:shadow-md transition">
                                <step.icon className="mx-auto text-secondary mb-3" size={28} />
                                <h4 className="font-medium">{step.title}</h4>
                            </div>
                        ))}
                    </div>
                </div>

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
