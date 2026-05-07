import { ImportProduct } from "../../models/importProduct/importProductSchema";


const addImportProduct = async(payload: any)=>{
    const products = new ImportProduct(payload);
    const result = await products.save();
    return result;
}



export const importProductService = {
    addImportProduct
}