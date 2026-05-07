import { ImportProduct } from "../../models/importProduct/importProductSchema";


const addImportProduct = async (payload: any) => {
    const finalProductData = {
        ...payload,
        slug: payload.name.toString().toLowerCase().replace(/\s+/g, '-'),
        sku: `SKU-${payload?.name?.slice(0, 10)?.split(" ")?.join("-")}-${payload?.brand?.split(" ")?.join("-")}-${payload?.color}-${payload?.size}-${payload?.gender}-${payload?.subCategory}-${payload?.price}`,
        tags: payload.tags ? payload?.tags?.split(",").map((tag: string) => tag?.trim()) : []
    }
    const productInstance = new ImportProduct(finalProductData);
    const result = await productInstance.save();
    return result;
}


const getImportProduct = async ({
    search,
    category,
    page,
    skip,
    limit,
    sortBy,
    sortOrder }: {
        search?: string;
        category?: string;
        page: number;
        skip: number;
        limit: number;
        sortBy: string;
        sortOrder: string;
    }) => {
    const filter: any = {};

    if (search) {
        filter.name = { $regex: search, $options: "i" };
    }

    if (category) {
        filter.category = { $regex: category, $options: "i" };
    }

    const sortCondition: any = {};

    sortCondition[sortBy] = sortOrder === "asc" ? 1 : -1;
    const result = await ImportProduct.find(filter).sort(sortCondition).skip(skip).limit(limit);
    const total = await ImportProduct.countDocuments(filter);
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



const updateImportProduct = async(id: string, payload: any)=>{
    const result = await ImportProduct.findByIdAndUpdate(id, payload, {new: true})
    return result
}




const deleteImportProduct = async(id: string)=>{
    const result = await ImportProduct.findByIdAndDelete(id);
    return result;
}



export const importProductService = {
    addImportProduct,
    getImportProduct,
    updateImportProduct,
    deleteImportProduct
}