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
  ShieldCheck,
  Briefcase,
  Landmark,
  Search,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import { compressImage } from '@/lib/clientImageCompress';

export const LEADERSHIP_CATEGORIES = [
  {
    id: 'Trustee Board',
    name: 'Trustee Board',
    somaliName: 'Guddiga Ammaanada',
    desc: 'Board of Trustees & Oversight',
    icon: ShieldCheck,
    badgeBg: 'bg-purple-50 border-purple-200 text-purple-700',
    headerBg: 'bg-purple-50/70 border-purple-200',
    accentColor: '#6B21A8',
  },
  {
    id: 'Executive Committee',
    name: 'Executive Committee',
    somaliName: 'Guddiga Fulinta',
    desc: 'Executive & Operational Leadership',
    icon: Briefcase,
    badgeBg: 'bg-blue-50 border-blue-200 text-blue-700',
    headerBg: 'bg-blue-50/70 border-blue-200',
    accentColor: '#1E0D79',
  },
  {
    id: 'State Representative',
    name: 'State Representative',
    somaliName: 'Wakiillada Dowlad-Goboleedyada',
    desc: 'Regional State Representatives',
    icon: Landmark,
    badgeBg: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    headerBg: 'bg-emerald-50/70 border-emerald-200',
    accentColor: '#059669',
  },
] as const;

export type CategoryType = (typeof LEADERSHIP_CATEGORIES)[number]['id'];

interface Leader {
  id: number;
  name: string;
  title: string;
  category: string;
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
  category: CategoryType;
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
  category: 'Executive Committee',
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

export default function LeadershipAdminPage() {
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
  const [activeTab, setActiveTab] = useState<'all' | CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
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

  const openCreate = (defaultCategory: CategoryType = 'Executive Committee') => {
    setEditing(null);
    setForm({ ...emptyForm, category: defaultCategory });
    setImageFile(null);
    setImagePreview(null);
    setFormError(null);
    setShowModal(true);
  };

  const openEdit = (leader: Leader) => {
    setEditing(leader);
    const cat = LEADERSHIP_CATEGORIES.some((c) => c.id === leader.category)
      ? (leader.category as CategoryType)
      : 'Executive Committee';

    setForm({
      name: leader.name,
      title: leader.title,
      category: cat,
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

  // Helper counts
  const trusteeCount = leaders.filter((l) => l.category === 'Trustee Board').length;
  const execCount = leaders.filter((l) => l.category === 'Executive Committee').length;
  const stateRepCount = leaders.filter((l) => l.category === 'State Representative').length;

  const filteredLeaders = leaders.filter((l) => {
    const matchesTab = activeTab === 'all' ? true : l.category === activeTab;
    const matchesSearch =
      searchQuery.trim() === '' ||
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getCategoryMeta = (catId: string) => {
    return (
      LEADERSHIP_CATEGORIES.find((c) => c.id === catId) || {
        id: catId,
        name: catId,
        somaliName: '',
        desc: '',
        icon: Users,
        badgeBg: 'bg-slate-100 border-slate-200 text-slate-700',
        headerBg: 'bg-slate-50 border-slate-200',
        accentColor: '#1E0D79',
      }
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-6 right-6 z-[100] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-semibold transition-all transform animate-in fade-in slide-in-from-top-4 ${
            toast.type === 'success' ? 'bg-emerald-600 text-white' : 'bg-rose-600 text-white'
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
      <div className="bg-white p-6 rounded-3xl border border-[#E6E8F0] shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-[#1E0D79]/10 text-[#1E0D79]">
                <Users className="w-6 h-6" />
              </span>
              <div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                  Leadership Management
                </h2>
                <p className="text-slate-500 text-xs sm:text-sm mt-0.5">
                  Maamul 3-da qaybood ee hoggaanka ururka: Trustee Board, Executive Committee, iyo State Representative ({leaders.length} total)
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => openCreate(activeTab !== 'all' ? activeTab : 'Executive Committee')}
            className="inline-flex items-center justify-center gap-2 bg-[#1E0D79] hover:bg-[#160a5c] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-[#1E0D79]/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Leader
          </button>
        </div>

        {/* 3 Categories Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 pt-6 border-t border-slate-100">
          {LEADERSHIP_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            const count =
              cat.id === 'Trustee Board'
                ? trusteeCount
                : cat.id === 'Executive Committee'
                ? execCount
                : stateRepCount;
            const isCurrent = activeTab === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => setActiveTab(isCurrent ? 'all' : cat.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isCurrent
                    ? 'border-[#1E0D79] ring-2 ring-[#1E0D79]/10 bg-[#1E0D79]/5 shadow-sm'
                    : 'border-slate-200/80 hover:border-slate-300 bg-slate-50/60 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${cat.badgeBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-slate-400">0{idx + 1}.</span>
                      <h4 className="text-sm font-extrabold text-slate-900 leading-none">{cat.name}</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-1">{cat.somaliName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xl font-black text-slate-900">{count}</span>
                  <span className="block text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    members
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filter Navigation & Search */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-6 pt-5 border-t border-slate-100">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#1E0D79] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All Sections ({leaders.length})
            </button>
            {LEADERSHIP_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeTab === cat.id
                    ? 'bg-[#1E0D79] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    activeTab === cat.id ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat.id === 'Trustee Board'
                    ? trusteeCount
                    : cat.id === 'Executive Committee'
                    ? execCount
                    : stateRepCount}
                </span>
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 pl-9 pr-3 py-1.5 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1E0D79]/20 focus:border-[#1E0D79] transition-all"
            />
          </div>
        </div>
      </div>

      {/* Loading state */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border border-[#E6E8F0]">
          <Loader2 className="w-9 h-9 text-[#1E0D79] animate-spin mb-3" />
          <p className="text-sm font-medium text-slate-500">Loading leadership records...</p>
        </div>
      ) : leaders.length === 0 ? (
        /* Empty state */
        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-300 p-8">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4 text-slate-400">
            <UserCircle className="w-10 h-10" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-1">No leadership members yet</h3>
          <p className="text-slate-500 text-sm max-w-md mx-auto mb-6">
            Get started by adding members to Trustee Board, Executive Committee, or State Representative.
          </p>
          <button
            onClick={() => openCreate('Executive Committee')}
            className="inline-flex items-center gap-2 bg-[#1E0D79] text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#160a5c] transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add First Leader
          </button>
        </div>
      ) : activeTab === 'all' && searchQuery.trim() === '' ? (
        /* 3 Cleanly Divided Sections when viewing "All" */
        <div className="space-y-10">
          {LEADERSHIP_CATEGORIES.map((cat, idx) => {
            const Icon = cat.icon;
            const categoryMembers = leaders.filter((l) => l.category === cat.id);

            return (
              <div
                key={cat.id}
                className="bg-white rounded-3xl border border-[#E6E8F0] overflow-hidden shadow-sm"
              >
                {/* Section Header */}
                <div className={`p-5 sm:p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${cat.headerBg}`}>
                  <div className="flex items-center gap-3.5">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border shadow-xs ${cat.badgeBg}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black uppercase tracking-wider text-slate-400">
                          Part 0{idx + 1}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-xs font-bold text-slate-600">{cat.somaliName}</span>
                      </div>
                      <h3 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2 mt-0.5">
                        {cat.name}
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700 shadow-xs">
                          {categoryMembers.length} {categoryMembers.length === 1 ? 'member' : 'members'}
                        </span>
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => openCreate(cat.id)}
                    className="inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-800 hover:bg-[#1E0D79] hover:text-white hover:border-[#1E0D79] transition-all shadow-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add to {cat.name}
                  </button>
                </div>

                {/* Section Members Grid */}
                <div className="p-6">
                  {categoryMembers.length === 0 ? (
                    <div className="py-12 text-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/50">
                      <p className="text-slate-500 text-sm font-medium">
                        No members currently in <strong className="text-slate-700">{cat.name}</strong>.
                      </p>
                      <button
                        onClick={() => openCreate(cat.id)}
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#1E0D79] hover:underline cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" /> Click here to add members to this section
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {categoryMembers.map((leader) => (
                        <LeaderCard
                          key={leader.id}
                          leader={leader}
                          catMeta={cat}
                          onEdit={openEdit}
                          onDelete={handleDelete}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Filtered List (by Tab or Search) */
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Showing {filteredLeaders.length} {filteredLeaders.length === 1 ? 'member' : 'members'}
              {activeTab !== 'all' && ` in ${activeTab}`}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </div>

          {filteredLeaders.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 p-6">
              <UserCircle className="w-12 h-12 text-slate-300 mx-auto mb-2" />
              <p className="text-slate-600 text-sm font-medium">No leadership members match your filter.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveTab('all');
                }}
                className="mt-3 text-xs font-bold text-[#1E0D79] hover:underline"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredLeaders.map((leader) => (
                <LeaderCard
                  key={leader.id}
                  leader={leader}
                  catMeta={getCategoryMeta(leader.category)}
                  onEdit={openEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Add / Edit Modal Dialog */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white border border-[#E6E8F0] rounded-3xl w-full max-w-xl max-h-[92vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-100 sticky top-0 bg-white z-10">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {editing ? 'Edit Leader' : 'Add New Leader'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Dooro qaybta (category) iyo xogta xubinta hoggaanka
                </p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
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

              {/* 3 Categories Selector - Prominent and Clear */}
              <div>
                <label className="block text-slate-800 text-xs font-extrabold uppercase tracking-wider mb-2.5">
                  1. Leadership Category / Qaybta Hoggaanka <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {LEADERSHIP_CATEGORIES.map((cat, idx) => {
                    const Icon = cat.icon;
                    const isSelected = form.category === cat.id;

                    return (
                      <div
                        key={cat.id}
                        onClick={() => setForm({ ...form, category: cat.id })}
                        className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'border-[#1E0D79] bg-[#1E0D79]/5 shadow-sm'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center border text-xs ${
                              isSelected ? 'bg-[#1E0D79] text-white border-[#1E0D79]' : cat.badgeBg
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                          </span>
                          <span className="text-[10px] font-bold text-slate-400">0{idx + 1}</span>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900 leading-tight">{cat.name}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{cat.somaliName}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Photo Upload Area */}
              <div>
                <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-2">
                  2. Leader Photograph / Sawirka Xubinta
                </label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="cursor-pointer border-2 border-dashed border-slate-300 hover:border-[#1E0D79] rounded-2xl h-40 flex flex-col items-center justify-center gap-2 transition-all relative overflow-hidden bg-slate-50/70 hover:bg-slate-50 group"
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
                      <div className="w-11 h-11 rounded-full bg-white shadow-sm flex items-center justify-center text-[#1E0D79] group-hover:scale-110 transition-transform">
                        <Upload className="w-5 h-5" />
                      </div>
                      <p className="text-slate-700 text-xs font-bold">Click to upload photo</p>
                      <p className="text-slate-400 text-[11px]">JPG, PNG or WEBP (auto-compressed)</p>
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
                    placeholder="e.g. Prof. Mohamed Ali"
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
                    placeholder="e.g. Chairman, Board Member, Representative"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full bg-white border border-slate-200 text-slate-900 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E0D79]/20 focus:border-[#1E0D79] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1.5">
                    Display Order / Kala Horraynta
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
                    Status / Xaaladda
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
                  Biography / Summary (Taariikh Kooban)
                </label>
                <textarea
                  rows={3}
                  placeholder="A brief overview of their background, contribution, and role..."
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
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-3 rounded-xl text-sm font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-[#1E0D79] hover:bg-[#160a5c] disabled:opacity-60 text-white px-4 py-3 rounded-xl text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {saving ? 'Saving...' : editing ? 'Update Leader' : 'Save Leader'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// Subcomponent for individual leader card
function LeaderCard({
  leader,
  catMeta,
  onEdit,
  onDelete,
}: {
  leader: Leader;
  catMeta: {
    name: string;
    badgeBg: string;
    icon: React.ComponentType<{ className?: string }>;
  };
  onEdit: (leader: Leader) => void;
  onDelete: (id: number) => void;
}) {
  const Icon = catMeta.icon;

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between group">
      <div>
        {/* Photo Container */}
        <div className="h-48 bg-slate-100 relative overflow-hidden">
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
              <UserCircle className="w-16 h-16" />
            </div>
          )}

          {/* Status badge */}
          <div className="absolute top-3 right-3 flex items-center gap-1.5">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold backdrop-blur-md shadow-xs ${
                leader.isActive ? 'bg-emerald-500/90 text-white' : 'bg-slate-700/80 text-white'
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {leader.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>

          {/* Order pill */}
          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md text-white px-2 py-0.5 rounded-md text-[10px] font-bold">
            Order #{leader.order}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          {/* Category Pill */}
          <div className="mb-2">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-bold border ${catMeta.badgeBg}`}
            >
              <Icon className="w-3 h-3" />
              {leader.category || catMeta.name}
            </span>
          </div>

          <h3 className="text-base font-bold text-slate-900 leading-snug group-hover:text-[#1E0D79] transition-colors">
            {leader.name}
          </h3>
          <p className="text-xs font-semibold text-[#1E0D79] mt-0.5">{leader.title}</p>

          {leader.bio && (
            <p className="text-slate-500 text-xs mt-2.5 line-clamp-2 leading-relaxed">
              {leader.bio}
            </p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 pt-0 border-t border-slate-100 mt-2 flex items-center gap-2">
        <button
          onClick={() => onEdit(leader)}
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-[#1E0D79] text-slate-700 hover:text-white px-3 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
        >
          <Pencil className="w-3.5 h-3.5" /> Edit
        </button>
        <button
          onClick={() => onDelete(leader.id)}
          className="inline-flex items-center justify-center p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer"
          title="Delete Leader"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
