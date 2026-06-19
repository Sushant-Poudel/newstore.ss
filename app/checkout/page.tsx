'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useCheckout } from '@/context/CheckoutContext';
import { formatPrice } from '@/lib/constants';

const NEPAL_REGIONS = [
  'Kathmandu', 'Lalitpur', 'Bhaktapur', 'Pokhara', 'Biratnagar',
  'Birgunj', 'Dharan', 'Bharatpur', 'Butwal', 'Hetauda',
  'Janakpur', 'Itahari', 'Dhangadhi', 'Nepalgunj', 'Tulsipur',
  'Siddharthanagar', 'Ghorahi', 'Mechinagar', 'Birtamod', 'Other',
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, totalPrice } = useCart();
  const { setShipping } = useCheckout();

  const [form, setForm] = useState({
    name: '',
    phone: '',
    region: '',
    address: '',
    landmark: '',
  });

  function set(field: keyof typeof form, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const delivery = totalPrice >= 2000 ? 0 : 150;
  const grandTotal = totalPrice + delivery;

  if (items.length === 0) {
    return (
      <div className="container-xl flex min-h-[60vh] flex-col items-center justify-center gap-4 py-20 text-center">
        <p className="text-lg font-semibold text-brand-900">Your cart is empty</p>
        <Link href="/products" className="btn-primary">Browse Products</Link>
      </div>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setShipping(form);
    router.push('/checkout/payment');
  }

  return (
    <div className="container-xl py-10">
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-2 text-xs text-brand-400">
        <Link href="/cart" className="hover:text-brand-900 transition-colors">Cart</Link>
        <span>›</span>
        <span className="font-semibold text-brand-900">Shipping</span>
        <span>›</span>
        <span className="text-brand-300">Payment</span>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
        {/* ── Address form ───────────────────────── */}
        <div>
          <h1 className="font-serif text-2xl font-semibold text-brand-900">Shipping Address</h1>
          <p className="mt-1 text-sm text-brand-400">We'll deliver your order to this address.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {/* Recipient name */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-brand-800">
                Recipient&apos;s Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => set('name', e.target.value)}
                placeholder="Input the real name"
                className="checkout-input"
                autoFocus
              />
            </div>

            {/* Phone */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-brand-800">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="flex">
                <span className="flex items-center rounded-l border border-r-0 border-cream-300 bg-cream-100 px-3 text-sm text-brand-500 select-none">
                  🇳🇵 +977
                </span>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => set('phone', e.target.value.replace(/\D/g, ''))}
                  placeholder="98XXXXXXXX"
                  maxLength={10}
                  className="checkout-input rounded-l-none flex-1"
                />
              </div>
            </div>

            {/* Region */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-brand-800">
                Region / City / District <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={form.region}
                onChange={(e) => set('region', e.target.value)}
                className="checkout-input"
              >
                <option value="">Select your region</option>
                {NEPAL_REGIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Address */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-brand-800">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={form.address}
                onChange={(e) => set('address', e.target.value)}
                placeholder="House no. / building / street / area"
                className="checkout-input"
              />
            </div>

            {/* Landmark */}
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-brand-800">
                Landmark <span className="text-[11px] font-normal text-brand-400">(Optional)</span>
              </label>
              <input
                type="text"
                value={form.landmark}
                onChange={(e) => set('landmark', e.target.value)}
                placeholder="Nearest landmark / additional info"
                className="checkout-input"
              />
            </div>

            <div className="flex items-center gap-4 pt-2">
              <Link
                href="/cart"
                className="flex items-center gap-1.5 text-sm text-brand-400 hover:text-brand-900 transition-colors"
              >
                ← Back to Cart
              </Link>
              <button type="submit" className="btn-primary ml-auto px-10 py-3.5">
                Proceed to Payment →
              </button>
            </div>
          </form>
        </div>

        {/* ── Order summary sidebar ────────────────── */}
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
            <div className="flex justify-between border-t border-cream-200 pt-2 font-semibold text-brand-900">
              <span>Total</span>
              <span>{formatPrice(grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
