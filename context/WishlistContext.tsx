'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { Product } from '@/lib/types';

interface WishlistContextValue {
  items: Product[];
  toggle: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  count: number;
  lastAction: { product: Product; added: boolean } | null;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [lastAction, setLastAction] = useState<{ product: Product; added: boolean } | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('stylenepal-wishlist');
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  const toggle = useCallback((product: Product) => {
    setItems((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      const next = exists ? prev.filter((p) => p.id !== product.id) : [...prev, product];
      localStorage.setItem('stylenepal-wishlist', JSON.stringify(next));
      setLastAction({ product, added: !exists });
      return next;
    });
  }, []);

  function isWishlisted(productId: string) {
    return items.some((p) => p.id === productId);
  }

  return (
    <WishlistContext.Provider value={{ items, toggle, isWishlisted, count: items.length, lastAction }}>
      {children}
      {lastAction && <WishlistToast action={lastAction} onDismiss={() => setLastAction(null)} />}
    </WishlistContext.Provider>
  );
}

function WishlistToast({ action, onDismiss }: {
  action: { product: Product; added: boolean };
  onDismiss: () => void;
}) {
  useEffect(() => {
    const t = setTimeout(onDismiss, 2500);
    return () => clearTimeout(t);
  }, [action.product.id, onDismiss]);

  return (
    <div
      className="fixed left-1/2 bottom-24 sm:bottom-6 z-[9998] -translate-x-1/2 sm:translate-x-0 sm:left-auto sm:right-6 flex items-center gap-3 bg-brand-950 dark:bg-brand-800 px-4 py-3 shadow-xl border border-brand-800 dark:border-brand-700 min-w-[240px] max-w-xs animate-slide-in-right"
      role="status"
      aria-live="polite"
    >
      <svg
        className={`h-4 w-4 shrink-0 ${action.added ? 'fill-red-500 text-red-500' : 'fill-none text-brand-400'}`}
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      <div className="min-w-0 flex-1">
        <p className="truncate text-[11px] font-medium text-white dark:text-brand-100">
          {action.added ? 'Saved to wishlist' : 'Removed from wishlist'}
        </p>
        <p className="mt-0.5 truncate text-[10px] text-brand-400">{action.product.name}</p>
      </div>
      {action.added && (
        <a href="/wishlist" className="shrink-0 text-[10px] font-medium uppercase tracking-widest text-gold-400 hover:text-gold-300 transition-colors">
          View
        </a>
      )}
    </div>
  );
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
