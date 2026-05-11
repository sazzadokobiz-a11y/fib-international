export const getAllCategories = async()=>{
    try {
        const baseUrl: string | undefined = process.env.NEXT_PUBLIC_API_URL;
        if (!baseUrl) {
            console.log(baseUrl)
            return { success: false, message: "Base API URL not configured", data: [] };
        }
        const res = await fetch(`${baseUrl}/category/all`);
        return res.json();
    } catch (error) {
        console.log(error);
        return { success: false, message: "Error fetching categories", error: error, data: [] };
    }
}



export const addCategory = async(category: {name: string})=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category/add`, {
            method: "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(category)
        })

        return res.json();
    } catch (error) {
        return { success: false, message: "Error fetching categories", error: error, data: [] }
    }
}