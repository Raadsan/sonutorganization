'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Plus, Pencil, Trash2, X, Upload, Loader2, UserCircle } from 'lucide-react';
import Image from 'next/image';

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

const emptyForm: FormState = { name: '', title: '', bio: '', facebook: '', tiktok: '', instagram: '', order: '0', isActive: 'true' };

export default function LeadershipPage() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Leader | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchLeaders = async () => {
    try {
      const { data } = await axios.get('/api/admin/leaders');
      setLeaders(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchLeaders(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview(null);
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
    setShowModal(true);
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (imageFile) fd.append('image', imageFile);

      if (editing) {
        await axios.put(`/api/admin/leaders/${editing.id}`, fd);
      } else {
        await axios.post('/api/admin/leaders', fd);
      }
      setShowModal(false);
      fetchLeaders();
    } catch (e) {
      console.error(e);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this leader?')) return;
    await axios.delete(`/api/admin/leaders/${id}`);
    fetchLeaders();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Leadership</h2>
          <p className="text-gray-400 text-sm mt-1">{leaders.length} members</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Member
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-blue-500 animate-spin" /></div>
      ) : leaders.length === 0 ? (
        <div className="text-center py-20 bg-gray-900 rounded-xl border border-gray-800">
          <UserCircle className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No leadership members yet</p>
          <button onClick={openCreate} className="mt-4 text-blue-400 hover:text-blue-300 text-sm">Add the first member →</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {leaders.map((leader) => (
            <div key={leader.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-colors">
              <div className="h-40 bg-gray-800 relative">
                {leader.imageUrl ? (
                  <Image src={leader.imageUrl} alt={leader.name} fill className="object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <UserCircle className="w-16 h-16 text-gray-600" />
                  </div>
                )}
                <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium ${leader.isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                  {leader.isActive ? 'Active' : 'Inactive'}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold">{leader.name}</h3>
                <p className="text-blue-400 text-sm">{leader.title}</p>
                {leader.bio && <p className="text-gray-400 text-xs mt-2 line-clamp-2">{leader.bio}</p>}
                <div className="flex items-center gap-2 mt-4">
                  <button
                    onClick={() => openEdit(leader)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(leader.id)}
                    className="flex items-center justify-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-800">
              <h3 className="text-white font-semibold">{editing ? 'Edit Member' : 'Add Member'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {/* Image upload */}
              <div
                onClick={() => fileRef.current?.click()}
                className="cursor-pointer border-2 border-dashed border-gray-700 hover:border-gray-500 rounded-xl h-36 flex flex-col items-center justify-center gap-2 transition-colors relative overflow-hidden"
              >
                {imagePreview ? (
                  <Image src={imagePreview} alt="Preview" fill className="object-cover rounded-xl" />
                ) : (
                  <>
                    <Upload className="w-6 h-6 text-gray-500" />
                    <p className="text-gray-500 text-sm">Click to upload photo</p>
                  </>
                )}
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImage} />
              </div>

              {[
                { label: 'Full Name', key: 'name', required: true, placeholder: 'e.g. Ahmed Omar' },
                { label: 'Title / Position', key: 'title', required: true, placeholder: 'e.g. CEO' },
                { label: 'Display Order', key: 'order', required: false, placeholder: '0' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">{field.label}</label>
                  <input
                    type="text"
                    required={field.required}
                    placeholder={field.placeholder}
                    value={form[field.key as keyof FormState]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              ))}

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Bio</label>
                <textarea
                  rows={3}
                  placeholder="Short biography..."
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              {[
                { label: 'Facebook URL', key: 'facebook', placeholder: 'https://facebook.com/...' },
                { label: 'TikTok URL', key: 'tiktok', placeholder: 'https://tiktok.com/@...' },
                { label: 'Instagram URL', key: 'instagram', placeholder: 'https://instagram.com/...' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">{field.label}</label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={form[field.key as keyof FormState]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              ))}

              {editing && (
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Status</label>
                  <select
                    value={form.isActive}
                    onChange={(e) => setForm({ ...form, isActive: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
