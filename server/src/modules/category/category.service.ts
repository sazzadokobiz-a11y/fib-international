import { ObjectId } from "mongodb";
import { Category } from "../../models/category/categorySchema"
import { SubCategory } from "../../models/subCategory/subCategorySchema";


const createHttpError = (statusCode: number, message: string) => {
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
    const result = await Category.aggregate([
        {
            $lookup: {
                from: "exportproducts",
                let: { categoryName: "$name" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$category", "$$categoryName"]
                            }
                        }
                    },
                    {
                        $count: "total"
                    }
                ],
                as: "exportData"
            }
        },

        {
            $lookup: {
                from: "importproducts",
                let: { categoryName: "$name" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$category", "$$categoryName"]
                            }
                        }
                    },
                    {
                        $count: "total"
                    }
                ],
                as: "importData"
            }
        },

        {
            $addFields: {
                totalProducts: {
                    $add: [
                        {
                            $ifNull: [
                                { $arrayElemAt: ["$exportData.total", 0] },
                                0
                            ]
                        },
                        {
                            $ifNull: [
                                { $arrayElemAt: ["$importData.total", 0] },
                                0
                            ]
                        }
                    ]
                }
            }
        },

        {
            $project: {
                exportData: 0,
                importData: 0
            }
        }
    ]);
    return result;
}



const editCategory = async(id: string, payload: {name: string})=>{
    const result = await Category.findByIdAndUpdate(
        id,
        payload,
        {new: true}
    )
    if(!result){
        throw createHttpError(404, "Category not found");
    }
    return result;
}



const deleteCategory = async(id: string)=>{
    const category = await Category.findById(id);
    if (!category) {
        throw createHttpError(404, "Category not found");
    }

    const subCategoryExists = await SubCategory.exists({categoryId: id});
    if(subCategoryExists){
        throw createHttpError(400, "Category has sub-category, delete sub-category first");
    }
    const result = await Category.findByIdAndDelete({_id: id});
    return result;
}


export const categoryService = {
    addCategory,
    getAllCategory,
    editCategory,
    deleteCategory
}