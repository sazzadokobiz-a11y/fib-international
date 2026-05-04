import { Plus, Search, Eye, Edit2, Trash2, Send } from "lucide-react";

export default function QuotePage() {
  const quotes = [
    { id: "QT-001", client: "ABC Corporation", amount: "$5,499", date: "Mar 15, 2024", status: "Pending", items: 5 },
    { id: "QT-002", client: "XYZ Industries", amount: "$12,299", date: "Mar 14, 2024", status: "Accepted", items: 8 },
    { id: "QT-003", client: "Tech Solutions", amount: "$8,799", date: "Mar 13, 2024", status: "Sent", items: 6 },
    { id: "QT-004", client: "Global Trade Inc", amount: "$3,599", date: "Mar 12, 2024", status: "Rejected", items: 3 },
    { id: "QT-005", client: "Future Logistics", amount: "$15,899", date: "Mar 11, 2024", status: "Accepted", items: 12 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted":
        return "bg-green-50 text-green-700";
      case "Sent":
        return "bg-blue-50 text-blue-700";
      case "Pending":
        return "bg-yellow-50 text-yellow-700";
      case "Rejected":
        return "bg-red-50 text-red-700";
      default:
        return "bg-gray-50 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Quotes</h1>
          <p className="text-gray-500 mt-2">Manage quotation requests</p>
        </div>
        <button
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-all hover:opacity-90"
          style={{ backgroundColor: "#5D4037" }}
        >
          <Plus size={20} />
          Create Quote
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-500 text-sm font-medium">Total Quotes</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">328</p>
          <p className="text-gray-500 text-sm mt-2">All time</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-500 text-sm font-medium">Accepted</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">245</p>
          <p className="text-green-600 text-sm mt-2">75% conversion</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-gray-500 text-sm font-medium">Total Value</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">$1.2M</p>
          <p className="text-gray-500 text-sm mt-2">Accepted quotes</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg mb-6 max-w-md">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search quotes..."
            className="bg-transparent outline-none text-sm text-gray-600 w-full"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Quote ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Client</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Items</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quote) => (
                <tr key={quote.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{quote.id}</td>
                  <td className="py-3 px-4 text-gray-600">{quote.client}</td>
                  <td className="py-3 px-4 font-semibold text-gray-900">{quote.amount}</td>
                  <td className="py-3 px-4">
                    <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm font-medium">
                      {quote.items} items
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{quote.date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(quote.status)}`}>
                      {quote.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 hover:bg-green-50 rounded-lg text-green-600 transition-colors">
                        <Send size={18} />
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
