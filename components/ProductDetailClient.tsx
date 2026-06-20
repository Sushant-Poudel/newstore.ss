'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { useWishlist } from '@/context/WishlistContext';
import type { Product } from '@/lib/types';
import { formatPrice, getDiscount } from '@/lib/constants';
import ProductCard from '@/components/ProductCard';
import Breadcrumb from '@/components/Breadcrumb';
import AnimateIn from '@/components/AnimateIn';

interface Props {
  product: Product;
  related: Product[];
}

const SIZE_OPTIONS: Record<string, string[]> = {
  shoes: ['38', '39', '40', '41', '42', '43', '44', '45'],
  clothing: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
};

export default function ProductDetailClient({ product, related }: Props) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const { toggle, isWishlisted } = useWishlist();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [sizeError, setSizeError] = useState(false);

  const wishlisted = isWishlisted(product.id);
  const sizes = SIZE_OPTIONS[product.categorySlug] ?? [];
  const discount = product.originalPrice
    ? getDiscount(product.price, product.originalPrice)
    : 0;

  function requireSize(): boolean {
    if (sizes.length > 0 && !selectedSize) {
      setSizeError(true);
      return false;
    }
    return true;
  }

  function handleAddToCart() {
    if (!requireSize()) return;
    addToCart(product, qty);
    showToast(product.name, product.image, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  function handleBuyNow() {
    if (!requireSize()) return;
    addToCart(product, qty);
    router.push('/checkout');
  }

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
        {/* Images */}
        <div className="flex flex-col gap-3">
          <div className="relative aspect-[4/5] overflow-hidden bg-cream-100 dark:bg-brand-900">
            <Image
              src={product.images[activeImage] ?? product.image}
              alt={product.name}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
              className="object-cover transition-opacity duration-300"
            />
            {discount > 0 && (
              <span className="absolute left-4 top-4 bg-brand-900 dark:bg-gold-600 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white dark:text-brand-950">
                -{discount}%
              </span>
            )}
            {product.isNew && (
              <span className="absolute left-4 top-12 bg-gold-600 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white dark:text-brand-950">
                New
              </span>
            )}
          </div>

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
                      ? 'ring-2 ring-brand-900 dark:ring-gold-600 ring-offset-1'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <AnimateIn from="right">
          <div className="flex flex-col gap-6">
            <div>
              <Link
                href={`/category/${product.categorySlug}`}
                className="eyebrow hover:text-gold-800 dark:hover:text-gold-400 transition-colors"
              >
                {product.category}
              </Link>
              <h1 className="mt-2 font-serif text-3xl font-semibold leading-tight text-brand-900 dark:text-white sm:text-4xl">
                {product.name}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex gap-0.5" aria-label={`Rated ${product.rating} out of 5`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    className={`h-4 w-4 ${i < Math.round(product.rating) ? 'text-gold-500' : 'text-cream-300 dark:text-brand-800'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-medium text-brand-900 dark:text-brand-300">{product.rating}</span>
              <span className="text-sm text-brand-400">·</span>
              <span className="text-sm text-brand-400">{product.reviewCount} reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-serif text-3xl font-semibold text-brand-900 dark:text-white">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-brand-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="text-sm font-medium text-gold-700 dark:text-gold-400">
                    Save {formatPrice(product.originalPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-sm leading-relaxed text-brand-600 dark:text-brand-400">{product.description}</p>

            {/* Size selector */}
            {sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-500">
                    Size {selectedSize && <span className="text-brand-900 dark:text-white">— {selectedSize}</span>}
                  </span>
                  <button className="text-[10px] underline text-brand-400 hover:text-brand-900 dark:hover:text-white transition-colors">
                    Size Guide
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => { setSelectedSize(size); setSizeError(false); }}
                      className={`h-10 min-w-[2.5rem] px-3 border text-sm font-medium transition-all ${
                        selectedSize === size
                          ? 'border-brand-900 bg-brand-900 text-white dark:border-gold-500 dark:bg-gold-500 dark:text-brand-950'
                          : 'border-cream-200 dark:border-brand-700 text-brand-700 dark:text-brand-400 hover:border-brand-900 dark:hover:border-gold-600'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {sizeError && (
                  <p className="mt-1.5 text-xs text-red-500">Please select a size before adding to bag.</p>
                )}
              </div>
            )}

            {/* Stock */}
            <div className="flex items-center gap-2">
              <div
                className={`h-2 w-2 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : product.stock > 0 ? 'bg-amber-500' : 'bg-red-500'}`}
                aria-hidden="true"
              />
              <span className="text-sm text-brand-600 dark:text-brand-400">
                {product.stock > 10
                  ? 'In Stock'
                  : product.stock > 0
                  ? `Only ${product.stock} left!`
                  : 'Out of Stock'}
              </span>
            </div>

            {/* Qty + Actions */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-brand-600 dark:text-brand-500">
                  Quantity
                </span>
                <div className="flex items-center border border-brand-200 dark:border-brand-700">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    aria-label="Decrease quantity"
                    className="flex h-10 w-10 items-center justify-center text-brand-600 dark:text-brand-400 transition-colors hover:bg-cream-100 dark:hover:bg-brand-800 hover:text-brand-900 dark:hover:text-white active:scale-90"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="min-w-[2.5rem] text-center text-sm font-semibold text-brand-900 dark:text-white">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(Math.min(product.stock, qty + 1))}
                    aria-label="Increase quantity"
                    className="flex h-10 w-10 items-center justify-center text-brand-600 dark:text-brand-400 transition-colors hover:bg-cream-100 dark:hover:bg-brand-800 hover:text-brand-900 dark:hover:text-white active:scale-90"
                  >
                    <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Buy Now */}
              <button
                onClick={handleBuyNow}
                disabled={product.stock === 0}
                className="btn-primary w-full justify-center py-4 text-sm"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {product.stock === 0 ? 'Out of Stock' : 'Buy Now'}
              </button>

              {/* Add to bag + Wishlist */}
              <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className={`btn-outline flex-1 justify-center py-3.5 text-sm transition-all ${
                  added ? 'border-emerald-600 text-emerald-700 dark:border-emerald-700 dark:text-emerald-400' : ''
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
              <button
                onClick={() => toggle(product)}
                aria-label={wishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                className={`flex h-[50px] w-[50px] shrink-0 items-center justify-center border transition-all ${
                  wishlisted
                    ? 'border-red-300 dark:border-red-800 text-red-500'
                    : 'border-cream-200 dark:border-brand-700 text-brand-400 dark:text-brand-600 hover:border-red-300 dark:hover:border-red-800 hover:text-red-500'
                }`}
              >
                <svg className={`h-5 w-5 ${wishlisted ? 'fill-current' : 'fill-none'}`} stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
              </div>
            </div>

            {/* Key features */}
            <div className="border-t border-cream-200 dark:border-brand-800 pt-6">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-500">
                Key Features
              </p>
              <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-brand-600 dark:text-brand-400">
                    <svg className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-600 dark:text-gold-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-[11px] text-brand-400 dark:text-brand-700">
              SKU: {product.sku} · Brand: {product.brand}
            </p>
          </div>
        </AnimateIn>
      </div>

      {/* Long description */}
      <AnimateIn className="mt-14">
        <div className="border-t border-cream-200 dark:border-brand-800 pt-10">
          <h2 className="font-serif text-xl font-semibold text-brand-900 dark:text-white">Product Description</h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-brand-600 dark:text-brand-400">
            {product.longDescription}
          </p>
        </div>
      </AnimateIn>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-16" aria-labelledby="related-heading">
          <AnimateIn>
            <h2 id="related-heading" className="section-title dark:text-white">You May Also Like</h2>
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

      {/* Sticky mobile bar */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 flex items-center gap-3 border-t border-cream-200 dark:border-brand-800 bg-white dark:bg-brand-950 px-4 py-3 shadow-xl sm:hidden"
        aria-label="Mobile purchase bar"
      >
        <div className="flex-1 min-w-0">
          <p className="truncate text-xs font-medium text-brand-700 dark:text-brand-300">{product.name}</p>
          <p className="text-sm font-bold text-brand-900 dark:text-white">{formatPrice(product.price)}</p>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`btn-outline px-4 py-3 text-xs ${added ? 'border-emerald-600 text-emerald-700' : ''}`}
        >
          {added ? '✓ Added' : 'Add to Bag'}
        </button>
        <button
          onClick={handleBuyNow}
          disabled={product.stock === 0}
          className="btn-primary px-4 py-3 text-xs"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
