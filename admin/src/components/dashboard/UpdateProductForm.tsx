"use client"
import { getExportProductDetail, updateExportProduct } from "@/services/exportProduct";
import { getImportProductDetail, updateImportProduct } from "@/services/importProduct";
import { Product } from "@/types/product";
import { Save, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";



export default function UpdateProductForm({category: categoryParams, id}: {category: string, id: string}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [activeProduct, setActiveProduct] = useState<boolean>();
    const [isFeatured, setIsFeatured] = useState<boolean>(false)
    const [product, setProduct] = useState<Product>()



    useEffect(()=>{
        if(categoryParams === "export"){
            const product = async()=>{
                const result = await getExportProductDetail(id);
                setProduct(result.data)
            }
            product();
        }

        if(categoryParams === "import"){
            const product = async()=>{
                const result = await getImportProductDetail(id);
                setProduct(result.data)
                setActiveProduct(result.data.isActive)
                setIsFeatured(result.data.isFeatured)
            }
            product();
        }
    }, [categoryParams, id])


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const toastId = toast.loading("Creating product...");

        try {
            const formDataObj = new FormData(e.currentTarget);
            const data = Object.fromEntries(formDataObj.entries()) as unknown as Product;


            let formattedDimensions;
            if (typeof data.dimensions === "string" && !data.dimensions.includes("x")) {
                toast.error("Invalid dimensions format. Please use LxWxH format.", { id: toastId });
                setIsSubmitting(false);
                return
            }
            if (data.dimensions && typeof data.dimensions === "string") {
                const [length, width, height] = data.dimensions?.split("x").map((dim: string) => parseInt(dim.trim()));
                if (isNaN(length) || isNaN(width) || isNaN(height)) {
                    toast.error("Invalid dimensions format. Please use LxWxH format.", { id: toastId });
                    setIsSubmitting(false);
                    return;
                }
                formattedDimensions = { length, width, height, unit: "cm" };
            }

            if (categoryParams === "export") {
                const result = await updateExportProduct(id, data);
                if (result.success) {
                    toast.success("Product updated successfully", { id: toastId })
                    setIsSubmitting(false)
                } else {
                    toast.error(result.message, { id: toastId })
                }
            }

            if (categoryParams === "import") {
                const fullData = {
                    ...data,
                    dimensions: formattedDimensions,
                    isActive: activeProduct as boolean,
                    isFeatured: isFeatured as boolean
                }
                const result = await updateImportProduct(id, fullData);
                console.log(result);
                if (result.success) {
                    toast.success("Product updated successfully", { id: toastId })
                    setIsSubmitting(false)
                } else {
                    toast.error(result.message, { id: toastId })
                }
            }
        } catch (error) {
            const err = error as Error
            console.log(error);
            toast.error(err.message, { id: toastId })
            setIsSubmitting(false);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <form id="product-form" onSubmit={handleSubmit}>
                    <div className="bg-white rounded-lg border border-gray-200 p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-6">Product Information</h2>

                        <div className="space-y-5">
                            {/* Product Name */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter product name"
                                    defaultValue={product?.name}
                                    required
                                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors"
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                                <textarea
                                    name="description"
                                    placeholder="Enter product description"
                                    required
                                    defaultValue={product?.description}
                                    rows={4}
                                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors resize-none"
                                />
                            </div>

                            {/* Brand & Materials */}
                            <div className="flex sm:flex-row flex-col gap-4">
                                <div className="w-full">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Brand</label>
                                    <input
                                        type="text"
                                        name="brand"
                                        defaultValue={product?.brand}
                                        required
                                        placeholder="Enter brand name"
                                        className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors"
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Materials</label>
                                    <input
                                        type="text"
                                        name="materials"
                                        defaultValue={product?.materials.join(", ")}
                                        required
                                        placeholder="e.g., Cotton, Polyester"
                                        className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Color & Size */}
                            <div className="flex sm:flex-row flex-col gap-4">
                                <div className="w-full">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Color</label>
                                    <input
                                        type="text"
                                        name="color"
                                        defaultValue={product?.color}
                                        required
                                        placeholder="e.g., Red, Blue"
                                        className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors"
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Size</label>
                                    <input
                                        type="text"
                                        name="size"
                                        required
                                        defaultValue={product?.size}
                                        placeholder="e.g., M, L, XL"
                                        className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="flex sm:flex-row flex-col w-full gap-4">
                                {/* Export Only Fields */}
                                {categoryParams === "export" && (
                                    <>
                                        <div className="w-full">
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                MOQ (Minimum Order Qty) *
                                            </label>
                                            <input
                                                type="number"
                                                name="moq"
                                                required
                                                defaultValue={product?.moq}
                                                placeholder="0"
                                                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Import Only Fields */}
                            {categoryParams === "import" && (
                                <>
                                    {/* price & discount price & cost price */}
                                    <div className="grid sm:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Price *</label>
                                            <input
                                                type="number"
                                                name="price"
                                                defaultValue={product?.price}
                                                placeholder="0.00"
                                                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Discount Price</label>
                                            <input
                                                type="number"
                                                name="discountPrice"
                                                defaultValue={product?.discountPrice}
                                                placeholder="0.00"
                                                required
                                                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Cost Price</label>
                                            <input
                                                type="number"
                                                name="costPrice"
                                                defaultValue={product?.costPrice}
                                                placeholder="0.00"
                                                required
                                                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors"
                                            />
                                        </div>
                                    </div>
                                    {/* weight & dimensions */}
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Weight (kg)</label>
                                            <input
                                                type="number"
                                                name="weight"
                                                required
                                                defaultValue={product?.weight}
                                                placeholder="0.00"
                                                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Dimensions (L×W×H cm)
                                            </label>
                                            <input
                                                type="text"
                                                name="dimensions"
                                                required
                                                defaultValue={
                                                    typeof product?.dimensions === "object" &&
                                                        product?.dimensions !== null
                                                        ? `${product.dimensions.length}x${product.dimensions.width}x${product.dimensions.height} ${product.dimensions.unit}`
                                                        : ""
                                                }
                                                placeholder="e.g., 10×10×5"
                                                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors"
                                            />
                                        </div>
                                    </div>
                                    {/* stock & tags */}
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Stock *</label>
                                            <input
                                                type="number"
                                                name="stock"
                                                required
                                                defaultValue={product?.stock}
                                                placeholder="0"
                                                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Tags</label>
                                            <input
                                                type="text"
                                                name="tags"
                                                required
                                                defaultValue={product?.tags?.join(", ")}
                                                placeholder="Enter tags separated by commas"
                                                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors"
                                            />
                                        </div>
                                    </div>


                                    <div className="grid sm:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Warranty</label>
                                            <input
                                                type="text"
                                                name="warranty"
                                                required
                                                defaultValue={product?.warranty}
                                                placeholder="e.g., 1 Year"
                                                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Return Policy</label>
                                            <input
                                                type="text"
                                                name="returnPolicy"
                                                required
                                                defaultValue={product?.returnPolicy}
                                                placeholder="e.g., 30 Days"
                                                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                name="isActive"
                                                checked={activeProduct}
                                                onChange={() => setActiveProduct(!activeProduct)}
                                                className="w-4 h-4 accent-[#5D4037]"
                                            />
                                            <span className="text-sm font-medium text-gray-700">Active Product</span>
                                        </label>
                                        <label className="flex items-center gap-2">
                                            <input
                                                type="checkbox"
                                                name="isFeatured"
                                                checked={isFeatured}
                                                onChange={() => setIsFeatured(!isFeatured)}
                                                className="w-4 h-4 accent-[#5D4037]"
                                            />
                                            <span className="text-sm font-medium text-gray-700">Featured</span>
                                        </label>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>


                    <div className="bg-white rounded-lg border border-gray-200 p-6 mt-6 lg:hidden">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                        <div className="space-y-3">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
                                style={{ backgroundColor: "#5D4037" }}
                            >
                                <Save size={18} />
                                {isSubmitting ? "Saving..." : "Save Product"}
                            </button>
                            <Link
                                href="/product"
                                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                                <X size={18} />
                                Cancel
                            </Link>
                        </div>
                    </div>
                </form>
            </div>

            <div className="hidden lg:block space-y-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-20">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
                    <div className="space-y-3">
                        <button
                            type="submit"
                            form="product-form"
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
                            style={{ backgroundColor: "#5D4037" }}
                        >
                            <Save size={18} />
                            {isSubmitting ? "Saving..." : "Save Product"}
                        </button>
                        <Link
                            href="/product"
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                            <X size={18} />
                            Cancel
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
