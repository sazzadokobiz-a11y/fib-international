"use client";
import { Plus, Edit2, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { PaginationControls } from "@/components/shared/PaginationControls";

const subCats: Record<string, string[]> = {
  Export: ["Garments", "Textiles", "Leather Goods", "Jute Products"],
  Import: ["Raw Materials", "Machinery", "Chemicals", "Consumer Goods"],
};

export default function ProductPage() {
  const [category, setCategory] = useState("Export");
  const [subCategory, setSubCategory] = useState("");
  const [query, setQuery] = useState("");

  const handleCategoryChange = (val: string) => {
    setCategory(val);
    setSubCategory("");
  };

  const meta = { total: 20, page: 1, limit: 10, totalPage: 10 }
  
  
  const products = [
    { id: 1, name: "MacBook Pro 16\"", category: "Electronics", price: "$2,499", status: "Active", stock: 15 },
    { id: 2, name: "Office Desk", category: "Furniture", price: "$299", status: "Active", stock: 8 },
    { id: 3, name: "Winter Jacket", category: "Clothing", price: "$129", status: "Active", stock: 42 },
    { id: 4, name: "Wireless Mouse", category: "Electronics", price: "$29", status: "Inactive", stock: 0 },
    { id: 5, name: "Desk Chair", category: "Furniture", price: "$199", status: "Active", stock: 12 },
  ];

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

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex flex-col gap-3 mb-5">
          {/* Search Bar */}
          <Field orientation="horizontal" className="border border-gray-200 rounded-xl px-3 py-1.5 bg-white">
            <Input
              type="search"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-none outline-none shadow-none flex-1"
            />

            {/* Category Select */}
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="border-l border-gray-200 pl-3 text-sm text-gray-500 outline-none bg-transparent min-w-32.5 hidden md:block"
            >
              <option value="">categories</option>
              <option value="Export">Export</option>
              <option value="Import">Import</option>
            </select>

            {/* Sub Category Select */}
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="border-l border-gray-200 pl-3 text-sm text-gray-500 outline-none bg-transparent min-w-37.5 hidden md:block"
            >
              <option value="">categories</option>
              {(subCats[category] || []).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </Field>

          {/* All categories for mobile */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Category Select for mobile*/}
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="border-l border-gray-200 pl-3 text-sm text-gray-500 outline-none bg-transparent min-w-32.5 md:hidden block border rounded-sm py-2"
            >
              <option value="">categories</option>
              <option value="Export">Export</option>
              <option value="Import">Import</option>
            </select>
            {/* Sub Category Select for mobile*/}
            <select
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
              className="border-l border-gray-200 pl-3 text-sm text-gray-500 outline-none bg-transparent min-w-37.5 block md:hidden border rounded-sm py-2"
            >
              <option value="">sub categories</option>
              {(subCats[category] || []).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Product Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Stock</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{product.name}</td>
                  <td className="py-3 px-4 text-gray-600">{product.category}</td>
                  <td className="py-3 px-4 font-medium text-gray-900">{product.price}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${product.stock > 0 ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                      {product.stock}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${product.status === "Active" ? "bg-blue-50 text-blue-700" : "bg-gray-100 text-gray-700"}`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <PaginationControls meta={meta}/>
    </div>
  );
}
