import { HeroImage } from "../../models/heroImage/heroImage.shcema";

const createHttpError = (statusCode: number, message: string) => {
    const error = new Error(message) as Error & { statusCode: number };
    error.statusCode = statusCode;
    return error;
};

const createHero = async (payload: {
    title: string;
    subtitle: string;
    content: string;
    image: string;
    isActive?: boolean;
}) => {
    await HeroImage.updateMany(
        {},
        { $set: { isActive: false } }
    );
    const result = await HeroImage.create({...payload, isActive: true});
    return result;
};

const getHeroImage = async () => {
    const result = await HeroImage.find();
    return result;
};


const getActiveHero = async () => {
    const result = await HeroImage.findOne({ isActive: true });
    return result;
};

const updateHero = async (
    id: string,
    payload: Partial<{
        title: string;
        subtitle: string;
        content: string;
        image: string;
        isActive: boolean;
    }>
) => {
    // If setting current hero active
    if (payload.isActive === true) {
        // Make all hero inactive first
        await HeroImage.updateMany(
            {},
            { $set: { isActive: false } }
        );
    }

    // Update selected hero
    const result = await HeroImage.findByIdAndUpdate(
        id,
        payload,
        { new: true }
    );

    if (!result) {
        throw createHttpError(404, "Hero image not found");
    }

    return result;
};


const deleteHero = async (id: string) => {
    const result = await HeroImage.findByIdAndDelete(id);
    if (!result) throw createHttpError(404, "Banner not found");
    return result;
};

export const heroService = {
    createHero,
    getActiveHero,
    getHeroImage,
    updateHero,
    deleteHero
};
