import { Category } from "../../models/category/categorySchema";
import { SubCategory } from "../../models/subCategory/subCategorySchema"


const createSubCategory = async(payload: {name: string, categoryId: string})=>{
    const subCategory = new SubCategory(payload);
    const result = await subCategory.save();
    return result;
}



const getAllSubCategory = async (parentName?: string) => {
    if (!parentName) {
        return await SubCategory.find()
            .populate("categoryId", "name");
    }

    const parentCategory = await Category.findOne({
        name: { $regex: parentName, $options: "i" }
    });

    if (!parentCategory) {
        return [];
    }

    const result = await SubCategory.find({
        categoryId: parentCategory._id
    }).populate("categoryId", "name");

    return result;
};




const updatedSubCategory = async(id: string, payload: {name: string})=>{
    const result = await SubCategory.findByIdAndUpdate(id, payload, { new: true });
    return result;
}



const deleteSubCategory = async(id: string)=>{
    const result = await SubCategory.findByIdAndDelete({_id: id});
    return result;
}



export const subCategoryService = {
    createSubCategory,
    getAllSubCategory,
    updatedSubCategory,
    deleteSubCategory
}