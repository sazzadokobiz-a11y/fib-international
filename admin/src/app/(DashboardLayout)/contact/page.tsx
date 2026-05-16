"use client";

import ContactStats from "@/components/dashboard/contacts/ContactStats";
import ContactTable from "@/components/dashboard/contacts/ContactTable";
import ContactToolbar from "@/components/dashboard/contacts/ContactToolbar";

export default function ContactsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">
                    Contact Messages
                </h1>

                <p className="text-gray-500 mt-1">
                    Manage customer contact requests
                </p>
            </div>

            <ContactStats />

            <ContactToolbar />

            <ContactTable />

            {/* <ContactPagination /> */}
        </div>
    );
}