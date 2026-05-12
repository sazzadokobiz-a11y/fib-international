import mongoose from "mongoose";

export const quoteStatuses = ["Pending", "Contacted", "Closed"] as const;

const quoteSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
        required: true
    },
    companyName: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: true
    },
    country: {
        type: String,
        trim: true,
        required: true
    },
    message: {
        type: String,
        trim: true,
        required: true
    },
    requestedQuantity: {
        type: Number,
        min: 1,
        required: true
    },
    product: {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "exportProduct",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true
        },
        thumbnail: {
            type: String
        },
        category: {
            type: String
        },
        subCategory: {
            type: String
        }
    },
    status: {
        type: String,
        enum: quoteStatuses,
        default: "Pending"
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

quoteSchema.index({ fullName: "text", companyName: "text", email: "text", phoneNumber: "text", "product.name": "text" });

export const Quote = mongoose.model("quote", quoteSchema);
