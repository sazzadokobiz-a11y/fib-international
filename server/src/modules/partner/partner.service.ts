import { Partner } from "../../models/partner/partner.schema";

const createHttpError = (statusCode: number, message: string) => {
    const error = new Error(message) as Error & { statusCode: number };
    error.statusCode = statusCode;
    return error;
};

const createPartner = async (payload: {
    name: string;
    logo: string;
    website?: string;
    country?: string;
    isActive?: boolean;
    order?: number;
}) => {
    const result = await Partner.create(payload);
    return result;
};

const getAllPartners = async () => {
    const result = await Partner.find().sort({ order: 1, createdAt: -1 });
    return result;
};

const getActivePartners = async () => {
    const result = await Partner.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    return result;
};

const updatePartner = async (
    id: string,
    payload: Partial<{
        name: string;
        logo: string;
        website: string;
        country: string;
        isActive: boolean;
        order: number;
    }>
) => {
    const result = await Partner.findByIdAndUpdate(id, payload, { new: true });
    if (!result) throw createHttpError(404, "Partner not found");
    return result;
};

const deletePartner = async (id: string) => {
    const result = await Partner.findByIdAndDelete(id);
    if (!result) throw createHttpError(404, "Partner not found");
    return result;
};

export const partnerService = {
    createPartner,
    getAllPartners,
    getActivePartners,
    updatePartner,
    deletePartner,
};
