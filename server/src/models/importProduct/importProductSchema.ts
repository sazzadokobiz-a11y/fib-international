import mongoose from "mongoose"

const importProductSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    thumbnail: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    materials: {
        type: [String],
        required: true
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    gender: {
        type: String,
    },
    category: {
        type: String,
        required: true
    },
    subCategory:{
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number,
    },
    costPrice: {
        type: Number,
    },
    stock: {
        type: Number,
    },
    sku: {
        type: String,
        required: true,
        unique: true
    },
    weight: {
        type: Number,
    },
    dimensions: {
        length: Number,
        width: Number,
        height: Number,
        unit: { type: String, default: "cm" }
    },
    tags: {
        type: [String],
    },
    warranty: {
        type: String,
    },
    returnPolicy: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isFeatured: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })


export const ImportProduct = mongoose.model("importProduct", importProductSchema)
