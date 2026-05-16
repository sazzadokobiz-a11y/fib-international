"use server"

export const getContentByKey = async (key: string) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/content/key/${key}`, {
            next: { revalidate: 60 }
        });
        return res.json();
    } catch (error) {
        console.log(error);
        return { success: false, data: null };
    }
};

export const getAllContents = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/content/all`, {
            next: { revalidate: 60 }
        });
        return res.json();
    } catch (error) {
        console.log(error);
        return { success: false, data: [] };
    }
};
