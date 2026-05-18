"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, ImageIcon, ToggleLeft, ToggleRight } from "lucide-react";
import { toast } from "sonner";
import { getAllBanners, createBanner, updateBanner, deleteBanner } from "@/services/banner";
import { uploadImage } from "@/services/uploadImage";

interface TBanner {
    _id: string;
    title: string;
    subtitle: string;
    image: string;
    type: "Offer" | "Sale" | "Announcement";
    isActive: boolean;
    order: number;
    createdAt: string;
}

const BANNER_TYPES = ["Sale", "Offer", "Announcement"];

const emptyForm = {
    title: "",
    subtitle: "",
    image: "",
    type: "Sale",
    isActive: true,
    order: 0,
};

export default function BannerPage() {
    const [banners, setBanners] = useState<TBanner[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingBanner, setEditingBanner] = useState<TBanner | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState("");
    const [submitting, setSubmitting] = useState(false);
    
    
    useEffect(() => {
        const fetchBanners = async () => {
            setLoading(true);
            const result = await getAllBanners();
            if (result.success) setBanners(result.data || []);
            setLoading(false);
        };
        fetchBanners();
    }, []);

    const openCreate = () => {
        setEditingBanner(null);
        setForm(emptyForm);
        setImageFile(null);
        setImagePreview("");
        setShowModal(true);
    };

    const openEdit = (banner: TBanner) => {
        setEditingBanner(banner);
        setForm({
            title: banner.title,
            subtitle: banner.subtitle,
            image: banner.image,
            type: banner.type,
            isActive: banner.isActive,
            order: banner.order,
        });
        setImagePreview(banner.image);
        setImageFile(null);
        setShowModal(true);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.title || !form.subtitle) {
            toast.error("Title and subtitle are required");
            return;
        }
        setSubmitting(true);
        const toastId = toast.loading(editingBanner ? "Updating banner..." : "Creating banner...");

        try {
            let imageUrl = form.image;

            if (imageFile) {
                const uploadResult = await uploadImage(imageFile, []);
                if (!uploadResult.success) {
                    toast.error("Image upload failed", { id: toastId });
                    setSubmitting(false);
                    return;
                }
                imageUrl = uploadResult.data.thumbnail;
            }

            if (!imageUrl) {
                toast.error("Please provide a banner image", { id: toastId });
                setSubmitting(false);
                return;
            }

            const payload = { ...form, image: imageUrl };

            if (editingBanner) {
                const result = await updateBanner(editingBanner._id, payload);
                if (result.success) {
                    toast.success("Banner updated successfully", { id: toastId });
                    setBanners((prev) =>
                        prev.map((b) => (b._id === editingBanner._id ? result.data : b))
                    );
                    setShowModal(false);
                } else {
                    toast.error(result.message || "Update failed", { id: toastId });
                }
            } else {
                const result = await createBanner(payload);
                if (result.success) {
                    toast.success("Banner created successfully", { id: toastId });
                    setBanners((prev) => [result.data, ...prev]);
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

    const handleToggleActive = async (banner: TBanner) => {
        const toastId = toast.loading("Updating status...");
        const result = await updateBanner(banner._id, { isActive: !banner.isActive });
        if (result.success) {
            toast.success("Status updated", { id: toastId });
            setBanners((prev) =>
                prev.map((b) => (b._id === banner._id ? { ...b, isActive: !b.isActive } : b))
            );
        } else {
            toast.error("Failed to update status", { id: toastId });
        }
    };

    const handleDelete = async (id: string) => {
        const toastId = toast.loading("Deleting banner...");
        const result = await deleteBanner(id);
        if (result.success) {
            toast.success("Banner deleted", { id: toastId });
            setBanners((prev) => prev.filter((b) => b._id !== id));
        } else {
            toast.error("Failed to delete banner", { id: toastId });
        }
    };

    const typeColor = (type: string) => {
        if (type === "Sale") return "bg-red-100 text-red-700";
        if (type === "Offer") return "bg-green-100 text-green-700";
        return "bg-blue-100 text-blue-700";
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex md:flex-row flex-col items-start md:items-center justify-between gap-4 lg:pt-0 pt-10">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Banner Management</h1>
                    <p className="text-gray-500 mt-1">Add & manage promotional banners</p>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-all hover:opacity-90"
                    style={{ backgroundColor: "#5D4037" }}
                >
                    <Plus size={20} />
                    Add Banner
                </button>
            </div>

            {/* Banner Cards */}
            {loading ? (
                <div className="text-center py-16 text-gray-400">Loading banners...</div>
            ) : banners.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                    <ImageIcon size={48} className="mx-auto mb-3 opacity-30" />
                    <p>No banners found. Click &quot;Add Banner&quot; to create one.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {banners.map((banner) => (
                        <div
                            key={banner._id}
                            className={`bg-white rounded-xl shadow-sm border overflow-hidden ${!banner.isActive ? "opacity-60" : ""}`}
                        >
                            <div className="relative h-44 bg-gray-100">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={banner.image}
                                    alt={banner.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/30" />
                                <div className="absolute top-3 left-3 flex gap-2">
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${typeColor(banner.type)}`}>
                                        {banner.type}
                                    </span>
                                    {!banner.isActive && (
                                        <span className="text-xs px-2 py-1 rounded-full font-medium bg-gray-200 text-gray-600">
                                            Inactive
                                        </span>
                                    )}
                                </div>
                                <div className="absolute bottom-3 left-3 text-white">
                                    <p className="font-bold text-lg leading-tight">{banner.title}</p>
                                    <p className="text-sm text-white/80">{banner.subtitle}</p>
                                </div>
                            </div>
                            <div className="p-4 flex items-center justify-between">
                                <div className="text-sm text-gray-500">
                                    Order: <span className="font-medium text-gray-700">{banner.order}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleToggleActive(banner)}
                                        title={banner.isActive ? "Deactivate" : "Activate"}
                                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                    >
                                        {banner.isActive ? (
                                            <ToggleRight size={22} className="text-green-600" />
                                        ) : (
                                            <ToggleLeft size={22} className="text-gray-400" />
                                        )}
                                    </button>
                                    <button
                                        onClick={() => openEdit(banner)}
                                        className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                                    >
                                        <Pencil size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(banner._id)}
                                        className="p-2 rounded-lg hover:bg-red-50 text-red-500 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b">
                            <h2 className="text-xl font-bold text-gray-900">
                                {editingBanner ? "Edit Banner" : "Add New Banner"}
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                                <input
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-slate-50"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    placeholder="e.g. Mega Export Sale"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle *</label>
                                <input
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-slate-50"
                                    value={form.subtitle}
                                    onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                                    placeholder="e.g. Up to 30% off on bulk orders"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
                                <select
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-slate-50"
                                    value={form.type}
                                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                                >
                                    {BANNER_TYPES.map((t) => (
                                        <option key={t} value={t}>{t}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Banner Image *
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-slate-50"
                                />
                                {imagePreview && (
                                    <div className="mt-2 rounded-lg overflow-hidden h-32 bg-gray-100">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                {!imageFile && editingBanner && (
                                    <p className="text-xs text-gray-400 mt-1">Leave empty to keep current image</p>
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
                                    id="isActive"
                                    checked={form.isActive}
                                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                                    className="w-4 h-4 accent-primary"
                                />
                                <label htmlFor="isActive" className="text-sm text-gray-700">Active (visible on website)</label>
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
                                    {submitting ? "Saving..." : editingBanner ? "Update Banner" : "Create Banner"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
