"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, ImageIcon, ToggleRight, ToggleLeft, Pencil, } from "lucide-react";
import { toast } from "sonner";
import { uploadImage } from "@/services/uploadImage";
import { createHeroImage, deleteHeroImage, getHeroImage, updateHeroImage } from "@/services/heroImage";

interface THero {
  _id: string;
  title: string;
  subtitle: string;
  content: string;
  image: string;
  isActive: boolean;
}

const emptyForm = {
  title: "",
  subtitle: "",
  content: "",
  image: "",
  isActive: true,
};

export default function HeroImagePage() {
  const [heroImage, setHeroImage] = useState<THero[]>([]);
  const [editingHero, setEditingHero] = useState<THero | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [submitting, setSubmitting] = useState(false);


  useEffect(() => {
    const fetchHero = async () => {
      setLoading(true);
      const result = await getHeroImage();
      if (result.success) setHeroImage(result.data || []);
      setLoading(false);
    };
    fetchHero();
  }, []);

  const openCreate = () => {
    setEditingHero(null)
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview("");
    setShowModal(true);
  };


  const openEdit = (hero: THero) => {
    setEditingHero(hero);
    setForm({
      title: hero.title,
      subtitle: hero.subtitle,
      content: hero.content,
      image: hero.image,
      isActive: hero.isActive,
    });
    setImagePreview(hero.image);
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
    setSubmitting(true);
    // const toastId = toast.loading("Uploading image...");
    const toastId = toast.loading(editingHero ? "Updating hero..." : "Creating hero...");


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

      
      if(editingHero){
        const result = await updateHeroImage(editingHero._id, payload);

        if(result.success){
          toast.success("Hero image updated successfully", {id: toastId});
          setHeroImage((prev)=> prev.map((h)=> h._id === editingHero._id ? result.data : h));
          setShowModal(false);
        }else{
          toast.error(result.message || "Update failed", {id: toastId});
        }
      }else {
        const result = await createHeroImage(payload);
        if (result.success) {
          toast.success("Image uploaded successfully", { id: toastId });
          setHeroImage((prev) => [result.data, ...prev]);
          setShowModal(false);
        } else {
          toast.error(result.message || "Upload failed", { id: toastId });
        }
      }
    } catch {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setSubmitting(false);
    }
  };


  const handleToggleActive = async (banner: THero) => {
          const toastId = toast.loading("Updating status...");
          const result = await updateHeroImage(banner._id, { isActive: !banner.isActive });
          if (result.success) {
              toast.success("Status updated", { id: toastId });
              setHeroImage((prev) =>
                  prev.map((b) => (b._id === banner._id ? { ...b, isActive: !b.isActive } : {...b, isActive: false}))
              );
          } else {
              toast.error("Failed to update status", { id: toastId });
          }
      };


  const handleDelete = async (id: string) => {
    const toastId = toast.loading("Deleting image...");
    const result = await deleteHeroImage(id);
    if (result.success) {
      toast.success("Image deleted", { id: toastId });
      setHeroImage((prev) => prev.filter((b) => b._id !== id));
    } else {
      toast.error("Failed to delete image", { id: toastId });
    }
  };


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex md:flex-row flex-col items-start md:items-center justify-between gap-4 lg:pt-0 pt-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hero image Management</h1>
          <p className="text-gray-500 mt-1">Add & manage your hero image</p>
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

      {/* Hero Cards */}
      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading heroImage...</div>
      ) : heroImage.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <ImageIcon size={48} className="mx-auto mb-3 opacity-30" />
          <p>No heroImage found. Click &quot;Add Hero image&quot; to create one.</p>
        </div>
      ) : (
        <div className="">
          {heroImage.map((banner) => (
            <div
              key={banner._id}
              className={`bg-white rounded-xl shadow-sm border  mb-10 overflow-hidden ${!banner.isActive ? "opacity-60" : ""}`}
            >
              <div className="relative bg-gray-100">
                <div className="absolute inset-0 bg-linear-to-r from-black/90 to-transparent"></div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={banner.image}
                  alt="Hero image"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute top-3 left-3 flex gap-2">
                  {!banner.isActive && (
                    <span className="text-xs px-2 py-1 rounded-full font-medium bg-gray-200 text-gray-600">
                      Inactive
                    </span>
                  )}
                </div>
                <div className="absolute top-[40%] left-20 text-white">
                  <p className="text-secondary font-bold">{banner.subtitle}</p>
                  <p className="text-[#fcf9f4] font-headline text-4xl md:text-5xl lg:text-6xl leading-tight mt-4 mb-6 font-bold">{banner.title}</p>
                  <p className="text-secondary font-bold text-xl leading-[1.6] mb-12 max-w-lg">{banner.content}</p>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
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
                Add hero image
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 bg-slate-50"
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="Optional subtitle"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hero Image *
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
                {!imageFile && (
                  <p className="text-xs text-gray-400 mt-1">Leave empty to keep current image</p>
                )}
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
                  {submitting ? "Creating..." : editingHero ? "Update Hero" : "Create Hero"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
