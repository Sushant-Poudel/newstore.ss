'use client';

import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/ProductCard';

export default function WishlistPage() {
  const { items, count } = useWishlist();

  return (
    <div className="min-h-[70vh] bg-white dark:bg-brand-950">
      {/* Header */}
      <div className="border-b border-cream-200 dark:border-brand-900 bg-white dark:bg-brand-950">
        <div className="container-xl pt-10 pb-0">
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-brand-400">
            <a href="/" className="hover:text-brand-900 dark:hover:text-white transition-colors">Home</a>
            <span>/</span>
            <span className="text-brand-700 dark:text-brand-300">Wishlist</span>
          </nav>
          <div className="flex items-end justify-between gap-4 pb-5">
            <div>
              <h1 className="font-serif text-2xl font-semibold text-brand-900 dark:text-white sm:text-3xl">
                My Wishlist
              </h1>
            </div>
            <span className="shrink-0 text-[11px] text-brand-400 dark:text-brand-600">
              {count} {count === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>
      </div>

      <div className="container-xl py-12">
        {count === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6 py-32 text-center">
            <svg className="h-12 w-12 text-cream-300 dark:text-brand-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <div>
              <h2 className="font-serif text-lg font-semibold text-brand-900 dark:text-white">Your wishlist is empty</h2>
              <p className="mt-2 text-sm text-brand-500">Save items you love by clicking the heart icon on any product.</p>
            </div>
            <Link href="/products" className="border-b border-brand-900 dark:border-white text-[11px] font-medium uppercase tracking-[0.2em] text-brand-900 dark:text-white pb-0.5 hover:pb-1 transition-all">
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="mt-14 flex items-center justify-center gap-8 border-t border-cream-200 dark:border-brand-800 pt-10">
              <Link
                href="/products"
                className="border-b border-brand-900 dark:border-white pb-0.5 text-[11px] font-medium uppercase tracking-[0.2em] text-brand-900 dark:text-white transition-all hover:pb-1"
              >
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
