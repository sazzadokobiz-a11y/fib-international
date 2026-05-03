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


export const categoryService = {
    addCategory
}