'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Product } from '@/lib/types';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/products').then((r) => r.json()).then(setProducts);
  }, []);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeleting(id);
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleting(null);
  }

  const filtered = products.filter(
    (p) =>
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.categorySlug.includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Products</h1>
          <p className="mt-0.5 text-sm text-gray-500">{products.length} total products</p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-amber-400"
        >
          + Add Product
        </Link>
      </div>

      <div className="relative">
        <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="search"
          placeholder="Search by name, SKU, or category…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm rounded-xl border border-white/10 bg-[#161616] py-2.5 pl-9 pr-4 text-sm text-white placeholder-gray-600 focus:border-amber-500/50 focus:outline-none"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-white/5">
        <table className="w-full text-sm">
          <thead className="border-b border-white/5 bg-[#161616]">
            <tr>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">Product</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">Category</th>
              <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">Price</th>
              <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">Stock</th>
              <th className="px-4 py-3 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">Tags</th>
              <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-[#111111]">
            {filtered.map((p) => (
              <tr key={p.id} className="transition-colors hover:bg-white/3">
                <td className="px-4 py-3">
                  <p className="font-medium text-white">{p.name}</p>
                  <p className="text-xs text-gray-600">{p.sku}</p>
                </td>
                <td className="px-4 py-3 text-gray-500">{p.category}</td>
                <td className="px-4 py-3 text-right text-gray-300">
                  NPR {p.price.toLocaleString()}
                  {p.originalPrice && (
                    <span className="block text-xs text-gray-700 line-through">
                      NPR {p.originalPrice.toLocaleString()}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <span className={`font-mono font-bold text-sm ${p.stock === 0 ? 'text-red-400' : p.stock <= 10 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {p.stock}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1">
                    {p.isFeatured && <span className="rounded-full bg-blue-900/40 px-2 py-0.5 text-[9px] text-blue-400">Featured</span>}
                    {p.isBestseller && <span className="rounded-full bg-purple-900/40 px-2 py-0.5 text-[9px] text-purple-400">Best</span>}
                    {p.isNew && <span className="rounded-full bg-emerald-900/40 px-2 py-0.5 text-[9px] text-emerald-400">New</span>}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="rounded-lg px-3 py-1.5 text-xs font-medium text-amber-400 transition-colors hover:bg-amber-500/10"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p.id, p.name)}
                      disabled={deleting === p.id}
                      className="rounded-lg px-3 py-1.5 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-50"
                    >
                      {deleting === p.id ? '…' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-16 text-center text-gray-600">
                  {search ? 'No products match your search.' : 'No products yet.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
