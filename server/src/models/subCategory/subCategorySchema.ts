import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        unique: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    }
})


export const SubCategory = mongoose.model("subCategory", subCategorySchema);