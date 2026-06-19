'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import type { Product } from '@/lib/types';
import { formatPrice, getDiscount, WHATSAPP_NUMBER } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import Breadcrumb from '@/components/Breadcrumb';

interface Props {
  product: Product;
  related: Product[];
}

export default function ProductDetailClient({ product, related }: Props) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const discount = product.originalPrice ? getDiscount(product.price, product.originalPrice) : 0;

  function handleAddToCart() {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  const whatsappMsg = encodeURIComponent(
    `Hi! I want to order:\n*${product.name}*\nQty: ${qty}\nPrice: ${formatPrice(product.price)}\n\nPlease confirm availability.`
  );

  return (
    <div className="container-xl py-8">
      <Breadcrumb
        crumbs={[
          { label: 'Home', href: '/' },
          { label: 'Products', href: '/products' },
          { label: product.category, href: `/category/${product.categorySlug}` },
          { label: product.name },
        ]}
      />

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        {/* Images */}
        <div className="flex flex-col gap-3">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
            <Image
              src={product.images[activeImage] ?? product.image}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover"
            />
            {discount > 0 && (
              <span className="absolute left-4 top-4 rounded-lg bg-brand-600 px-3 py-1 text-sm font-bold text-white">
                -{discount}%
              </span>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`relative aspect-square w-20 overflow-hidden rounded-lg ring-2 transition-all ${
                    activeImage === i ? 'ring-brand-500' : 'ring-gray-200 hover:ring-brand-300'
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${product.name} view ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          <div>
            <Link
              href={`/category/${product.categorySlug}`}
              className="text-sm font-semibold uppercase tracking-wider text-brand-600 hover:underline"
            >
              {product.category}
            </Link>
            <h1 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">{product.name}</h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`h-5 w-5 ${i < Math.round(product.rating) ? 'text-amber-400' : 'text-gray-200'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm font-semibold text-slate-900">{product.rating}</span>
            <span className="text-sm text-slate-500">({product.reviewCount} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-end gap-3">
            <span className="text-3xl font-black text-slate-900">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="mb-0.5 text-lg text-slate-400 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="mb-0.5 rounded bg-brand-50 px-2 py-0.5 text-sm font-bold text-brand-700">
                  Save {formatPrice(product.originalPrice - product.price)}
                </span>
              </>
            )}
          </div>

          <p className="leading-relaxed text-slate-600">{product.description}</p>

          {/* Stock status */}
          <div className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${product.stock > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}
              aria-hidden="true"
            />
            <span className="text-sm font-medium text-slate-700">
              {product.stock > 0 ? `In Stock (${product.stock} left)` : 'Out of Stock'}
            </span>
          </div>

          {/* Qty + Add to cart */}
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center rounded-lg border border-gray-200 bg-white">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                aria-label="Decrease quantity"
                className="flex h-11 w-11 items-center justify-center text-slate-600 transition-colors hover:bg-gray-50 hover:text-brand-600"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="min-w-[2.5rem] text-center text-sm font-semibold">{qty}</span>
              <button
                onClick={() => setQty(Math.min(product.stock, qty + 1))}
                aria-label="Increase quantity"
                className="flex h-11 w-11 items-center justify-center text-slate-600 transition-colors hover:bg-gray-50 hover:text-brand-600"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`flex-1 ${added ? 'btn-secondary' : 'btn-primary'}`}
            >
              {added ? '✓ Added to Cart!' : 'Add to Cart'}
            </button>
          </div>

          {/* WhatsApp order */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-lg border-2 border-green-500 px-6 py-3 text-sm font-semibold text-green-700 transition-colors hover:bg-green-50"
          >
            <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.091.535 4.06 1.47 5.782L0 24l6.335-1.418A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.95 0-3.77-.524-5.33-1.435l-.38-.226-3.97.888.948-3.847-.248-.397A9.772 9.772 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
            </svg>
            Order via WhatsApp
          </a>

          {/* Features */}
          <div className="rounded-xl bg-gray-50 p-4">
            <h3 className="mb-3 text-sm font-bold text-slate-700">Key Features</h3>
            <ul className="space-y-2">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                  <svg className="h-4 w-4 shrink-0 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Meta */}
          <div className="border-t border-gray-100 pt-4 text-xs text-slate-400">
            <p>SKU: {product.sku} &bull; Brand: {product.brand}</p>
            <p className="mt-1">Tags: {product.tags.join(', ')}</p>
          </div>
        </div>
      </div>

      {/* Long description */}
      <div className="mt-12 rounded-xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
        <h2 className="text-xl font-bold text-slate-900">Product Description</h2>
        <p className="mt-4 leading-relaxed text-slate-600">{product.longDescription}</p>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <section className="mt-14" aria-labelledby="related-heading">
          <h2 id="related-heading" className="section-title">You May Also Like</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
