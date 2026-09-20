'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  Loader2,
  UserCircle,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import Image from 'next/image';
import { compressImage } from '@/lib/clientImageCompress';

interface Leader {
  id: number;
  name: string;
  title: string;
  bio: string | null;
  facebook: string | null;
  tiktok: string | null;
  instagram: string | null;
  imageUrl: string | null;
  order: number;
  isActive: boolean;
}

type FormState = {
  name: string;
  title: string;
  bio: string;
  facebook: string;
  tiktok: string;
  instagram: string;
  order: string;
  isActive: string;
};

const emptyForm: FormState = {
  name: '',
  title: '',
  bio: '',
  facebook: '',
  tiktok: '',
  instagram: '',
  order: '0',
  isActive: 'true',
};

function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.error || error.message || 'Server error';
  }
  if (error instanceof Error) return error.message;
  return 'An unexpected error occurred';
}

export default function LeadershipPage() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Leader | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const fetchLeaders = async () => {
    try {
      const { data } = await axios.get('/api/admin/leaders');
      setLeaders(data);
    } catch (e) {
      console.error(e);
      showToast(getErrorMessage(e), 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaders();
  }, []);

  useEffect(() => {
    return () => {
      if (imagePreview?.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview(null);
    setFormError(null);
    setShowModal(true);
  };

  const openEdit = (leader: Leader) => {
    setEditing(leader);
    setForm({
      name: leader.name,
      title: leader.title,
      bio: leader.bio || '',
      facebook: leader.facebook || '',
      tiktok: leader.tiktok || '',
      instagram: leader.instagram || '',
      order: String(leader.order),
      isActive: String(leader.isActive),
    });
    setImageFile(null);
    setImagePreview(leader.imageUrl);
    setFormError(null);
    setShowModal(true);
  };

  const handleImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFormError('Please select a valid image file (JPG, PNG, WEBP).');
      return;
    }

    setFormError(null);
    setImagePreview(URL.createObjectURL(file));

    // Compress client-side to ensure fast, failure-proof upload
    try {
      const compressed = await compressImage(file, 1200, 0.85);
      setImageFile(compressed);
    } catch {
      setImageFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.title.trim()) {
      setFormError('Full Name and Title/Position are required.');
      return;
    }

    setSaving(true);
    setFormError(null);

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (imageFile) {
        fd.append('image', imageFile);
      }

      if (editing) {
        await axios.put(`/api/admin/leaders/${editing.id}`, fd);
        showToast('Leader updated successfully!', 'success');
      } else {
        await axios.post('/api/admin/leaders', fd);
        showToast('New leader added successfully!', 'success');
      }

      setShowModal(false);
      fetchLeaders();
    } catch (err) {
      console.error(err);
      const msg = getErrorMessage(err);
      setFormError(msg);
      showToast(msg, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this leader?')) return;
    try {
      await axios.delete(`/api/admin/leaders/${id}`);
      showToast('Leader deleted successfully', 'success');
      fetchLeaders();
    } catch (err) {
      console.error(err);
      showToast(getErrorMessage(err), 'error');
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-semibold transition-all transform animate-in fade-in slide-in-from-top-4 ${
            toast.type === 'success'
              ? 'bg-emerald-600 text-white'
              : 'bg-rose-600 text-white'
          }`}
        >
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#E6E8F0] shadow-sm">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Leadership</h2>
          <p className="text-slate-500 text-sm mt-1">
            Manage executive leadership members and national representatives ({leaders.length} total)
          </p>
        </div>
        <button
          onClick={openCreate}
          className="inline-flex items-center justify-center gap-2 bg-[#1E0D79] hover:bg-[#160a5c] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-[#1E0D79]/20 transition-all hover:scale-102"
        >
          <Plus className="w-4 h-4" /> Add Leader
        </button>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-2xl border border-[#E6E8F0]">
          <Loader2 className="w-9 h-9 text-[#1E0D79] animate-spin mb-3" />
          <p className="text-sm font-medium text-slate-500">Loading leadership list...</p>
        </div>
      ) : leaders.length === 0 ? (
        /* Empty state */
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300 p-8">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
            <UserCircle className="w-10 h-10" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">No leadership members yet</h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
            Get started by adding the union leaders, executive chairperson, and council members.
          </p>
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 bg-[#1E0D79] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#160a5c] transition-colors"
          >
            <Plus className="w-4 h-4" /> Add First Leader
          </button>
        </div>
      ) : (
        /* Leaders Grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {leaders.map((leader) => (
            <div
              key={leader.id}
              className="bg-white border border-[#E6E8F0] rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Photo container */}
                <div className="h-52 bg-slate-100 relative overflow-hidden">
                  {leader.imageUrl ? (
                    <Image
                      src={leader.imageUrl}
                      alt={leader.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-300 bg-slate-50">
                      <UserCircle className="w-20 h-20" />
                    </div>
                  )}

                  {/* Status badge */}
                  <div className="absolute top-3 right-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-sm ${
                        leader.isActive
                          ? 'bg-emerald-500/90 text-white'
                          : 'bg-slate-700/80 text-white'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      {leader.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  {/* Order pill */}
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white px-2.5 py-0.5 rounded-md text-[11px] font-semibold">
                    Order #{leader.order}
                  </div>
                </div>

                {/* Information */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">{leader.name}</h3>
                  <p className="text-sm font-semibold text-[#1E0D79] mt-0.5">{leader.title}</p>
                  {leader.bio && (
                    <p className="text-slate-500 text-xs mt-3 line-clamp-3 leading-relaxed">
                      {leader.bio}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center gap-2">
                <button
                  onClick={() => openEdit(leader)}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-[#1E0D79] text-slate-700 hover:text-white px-3 py-2 rounded-xl text-xs font-bold transition-colors"
                >
                  <Pencil className="w-3.5 h-3.5" /> Edit
                </button>
                <button
                  onClick={() => handleDelete(leader.id)}
                  className="inline-flex items-center justify-center p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors"
                  title="Delete Leader"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal dialog */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-[#E6E8F0] rounded-3xl w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {editing ? 'Edit Leader' : 'Add New Leader'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Provide leader details and photo to display across the site
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Form Error Alert */}
              {formError && (
                <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{formError}</span>
                </div>
              )}

              {/* Photo Upload Area */}
              <div>
                <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                  Leader Photograph
                </label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="cursor-pointer border-2 border-dashed border-slate-300 hover:border-[#1E0D79] rounded-2xl h-44 flex flex-col items-center justify-center gap-2 transition-all relative overflow-hidden bg-slate-50/70 hover:bg-slate-50 group"
                >
                  {imagePreview ? (
                    <>
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="object-cover rounded-2xl"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold gap-2">
                        <Upload className="w-4 h-4" /> Change Photo
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-[#1E0D79] group-hover:scale-110 transition-transform">
                        <Upload className="w-5 h-5" />
                      </div>
                      <p className="text-slate-700 text-sm font-bold">Click to upload photo</p>
                      <p className="text-slate-400 text-xs">JPG, PNG or WEBP (auto-compressed)</p>
                    </>
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImage}
                  />
                </div>
              </div>

              {/* Basic Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Hassan Ali Jama"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E0D79]/20 focus:border-[#1E0D79] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1.5">
                    Title / Position <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Chairperson, Secretary General"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E0D79]/20 focus:border-[#1E0D79] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1.5">
                    Display Order
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: e.target.value })}
                    className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E0D79]/20 focus:border-[#1E0D79] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1.5">
                    Status
                  </label>
                  <select
                    value={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.value })}
                    className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E0D79]/20 focus:border-[#1E0D79] transition-all"
                  >
                    <option value="true">Active (Visible)</option>
                    <option value="false">Inactive (Hidden)</option>
                  </select>
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1.5">
                  Biography / Summary
                </label>
                <textarea
                  rows={3}
                  placeholder="A brief overview of their background, role, and achievements..."
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E0D79]/20 focus:border-[#1E0D79] transition-all resize-none"
                />
              </div>

              {/* Social Links */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Social Media Profiles (Optional)
                </p>
                <input
                  type="url"
                  placeholder="Facebook URL (https://...)"
                  value={form.facebook}
                  onChange={(e) => setForm({ ...form, facebook: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#1E0D79]"
                />
                <input
                  type="text"
                  placeholder="TikTok profile or URL (@...)"
                  value={form.tiktok}
                  onChange={(e) => setForm({ ...form, tiktok: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#1E0D79]"
                />
                <input
                  type="text"
                  placeholder="Instagram profile or URL (@...)"
                  value={form.instagram}
                  onChange={(e) => setForm({ ...form, instagram: e.target.value })}
                  className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-[#1E0D79]"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  disabled={saving}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-xl text-sm font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-[#1E0D79] hover:bg-[#160a5c] disabled:opacity-60 text-white px-4 py-3 rounded-xl text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {saving ? 'Uploading & Saving...' : editing ? 'Update Leader' : 'Save Leader'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
