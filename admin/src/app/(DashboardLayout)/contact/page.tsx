"use client";

import { useState } from "react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import ContactStats from "@/components/dashboard/contacts/ContactStats";
import ContactTable from "@/components/dashboard/contacts/ContactTable";

export default function ContactsPage() {

    const [status, setStatus] = useState("");

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

            <div className="flex justify-end">
                <Select
                    value={status}
                    onValueChange={(value) => {
                        setStatus(value);

                        console.log(value);
                    }}
                >
                    <SelectTrigger className="w-full max-w-48 border border-primary/20 rounded-lg p-3">
                        <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>

                    <SelectContent className="rounded-lg">
                        <SelectGroup>
                            <SelectLabel>Status</SelectLabel>

                            <SelectItem value="all">All</SelectItem>

                            <SelectItem value="pending">
                                pending
                            </SelectItem>

                            <SelectItem value="replied">
                                replied
                            </SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <ContactTable />

            {/* <ContactPagination /> */}
        </div>
    );
}