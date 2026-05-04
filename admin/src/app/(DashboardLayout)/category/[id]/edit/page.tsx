import { ChevronLeft, Save, X } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default function EditCategoryPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href={`/dashboard/category/${params.id}`} className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft size={20} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Category</h1>
            <p className="text-gray-500 mt-1">Update category information</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Category Information</h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category Name *</label>
                <input
                  type="text"
                  placeholder="Enter category name"
                  defaultValue="Electronics"
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Enter category description"
                  rows={4}
                  defaultValue="Electronic devices and accessories for everyday use"
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Slug</label>
                <input
                  type="text"
                  placeholder="category-slug"
                  defaultValue="electronics"
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Icon/Image URL</label>
                <input
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  defaultValue="https://example.com/electronics.jpg"
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors"
                />
              </div>

              <div className="flex items-center gap-2">
                <input type="checkbox" id="active" className="w-4 h-4 accent-[#5D4037]" defaultChecked />
                <label htmlFor="active" className="text-sm font-medium text-gray-700">Active Category</label>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: "#5D4037" }}>
                <Save size={18} />
                Update Category
              </button>
              <Link href={`/dashboard/category/${params.id}`} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors">
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
