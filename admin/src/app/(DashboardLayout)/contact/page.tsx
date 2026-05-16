"use client";

import { useEffect, useState } from "react";

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
import { IContact, IContactResponse } from "@/types/contact";
import { getAllCotact, getContactStats } from "@/services/contact";
import ContactViewModal from "@/components/dashboard/contacts/ContactViewModal";

export interface IStats {
    totalMessages: number; pending: number; replied: number
}

export default function ContactsPage() {
    const [filterStatus, setFilterStatus] = useState("");
    const [contact, setContact] = useState<IContactResponse>();
    const [stats, setStats] = useState<IStats>({totalMessages: 0, pending: 0, replied: 0});
    const [selectedContact, setSelectedContact] = useState<IContact | null>(null);
    const [openModal, setOpenModal] = useState(false);

    useEffect(()=>{
        const fetchContact = async()=>{
            const result = await getAllCotact(filterStatus);
            setContact(result.data);
        }
        fetchContact()
    }, [filterStatus])


    useEffect(()=>{
        const fetchStats = async()=>{
            const result = await getContactStats();
            setStats(result.data);
        }
        fetchStats();
    },[])

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

            <ContactStats stats={stats}/>

            <div className="flex justify-end">
                <Select
                    value={filterStatus}
                    onValueChange={(value) => {
                        setFilterStatus(value);
                    }}
                >
                    <SelectTrigger className="w-full max-w-48 border border-primary/20 rounded-lg p-3">
                        <SelectValue placeholder="Filter by filterStatus" />
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

            <ContactTable contacts={contact as IContactResponse} setContact={setContact} setSelectedContact={setSelectedContact}
                setOpenModal={setOpenModal} />

            {
                openModal && selectedContact && (
                    <ContactViewModal
                        contact={selectedContact}
                        open={openModal}
                        setOpen={setOpenModal}
                    />
                )
            }

            {/* <ContactPagination /> */}
        </div>
    );
}