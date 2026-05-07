"use client";

import { getAllCategories } from "@/services/category";
import { getSubCategory } from "@/services/subCategory";
import { Save, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import UploadImages from "../UploadImages";
import { uploadImage } from "@/services/uploadImage";
import { addExportProduct } from "@/services/exportProduct";
import { Product } from "@/types/product";
import { toast } from "sonner";
import { addImportProduct } from "@/services/importProduct";


export function CreateProductForm() {
  const [category, setCategory] = useState<"Export" | "Import">("Export");
  const [fetchedCategory, setFetchedCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [thumbnail, setThumbnail] = useState<File[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [activeProduct, setActiveProduct] = useState<boolean>(true);
  const [isFeatured, setIsFeatured] = useState<boolean>(false)



  useEffect(()=>{
    const fetchCategory = async()=>{
      const {data} = await getAllCategories();
      setFetchedCategory(data);
    };
    fetchCategory();
  }, []);

  useEffect(()=>{
    const fetchSubCategory = async () => {
      const { data } = await getSubCategory(category);
      setSubCategory(data);
    }
    fetchSubCategory()
  },[category])


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const toastId = toast.loading("Creating product...");
    
    try {
      const formDataObj = new FormData(e.currentTarget);
      const data = Object.fromEntries(formDataObj.entries());


      let formattedDimensions;
      if (typeof data.dimensions === "string" && !data.dimensions.includes("x")){
        toast.error("Invalid dimensions format. Please use LxWxH format.", { id: toastId });
        setIsSubmitting(false);
        return
      }
      if (data.dimensions && typeof data.dimensions === "string"){
        const [length, width, height] = data.dimensions?.split("x").map((dim: string) => parseInt(dim.trim()));
        if(isNaN(length) || isNaN(width) || isNaN(height)) {
          toast.error("Invalid dimensions format. Please use LxWxH format.", {id: toastId});
          setIsSubmitting(false);
          return;
        }
        formattedDimensions = { length, width, height, unit: "cm" };
      }

      if(!thumbnail.length){
        toast.error("Thumbnail image is required", {id: toastId});
        setIsSubmitting(false);
        return;
      }

      if(!images.length){
        toast.error("At least one product image is required", {id: toastId});
        setIsSubmitting(false);
        return;
      }


      const imageUrls = await uploadImage(thumbnail[0], images);

      if (imageUrls.success) {
        if(category === "Export"){
          const fullData = {
            ...data,
            thumbnail: imageUrls.data.thumbnail,
            images: imageUrls.data.images,
            slug: data.name.toString().toLowerCase().replace(/\s+/g, '-'),
          }
          const result = await addExportProduct(fullData as Product);
          if(result.success){
            toast.success("Product created successfully", {id: toastId})
            setIsSubmitting(false)
          }else{
            toast.error(result.message, {id: toastId})
          }
        }

        if(category === "Import"){
          const fullData = {
            ...data,
            thumbnail: imageUrls.data.thumbnail as string,
            images: imageUrls.data.images as string[],
            dimensions: formattedDimensions,
            isActive: activeProduct as boolean,
            isFeatured: isFeatured as boolean
          }
          const result = await addImportProduct(fullData as unknown as Product);
          console.log(result);
          if (result.success) {
            toast.success("Product created successfully", { id: toastId })
            setIsSubmitting(false)
          }else{
            toast.error(result.message, {id: toastId})
          }
        }
      }else{
        toast.error(imageUrls, {id: toastId})
      }
    } catch (error) {
      const err = error as Error
      console.log(error);
      toast.error(err.message, {id: toastId})
      setIsSubmitting(false);
    } finally {
      setIsSubmitting(false);
      setThumbnail([]);
      setImages([]);
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <form id="product-form" onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Product Information</h2>

            <div className="space-y-5">
              <div className="flex sm:flex-row flex-col gap-4">
                {/* Category Selection */}
                <div className="w-full">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as "Export" | "Import")}
                    name="category"
                    required
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors"
                  >
                    <option value="">Select category</option>
                    {
                      fetchedCategory?.map((category: { name: string, _id: string, __v: number }) => (
                        <option key={category._id} value={category.name}>
                          {category.name}
                        </option>
                      ))
                    }
                  </select>
                </div>
                {/* Sub Category */}
                <div className="w-full">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Sub Category *</label>
                  <select
                    name="subCategory"


                    required
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors"
                  >
                    <option value="">Select sub category</option>
                    {
                      subCategory?.map((subCat: { name: string, _id: string, __v: number }) => (
                        <option key={subCat._id} value={subCat.name}>
                          {subCat.name}
                        </option>
                      ))
                    }
                    {subCategory.length === 0 && <option value="No sub categories available">No sub categories available</option>}
                  </select>
                </div>
              </div>

              {/* Product Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter product name"
                  required
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors"
                />
              </div>


              {/* Thumbnail */}
              <div>
                <Label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">Upload Thumbnail *</Label>
                <UploadImages setImages={setThumbnail} images={thumbnail} maxFile={1}/>
              </div>

                {/* image upload field */}
              <div>
                <Label className="block text-sm font-semibold text-gray-700 mb-2 mt-6 capitalize">Upload Product Images</Label>
                <UploadImages setImages={setImages} images={images} maxFile={5} />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                <textarea
                  name="description"
                  placeholder="Enter product description"
                  required
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

                    placeholder="e.g., M, L, XL"
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors"
                  />
                </div>
              </div>

              <div className="flex sm:flex-row flex-col w-full gap-4">
                {/* Gender */}
                <div className="w-full">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Gender</label>
                  <select
                    name="gender"


                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors"
                    required
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="unisex">Unisex</option>
                  </select>
                </div>

                {/* Export Only Fields */}
                {category === "Export" && (
                  <>
                    <div className="w-full">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        MOQ (Minimum Order Qty) *
                      </label>
                      <input
                        type="number"
                        name="moq"
                        required
    
    
                        placeholder="0"
                        className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors"
                      />
                    </div>
                  </>
                )}
              </div>

              {/* Import Only Fields */}
              {category === "Import" && (
                <>
                {/* price & discount price & cost price */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Price *</label>
                      <input
                        type="number"
                        name="price"
    
    
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
                        onChange={()=>setActiveProduct(!activeProduct)}
                        className="w-4 h-4 accent-[#5D4037]"
                      />
                      <span className="text-sm font-medium text-gray-700">Active Product</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="isFeatured"
                        checked={isFeatured}
                        onChange={()=>setIsFeatured(!isFeatured)}
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
