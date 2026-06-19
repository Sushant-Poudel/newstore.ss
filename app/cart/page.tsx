'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatPrice, WHATSAPP_NUMBER } from '@/lib/data';

export default function CartPage() {
  const { items, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container-xl flex min-h-[60vh] flex-col items-center justify-center gap-5 py-20 text-center">
        <span className="text-6xl">🛒</span>
        <h1 className="text-2xl font-bold text-slate-900">Your cart is empty</h1>
        <p className="text-slate-500">
          Looks like you haven&apos;t added anything yet. Browse our collection!
        </p>
        <Link href="/products" className="btn-primary">
          Start Shopping
        </Link>
      </div>
    );
  }

  const delivery = totalPrice >= 2000 ? 0 : 150;
  const grandTotal = totalPrice + delivery;

  const whatsappMsg = encodeURIComponent(
    `Hello StyleNepal! 👋\n\nI'd like to place an order:\n\n` +
      items.map((i) => `• ${i.product.name} × ${i.quantity} = ${formatPrice(i.product.price * i.quantity)}`).join('\n') +
      `\n\nDelivery: ${delivery === 0 ? 'FREE' : formatPrice(delivery)}` +
      `\n*Grand Total: ${formatPrice(grandTotal)}*\n\nPlease confirm my order. Thank you!`
  );

  return (
    <div className="container-xl py-8">
      <h1 className="section-title">
        Shopping Cart
        <span className="ml-2 text-lg font-normal text-slate-500">({totalItems} items)</span>
      </h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-3">
        {/* Items list */}
        <div className="space-y-4 lg:col-span-2">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="flex gap-4 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-100"
            >
              <Link href={`/products/${product.slug}`} className="shrink-0">
                <div className="relative h-24 w-24 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="96px"
                    className="object-cover"
                  />
                </div>
              </Link>

              <div className="flex flex-1 flex-col gap-1 min-w-0">
                <Link
                  href={`/products/${product.slug}`}
                  className="truncate font-semibold text-slate-900 hover:text-brand-600"
                >
                  {product.name}
                </Link>
                <p className="text-xs text-slate-500">{product.category} &bull; {product.brand}</p>
                <p className="text-sm font-bold text-brand-600">{formatPrice(product.price)}</p>

                <div className="mt-auto flex items-center justify-between">
                  {/* Qty controls */}
                  <div className="flex items-center rounded-lg border border-gray-200">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      aria-label="Decrease quantity"
                      className="flex h-8 w-8 items-center justify-center text-slate-500 hover:text-brand-600"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="min-w-[2rem] text-center text-sm font-semibold">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      aria-label="Increase quantity"
                      className="flex h-8 w-8 items-center justify-center text-slate-500 hover:text-brand-600"
                    >
                      <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-slate-900">
                      {formatPrice(product.price * quantity)}
                    </span>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      aria-label={`Remove ${product.name}`}
                      className="text-slate-400 hover:text-brand-600 transition-colors"
                    >
                      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center justify-between">
            <Link href="/products" className="text-sm font-semibold text-brand-600 hover:underline">
              &larr; Continue Shopping
            </Link>
            <button
              onClick={clearCart}
              className="text-sm text-slate-400 hover:text-brand-600 transition-colors"
            >
              Clear cart
            </button>
          </div>
        </div>

        {/* Order summary */}
        <div className="h-fit rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
          <h2 className="text-lg font-bold text-slate-900">Order Summary</h2>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal ({totalItems} items)</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery</span>
              <span className={delivery === 0 ? 'font-semibold text-emerald-600' : ''}>
                {delivery === 0 ? 'FREE' : formatPrice(delivery)}
              </span>
            </div>
            {delivery > 0 && (
              <p className="rounded-lg bg-brand-50 px-3 py-2 text-xs text-brand-700">
                Add {formatPrice(2000 - totalPrice)} more for free delivery!
              </p>
            )}
            <div className="flex justify-between border-t border-gray-200 pt-3 text-base font-bold text-slate-900">
              <span>Grand Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}?text=${whatsappMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-green-700"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.091.535 4.06 1.47 5.782L0 24l6.335-1.418A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.95 0-3.77-.524-5.33-1.435l-.38-.226-3.97.888.948-3.847-.248-.397A9.772 9.772 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
              </svg>
              Order via WhatsApp
            </a>

            <p className="text-center text-xs text-slate-400">
              or call us at +977-9800000000
            </p>
          </div>

          <div className="mt-6 space-y-2 rounded-xl bg-gray-50 p-4 text-xs text-slate-500">
            <p className="flex items-center gap-2">
              <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Free delivery on orders above NPR 2,000
            </p>
            <p className="flex items-center gap-2">
              <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Cash on Delivery available
            </p>
            <p className="flex items-center gap-2">
              <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              7-day easy returns
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
