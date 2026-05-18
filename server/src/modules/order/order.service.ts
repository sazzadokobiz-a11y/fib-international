import { CourierName, dispatchToCourier } from './order.courier.service';
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

const createOrder = async (payload: OrderPayload) => {
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

const getOrders = async ({
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
}) => {
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

const getOrderDetail = async (id: string) => {
    const result = await Order.findById(id);
    if (!result) {
        throw createHttpError(404, "Order not found");
    }
    return result;
}

const updateOrderStatus = async (id: string, status: string) => {
    if (!orderStatuses.includes(status as typeof orderStatuses[number])) {
        throw createHttpError(400, "Invalid order status");
    }

    const result = await Order.findByIdAndUpdate(id, { orderStatus: status }, { new: true });
    if (!result) {
        throw createHttpError(404, "Order not found");
    }
    return result;
}

const sendCourier = async (orderId: string, courier: CourierName) => {
    const order = await Order.findById(orderId);
    if (!order) {
        throw createHttpError(404, "Order not found");
    }

    // customer check
    if (!order.customer) {
        throw createHttpError(400, "Customer information not found");
    }

    
    if (order.courierStatus === "Sent") {
        throw createHttpError(400, `Order already sent to courier via ${order.courier}`);
    }

    // ─── 3. Courier API payload তৈরি করো ──────────────────────────────────────
    const payload = {
        orderId: order.orderId,
        recipientName: order.customer.fullName,
        recipientPhone: order.customer.mobileNumber,
        recipientAddress: `${order.customer.shippingAddress}, ${order.customer.thana}, ${order.customer.district}`,
        codAmount: order.total,
        note: `Order ID: ${order.orderId}`,
    };

    // ─── 4. Courier API তে পাঠাও ──────────────────────────────────────────────
    const courierResponse = await dispatchToCourier(courier, payload);

    console.log("Courier response:", JSON.stringify(courierResponse, null, 2));

    // ─── 5. Steadfast error check (status 200 না হলে failed) ──────────────────
    if (courier === "steadfast" && courierResponse?.status !== 200) {
        // Save failed status to DB
        await Order.findByIdAndUpdate(orderId, {
            courier,
            courierStatus: "Failed",
            courierResponse,
        });
        throw createHttpError(
            400,
            courierResponse?.message || "Steadfast API returned an error"
        );
    }

    // ─── 6. Tracking code বের করো ─────────────────────────────────────────────
    let trackingCode = "";
    if (courier === "steadfast") {
        trackingCode = courierResponse?.consignment?.tracking_code || "";
    } else if (courier === "pathao") {
        trackingCode = courierResponse?.data?.consignment_id || "";
    } else if (courier === "redx") {
        trackingCode = courierResponse?.tracking_id || "";
    }

    if (!trackingCode) {
        await Order.findByIdAndUpdate(orderId, {
            courier,
            courierStatus: "Failed",
            courierResponse,
        });
        throw createHttpError(400, "Courier did not return a tracking code");
    }

    // ─── 7. DB তে success update করো ──────────────────────────────────────────
    const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        {
            courier,
            courierStatus: "Sent",
            orderStatus: "Shipped",
            courierResponse: {
                ...courierResponse,
                trackingCode,
            },
        },
        { new: true }
    );

    return {
        trackingCode,
        courier,
        courierResponse,
        order: updatedOrder,
    };
};

export const orderService = {
    createOrder,
    getOrders,
    getOrderDetail,
    updateOrderStatus,
    sendCourier
}