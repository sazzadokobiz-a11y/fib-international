import bcrypt from "bcryptjs";
import config from "../config";
import { Admin } from "../models/admin/admin.model";

export const seedAdmin = async()=>{
    try {
        if (!config.admin_email){
            console.log("❌ Please add admin email in env")
            return
        } else if (!config.admin_password){
            console.log("❌ Please add admin password in env")
            return
        }else if(!config.bcrypt_salt_round){
            console.log("❌ Please add bcrypt salt round in env")
            return
        }

        const isAdminExists = await Admin.findOne({
            email: config.admin_email,
        });

        if (isAdminExists) {
            console.log("✅ Admin already exists");
            return;
        }

        // hash password
        const hashedPassword = await bcrypt.hash(config.admin_password as string, Number(config.bcrypt_salt_round));


        await Admin.create({
            email: config.admin_email,
            password: hashedPassword,
            role: "ADMIN",
        });
    } catch (error) {
        console.log("❌ Admin seed failed", error);
    }
}