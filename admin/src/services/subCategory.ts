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


export const addSubCategory = async(subCategory: {name: string, categoryId: string})=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sub-category/create`, {
            method: "POST",
            "headers": {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(subCategory)
        })

        return res.json();
    } catch (error) {
        return { success: false, message: "Failed to create sub-category", error: error, data: [] }
    }
}


export const deleteSubCategory = async(id: string)=>{
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sub-category/delete/${id}`, {method: "DELETE"});
        return res.json();
    } catch (error) {
        console.log(error)
        return { success: false, message: "Failed to delete sub-category", error: error, data: [] }
    }
}