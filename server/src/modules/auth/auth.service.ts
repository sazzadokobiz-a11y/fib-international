import { Admin } from "../../models/admin/admin.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../../config";

const createHttpError = (statusCode: number, message: string) => {
    const error = new Error(message) as Error & { statusCode: number };
    error.statusCode = statusCode;
    return error;
};

const adminLogin = async(payload: {email: string, password: string})=>{
    const {email, password} = payload;

    if(!email || !password){
        throw createHttpError(400, "emial and password are required");
    }

    const isAdminExist = await Admin.findOne({ email: email }).select("+password");


    if(!isAdminExist){
        throw createHttpError(404, "Admin not found");
    }

    const isValidAdmin = await bcrypt.compare(password, isAdminExist.password);

    if (!isValidAdmin) {
        throw createHttpError(401, "Invalid credentials!!");
    }

    const token = jwt.sign({
        email: isAdminExist.email,
        role: isAdminExist.role
    }, config.jwt_secret as string, { expiresIn: config.jwt_expires_in as jwt.SignOptions["expiresIn"] })



    return {token: token};
}



const getAdmin = async(email: string)=>{
    if(!email){
        throw createHttpError(400, "Email is required");
    }
    
    const result = await Admin.findOne({email: email})

    if (!result) {
        throw createHttpError(404, "User not found");
    }

    return result;
}


export const authService = {
    adminLogin,
    getAdmin
}