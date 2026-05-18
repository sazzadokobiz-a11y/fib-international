"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Send, X, Truck } from "lucide-react";
import { sendOrderToCourier } from "@/services/order";
import type { CourierName } from "@/types/order";
import { useRouter } from "next/navigation";

// ─── Courier Options ──────────────────────────────────────────────────────────

const COURIERS: {
    value: CourierName;
    label: string;
    selectedStyle: string;
    description: string;
}[] = [
        {
            value: "steadfast",
            label: "Steadfast",
            selectedStyle: "border-blue-500 bg-blue-50",
            description: "Nationwide COD delivery",
        },
        {
            value: "pathao",
            label: "Pathao",
            selectedStyle: "border-orange-500 bg-orange-50",
            description: "Same day delivery in Dhaka",
        },
        {
            value: "redx",
            label: "Redx",
            selectedStyle: "border-red-500 bg-red-50",
            description: "Fast delivery across Bangladesh",
        },
    ];

// ─── Props ────────────────────────────────────────────────────────────────────

interface SendToCourierModalProps {
    orderId: string;
    orderDisplayId: string;
    isOpen: boolean;
    onClose: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function SendToCourierModal({
    orderId,
    orderDisplayId,
    isOpen,
    onClose,
}: SendToCourierModalProps) {
    const router = useRouter();
    const [selectedCourier, setSelectedCourier] = useState<CourierName | "">("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!isOpen) return null;

    const handleSend = async () => {
        if (!selectedCourier) {
            toast.error("Please select a courier");
            return;
        }

        setIsSubmitting(true);
        const toastId = toast.loading(`Sending order to ${selectedCourier}...`);

        const result = await sendOrderToCourier(orderId, selectedCourier);

        if (result.success) {
            toast.success(
                `Order sent to ${selectedCourier}! Tracking: ${result.data?.trackingCode || "N/A"}`,
                { id: toastId }
            );
            onClose();
            router.refresh(); // page refresh করবে নতুন courier status দেখাতে
        } else {
            toast.error(result.message || "Failed to send order to courier", { id: toastId });
        }

        setIsSubmitting(false);
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-6"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Send to Courier</h2>
                        <p className="text-xs text-gray-400 mt-0.5">Order: {orderDisplayId}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Courier Selection */}
                <p className="text-sm font-medium text-gray-600 mb-3">Select Courier</p>
                <div className="space-y-2.5">
                    {COURIERS.map((courier) => (
                        <button
                            key={courier.value}
                            onClick={() => setSelectedCourier(courier.value)}
                            className={`w-full flex items-center gap-4 p-3.5 rounded-xl border-2 transition-all text-left
                                ${selectedCourier === courier.value
                                    ? courier.selectedStyle
                                    : "border-gray-100 hover:border-gray-200 bg-white"
                                }`}
                        >
                            <div className={`p-2 rounded-lg ${selectedCourier === courier.value ? "bg-white" : "bg-gray-100"}`}>
                                <Truck
                                    size={18}
                                    className={selectedCourier === courier.value ? "text-gray-700" : "text-gray-400"}
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-800">{courier.label}</p>
                                <p className="text-xs text-gray-400">{courier.description}</p>
                            </div>
                            {/* Radio indicator */}
                            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0
                                ${selectedCourier === courier.value ? "border-gray-700" : "border-gray-300"}`}
                            >
                                {selectedCourier === courier.value && (
                                    <div className="w-2 h-2 rounded-full bg-gray-700" />
                                )}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Footer */}
                <div className="flex gap-3 mt-6">
                    <button
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSend}
                        disabled={isSubmitting || !selectedCourier}
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 transition-colors disabled:opacity-40"
                    >
                        <Send size={15} />
                        {isSubmitting ? "Sending..." : "Send"}
                    </button>
                </div>
            </div>
        </div>
    );
}