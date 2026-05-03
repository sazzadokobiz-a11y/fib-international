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
import { products } from "@/data/products"

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const ExportPage = () => {
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)))

    return (
        <div className='pb-10'>
            <Container>

                {/* HEADER */}
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

                {/* FILTER BAR */}
                <div className='bg-secondary/20 mb-3 rounded-lg py-4 px-3 flex flex-col sm:flex-row sm:items-center gap-3'>

                    {/* Search */}
                    <InputGroup className='w-full sm:max-w-md border border-gray-300'>
                        <InputGroupInput placeholder="Search..." />
                        <InputGroupAddon>
                            <SearchIcon />
                        </InputGroupAddon>
                    </InputGroup>

                    <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto'>

                        {/* Category */}
                        <NativeSelect className='bg-white rounded-lg w-full sm:w-auto'>
                            <NativeSelectOption value="">Select All Category</NativeSelectOption>
                            {uniqueCategories.map(category => (
                                <NativeSelectOption key={category} value={category.toLowerCase()}>
                                    {category}
                                </NativeSelectOption>
                            ))}
                        </NativeSelect>

                        {/* Sort */}
                        <NativeSelect className='bg-white rounded-lg w-full sm:w-auto'>
                            <NativeSelectOption value="">Sort</NativeSelectOption>
                            <NativeSelectOption value="natural">Natural</NativeSelectOption>
                            <NativeSelectOption value="artificial">Atrificial</NativeSelectOption>
                        </NativeSelect>

                    </div>
                </div>

                {/* PRODUCTS GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {products.map(product => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>


                {/* PAGINATION */}
                <div className='mt-10 flex justify-center overflow-x-auto'>
                    <Pagination>
                        <PaginationContent className="flex flex-wrap justify-center gap-2">
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" isActive>
                                    2
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>


                <div className='h-1 bg-gray-200 rounded-full mx-auto w-full mt-5 backdrop-blur-xl'></div>



                {/* SUGGESTED PRODUCTS */}
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
                        {products.slice(0, 6).map(product => (
                            <div key={product._id} className="scale-[0.97] hover:scale-100 transition">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>

                 <div className='h-1 bg-gray-200 rounded-full mx-auto w-full mt-5 backdrop-blur-xl'></div>


                {/* RELATED PRODUCTS */}
                <div className="mt-10">
                    <div className="mb-5">
                        <h2 className="text-2xl font-semibold">Related Products</h2>
                        <p className="text-sm text-gray-600">
                            Similar export items you may also be interested in
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {products.slice(4, 12).map(product => (
                            <div key={product._id} className="scale-[0.97] hover:scale-100 transition">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                </div>

            </Container>
        </div>
    )
}

export default ExportPage