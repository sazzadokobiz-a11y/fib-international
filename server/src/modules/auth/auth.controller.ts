import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { authService } from "./auth.service";
import config from "../../config";

const adminLogin = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const result = await authService.adminLogin(req.body);
        const isProduction = config.env === "production";
        res.cookie("token", result.token, {
            secure: isProduction,
            httpOnly: true,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        sendResponse(res, {
            statusCode: 200, 
            success: true,
            message: "Admin login success",
            data: result
        })
    } catch (error) {
        next(error)
    }
}



const getAdmin = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const {email} = req.admin;
        const result = await authService.getAdmin(email as string);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Admin data fetched successfully",
            data: result
        })        
    } catch (error) {
        next(error)
    }
}


export const authController = {
    adminLogin,
    getAdmin
}