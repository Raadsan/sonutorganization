'use client';

import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import {
  BadgeCheck,
  ExternalLink,
  Loader2,
  Pencil,
  Plus,
  Trash2,
  Upload,
  X,
} from 'lucide-react';

interface Affiliate {
  id: number;
  name: string;
  logoUrl: string;
  website: string | null;
  description: string | null;
  order: number;
  isActive: boolean;
}

interface FormState {
  name: string;
  website: string;
  description: string;
  order: string;
  isActive: string;
}

const emptyForm: FormState = {
  name: '',
  website: '',
  description: '',
  order: '0',
  isActive: 'true',
};

function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    return String(error.response?.data?.error ?? 'Something went wrong');
  }

  return 'Something went wrong';
}

export default function AffiliatesPage() {
  const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Affiliate | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [error, setError] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchAffiliates = async () => {
    try {
      setError('');
      const { data } = await axios.get<Affiliate[]>('/api/admin/affiliates');
      setAffiliates(data);
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isCurrent = true;

    axios
      .get<Affiliate[]>('/api/admin/affiliates')
      .then(({ data }) => {
        if (isCurrent) {
          setAffiliates(data);
        }
      })
      .catch((requestError) => {
        if (isCurrent) {
          setError(getErrorMessage(requestError));
        }
      })
      .finally(() => {
        if (isCurrent) {
          setLoading(false);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (logoPreview?.startsWith('blob:')) {
        URL.revokeObjectURL(logoPreview);
      }
    };
  }, [logoPreview]);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setLogoFile(null);
    setLogoPreview(null);
    setError('');
    setShowModal(true);
  };

  const openEdit = (affiliate: Affiliate) => {
    setEditing(affiliate);
    setForm({
      name: affiliate.name,
      website: affiliate.website ?? '',
      description: affiliate.description ?? '',
      order: String(affiliate.order),
      isActive: String(affiliate.isActive),
    });
    setLogoFile(null);
    setLogoPreview(affiliate.logoUrl);
    setError('');
    setShowModal(true);
  };

  const handleLogo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Please choose an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('The logo must be 5MB or smaller');
      return;
    }

    setError('');
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!editing && !logoFile) {
      setError('Please upload an affiliate logo');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => formData.append(key, value));
      if (logoFile) {
        formData.append('logo', logoFile);
      }

      if (editing) {
        await axios.put(`/api/admin/affiliates/${editing.id}`, formData);
      } else {
        await axios.post('/api/admin/affiliates', formData);
      }

      setShowModal(false);
      await fetchAffiliates();
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (affiliate: Affiliate) => {
    if (!confirm(`Delete ${affiliate.name}?`)) {
      return;
    }

    try {
      setError('');
      await axios.delete(`/api/admin/affiliates/${affiliate.id}`);
      await fetchAffiliates();
    } catch (requestError) {
      setError(getErrorMessage(requestError));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Affiliates</h2>
          <p className="mt-1 text-sm text-gray-400">
            {affiliates.length} {affiliates.length === 1 ? 'affiliate' : 'affiliates'}
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-cyan-700"
        >
          <Plus className="h-4 w-4" />
          Add Affiliate
        </button>
      </div>

      {error && !showModal && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
        </div>
      ) : affiliates.length === 0 ? (
        <div className="rounded-xl border border-gray-800 bg-gray-900 py-20 text-center">
          <BadgeCheck className="mx-auto mb-3 h-12 w-12 text-gray-600" />
          <p className="text-gray-400">No affiliates yet</p>
          <button
            type="button"
            onClick={openCreate}
            className="mt-4 text-sm text-cyan-400 hover:text-cyan-300"
          >
            Add the first affiliate
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {affiliates.map((affiliate) => (
            <div
              key={affiliate.id}
              className="overflow-hidden rounded-xl border border-gray-800 bg-gray-900 transition-colors hover:border-gray-700"
            >
              <div className="relative flex h-32 items-center justify-center bg-white p-4">
                <Image
                  src={affiliate.logoUrl}
                  alt={affiliate.name}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 33vw, 25vw"
                  className="object-contain p-4"
                />
                <div
                  className={`absolute right-2 top-2 rounded-full px-2 py-0.5 text-xs font-medium ${
                    affiliate.isActive
                      ? 'bg-green-500/20 text-green-700'
                      : 'bg-gray-500/20 text-gray-600'
                  }`}
                >
                  {affiliate.isActive ? 'Active' : 'Inactive'}
                </div>
              </div>
              <div className="p-4">
                <h3 className="truncate font-semibold text-white">{affiliate.name}</h3>
                {affiliate.website && (
                  <a
                    href={affiliate.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 flex items-center gap-1 truncate text-xs text-cyan-400 hover:text-cyan-300"
                  >
                    <ExternalLink className="h-3 w-3 shrink-0" />
                    <span className="truncate">{affiliate.website}</span>
                  </a>
                )}
                <div className="mt-3 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(affiliate)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-gray-800 px-3 py-1.5 text-xs font-medium text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(affiliate)}
                    aria-label={`Delete ${affiliate.name}`}
                    className="flex items-center justify-center rounded-lg bg-red-500/10 px-3 py-1.5 text-red-400 transition-colors hover:bg-red-500/20 hover:text-red-300"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-gray-800 bg-gray-900">
            <div className="flex items-center justify-between border-b border-gray-800 p-5">
              <h3 className="font-semibold text-white">
                {editing ? 'Edit Affiliate' : 'Add Affiliate'}
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                aria-label="Close"
                className="text-gray-400 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 p-5">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="relative flex h-32 w-full cursor-pointer flex-col items-center justify-center gap-2 overflow-hidden rounded-xl border-2 border-dashed border-gray-700 bg-white transition-colors hover:border-cyan-500"
              >
                {logoPreview ? (
                  <Image
                    src={logoPreview}
                    alt="Affiliate logo preview"
                    fill
                    sizes="400px"
                    className="object-contain p-4"
                    unoptimized
                  />
                ) : (
                  <>
                    <Upload className="h-6 w-6 text-gray-500" />
                    <span className="text-sm text-gray-500">Upload affiliate logo</span>
                    <span className="text-xs text-gray-400">Image, maximum 5MB</span>
                  </>
                )}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleLogo}
              />

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">
                  Affiliate Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                  placeholder="e.g. Education International"
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">
                  Website
                </label>
                <input
                  type="url"
                  value={form.website}
                  onChange={(event) => setForm({ ...form, website: event.target.value })}
                  placeholder="https://..."
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">
                  Display Order
                </label>
                <input
                  type="number"
                  value={form.order}
                  onChange={(event) => setForm({ ...form, order: event.target.value })}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(event) => setForm({ ...form, description: event.target.value })}
                  placeholder="Short description..."
                  className="w-full resize-none rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-300">
                  Status
                </label>
                <select
                  value={form.isActive}
                  onChange={(event) => setForm({ ...form, isActive: event.target.value })}
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:border-cyan-500 focus:outline-none"
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>

              {error && (
                <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
                  {error}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-lg bg-gray-800 px-4 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-700 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-cyan-700 disabled:opacity-60"
                >
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />}
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
