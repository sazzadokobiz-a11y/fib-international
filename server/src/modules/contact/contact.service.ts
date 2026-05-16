import { Contact } from "../../models/contact/contact.schema";
import { IContact } from "./contact.interface";

const createContact = async(payload:IContact)=>{
    const result = await Contact.create(payload);
    return result;
}


const getAllContacts = async ({
    status,
    page,
    skip,
    limit,
    sortBy,
    sortOrder }: {
        status: string;
        page: number;
        skip: number;
        limit: number;
        sortBy: string;
        sortOrder: string;
    }) => {
    let filter: any = {};

    if (status) {
        filter.status = { $regex: status, $options: "i" };
    }

    if(status === "all" || status === "All"){
        filter = {}
    }


    const result = await Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit);

    const total = await Contact.countDocuments(filter);

    return {
        data: result,
        meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        },
    };
};


const getContactStats = async()=>{
    const totalMessages = await Contact.countDocuments();

    const pending = await Contact.countDocuments({status: "pending"});

    const replied = await Contact.countDocuments({status: "replied"});

    return {totalMessages, pending, replied}
}


const updateContactStatus = async(id: string, status: string)=>{
    const result = await Contact.findByIdAndUpdate(id, {status}, {new: true});

    return result;
}



const getUnreadContactCount = async () => {
    const result = await Contact.countDocuments({
        isRead: false,
    });

    return result;
};


const markAsRead = async (id: string) => {
    const result = await Contact.findByIdAndUpdate(
        id,
        {
            isRead: true,
        },
        {
            new: true,
        }
    );

    return result;
};


const deleteContact = async (id: string) => {
    const result = await Contact.findByIdAndDelete(id);

    return result;
};



export const contactService = {
    createContact,
    getAllContacts,
    getContactStats,
    updateContactStatus,
    getUnreadContactCount,
    markAsRead,
    deleteContact,
};