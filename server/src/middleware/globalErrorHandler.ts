import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export function errorHandler (error: any, req: Request, res: Response, next: NextFunction){
    const statusCodeFromError = Number(error?.statusCode);
    let statusCode = Number.isInteger(statusCodeFromError) ? statusCodeFromError : 500;
    let message = "Internal server error!!";
    let errorDetails = error;

    if(error instanceof ZodError){
        statusCode = 400;
        message = "Validation failed";
        errorDetails = error.issues;
    }

    res.status(statusCode).json({
    success: false,
    message,
    error: errorDetails,
  });
}