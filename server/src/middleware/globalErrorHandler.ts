import { NextFunction, Request, Response } from "express";

export function errorHandler (error: any, req: Request, res: Response, next: NextFunction){
    const statusCodeFromError = Number(error?.status);
    let statusCode = Number.isInteger(statusCodeFromError) ? statusCodeFromError : 500;
    let message = error.message || "Internal server error!!";
    let errorDetails = error;

    res.status(statusCode).json({
    success: false,
    message,
    error: errorDetails,
  });
}