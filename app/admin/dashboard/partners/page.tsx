'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Plus, Pencil, Trash2, X, Upload, Loader2, Handshake } from 'lucide-react';
import Image from 'next/image';

interface Partner {
  id: number;
  name: string;
  logoUrl: string | null;
  website: string | null;
  description: string | null;
  order: number;
  isActive: boolean;
}

type FormState = { name: string; website: string; description: string; order: string; isActive: string };
const emptyForm: FormState = { name: '', website: '', description: '', order: '0', isActive: 'true' };

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Partner | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchPartners = async () => {
    try {
      const { data } = await axios.get('/api/admin/partners');
      setPartners(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchPartners(); }, []);

  const openCreate = () => {
    setEditing(null); setForm(emptyForm); setLogoFile(null); setLogoPreview(null); setShowModal(true);
  };
  const openEdit = (p: Partner) => {
    setEditing(p);
    setForm({ name: p.name, website: p.website || '', description: p.description || '', order: String(p.order), isActive: String(p.isActive) });
    setLogoFile(null); setLogoPreview(p.logoUrl); setShowModal(true);
  };

  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (logoFile) fd.append('logo', logoFile);
      if (editing) await axios.put(`/api/admin/partners/${editing.id}`, fd);
      else await axios.post('/api/admin/partners', fd);
      setShowModal(false);
      fetchPartners();
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this partner?')) return;
    await axios.delete(`/api/admin/partners/${id}`);
    fetchPartners();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Partners</h2>
          <p className="text-gray-400 text-sm mt-1">{partners.length} partners</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> Add Partner
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-green-500 animate-spin" /></div>
      ) : partners.length === 0 ? (
        <div className="text-center py-20 bg-gray-900 rounded-xl border border-gray-800">
          <Handshake className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No partners yet</p>
          <button onClick={openCreate} className="mt-4 text-green-400 hover:text-green-300 text-sm">Add the first partner →</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {partners.map((partner) => (
            <div key={partner.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-colors">
              <div className="h-32 bg-gray-800 relative flex items-center justify-center p-4">
                {partner.logoUrl ? (
                  <Image src={partner.logoUrl} alt={partner.name} fill className="object-contain p-4" />
                ) : (
                  <Handshake className="w-12 h-12 text-gray-600" />
                )}
                <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium ${partner.isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                  {partner.isActive ? 'Active' : 'Inactive'}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-semibold truncate">{partner.name}</h3>
                {partner.website && (
                  <a href={partner.website} target="_blank" rel="noopener noreferrer" className="text-green-400 text-xs hover:text-green-300 truncate block">
                    {partner.website}
                  </a>
                )}
                <div className="flex items-center gap-2 mt-3">
                  <button onClick={() => openEdit(partner)} className="flex-1 flex items-center justify-center gap-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                    <Pencil className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button onClick={() => handleDelete(partner.id)} className="flex items-center justify-center gap-1.5 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
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
              <h3 className="text-white font-semibold">{editing ? 'Edit Partner' : 'Add Partner'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              <div onClick={() => fileRef.current?.click()} className="cursor-pointer border-2 border-dashed border-gray-700 hover:border-gray-500 rounded-xl h-32 flex flex-col items-center justify-center gap-2 transition-colors relative overflow-hidden bg-gray-800">
                {logoPreview ? (
                  <Image src={logoPreview} alt="Preview" fill className="object-contain p-4" />
                ) : (
                  <>
                    <Upload className="w-6 h-6 text-gray-500" />
                    <p className="text-gray-500 text-sm">Click to upload logo</p>
                  </>
                )}
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleLogo} />
              </div>

              {[
                { label: 'Partner Name', key: 'name', required: true, placeholder: 'e.g. UNICEF' },
                { label: 'Website', key: 'website', required: false, placeholder: 'https://...' },
                { label: 'Display Order', key: 'order', required: false, placeholder: '0' },
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">{field.label}</label>
                  <input type="text" required={field.required} placeholder={field.placeholder}
                    value={form[field.key as keyof FormState]}
                    onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
                </div>
              ))}

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Description</label>
                <textarea rows={2} placeholder="Short description..." value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500 resize-none" />
              </div>

              {editing && (
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Status</label>
                  <select value={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500">
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
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
