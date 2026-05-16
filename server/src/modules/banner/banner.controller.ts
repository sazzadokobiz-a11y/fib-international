import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { bannerService } from "./banner.service";

const createBanner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await bannerService.createBanner(req.body);
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Banner created successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getAllBanners = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await bannerService.getAllBanners();
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Banners fetched successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getActiveBanners = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await bannerService.getActiveBanners();
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Active banners fetched successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const updateBanner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await bannerService.updateBanner(id, req.body);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Banner updated successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const deleteBanner = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await bannerService.deleteBanner(id);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Banner deleted successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const bannerController = {
    createBanner,
    getAllBanners,
    getActiveBanners,
    updateBanner,
    deleteBanner,
};
