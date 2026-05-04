import { ChevronLeft, Save, X, Upload } from "lucide-react";
import Link from "next/link";

export default function CreateProductPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/product" className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft size={20} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Product</h1>
            <p className="text-gray-500 mt-1">Add a new product to your catalog</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Product Information</h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name *</label>
                <input type="text" placeholder="Enter product name" className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                  <select className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors">
                    <option>Select category</option>
                    <option>Electronics</option>
                    <option>Furniture</option>
                    <option>Clothing</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Sub Category *</label>
                  <select className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors">
                    <option>Select sub category</option>
                    <option>Laptops</option>
                    <option>Smartphones</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea placeholder="Enter product description" rows={4} className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors resize-none" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Price *</label>
                  <input type="number" placeholder="0.00" className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Stock *</label>
                  <input type="number" placeholder="0" className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">SKU *</label>
                  <input type="text" placeholder="SKU-001" className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors" />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="active" className="w-4 h-4 accent-[#5D4037]" defaultChecked />
                <label htmlFor="active" className="text-sm font-medium text-gray-700">Active Product</label>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Product Images</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#5D4037] transition-colors cursor-pointer">
              <Upload className="mx-auto text-gray-400 mb-3" size={32} />
              <p className="text-gray-700 font-medium mb-1">Upload product images</p>
              <p className="text-gray-500 text-sm">Drag and drop or click to browse</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: "#5D4037" }}>
                <Save size={18} />
                Save Product
              </button>
              <Link href="/dashboard/product" className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors">
                <X size={18} />
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
