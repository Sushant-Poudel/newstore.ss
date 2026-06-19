'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import type { Product } from '@/lib/types';
import { formatPrice, getDiscount } from '@/lib/constants';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [adding, setAdding] = useState(false);

  const discount = product.originalPrice
    ? getDiscount(product.price, product.originalPrice)
    : 0;

  function handleAddToBag(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (adding) return;

    setAdding(true);
    addToCart(product, 1);
    showToast(product.name, product.image, 1);
    setTimeout(() => setAdding(false), 1200);
  }

  return (
    <article className="group flex flex-col">
      {/* ── Image block ─────────────────────────────────────── */}
      <div className="relative overflow-hidden bg-cream-100">
        {/* Badges */}
        <div className="absolute left-2.5 top-2.5 z-10 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="bg-brand-900 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white">
              -{discount}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-gold-600 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white">
              New
            </span>
          )}
        </div>

        {/* Image link */}
        <Link href={`/products/${product.slug}`} aria-label={product.name}>
          <div className="relative aspect-[4/5] w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
        </Link>

        {/* "Add to Bag" slides up from bottom on hover (desktop) */}
        <button
          onClick={handleAddToBag}
          disabled={adding || product.stock === 0}
          aria-label={`Add ${product.name} to bag`}
          className="
            absolute bottom-0 left-0 right-0 z-10
            translate-y-full
            bg-brand-900 py-3.5
            text-[11px] font-semibold uppercase tracking-widest text-white
            transition-all duration-300 ease-out
            hover:bg-brand-700
            group-hover:translate-y-0
            hidden sm:block
            disabled:bg-brand-600
          "
        >
          {adding ? '✓ Added' : product.stock === 0 ? 'Out of Stock' : 'Add to Bag'}
        </button>
      </div>

      {/* ── Info ────────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-1 pt-3 pb-2">
        <Link
          href={`/category/${product.categorySlug}`}
          className="eyebrow hover:text-gold-800 transition-colors"
          tabIndex={-1}
        >
          {product.category}
        </Link>

        <Link href={`/products/${product.slug}`}>
          <h3 className="font-sans text-sm font-medium leading-snug text-brand-900 transition-colors hover:text-gold-700 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Stars */}
        <div className="flex items-center gap-1.5 mt-0.5" aria-label={`${product.rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={`h-2.5 w-2.5 ${i < Math.round(product.rating) ? 'text-gold-500' : 'text-cream-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
          <span className="text-[11px] text-brand-400">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-sm font-semibold text-brand-900">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-brand-400 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>

        {/* Mobile add to bag button */}
        <button
          onClick={handleAddToBag}
          disabled={adding || product.stock === 0}
          className="
            sm:hidden mt-2
            w-full border border-brand-900 py-2.5
            text-[11px] font-semibold uppercase tracking-widest text-brand-900
            transition-all duration-200
            hover:bg-brand-900 hover:text-white
            active:scale-[0.98]
            disabled:border-brand-400 disabled:text-brand-400
          "
        >
          {adding ? '✓ Added' : product.stock === 0 ? 'Out of Stock' : 'Add to Bag'}
        </button>
      </div>
    </article>
  );
}
