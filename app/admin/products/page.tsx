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
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Products</h1>
          <p className="mt-1 text-sm text-gray-400">{products.length} total products</p>
        </div>
        <Link
          href="/admin/products/new"
          className="rounded bg-amber-500 px-4 py-2 text-sm font-semibold text-gray-950 transition-colors hover:bg-amber-400"
        >
          + Add Product
        </Link>
      </div>

      <div className="mt-6">
        <input
          type="search"
          placeholder="Search by name, SKU, or category…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm rounded border border-gray-700 bg-gray-900 px-4 py-2 text-sm text-white placeholder-gray-600 focus:border-amber-500 focus:outline-none"
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-gray-800">
        <table className="w-full text-sm">
          <thead className="border-b border-gray-800 bg-gray-900">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-400">Product</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-widest text-gray-400">Category</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-widest text-gray-400">Price</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-widest text-gray-400">Stock</th>
              <th className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-widest text-gray-400">Flags</th>
              <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-widest text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 bg-gray-950">
            {filtered.map((p) => (
              <tr key={p.id} className="transition-colors hover:bg-gray-900/50">
                <td className="px-4 py-3">
                  <p className="font-medium text-white">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.sku}</p>
                </td>
                <td className="px-4 py-3 text-gray-400">{p.category}</td>
                <td className="px-4 py-3 text-right text-gray-300">
                  NPR {p.price.toLocaleString()}
                  {p.originalPrice && (
                    <span className="block text-xs text-gray-600 line-through">
                      NPR {p.originalPrice.toLocaleString()}
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <span className={`font-mono font-semibold ${p.stock === 0 ? 'text-red-400' : p.stock <= 10 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {p.stock}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1.5">
                    {p.isFeatured && <span className="rounded bg-blue-900/40 px-1.5 py-0.5 text-[10px] text-blue-400">Featured</span>}
                    {p.isBestseller && <span className="rounded bg-purple-900/40 px-1.5 py-0.5 text-[10px] text-purple-400">Best</span>}
                    {p.isNew && <span className="rounded bg-emerald-900/40 px-1.5 py-0.5 text-[10px] text-emerald-400">New</span>}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="rounded px-3 py-1 text-xs font-medium text-amber-400 transition-colors hover:bg-amber-500/10"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(p.id, p.name)}
                      disabled={deleting === p.id}
                      className="rounded px-3 py-1 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/10 disabled:opacity-50"
                    >
                      {deleting === p.id ? '…' : 'Delete'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-gray-500">
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
