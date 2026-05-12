import Link from "next/link"
import { TProduct } from "@/types/product"
import Image from "next/image";

const ProductCard = ({ product }: { product: TProduct }) => {
    const { _id, name, thumbnail, image, category, subCategory, moq, slug, description } = product;
    const imageSrc = thumbnail || image || "/window.svg";
    return (
        <Link href={`/export/${slug}`} key={_id} className='block rounded-lg overflow-hidden shadow-lg shadow-gray-400 hover:shadow-lg transition-shadow duration-300'>
            <div className='bg-white pb-5'>
                <div className='relative'>
                    <Image  src={imageSrc} alt={name} width={400} height={400} className="w-full h-96 object-cover"/>

                    <div className='border border-secondary rounded-lg py-1 px-2 w-fit  backdrop-blur-sm  absolute top-4 left-4'>{subCategory || category}</div>
                </div>

                <div className='p-3'>
                    <h2 className='text-2xl font-semibold mt-4 text-primary'>{name}</h2>
                    <p className='line-clamp-3'>{description}</p>
                </div>

            </div>

            <div className='flex items-center justify-between p-3 bg-secondary/10'>
                <p className="font-semibold text-lg text-gray-600 cursor-pointer hover:underline">MOQ: {moq}</p>
                <span className='bg-primary hover:bg-gray-700 transition trans duration-300 hover:scale-105 text-white p-2 rounded-lg'>View Details</span>
            </div>
        </Link>
    )
}

export default ProductCard
