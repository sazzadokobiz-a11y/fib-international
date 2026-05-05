export type SubCategory = {
    _id: string;
    categoryId: string;
    name: string;
    __v?: number;
}

type SubCategoryResponse = {
    success: boolean;
    data: SubCategory[];
}

export const getSubCategories = async (parentName: string): Promise<SubCategoryResponse> => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!baseUrl) {
            return { success: false, data: [] };
        }

        const res = await fetch(`${baseUrl}/sub-category/get-all?parent=${parentName}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            return { success: false, data: [] };
        }

        return res.json();
    } catch (error) {
        console.error(error);
        return { success: false, data: [] };
    }
}
