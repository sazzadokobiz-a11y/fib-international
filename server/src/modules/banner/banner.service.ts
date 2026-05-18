import { Banner } from "../../models/banner/banner.schema";

type BannerType = "Offer" | "Sale" | "Announcement";

const createHttpError = (statusCode: number, message: string) => {
    const error = new Error(message) as Error & { statusCode: number };
    error.statusCode = statusCode;
    return error;
};

const createBanner = async (payload: {
    title: string;
    subtitle: string;
    image: string;
    type: BannerType;
    isActive?: boolean;
    order?: number;
}) => {
    const result = await Banner.create(payload);
    return result;
};

const getAllBanners = async () => {
    const result = await Banner.find().sort({ order: 1, createdAt: -1 });
    return result;
};

const getActiveBanners = async () => {
    const result = await Banner.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    return result;
};

const updateBanner = async (
    id: string,
    payload: Partial<{
        title: string;
        subtitle: string;
        image: string;
        type: string;
        isActive: boolean;
        order: number;
    }>
) => {
    const result = await Banner.findByIdAndUpdate(id, payload, { new: true });
    if (!result) throw createHttpError(404, "Banner not found");
    return result;
};

const deleteBanner = async (id: string) => {
    const result = await Banner.findByIdAndDelete(id);
    if (!result) throw createHttpError(404, "Banner not found");
    return result;
};

export const bannerService = {
    createBanner,
    getAllBanners,
    getActiveBanners,
    updateBanner,
    deleteBanner,
};
