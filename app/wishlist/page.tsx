'use client';

import Link from 'next/link';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/ProductCard';
import Breadcrumb from '@/components/Breadcrumb';

export default function WishlistPage() {
  const { items, count } = useWishlist();

  return (
    <div className="min-h-[60vh] bg-cream-50 dark:bg-brand-950">
      <div className="border-b border-cream-200 dark:border-brand-900 bg-white dark:bg-brand-950">
        <div className="container-xl py-8">
          <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'Wishlist' }]} />
          <div className="mt-3 flex items-center justify-between">
            <div>
              <h1 className="section-title dark:text-white">My Wishlist</h1>
              <p className="mt-1 text-xs text-brand-400">{count} saved item{count !== 1 ? 's' : ''}</p>
            </div>
            {count > 0 && (
              <Link href="/products" className="text-[11px] uppercase tracking-widest text-brand-500 hover:text-brand-900 dark:hover:text-white transition-colors">
                Continue Shopping →
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="container-xl py-10">
        {count === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6 py-28 text-center">
            <svg className="h-16 w-16 text-cream-300 dark:text-brand-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <div>
              <h2 className="font-serif text-xl font-semibold text-brand-900 dark:text-white">Your wishlist is empty</h2>
              <p className="mt-2 text-sm text-brand-500">Save items you love by clicking the heart icon on any product.</p>
            </div>
            <Link href="/products" className="btn-primary">
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
