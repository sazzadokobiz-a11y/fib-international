import mongoose from "mongoose";

export const orderStatuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"] as const;

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true
    },
    customer: {
        fullName: {
            type: String,
            trim: true,
            required: true
        },
        mobileNumber: {
            type: String,
            trim: true,
            required: true
        },
        shippingAddress: {
            type: String,
            trim: true,
            required: true
        },
        thana: {
            type: String,
            trim: true,
            required: true
        },
        district: {
            type: String,
            trim: true,
            required: true
        }
    },
    products: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "importProduct",
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
        sku: {
            type: String
        },
        thumbnail: {
            type: String
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            min: 1,
            required: true
        },
        total: {
            type: Number,
            required: true
        }
    }],
    subtotal: {
        type: Number,
        required: true
    },
    shipping: {
        type: Number,
        default: 0
    },
    total: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        default: "Cash on Delivery"
    },
    paymentStatus: {
        type: String,
        default: "Unpaid"
    },
    orderStatus: {
        type: String,
        enum: orderStatuses,
        default: "Pending"
    },
    courierStatus: {
        type: String,
        default: "Not Sent"
    },
    courier: {
        type: String,
        default: ""
    },
    courierResponse: {
        type: mongoose.Schema.Types.Mixed
    }
}, { timestamps: true });

orderSchema.index({ "customer.fullName": "text", "customer.mobileNumber": "text", orderId: "text", "products.name": "text" });

export const Order = mongoose.model("order", orderSchema);
