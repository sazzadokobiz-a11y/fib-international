import mongoose from "mongoose"

const exportProductSchema = new mongoose.Schema({
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
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory:{
        type: String,
        required: true
    },
    moq: {
        type: Number,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    stock: {
        type: Number,
    }
}, { timestamps: true })


export const ExportProduct = mongoose.model("exportProduct", exportProductSchema)
