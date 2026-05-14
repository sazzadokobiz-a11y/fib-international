import { Contact } from "../../models/contact/contact.schema";
import { IContact } from "./contact.interface";

const createContact = async(payload:IContact)=>{
    const result = await Contact.create(payload);
    return result;
}


const getAllContacts = async () => {
    const result = await Contact.find().sort({ createdAt: -1 });

    return result;
};


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
    getUnreadContactCount,
    markAsRead,
    deleteContact,
};