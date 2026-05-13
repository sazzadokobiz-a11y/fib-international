import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import config from "../config";
import { Admin } from "../models/admin/admin.model";

export enum AdminRole {
    ADMIN = "ADMIN"
}


const createHttpError = (statusCode: number, message: string) => {
    const error = new Error(message) as Error & { statusCode: number };
    error.statusCode = statusCode;
    return error;
};


const auth = (...roles: AdminRole[])=>{
    return async (req: Request, res: Response, next: NextFunction)=>{
        try {
            const tokenFromCookie = req.cookies?.token as string | undefined;
            const tokenFromHeader = req.headers.authorization?.startsWith("Bearer ")
                ? req.headers.authorization.split(" ")[1]
                : undefined;
            const token = tokenFromCookie || tokenFromHeader;

            if(!token){
                throw createHttpError(401, "Token not found")
            }

            const decoded = jwt.verify(token, config.jwt_secret as Secret) as JwtPayload

            const adminData = await Admin.findOne({email: decoded.email as string})

            if (!adminData) {
                throw createHttpError(401, "Unauthorized access!");
            }


            if (roles.length > 0 && !roles.includes(adminData.role as AdminRole)) {
                throw createHttpError(401, "Unauthorized access!!!");
            }

            req.admin = decoded;

            next();
        } catch (error) {
            next(error)
        }
    }
}

export default auth;