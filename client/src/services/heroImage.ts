export const getHeroImage = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/hero-image/active`);
        return res.json();
    } catch (error) {
        console.log(error);
        return { success: false, message: "Failed to fetch hero image", data: {} };
    }
};