'use client';

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Plus, Pencil, Trash2, X, Upload, Loader2, BookOpen, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImageUrl: string | null;
  author: string;
  isPublished: boolean;
  publishedAt: string | null;
  createdAt: string;
}

type FormState = { title: string; content: string; excerpt: string; author: string; isPublished: string };
const emptyForm: FormState = { title: '', content: '', excerpt: '', author: 'Admin', isPublished: 'false' };

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchPosts = async () => {
    try {
      const { data } = await axios.get('/api/admin/blog');
      setPosts(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchPosts(); }, []);

  const openCreate = () => {
    setEditing(null); setForm(emptyForm); setCoverFile(null); setCoverPreview(null); setShowModal(true);
  };
  const openEdit = (post: BlogPost) => {
    setEditing(post);
    setForm({ title: post.title, content: '', excerpt: post.excerpt || '', author: post.author, isPublished: String(post.isPublished) });
    setCoverFile(null); setCoverPreview(post.coverImageUrl); setShowModal(true);
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
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (coverFile) fd.append('cover', coverFile);
      if (editing) await axios.put(`/api/admin/blog/${editing.id}`, fd);
      else await axios.post('/api/admin/blog', fd);
      setShowModal(false);
      fetchPosts();
    } catch (e) { console.error(e); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this blog post?')) return;
    await axios.delete(`/api/admin/blog/${id}`);
    fetchPosts();
  };

  const togglePublish = async (post: BlogPost) => {
    const fd = new FormData();
    fd.append('title', post.title);
    fd.append('content', ''); // content not changed
    fd.append('excerpt', post.excerpt || '');
    fd.append('author', post.author);
    fd.append('isPublished', String(!post.isPublished));
    await axios.put(`/api/admin/blog/${post.id}`, fd);
    fetchPosts();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Blog</h2>
          <p className="text-gray-400 text-sm mt-1">{posts.length} posts</p>
        </div>
        <button onClick={openCreate} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus className="w-4 h-4" /> New Post
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-purple-500 animate-spin" /></div>
      ) : posts.length === 0 ? (
        <div className="text-center py-20 bg-gray-900 rounded-xl border border-gray-800">
          <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-3" />
          <p className="text-gray-400">No blog posts yet</p>
          <button onClick={openCreate} className="mt-4 text-purple-400 hover:text-purple-300 text-sm">Write the first post →</button>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div key={post.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:border-gray-700 transition-colors flex gap-0">
              {post.coverImageUrl && (
                <div className="w-32 h-24 relative flex-shrink-0">
                  <Image src={post.coverImageUrl} alt={post.title} fill className="object-cover" />
                </div>
              )}
              <div className="flex-1 p-4 flex items-center justify-between gap-4 min-w-0">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${post.isPublished ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {post.isPublished ? 'Published' : 'Draft'}
                    </span>
                    <span className="text-gray-500 text-xs">{new Date(post.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h3 className="text-white font-semibold truncate">{post.title}</h3>
                  {post.excerpt && <p className="text-gray-400 text-sm truncate mt-0.5">{post.excerpt}</p>}
                  <p className="text-gray-500 text-xs mt-1">By {post.author}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => togglePublish(post)} title={post.isPublished ? 'Unpublish' : 'Publish'}
                    className={`p-1.5 rounded-lg text-xs transition-colors ${post.isPublished ? 'bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20' : 'bg-green-500/10 text-green-400 hover:bg-green-500/20'}`}>
                    {post.isPublished ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                  <button onClick={() => openEdit(post)} className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(post.id)} className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors">
                    <Trash2 className="w-4 h-4" />
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
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-gray-800">
              <h3 className="text-white font-semibold">{editing ? 'Edit Post' : 'New Post'}</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
              {/* Cover image */}
              <div onClick={() => fileRef.current?.click()} className="cursor-pointer border-2 border-dashed border-gray-700 hover:border-gray-500 rounded-xl h-36 flex flex-col items-center justify-center gap-2 transition-colors relative overflow-hidden">
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
                <input type="text" required placeholder="Post title..." value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500" />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Excerpt</label>
                <textarea rows={2} placeholder="Short description shown in listings..." value={form.excerpt}
                  onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 resize-none" />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-1.5">Content *</label>
                <textarea rows={8} required={!editing} placeholder="Write your blog post here..." value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500 resize-none font-mono" />
                {editing && <p className="text-gray-500 text-xs mt-1">Leave blank to keep existing content</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Author</label>
                  <input type="text" placeholder="Author name" value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500" />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-1.5">Status</label>
                  <select value={form.isPublished} onChange={(e) => setForm({ ...form, isPublished: e.target.value })}
                    className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-500">
                    <option value="false">Draft</option>
                    <option value="true">Published</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors">Cancel</button>
                <button type="submit" disabled={saving} className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-60 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                  {saving && <Loader2 className="w-4 h-4 animate-spin" />}
                  {saving ? 'Saving...' : editing ? 'Update' : 'Publish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
