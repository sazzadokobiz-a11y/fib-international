export type Category = {
    _id: string;
    name: string;
    totalProducts?: number;
}

type CategoryResponse = {
    success: boolean;
    data: Category[];
}

export const getCategories = async (): Promise<CategoryResponse> => {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.BASE_API_URL;

        if (!baseUrl) {
            return { success: false, data: [] };
        }

        const res = await fetch(`${baseUrl}/category/all`, {
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
