import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { contentService } from "./content.service";

const createContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await contentService.createContent(req.body);
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Content created successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getAllContents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await contentService.getAllContents();
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Contents fetched successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getContentByKey = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { key } = req.params;
        const result = await contentService.getContentByKey(key);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Content fetched successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const updateContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await contentService.updateContent(id, req.body);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Content updated successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const deleteContent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await contentService.deleteContent(id);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Content deleted successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const contentController = {
    createContent,
    getAllContents,
    getContentByKey,
    updateContent,
    deleteContent,
};
