import { model, Schema } from "mongoose";
import { IContact } from "../../modules/contact/contact.interface";

const contactSchema = new Schema<IContact>(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },

        message: {
            type: String,
            required: true,
            trim: true,
        },

        isRead: {
            type: Boolean,
            default: false,
        },
        status: {
            type: String,
            enum: ["pending", "replied"],
            default: "pending"
        }
    },
    {
        timestamps: true,
    }
);

export const Contact = model<IContact>("contact", contactSchema);