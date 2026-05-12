import type { ApiResponse, PaginatedResponse } from "@/types/api";
import type { ExportProduct, ImportProduct } from "@/types/product";

type ProductQuery = {
    search?: string;
    category?: string;
    subCategory?: string;
    page?: string | number;
    limit?: string | number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
}

const getBaseUrl = () => process.env.NEXT_PUBLIC_API_URL || process.env.BASE_API_URL;

const buildQuery = (query: ProductQuery) => {
    const params = new URLSearchParams();

    Object.entries(query).forEach(([key, value]) => {
        if (value !== undefined && value !== "") {
            params.set(key, String(value));
        }
    });

    return params.toString();
}

const emptyPaginated = <T>(): PaginatedResponse<T> => ({
    data: [],
    meta: {
        page: 1,
        limit: 12,
        total: 0,
        totalPages: 1
    }
});

export const getExportProducts = async(query: ProductQuery = {}): Promise<ApiResponse<PaginatedResponse<ExportProduct>>> => {
    try {
        const baseUrl = getBaseUrl();
        if (!baseUrl) {
            return { success: false, data: emptyPaginated<ExportProduct>() };
        }

        const res = await fetch(`${baseUrl}/export-product/get-all?${buildQuery(query)}`, {
            cache: "no-store"
        });

        if (!res.ok) {
            return { success: false, data: emptyPaginated<ExportProduct>() };
        }

        return res.json();
    } catch (error) {
        console.error(error);
        return { success: false, data: emptyPaginated<ExportProduct>() };
    }
}

export const getExportProductBySlug = async(slug: string): Promise<ApiResponse<{product: ExportProduct | null; relatedProducts: ExportProduct[]} | null>> => {
    try {
        const baseUrl = getBaseUrl();
        if (!baseUrl) {
            return { success: false, data: null };
        }

        const res = await fetch(`${baseUrl}/export-product/slug/${slug}`, {
            cache: "no-store"
        });

        if (!res.ok) {
            return { success: false, data: null };
        }

        return res.json();
    } catch (error) {
        console.error(error);
        return { success: false, data: null };
    }
}

export const getImportProducts = async(query: ProductQuery = {}): Promise<ApiResponse<PaginatedResponse<ImportProduct>>> => {
    try {
        const baseUrl = getBaseUrl();
        if (!baseUrl) {
            return { success: false, data: emptyPaginated<ImportProduct>() };
        }

        const res = await fetch(`${baseUrl}/import-product/get?${buildQuery(query)}`, {
            cache: "no-store"
        });

        if (!res.ok) {
            return { success: false, data: emptyPaginated<ImportProduct>() };
        }

        return res.json();
    } catch (error) {
        console.error(error);
        return { success: false, data: emptyPaginated<ImportProduct>() };
    }
}

export const getImportProductBySlug = async(slug: string): Promise<ApiResponse<{product: ImportProduct | null; relatedProducts: ImportProduct[]} | null>> => {
    try {
        const baseUrl = getBaseUrl();
        if (!baseUrl) {
            return { success: false, data: null };
        }

        const res = await fetch(`${baseUrl}/import-product/slug/${slug}`, {
            cache: "no-store"
        });

        if (!res.ok) {
            return { success: false, data: null };
        }

        return res.json();
    } catch (error) {
        console.error(error);
        return { success: false, data: null };
    }
}
