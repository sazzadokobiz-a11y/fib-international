"use client"
import { Input } from "@/components/ui/input";
import { addCategory, deleteCategory, getAllCategories } from "@/services/category";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";


interface TCategory {
  _id: string,
  name: string,
  totalProducts: number,
  __v: number,
}


export default function CategoryPage() {
  const [categories, setCategories] = useState<TCategory[]>([]);


  useEffect(()=>{
    const getCategories = async ()=>{
      const result = await getAllCategories();
      setCategories(result.data)
    }
    getCategories();
  }, [])



  const handleAddCategory = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    const toastId = toast.loading("Creating category...")
    const formData = new FormData(e.currentTarget);
    const category = formData.get("name");

    if(!category){
      toast.error("Please input category name", {id: toastId})
      return
    }

    try {
      const data = {name: category as string}
      const result = await addCategory(data);
      if (result.success) {
        setCategories([...categories, {...result.data, totalProducts: 0}])
        toast.success("Category created successfully", { id: toastId })
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message, { id: toastId });
      } else {
        toast.error("Something went wrong", { id: toastId });
      }
    }
  }


  const handleDeleteCategory = async(id: string)=>{
    const toastId = toast.loading("Deleting category...")
    try {
      const result = await deleteCategory(id);
      if(result.success){
        toast.success(result.message, {id: toastId})
        const filterCategory = categories.filter(cat=> cat._id !== id)
        setCategories(filterCategory)
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        toast.error(error.message, { id: toastId });
      } else {
        toast.error("Something went wrong", { id: toastId });
      }
    }
  }


  return (
    <div className="space-y-6">
      <div className="flex md:flex-row flex-col items-center justify-between lg:pt-0 pt-10">
        <div className="md:mb-0 mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Categories</h1>
          <p className="text-gray-500 mt-2">Manage product categories</p>
        </div>
        <form onSubmit={handleAddCategory} className="flex sm:flex-row flex-col gap-3 items-center">
          <Input name="name" placeholder="Add a category" className="border border-primary/20 rounded-lg px-3 bg-slate-100"/>
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-all hover:opacity-90 w-64"
            style={{ backgroundColor: "#5D4037" }}
          >
            <Plus size={20} />
            Add Category
          </button>
        </form>
      </div>

      {
        categories.length === 0 ? <p className="text-center mt-10">No category found</p> : <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="text-nowrap">
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Category Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Products</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category: TCategory) => (
                  <tr key={category?._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{category?.name}</td>
                    <td className="py-3 px-4 text-gray-600">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                        {category?.totalProducts}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleDeleteCategory(category._id)} className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors">
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
      }
    </div>
  );
}
