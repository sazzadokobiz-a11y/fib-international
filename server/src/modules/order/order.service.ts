import { ImportProduct } from "../../models/importProduct/importProductSchema";
import { Order, orderStatuses } from "../../models/order/orderSchema";

type OrderProductPayload = {
    productId: string;
    quantity: number;
}

type OrderPayload = {
    customer: {
        fullName: string;
        mobileNumber: string;
        shippingAddress: string;
        thana: string;
        district: string;
    };
    products: OrderProductPayload[];
    shipping?: number;
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

const generateOrderId = () => {
    const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, "");
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    return `FJV-${datePart}-${randomPart}`;
}

const createOrder = async(payload: OrderPayload)=>{
    if (!payload.customer) {
        throw createHttpError(400, "customer info is required");
    }

    validateRequiredText(payload.customer, ["fullName", "mobileNumber", "shippingAddress", "thana", "district"]);

    if (!Array.isArray(payload.products) || payload.products.length === 0) {
        throw createHttpError(400, "At least one product is required");
    }

    const orderProducts = [];
    let subtotal = 0;

    for (const item of payload.products) {
        const quantity = Number(item.quantity);
        if (!item.productId || !Number.isFinite(quantity) || quantity < 1) {
            throw createHttpError(400, "Invalid order product");
        }

        const product = await ImportProduct.findById(item.productId);
        if (!product || product.isActive === false) {
            throw createHttpError(404, "Import product not found");
        }

        const stock = Number(product.stock || 0);
        if (stock < quantity) {
            throw createHttpError(400, `${product.name} has only ${stock} item(s) in stock`);
        }

        const price = Number(product.discountPrice || product.price || 0);
        const total = price * quantity;
        subtotal += total;

        orderProducts.push({
            productId: product._id,
            name: product.name,
            slug: product.slug,
            sku: product.sku,
            thumbnail: product.thumbnail,
            price,
            quantity,
            total
        });
    }

    for (const item of payload.products) {
        await ImportProduct.findOneAndUpdate(
            { _id: item.productId, stock: { $gte: Number(item.quantity) } },
            { $inc: { stock: -Number(item.quantity) } }
        );
    }

    const shipping = Number(payload.shipping ?? 100);
    const order = new Order({
        orderId: generateOrderId(),
        customer: {
            fullName: payload.customer.fullName.trim(),
            mobileNumber: payload.customer.mobileNumber.trim(),
            shippingAddress: payload.customer.shippingAddress.trim(),
            thana: payload.customer.thana.trim(),
            district: payload.customer.district.trim()
        },
        products: orderProducts,
        subtotal,
        shipping,
        total: subtotal + shipping,
        paymentMethod: "Cash on Delivery"
    });

    const result = await order.save();
    return result;
}

const getOrders = async({
    search,
    status,
    dateFrom,
    dateTo,
    page,
    skip,
    limit,
    sortBy,
    sortOrder
}: {
    search?: string;
    status?: string;
    dateFrom?: string;
    dateTo?: string;
    page: number;
    skip: number;
    limit: number;
    sortBy: string;
    sortOrder: string;
})=>{
    const filter: any = {};

    if (search) {
        filter.$or = [
            { orderId: { $regex: search, $options: "i" } },
            { "customer.fullName": { $regex: search, $options: "i" } },
            { "customer.mobileNumber": { $regex: search, $options: "i" } },
            { "products.name": { $regex: search, $options: "i" } }
        ];
    }

    if (status && orderStatuses.includes(status as typeof orderStatuses[number])) {
        filter.orderStatus = status;
    }

    if (dateFrom || dateTo) {
        filter.createdAt = {};
        if (dateFrom) {
            filter.createdAt.$gte = new Date(dateFrom);
        }
        if (dateTo) {
            const endDate = new Date(dateTo);
            endDate.setHours(23, 59, 59, 999);
            filter.createdAt.$lte = endDate;
        }
    }

    const sortCondition: any = {};
    sortCondition[sortBy] = sortOrder === "asc" ? 1 : -1;

    const result = await Order.find(filter).sort(sortCondition).skip(skip).limit(limit);
    const total = await Order.countDocuments(filter);

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

const getOrderDetail = async(id: string)=>{
    const result = await Order.findById(id);
    if (!result) {
        throw createHttpError(404, "Order not found");
    }
    return result;
}

const updateOrderStatus = async(id: string, status: string)=>{
    if (!orderStatuses.includes(status as typeof orderStatuses[number])) {
        throw createHttpError(400, "Invalid order status");
    }

    const result = await Order.findByIdAndUpdate(id, { orderStatus: status }, { new: true });
    if (!result) {
        throw createHttpError(404, "Order not found");
    }
    return result;
}

const sendCourier = async(id: string)=>{
    const order = await Order.findById(id);
    if (!order) {
        throw createHttpError(404, "Order not found");
    }

    const courierPayload = {
        orderId: order.orderId,
        customer: order.customer,
        products: order.products,
        subtotal: order.subtotal,
        shipping: order.shipping,
        total: order.total,
        paymentMethod: order.paymentMethod
    };

    let courierResponse: unknown;
    let courierName = process.env.COURIER_NAME || "Free Courier Sandbox";

    if (process.env.COURIER_API_URL) {
        const headers: Record<string, string> = {
            "Content-Type": "application/json"
        };

        if (process.env.COURIER_API_KEY) {
            headers.Authorization = `Bearer ${process.env.COURIER_API_KEY}`;
        }

        const response = await fetch(process.env.COURIER_API_URL, {
            method: "POST",
            headers,
            body: JSON.stringify(courierPayload)
        });

        courierResponse = await response.json().catch(() => ({ status: response.status, message: response.statusText }));

        if (!response.ok) {
            order.courierStatus = "Failed";
            order.courier = courierName;
            order.courierResponse = courierResponse;
            await order.save();
            throw createHttpError(response.status, "Courier API request failed");
        }
    } else {
        courierResponse = {
            provider: courierName,
            trackingId: `FCS-${order.orderId}`,
            status: "submitted",
            simulated: true
        };
    }

    order.courierStatus = "Sent";
    order.courier = courierName;
    order.courierResponse = courierResponse;
    const result = await order.save();
    return result;
}

export const orderService = {
    createOrder,
    getOrders,
    getOrderDetail,
    updateOrderStatus,
    sendCourier
}
