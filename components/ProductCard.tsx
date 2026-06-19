'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/lib/types';
import { formatPrice, getDiscount } from '@/lib/data';

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const discount = product.originalPrice ? getDiscount(product.price, product.originalPrice) : 0;

  return (
    <article className="group relative flex flex-col bg-white">
      {/* Badges */}
      <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
        {discount > 0 && (
          <span className="bg-brand-900 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-white">
            -{discount}%
          </span>
        )}
        {product.isNew && (
          <span className="bg-gold-600 px-2 py-0.5 text-[10px] font-medium uppercase tracking-widest text-white">
            New
          </span>
        )}
      </div>

      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block overflow-hidden bg-cream-100">
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Add to Cart — slides up on hover */}
      <div className="absolute bottom-[calc(100%-100%+96px)] left-0 right-0 translate-y-full overflow-hidden transition-all duration-300 ease-out group-hover:translate-y-0 bg-brand-900/90 backdrop-blur-sm hidden sm:block"
        style={{ bottom: 'auto', top: 'calc(5/5 * 100% - 44px)', position: 'absolute', height: '44px' }}
      >
        <button
          onClick={() => addToCart(product)}
          className="w-full h-full flex items-center justify-center text-[11px] font-medium uppercase tracking-widest text-white hover:bg-brand-800 transition-colors"
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Bag
        </button>
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-1.5 pt-3 pb-4 px-0.5">
        <Link
          href={`/category/${product.categorySlug}`}
          className="eyebrow hover:text-gold-800 transition-colors"
        >
          {product.category}
        </Link>

        <Link href={`/products/${product.slug}`}>
          <h3 className="font-sans text-sm font-medium text-brand-900 leading-snug group-hover:text-gold-700 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
          <div className="flex gap-0.5" aria-label={`${product.rating} out of 5`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`h-3 w-3 ${i < Math.round(product.rating) ? 'text-gold-500' : 'text-cream-300'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-[11px] text-brand-400">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-sm font-semibold text-brand-900">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-brand-400 line-through">{formatPrice(product.originalPrice)}</span>
          )}
        </div>

        {/* Mobile add to cart */}
        <button
          onClick={() => addToCart(product)}
          className="sm:hidden mt-2 w-full border border-brand-900 py-2 text-[11px] font-medium uppercase tracking-widest text-brand-900 hover:bg-brand-900 hover:text-white transition-colors"
          aria-label={`Add ${product.name} to cart`}
        >
          Add to Bag
        </button>
      </div>
    </article>
  );
}
