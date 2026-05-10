import { SubCategory } from './../../models/subCategory/subCategorySchema';
import { ExportProduct } from "../../models/exportProduct/exportProductSchema";

const addExportProduct = async(payload: any)=>{
    const products = new ExportProduct(payload);
    const result = await products.save();
    return result;
}



const getExportProduct = async ({
    search,
    category,
    subCategory,
    page,
    skip,
    limit,
    sortBy,
    sortOrder}: {
    search?: string;
    category?: string;
    subCategory?: string;
    page: number;
    skip: number;
    limit: number;
    sortBy: string;
    sortOrder: string;
    })=>{
    const filter: any = {};

    if(search){
        filter.name = {$regex: search, $options: "i"};
    }

    if(category){
        filter.category = { $regex: category, $options: "i" };
    }

    if(subCategory){
        filter.subCategory = {$regex: subCategory, $options: "i"}
    }

    const sortCondition: any = {};

    sortCondition[sortBy] = sortOrder === "asc" ? 1 : -1;

    const result = await ExportProduct.find(filter).sort(sortCondition).skip(skip).limit(limit);

    const total = await ExportProduct.countDocuments(filter);

    return {
        data: result,
        meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        },
    };
}


const getProductDetail = async(id: string)=>{
    const result = await ExportProduct.findById({_id: id})
    return result;
}



const updateExportProduct = async(id: string, payload: any)=>{
    const result = await ExportProduct.findByIdAndUpdate(id, payload, {new: true});
    return result;
}



const deleteExportProduct = async(id: string)=>{
    const result = await ExportProduct.findByIdAndDelete(id);
    return result;
}


export const exportProductService = {
    addExportProduct,
    getExportProduct,
    getProductDetail,
    updateExportProduct,
    deleteExportProduct,
}