import { NextFunction, Request, Response } from "express";
import paginationSortingHelper from "../../helpers/paginationSorting";
import sendResponse from "../../utils/sendResponse";
import { quoteService } from "./quote.service";

const createQuote = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const result = await quoteService.createQuote(req.body);
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Quote request submitted successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getQuotes = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const { search, status, isRead } = req.query;
        const { page, skip, limit, sortBy, sortOrder } = paginationSortingHelper(req.query);
        const readFilter = isRead === "true" ? true : isRead === "false" ? false : undefined;
        const result = await quoteService.getQuotes({
            search: typeof search === "string" ? search : "",
            status: typeof status === "string" ? status : "",
            isRead: readFilter,
            page,
            skip,
            limit,
            sortBy,
            sortOrder
        });
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Quotes fetched successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getQuoteDetail = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const result = await quoteService.getQuoteDetail(req.params.id as string);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Quote fetched successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const updateQuoteStatus = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const result = await quoteService.updateQuoteStatus(req.params.id as string, req.body.status);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Quote status updated successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const markQuoteRead = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const result = await quoteService.markQuoteRead(req.params.id as string);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Quote marked as read",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const markAllQuotesRead = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const result = await quoteService.markAllQuotesRead();
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Quotes marked as read",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getUnreadQuoteCount = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const result = await quoteService.getUnreadQuoteCount();
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Unread quote count fetched successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const quoteController = {
    createQuote,
    getQuotes,
    getQuoteDetail,
    updateQuoteStatus,
    markQuoteRead,
    markAllQuotesRead,
    getUnreadQuoteCount
}
