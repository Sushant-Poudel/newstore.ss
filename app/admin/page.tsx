import { getProducts, getCategories } from '@/lib/data';
import Link from 'next/link';

export default function AdminDashboard() {
  const products = getProducts();
  const categories = getCategories();
  const totalStock = products.reduce((s, p) => s + p.stock, 0);
  const lowStock = products.filter((p) => p.stock <= 10).length;

  const stats = [
    { label: 'Total Products', value: products.length, href: '/admin/products', color: 'text-blue-400' },
    { label: 'Categories', value: categories.length, href: '/admin/categories', color: 'text-purple-400' },
    { label: 'Total Stock Units', value: totalStock, href: '/admin/products', color: 'text-emerald-400' },
    { label: 'Low Stock Items', value: lowStock, href: '/admin/products', color: lowStock > 0 ? 'text-red-400' : 'text-emerald-400' },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-400">Welcome back. Here is an overview of your store.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <Link
            key={s.label}
            href={s.href}
            className="rounded-lg border border-gray-800 bg-gray-900 p-5 transition-colors hover:border-gray-700"
          >
            <p className="text-xs uppercase tracking-widest text-gray-500">{s.label}</p>
            <p className={`mt-2 text-3xl font-bold ${s.color}`}>{s.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Quick actions */}
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">Quick Actions</h2>
          <div className="mt-4 space-y-2">
            <Link href="/admin/products/new" className="flex items-center gap-3 rounded-md border border-gray-700 px-4 py-3 text-sm text-white transition-colors hover:border-amber-500 hover:text-amber-400">
              <span>+</span> Add New Product
            </Link>
            <Link href="/admin/settings" className="flex items-center gap-3 rounded-md border border-gray-700 px-4 py-3 text-sm text-white transition-colors hover:border-amber-500 hover:text-amber-400">
              <span>⚙</span> Edit Site Settings
            </Link>
            <Link href="/" target="_blank" className="flex items-center gap-3 rounded-md border border-gray-700 px-4 py-3 text-sm text-white transition-colors hover:border-amber-500 hover:text-amber-400">
              <span>↗</span> View Live Store
            </Link>
          </div>
        </div>

        {/* Low stock alert */}
        <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400">Low Stock Alert</h2>
          <div className="mt-4 space-y-2">
            {products
              .filter((p) => p.stock <= 10)
              .sort((a, b) => a.stock - b.stock)
              .slice(0, 5)
              .map((p) => (
                <Link
                  key={p.id}
                  href={`/admin/products/${p.id}`}
                  className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-gray-800"
                >
                  <span className="truncate">{p.name}</span>
                  <span className={`ml-4 font-mono text-xs font-bold ${p.stock === 0 ? 'text-red-400' : 'text-amber-400'}`}>
                    {p.stock === 0 ? 'OUT' : `${p.stock} left`}
                  </span>
                </Link>
              ))}
            {lowStock === 0 && (
              <p className="text-sm text-gray-500">All products are well stocked.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
