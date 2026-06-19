'use client';

import { useState } from 'react';
import { SITE_NAME } from '@/lib/constants';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) { setStatus('error'); return; }
    setStatus('success');
    setEmail('');
  }

  return (
    <section aria-label="Newsletter signup" className="bg-brand-900 py-20">
      <div className="container-xl">
        <div className="mx-auto max-w-xl text-center">
          <span className="eyebrow text-gold-400">Stay in the loop</span>
          <h2 className="mt-4 font-serif text-3xl font-semibold text-white">
            Exclusive Offers, First
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-brand-400">
            Subscribe and receive 10% off your first order, plus early access to new arrivals and
            flash sales — only from {SITE_NAME}.
          </p>

          {status === 'success' ? (
            <div className="mt-8 border border-gold-700/40 bg-gold-700/10 px-6 py-4 text-sm text-gold-300">
              Welcome! Check your inbox for your 10% off code.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                aria-label="Email address for newsletter"
                className="flex-1 border border-brand-700 bg-brand-800 px-5 py-3 text-sm text-white placeholder:text-brand-500 focus:border-gold-600 focus:outline-none"
              />
              <button type="submit" className="btn-white shrink-0 px-7 py-3 text-xs">
                Subscribe
              </button>
            </form>
          )}

          {status === 'error' && (
            <p className="mt-2 text-xs text-gold-400">Please enter a valid email address.</p>
          )}

          <p className="mt-4 text-xs text-brand-600">
            No spam. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
