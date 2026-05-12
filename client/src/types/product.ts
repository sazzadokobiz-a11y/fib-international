export type ProductDimensions = {
    length?: number;
    width?: number;
    height?: number;
    unit?: string;
}

export type BaseProduct = {
    _id: string;
    name: string;
    thumbnail?: string;
    image?: string;
    images: string[];
    description: string;
    brand: string;
    materials: string[];
    color?: string;
    size?: string;
    gender?: string;
    category: string;
    subCategory?: string;
    slug: string;
    createdAt?: string;
    updatedAt?: string;
}

export type ExportProduct = BaseProduct & {
    moq: number;
    gender: string;
}

export type ImportProduct = BaseProduct & {
    price: number;
    discountPrice?: number;
    costPrice?: number;
    stock?: number;
    sku?: string;
    weight?: number;
    dimensions?: ProductDimensions;
    tags?: string[];
    warranty?: string;
    returnPolicy?: string;
    isActive?: boolean;
    isFeatured?: boolean;
}

export type TProduct = ExportProduct;
