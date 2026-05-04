export const getSubCategories = async(parentName: string) => {
    try {
        const res = await fetch(`${process.env.BASE_API_URL}/sub-category/get-all?parent=${parentName}`);
        return res.json();
    } catch (error) {
        console.log(error);
    }
}