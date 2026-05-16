import { Eye, Pencil, Trash2 } from "lucide-react";

export default function ContactTableRow() {
    return (
        <tr className="border-t border-gray-100 even:bg-gray-50">
            <td className="px-5 py-4 font-medium">
                Sazzad Hossen
            </td>

            <td className="px-5 py-4 text-gray-600">
                sazzad@gmail.com
            </td>

            <td className="px-5 py-4">
                Product Inquiry
            </td>

            <td className="px-5 py-4">
                <span className="px-3 py-1 rounded-full text-xs bg-red-100 text-red-600 font-medium">
                    Unread
                </span>
            </td>

            <td className="px-5 py-4 text-gray-500">
                10 May 2026
            </td>

            <td className="px-5 py-4">
                <div className="flex items-center justify-end gap-2">
                    <button className="p-2 rounded-lg hover:bg-gray-100">
                        <Eye size={18} />
                    </button>

                    <button className="p-2 rounded-lg hover:bg-blue-100 text-blue-600">
                        <Pencil size={18} />
                    </button>

                    <button className="p-2 rounded-lg hover:bg-red-100 text-red-600">
                        <Trash2 size={18} />
                    </button>
                </div>
            </td>
        </tr>
    );
}