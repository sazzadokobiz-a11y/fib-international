import { SubCategory } from "../../models/subCategory/subCategorySchema"


const createHttpError = (message: string, statusCode: number) => {
  const error = new Error(message) as Error & { statusCode: number };
  error.statusCode = statusCode;
  return error;
};

const createSubCategory = async(payload: {name: string, categoryId: string})=>{
    const subCategory = new SubCategory(payload);
    const result = await subCategory.save();
    return result;
}



const getAllSubCategory = async()=>{
    const result = await SubCategory.find();
    return result;
}



export const subCategoryService = {
    createSubCategory,
    getAllSubCategory
}