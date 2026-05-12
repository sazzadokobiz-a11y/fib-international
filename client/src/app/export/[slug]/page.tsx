import ExportProductDetailClient from "@/components/product/ExportProductDetailClient";
import { getExportProductBySlug } from "@/services/product";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function ExportDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const result = await getExportProductBySlug(slug);
    const product = result.data?.product;

    if (!product) {
        return (
            <div className="p-10 text-center">
                <p className="text-lg font-semibold text-red-500">Product not found</p>
                <Link href="/export" className="mt-4 inline-block rounded-lg bg-primary px-4 py-2 text-white">
                    Back to Export
                </Link>
            </div>
        )
    }

    return <ExportProductDetailClient product={product} relatedProducts={result.data?.relatedProducts || []} />
}
