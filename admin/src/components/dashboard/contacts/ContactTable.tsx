import { IContact, IContactResponse } from "@/types/contact";
import { Eye, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { deleteContact, markAssRead, updateContactStatus } from "@/services/contact";


export default function ContactTable({ contacts, setContact, setSelectedContact, setOpenModal }: {contacts: IContactResponse; setContact: Dispatch<SetStateAction<IContactResponse | undefined>>; setSelectedContact: Dispatch<SetStateAction<IContact | null>>; setOpenModal: Dispatch<SetStateAction<boolean>>; }) {

    const handleUpdateStatus = async(id: string, value: string)=>{
        const toastId = toast.loading("Status updating...")

        try {
            const result = await updateContactStatus(id, {status: value});
            console.log(result)
            if (result.success) {
                toast.success(result.message, { id: toastId })
            } else {
                toast.error("Something went wrong", { id: toastId })
            }
        } catch (error) {
            const err = error as unknown as Error;
            toast.error(err.message, { id: toastId })
        }
    }

    const handleDelete = async(id: string)=>{
        const toastId = toast.loading("Contact deleting...")
        try {
            const result = await deleteContact(id);
            if(result.success){
                toast.success(result.message, {id: toastId})
                setContact({data: contacts.data.filter(cont=> cont._id !== id), meta: contacts.meta})
            }else{
                toast.error("Something went wrong", {id: toastId})
            }
        } catch (error) {
            const err = error as unknown as Error;
            toast.error(err.message, {id: toastId})
        }
    }

    const handleMarkRead = async(id:string)=>{
        await markAssRead(id)
    }
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
                                Edit status
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
                        {contacts?.data?.map((contact) => (
                            <tr key={contact._id} className="border-t border-gray-100 even:bg-gray-50 text-nowrap">
                                <td className="px-5 py-4 font-medium">
                                    {contact?.fullName}
                                </td>

                                <td className="px-5 py-4 text-gray-600">
                                    {contact?.email}
                                </td>

                                <td className="px-5 py-4">
                                    {contact?.subject}
                                </td>

                                <td className="px-5 py-4">
                                    <span className={`px-3 py-1 rounded-full text-xs ${contact?.status === "replied" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"} font-medium`}>
                                        {contact?.status}
                                    </span>
                                </td>

                                <td className="px-5 py-4">
                                    <Select onValueChange={(value)=> handleUpdateStatus(contact?._id as string, value)}>
                                        <SelectTrigger className="w-full max-w-26 border border-primary/20 rounded-lg p-3">
                                            <SelectValue placeholder={contact?.status} />
                                        </SelectTrigger>

                                        <SelectContent className="rounded-lg">
                                            <SelectGroup>
                                                <SelectLabel>Edit Status</SelectLabel>

                                                <SelectItem value="pending">
                                                    pending
                                                </SelectItem>

                                                <SelectItem value="replied">
                                                    replied
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </td>

                                <td className="px-5 py-4 text-gray-500">
                                    {new Date(contact?.createdAt as string).toLocaleString("en-BD", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </td>

                                <td className="px-5 py-4">
                                    <div className="flex items-center justify-end gap-2">
                                        <button onClick={() => {
                                            setSelectedContact(contact);
                                            setOpenModal(true);
                                            handleMarkRead(contact?._id as string)
                                        }} className="p-2 rounded-lg hover:bg-gray-100">
                                            <Eye size={18} />
                                        </button>

                                        <button onClick={()=>handleDelete(contact?._id as string)} className="p-2 rounded-lg hover:bg-red-100 text-red-600">
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
    );
}