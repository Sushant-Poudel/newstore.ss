'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/constants';

export default function CartPage() {
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();

  const delivery = totalPrice >= 2000 ? 0 : 150;
  const grandTotal = totalPrice + delivery;

  if (items.length === 0) {
    return (
      <div className="container-xl flex min-h-[70vh] flex-col items-center justify-center gap-6 py-20 text-center">
        <svg className="h-16 w-16 text-cream-300 dark:text-brand-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <div>
          <h1 className="font-serif text-2xl font-semibold text-brand-900 dark:text-white">Your bag is empty</h1>
          <p className="mt-2 text-sm text-brand-500 dark:text-brand-500">
            Looks like you haven&apos;t added anything yet.
          </p>
        </div>
        <Link href="/products" className="btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-xl py-10">
      <div className="flex items-baseline justify-between">
        <h1 className="font-serif text-3xl font-semibold text-brand-900 dark:text-white">
          Your Bag
          <span className="ml-2 font-sans text-base font-normal text-brand-400">
            ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </span>
        </h1>
        <button
          onClick={clearCart}
          className="text-[11px] font-medium uppercase tracking-widest text-brand-400 underline-offset-2 hover:text-brand-900 dark:hover:text-white hover:underline transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Item list */}
        <div className="space-y-3 lg:col-span-2">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex gap-4 border border-cream-200 dark:border-brand-800 bg-white dark:bg-brand-900 p-4 transition-shadow hover:shadow-sm"
            >
              <Link href={`/products/${product.slug}`} className="shrink-0">
                <div className="relative h-24 w-24 overflow-hidden bg-cream-100 dark:bg-brand-800">
                  <Image src={product.image} alt={product.name} fill sizes="96px" className="object-cover" />
                </div>
              </Link>

              <div className="flex flex-1 flex-col justify-between gap-2 min-w-0">
                <div>
                  <Link
                    href={`/products/${product.slug}`}
                    className="block truncate text-sm font-medium text-brand-900 dark:text-brand-200 hover:text-gold-700 dark:hover:text-gold-400 transition-colors"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-0.5 text-[11px] uppercase tracking-wider text-brand-400 dark:text-brand-600">
                    {product.brand} · {product.category}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-cream-300 dark:border-brand-700">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      aria-label="Decrease quantity"
                      className="flex h-8 w-8 items-center justify-center text-brand-500 dark:text-brand-400 transition-colors hover:bg-cream-100 dark:hover:bg-brand-800 hover:text-brand-900 dark:hover:text-white active:scale-90"
                    >
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="min-w-[2rem] text-center text-sm font-semibold text-brand-900 dark:text-white">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      aria-label="Increase quantity"
                      className="flex h-8 w-8 items-center justify-center text-brand-500 dark:text-brand-400 transition-colors hover:bg-cream-100 dark:hover:bg-brand-800 hover:text-brand-900 dark:hover:text-white active:scale-90"
                    >
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-brand-900 dark:text-white">
                      {formatPrice(product.price * quantity)}
                    </span>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      aria-label={`Remove ${product.name}`}
                      className="text-brand-300 dark:text-brand-700 transition-colors hover:text-red-500 active:scale-90"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-widest text-brand-400 underline-offset-2 hover:text-brand-900 dark:hover:text-white hover:underline transition-colors"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Continue Shopping
          </Link>
        </div>

        {/* Summary */}
        <div className="h-fit border border-cream-200 dark:border-brand-800 bg-white dark:bg-brand-900 p-6">
          <h2 className="font-serif text-lg font-semibold text-brand-900 dark:text-white">Order Summary</h2>

          <div className="mt-5 space-y-3">
            <div className="flex justify-between text-sm text-brand-600 dark:text-brand-400">
              <span>Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-sm text-brand-600 dark:text-brand-400">
              <span>Delivery</span>
              {delivery === 0 ? (
                <span className="font-medium text-emerald-600 dark:text-emerald-400">Free</span>
              ) : (
                <span>{formatPrice(delivery)}</span>
              )}
            </div>

            {delivery > 0 && (
              <p className="text-[11px] text-gold-700 dark:text-gold-400 bg-gold-50 dark:bg-gold-900/20 border border-gold-200 dark:border-gold-800 px-3 py-2">
                Add {formatPrice(2000 - totalPrice)} more for free delivery
              </p>
            )}

            <div className="flex justify-between border-t border-cream-200 dark:border-brand-800 pt-3 text-base font-semibold text-brand-900 dark:text-white">
              <span>Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Link
              href="/checkout"
              className="flex w-full items-center justify-center gap-2 bg-brand-900 dark:bg-gold-600 py-4 text-sm font-semibold uppercase tracking-widest text-white dark:text-brand-950 transition-colors hover:bg-brand-700 dark:hover:bg-gold-500 active:scale-[0.98]"
            >
              Proceed to Checkout →
            </Link>
          </div>

          <ul className="mt-6 space-y-2 border-t border-cream-200 dark:border-brand-800 pt-5">
            {[
              'Free delivery above NPR 2,000',
              'Cash on Delivery available',
              '7-day easy returns',
              'Authentic products guaranteed',
            ].map((point) => (
              <li key={point} className="flex items-center gap-2 text-[11px] text-brand-500 dark:text-brand-500">
                <svg className="h-3 w-3 shrink-0 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
