import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { importProductService } from "./importProduct.service";

const addImportProduct = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const result = await importProductService.addImportProduct(req.body);
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Import product added successfully",
            data: result
        })
    } catch (error) {
        next(error);
    }
}


export const importProductController = {
    addImportProduct
}