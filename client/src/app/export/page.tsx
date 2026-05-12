import Container from '@/components/shared/Container'
import {
    NativeSelect,
    NativeSelectOption,
} from "@/components/ui/native-select"
import ProductCard from '@/components/cards/ProductCard';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group"
import { SearchIcon } from 'lucide-react';
import { getSubCategories } from '@/services/subCategory';
import { getExportProducts } from '@/services/product';
import Link from 'next/link';

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
        case "name":
            return { sortBy: "name", sortOrder: "asc" as const };
        case "oldest":
            return { sortBy: "createdAt", sortOrder: "asc" as const };
        default:
            return { sortBy: "createdAt", sortOrder: "desc" as const };
    }
}

const createPageHref = (params: Record<string, string>, page: number) => {
    const nextParams = new URLSearchParams(params);
    nextParams.set("page", String(page));
    return `/export?${nextParams.toString()}`;
}

const ExportPage = async ({ searchParams }: PageProps) => {
    const resolvedParams = await searchParams || {};
    const search = getParam(resolvedParams, "search");
    const subCategory = getParam(resolvedParams, "subCategory");
    const sort = getParam(resolvedParams, "sort");
    const page = getParam(resolvedParams, "page") || "1";
    const sortQuery = getSort(sort);

    const [{ data: allSubCategories }, productResponse] = await Promise.all([
        getSubCategories("Export"),
        getExportProducts({
            search,
            subCategory,
            page,
            limit: 12,
            ...sortQuery
        })
    ]);

    const products = productResponse.data.data;
    const meta = productResponse.data.meta;
    const currentQuery = {
        ...(search ? { search } : {}),
        ...(subCategory ? { subCategory } : {}),
        ...(sort ? { sort } : {}),
    };

    return (
        <div className='pb-10'>
            <Container>
                <div className='py-8 flex flex-col md:flex-row md:items-start md:justify-between gap-4'>
                    <h1 className='text-3xl md:text-4xl font-semibold'>
                        Our Export Portfolio
                    </h1>

                    <p className='text-base md:text-lg mt-2 md:mt-4 max-w-lg'>
                        Explore our diverse range of export products, <br />
                        showcasing our commitment to quality and<br />
                        global trade excellence.
                    </p>
                </div>

                <form action="/export" className='bg-secondary/20 mb-3 rounded-lg py-4 px-3 flex flex-col sm:flex-row sm:items-center gap-3'>
                    <InputGroup className='w-full sm:max-w-md border border-gray-300'>
                        <InputGroupInput name="search" defaultValue={search} placeholder="Search..." />
                        <InputGroupAddon>
                            <SearchIcon />
                        </InputGroupAddon>
                    </InputGroup>

                    <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto'>
                        <NativeSelect name="subCategory" defaultValue={subCategory} className='bg-white rounded-lg w-full sm:w-auto'>
                            <NativeSelectOption value="">All Export Subcategories</NativeSelectOption>
                            {allSubCategories.map((subCat) => (
                                <NativeSelectOption key={subCat._id} value={subCat.name}>
                                    {subCat.name}
                                </NativeSelectOption>
                            ))}
                        </NativeSelect>

                        <NativeSelect name="sort" defaultValue={sort} className='bg-white rounded-lg w-full sm:w-auto'>
                            <NativeSelectOption value="">Latest</NativeSelectOption>
                            <NativeSelectOption value="name">Name A-Z</NativeSelectOption>
                            <NativeSelectOption value="oldest">Oldest</NativeSelectOption>
                        </NativeSelect>

                        <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90">
                            Filter
                        </button>
                    </div>
                </form>

                {products.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-gray-300 bg-white py-16 text-center text-gray-500">
                        No export products found.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {products.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}

                {meta.totalPages > 1 && (
                    <div className='mt-10 flex justify-center gap-2 overflow-x-auto'>
                        <Link
                            href={createPageHref(currentQuery, Math.max(1, meta.page - 1))}
                            className={`rounded-lg px-3 py-2 text-sm font-semibold ${meta.page === 1 ? "pointer-events-none bg-gray-200 text-gray-400" : "bg-secondary text-primary"}`}
                        >
                            Previous
                        </Link>
                        {Array.from({ length: meta.totalPages }, (_, index) => index + 1).map((pageNumber) => (
                            <Link
                                key={pageNumber}
                                href={createPageHref(currentQuery, pageNumber)}
                                className={`rounded-lg px-3 py-2 text-sm font-semibold ${pageNumber === meta.page ? "bg-primary text-white" : "bg-secondary text-primary"}`}
                            >
                                {pageNumber}
                            </Link>
                        ))}
                        <Link
                            href={createPageHref(currentQuery, Math.min(meta.totalPages, meta.page + 1))}
                            className={`rounded-lg px-3 py-2 text-sm font-semibold ${meta.page === meta.totalPages ? "pointer-events-none bg-gray-200 text-gray-400" : "bg-secondary text-primary"}`}
                        >
                            Next
                        </Link>
                    </div>
                )}

                {products.length > 0 && (
                    <>
                        <div className='h-1 bg-gray-200 rounded-full mx-auto w-full mt-10 backdrop-blur-xl'></div>

                        <div className="mt-14">
                            <div className="flex items-end justify-between mb-4">
                                <div>
                                    <h2 className="text-2xl font-semibold">Suggested For You</h2>
                                    <p className="text-sm text-gray-600">
                                        Hand-picked export products based on demand trends
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
                                {products.slice(0, 5).map(product => (
                                    <div key={product._id} className="scale-[0.97] hover:scale-100 transition">
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}
            </Container>
        </div>
    )
}

export default ExportPage
