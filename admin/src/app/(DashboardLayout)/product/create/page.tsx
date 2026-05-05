import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { CreateProductForm } from "@/components/dashboard/CreateProductForm";
import { getAllCategories } from "@/services/category";

export default async function CreateProductPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/product" className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft size={20} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Product</h1>
            <p className="text-gray-500 mt-1">Add a new product to your catalog</p>
          </div>
        </div>
      </div>

      <CreateProductForm />
    </div>
  );
}
