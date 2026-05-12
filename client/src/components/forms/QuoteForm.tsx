'use client'

import React, { useState } from 'react'
import { submitQuoteRequest } from '@/services/quote'
import { useToast } from '@/components/shared/ToastProvider'

interface QuoteFormProps {
    productId: string
    productName: string
    quantity: number
    moq: number
    onQuantityChange: (quantity: number) => void
    onSubmit?: (formData: QuoteFormData) => Promise<void>
}

export interface QuoteFormData {
    fullName: string
    companyName: string
    country: string
    phoneNumber: string
    email: string
    message: string
    requestedQuantity: number
}

export const QuoteForm: React.FC<QuoteFormProps> = ({
    productId,
    productName,
    quantity,
    moq,
    onQuantityChange,
    onSubmit
}) => {
    const { showToast } = useToast()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState<QuoteFormData>({
        fullName: '',
        companyName: '',
        country: '',
        phoneNumber: '',
        email: '',
        message: '',
        requestedQuantity: quantity
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: name === "requestedQuantity" ? Number(value) : value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (quantity < moq) {
            showToast(`Requested quantity must be at least ${moq}`, "error")
            return
        }

        setIsSubmitting(true)
        try {
            const payload = {
                ...formData,
                productId,
                requestedQuantity: quantity,
            }

            if (onSubmit) {
                await onSubmit(payload)
            } else {
                const result = await submitQuoteRequest(payload)
                if (!result.success) {
                    throw new Error(result.message || "Failed to submit quote request")
                }

                showToast("Quote request submitted successfully", "success")
            }

            setFormData({
                fullName: '',
                companyName: '',
                country: '',
                phoneNumber: '',
                email: '',
                message: '',
                requestedQuantity: moq
            })
            onQuantityChange(moq)
        } catch (error) {
            console.error('Error submitting form:', error)
            showToast(error instanceof Error ? error.message : 'Error submitting quote request. Please try again.', "error")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="bg-[#f5f0e6] rounded-lg p-8">
            <h3 className="text-primary font-headline font-semibold text-xl mb-6">Request a Quote</h3>

            {/* Quote Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row 1 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                        placeholder="Full Name"
                        className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-primary placeholder-slate-400"
                    />
                    <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleInputChange}
                        required
                        placeholder="Company Name"
                        className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-primary placeholder-slate-400"
                    />
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        required
                        placeholder="Your Country"
                        className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-primary placeholder-slate-400"
                    />
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        required
                        placeholder="Phone Number"
                        className="px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-primary placeholder-slate-400"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Email Address"
                        className="px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary placeholder-slate-400"
                    />
                    <input
                        type="text"
                        value={productName}
                        readOnly
                        className="px-4 py-3 border border-slate-300 rounded-lg bg-white/70 text-slate-600 focus:outline-none placeholder-slate-400"
                    />
                </div>

                {/* Quantity Info */}
                <div className="bg-white rounded-lg p-4 border border-slate-200 mb-2">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-slate-600 text-xs font-medium mb-1">Minimum Order Quantity</p>
                            <p className="text-primary font-headline text-lg font-bold">{moq.toLocaleString()} units</p>
                        </div>
                        <div>
                            <p className="text-slate-600 text-xs font-medium mb-1">Your Quantity</p>
                            <input
                                type="number"
                                min={moq}
                                name="requestedQuantity"
                                value={quantity}
                                onChange={(e) => onQuantityChange(Number(e.target.value))}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-primary text-sm"
                            />
                        </div>
                    </div>
                </div>

                {/* Description */}
                <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    placeholder="Message"
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:border-primary resize-none placeholder-slate-400"
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-6 bg-primary text-white font-headline font-semibold rounded-lg hover:bg-primary/90 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-base cursor-pointer"
                >
                    {isSubmitting ? 'Submitting...' : 'Get A Quote'}
                </button>
            </form>
        </div>
    )
}

export default QuoteForm
