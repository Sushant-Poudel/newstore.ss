export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { getProducts } from '@/lib/db';
import DeleteProductButton from '@/components/admin/DeleteProductButton';

export default function AdminProductsPage() {
  const products = getProducts();

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

      {/* Low-stock alert strip */}
      {(() => {
        const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5);
        const outOfStock = products.filter((p) => p.stock === 0);
        if (lowStock.length === 0 && outOfStock.length === 0) return null;
        return (
          <div className="flex flex-wrap gap-3">
            {outOfStock.length > 0 && (
              <div className="flex items-center gap-2 rounded-lg border border-red-500/20 bg-red-500/5 px-4 py-2.5">
                <span className="h-2 w-2 rounded-full bg-red-500" />
                <span className="text-xs text-red-400"><span className="font-semibold">{outOfStock.length}</span> out of stock</span>
              </div>
            )}
            {lowStock.length > 0 && (
              <div className="flex items-center gap-2 rounded-lg border border-amber-500/20 bg-amber-500/5 px-4 py-2.5">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                <span className="text-xs text-amber-400"><span className="font-semibold">{lowStock.length}</span> low stock (≤5 units)</span>
              </div>
            )}
          </div>
        );
      })()}

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
            {products.map((p) => (
              <tr key={p.id} className="transition-colors hover:bg-white/[0.03]">
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
                  <div className="flex flex-wrap items-center justify-center gap-1">
                    {p.isFeatured && <span className="rounded-full bg-blue-900/40 px-2 py-0.5 text-[9px] text-blue-400">Featured</span>}
                    {p.isBestseller && <span className="rounded-full bg-purple-900/40 px-2 py-0.5 text-[9px] text-purple-400">Best</span>}
                    {p.isNew && <span className="rounded-full bg-emerald-900/40 px-2 py-0.5 text-[9px] text-emerald-400">New</span>}
                    {p.originalPrice && p.originalPrice > p.price && <span className="rounded-full bg-red-900/40 px-2 py-0.5 text-[9px] text-red-400">Sale</span>}
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
                    <DeleteProductButton id={p.id} name={p.name} />
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-16 text-center text-gray-600">
                  No products yet. Add your first product.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
