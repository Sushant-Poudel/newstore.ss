'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Product } from '@/lib/types';

interface Props {
  initial?: Partial<Product>;
  mode: 'create' | 'edit';
}

const CATEGORIES = [
  { value: 'shoes', label: 'Shoes' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'bags', label: 'Bags' },
  { value: 'jewelry', label: 'Jewelry' },
  { value: 'watches', label: 'Watches' },
  { value: 'sunglasses', label: 'Sunglasses' },
];

function categoryName(slug: string) {
  return CATEGORIES.find((c) => c.value === slug)?.label ?? slug;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-gray-400">
        {label}
      </label>
      {children}
    </div>
  );
}

const INPUT = 'w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-600 focus:border-amber-500 focus:outline-none';

export default function ProductForm({ initial = {}, mode }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState<Partial<Product>>({
    id: '',
    slug: '',
    name: '',
    description: '',
    longDescription: '',
    price: 0,
    originalPrice: undefined,
    category: 'Shoes',
    categorySlug: 'shoes',
    image: '',
    images: [''],
    rating: 4.5,
    reviewCount: 0,
    stock: 0,
    tags: [],
    features: [''],
    brand: '',
    sku: '',
    isFeatured: false,
    isBestseller: false,
    isNew: false,
    ...initial,
  });

  function set<K extends keyof Product>(key: K, value: Product[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleNameChange(name: string) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    setForm((prev) => ({ ...prev, name, slug: mode === 'create' ? slug : prev.slug }));
  }

  function handleCategoryChange(slug: string) {
    setForm((prev) => ({ ...prev, categorySlug: slug, category: categoryName(slug) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload: Product = {
      ...form,
      id: form.id || `p-${Date.now()}`,
      images: (form.images ?? []).filter(Boolean),
      features: (form.features ?? []).filter(Boolean),
      tags: typeof form.tags === 'string'
        ? (form.tags as string).split(',').map((t) => t.trim()).filter(Boolean)
        : (form.tags ?? []),
    } as Product;

    const url = mode === 'edit' ? `/api/admin/products/${payload.id}` : '/api/admin/products';
    const method = mode === 'edit' ? 'PUT' : 'POST';

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    setSaving(false);
    if (res.ok) {
      router.push('/admin/products');
    } else {
      const data = await res.json();
      setError(data.error ?? 'Something went wrong.');
    }
  }

  const tagsValue = Array.isArray(form.tags) ? form.tags.join(', ') : (form.tags ?? '');

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded bg-red-900/40 px-4 py-3 text-sm text-red-400">{error}</div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Product Name *">
          <input
            className={INPUT}
            value={form.name ?? ''}
            onChange={(e) => handleNameChange(e.target.value)}
            required
            placeholder="e.g. Leather Running Sneakers"
          />
        </Field>
        <Field label="Slug (URL)">
          <input
            className={INPUT}
            value={form.slug ?? ''}
            onChange={(e) => set('slug', e.target.value)}
            required
            placeholder="leather-running-sneakers"
          />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Category *">
          <select
            className={INPUT}
            value={form.categorySlug ?? 'shoes'}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Brand *">
          <input className={INPUT} value={form.brand ?? ''} onChange={(e) => set('brand', e.target.value)} required placeholder="e.g. TrekStyle" />
        </Field>
        <Field label="SKU *">
          <input className={INPUT} value={form.sku ?? ''} onChange={(e) => set('sku', e.target.value)} required placeholder="e.g. SH-001-LRS" />
        </Field>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Field label="Price (NPR) *">
          <input className={INPUT} type="number" min={0} value={form.price ?? 0} onChange={(e) => set('price', Number(e.target.value))} required />
        </Field>
        <Field label="Original Price (NPR)">
          <input className={INPUT} type="number" min={0} value={form.originalPrice ?? ''} onChange={(e) => set('originalPrice', e.target.value ? Number(e.target.value) : undefined)} placeholder="Leave blank if no discount" />
        </Field>
        <Field label="Stock *">
          <input className={INPUT} type="number" min={0} value={form.stock ?? 0} onChange={(e) => set('stock', Number(e.target.value))} required />
        </Field>
      </div>

      <Field label="Short Description *">
        <textarea
          className={`${INPUT} resize-none`}
          rows={2}
          value={form.description ?? ''}
          onChange={(e) => set('description', e.target.value)}
          required
          placeholder="One or two sentences shown on product card"
        />
      </Field>

      <Field label="Full Description">
        <textarea
          className={`${INPUT} resize-none`}
          rows={4}
          value={form.longDescription ?? ''}
          onChange={(e) => set('longDescription', e.target.value)}
          placeholder="Detailed description shown on product page"
        />
      </Field>

      <Field label="Main Image URL *">
        <input className={INPUT} value={form.image ?? ''} onChange={(e) => set('image', e.target.value)} required placeholder="https://..." />
      </Field>

      <Field label="Additional Image URLs (one per line)">
        <textarea
          className={`${INPUT} resize-none`}
          rows={3}
          value={(form.images ?? []).join('\n')}
          onChange={(e) => set('images', e.target.value.split('\n').map((s) => s.trim()))}
          placeholder="https://image1.jpg&#10;https://image2.jpg"
        />
      </Field>

      <Field label="Key Features (one per line)">
        <textarea
          className={`${INPUT} resize-none`}
          rows={4}
          value={(form.features ?? []).join('\n')}
          onChange={(e) => set('features', e.target.value.split('\n').map((s) => s.trim()))}
          placeholder="Genuine leather upper&#10;Rubber outsole&#10;Cushioned insole"
        />
      </Field>

      <Field label="Tags (comma-separated)">
        <input
          className={INPUT}
          value={tagsValue}
          onChange={(e) => set('tags', e.target.value.split(',').map((t) => t.trim()).filter(Boolean))}
          placeholder="sneakers, running, leather, casual"
        />
      </Field>

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Rating (0–5)">
          <input className={INPUT} type="number" min={0} max={5} step={0.1} value={form.rating ?? 4.5} onChange={(e) => set('rating', Number(e.target.value))} />
        </Field>
        <Field label="Review Count">
          <input className={INPUT} type="number" min={0} value={form.reviewCount ?? 0} onChange={(e) => set('reviewCount', Number(e.target.value))} />
        </Field>
      </div>

      <Field label="Visibility Flags">
        <div className="flex flex-wrap gap-4 pt-1">
          {([['isFeatured', 'Featured'], ['isBestseller', 'Bestseller'], ['isNew', 'New Arrival']] as const).map(([key, label]) => (
            <label key={key} className="flex cursor-pointer items-center gap-2 text-sm text-gray-300">
              <input
                type="checkbox"
                checked={!!form[key]}
                onChange={(e) => set(key, e.target.checked as never)}
                className="h-4 w-4 rounded border-gray-600 accent-amber-500"
              />
              {label}
            </label>
          ))}
        </div>
      </Field>

      <div className="flex items-center justify-end gap-3 border-t border-gray-800 pt-6">
        <button
          type="button"
          onClick={() => router.push('/admin/products')}
          className="rounded border border-gray-700 px-5 py-2 text-sm text-gray-300 transition-colors hover:border-gray-500 hover:text-white"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={saving}
          className="rounded bg-amber-500 px-6 py-2 text-sm font-semibold text-gray-950 transition-colors hover:bg-amber-400 disabled:opacity-60"
        >
          {saving ? 'Saving…' : mode === 'edit' ? 'Save Changes' : 'Create Product'}
        </button>
      </div>
    </form>
  );
}
