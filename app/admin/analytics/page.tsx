export const dynamic = 'force-dynamic';

import { getOrders, getProducts } from '@/lib/db';
import ExportCsvButton from '@/components/admin/ExportCsvButton';

function BarChart({ data }: { data: { label: string; value: number; color?: string }[] }) {
  const max = Math.max(...data.map((d) => d.value), 1);
  return (
    <div className="flex h-40 items-end gap-2">
      {data.map((d) => (
        <div key={d.label} className="flex flex-1 flex-col items-center gap-1">
          <div className="w-full flex flex-col justify-end" style={{ height: '128px' }}>
            <div
              className={`w-full rounded-t transition-all ${d.color ?? 'bg-amber-500/70'}`}
              style={{ height: `${Math.max((d.value / max) * 128, d.value > 0 ? 4 : 0)}px` }}
            />
          </div>
          <span className="text-[9px] text-gray-600 text-center leading-tight">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

function StatBox({ label, value, sub, accent }: { label: string; value: string | number; sub?: string; accent: string }) {
  return (
    <div className={`rounded-xl border p-5 ${accent}`}>
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">{label}</p>
      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
      {sub && <p className="mt-1 text-xs text-gray-600">{sub}</p>}
    </div>
  );
}

export default function AnalyticsPage() {
  const orders = getOrders();
  const products = getProducts();

  // Revenue by status
  const completed = orders.filter((o) => o.status === 'completed');
  const totalRevenue = completed.reduce((s, o) => s + o.total, 0);
  const avgOrderValue = completed.length > 0 ? Math.round(totalRevenue / completed.length) : 0;
  const pending = orders.filter((o) => o.status === 'pending').length;
  const cancelled = orders.filter((o) => o.status === 'cancelled').length;
  const conversionRate = orders.length > 0 ? Math.round((completed.length / orders.length) * 100) : 0;

  // Orders by day (last 7 days)
  const now = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (6 - i));
    return d;
  });
  const ordersByDay = days.map((d) => {
    const label = d.toLocaleDateString('en', { weekday: 'short' });
    const value = orders.filter((o) => {
      const od = new Date(o.createdAt);
      return od.toDateString() === d.toDateString();
    }).length;
    return { label, value };
  });

  // Revenue by day (last 7)
  const revenueByDay = days.map((d) => {
    const label = d.toLocaleDateString('en', { weekday: 'short' });
    const value = orders
      .filter((o) => o.status === 'completed' && new Date(o.createdAt).toDateString() === d.toDateString())
      .reduce((s, o) => s + o.total, 0);
    return { label, value };
  });

  // Top 5 products by order count
  const productCounts: Record<string, { name: string; count: number; revenue: number }> = {};
  for (const order of orders) {
    for (const item of order.items) {
      if (!productCounts[item.productId]) {
        productCounts[item.productId] = { name: item.name, count: 0, revenue: 0 };
      }
      productCounts[item.productId].count += item.quantity;
      productCounts[item.productId].revenue += item.price * item.quantity;
    }
  }
  const topProducts = Object.entries(productCounts)
    .sort(([, a], [, b]) => b.count - a.count)
    .slice(0, 5);

  // Category breakdown from products
  const categoryCounts: Record<string, number> = {};
  for (const p of products) {
    categoryCounts[p.category] = (categoryCounts[p.category] ?? 0) + 1;
  }
  const categoryData = Object.entries(categoryCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([label, value]) => ({ label: label.slice(0, 4), value }));

  // Status donut data
  const statusData = [
    { label: 'Completed', count: completed.length, color: 'bg-emerald-500/70' },
    { label: 'Pending', count: pending, color: 'bg-amber-500/70' },
    { label: 'Confirmed', count: orders.filter((o) => o.status === 'confirmed').length, color: 'bg-blue-500/70' },
    { label: 'Cancelled', count: cancelled, color: 'bg-red-500/70' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-white">Analytics</h1>
          <p className="mt-0.5 text-sm text-gray-500">Store performance overview</p>
        </div>
        <ExportCsvButton
          filename="orders-export.csv"
          label="Export Orders"
          data={orders.map((o) => ({
            id: o.id,
            customer: o.customer.name,
            email: o.customer.email,
            phone: o.customer.phone,
            city: o.customer.city,
            total: o.total,
            status: o.status,
            items: o.items.length,
            date: o.createdAt,
          }))}
        />
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatBox label="Total Revenue" value={`NPR ${totalRevenue.toLocaleString()}`} sub="Completed orders" accent="border-amber-500/20 bg-amber-500/5" />
        <StatBox label="Total Orders" value={orders.length} sub={`${pending} pending`} accent="border-blue-500/20 bg-blue-500/5" />
        <StatBox label="Avg Order Value" value={`NPR ${avgOrderValue.toLocaleString()}`} sub="Completed only" accent="border-purple-500/20 bg-purple-500/5" />
        <StatBox label="Conversion Rate" value={`${conversionRate}%`} sub="Completed / total" accent="border-emerald-500/20 bg-emerald-500/5" />
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Orders last 7 days */}
        <div className="rounded-xl border border-white/5 bg-[#161616] p-5">
          <h2 className="mb-4 text-sm font-semibold text-white">Orders — Last 7 Days</h2>
          <BarChart data={ordersByDay} />
        </div>

        {/* Revenue last 7 days */}
        <div className="rounded-xl border border-white/5 bg-[#161616] p-5">
          <h2 className="mb-4 text-sm font-semibold text-white">Revenue — Last 7 Days</h2>
          <BarChart data={revenueByDay.map((d) => ({ ...d, color: 'bg-emerald-500/70' }))} />
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid gap-4 lg:grid-cols-3">
        {/* Top products */}
        <div className="lg:col-span-2 rounded-xl border border-white/5 bg-[#161616]">
          <div className="border-b border-white/5 px-5 py-4">
            <h2 className="text-sm font-semibold text-white">Top Products by Sales</h2>
          </div>
          <div className="divide-y divide-white/5">
            {topProducts.length === 0 ? (
              <p className="px-5 py-10 text-center text-sm text-gray-600">No order data yet.</p>
            ) : topProducts.map(([id, info], i) => (
              <div key={id} className="flex items-center gap-4 px-5 py-3.5">
                <span className="w-5 shrink-0 text-xs font-bold text-gray-700">#{i + 1}</span>
                <span className="flex-1 text-sm text-gray-300 truncate">{info.name}</span>
                <span className="text-xs text-gray-600">{info.count} sold</span>
                <span className="text-sm font-semibold text-amber-400">NPR {info.revenue.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Status breakdown + category chart */}
        <div className="space-y-4">
          <div className="rounded-xl border border-white/5 bg-[#161616] p-5">
            <h2 className="mb-4 text-sm font-semibold text-white">Order Status</h2>
            <div className="space-y-2.5">
              {statusData.map((s) => {
                const pct = orders.length > 0 ? Math.round((s.count / orders.length) * 100) : 0;
                return (
                  <div key={s.label}>
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-gray-500">{s.label}</span>
                      <span className="text-gray-400">{s.count} ({pct}%)</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/5">
                      <div className={`h-1.5 rounded-full ${s.color}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-xl border border-white/5 bg-[#161616] p-5">
            <h2 className="mb-4 text-sm font-semibold text-white">Products by Category</h2>
            <BarChart data={categoryData} />
          </div>
        </div>
      </div>
    </div>
  );
}
