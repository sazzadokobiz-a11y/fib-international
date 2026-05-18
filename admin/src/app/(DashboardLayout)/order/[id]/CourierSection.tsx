"use client";

import { useState } from "react";
import { Send, Package } from "lucide-react";
import { SendToCourierModal } from "@/components/dashboard/SendToCourierModal";
import type { Order } from "@/types/order";

interface CourierSectionProps {
    order: Order;
}

export function CourierSection({ order }: CourierSectionProps) {
    const [modalOpen, setModalOpen] = useState(false);
    const alreadySent = order.courierStatus === "Sent";
    const isFailed = order.courierStatus === "Failed";

    // tracking code
    const trackingCode = order.courierResponse?.trackingCode || "";

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Courier</h3>

            <div className="space-y-3">
                {/* Status badge */}
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold
                        ${alreadySent ? "bg-green-100 text-green-700" :
                            isFailed ? "bg-red-100 text-red-700" :
                                "bg-gray-100 text-gray-600"}`}
                    >
                        {order.courierStatus}
                    </span>
                </div>

                {/* Courier name */}
                {order.courier && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">Courier</p>
                        <p className="text-sm font-semibold text-gray-800 capitalize">{order.courier}</p>
                    </div>
                )}

                {/* Tracking code */}
                {trackingCode && (
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-500">Tracking Code</p>
                        <p className="text-sm font-mono font-bold text-gray-900">{trackingCode}</p>
                    </div>
                )}
            </div>

            {/* Send button — only show if not already sent */}
            {!alreadySent && (
                <button
                    onClick={() => setModalOpen(true)}
                    className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition-colors"
                >
                    <Send size={15} />
                    {isFailed ? "Retry Send to Courier" : "Send to Courier"}
                </button>
            )}

            {/* Already sent — show tracking link */}
            {alreadySent && trackingCode && (
                <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-100 flex items-start gap-2">
                    <Package size={15} className="text-green-600 mt-0.5 shrink-0" />
                    <p className="text-xs text-green-700">
                        Parcel submitted. Tracking: <span className="font-mono font-bold">{trackingCode}</span>
                    </p>
                </div>
            )}

            {/* Modal */}
            <SendToCourierModal
                orderId={order._id}
                orderDisplayId={order.orderId}
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </div>
    );
}