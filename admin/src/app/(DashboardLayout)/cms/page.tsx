"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, FileText, ToggleLeft, ToggleRight, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { getAllContents, createContent, updateContent, deleteContent } from "@/services/content";
import { uploadImage } from "@/services/uploadImage";

interface TContent {
    _id: string;
    key: string;
    title: string;
    subtitle: string;
    body: string;
    image: string;
    isActive: boolean;
    metaTitle: string;
    metaDescription: string;
    createdAt: string;
}

const PRESET_KEYS = [
    { value: "about_us", label: "About Us" },
    { value: "mission", label: "Mission" },
    { value: "vision", label: "Vision" },
    { value: "why_choose_us", label: "Why Choose Us" },
    { value: "our_story", label: "Our Story" },
    { value: "custom", label: "Custom Key" },
];

const emptyForm = {
    key: "about_us",
    customKey: "",
    title: "",
    subtitle: "",
    body: "",
    image: "",
    isActive: true,
    metaTitle: "",
    metaDescription: "",
};

export default function CMSPage() {
    const [contents, setContents] = useState<TContent[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingContent, setEditingContent] = useState<TContent | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const fetchContents = async () => {
        setLoading(true);
        const result = await getAllContents();
        if (result.success) setContents(result.data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchContents();
    }, []);

    const openCreate = () => {
        setEditingContent(null);
        setForm(emptyForm);
        setImageFile(null);
        setImagePreview("");
        setShowModal(true);
    };

    const openEdit = (content: TContent) => {
        setEditingContent(content);
        const isPreset = PRESET_KEYS.some((k) => k.value === content.key && k.value !== "custom");
        setForm({
            key: isPreset ? content.key : "custom",
            customKey: isPreset ? "" : content.key,
            title: content.title,
            subtitle: content.subtitle || "",
            body: content.body,
            image: content.image || "",
            isActive: content.isActive,
            metaTitle: content.metaTitle || "",
            metaDescription: content.metaDescription || "",
        });
        setImagePreview(content.image || "");
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
        const finalKey = form.key === "custom" ? form.customKey.trim() : form.key;
        if (!finalKey || !form.title || !form.body) {
            toast.error("Key, title and body are required");
            return;
        }
        setSubmitting(true);
        const toastId = toast.loading(editingContent ? "Updating content..." : "Creating content...");

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

            const payload = {
                key: finalKey,
                title: form.title,
                subtitle: form.subtitle,
                body: form.body,
                image: imageUrl,
                isActive: form.isActive,
                metaTitle: form.metaTitle,
                metaDescription: form.metaDescription,
            };

            if (editingContent) {
                // Don't allow key change on edit
                const { key: _key, ...updatePayload } = payload;
                const result = await updateContent(editingContent._id, updatePayload);
                if (result.success) {
                    toast.success("Content updated successfully", { id: toastId });
                    setContents((prev) =>
                        prev.map((c) => (c._id === editingContent._id ? result.data : c))
                    );
                    setShowModal(false);
                } else {
                    toast.error(result.message || "Update failed", { id: toastId });
                }
            } else {
                const result = await createContent(payload);
                if (result.success) {
                    toast.success("Content created successfully", { id: toastId });
                    setContents((prev) => [result.data, ...prev]);
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

    const handleToggleActive = async (content: TContent) => {
        const toastId = toast.loading("Updating status...");
        const result = await updateContent(content._id, { isActive: !content.isActive });
        if (result.success) {
            toast.success("Status updated", { id: toastId });
            setContents((prev) =>
                prev.map((c) => (c._id === content._id ? { ...c, isActive: !c.isActive } : c))
            );
        } else {
            toast.error("Failed to update", { id: toastId });
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this content page?")) return;
        const toastId = toast.loading("Deleting...");
        const result = await deleteContent(id);
        if (result.success) {
            toast.success("Content deleted", { id: toastId });
            setContents((prev) => prev.filter((c) => c._id !== id));
        } else {
            toast.error("Failed to delete", { id: toastId });
        }
    };

    const keyLabel = (key: string) => {
        const found = PRESET_KEYS.find((k) => k.value === key);
        return found ? found.label : key;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex md:flex-row flex-col items-start md:items-center justify-between gap-4 lg:pt-0 pt-10">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
                    <p className="text-gray-500 mt-1">Manage About Us, Mission, Vision & other content pages</p>
                </div>
                <button
                    onClick={openCreate}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-all hover:opacity-90"
                    style={{ backgroundColor: "#5D4037" }}
                >
                    <Plus size={20} />
                    Add Content
                </button>
            </div>

            {/* Content list */}
            {loading ? (
                <div className="text-center py-16 text-gray-400">Loading contents...</div>
            ) : contents.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                    <FileText size={48} className="mx-auto mb-3 opacity-30" />
                    <p>No content found. Click &quot;Add Content&quot; to create one.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {contents.map((content) => (
                        <div
                            key={content._id}
                            className={`bg-white rounded-xl border overflow-hidden ${!content.isActive ? "opacity-60" : ""}`}
                        >
                            {/* Collapsed header */}
                            <div
                                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                                onClick={() => setExpandedId(expandedId === content._id ? null : content._id)}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <FileText size={16} className="text-primary" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">{content.title}</p>
                                        <p className="text-xs text-gray-400">Key: <code className="bg-gray-100 px-1 rounded">{content.key}</code></p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium hidden sm:inline-flex ${content.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                                        {content.isActive ? "Active" : "Inactive"}
                                    </span>
                                    {expandedId === content._id ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
                                </div>
                            </div>

                            {/* Expanded */}
                            {expandedId === content._id && (
                                <div className="border-t px-4 pb-4 pt-3 space-y-3">
                                    {content.subtitle && (
                                        <p className="text-sm text-gray-500 italic">{content.subtitle}</p>
                                    )}
                                    <div className="text-sm text-gray-700 whitespace-pre-wrap max-h-40 overflow-y-auto bg-gray-50 rounded-lg p-3">
                                        {content.body}
                                    </div>
                                    {content.image && (
                                        <div className="w-32 h-20 rounded-lg overflow-hidden border">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={content.image} alt={content.title} className="w-full h-full object-cover" />
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 pt-1">
                                        <button
                                            onClick={() => handleToggleActive(content)}
                                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                            title={content.isActive ? "Deactivate" : "Activate"}
                                        >
                                            {content.isActive ? (
                                                <ToggleRight size={20} className="text-green-600" />
                                            ) : (
                                                <ToggleLeft size={20} className="text-gray-400" />
                                            )}
                                        </button>
                                        <button
                                            onClick={() => openEdit(content)}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border hover:bg-blue-50 text-blue-600 text-sm transition-colors"
                                        >
                                            <Pencil size={14} /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(content._id)}
                                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border hover:bg-red-50 text-red-500 text-sm transition-colors"
                                        >
                                            <Trash2 size={14} /> Delete
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="p-6 border-b">
                            <h2 className="text-xl font-bold text-gray-900">
                                {editingContent ? "Edit Content" : "Add New Content"}
                            </h2>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {/* Key */}
                            {!editingContent && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Page Key *</label>
                                    <select
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-slate-50"
                                        value={form.key}
                                        onChange={(e) => setForm({ ...form, key: e.target.value })}
                                    >
                                        {PRESET_KEYS.map((k) => (
                                            <option key={k.value} value={k.value}>{k.label}</option>
                                        ))}
                                    </select>
                                    {form.key === "custom" && (
                                        <input
                                            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-2 focus:outline-none focus:ring-2 focus:ring-primary/30 bg-slate-50"
                                            placeholder="e.g. services or terms_of_service"
                                            value={form.customKey}
                                            onChange={(e) => setForm({ ...form, customKey: e.target.value.toLowerCase().replace(/\s+/g, "_") })}
                                        />
                                    )}
                                    <p className="text-xs text-gray-400 mt-1">Unique identifier used to fetch content via API</p>
                                </div>
                            )}
                            {editingContent && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Page Key</label>
                                    <input
                                        className="w-full border border-gray-100 rounded-lg px-3 py-2 text-sm bg-gray-100 cursor-not-allowed text-gray-500"
                                        value={editingContent.key}
                                        disabled
                                    />
                                    <p className="text-xs text-gray-400 mt-1">Key cannot be changed after creation</p>
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                                <input
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-slate-50"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    placeholder="Page title"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                                <input
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-slate-50"
                                    value={form.subtitle}
                                    onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
                                    placeholder="Optional subtitle"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Body / Content *</label>
                                <textarea
                                    rows={6}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-slate-50 resize-y"
                                    value={form.body}
                                    onChange={(e) => setForm({ ...form, body: e.target.value })}
                                    placeholder="Main content body..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Featured Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-slate-50"
                                />
                                {imagePreview && (
                                    <div className="mt-2 h-28 rounded-lg overflow-hidden">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={imagePreview} alt="preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                                    <input
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-slate-50"
                                        value={form.metaTitle}
                                        onChange={(e) => setForm({ ...form, metaTitle: e.target.value })}
                                        placeholder="SEO title"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                                    <input
                                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-slate-50"
                                        value={form.metaDescription}
                                        onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                                        placeholder="SEO description"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isActiveContent"
                                    checked={form.isActive}
                                    onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                                    className="w-4 h-4 accent-primary"
                                />
                                <label htmlFor="isActiveContent" className="text-sm text-gray-700">Active (visible on website)</label>
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
                                    {submitting ? "Saving..." : editingContent ? "Update Content" : "Create Content"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
