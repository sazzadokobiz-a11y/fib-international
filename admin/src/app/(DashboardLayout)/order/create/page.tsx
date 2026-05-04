import { ChevronLeft, Save, X } from "lucide-react";
import Link from "next/link";

export default function CreateOrderPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/order" className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft size={20} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Create New Order</h1>
            <p className="text-gray-500 mt-1">Create a new customer order</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Order Details</h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Customer *</label>
                <input type="text" placeholder="Select or create customer" className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Order Date *</label>
                <input type="date" className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Shipping Address</label>
                <textarea placeholder="Enter shipping address" rows={3} className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors resize-none" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Shipping Method</label>
                  <select className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors">
                    <option>Standard Shipping</option>
                    <option>Express Shipping</option>
                    <option>Overnight</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Method</label>
                  <select className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors">
                    <option>Credit Card</option>
                    <option>Bank Transfer</option>
                    <option>Cash</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Notes</label>
                <textarea placeholder="Add order notes" rows={3} className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-[#5D4037] transition-colors resize-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: "#5D4037" }}>
                <Save size={18} />
                Create Order
              </button>
              <Link href="/dashboard/order" className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors">
                <X size={18} />
                Cancel
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">$0.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">$0.00</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg">$0.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
