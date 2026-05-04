import { Plus, Search, Edit2, Trash2 } from "lucide-react";

export default function SubCategoryPage() {
  const subCategories = [
    { id: 1, name: "Laptops", category: "Electronics", products: 24 },
    { id: 2, name: "Smartphones", category: "Electronics", products: 35 },
    { id: 3, name: "Office Chairs", category: "Furniture", products: 12 },
    { id: 4, name: "Sofas", category: "Furniture", products: 8 },
    { id: 5, name: "Men's Shirts", category: "Clothing", products: 56 },
    { id: 6, name: "Women's Dresses", category: "Clothing", products: 72 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sub Categories</h1>
          <p className="text-gray-500 mt-2">Manage sub categories within categories</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-all hover:opacity-90"
          style={{ backgroundColor: "#5D4037" }}
        >
          <Plus size={20} />
          Add Sub Category
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg mb-6 max-w-md">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search sub categories..."
            className="bg-transparent outline-none text-sm text-gray-600 w-full"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Sub Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Parent Category</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Products</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subCategories.map((subCategory) => (
                <tr key={subCategory.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{subCategory.name}</td>
                  <td className="py-3 px-4 text-gray-600">{subCategory.category}</td>
                  <td className="py-3 px-4 text-gray-600">
                    <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">
                      {subCategory.products}
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
