export const getSubCategory = async(parentCategory: string)=>{
    try {
        const baseUrl: string | undefined = process.env.NEXT_PUBLIC_API_URL;
        if (!baseUrl) {
            console.log(baseUrl)
            return { success: false, message: "Base API URL not configured", data: [] };
        }
        const res = await fetch(`${baseUrl}/sub-category/get-all?parent=${parentCategory}`);
        return res.json();
    } catch (error) {
        console.log(error);
        return { success: false, message: "Error fetching sub-categories", data: [] };
    }
}