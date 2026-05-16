"use server"

export const getActiveBanners = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/banner/active`, {
            next: { revalidate: 60 }
        });
        return res.json();
    } catch (error) {
        console.log(error);
        return { success: false, data: [] };
    }
};
