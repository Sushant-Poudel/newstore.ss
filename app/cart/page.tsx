'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatPrice, WHATSAPP_NUMBER } from '@/lib/data';

export default function CartPage() {
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();

  const delivery = totalPrice >= 2000 ? 0 : 150;
  const grandTotal = totalPrice + delivery;

  const whatsappMsg = encodeURIComponent(
    `Hello StyleNepal! 👋\n\nOrder request:\n\n` +
      items
        .map((i) => `• ${i.product.name} × ${i.quantity} — ${formatPrice(i.product.price * i.quantity)}`)
        .join('\n') +
      `\n\nDelivery: ${delivery === 0 ? 'FREE' : formatPrice(delivery)}` +
      `\n*Total: ${formatPrice(grandTotal)}*\n\nPlease confirm. Thank you!`
  );

  if (items.length === 0) {
    return (
      <div className="container-xl flex min-h-[70vh] flex-col items-center justify-center gap-6 py-20 text-center">
        <svg className="h-16 w-16 text-cream-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
        <div>
          <h1 className="font-serif text-2xl font-semibold text-brand-900">Your bag is empty</h1>
          <p className="mt-2 text-sm text-brand-500">
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
        <h1 className="font-serif text-3xl font-semibold text-brand-900">
          Your Bag
          <span className="ml-2 font-sans text-base font-normal text-brand-400">
            ({totalItems} {totalItems === 1 ? 'item' : 'items'})
          </span>
        </h1>
        <button
          onClick={clearCart}
          className="text-[11px] font-medium uppercase tracking-widest text-brand-400 underline-offset-2 hover:text-brand-900 hover:underline transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* ── Item list ────────────────────────────────── */}
        <div className="space-y-3 lg:col-span-2">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex gap-4 border border-cream-200 bg-white p-4 transition-shadow hover:shadow-sm"
            >
              {/* Image */}
              <Link href={`/products/${product.slug}`} className="shrink-0">
                <div className="relative h-24 w-24 overflow-hidden bg-cream-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
              </Link>

              {/* Info */}
              <div className="flex flex-1 flex-col justify-between gap-2 min-w-0">
                <div>
                  <Link
                    href={`/products/${product.slug}`}
                    className="block truncate text-sm font-medium text-brand-900 hover:text-gold-700 transition-colors"
                  >
                    {product.name}
                  </Link>
                  <p className="mt-0.5 text-[11px] uppercase tracking-wider text-brand-400">
                    {product.brand} · {product.category}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  {/* Qty */}
                  <div className="flex items-center border border-cream-300">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      aria-label="Decrease quantity"
                      className="flex h-8 w-8 items-center justify-center text-brand-500 transition-colors hover:bg-cream-100 hover:text-brand-900 active:scale-90"
                    >
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="min-w-[2rem] text-center text-sm font-semibold text-brand-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      aria-label="Increase quantity"
                      className="flex h-8 w-8 items-center justify-center text-brand-500 transition-colors hover:bg-cream-100 hover:text-brand-900 active:scale-90"
                    >
                      <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-brand-900">
                      {formatPrice(product.price * quantity)}
                    </span>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      aria-label={`Remove ${product.name}`}
                      className="text-brand-300 transition-colors hover:text-red-500 active:scale-90"
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
            className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-widest text-brand-400 underline-offset-2 hover:text-brand-900 hover:underline transition-colors"
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Continue Shopping
          </Link>
        </div>

        {/* ── Summary ──────────────────────────────────── */}
        <div className="h-fit border border-cream-200 bg-white p-6">
          <h2 className="font-serif text-lg font-semibold text-brand-900">Order Summary</h2>

          <div className="mt-5 space-y-3">
            <div className="flex justify-between text-sm text-brand-600">
              <span>Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-sm text-brand-600">
              <span>Delivery</span>
              {delivery === 0 ? (
                <span className="font-medium text-emerald-600">Free</span>
              ) : (
                <span>{formatPrice(delivery)}</span>
              )}
            </div>

            {delivery > 0 && (
              <p className="text-[11px] text-gold-700 bg-gold-50 border border-gold-200 px-3 py-2">
                Add {formatPrice(2000 - totalPrice)} more for free delivery
              </p>
            )}

            <div className="flex justify-between border-t border-cream-200 pt-3 text-base font-semibold text-brand-900">
              <span>Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
          </div>

          {/* Checkout via WhatsApp */}
          <div className="mt-6 space-y-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 bg-[#25D366] py-3.5 text-xs font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#1ebe5b] active:scale-[0.98]"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.091.535 4.06 1.47 5.782L0 24l6.335-1.418A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.95 0-3.77-.524-5.33-1.435l-.38-.226-3.97.888.948-3.847-.248-.397A9.772 9.772 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
              </svg>
              Checkout via WhatsApp
            </a>

            <p className="text-center text-xs text-brand-400">
              or call +977-9800000000
            </p>
          </div>

          {/* Trust points */}
          <ul className="mt-6 space-y-2 border-t border-cream-200 pt-5">
            {[
              'Free delivery above NPR 2,000',
              'Cash on Delivery available',
              '7-day easy returns',
              'Authentic products guaranteed',
            ].map((point) => (
              <li key={point} className="flex items-center gap-2 text-[11px] text-brand-500">
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
