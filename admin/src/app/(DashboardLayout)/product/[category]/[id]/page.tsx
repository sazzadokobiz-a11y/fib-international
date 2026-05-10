import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import UpdateProductForm from "@/components/dashboard/UpdateProductForm";

export default async function UpdateProductPage({params}: {params: Promise<{category: string, id: string}>}) {
  const {category, id} = await params;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/product" className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft size={20} className="text-gray-600" />
          </Link>
          <div className="sm:pt-0 pt-5">
            <h1 className="sm:text-3xl text-xl font-bold text-gray-900">Update your Product</h1>
          </div>
        </div>
      </div>

      <UpdateProductForm category={category} id={id}/>
    </div>
  );
}
