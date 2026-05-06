export const uploadImage = async (thumbnail: File, images: File[]) =>{
    const formData = new FormData();
    formData.append("thumbnail", thumbnail);

    images.forEach((img) => {
        formData.append("images", img);
    });

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/image-upload`, {
        method: "POST",
        body: formData,
    });

    const data = await res.json();
    return data;
}