'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes('@')) {
      setStatus('error');
      return;
    }
    setStatus('success');
    setEmail('');
  }

  return (
    <section aria-label="Newsletter signup" className="bg-slate-900 py-14">
      <div className="container-xl text-center">
        <h2 className="section-title text-white">Get Exclusive Deals</h2>
        <p className="mt-3 text-slate-400">
          Subscribe to our newsletter and be the first to know about new arrivals, sales, and
          exclusive offers.
        </p>

        {status === 'success' ? (
          <p className="mt-6 inline-flex items-center gap-2 rounded-xl bg-emerald-500/10 px-6 py-4 text-emerald-400 font-medium">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Thank you for subscribing! Check your inbox for a 10% off coupon.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              aria-label="Email address for newsletter"
              className="w-full max-w-sm rounded-lg bg-slate-800 px-5 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            <button type="submit" className="btn-primary whitespace-nowrap px-8">
              Subscribe & Save 10%
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-2 text-xs text-brand-400">Please enter a valid email address.</p>
        )}

        <p className="mt-4 text-xs text-slate-500">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}
