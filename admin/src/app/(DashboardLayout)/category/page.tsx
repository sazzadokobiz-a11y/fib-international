import { Plus, Search, Edit2, Trash2 } from "lucide-react";

export default function CategoryPage() {
  const categories = [
    { id: 1, name: "Electronics", description: "Electronic devices and accessories", products: 45 },
    { id: 2, name: "Furniture", description: "Home and office furniture", products: 32 },
    { id: 3, name: "Clothing", description: "Men and women apparel", products: 128 },
    { id: 4, name: "Books", description: "Educational and recreational books", products: 67 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-500 mt-2">Manage product categories</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-all hover:opacity-90"
          style={{ backgroundColor: "#5D4037" }}
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg mb-6 max-w-md">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search categories..."
            className="bg-transparent outline-none text-sm text-gray-600 w-full"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Category Name</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Products</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{category.name}</td>
                  <td className="py-3 px-4 text-gray-600">{category.description}</td>
                  <td className="py-3 px-4 text-gray-600">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                      {category.products}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
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
    </div>
  );
}
