import { Content } from "../../models/content/content.schema";

const createHttpError = (statusCode: number, message: string) => {
    const error = new Error(message) as Error & { statusCode: number };
    error.statusCode = statusCode;
    return error;
};

const createContent = async (payload: {
    key: string;
    title: string;
    subtitle?: string;
    body: string;
    image?: string;
    isActive?: boolean;
    metaTitle?: string;
    metaDescription?: string;
}) => {
    const existing = await Content.findOne({ key: payload.key });
    if (existing) throw createHttpError(400, "Content with this key already exists");
    const result = await Content.create(payload);
    return result;
};

const getAllContents = async () => {
    const result = await Content.find().sort({ createdAt: -1 });
    return result;
};

const getContentByKey = async (key: string) => {
    const result = await Content.findOne({ key });
    if (!result) throw createHttpError(404, "Content not found");
    return result;
};

const updateContent = async (
    id: string,
    payload: Partial<{
        title: string;
        subtitle: string;
        body: string;
        image: string;
        isActive: boolean;
        metaTitle: string;
        metaDescription: string;
    }>
) => {
    const result = await Content.findByIdAndUpdate(id, payload, { new: true });
    if (!result) throw createHttpError(404, "Content not found");
    return result;
};

const deleteContent = async (id: string) => {
    const result = await Content.findByIdAndDelete(id);
    if (!result) throw createHttpError(404, "Content not found");
    return result;
};

export const contentService = {
    createContent,
    getAllContents,
    getContentByKey,
    updateContent,
    deleteContent,
};
