import config from "../../config";

export type CourierName = "steadfast" | "pathao" | "redx";

interface OrderPayload {
    orderId: string;
    recipientName: string;
    recipientPhone: string;
    recipientAddress: string;
    codAmount: number;
    note?: string;
}


// ─── Steadfast ────────────────────────────────────────────────────────────────

const sendToSteadfast = async (payload: OrderPayload) => {
    const { baseUrl, apiKey, secretKey } = config.steadfast;

    const response = await fetch(`${baseUrl}/create_order`, {
        method: "POST",
        headers: {
            "Api-Key": apiKey,
            "Secret-Key": secretKey,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            invoice: payload.orderId,
            recipient_name: payload.recipientName,
            recipient_phone: payload.recipientPhone,
            recipient_address: payload.recipientAddress,
            cod_amount: payload.codAmount,
            note: payload.note || "",
        })
    });

    
    const text = await response.text();
    console.log("Steadfast raw response:", text);

    try {
        return JSON.parse(text);
    } catch {
        throw new Error(`Steadfast: ${text}`);
    }
};



// ─── Pathao ───────────────────────────────────────────────────────────────────

// Pathao needs a token first
// const getPathaoToken = async (): Promise<string> => {
//     const { baseUrl, clientId, clientSecret, username, password } = courierConfig.pathao;

//     const response = await axios.post(`${baseUrl}/issue-token`, {
//         client_id: clientId,
//         client_secret: clientSecret,
//         username,
//         password,
//         grant_type: "password",
//     });

//     return response.data.access_token;
// };

// const sendToPathao = async (payload: OrderPayload) => {
//     const { baseUrl, storeId } = courierConfig.pathao;
//     const token = await getPathaoToken();

//     const response = await axios.post(
//         `${baseUrl}/orders`,
//         {
//             store_id: Number(storeId),
//             merchant_order_id: payload.orderId,
//             recipient_name: payload.recipientName,
//             recipient_phone: payload.recipientPhone,
//             recipient_address: payload.recipientAddress,
//             // Pathao needs city/zone/area IDs. Default to Dhaka (1) if not mapped.
//             // For production: map customer district/thana to Pathao city/zone IDs
//             recipient_city: 1,
//             recipient_zone: 1,
//             recipient_area: 1,
//             delivery_type: 48,      // 48 = Normal, 12 = Express
//             item_type: 2,           // 2 = Parcel
//             item_quantity: 1,
//             amount_to_collect: payload.codAmount,
//             special_instruction: payload.note || "",
//         },
//         {
//             headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "application/json",
//             },
//         }
//     );

//     return response.data;
// };

// ─── Redx ─────────────────────────────────────────────────────────────────────

// const sendToRedx = async (payload: OrderPayload) => {
//     const { baseUrl, apiToken } = courierConfig.redx;

//     const response = await axios.post(
//         `${baseUrl}/parcel`,
//         {
//             customer_name: payload.recipientName,
//             customer_phone: payload.recipientPhone,
//             customer_address: payload.recipientAddress,
//             merchant_invoice_id: payload.orderId,
//             cash_collection_amount: payload.codAmount,
//             // Redx needs area ID. Default 1. Map properly in production.
//             delivery_area: "Dhaka",
//             delivery_area_id: 1,
//             parcel_weight: 500,     // default 500 gram
//             instruction: payload.note || "",
//             value: payload.codAmount,
//         },
//         {
//             headers: {
//                 "API-ACCESS-TOKEN": `Bearer ${apiToken}`,
//                 "Content-Type": "application/json",
//             },
//         }
//     );

//     return response.data;
// };





// ─── Main dispatcher ──────────────────────────────────────────────────────────




export const dispatchToCourier = async (
    courier: CourierName,
    payload: OrderPayload
) => {
    switch (courier) {
        case "steadfast":
            return await sendToSteadfast(payload);
        case "pathao":
            // return await sendToPathao(payload);
            return "not found"
        case "redx":
            // return await sendToRedx(payload);
            return "not found"
        default:
            throw new Error(`Unknown courier: ${courier}`);
    }
};