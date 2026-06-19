'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import type { Product } from '@/lib/types';
import { formatPrice, getDiscount, WHATSAPP_NUMBER } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import Breadcrumb from '@/components/Breadcrumb';
import AnimateIn from '@/components/AnimateIn';

interface Props {
  product: Product;
  related: Product[];
}

export default function ProductDetailClient({ product, related }: Props) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const discount = product.originalPrice
    ? getDiscount(product.price, product.originalPrice)
    : 0;

  function handleAddToCart() {
    addToCart(product, qty);
    showToast(product.name, product.image, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  const whatsappMsg = encodeURIComponent(
    `Hi StyleNepal! 👋\n\nI'd like to order:\n*${product.name}*\nQty: ${qty}\nPrice: ${formatPrice(product.price * qty)}\n\nPlease confirm availability.`
  );

  return (
    <div className="container-xl py-8 pb-28 sm:pb-8">
      <Breadcrumb
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: product.category, href: `/category/${product.categorySlug}` },
          { label: product.name },
        ]}
      />

      <div className="mt-8 grid gap-12 lg:grid-cols-2">
        {/* ── Images ───────────────────────────────────────── */}
        <div className="flex flex-col gap-3">
          <div className="relative aspect-[4/5] overflow-hidden bg-cream-100">
            <Image
              src={product.images[activeImage] ?? product.image}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover transition-opacity duration-300"
            />
            {discount > 0 && (
              <span className="absolute left-4 top-4 bg-brand-900 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
                -{discount}%
              </span>
            )}
            {product.isNew && (
              <span className="absolute left-4 top-12 bg-gold-600 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
                New
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-3 gap-2">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                  aria-pressed={activeImage === i}
                  className={`relative aspect-square overflow-hidden transition-all duration-200 ${
                    activeImage === i
                      ? 'ring-2 ring-brand-900 ring-offset-1'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Info ─────────────────────────────────────────── */}
        <AnimateIn from="right">
          <div className="flex flex-col gap-6">
            {/* Category + name */}
            <div>
              <Link
                href={`/category/${product.categorySlug}`}
                className="eyebrow hover:text-gold-800 transition-colors"
              >
                {product.category}
              </Link>
              <h1 className="mt-2 font-serif text-3xl font-semibold leading-tight text-brand-900 sm:text-4xl">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5" aria-label={`Rated ${product.rating} out of 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${i < Math.round(product.rating) ? 'text-gold-500' : 'text-cream-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-medium text-brand-900">{product.rating}</span>
              <span className="text-sm text-brand-400">·</span>
              <span className="text-sm text-brand-400">{product.reviewCount} reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-3xl font-semibold text-brand-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-brand-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-sm font-medium text-gold-700">
                    Save {formatPrice(product.originalPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-brand-600">{product.description}</p>

            {/* Stock */}
            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : product.stock > 0 ? 'bg-amber-500' : 'bg-red-500'}`}
                aria-hidden="true"
              />
              <span className="text-sm text-brand-600">
                {product.stock > 10
                  ? 'In Stock'
                  : product.stock > 0
                  ? `Only ${product.stock} left!`
                  : 'Out of Stock'}
              </span>
            </div>

            {/* Qty + Actions */}
            <div className="flex flex-col gap-3">
              {/* Qty row */}
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                  Quantity
                </span>
                <div className="flex items-center border border-brand-200">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    aria-label="Decrease quantity"
                    className="flex h-10 w-10 items-center justify-center text-brand-600 transition-colors hover:bg-cream-100 hover:text-brand-900 active:scale-90"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="min-w-[2.5rem] text-center text-sm font-semibold text-brand-900">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(Math.min(product.stock, qty + 1))}
                    aria-label="Increase quantity"
                    className="flex h-10 w-10 items-center justify-center text-brand-600 transition-colors hover:bg-cream-100 hover:text-brand-900 active:scale-90"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Add to bag */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`btn-primary w-full justify-center py-4 text-sm transition-all ${
                  added ? 'bg-emerald-700 hover:bg-emerald-700' : ''
                }`}
              >
                {added ? (
                  <>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Added to Bag
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Add to Bag
                  </>
                )}
              </button>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 border border-green-600 py-3.5 text-xs font-semibold uppercase tracking-widest text-green-700 transition-colors hover:bg-green-600 hover:text-white active:scale-[0.98]"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.091.535 4.06 1.47 5.782L0 24l6.335-1.418A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.95 0-3.77-.524-5.33-1.435l-.38-.226-3.97.888.948-3.847-.248-.397A9.772 9.772 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
                </svg>
                Order via WhatsApp
              </a>
            </div>

            {/* Key features */}
            <div className="border-t border-cream-200 pt-6">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-500">
                Key Features
              </p>
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-brand-600">
                    <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* SKU */}
            <p className="text-[11px] text-brand-400">
              SKU: {product.sku} · Brand: {product.brand}
            </p>
          </div>
        </AnimateIn>
      </div>

      {/* Long description */}
      <AnimateIn className="mt-14">
        <div className="border-t border-cream-200 pt-10">
          <h2 className="font-serif text-xl font-semibold text-brand-900">Product Description</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-brand-600">
            {product.longDescription}
          </p>
        </div>
      </AnimateIn>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16" aria-labelledby="related-heading">
          <AnimateIn>
            <h2 id="related-heading" className="section-title">You May Also Like</h2>
          </AnimateIn>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {related.map((p, i) => (
              <AnimateIn key={p.id} delay={i * 0.07}>
                <ProductCard product={p} />
              </AnimateIn>
            ))}
          </div>
        </section>
      )}

      {/* Sticky mobile add-to-bag bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 flex items-center gap-3 border-t border-cream-200 bg-white px-4 py-3 shadow-xl sm:hidden"
        aria-label="Mobile purchase bar"
      >
        <div className="flex-1 min-w-0">
          <p className="truncate text-xs font-medium text-brand-700">{product.name}</p>
          <p className="text-sm font-bold text-brand-900">{formatPrice(product.price)}</p>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`btn-primary px-6 py-3 text-xs ${added ? 'bg-emerald-700 hover:bg-emerald-700' : ''}`}
        >
          {added ? '✓ Added' : 'Add to Bag'}
        </button>
      </div>
    </div>
  );
}
