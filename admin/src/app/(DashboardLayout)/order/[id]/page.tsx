import { ChevronLeft, Edit2, Trash2, Download, Printer } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/order" className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft size={20} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order #ORD-001</h1>
            <p className="text-gray-500 mt-1">Order Details</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Order ID</p>
                <p className="text-gray-900 font-medium">ORD-001</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Order Date</p>
                <p className="text-gray-900 font-medium">March 15, 2024</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Customer</p>
                <p className="text-gray-900 font-medium">John Smith</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <span className="inline-block px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm font-medium">Completed</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Product</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Qty</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-3 px-4 text-gray-900">MacBook Pro 16"</td>
                    <td className="py-3 px-4 text-gray-700">1</td>
                    <td className="py-3 px-4 text-gray-700">$2,499</td>
                    <td className="py-3 px-4 font-semibold text-gray-900">$2,499</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Address</h2>
            <p className="text-gray-700">123 Main Street, New York, NY 10001, USA</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
            <div className="space-y-3">
              <Link href={`/dashboard/order/${params.id}/edit`} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: "#5D4037" }}>
                <Edit2 size={18} />
                Edit
              </Link>
              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-blue-600 border border-blue-200 hover:bg-blue-50 transition-colors">
                <Printer size={18} />
                Print
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-green-600 border border-green-200 hover:bg-green-50 transition-colors">
                <Download size={18} />
                Invoice
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-red-600 border border-red-200 hover:bg-red-50 transition-colors">
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">$2,499.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">$25.00</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg">$2,524.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
