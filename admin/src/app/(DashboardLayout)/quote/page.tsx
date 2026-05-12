"use client";

import { getQuotes, updateQuoteStatus } from "@/services/quote";
import type { Quote, QuoteListResponse, QuoteStatus } from "@/types/quote";
import { PaginationControls } from "@/components/shared/PaginationControls";
import { Eye, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const statuses: QuoteStatus[] = ["Pending", "Contacted", "Closed"];

const emptyQuotes: QuoteListResponse = {
  data: [],
  meta: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 1
  }
};

const getStatusColor = (status: QuoteStatus) => {
  switch (status) {
    case "Contacted":
      return "bg-blue-50 text-blue-700";
    case "Closed":
      return "bg-green-50 text-green-700";
    default:
      return "bg-yellow-50 text-yellow-700";
  }
};

const formatDate = (date: string) => new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric"
}).format(new Date(date));

export default function QuotePage() {
  const [quotes, setQuotes] = useState<QuoteListResponse>(emptyQuotes);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState("1");

  useEffect(() => {
    const fetchQuotes = async () => {
      setIsLoading(true);
      const result = await getQuotes(search, status, "10", page);
      setQuotes(result.data || emptyQuotes);
      setIsLoading(false);
    }

    fetchQuotes();
  }, [search, status, page]);

  const updateQuery = (key: string, value: string) => {
    if (key === "search") {
      setSearch(value);
    }
    if (key === "status") {
      setStatus(value);
    }
    setPage("1");
  };

  const handleStatusUpdate = async (id: string, nextStatus: QuoteStatus) => {
    const toastId = toast.loading("Updating quote status...");
    const result = await updateQuoteStatus(id, nextStatus);

    if (result.success) {
      toast.success("Quote status updated", { id: toastId });
      setQuotes((current) => ({
        ...current,
        data: current.data.map((quote) => quote._id === id ? { ...quote, status: nextStatus, isRead: true } : quote)
      }));
    } else {
      toast.error(result.message || "Failed to update status", { id: toastId });
    }
  };

  const totalPending = quotes.data.filter((quote) => quote.status === "Pending").length;
  const totalContacted = quotes.data.filter((quote) => quote.status === "Contacted").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quotes</h1>
          <p className="text-gray-500 mt-2">Manage quotation requests</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-500 text-sm font-medium">Total Quotes</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{quotes.meta.total}</p>
          <p className="text-gray-500 text-sm mt-2">All requests</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-500 text-sm font-medium">Pending</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{totalPending}</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-500 text-sm font-medium">Contacted</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{totalContacted}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg max-w-md flex-1">
            <Search size={18} className="text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => updateQuery("search", e.target.value)}
              placeholder="Search quotes..."
              className="bg-transparent outline-none text-sm text-gray-600 w-full"
            />
          </div>

          <select
            value={status}
            onChange={(e) => updateQuery("status", e.target.value)}
            className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm outline-none focus:border-[#5D4037]"
          >
            <option value="">All Statuses</option>
            {statuses.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-245">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">SL</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Client</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Product</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Quantity</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Contact</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Read</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td className="py-8 text-center text-gray-500" colSpan={9}>Loading quotes...</td>
                </tr>
              ) : quotes.data.length === 0 ? (
                <tr>
                  <td className="py-8 text-center text-gray-500" colSpan={9}>No quotes found</td>
                </tr>
              ) : quotes.data.map((quote: Quote, index) => (
                <tr key={quote._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{(quotes.meta.page - 1) * quotes.meta.limit + index + 1}</td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-gray-900">{quote.fullName}</p>
                    <p className="text-xs text-gray-500">{quote.companyName}</p>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{quote.product?.name}</td>
                  <td className="py-3 px-4 font-semibold text-gray-900">{quote.requestedQuantity}</td>
                  <td className="py-3 px-4 text-gray-600">
                    <p>{quote.email}</p>
                    <p className="text-xs">{quote.phoneNumber}</p>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{formatDate(quote.createdAt)}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${quote.isRead ? "bg-gray-100 text-gray-600" : "bg-red-50 text-red-700"}`}>
                      {quote.isRead ? "Read" : "Unread"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={quote.status}
                      onChange={(e) => handleStatusUpdate(quote._id, e.target.value as QuoteStatus)}
                      className={`rounded-full px-3 py-1 text-sm font-medium outline-none ${getStatusColor(quote.status)}`}
                    >
                      {statuses.map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link href={`/quote/${quote._id}`} className="inline-flex p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors">
                      <Eye size={18} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {quotes.meta.totalPages > 1 && (
          <PaginationControls meta={quotes.meta} onPageChange={(pageNumber) => setPage(String(pageNumber))} />
        )}
      </div>
    </div>
  );
}
