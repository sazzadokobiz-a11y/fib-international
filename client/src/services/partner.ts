"use server"

export const getActivePartners = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/partner/active`, {
            next: { revalidate: 60 }
        });
        return res.json();
    } catch (error) {
        console.log(error);
        return { success: false, data: [] };
    }
};
