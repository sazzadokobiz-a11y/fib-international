import ContactTableRow from "./ContactTableRow";

const contacts = Array.from({ length: 8 });

export default function ContactTable() {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-5 py-4 text-left">
                                Name
                            </th>

                            <th className="px-5 py-4 text-left">
                                Email
                            </th>

                            <th className="px-5 py-4 text-left">
                                Subject
                            </th>

                            <th className="px-5 py-4 text-left">
                                Status
                            </th>

                            <th className="px-5 py-4 text-left">
                                Date
                            </th>

                            <th className="px-5 py-4 text-right">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {contacts.map((_, i) => (
                            <ContactTableRow key={i} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}