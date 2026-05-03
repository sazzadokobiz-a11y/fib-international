import mongoose from "mongoose"

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true
    }
})

export const Category = mongoose.model("category", categorySchema)