
import { Category } from "../../models/category/categorySchema"

const addCategory = async (payload: {name: string})=>{
    const category = new Category({name: payload.name})
    const result = await category.save()
    return result
}


export const categoryService = {
    addCategory
}