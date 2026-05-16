export default function ContactViewModal() {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl p-6">
                <h2 className="text-2xl font-bold mb-5">
                    Contact Details
                </h2>

                <div className="space-y-4">
                    <div>
                        <p className="text-sm text-gray-500">
                            Full Name
                        </p>

                        <h3 className="font-semibold">
                            Sazzad Hossen
                        </h3>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500">
                            Message
                        </p>

                        <p className="text-gray-700 leading-relaxed">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        </p>
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button className="px-5 py-2 rounded-xl bg-[#5D4037] text-white">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}