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
        const { search, category } = req.query;
        const searchString = typeof search === "string" ? search : "";
        const categoryString = typeof category === "string" ? category : "";
        const { page, skip, limit, sortBy, sortOrder } = paginationSortingHelper(req.query);
        const result = await importProductService.getImportProduct({
            search: searchString,
            category: categoryString,
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



export const importProductController = {
    addImportProduct,
    getImportProduct
}