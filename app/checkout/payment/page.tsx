'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { useCheckout } from '@/context/CheckoutContext';
import { formatPrice } from '@/lib/constants';
import type { SiteSettings } from '@/lib/db';

export default function PaymentPage() {
  const router = useRouter();
  const { items, totalPrice, clearCart } = useCart();
  const { shipping, clearShipping } = useCheckout();
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings').then((r) => r.json()).then(setSettings);
  }, []);

  const delivery = totalPrice >= 2000 ? 0 : 150;
  const grandTotal = totalPrice + delivery;

  useEffect(() => {
    if (!shipping && items.length > 0) {
      router.replace('/checkout');
    }
  }, [shipping, items, router]);

  if (!shipping || items.length === 0) return null;

  async function handleConfirmOrder() {
    if (!settings) return;

    // Save order to database
    await fetch('/api/admin/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: {
          name: shipping!.name,
          phone: shipping!.phone,
          region: shipping!.region,
          address: shipping!.address,
          landmark: shipping!.landmark ?? '',
        },
        items: items.map((i) => ({
          productId: i.product.id,
          name: i.product.name,
          image: i.product.image,
          price: i.product.price,
          quantity: i.quantity,
        })),
        subtotal: totalPrice,
        delivery,
        total: grandTotal,
      }),
    });

    const msg = encodeURIComponent(
      `*New Order — StyleNepal* 🛍\n\n` +
      `*Customer:*\n` +
      `Name: ${shipping!.name}\n` +
      `Phone: +977${shipping!.phone}\n` +
      `Region: ${shipping!.region}\n` +
      `Address: ${shipping!.address}\n` +
      (shipping!.landmark ? `Landmark: ${shipping!.landmark}\n` : '') +
      `\n*Items:*\n` +
      items.map((i) => `• ${i.product.name} × ${i.quantity} — ${formatPrice(i.product.price * i.quantity)}`).join('\n') +
      `\n\nDelivery: ${delivery === 0 ? 'FREE' : formatPrice(delivery)}` +
      `\n*Total Paid: ${formatPrice(grandTotal)}*\n\n` +
      `(Payment sent via ${settings.paymentBankName})`
    );
    window.open(`https://wa.me/${settings.whatsappNumber.replace(/\D/g, '')}?text=${msg}`, '_blank');
    setConfirmed(true);
    clearCart();
    clearShipping();
  }

  if (confirmed) {
    return (
      <div className="container-xl flex min-h-[70vh] flex-col items-center justify-center gap-6 py-20 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
          <svg className="h-10 w-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <h1 className="font-serif text-2xl font-semibold text-brand-900">Order Placed!</h1>
          <p className="mt-2 max-w-sm text-sm text-brand-500">
            Thank you! We received your order confirmation via WhatsApp and will contact you shortly.
          </p>
        </div>
        <Link href="/products" className="btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container-xl py-10">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 text-xs text-brand-400">
        <Link href="/cart" className="hover:text-brand-900 transition-colors">Cart</Link>
        <span>›</span>
        <Link href="/checkout" className="hover:text-brand-900 transition-colors">Shipping</Link>
        <span>›</span>
        <span className="font-semibold text-brand-900">Payment</span>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        {/* ── Left: QR + instructions ─────────────── */}
        <div>
          <h1 className="font-serif text-2xl font-semibold text-brand-900">Complete Payment</h1>
          <p className="mt-1 text-sm text-brand-400">
            Pay <span className="font-semibold text-brand-900">{formatPrice(grandTotal)}</span> using the QR code below.
          </p>

          {/* QR box */}
          <div className="mt-8 flex flex-col items-center rounded border border-cream-200 bg-white p-8">
            {settings?.paymentQrUrl ? (
              <div className="relative h-56 w-56 overflow-hidden rounded">
                <Image src={settings.paymentQrUrl} alt="Payment QR Code" fill className="object-contain" />
              </div>
            ) : (
              <div className="flex h-56 w-56 flex-col items-center justify-center rounded border-2 border-dashed border-cream-300 bg-cream-50 text-center">
                <p className="text-3xl">📲</p>
                <p className="mt-2 text-xs text-brand-400">QR code not set</p>
                <p className="text-[11px] text-brand-300">Set it in Admin → Settings</p>
              </div>
            )}

            <div className="mt-6 text-center">
              {settings?.paymentBankName && (
                <p className="text-sm font-semibold text-brand-900">{settings.paymentBankName}</p>
              )}
              {settings?.paymentAccountName && (
                <p className="text-xs text-brand-500 mt-0.5">{settings.paymentAccountName}</p>
              )}
              {settings?.paymentAccountNumber && (
                <p className="mt-1 font-mono text-base font-bold text-brand-900 tracking-wider">
                  {settings.paymentAccountNumber}
                </p>
              )}
              <p className="mt-1 text-xl font-bold text-gold-700">{formatPrice(grandTotal)}</p>
            </div>

            {settings?.paymentInstructions && (
              <p className="mt-5 max-w-xs text-center text-sm leading-relaxed text-brand-500">
                {settings.paymentInstructions}
              </p>
            )}
          </div>

          {/* Shipping details recap */}
          <div className="mt-6 rounded border border-cream-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-500">Delivering To</h2>
              <Link href="/checkout" className="text-[11px] font-medium text-gold-700 hover:underline">Edit</Link>
            </div>
            <div className="mt-3 space-y-1 text-sm text-brand-700">
              <p className="font-semibold text-brand-900">{shipping.name}</p>
              <p>+977 {shipping.phone}</p>
              <p>{shipping.region}</p>
              <p>{shipping.address}</p>
              {shipping.landmark && <p className="text-brand-400">{shipping.landmark}</p>}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-6 space-y-3">
            <button
              onClick={handleConfirmOrder}
              className="flex w-full items-center justify-center gap-2.5 bg-[#25D366] py-4 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:bg-[#1ebe5b] active:scale-[0.98]"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.091.535 4.06 1.47 5.782L0 24l6.335-1.418A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.95 0-3.77-.524-5.33-1.435l-.38-.226-3.97.888.948-3.847-.248-.397A9.772 9.772 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
              </svg>
              I&apos;ve Paid — Confirm Order via WhatsApp
            </button>
            <p className="text-center text-[11px] text-brand-400">
              After paying, tap above to send your order details to us on WhatsApp.
            </p>
          </div>
        </div>

        {/* ── Right: order summary ─────────────────── */}
        <div className="h-fit rounded border border-cream-200 bg-white p-6">
          <h2 className="font-serif text-base font-semibold text-brand-900">Order Summary</h2>
          <ul className="mt-4 space-y-3 divide-y divide-cream-100">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="flex items-start gap-3 pt-3 first:pt-0">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded bg-cream-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-900 text-[9px] font-bold text-white">
                    {quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate text-xs font-medium text-brand-900">{product.name}</p>
                  <p className="text-[11px] text-brand-400">{product.brand}</p>
                </div>
                <span className="text-xs font-semibold text-brand-900 shrink-0">
                  {formatPrice(product.price * quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-5 space-y-2 border-t border-cream-200 pt-4 text-sm">
            <div className="flex justify-between text-brand-600">
              <span>Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <div className="flex justify-between text-brand-600">
              <span>Delivery</span>
              {delivery === 0
                ? <span className="font-medium text-emerald-600">Free</span>
                : <span>{formatPrice(delivery)}</span>
              }
            </div>
            <div className="flex justify-between border-t border-cream-200 pt-2 text-base font-bold text-brand-900">
              <span>Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
