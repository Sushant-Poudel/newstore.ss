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

  const discount = product.originalPrice ? getDiscount(product.price, product.originalPrice) : 0;

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
    <article className="group">
      {/* Image */}
      <div className="relative overflow-hidden bg-cream-100 dark:bg-brand-900">
        {/* Badges */}
        <div className="absolute left-0 top-3 z-10 flex flex-col gap-0.5">
          {discount > 0 && (
            <span className="bg-brand-900 dark:bg-white px-2.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.15em] text-white dark:text-brand-950">
              -{discount}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-gold-600 px-2.5 py-0.5 text-[9px] font-medium uppercase tracking-[0.15em] text-white">
              New
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(product); }}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
          className="absolute right-2.5 top-2.5 z-10 flex h-7 w-7 items-center justify-center bg-white/90 dark:bg-brand-950/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <svg className={`h-3.5 w-3.5 ${wishlisted ? 'fill-red-500 text-red-500' : 'fill-none text-brand-600 dark:text-brand-400'}`} stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>

        {/* Portrait image — 3:4 like fashion sites */}
        <Link href={`/products/${product.slug}`} aria-label={product.name}>
          <div className="relative aspect-[3/4] w-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={`object-cover transition-all duration-500 ease-out ${
                product.images?.[1]
                  ? 'group-hover:opacity-0 group-hover:scale-[1.02]'
                  : 'group-hover:scale-[1.03]'
              }`}
            />
            {product.images?.[1] && (
              <Image
                src={product.images[1]}
                alt={`${product.name} alternate view`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover opacity-0 transition-all duration-500 ease-out group-hover:opacity-100 group-hover:scale-[1.02]"
              />
            )}
            {product.stock === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/60 dark:bg-brand-950/60">
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400">Out of Stock</span>
              </div>
            )}
          </div>
        </Link>

        {/* Quick add — slides up */}
        {product.stock > 0 && (
          <button
            onClick={handleAddToBag}
            disabled={adding}
            className="absolute bottom-0 left-0 right-0 z-10 translate-y-full bg-brand-950/95 py-3 text-[9px] font-medium uppercase tracking-[0.22em] text-white transition-transform duration-300 ease-out group-hover:translate-y-0 hidden sm:block"
          >
            {adding ? '✓ Added' : 'Quick Add'}
          </button>
        )}
      </div>

      {/* Info */}
      <div className="pt-3.5 pb-1">
        <Link href={`/category/${product.categorySlug}`} tabIndex={-1}>
          <p className="text-[9px] font-medium uppercase tracking-[0.22em] text-brand-400 dark:text-brand-600">
            {product.category}
          </p>
        </Link>

        <Link href={`/products/${product.slug}`}>
          <h3 className="mt-1 text-[13px] font-medium leading-snug text-brand-900 dark:text-brand-200 transition-colors hover:text-gold-700 dark:hover:text-gold-400 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-[13px] font-medium text-brand-900 dark:text-white">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-[11px] text-brand-400 dark:text-brand-600 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        {product.rating > 0 && (
          <div className="mt-1.5 flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className={`h-2.5 w-2.5 ${i < Math.round(product.rating) ? 'text-gold-500 fill-gold-500' : 'text-cream-300 dark:text-brand-800 fill-current'}`} viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            {product.reviewCount > 0 && (
              <span className="text-[9px] text-brand-400 dark:text-brand-600">({product.reviewCount})</span>
            )}
          </div>
        )}

        {/* Mobile add */}
        {product.stock > 0 && (
          <button
            onClick={handleAddToBag}
            disabled={adding}
            className="sm:hidden mt-3 w-full border border-brand-200 dark:border-brand-700 py-2.5 text-[9px] font-medium uppercase tracking-[0.22em] text-brand-700 dark:text-brand-400 transition-all hover:border-brand-900 hover:bg-brand-900 hover:text-white dark:hover:border-white dark:hover:bg-white dark:hover:text-brand-950"
          >
            {adding ? '✓ Added' : 'Add to Bag'}
          </button>
        )}
      </div>
    </article>
  );
}
