'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { useWishlist } from '@/context/WishlistContext';
import type { Product } from '@/lib/types';
import { formatPrice, getDiscount } from '@/lib/constants';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { toggle, isWishlisted } = useWishlist();
  const [adding, setAdding] = useState(false);
  const wishlisted = isWishlisted(product.id);

  const discount = product.originalPrice
    ? getDiscount(product.price, product.originalPrice)
    : 0;

  function handleAddToBag(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (adding || product.stock === 0) return;
    setAdding(true);
    addToCart(product, 1);
    showToast(product.name, product.image, 1);
    setTimeout(() => setAdding(false), 1400);
  }

  return (
    <article className="group flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden bg-cream-100 dark:bg-brand-900">
        {/* Badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1">
          {discount > 0 && (
            <span className="bg-brand-900 dark:bg-gold-600 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white dark:text-brand-950">
              -{discount}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-gold-600 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white dark:text-brand-950">
              New
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(product); }}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 dark:bg-brand-950/80 backdrop-blur-sm transition-all hover:scale-110"
        >
          <svg className={`h-3.5 w-3.5 transition-colors ${wishlisted ? 'fill-red-500 text-red-500' : 'fill-none text-brand-400 dark:text-brand-500'}`} stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        <Link href={`/products/${product.slug}`} aria-label={product.name}>
          <div className="relative aspect-square w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </Link>

        {/* Add to bag — slides up on hover */}
        <button
          onClick={handleAddToBag}
          disabled={adding || product.stock === 0}
          aria-label={`Add ${product.name} to bag`}
          className="
            absolute bottom-0 left-0 right-0 z-10
            translate-y-full
            bg-brand-900/95 dark:bg-brand-800/95 py-3
            text-[10px] font-medium uppercase tracking-[0.2em] text-white
            transition-transform duration-300 ease-out
            hover:bg-brand-800 dark:hover:bg-brand-700
            group-hover:translate-y-0
            hidden sm:block
            disabled:bg-brand-700
          "
        >
          {adding ? '✓ Added to Bag' : product.stock === 0 ? 'Out of Stock' : 'Add to Bag'}
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col pt-3.5">
        <Link
          href={`/category/${product.categorySlug}`}
          className="text-[9px] font-medium uppercase tracking-[0.22em] text-brand-400 transition-colors hover:text-gold-700 dark:text-brand-600 dark:hover:text-gold-500"
          tabIndex={-1}
        >
          {product.category}
        </Link>

        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-1.5 font-sans text-[13px] font-medium leading-snug text-brand-900 dark:text-brand-200 transition-colors hover:text-gold-700 dark:hover:text-gold-400 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-[13px] font-semibold text-brand-900 dark:text-white">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-[11px] text-brand-400 dark:text-brand-600 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        {/* Mobile add button */}
        <button
          onClick={handleAddToBag}
          disabled={adding || product.stock === 0}
          className="
            sm:hidden mt-3
            w-full border border-brand-200 dark:border-brand-700 py-2.5
            text-[10px] font-medium uppercase tracking-[0.2em] text-brand-700 dark:text-brand-400
            transition-all duration-200
            hover:border-brand-900 hover:bg-brand-900 hover:text-white
            dark:hover:border-gold-600 dark:hover:bg-gold-600 dark:hover:text-brand-950
            active:scale-[0.98]
            disabled:border-brand-100 dark:disabled:border-brand-800 disabled:text-brand-300 dark:disabled:text-brand-700
          "
        >
          {adding ? '✓ Added' : product.stock === 0 ? 'Out of Stock' : 'Add to Bag'}
        </button>
      </div>
    </article>
  );
}
