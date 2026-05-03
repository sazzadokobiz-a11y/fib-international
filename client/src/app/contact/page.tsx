'use client'

import React, { useState } from 'react'
import Container from '@/components/shared/Container'
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react'

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        //  Email redirect (mailto)
        const subject = `Inquiry from ${formData.name}`
        const body = `Name: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`

        window.location.href = `mailto:info.okobiz@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    }

    //  WhatsApp link
    const whatsappNumber = "8801973590937" // replace with number
    const whatsappMessage = `Hello, I'm ${formData.name}. ${formData.message}`
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`

    return (
        <div className="pb-20">

            {/* HERO */}
            <div className="bg-gradient-to-br from-secondary/20 via-secondary/10 to-transparent py-16">
                <Container>
                    <div className="text-center max-w-2xl mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
                            Contact Us
                        </h1>
                        <p className="text-slate-600">
                            Get in touch with JV Family International for inquiries,
                            partnerships, or support. We're here to help you.
                        </p>
                    </div>
                </Container>
            </div>

            <Container>

                <div className="grid md:grid-cols-2 gap-10 mt-16">

                    {/* CONTACT INFO */}
                    <div className="space-y-6">

                        <div className="bg-white p-6 rounded-xl shadow-sm border flex gap-4 items-start">
                            <Mail className="text-secondary" />
                            <div>
                                <h4 className="font-semibold">Email</h4>
                                <p className="text-slate-600">info.okobiz@gmail.com</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border flex gap-4 items-start">
                            <Phone className="text-secondary" />
                            <div>
                                <h4 className="font-semibold">Phone</h4>
                                <p className="text-slate-600">+8801973 590937</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-sm border flex gap-4 items-start">
                            <MapPin className="text-secondary" />
                            <div>
                                <h4 className="font-semibold">Location</h4>
                                <p className="text-slate-600">Dhaka, Bangladesh</p>
                            </div>
                        </div>

                        {/* WhatsApp Button */}
                        <a
                            href={whatsappLink}
                            target="_blank"
                            className="flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition"
                        >
                            <MessageCircle size={18} />
                            Chat on WhatsApp
                        </a>

                    </div>

                    {/* CONTACT FORM */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border">
                        <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            <input
                                type="text"
                                name="name"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                            />

                            <input
                                type="email"
                                name="email"
                                placeholder="Your Email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                            />

                            <textarea
                                name="message"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary"
                            />

                            <button
                                type="submit"
                                className="w-full bg-secondary text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-secondary/90 transition"
                            >
                                <Send size={18} />
                                Send via Email
                            </button>

                        </form>

                        {/* Alternative WhatsApp send */}
                        <a
                            href={whatsappLink}
                            target="_blank"
                            className="mt-4 block text-center text-green-600 hover:underline"
                        >
                            Or send directly via WhatsApp →
                        </a>
                    </div>

                </div>

            </Container>
        </div>
    )
}

export default ContactPage