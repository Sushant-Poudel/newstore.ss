'use client';

import { useState } from 'react';
import { SITE_NAME, WHATSAPP_NUMBER } from '@/lib/constants';

const INPUT = 'w-full border border-cream-200 dark:border-brand-700 bg-white dark:bg-brand-900 px-4 py-3 text-sm text-brand-900 dark:text-white placeholder:text-brand-400 dark:placeholder:text-brand-600 focus:border-brand-900 dark:focus:border-gold-600 focus:outline-none transition-colors';

const contactInfo = [
  { label: 'Address', value: 'New Road, Kathmandu, Nepal', iconPath: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z' },
  { label: 'Phone', value: '+977-9800000000', iconPath: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
  { label: 'Email', value: 'support@stylenepal.com', iconPath: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
  { label: 'Hours', value: 'Sun–Fri · 9 AM – 6 PM NST', iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
];

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1200);
  }

  return (
    <div className="container-xl py-14">
      <div className="grid gap-10 lg:grid-cols-3">

        {/* Info sidebar */}
        <aside className="space-y-8">
          <div className="space-y-6">
            {contactInfo.map(({ label, value, iconPath }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center border border-cream-200 dark:border-brand-800">
                  <svg className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={iconPath} />
                  </svg>
                </div>
                <div>
                  <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-brand-400">{label}</p>
                  <p className="mt-0.5 text-[13px] text-brand-700 dark:text-brand-300">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border border-green-600/30 bg-green-600/5 px-5 py-4 text-green-700 dark:text-green-400 transition-colors hover:bg-green-600/10"
          >
            <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.091.535 4.06 1.47 5.782L0 24l6.335-1.418A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.95 0-3.77-.524-5.33-1.435l-.38-.226-3.97.888.948-3.847-.248-.397A9.772 9.772 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
            </svg>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em]">Chat on WhatsApp</p>
              <p className="mt-0.5 text-[11px] opacity-70">Fastest way to reach us</p>
            </div>
          </a>

          <p className="text-[11px] text-brand-400 dark:text-brand-600">
            {SITE_NAME} responds to all enquiries within 2 business hours.
          </p>
        </aside>

        {/* Form */}
        <div className="border border-cream-200 dark:border-brand-800 p-8 lg:col-span-2">
          {status === 'sent' ? (
            <div className="flex flex-col items-center gap-5 py-16 text-center">
              <svg className="h-12 w-12 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-serif text-xl font-semibold text-brand-900 dark:text-white">Message Sent</h3>
                <p className="mt-2 text-sm text-brand-500">
                  Thank you for reaching out. We&apos;ll get back to you within 2 hours.
                </p>
              </div>
              <button
                onClick={() => setStatus('idle')}
                className="border-b border-brand-900 dark:border-white pb-0.5 text-[11px] font-medium uppercase tracking-[0.22em] text-brand-900 dark:text-white transition-all hover:pb-1"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.25em] text-brand-500 dark:text-brand-500">
                    Full Name *
                  </label>
                  <input id="name" name="name" required value={form.name} onChange={handleChange} placeholder="Rajesh Sharma" className={INPUT} />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.25em] text-brand-500 dark:text-brand-500">
                    Email Address *
                  </label>
                  <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="rajesh@example.com" className={INPUT} />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="phone" className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.25em] text-brand-500 dark:text-brand-500">
                    Phone
                  </label>
                  <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+977 98XXXXXXXX" className={INPUT} />
                </div>
                <div>
                  <label htmlFor="subject" className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.25em] text-brand-500 dark:text-brand-500">
                    Subject *
                  </label>
                  <select id="subject" name="subject" required value={form.subject} onChange={handleChange} className={INPUT}>
                    <option value="">Select a topic</option>
                    <option>Order Status</option>
                    <option>Return / Refund</option>
                    <option>Product Question</option>
                    <option>Delivery Issue</option>
                    <option>Partnership / Wholesale</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.25em] text-brand-500 dark:text-brand-500">
                  Message *
                </label>
                <textarea id="message" name="message" required rows={5} value={form.message} onChange={handleChange} placeholder="Tell us how we can help…" className={`${INPUT} resize-none`} />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-brand-900 dark:bg-white py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-white dark:text-brand-950 transition-colors hover:bg-brand-700 dark:hover:bg-cream-100 disabled:opacity-50"
              >
                {status === 'sending' ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
