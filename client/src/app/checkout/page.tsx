'use client'

import Container from "@/components/shared/Container";
import { useToast } from "@/components/shared/ToastProvider";
import { useCart } from "@/context/CartContext";
import { createOrder, mapCartItemsToOrderProducts } from "@/services/order";
import { Edit2, Trash2, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formatPrice = (value: number) => `৳${value.toLocaleString()}`;

const districts = [
    "Dhaka",
    "Chattogram",
    "Rajshahi",
    "Khulna",
    "Barishal",
    "Sylhet",
    "Rangpur",
    "Mymensingh",
];

export default function CheckoutPage() {
    const router = useRouter();
    const { showToast } = useToast();
    const { items, subtotal, shipping, total, clearCart, removeItem } = useCart();
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const [couponCode, setCouponCode] = useState("");
    const [termsAgreed, setTermsAgreed] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");
    const discount = 0;
    const payable = total - discount;
    const [formData, setFormData] = useState({
        fullName: "",
        mobileNumber: "",
        shippingAddress: "",
        thana: "",
        district: ""
    });

    // const handleCoupon = () => {
    //     if (!couponCode.trim()) {
    //         showToast("Enter a coupon code first", "error");
    //         return;
    //     }

    //     showToast("Coupon is not available right now", "info");
    // }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (items.length === 0) {
            showToast("Your cart is empty", "error");
            return;
        }

        if (!termsAgreed) {
            showToast("Please agree to the terms and policies", "error");
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await createOrder({
                customer: formData,
                products: mapCartItemsToOrderProducts(items),
                shipping
            });

            if (!result.success) {
                throw new Error(result.message || "Failed to place order");
            }

            clearCart();
            showToast("Order placed successfully", "success");
            router.push(`/checkout/success?orderId=${result.data.orderId}`);
        } catch (error) {
            showToast(error instanceof Error ? error.message : "Failed to place order", "error");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <section className="bg-white py-10 md:py-14">
            <Container>
                {items.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
                        <p className="text-gray-600">Your cart is empty.</p>
                        <Link href="/import" className="mt-5 inline-block rounded-lg bg-primary px-5 py-2.5 font-semibold text-white">
                            Browse Import Products
                        </Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="grid gap-12 lg:grid-cols-[1fr_420px]">
                        <div>
                            <h1 className="mb-7 text-center text-2xl font-bold text-gray-950">Checkout Info</h1>

                            <div className="grid gap-x-3 gap-y-3 md:grid-cols-2">
                                <label className="text-xs font-semibold text-gray-950">
                                    Full Name
                                    <input
                                        type="text"
                                        required
                                        placeholder="Enter your full name*"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                                        className="mt-2 h-9 w-full rounded border border-gray-300 px-3 text-sm font-normal outline-none focus:border-primary"
                                    />
                                </label>

                                <label className="text-xs font-semibold text-gray-950">
                                    Mobile Number
                                    <input
                                        type="tel"
                                        required
                                        placeholder="Enter your mobile number*"
                                        value={formData.mobileNumber}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, mobileNumber: e.target.value }))}
                                        className="mt-2 h-9 w-full rounded border border-gray-300 px-3 text-sm font-normal outline-none focus:border-primary"
                                    />
                                </label>

                                <label className="text-xs font-semibold text-gray-950 md:col-span-2">
                                    Shipping Address
                                    <input
                                        type="text"
                                        required
                                        placeholder="Enter your detailed address *"
                                        value={formData.shippingAddress}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, shippingAddress: e.target.value }))}
                                        className="mt-2 h-9 w-full rounded border border-gray-300 px-3 text-sm font-normal outline-none focus:border-primary"
                                    />
                                </label>

                                <label className="text-xs font-semibold text-gray-950">
                                    Thana
                                    <input
                                        type="text"
                                        required
                                        placeholder="Enter your Thana*"
                                        value={formData.thana}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, thana: e.target.value }))}
                                        className="mt-2 h-9 w-full rounded border border-gray-300 px-3 text-sm font-normal outline-none focus:border-primary"
                                    />
                                </label>

                                <label className="text-xs font-semibold text-gray-950">
                                    District
                                    <select
                                        required
                                        value={formData.district}
                                        onChange={(e) => setFormData((prev) => ({ ...prev, district: e.target.value }))}
                                        className="mt-2 h-9 w-full rounded border border-gray-300 px-3 text-sm font-normal outline-none focus:border-primary"
                                    >
                                        <option value="">Select your district*</option>
                                        {districts.map((district) => (
                                            <option key={district} value={district}>{district}</option>
                                        ))}
                                    </select>
                                </label>
                            </div>

                            <div className="mt-8 bg-gray-100 p-5 md:p-7">
                                <div className="text-center text-sm">
                                    <p>Your total payable amount is</p>
                                    <p className="mt-1 text-2xl font-bold text-green-600">{formatPrice(payable)}</p>
                                    <p className="text-lg font-bold text-gray-950">BreakDown</p>
                                </div>

                                <div className="mt-4 overflow-hidden rounded border border-gray-300 bg-white">
                                    <div className="grid grid-cols-[1fr_150px] border-b border-gray-300 px-4 py-3 text-sm font-bold">
                                        <span>Purpose</span>
                                        <span className="text-right">Amount</span>
                                    </div>
                                    <BreakdownRow label="Subtotal" value={subtotal} />
                                    <BreakdownRow label="Shipping" value={shipping} />
                                    <BreakdownRow label="Discount" value={discount} />
                                </div>

                                <p className="mt-4 text-center text-xs text-gray-900">
                                    You will get the delivery within 2-3 days after confirmation.
                                </p>
                            </div>

                            <div className="mt-8">
                                <p className="mb-3 text-sm font-bold text-gray-950">Payment Options</p>
                                <div className="flex flex-wrap gap-3">
                                    <label className="flex h-11 cursor-pointer items-center gap-2 rounded border border-gray-300 bg-white px-3">
                                        <input
                                            type="radio"
                                            name="payment"
                                            checked={paymentMethod === "Cash on Delivery"}
                                            onChange={() => setPaymentMethod("Cash on Delivery")}
                                        />
                                        <span className="font-bold text-gray-800">CASH</span>
                                        <Truck className="text-orange-500" size={24} />
                                    </label>

                                    <label className="flex h-11 cursor-not-allowed items-center gap-2 rounded border border-gray-300 bg-white px-3 opacity-60">
                                        <input type="radio" name="payment" disabled />
                                        <span className="text-xs font-semibold text-gray-600">Online Payment</span>
                                    </label>
                                </div>
                            </div>


                            {/* Coupon Code? */}
                            {/* <div className="mt-6">
                                <label className="text-sm font-bold text-gray-950">
                                    Got any Coupon Code?
                                </label>
                                <div className="mt-2 grid gap-3 md:grid-cols-[1fr_300px]">
                                    <input
                                        type="text"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        placeholder="Enter Coupon Code Here"
                                        className="h-10 rounded border border-gray-300 px-3 text-sm outline-none focus:border-primary"
                                    />
                                    <button type="button" onClick={handleCoupon} className="h-10 rounded bg-slate-900 text-sm font-semibold text-white">
                                        Add Coupon
                                    </button>
                                </div>
                            </div> */}

                            <label className="mt-5 flex items-start gap-2 text-sm text-gray-900">
                                <input
                                    type="checkbox"
                                    checked={termsAgreed}
                                    onChange={(e) => setTermsAgreed(e.target.checked)}
                                    className="mt-1"
                                />
                                <span>
                                    I agree to <Link href="/footer/term-service" className="text-red-600">Terms & Conditions</Link>, <Link href="/footer/privacy-policy" className="text-red-600">Refund Policy</Link> and <Link href="/footer/privacy-policy" className="text-red-600">Privacy Policy</Link>.
                                </span>
                            </label>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="mt-7 h-10 w-full rounded bg-slate-900 text-sm font-bold text-white transition hover:bg-slate-800 disabled:opacity-50"
                            >
                                {isSubmitting ? "Confirming Order..." : "Confirm Order"}
                            </button>
                        </div>

                        <aside className="h-fit bg-gray-100 p-5 md:p-7">
                            <h2 className="text-center text-xl font-bold text-gray-950">Cart Overview</h2>
                            <div className="my-5 h-px bg-gray-300" />

                            <div className="space-y-4">
                                {items.map((item) => (
                                    <div key={item.productId} className="rounded-lg border border-gray-300 bg-white p-3 shadow-sm">
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <p className="line-clamp-2 text-xs font-bold text-gray-950">{item.name}</p>
                                                <div className="mt-2 flex items-center gap-3">
                                                    <Image src={item.thumbnail || "/window.svg"} alt={item.name} width={54} height={64} className="h-16 w-12 rounded object-cover" />
                                                    <p className="text-xs text-gray-700">x {item.quantity}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs font-semibold text-gray-950">x {item.quantity} {formatPrice(item.price)}</p>
                                                <div className="mt-3 flex justify-end gap-2">
                                                    <Link href="/cart" className="inline-flex items-center gap-1 rounded border border-blue-300 px-2 py-1 text-xs text-blue-600">
                                                        <Edit2 size={12} />
                                                        Edit
                                                    </Link>
                                                    <button type="button" onClick={() => removeItem(item.productId)} className="rounded border border-red-300 px-2 py-1 text-red-600">
                                                        <Trash2 size={12} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-5 border-t border-gray-300 pt-5 text-sm">
                                <CartSummaryRow label="Subtotal:" value={subtotal} />
                                <CartSummaryRow label="Shipping (+):" value={shipping} />
                                <CartSummaryRow label="Discount (-):" value={discount} />
                                <div className="mt-4 border-t border-gray-300 pt-4">
                                    <CartSummaryRow label="Payable:" value={payable} strong />
                                </div>
                            </div>
                        </aside>
                    </form>
                )}
            </Container>
        </section>
    );
}

function BreakdownRow({ label, value }: { label: string; value: number }) {
    return (
        <div className="grid grid-cols-[1fr_150px] border-b border-gray-200 px-4 py-3 text-sm last:border-b-0">
            <span>{label}</span>
            <span className="text-right">{formatPrice(value)}</span>
        </div>
    );
}

function CartSummaryRow({ label, value, strong = false }: { label: string; value: number; strong?: boolean }) {
    return (
        <div className={`mb-5 flex justify-between gap-4 ${strong ? "text-base font-bold" : "font-semibold"}`}>
            <span className="text-gray-950">{label}</span>
            <span className="text-green-600">{formatPrice(value)}</span>
        </div>
    );
}
