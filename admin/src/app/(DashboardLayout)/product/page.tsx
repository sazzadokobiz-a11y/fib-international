"use client";
import { Plus, Edit2, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PaginationControls } from "@/components/shared/PaginationControls";
import { getAllCategories } from "@/services/category";
import { getSubCategory } from "@/services/subCategory";
import { getExportProduct } from "@/services/exportProduct";
import { Product } from "@/types/product";
import Image from "next/image";
import { getImportProduct } from "@/services/importProduct";
import { useSearchParams } from "next/navigation";

export default function ProductPage() {
  const [fetchedCategory, setFetchedCategory] = useState([]);
  const [category, setCategory] = useState("Export");
  const [fetchedSub, setFetchedSub] = useState([]);
  const [subCategory, setSubCategory] = useState("");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState({ data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 1 }});
  const searchParams = useSearchParams();

  const pageNumber = searchParams.get("page") || '1'



  // fetch category
  useEffect(()=>{
    const fetchCategory = async()=>{
      const result = await getAllCategories()
      setFetchedCategory(result.data)
    }
    fetchCategory()
  }, [])


  // fetch subCategory
  useEffect(()=>{
    const fetchedSubCategory = async()=>{
      const result = await getSubCategory(category);
      setFetchedSub(result.data)
    }
    fetchedSubCategory()
  }, [category])


  const handleCategoryChange = (val: string) => {
    setCategory(val);
    setSubCategory("");
  };


  // fetch product data
  useEffect(()=>{
    if(category === "Export"){
      const fetchProduct = async()=>{
        const result = await getExportProduct(search, subCategory, "10", pageNumber)
        setProducts(result.data)
      }
      fetchProduct()
    }

    if(category === "Import"){
      const fetchProduct = async()=>{
        const result = await getImportProduct(search, subCategory, "10", pageNumber)
        setProducts(result.data)
      }
      fetchProduct()
    }
  }, [category, search, subCategory, pageNumber])
  

  return (
    <div className="space-y-6 pt-5 md:pt-0">
      <div className="flex md:flex-row flex-col md:gap-0 gap-5 md:items-center justify-between">
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500 mt-2 text-sm md:text-base">Manage all your products</p>
        </div>
        <Link href="/product/create"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-all hover:opacity-90"
          style={{ backgroundColor: "#5D4037" }}
        >
          <Plus size={20} />
          Add Product
        </Link>
      </div>

      <div className="relative">
        <div className="flex flex-col gap-3 sm:mb-5 mb-14">
          {/* Search Bar */}
          <Field orientation="horizontal" className="border border-primary/20 rounded-xl px-3 py-1.5 bg-secondary/70">
            <Input
              type="search"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-none outline-none shadow-none flex-1 text-white placeholder:text-white"
            />

            <div className="flex gap-5 sm:static absolute top-15">
              {/* Category Select */}
              <Select value={category}
                onValueChange={(value) =>
                  handleCategoryChange(value)
                }>
                <SelectTrigger
                  className="flex max-w-32 w-full bg-primary p-2 rounded-lg text-white [&>span]:text-white [&>svg]:text-white border-none"
                >
                  <SelectValue placeholder="Category" />
                </SelectTrigger>

                <SelectContent className="bg-primary rounded-xl text-white">
                  <SelectGroup>
                    <SelectLabel className="text-white">Select Categories</SelectLabel>

                    {
                      fetchedCategory.map((cat: {name: string, _id: string, __v: number}) => <SelectItem key={cat._id} value={cat.name} className="rounded-lg">{cat.name}</SelectItem>)
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Sub Category Select */}
              <Select value={subCategory} onValueChange={(value) => setSubCategory(value)}>
                <SelectTrigger
                  className="flex max-w-32 w-full bg-primary p-2 rounded-lg text-white [&>span]:text-white [&>svg]:text-white border-none"
                >
                  <SelectValue placeholder="Sub category" />
                </SelectTrigger>

                <SelectContent className="bg-primary rounded-xl text-white">
                  <SelectGroup>
                    <SelectLabel className="text-white">Select Categories</SelectLabel>
                    {
                      fetchedSub.map((subCat: { name: string, _id: string, __v: number }) => (
                        <SelectItem key={subCat._id} value={subCat.name} className="rounded-lg">{subCat.name}</SelectItem>
                      ))
                    }
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </Field>
        </div>

        {/* table */}
        {
          products.data.length === 0 ? <p className="text-center mt-10">No product found</p> : <div className="rounded-xl border border-primary/20 bg-secondary/50 w-full max-w-full overflow-hidden">
            <div className="overflow-x-auto">
              <Table className="min-w-max text-sm">
                <TableHeader>
                  <TableRow className="bg-primary/5 hover:bg-primary/5">
                    <TableHead className="font-semibold text-gray-700">
                      image
                    </TableHead>
                    <TableHead className="font-semibold text-gray-700 text-nowrap">
                      Product Name
                    </TableHead>

                    <TableHead className="font-semibold text-gray-700 text-nowrap">
                      Category
                    </TableHead>

                    <TableHead className="font-semibold text-gray-700 text-nowrap">
                      Sub Category
                    </TableHead>

                    <TableHead className="font-semibold text-gray-700 text-nowrap">
                      Brand
                    </TableHead>

                    <TableHead className="font-semibold text-gray-700">
                      Materials
                    </TableHead>

                    <TableHead className="font-semibold text-gray-700">
                      Color
                    </TableHead>

                    <TableHead className="font-semibold text-gray-700">
                      Size
                    </TableHead>

                    <TableHead className="font-semibold text-gray-700">
                      Gender
                    </TableHead>

                    {
                      category === "Export" && (
                        <>
                          <TableHead className="font-semibold text-gray-700">
                            MOQ
                          </TableHead>
                        </>
                      )
                    }

                    {
                      category === "Import" && (
                        <>
                          <TableHead className="font-semibold text-gray-700">
                            Price
                          </TableHead>

                          <TableHead className="font-semibold text-gray-700">
                            Discount price
                          </TableHead>

                          <TableHead className="font-semibold text-gray-700">
                            Cost Price
                          </TableHead>

                          <TableHead className="font-semibold text-gray-700">
                            Stock
                          </TableHead>

                          <TableHead className="font-semibold text-gray-700">
                            Weight
                          </TableHead>

                          <TableHead className="font-semibold text-gray-700">
                            Dimensions
                          </TableHead>

                          <TableHead className="font-semibold text-gray-700">
                            Warranty
                          </TableHead>

                          <TableHead className="font-semibold text-gray-700">
                            Return Policy
                          </TableHead>

                          <TableHead className="font-semibold text-gray-700">
                            status
                          </TableHead>

                          <TableHead className="font-semibold text-gray-700">
                            Featured
                          </TableHead>
                        </>
                      )
                    }

                    <TableHead className="text-right font-semibold text-gray-700">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {products?.data?.map((product: Product) => (
                    <TableRow
                      key={product._id}
                      className="border-primary/10"
                    >

                      <TableCell className="font-medium text-gray-900">
                        <Image src={product.thumbnail} alt={product.name.slice(0, 20)} width={100} height={100} className="object-cover w-25 h-25 rounded-2xl"/>
                      </TableCell>
                      <TableCell className="font-medium text-gray-900">
                        {product.name.slice(0, 20)}
                      </TableCell>

                      <TableCell className="text-gray-600">
                        {product.category}
                      </TableCell>

                      <TableCell className="font-medium text-gray-900">
                        {product.subCategory}
                      </TableCell>

                      <TableCell className="font-medium text-gray-900">
                        {product.brand}
                      </TableCell>

                      <TableCell className="font-medium text-gray-900">
                        {product.materials.join(" ")}
                      </TableCell>

                      <TableCell className="font-medium text-gray-900">
                        {product.color}
                      </TableCell>

                      <TableCell className="font-medium text-gray-900">
                        {product.size}
                      </TableCell>

                      <TableCell className="font-medium text-gray-900">
                        {product.gender}
                      </TableCell>

                      {
                        category === "Export" && (
                          <TableCell className="font-medium text-gray-900">
                            {product.moq}
                          </TableCell>
                        )
                      }


                      {
                        category === "Import" && (
                          <>
                            <TableCell className="font-medium text-gray-900">
                              {product.price}
                            </TableCell>

                            <TableCell className="font-medium text-gray-900">
                              {product.discountPrice}
                            </TableCell>

                            <TableCell className="font-medium text-gray-900">
                              {product.costPrice}
                            </TableCell>

                            <TableCell className="font-medium text-gray-900">
                              {product.stock}
                            </TableCell>

                            <TableCell className="font-medium text-gray-900">
                              {product.weight}
                            </TableCell>

                            <TableCell className="font-medium text-gray-900">
                              {product.dimensions?.length}x{product.dimensions?.width}x{product.dimensions?.height}x{product.dimensions?.unit}
                            </TableCell>

                            <TableCell className="font-medium text-gray-900">
                              {product.warranty}
                            </TableCell>

                            <TableCell className="font-medium text-gray-900">
                              {product.returnPolicy}
                            </TableCell>

                            <TableCell className="font-medium text-gray-900">
                              {product.isActive ? "active" : "disabled"}
                            </TableCell>

                            <TableCell className="font-medium text-gray-900">
                              {product.isFeatured ? "True" : "False"}
                            </TableCell>
                          </>
                        )
                      }


                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link href={`/product/${product.category.toLowerCase()}/${product._id}`} className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors">
                            <Edit2 size={18} />
                          </Link>

                          <button className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        }
        
      </div>
      {
        products.data.length !== 0 && <PaginationControls meta={products?.meta} />
      }
    </div>
  );
}
