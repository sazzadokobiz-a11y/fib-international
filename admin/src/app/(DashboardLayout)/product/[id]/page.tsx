import { ChevronLeft, Edit2, Trash2, Download, Eye } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/product" className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft size={20} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">MacBook Pro 16"</h1>
            <p className="text-gray-500 mt-1">Product Details</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="w-full h-64 bg-gray-100 rounded-lg mb-6 flex items-center justify-center">
              <Eye size={40} className="text-gray-400" />
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Product Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Category</p>
                  <p className="text-gray-700">Electronics</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Sub Category</p>
                  <p className="text-gray-700">Laptops</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Description</p>
                <p className="text-gray-700">High-performance laptop with 16-inch display</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Price</p>
                  <p className="text-lg font-bold text-gray-900">$2,499</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Stock</p>
                  <span className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">15 items</span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">SKU</p>
                  <p className="text-gray-700 font-mono">SKU-MBP-16</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <span className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
            <div className="space-y-3">
              <Link href={`/dashboard/product/${params.id}/edit`} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: "#5D4037" }}>
                <Edit2 size={18} />
                Edit
              </Link>
              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-blue-600 border border-blue-200 hover:bg-blue-50 transition-colors">
                <Download size={18} />
                Export
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-red-600 border border-red-200 hover:bg-red-50 transition-colors">
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sales</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Sold</p>
                <p className="text-2xl font-bold text-gray-900">342</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Revenue</p>
                <p className="text-2xl font-bold text-gray-900">$854,658</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
