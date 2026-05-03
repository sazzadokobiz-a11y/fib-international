import { Category } from "../../models/category/categorySchema"


const createHttpError = (message: string, statusCode: number) => {
  const error = new Error(message) as Error & { statusCode: number };
  error.statusCode = statusCode;
  return error;
};


const addCategory = async (payload: {name: string})=>{
    const category = new Category({name: payload.name})
    const result = await category.save()
    return result
}


const getAllCategory = async()=>{
    const result = await Category.find();
    return result;
}



const editCategory = async(id: string, payload: {name: string})=>{
    const result = await Category.findByIdAndUpdate(
        id,
        payload,
        {new: true}
    )
    return result;
}


export const categoryService = {
    addCategory,
    getAllCategory,
    editCategory
}