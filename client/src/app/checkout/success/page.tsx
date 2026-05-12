import Container from "@/components/shared/Container";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default async function CheckoutSuccessPage({ searchParams }: { searchParams?: Promise<Record<string, string | string[] | undefined>> }) {
    const params = await searchParams || {};
    const orderIdValue = params.orderId;
    const orderId = Array.isArray(orderIdValue) ? orderIdValue[0] : orderIdValue;

    return (
        <section className="py-16">
            <Container>
                <div className="mx-auto max-w-xl rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
                    <CheckCircle2 className="mx-auto mb-4 text-green-600" size={56} />
                    <h1 className="text-3xl font-bold text-primary">Order Placed Successfully</h1>
                    {orderId && (
                        <p className="mt-3 text-gray-600">
                            Order ID: <span className="font-semibold text-gray-900">{orderId}</span>
                        </p>
                    )}
                    <p className="mt-3 text-gray-600">Our team will contact you shortly to confirm delivery.</p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                        <Link href="/import" className="rounded-lg bg-primary px-5 py-2.5 font-semibold text-white">
                            Continue Shopping
                        </Link>
                        <Link href="/" className="rounded-lg border border-primary px-5 py-2.5 font-semibold text-primary">
                            Back Home
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}
