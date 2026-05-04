"use client"
import React, { useState } from 'react'
import Container from '@/components/shared/Container'
import { TruckElectric } from 'lucide-react'

type TrackingResult = {
    status: string;
    location: string;
    eta: string;
    progress: number;
    shipmentId: string;
}

function TrackCargo() {
    const [trackingId, setTrackingId] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<TrackingResult | null>(null)

    const handleTrack = () => {
        setLoading(true)

        // mock API simulation
        setTimeout(() => {
            setLoading(false)
            setResult({
                status: 'In Transit',
                location: 'Singapore Port',
                eta: '3 - 5 Days',
                progress: 65,
                shipmentId: trackingId || 'JVF-2026-00123'
            })
        }, 1200)
    }

    return (
        <div className="py-20 bg-gradient-to-b from-white to-[#f5f0e6]">

            <Container>

                {/* Header */}
                <div className="text-center mb-14">
                    <h1 className="text-4xl md:text-5xl font-bold text-primary">
                        Track Your Cargo
                    </h1>
                    <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
                        Enter your tracking ID to get real-time updates on your shipment status,
                        location, and estimated delivery time.
                    </p>
                </div>

                {/* Tracking Box */}
                <div className="bg-white rounded-2xl shadow-sm border p-8 max-w-3xl mx-auto">

                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            placeholder="Enter Tracking ID (e.g. JVF-2026-00123)"
                            value={trackingId}
                            onChange={(e) => setTrackingId(e.target.value)}
                            className="flex-1 px-4 py-3 border rounded-lg outline-none focus:ring-2 focus:ring-secondary"
                        />

                        <button
                            onClick={handleTrack}
                            className="bg-primary flex items-center gap-2 text-white px-6 py-3 rounded-lg hover:bg-secondary transition-colors"
                        >
                            <TruckElectric size={20} />
                            {loading ? 'Tracking...' : 'Track Cargo'}
                        </button>
                    </div>

                    {/* Result */}
                    {result && (
                        <div className="mt-10 space-y-6">

                            {/* Status */}
                            <div className="flex items-center justify-between bg-[#f5f0e6] p-4 rounded-lg">
                                <span className="text-slate-600">Status</span>
                                <span className="font-semibold text-primary">{result.status}</span>
                            </div>

                            {/* Location */}
                            <div className="flex items-center justify-between bg-[#f5f0e6] p-4 rounded-lg">
                                <span className="text-slate-600">Current Location</span>
                                <span className="font-semibold text-primary">{result.location}</span>
                            </div>

                            {/* ETA */}
                            <div className="flex items-center justify-between bg-[#f5f0e6] p-4 rounded-lg">
                                <span className="text-slate-600">Estimated Delivery</span>
                                <span className="font-semibold text-primary">{result.eta}</span>
                            </div>

                            {/* Progress Bar */}
                            <div>
                                <div className="flex justify-between mb-2 text-sm text-slate-600">
                                    <span>Shipment Progress</span>
                                    <span>{result.progress}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-3">
                                    <div
                                        className="bg-secondary h-3 rounded-full transition-all"
                                        style={{ width: `${result.progress}%` }}
                                    />
                                </div>
                            </div>

                            {/* Shipment ID */}
                            <div className="text-center text-sm text-slate-500 mt-4">
                                Shipment ID: <span className="font-medium">{result.shipmentId}</span>
                            </div>

                        </div>
                    )}

                </div>

                {/* Info Cards */}
                <div className="grid md:grid-cols-3 gap-6 mt-14">

                    <div className="bg-white p-6 rounded-xl border text-center">
                        <h3 className="font-semibold text-primary mb-2">Real-Time Tracking</h3>
                        <p className="text-sm text-slate-500">Live updates from port to delivery destination.</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border text-center">
                        <h3 className="font-semibold text-primary mb-2">Global Coverage</h3>
                        <p className="text-sm text-slate-500">Track shipments across 100+ countries worldwide.</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl border text-center">
                        <h3 className="font-semibold text-primary mb-2">Secure System</h3>
                        <p className="text-sm text-slate-500">Encrypted tracking data with secure verification.</p>
                    </div>

                </div>

            </Container>
        </div>
    )
}

export default TrackCargo
