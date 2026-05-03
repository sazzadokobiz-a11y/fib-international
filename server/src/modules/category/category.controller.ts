import { NextFunction, Request, Response } from "express";
import { categoryService } from './category.service';
import sendResponse from '../../utils/sendResponse';

const addCategory = async (req: Request, res: Response, next: NextFunction)=>{
    try {
        const result = await categoryService.addCategory(req.body);
        sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "category added successfully",
        data: result
      })
    } catch (error: any) {
        next(error);
    }
}


export const categoryController = {
    addCategory
}