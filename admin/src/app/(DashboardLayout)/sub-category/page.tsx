"use client"
import { Input } from "@/components/ui/input";
import { addSubCategory, deleteSubCategory, getSubCategory } from "@/services/subCategory";
import { getAllCategories } from "@/services/category";
import { Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";


interface TCategory {
  _id: string,
  name: string,
}

interface TSubCategory {
  _id: string,
  name: string,
  categoryId: TCategory,
  __v: number,
}


export default function SubCategoryPage() {
  const [subCategories, setSubCategories] = useState<TSubCategory[]>([]);
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("");

  useEffect(()=>{
    const fetchData = async () => {
      const categoriesResult = await getAllCategories();
      setCategories(categoriesResult.data || []);

      const  subCategoriesResult = await getSubCategory(selectedFilter);
      setSubCategories(subCategoriesResult.data || []);
    };
    fetchData();
  }, [selectedFilter])



  const handleAddSubCategory = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    const toastId = toast.loading("Creating sub-category...")
    const formData = new FormData(e.currentTarget);
    const subCategoryName = formData.get("name");
    const parentCategoryId = formData.get("parentCategory");

    if(!subCategoryName){
      toast.error("Please input sub-category name", {id: toastId})
      return
    }

    if(!parentCategoryId){
      toast.error("Please select parent category", {id: toastId})
      return
    }

    try {
      const data = {name: subCategoryName as string, categoryId: parentCategoryId as string}
      const result = await addSubCategory(data);
      console.log(result);
      if (result.success) {
        const newSubCategory: TSubCategory = {
          ...result.data,
          categoryId: categories.find(c => c._id === parentCategoryId),
        };
        setSubCategories([...subCategories, newSubCategory as TSubCategory])
        toast.success("Sub-category created successfully", { id: toastId })
      }
      if(!result.success){
        toast.error(result.message, {id: toastId})
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


  const handleDeleteSubCategory = async(id: string)=>{
    const toastId = toast.loading("Deleting sub-category...")
    try {
      const result = await deleteSubCategory(id);
      if(result.success){
        toast.success(result.message, {id: toastId})
        setSubCategories(subCategories.filter(subCat => subCat._id !== id))
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
          <h1 className="text-3xl font-bold text-gray-900">Sub-Categories</h1>
          <p className="text-gray-500 mt-2">Manage product sub-categories</p>
        </div>
        <form onSubmit={handleAddSubCategory}>
          <div className="flex flex-col gap-2">
            <Input name="name" placeholder="Sub-category name" className="border border-primary/20 rounded-lg px-3 bg-slate-100 max-w-54" />

            <select
              name="parentCategory"
              className="border border-primary/20 rounded-lg px-3 py-2 bg-slate-100"
              defaultValue=""
            >
              <option value="">Select Parent Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-all hover:opacity-90 text-nowrap mt-2"
            style={{ backgroundColor: "#5D4037" }}
          >
            <Plus size={20} />
            Add Sub-Category
          </button>
        </form>
      </div>

      {categories.length > 0 && (
        <div className="flex sm:flex-row flex-col gap-2 items-center">
          <label className="text-sm font-medium text-gray-700">Filter by Category:</label>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="border border-primary/20 rounded-lg px-3 py-2 bg-slate-100"
          >
            <option value="">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
      )}

      {
        subCategories.length === 0 ? <p className="text-center mt-10">No sub category found</p> : <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="text-nowrap">
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Parent Category</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subCategories.map((subCategory: TSubCategory) => (
                  <tr key={subCategory?._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium text-gray-900">{subCategory?.name}</td>
                    <td className="py-3 px-4 text-gray-600">{subCategory?.categoryId?.name}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleDeleteSubCategory(subCategory._id)} className="p-2 hover:bg-red-50 rounded-lg text-red-600 transition-colors">
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
