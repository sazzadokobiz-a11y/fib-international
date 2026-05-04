import { ChevronLeft, Edit2, Send, Trash2, Download } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default function QuoteDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/dashboard/quote" className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft size={20} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quote #QT-001</h1>
            <p className="text-gray-500 mt-1">Quote Details</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Quote Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Quote ID</p>
                <p className="text-gray-900 font-medium">QT-001</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Quote Date</p>
                <p className="text-gray-900 font-medium">March 15, 2024</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Client</p>
                <p className="text-gray-900 font-medium">ABC Corporation</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Status</p>
                <span className="inline-block px-3 py-1 bg-yellow-50 text-yellow-700 rounded-full text-sm font-medium">Pending</span>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Expiry Date</p>
                <p className="text-gray-900 font-medium">April 15, 2024</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="text-gray-900 font-medium">contact@abc-corp.com</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quote Items</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Description</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Qty</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Price</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-700">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3].map((i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-3 px-4 text-gray-900">Item {i}</td>
                      <td className="py-3 px-4 text-gray-700">5</td>
                      <td className="py-3 px-4 text-gray-700">$1,099.99</td>
                      <td className="py-3 px-4 font-semibold text-gray-900">$5,499.95</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Notes</h2>
            <p className="text-gray-700">This quote includes all standard deliverables and support for the agreed period.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
            <div className="space-y-3">
              <Link href={`/dashboard/quote/${params.id}/edit`} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-white transition-all hover:opacity-90" style={{ backgroundColor: "#5D4037" }}>
                <Edit2 size={18} />
                Edit
              </Link>
              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-green-600 border border-green-200 hover:bg-green-50 transition-colors">
                <Send size={18} />
                Send Quote
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-blue-600 border border-blue-200 hover:bg-blue-50 transition-colors">
                <Download size={18} />
                Download
              </button>
              <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-red-600 border border-red-200 hover:bg-red-50 transition-colors">
                <Trash2 size={18} />
                Delete
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quote Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">$16,499.85</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (10%)</span>
                <span className="font-semibold">$1,649.99</span>
              </div>
              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg">$18,149.84</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
