import { model, Schema } from "mongoose";

const contentSchema = new Schema(
    {
        key: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            // e.g. "about_us", "mission", "vision", "why_choose_us"
        },
        title: {
            type: String,
            required: true,
            trim: true,
        },
        subtitle: {
            type: String,
            trim: true,
            default: "",
        },
        body: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: "",
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        metaTitle: {
            type: String,
            default: "",
        },
        metaDescription: {
            type: String,
            default: "",
        },
    },
    { timestamps: true }
);

export const Content = model("content", contentSchema);
