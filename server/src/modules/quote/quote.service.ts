import { ExportProduct } from "../../models/exportProduct/exportProductSchema";
import { Quote, quoteStatuses } from "../../models/quote/quoteSchema";

type QuotePayload = {
    fullName: string;
    companyName: string;
    email: string;
    phoneNumber: string;
    country: string;
    message: string;
    requestedQuantity: number;
    productId: string;
}

const createHttpError = (status: number, message: string) => {
    const error = new Error(message) as Error & { status: number };
    error.status = status;
    return error;
};

const validateRequiredText = (payload: Record<string, unknown>, fields: string[]) => {
    fields.forEach((field) => {
        if (typeof payload[field] !== "string" || !payload[field]?.toString().trim()) {
            throw createHttpError(400, `${field} is required`);
        }
    });
};

const createQuote = async(payload: QuotePayload)=>{
    validateRequiredText(payload, ["fullName", "companyName", "email", "phoneNumber", "country", "message", "productId"]);

    const requestedQuantity = Number(payload.requestedQuantity);
    if (!Number.isFinite(requestedQuantity) || requestedQuantity < 1) {
        throw createHttpError(400, "requestedQuantity must be at least 1");
    }

    const product = await ExportProduct.findById(payload.productId);
    if (!product) {
        throw createHttpError(404, "Export product not found");
    }

    const quote = new Quote({
        fullName: payload.fullName.trim(),
        companyName: payload.companyName.trim(),
        email: payload.email.trim(),
        phoneNumber: payload.phoneNumber.trim(),
        country: payload.country.trim(),
        message: payload.message.trim(),
        requestedQuantity,
        product: {
            productId: product._id,
            name: product.name,
            slug: product.slug,
            thumbnail: product.thumbnail,
            category: product.category,
            subCategory: product.subCategory
        }
    });

    const result = await quote.save();
    return result;
}

const getQuotes = async ({
    search,
    status,
    isRead,
    page,
    skip,
    limit,
    sortBy,
    sortOrder
}: {
    search?: string;
    status?: string;
    isRead?: boolean;
    page: number;
    skip: number;
    limit: number;
    sortBy: string;
    sortOrder: string;
})=>{
    const filter: any = {};

    if (search) {
        filter.$or = [
            { fullName: { $regex: search, $options: "i" } },
            { companyName: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
            { phoneNumber: { $regex: search, $options: "i" } },
            { "product.name": { $regex: search, $options: "i" } }
        ];
    }

    if (status && quoteStatuses.includes(status as typeof quoteStatuses[number])) {
        filter.status = status;
    }

    if (typeof isRead === "boolean") {
        filter.isRead = isRead;
    }

    const sortCondition: any = {};
    sortCondition[sortBy] = sortOrder === "asc" ? 1 : -1;

    const result = await Quote.find(filter).sort(sortCondition).skip(skip).limit(limit);
    const total = await Quote.countDocuments(filter);

    return {
        data: result,
        meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit)
        }
    };
}

const getQuoteDetail = async(id: string)=>{
    const result = await Quote.findById(id);
    if (!result) {
        throw createHttpError(404, "Quote not found");
    }
    return result;
}

const updateQuoteStatus = async(id: string, status: string)=>{
    if (!quoteStatuses.includes(status as typeof quoteStatuses[number])) {
        throw createHttpError(400, "Invalid quote status");
    }

    const result = await Quote.findByIdAndUpdate(id, { status, isRead: true }, { new: true });
    if (!result) {
        throw createHttpError(404, "Quote not found");
    }
    return result;
}

const markQuoteRead = async(id: string)=>{
    const result = await Quote.findByIdAndUpdate(id, { isRead: true }, { new: true });
    if (!result) {
        throw createHttpError(404, "Quote not found");
    }
    return result;
}

const markAllQuotesRead = async()=>{
    const result = await Quote.updateMany({ isRead: false }, { isRead: true });
    return result;
}

const getUnreadQuoteCount = async()=>{
    const count = await Quote.countDocuments({ isRead: false });
    return { count };
}

export const quoteService = {
    createQuote,
    getQuotes,
    getQuoteDetail,
    updateQuoteStatus,
    markQuoteRead,
    markAllQuotesRead,
    getUnreadQuoteCount
}
