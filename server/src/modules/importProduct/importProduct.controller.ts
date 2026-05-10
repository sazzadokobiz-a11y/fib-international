import { NextFunction, Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { importProductService } from "./importProduct.service";
import paginationSortingHelper from "../../helpers/paginationSorting";

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




const getImportProduct = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const { search, category, subCategory } = req.query;
        const searchString = typeof search === "string" ? search : "";
        const categoryString = typeof category === "string" ? category : "";
        const subCategoryString = typeof subCategory === "string" ? subCategory : "";
        const { page, skip, limit, sortBy, sortOrder } = paginationSortingHelper(req.query);
        const result = await importProductService.getImportProduct({
            search: searchString,
            category: categoryString,
            subCategory: subCategoryString,
            page,
            skip,
            limit,
            sortBy,
            sortOrder
        });
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "product fetched successfully",
            data: result
        })
    } catch (error) {
        next(error);
    }
}



const getImportProductDetail = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const {id} = req.params;
        const result = await importProductService.getImportProductDetail(id as string)
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Product fetched successfully",
            data: result
        })
    } catch (error) {
        next()
    }
}




const updateImportProduct = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const {id} = req.params;
        const result = await importProductService.updateImportProduct(id as string, req.body)
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "product updated successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}




const deleteImportProduct = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const {id} = req.params;
        const result = await importProductService.deleteImportProduct(id as string);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Product deleted successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}



export const importProductController = {
    addImportProduct,
    getImportProduct,
    getImportProductDetail,
    updateImportProduct,
    deleteImportProduct
}