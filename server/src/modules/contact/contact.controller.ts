import { NextFunction, Request, Response } from "express";
import { contactService } from "./contact.service";
import sendResponse from "../../utils/sendResponse";

const createContact = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await contactService.createContact(req.body);

        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Message sent successfully",
            data: result,
        })
    } catch (error) {
        next(error);
    }
};



const getAllContacts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await contactService.getAllContacts();

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Contacts fetched successfully",
            data: result,
        })
    } catch (error) {
        next(error);
    }
};



const getUnreadContactCount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await contactService.getUnreadContactCount();

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Unread count fetched successfully",
            data: result,
        })
    } catch (error) {
        next(error);
    }
};




const markAsRead = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await contactService.markAsRead(req.params.id as string);

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Contact marked as read",
            data: result,
        })
    } catch (error) {
        next(error);
    }
};





const deleteContact = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const result = await contactService.deleteContact(req.params.id as string);

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Contact deleted successfully",
            data: result,
        })
    } catch (error) {
        next(error);
    }
};



export const contactController = {
    createContact,
    getAllContacts,
    getUnreadContactCount,
    markAsRead,
    deleteContact,
};