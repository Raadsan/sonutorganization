'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import {
  Plus, Pencil, Trash2, X, Upload, Loader2,
  Calendar, MapPin, Clock, Eye, EyeOff, CheckCircle, AlertCircle,
} from 'lucide-react';
import Image from 'next/image';

interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  time: string;
  coverImageUrl: string | null;
  isPublished: boolean;
  createdAt: string;
}

type FormState = {
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  time: string;
  isPublished: string;
};

const emptyForm: FormState = {
  title: '',
  description: '',
  location: '',
  startDate: '',
  endDate: '',
  time: '',
  isPublished: 'true',
};

function isUpcoming(startDate: string) {
  return new Date(startDate) >= new Date();
}

function Toast({ message, type }: { message: string; type: 'success' | 'error' }) {
  return (
    <div className={`fixed top-5 right-5 z-[100] flex items-center gap-3 px-4 py-3 rounded-xl shadow-xl text-sm font-medium transition-all
      ${type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
      {type === 'success' ? <CheckCircle className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
      {message}
    </div>
  );
}

export default function EventsAdminPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [modalError, setModalError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchEvents = async () => {
    try {
      const { data } = await axios.get('/api/admin/events');
      setEvents(data);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchEvents(); }, []);

  const toDateInputValue = (iso: string) => iso ? iso.slice(0, 10) : '';

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setCoverFile(null);
    setCoverPreview(null);
    setModalError(null);
    setShowModal(true);
  };

  const openEdit = (ev: Event) => {
    setEditing(ev);
    setForm({
      title: ev.title,
      description: ev.description,
      location: ev.location,
      startDate: toDateInputValue(ev.startDate),
      endDate: toDateInputValue(ev.endDate),
      time: ev.time,
      isPublished: String(ev.isPublished),
    });
    setCoverFile(null);
    setCoverPreview(ev.coverImageUrl);
    setModalError(null);
    setShowModal(true);
  };

  const handleCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setModalError(null);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (coverFile) fd.append('cover', coverFile);

      if (editing) {
        await axios.put(`/api/admin/events/${editing.id}`, fd);
        showToast('Event updated successfully!', 'success');
      } else {
        await axios.post('/api/admin/events', fd);
        showToast('Event created successfully!', 'success');
      }
      setShowModal(false);
      fetchEvents();
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error || 'Failed to save event. Please try again.';
      setModalError(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this event?')) return;
    try {
      await axios.delete(`/api/admin/events/${id}`);
      showToast('Event deleted.', 'success');
      fetchEvents();
    } catch {
      showToast('Failed to delete event.', 'error');
    }
  };

  const togglePublish = async (ev: Event) => {
    try {
      const fd = new FormData();
      fd.append('title', ev.title);
      fd.append('description', ev.description);
      fd.append('location', ev.location);
      fd.append('startDate', ev.startDate);
      fd.append('endDate', ev.endDate);
      fd.append('time', ev.time);
      fd.append('isPublished', String(!ev.isPublished));
      await axios.put(`/api/admin/events/${ev.id}`, fd);
      fetchEvents();
    } catch {
      showToast('Failed to update status.', 'error');
    }
  };

  return (
    <div className="space-y-6">
      {toast && <Toast message={toast.message} type={toast.type} />}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Events</h2>
          <p className="text-gray-400 text-sm mt-1">{events.length} events total</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          <Plus className="w-4 h-4" /> New Event
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-20 bg-gray-900 rounded-xl border border-gray-800">
          <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No events yet</p>
          <button onClick={openCreate} className="mt-4 text-purple-400 hover:text-purple-300 text-sm">
            Create the first event →
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((ev) => {
            const upcoming = isUpcoming(ev.startDate);
            return (
              <div key={ev.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-colors flex">
                {ev.coverImageUrl && (
                  <div className="w-32 h-24 relative flex-shrink-0">
                    <Image src={ev.coverImageUrl} alt={ev.title} fill className="object-cover" />
                  </div>
                )}
                <div className="flex-1 p-4 flex items-center justify-between gap-4 min-w-0">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${upcoming ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                        {upcoming ? 'Upcoming' : 'Past'}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${ev.isPublished ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                        {ev.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </div>
                    <h3 className="text-white font-semibold truncate">{ev.title}</h3>
                    <div className="flex items-center gap-4 mt-1 flex-wrap">
                      <span className="flex items-center gap-1 text-gray-500 text-xs">
                        <Calendar className="w-3 h-3" />
                        {new Date(ev.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1 text-gray-500 text-xs">
                        <MapPin className="w-3 h-3" />{ev.location}
                      </span>
                      <span className="flex items-center gap-1 text-gray-500 text-xs">
                        <Clock className="w-3 h-3" />{ev.time}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => togglePublish(ev)} title={ev.isPublished ? 'Unpublish' : 'Publish'}
                      className={`p-1.5 rounded-lg transition-colors ${ev.isPublished ? 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20' : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'}`}>
                      {ev.isPublished ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button onClick={() => openEdit(ev)} className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(ev.id)} className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-800 sticky top-0 bg-gray-900 z-10">
              <h3 className="text-white font-semibold">{editing ? 'Edit Event' : 'New Event'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {/* Error message */}
              {modalError && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg px-4 py-3 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {modalError}
                </div>
              )}

              {/* Cover image */}
              <div onClick={() => fileRef.current?.click()}
                className="cursor-pointer border-2 border-dashed border-gray-700 hover:border-purple-500/50 rounded-xl h-36 flex flex-col items-center justify-center gap-2 transition-colors relative overflow-hidden">
                {coverPreview ? (
                  <Image src={coverPreview} alt="Cover" fill className="object-cover rounded-xl" />
                ) : (
                  <>
                    <Upload className="w-6 h-6 text-gray-500" />
                    <p className="text-gray-500 text-sm">Click to upload cover image</p>
                  </>
                )}
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleCover} />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Title *</label>
                <input type="text" required placeholder="Event title..." value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors" />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Description *</label>
                <textarea rows={4} required placeholder="Describe the event..." value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 resize-none transition-colors" />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Location *</label>
                <input type="text" required placeholder="City, Country" value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Start Date *</label>
                  <input type="date" required value={form.startDate}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">End Date *</label>
                  <input type="date" required value={form.endDate}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Time *</label>
                  <input type="text" required placeholder="e.g. 09:00 AM - 5:00 PM" value={form.time}
                    onChange={(e) => setForm({ ...form, time: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Status</label>
                  <select value={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 transition-colors">
                    <option value="true">Published</option>
                    <option value="false">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-70 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                  {saving ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</>
                  ) : (
                    editing ? 'Update Event' : 'Create Event'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
