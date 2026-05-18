import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { partnerService } from "./partner.service";

const createPartner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await partnerService.createPartner(req.body);
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Partner created successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getAllPartners = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await partnerService.getAllPartners();
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Partners fetched successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getActivePartners = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await partnerService.getActivePartners();
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Active partners fetched successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const updatePartner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await partnerService.updatePartner(id as string, req.body);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Partner updated successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const deletePartner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await partnerService.deletePartner(id as string);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Partner deleted successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const partnerController = {
    createPartner,
    getAllPartners,
    getActivePartners,
    updatePartner,
    deletePartner,
};
