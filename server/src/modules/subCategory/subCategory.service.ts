import { SubCategory } from "../../models/subCategory/subCategorySchema"


const createSubCategory = async(payload: {name: string, categoryId: string})=>{
    const subCategory = new SubCategory(payload);
    const result = await subCategory.save();
    return result;
}



const getAllSubCategory = async()=>{
    const result = await SubCategory.find();
    return result;
}


const updatedSubCategory = async(id: string, payload: {name: string})=>{
    const result = await SubCategory.findByIdAndUpdate(id, payload, { new: true });
    return result;
}



export const subCategoryService = {
    createSubCategory,
    getAllSubCategory,
    updatedSubCategory
}