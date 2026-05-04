import { ChevronLeft, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default function SubCategoryDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/sub-category" className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft size={20} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Laptops</h1>
            <p className="text-gray-500 mt-1">Sub Category Details</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Sub Category Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Sub Category Name</p>
                <p className="text-lg font-medium text-gray-900">Laptops</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Parent Category</p>
                <p className="text-gray-700">Electronics</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Description</p>
                <p className="text-gray-700">High-performance laptops and notebooks</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Slug</p>
                <p className="text-gray-700 font-mono">laptops</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <span className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">Active</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Products (24)</h2>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">Laptop Model {i}</p>
                    <p className="text-sm text-gray-500">SKU-LT-{String(i).padStart(5, "0")}</p>
                  </div>
                  <span className="text-sm font-medium text-gray-600">$1,299.99</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
            <div className="space-y-3">
              <Link href={`/dashboard/sub-category/${params.id}/edit`} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: "#5D4037" }}>
                <Edit2 size={18} />
                Edit
              </Link>
              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-red-600 border border-red-200 hover:bg-red-50 transition-colors">
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistics</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Created</p>
                <p className="text-gray-700">March 15, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
