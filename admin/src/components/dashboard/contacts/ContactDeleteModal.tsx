export default function ContactDeleteModal() {
    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold">
                    Delete Contact
                </h2>

                <p className="text-gray-500 mt-2">
                    Are you sure you want to delete this message?
                </p>

                <div className="flex justify-end gap-3 mt-6">
                    <button className="px-5 py-2 rounded-xl border border-gray-200">
                        Cancel
                    </button>

                    <button className="px-5 py-2 rounded-xl bg-red-600 text-white">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}