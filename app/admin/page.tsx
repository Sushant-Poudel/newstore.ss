export const dynamic = 'force-dynamic';

import Link from 'next/link';
import { getProducts, getCategories, getOrders } from '@/lib/db';

function StatCard({
  label, value, sub, color, icon,
}: {
  label: string; value: string | number; sub?: string; color: string; icon: string;
}) {
  return (
    <div className="rounded-xl border border-white/5 bg-[#161616] p-5">
      <div className="flex items-start justify-between">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">{label}</p>
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-base ${color}`}>
          {icon}
        </span>
      </div>
      <p className="mt-3 text-3xl font-bold text-white">{value}</p>
      {sub && <p className="mt-1 text-xs text-gray-600">{sub}</p>}
    </div>
  );
}

export default function AdminDashboard() {
  const products = getProducts();
  const categories = getCategories();
  const orders = getOrders();
  const totalStock = products.reduce((s, p) => s + p.stock, 0);
  const lowStock = products.filter((p) => p.stock <= 10);
  const totalRevenue = orders
    .filter((o) => o.status === 'completed')
    .reduce((s, o) => s + o.total, 0);
  const pending = orders.filter((o) => o.status === 'pending').length;
  const recentOrders = orders.slice(0, 6);

  const STATUS_COLORS: Record<string, string> = {
    pending: 'bg-amber-500/10 text-amber-400',
    confirmed: 'bg-blue-500/10 text-blue-400',
    completed: 'bg-emerald-500/10 text-emerald-400',
    cancelled: 'bg-red-500/10 text-red-400',
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Dashboard</h1>
          <p className="mt-0.5 text-sm text-gray-500">Here&apos;s your store at a glance</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/products/new"
            className="flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-black transition-colors hover:bg-amber-400"
          >
            + Add Product
          </Link>
          <Link
            href="/admin/orders"
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-gray-300 transition-colors hover:bg-white/10"
          >
            Orders
          </Link>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          label="Total Orders"
          value={orders.length}
          sub={`${pending} pending`}
          color="bg-blue-500/10 text-blue-400"
          icon="📋"
        />
        <StatCard
          label="Revenue (completed)"
          value={`NPR ${totalRevenue.toLocaleString()}`}
          sub="Completed orders only"
          color="bg-amber-500/10 text-amber-400"
          icon="💰"
        />
        <StatCard
          label="Products"
          value={products.length}
          sub={`${categories.length} categories`}
          color="bg-purple-500/10 text-purple-400"
          icon="🛍"
        />
        <StatCard
          label="Total Stock"
          value={totalStock}
          sub={lowStock.length > 0 ? `${lowStock.length} low stock` : 'All stocked'}
          color={lowStock.length > 0 ? 'bg-red-500/10 text-red-400' : 'bg-emerald-500/10 text-emerald-400'}
          icon="📦"
        />
      </div>

      {/* Recent orders + Low stock */}
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        {/* Recent orders */}
        <div className="rounded-xl border border-white/5 bg-[#161616]">
          <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
            <h2 className="text-sm font-semibold text-white">Recent Orders</h2>
            <Link href="/admin/orders" className="text-xs text-amber-400 hover:underline">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {recentOrders.length === 0 && (
              <p className="px-5 py-8 text-center text-sm text-gray-600">No orders yet.</p>
            )}
            {recentOrders.map((o) => (
              <div key={o.id} className="flex items-center justify-between px-5 py-3.5">
                <div>
                  <p className="text-sm font-medium text-white">{o.customer.name}</p>
                  <p className="text-xs text-gray-600">
                    #{o.id} · {o.items.length} item{o.items.length !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-amber-400">
                    NPR {o.total.toLocaleString()}
                  </span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold capitalize ${STATUS_COLORS[o.status]}`}>
                    {o.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low stock */}
        <div className="rounded-xl border border-white/5 bg-[#161616]">
          <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
            <h2 className="text-sm font-semibold text-white">Low Stock Alert</h2>
            <Link href="/admin/products" className="text-xs text-amber-400 hover:underline">
              Manage →
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {lowStock.length === 0 && (
              <p className="px-5 py-8 text-center text-sm text-gray-600">All products well stocked.</p>
            )}
            {lowStock.slice(0, 8).map((p) => (
              <Link
                key={p.id}
                href={`/admin/products/${p.id}`}
                className="flex items-center justify-between px-5 py-3 transition-colors hover:bg-white/3"
              >
                <span className="truncate text-sm text-gray-300">{p.name}</span>
                <span className={`ml-3 shrink-0 font-mono text-xs font-bold ${p.stock === 0 ? 'text-red-400' : 'text-amber-400'}`}>
                  {p.stock === 0 ? 'OUT' : `${p.stock} left`}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="rounded-xl border border-white/5 bg-[#161616] p-5">
        <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            { href: '/admin/products/new', label: '+ New Product', color: 'border-amber-500/30 text-amber-400 hover:bg-amber-500/10' },
            { href: '/admin/orders', label: '📋 View Orders', color: 'border-blue-500/30 text-blue-400 hover:bg-blue-500/10' },
            { href: '/admin/settings', label: '⚙ Settings', color: 'border-purple-500/30 text-purple-400 hover:bg-purple-500/10' },
            { href: '/', label: '↗ Live Store', color: 'border-white/10 text-gray-400 hover:bg-white/5', target: '_blank' },
          ].map((a) => (
            <Link
              key={a.href}
              href={a.href}
              target={a.target}
              className={`flex items-center justify-center rounded-lg border px-4 py-3 text-xs font-semibold transition-colors ${a.color}`}
            >
              {a.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
