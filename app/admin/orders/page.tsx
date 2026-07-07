'use client';

import { useEffect, useState } from 'react';
import type { Order } from '@/lib/db';

const STATUSES = ['pending', 'confirmed', 'completed', 'cancelled'] as const;
type Status = typeof STATUSES[number];

const STATUS_STYLE: Record<string, string> = {
  pending: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  confirmed: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  completed: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  cancelled: 'bg-red-500/10 text-red-400 border-red-500/20',
};

const STATUS_COUNT_STYLE: Record<string, string> = {
  all: 'border-white/10 text-white',
  pending: 'border-amber-500/40 text-amber-400',
  confirmed: 'border-blue-500/40 text-blue-400',
  completed: 'border-emerald-500/40 text-emerald-400',
  cancelled: 'border-red-500/40 text-red-400',
};

function fmt(iso: string) {
  return new Date(iso).toLocaleString('en-NP', {
    month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
  });
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<Status | 'all'>('all');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/admin/orders')
      .then((r) => r.json())
      .then((data: Order[]) => setOrders([...data].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())));
  }, []);

  async function updateStatus(id: string, status: Status) {
    setUpdatingId(id);
    const res = await fetch(`/api/admin/orders/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    const updated = await res.json();
    setOrders((prev) => prev.map((o) => (o.id === id ? updated : o)));
    setUpdatingId(null);
  }

  async function deleteOrder(id: string, name: string) {
    if (!confirm(`Delete order #${id} from ${name}?`)) return;
    await fetch(`/api/admin/orders/${id}`, { method: 'DELETE' });
    setOrders((prev) => prev.filter((o) => o.id !== id));
    if (expanded === id) setExpanded(null);
  }

  function openWhatsApp(order: Order) {
    const lines = [
      `*Order Update — StyleNepal*`,
      ``,
      `Hi ${order.customer.name}!`,
      `Your order #${order.id} status: *${order.status.toUpperCase()}*`,
      `Total: NPR ${order.total.toLocaleString()}`,
    ];
    const msg = encodeURIComponent(lines.join('\n'));
    const phone = order.customer.phone.replace(/\D/g, '');
    const prefix = phone.startsWith('977') ? '' : '977';
    window.open(`https://wa.me/${prefix}${phone}?text=${msg}`, '_blank');
  }

  const counts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    confirmed: orders.filter((o) => o.status === 'confirmed').length,
    completed: orders.filter((o) => o.status === 'completed').length,
    cancelled: orders.filter((o) => o.status === 'cancelled').length,
  };

  const filtered = orders.filter((o) => {
    const matchFilter = filter === 'all' || o.status === filter;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      o.customer.name.toLowerCase().includes(q) ||
      o.customer.phone.includes(q) ||
      o.id.includes(q);
    return matchFilter && matchSearch;
  });

  return (
    <div className="p-6 space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Orders</h1>
          <p className="mt-0.5 text-sm text-gray-500">{orders.length} total · NPR {orders.filter(o => o.status === 'completed').reduce((s, o) => s + o.total, 0).toLocaleString()} earned</p>
        </div>
      </div>

      {/* Status count cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        {([['all', 'Total Orders'], ...STATUSES.map((s) => [s, s.charAt(0).toUpperCase() + s.slice(1)])] as [string, string][]).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setFilter(key as Status | 'all')}
            className={`rounded-xl border p-4 text-left transition-all ${
              filter === key ? 'ring-1 ring-current' : 'opacity-70 hover:opacity-100'
            } ${STATUS_COUNT_STYLE[key] ?? 'border-white/10 text-white'}`}
          >
            <p className="text-[10px] uppercase tracking-widest opacity-70">{label}</p>
            <p className="mt-1.5 text-2xl font-bold">{counts[key as keyof typeof counts]}</p>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            placeholder="Search by name, phone, or order ID…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-[#161616] py-2.5 pl-9 pr-4 text-sm text-white placeholder-gray-600 focus:border-amber-500/50 focus:outline-none"
          />
        </div>
      </div>

      {/* Order list */}
      <div className="space-y-2">
        {filtered.length === 0 && (
          <div className="rounded-xl border border-white/5 bg-[#161616] py-16 text-center text-sm text-gray-600">
            {search || filter !== 'all' ? 'No orders match your filters.' : 'No orders yet. They will appear here after customers checkout.'}
          </div>
        )}

        {filtered.map((order) => {
          const isExpanded = expanded === order.id;
          return (
            <div key={order.id} className="rounded-xl border border-white/5 bg-[#161616] overflow-hidden">
              {/* Order row */}
              <div className="flex items-center gap-3 px-5 py-4">
                {/* Toggle */}
                <button
                  onClick={() => setExpanded(isExpanded ? null : order.id)}
                  className="shrink-0 text-gray-600 hover:text-gray-300 transition-colors"
                >
                  <svg className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* ID + name */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs text-gray-500">#{order.id}</span>
                    <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold capitalize ${STATUS_STYLE[order.status]}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="mt-0.5 font-medium text-white">{order.customer.name}</p>
                  <p className="text-xs text-gray-600">{fmt(order.createdAt)}</p>
                </div>

                {/* Amount + actions */}
                <div className="flex shrink-0 items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-bold text-amber-400">NPR {order.total.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                  </div>

                  {/* Status quick-update */}
                  <select
                    value={order.status}
                    disabled={updatingId === order.id}
                    onChange={(e) => updateStatus(order.id, e.target.value as Status)}
                    className="rounded-lg border border-white/10 bg-[#222] px-2 py-1.5 text-xs text-gray-300 focus:outline-none focus:border-amber-500/50 disabled:opacity-50"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>

                  {/* WhatsApp */}
                  <button
                    onClick={() => openWhatsApp(order)}
                    title="Message customer on WhatsApp"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-400 transition-colors hover:border-green-500/40 hover:text-green-400"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.091.535 4.06 1.47 5.782L0 24l6.335-1.418A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.95 0-3.77-.524-5.33-1.435l-.38-.226-3.97.888.948-3.847-.248-.397A9.772 9.772 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
                    </svg>
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => deleteOrder(order.id, order.customer.name)}
                    title="Delete order"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-gray-600 transition-colors hover:border-red-500/40 hover:text-red-400"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="border-t border-white/5 grid grid-cols-1 gap-6 px-5 py-5 sm:grid-cols-2">
                  {/* Customer */}
                  <div>
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">Customer Details</p>
                    <div className="space-y-2 text-sm text-gray-400">
                      <p className="flex items-center gap-2">
                        <svg className="h-3.5 w-3.5 shrink-0 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        <span className="text-white">{order.customer.name}</span>
                      </p>
                      <p className="flex items-center gap-2">
                        <svg className="h-3.5 w-3.5 shrink-0 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        +977 {order.customer.phone}
                      </p>
                      <p className="flex items-start gap-2">
                        <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>
                          {order.customer.address}, {order.customer.region}
                          {order.customer.landmark && <span className="text-gray-600"> · {order.customer.landmark}</span>}
                        </span>
                      </p>
                    </div>

                    <div className="mt-4 space-y-1 border-t border-white/5 pt-4 text-xs text-gray-600">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span className="text-gray-400">NPR {order.subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery</span>
                        <span className={order.delivery === 0 ? 'text-emerald-400' : 'text-gray-400'}>
                          {order.delivery === 0 ? 'Free' : `NPR ${order.delivery}`}
                        </span>
                      </div>
                      <div className="flex justify-between border-t border-white/5 pt-1 text-sm font-semibold">
                        <span className="text-white">Total</span>
                        <span className="text-amber-400">NPR {order.total.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Items */}
                  <div>
                    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-600">Order Items</p>
                    <div className="space-y-3">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-10 w-10 rounded-lg object-cover bg-white/5"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="truncate text-sm text-white">{item.name}</p>
                            <p className="text-xs text-gray-600">× {item.quantity}</p>
                          </div>
                          <span className="text-sm font-semibold text-gray-300">
                            NPR {(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
