'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import type { Product } from '@/lib/types';

const STORAGE_KEY = 'stylenepal-recently-viewed';
const MAX_ITEMS = 8;

export function trackView(product: Product) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const existing: Product[] = raw ? JSON.parse(raw) : [];
    const filtered = existing.filter((p) => p.id !== product.id);
    const updated = [product, ...filtered].slice(0, MAX_ITEMS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

export default function RecentlyViewed({ excludeId }: { excludeId?: string }) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const all: Product[] = raw ? JSON.parse(raw) : [];
      setItems(all.filter((p) => p.id !== excludeId).slice(0, 4));
    } catch {
      // ignore
    }
  }, [excludeId]);

  if (items.length === 0) return null;

  return (
    <section className="mt-16 border-t border-cream-200 dark:border-brand-800 pt-14" aria-labelledby="recently-viewed-heading">
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="text-[9px] font-medium uppercase tracking-[0.35em] text-brand-400">Your Browsing History</p>
          <h2 id="recently-viewed-heading" className="mt-2 font-serif text-xl font-semibold text-brand-900 dark:text-white">
            Recently Viewed
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
        {items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
