import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { heroService } from "./hero.service";

const createHero = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await heroService.createHero(req.body);
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Hero image created successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

const getHeroImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await heroService.getHeroImage();
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




const getActiveHero = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await heroService.getActiveHero();
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Active hero image fetched successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};



const updateHero = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await heroService.updateHero(id as string, req.body);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Hero image updated successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};





const deleteHero = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await heroService.deleteHero(id as string);
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

export const heroController = {
    createHero,
    getHeroImage,
    getActiveHero,
    updateHero,
    deleteHero
};
