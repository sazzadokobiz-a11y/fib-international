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
    subCategory,
    page,
    skip,
    limit,
    sortBy,
    sortOrder }: {
        search?: string;
        category?: string;
        subCategory?: string;
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

    if(subCategory){
        filter.subCategory = {$regex: subCategory, $options: "i"};
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



const getImportProductDetail = async(id: string)=>{
    const result = await ImportProduct.findById({_id: id});
    return result;
}

const getImportProductDetailBySlug = async(slug: string)=>{
    const product = await ImportProduct.findOne({ slug, isActive: { $ne: false } });

    if (!product) {
        return null;
    }

    const relatedProducts = await ImportProduct.find({
        _id: { $ne: product._id },
        isActive: { $ne: false },
        $or: [
            { category: product.category },
            { subCategory: product.subCategory }
        ]
    }).limit(8);

    return {
        product,
        relatedProducts
    };
}



const updateImportProduct = async(id: string, payload: any)=>{
    const result = await ImportProduct.findByIdAndUpdate(id, payload, {new: true})
    return result
}




const deleteImportProduct = async(id: string)=>{
    const result = await ImportProduct.findByIdAndDelete({_id: id});
    return result;
}



export const importProductService = {
    addImportProduct,
    getImportProduct,
    getImportProductDetail,
    getImportProductDetailBySlug,
    updateImportProduct,
    deleteImportProduct
}
