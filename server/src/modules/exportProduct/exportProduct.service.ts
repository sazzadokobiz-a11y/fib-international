import { ExportProduct } from "../../models/exportProduct/exportProductSchema";

const addExportProduct = async(payload: any)=>{
    const products = new ExportProduct(payload);
    const result = await products.save();
    return result;
}


export const exportProductService = {
    addExportProduct
}