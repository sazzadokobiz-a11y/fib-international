import { getQuoteDetail } from "@/services/quote";
import type { Quote } from "@/types/quote";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

const formatDate = (date: string) => new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "long",
  day: "numeric"
}).format(new Date(date));

export default async function QuoteDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getQuoteDetail(id);
  const quote = result.data as Quote | null;

  if (!quote) {
    return (
      <div className="space-y-6">
        <Link href="/quote" className="inline-flex items-center gap-2 text-gray-600 hover:text-primary">
          <ChevronLeft size={18} />
          Back to Quotes
        </Link>
        <div className="rounded-lg border border-gray-200 bg-white p-8 text-center text-gray-500">Quote not found</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/quote" className="p-2 hover:bg-gray-100 rounded-lg">
          <ChevronLeft size={20} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quote #{quote._id.slice(-6).toUpperCase()}</h1>
          <p className="text-gray-500 mt-1">Quote Details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Customer Information</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <Info label="Full Name" value={quote.fullName} />
              <Info label="Company" value={quote.companyName} />
              <Info label="Email" value={quote.email} />
              <Info label="Phone" value={quote.phoneNumber} />
              <Info label="Country" value={quote.country} />
              <Info label="Date" value={formatDate(quote.createdAt)} />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Product Information</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              <Info label="Product" value={quote.product.name} />
              <Info label="Category" value={quote.product.category || "N/A"} />
              <Info label="Subcategory" value={quote.product.subCategory || "N/A"} />
              <Info label="Requested Quantity" value={quote.requestedQuantity.toLocaleString()} />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Message</h2>
            <p className="whitespace-pre-line text-gray-700">{quote.message}</p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status</h3>
            <span className="inline-block rounded-full bg-yellow-50 px-3 py-1 text-sm font-medium text-yellow-700">
              {quote.status}
            </span>
            <p className="mt-3 text-sm text-gray-500">{quote.isRead ? "Read" : "Unread"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="font-medium text-gray-900">{value}</p>
    </div>
  );
}
