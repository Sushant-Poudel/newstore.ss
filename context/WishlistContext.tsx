'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { Product } from '@/lib/types';

interface WishlistContextValue {
  items: Product[];
  toggle: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('stylenepal-wishlist');
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  function toggle(product: Product) {
    setItems((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      const next = exists ? prev.filter((p) => p.id !== product.id) : [...prev, product];
      localStorage.setItem('stylenepal-wishlist', JSON.stringify(next));
      return next;
    });
  }

  function isWishlisted(productId: string) {
    return items.some((p) => p.id === productId);
  }

  return (
    <WishlistContext.Provider value={{ items, toggle, isWishlisted, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
