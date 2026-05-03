'use client'

import { useState } from "react"
import Container from "@/components/shared/Container"
import { CheckCircle2, Globe, ShieldCheck, Truck, Clock } from "lucide-react"

export default function RequestQuotePage() {

    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        country: "",
        product: "",
        quantity: "",
        incoterm: "",
        urgency: "",
        message: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            await new Promise(res => setTimeout(res, 1200))

            console.log("Quote Request:", form)

            setSuccess(true)

            setForm({
                name: "",
                email: "",
                phone: "",
                company: "",
                country: "",
                product: "",
                quantity: "",
                incoterm: "",
                urgency: "",
                message: ""
            })

        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="py-16 bg-gradient-to-b from-white via-[#f7f5f0] to-white min-h-screen">

            <Container className="max-w-5xl">

                {/* HEADER */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-primary">
                        Request Export Quotation
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Get competitive global pricing within 24 hours from JV Family International
                    </p>
                </div>

                {/* TRUST / COMPANY INFO */}
                <div className="grid md:grid-cols-4 gap-4 mb-10">
                    {[
                        { icon: Globe, title: "Global Export Network" },
                        { icon: ShieldCheck, title: "Verified Supplier Chain" },
                        { icon: Truck, title: "Reliable Shipping Support" },
                        { icon: Clock, title: "24H Response Time" },
                    ].map((item, i) => (
                        <div key={i} className="bg-white border rounded-xl p-5 text-center shadow-sm hover:shadow-md transition">
                            <item.icon className="mx-auto text-primary mb-2" />
                            <p className="text-sm font-medium">{item.title}</p>
                        </div>
                    ))}
                </div>

                {/* SUCCESS */}
                {success && (
                    <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3">
                        <CheckCircle2 className="text-green-600" />
                        <p className="text-green-700 font-medium">
                            Your quotation request has been submitted successfully. Our export team will contact you soon.
                        </p>
                    </div>
                )}

                <div className="grid lg:grid-cols-3 gap-6">

                    {/* FORM */}
                    <form
                        onSubmit={handleSubmit}
                        className="lg:col-span-2 bg-white shadow-xl rounded-2xl p-8 border"
                    >

                        <h2 className="text-xl font-semibold mb-6">Quotation Details</h2>

                        <div className="grid md:grid-cols-2 gap-5">

                            <Input label="Full Name" name="name" value={form.name} onChange={handleChange} required />
                            <Input label="Email Address" name="email" value={form.email} onChange={handleChange} required />
                            <Input label="Phone / WhatsApp" name="phone" value={form.phone} onChange={handleChange} required />
                            <Input label="Company Name" name="company" value={form.company} onChange={handleChange} />
                            <Input label="Country" name="country" value={form.country} onChange={handleChange} />
                            <Input label="Product Name" name="product" value={form.product} onChange={handleChange} required />
                            <Input label="Quantity (MOQ / Units)" name="quantity" value={form.quantity} onChange={handleChange} required />

                            {/* INCOTERM */}
                            <Select
                                label="Incoterm"
                                name="incoterm"
                                value={form.incoterm}
                                onChange={handleChange}
                                options={["FOB", "CIF", "EXW", "DDP"]}
                            />

                            {/* URGENCY */}
                            <Select
                                label="Delivery Urgency"
                                name="urgency"
                                value={form.urgency}
                                onChange={handleChange}
                                options={["Standard", "Urgent", "Very Urgent"]}
                            />
                        </div>

                        {/* MESSAGE */}
                        <div className="mt-5">
                            <label className="text-sm text-gray-600">Additional Requirements</label>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                rows={5}
                                className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
                                placeholder="Packaging, specifications, certification, destination port, etc..."
                            />
                        </div>

                        {/* BUTTON */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="mt-6 w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition"
                        >
                            {loading ? "Submitting Request..." : "Submit Quotation Request"}
                        </button>

                        <p className="text-xs text-gray-500 text-center mt-4">
                            Response time: within 24 hours (business days)
                        </p>

                    </form>

                    {/* SIDE INFO */}
                    <div className="space-y-4">

                        <div className="bg-white border rounded-xl p-6 shadow-sm">
                            <h3 className="font-semibold mb-2">Why Work With Us?</h3>
                            <ul className="text-sm text-gray-600 space-y-2">
                                <li>✔ Direct exporter network</li>
                                <li>✔ Competitive factory pricing</li>
                                <li>✔ Global logistics support</li>
                                <li>✔ Quality inspection before shipment</li>
                            </ul>
                        </div>

                        <div className="bg-[#f7f5f0] border rounded-xl p-6">
                            <h3 className="font-semibold mb-2">Trade Support</h3>
                            <p className="text-sm text-gray-600">
                                We assist with documentation, shipping terms, customs clearance guidance,
                                and supplier verification for smooth international trade.
                            </p>
                        </div>

                        <div className="bg-white border rounded-xl p-6">
                            <h3 className="font-semibold mb-2">Note</h3>
                            <p className="text-sm text-gray-600">
                                Accurate details help us provide faster and more precise quotations.
                            </p>
                        </div>

                    </div>

                </div>

            </Container>
        </section>
    )
}

/* INPUT */
function Input({
    label,
    ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
    return (
        <div>
            <label className="text-sm text-gray-600">{label}</label>
            <input
                {...props}
                className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
            />
        </div>
    )
}

/* SELECT */
function Select({
    label,
    options,
    ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string, options: string[] }) {
    return (
        <div>
            <label className="text-sm text-gray-600">{label}</label>
            <select
                {...props}
                className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none bg-white"
            >
                <option value="">Select</option>
                {options.map((opt, i) => (
                    <option key={i} value={opt}>{opt}</option>
                ))}
            </select>
        </div>
    )
}