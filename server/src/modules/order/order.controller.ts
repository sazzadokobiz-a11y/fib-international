import { NextFunction, Request, Response } from "express";
import paginationSortingHelper from "../../helpers/paginationSorting";
import sendResponse from "../../utils/sendResponse";
import { orderService } from "./order.service";
import { CourierName } from "./order.courier.service";

const createOrder = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const result = await orderService.createOrder(req.body);
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Order placed successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getOrders = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const { search, status, dateFrom, dateTo } = req.query;
        const { page, skip, limit, sortBy, sortOrder } = paginationSortingHelper(req.query);
        const result = await orderService.getOrders({
            search: typeof search === "string" ? search : "",
            status: typeof status === "string" ? status : "",
            dateFrom: typeof dateFrom === "string" ? dateFrom : "",
            dateTo: typeof dateTo === "string" ? dateTo : "",
            page,
            skip,
            limit,
            sortBy,
            sortOrder
        });
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Orders fetched successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getOrderDetail = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const result = await orderService.getOrderDetail(req.params.id as string);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Order fetched successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const updateOrderStatus = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const result = await orderService.updateOrderStatus(req.params.id as string, req.body.status);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Order status updated successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const sendCourier = async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const { orderId } = req.params;
        const { courier } = req.body as { courier: CourierName };

        const validCouriers: CourierName[] = ["steadfast", "pathao", "redx"];
        if (!courier || !validCouriers.includes(courier)) {
            res.status(400).json({
                success: false,
                message: `Invalid courier. Must be one of: ${validCouriers.join(", ")}`,
            });
            return;
        }

        const result = await orderService.sendCourier(orderId as string, courier);
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Order sent to courier successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const orderController = {
    createOrder,
    getOrders,
    getOrderDetail,
    updateOrderStatus,
    sendCourier
}
