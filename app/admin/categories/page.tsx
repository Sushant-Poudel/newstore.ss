'use client';

import { useEffect, useState } from 'react';
import type { Category } from '@/lib/types';

const INPUT = 'w-full rounded border border-white/10 bg-[#1a1a1a] px-3 py-2 text-sm text-white placeholder-gray-600 focus:border-amber-500 focus:outline-none transition-colors';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/categories').then((r) => r.json()).then(setCategories);
  }, []);

  function updateCat(idx: number, field: keyof Category, value: string | number) {
    setCategories((prev) => prev.map((c, i) => i === idx ? { ...c, [field]: value } : c));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    await fetch('/api/admin/categories', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categories),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Categories</h1>
          <p className="mt-1 text-sm text-gray-400">Edit category names, descriptions, and SEO fields.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded bg-amber-500 px-5 py-2 text-sm font-semibold text-gray-950 transition-colors hover:bg-amber-400 disabled:opacity-60"
        >
          {saved ? '✓ Saved' : saving ? 'Saving…' : 'Save All'}
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {categories.map((cat, idx) => (
          <div key={cat.id} className="rounded-xl border border-white/5 bg-[#161616] p-5">
            <div className="mb-4 flex items-center gap-3">
              <span className="text-2xl">{cat.icon}</span>
              <div>
                <p className="font-semibold text-white">{cat.name}</p>
                <p className="text-xs text-gray-500">/{cat.slug}</p>
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs uppercase tracking-widest text-gray-500">Name</label>
                <input className={INPUT} value={cat.name} onChange={(e) => updateCat(idx, 'name', e.target.value)} />
              </div>
              <div>
                <label className="mb-1 block text-xs uppercase tracking-widest text-gray-500">Icon (emoji)</label>
                <input className={INPUT} value={cat.icon} onChange={(e) => updateCat(idx, 'icon', e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-xs uppercase tracking-widest text-gray-500">Short Description</label>
                <input className={INPUT} value={cat.description} onChange={(e) => updateCat(idx, 'description', e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-xs uppercase tracking-widest text-gray-500">SEO Title</label>
                <input className={INPUT} value={cat.metaTitle} onChange={(e) => updateCat(idx, 'metaTitle', e.target.value)} />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-xs uppercase tracking-widest text-gray-500">SEO Description</label>
                <textarea
                  className={`${INPUT} resize-none`}
                  rows={2}
                  value={cat.metaDescription}
                  onChange={(e) => updateCat(idx, 'metaDescription', e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
