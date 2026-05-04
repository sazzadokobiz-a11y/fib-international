import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { exportProductService } from "./exportProduct.service";

const addExportProduct = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const result = await exportProductService.addExportProduct(req.body);
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "product added successfully",
            data: result
        })
    } catch (error) {
        next(error);
    }
}



export const exportProductController = {
    addExportProduct
}