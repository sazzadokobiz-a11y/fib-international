import { model, Schema } from "mongoose";

const bannerSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        subtitle: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            required: true,
        },
        type: {
            type: String,
            enum: ["Offer", "Sale", "Announcement"],
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        order: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export const Banner = model("banner", bannerSchema);
