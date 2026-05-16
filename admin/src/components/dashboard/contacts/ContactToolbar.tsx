import { Search } from "lucide-react";

export default function ContactToolbar() {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
                <div className="relative w-full md:max-w-md">
                    <Search
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        placeholder="Search message..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#5D4037]"
                    />
                </div>
            </div>
        </div>
    );
}