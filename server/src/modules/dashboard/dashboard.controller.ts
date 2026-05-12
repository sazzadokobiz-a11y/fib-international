import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { dashboardService } from "./dashboard.service";

const getDashboardStats = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const result = await dashboardService.getDashboardStats();
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Dashboard stats fetched successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const dashboardController = {
    getDashboardStats
}
