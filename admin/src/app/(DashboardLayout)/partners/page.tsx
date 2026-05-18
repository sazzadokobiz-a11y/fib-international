"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, Globe, ToggleLeft, ToggleRight, Users } from "lucide-react";
import { toast } from "sonner";
import { getAllPartners, createPartner, updatePartner, deletePartner } from "@/services/partner";
import { uploadImage } from "@/services/uploadImage";

interface TPartner {
    _id: string;
    name: string;
    logo: string;
    website: string;
    country: string;
    isActive: boolean;
    order: number;
    createdAt: string;
}

const emptyForm = {
    name: "",
    logo: "",
    website: "",
    country: "",
    isActive: true,
    order: 0,
};

export default function PartnersPage() {
    const [partners, setPartners] = useState<TPartner[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingPartner, setEditingPartner] = useState<TPartner | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState("");
    const [submitting, setSubmitting] = useState(false);

    
    useEffect(() => {
        const fetchPartners = async () => {
            setLoading(true);
            const result = await getAllPartners();
            if (result.success) setPartners(result.data || []);
            setLoading(false);
        };
        fetchPartners();
    }, []);

    const openCreate = () => {
        setEditingPartner(null);
        setForm(emptyForm);
        setLogoFile(null);
        setLogoPreview("");
        setShowModal(true);
    };

    const openEdit = (partner: TPartner) => {
        setEditingPartner(partner);
        setForm({
            name: partner.name,
            logo: partner.logo,
            website: partner.website || "",
            country: partner.country || "",
            isActive: partner.isActive,
            order: partner.order,
        });
        setLogoPreview(partner.logo);
        setLogoFile(null);
        setShowModal(true);
    };

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setLogoFile(file);
        setLogoPreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name) {
            toast.error("Partner name is required");
            return;
        }
        setSubmitting(true);
        const toastId = toast.loading(editingPartner ? "Updating partner..." : "Creating partner...");

        try {
            let logoUrl = form.logo;

            if (logoFile) {
                const uploadResult = await uploadImage(logoFile, []);
                if (!uploadResult.success) {
                    toast.error("Logo upload failed", { id: toastId });
                    setSubmitting(false);
                    return;
                }
                logoUrl = uploadResult.data.thumbnail;
            }

            if (!logoUrl) {
                toast.error("Please provide a partner logo", { id: toastId });
                setSubmitting(false);
                return;
            }

            const payload = { ...form, logo: logoUrl };

            if (editingPartner) {
                const result = await updatePartner(editingPartner._id, payload);
                if (result.success) {
                    toast.success("Partner updated successfully", { id: toastId });
                    setPartners((prev) =>
                        prev.map((p) => (p._id === editingPartner._id ? result.data : p))
                    );
                    setShowModal(false);
                } else {
                    toast.error(result.message || "Update failed", { id: toastId });
                }
            } else {
                const result = await createPartner(payload);
                if (result.success) {
                    toast.success("Partner created successfully", { id: toastId });
                    setPartners((prev) => [result.data, ...prev]);
                    setShowModal(false);
                } else {
                    toast.error(result.message || "Create failed", { id: toastId });
                }
            }
        } catch {
            toast.error("Something went wrong", { id: toastId });
        } finally {
            setSubmitting(false);
        }
    };

    const handleToggleActive = async (partner: TPartner) => {
        const toastId = toast.loading("Updating status...");
        const result = await updatePartner(partner._id, { isActive: !partner.isActive });
        if (result.success) {
            toast.success("Status updated", { id: toastId });
            setPartners((prev) =>
                prev.map((p) => (p._id === partner._id ? { ...p, isActive: !p.isActive } : p))
            );
        } else {
            toast.error("Failed to update", { id: toastId });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this partner?")) return;
        const toastId = toast.loading("Deleting...");
        const result = await deletePartner(id);
        if (result.success) {
            toast.success("Partner deleted", { id: toastId });
            setPartners((prev) => prev.filter((p) => p._id !== id));
        } else {
            toast.error("Failed to delete", { id: toastId });
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex md:flex-row flex-col items-start md:items-center justify-between gap-4 lg:pt-0 pt-10">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Partner Management</h1>
                    <p className="text-gray-500 mt-1">Add & display international partners/clients</p>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-all hover:opacity-90"
                    style={{ backgroundColor: "#5D4037" }}
                >
                    <Plus size={20} />
                    Add Partner
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl border p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users size={18} className="text-primary" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-900">{partners.length}</p>
                        <p className="text-xs text-gray-500">Total Partners</p>
                    </div>
                </div>
                <div className="bg-white rounded-xl border p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                        <ToggleRight size={18} className="text-green-600" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-900">{partners.filter((p) => p.isActive).length}</p>
                        <p className="text-xs text-gray-500">Active</p>
                    </div>
                </div>
                <div className="bg-white rounded-xl border p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                        <ToggleLeft size={18} className="text-gray-500" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-gray-900">{partners.filter((p) => !p.isActive).length}</p>
                        <p className="text-xs text-gray-500">Inactive</p>
                    </div>
                </div>
            </div>

            {/* Partner Grid */}
            {loading ? (
                <div className="text-center py-16 text-gray-400">Loading partners...</div>
            ) : partners.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                    <Globe size={48} className="mx-auto mb-3 opacity-30" />
                    <p>No partners found. Click &quot;Add Partner&quot; to create one.</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl border overflow-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="text-left px-4 py-3 text-gray-600 font-medium">Logo</th>
                                <th className="text-left px-4 py-3 text-gray-600 font-medium">Name</th>
                                <th className="text-left px-4 py-3 text-gray-600 font-medium hidden md:table-cell">Country</th>
                                <th className="text-left px-4 py-3 text-gray-600 font-medium hidden lg:table-cell">Website</th>
                                <th className="text-left px-4 py-3 text-gray-600 font-medium">Status</th>
                                <th className="text-right px-4 py-3 text-gray-600 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {partners.map((partner) => (
                                <tr key={partner._id} className={`hover:bg-gray-50 transition-colors ${!partner.isActive ? "opacity-60" : ""}`}>
                                    <td className="px-4 py-3">
                                        <div className="w-12 h-10 rounded-lg border bg-white flex items-center justify-center overflow-hidden">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={partner.logo} alt={partner.name} className="w-full h-full object-contain p-1" />
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 font-medium text-gray-900">{partner.name}</td>
                                    <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{partner.country || "-"}</td>
                                    <td className="px-4 py-3 hidden lg:table-cell">
                                        {partner.website ? (
                                            <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline truncate block max-w-50">
                                                {partner.website}
                                            </a>
                                        ) : (
                                            <span className="text-gray-300">-</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${partner.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                                            {partner.isActive ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex items-center justify-end gap-1">
                                            <button
                                                onClick={() => handleToggleActive(partner)}
                                                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                                                title={partner.isActive ? "Deactivate" : "Activate"}
                                            >
                                                {partner.isActive ? (
                                                    <ToggleRight size={18} className="text-green-600" />
                                                ) : (
                                                    <ToggleLeft size={18} className="text-gray-400" />
                                                )}
                                            </button>
                                            <button
                                                onClick={() => openEdit(partner)}
                                                className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                                            >
                                                <Pencil size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(partner._id)}
                                                className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b">
                            <h2 className="text-xl font-bold text-gray-900">
                                {editingPartner ? "Edit Partner" : "Add New Partner"}
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Partner Name *</label>
                                <input
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-slate-50"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder="e.g. Unilever"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                                <input
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-slate-50"
                                    value={form.country}
                                    onChange={(e) => setForm({ ...form, country: e.target.value })}
                                    placeholder="e.g. United Kingdom"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                                <input
                                    type="url"
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-slate-50"
                                    value={form.website}
                                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                                    placeholder="https://example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Partner Logo *</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-slate-50"
                                />
                                {logoPreview && (
                                    <div className="mt-2 w-32 h-16 rounded-lg border bg-white flex items-center justify-center overflow-hidden p-2">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={logoPreview} alt="preview" className="max-w-full max-h-full object-contain" />
                                    </div>
                                )}
                                {!logoFile && editingPartner && (
                                    <p className="text-xs text-gray-400 mt-1">Leave empty to keep current logo</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                                <input
                                    type="number"
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-slate-50"
                                    value={form.order}
                                    onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                                    min={0}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isActivePartner"
                                    checked={form.isActive}
                                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                                    className="w-4 h-4 accent-primary"
                                />
                                <label htmlFor="isActivePartner" className="text-sm text-gray-700">Active (visible on website)</label>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 border border-gray-200 rounded-lg py-2 text-sm font-medium hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 text-white rounded-lg py-2 text-sm font-semibold hover:opacity-90 disabled:opacity-60"
                                    style={{ backgroundColor: "#5D4037" }}
                                >
                                    {submitting ? "Saving..." : editingPartner ? "Update Partner" : "Add Partner"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
