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



const getAllCategory = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const result = await categoryService.getAllCategory();
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "category fetched successfully",
            data: result
        })
    } catch (error) {
        next(error);
    }
}



const editCategory = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const result = await categoryService.editCategory(req.params.id as string, req.body);
        sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "category updated successfully",
        data: result
      })
    } catch (error) {
        next(error);
    }
}



const deleteCategory = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const result = await categoryService.deleteCategory(req.params.id as string);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "category deleted successfully",
            data: result
        })
    } catch (error) {
        next(error);
    }
}



export const categoryController = {
    addCategory,
    getAllCategory,
    editCategory,
    deleteCategory
}