'use client';

import { useEffect, useState } from 'react';
import type { SiteSettings } from '@/lib/db';

const INPUT = 'w-full rounded border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-600 focus:border-amber-500 focus:outline-none';

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-widest text-gray-400">{label}</label>
      {hint && <p className="mb-1.5 text-[11px] text-gray-600">{hint}</p>}
      {children}
    </div>
  );
}

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch('/api/admin/settings').then((r) => r.json()).then(setSettings);
  }, []);

  function set<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setSettings((prev) => prev ? { ...prev, [key]: value } : prev);
    setSaved(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!settings) return;
    setSaving(true);
    await fetch('/api/admin/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  if (!settings) {
    return <div className="p-8 text-gray-500">Loading…</div>;
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Site Settings</h1>
          <p className="mt-1 text-sm text-gray-400">Control your store's global settings and homepage content.</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="mt-6 space-y-6">
        {/* Store basics */}
        <section className="rounded-lg border border-gray-800 bg-gray-900 p-6">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-amber-400">Store Info</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Store Name">
              <input className={INPUT} value={settings.siteName} onChange={(e) => set('siteName', e.target.value)} />
            </Field>
            <Field label="WhatsApp Number" hint="Include country code, e.g. +9779800000000">
              <input className={INPUT} value={settings.whatsappNumber} onChange={(e) => set('whatsappNumber', e.target.value)} />
            </Field>
            <Field label="Phone Number (shown in cart)">
              <input className={INPUT} value={settings.phoneNumber} onChange={(e) => set('phoneNumber', e.target.value)} />
            </Field>
            <Field label="Site URL">
              <input className={INPUT} value={settings.siteUrl} onChange={(e) => set('siteUrl', e.target.value)} />
            </Field>
            <Field label="Site Description (SEO)">
              <textarea className={`${INPUT} resize-none md:col-span-2`} rows={2} value={settings.siteDescription} onChange={(e) => set('siteDescription', e.target.value)} />
            </Field>
          </div>
        </section>

        {/* Delivery */}
        <section className="rounded-lg border border-gray-800 bg-gray-900 p-6">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-amber-400">Delivery</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Free Delivery Threshold (NPR)">
              <input className={INPUT} type="number" min={0} value={settings.freeDeliveryThreshold} onChange={(e) => set('freeDeliveryThreshold', Number(e.target.value))} />
            </Field>
            <Field label="Standard Delivery Charge (NPR)">
              <input className={INPUT} type="number" min={0} value={settings.deliveryCharge} onChange={(e) => set('deliveryCharge', Number(e.target.value))} />
            </Field>
          </div>
        </section>

        {/* Announcement bar */}
        <section className="rounded-lg border border-gray-800 bg-gray-900 p-6">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-amber-400">Announcement Bar</h2>
          <Field label="Message" hint="Shown at the very top of every page">
            <input className={INPUT} value={settings.announcementBar} onChange={(e) => set('announcementBar', e.target.value)} />
          </Field>
        </section>

        {/* Hero section */}
        <section className="rounded-lg border border-gray-800 bg-gray-900 p-6">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-amber-400">Hero Section</h2>
          <div className="space-y-4">
            <Field label="Headline">
              <input className={INPUT} value={settings.heroTitle} onChange={(e) => set('heroTitle', e.target.value)} />
            </Field>
            <Field label="Subtitle">
              <textarea className={`${INPUT} resize-none`} rows={2} value={settings.heroSubtitle} onChange={(e) => set('heroSubtitle', e.target.value)} />
            </Field>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Primary Button Text">
                <input className={INPUT} value={settings.heroCtaPrimary} onChange={(e) => set('heroCtaPrimary', e.target.value)} />
              </Field>
              <Field label="Secondary Button Text">
                <input className={INPUT} value={settings.heroCtaSecondary} onChange={(e) => set('heroCtaSecondary', e.target.value)} />
              </Field>
            </div>
          </div>
        </section>

        {/* Promo strip */}
        <section className="rounded-lg border border-gray-800 bg-gray-900 p-6">
          <h2 className="mb-4 text-xs font-semibold uppercase tracking-widest text-amber-400">Promo Strip (Homepage)</h2>
          <div className="space-y-4">
            <Field label="Promo Headline">
              <input className={INPUT} value={settings.promoTitle} onChange={(e) => set('promoTitle', e.target.value)} />
            </Field>
            <Field label="Promo Subtitle">
              <input className={INPUT} value={settings.promoSubtitle} onChange={(e) => set('promoSubtitle', e.target.value)} />
            </Field>
          </div>
        </section>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="rounded bg-amber-500 px-8 py-2.5 text-sm font-semibold text-gray-950 transition-colors hover:bg-amber-400 disabled:opacity-60"
          >
            {saved ? '✓ Saved!' : saving ? 'Saving…' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
