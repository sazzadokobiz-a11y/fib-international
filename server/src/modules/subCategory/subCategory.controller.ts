import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { subCategoryService } from "./subCategory.service";

const createSubCategory = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const result = await subCategoryService.createSubCategory(req.body);
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Sub category created successfully",
            data: result
        })
    } catch (error) {
        next(error);
    }
}


const getAllSubCategory = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const result = await subCategoryService.getAllSubCategory();
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Sub category fetched successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}


export const subCategoryController = {
    createSubCategory,
    getAllSubCategory
}