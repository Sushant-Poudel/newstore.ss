'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/lib/types';
import { formatPrice, getDiscount } from '@/lib/data';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const discount = product.originalPrice
    ? getDiscount(product.price, product.originalPrice)
    : 0;

  return (
    <article className="group relative flex flex-col rounded-xl bg-white shadow-sm ring-1 ring-gray-100 card-hover overflow-hidden">
      {/* Badges */}
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-1">
        {discount > 0 && (
          <span className="rounded-md bg-brand-600 px-2 py-0.5 text-xs font-bold text-white">
            -{discount}%
          </span>
        )}
        {product.isNew && (
          <span className="rounded-md bg-emerald-500 px-2 py-0.5 text-xs font-bold text-white">
            NEW
          </span>
        )}
        {product.isBestseller && (
          <span className="rounded-md bg-amber-500 px-2 py-0.5 text-xs font-bold text-white">
            BESTSELLER
          </span>
        )}
      </div>

      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block overflow-hidden bg-gray-50">
        <div className="relative aspect-square w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-brand-600">
          {product.category}
        </p>

        <Link href={`/products/${product.slug}`}>
          <h3 className="line-clamp-2 font-semibold text-slate-900 group-hover:text-brand-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`h-3.5 w-3.5 ${i < Math.round(product.rating) ? 'text-amber-400' : 'text-gray-200'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs text-slate-500">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="mt-auto flex items-center gap-2">
          <span className="text-lg font-bold text-slate-900">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-sm text-slate-400 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        {/* Add to cart */}
        <button
          onClick={() => addToCart(product)}
          className="btn-primary mt-1 w-full py-2 text-xs"
          aria-label={`Add ${product.name} to cart`}
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Add to Cart
        </button>
      </div>
    </article>
  );
}
