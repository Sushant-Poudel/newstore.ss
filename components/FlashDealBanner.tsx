'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

function pad(n: number) {
  return String(n).padStart(2, '0');
}

function getTimeLeft(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now());
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1_000);
  return { h, m, s, done: diff === 0 };
}

/* Deal resets every 24 h from page load — keeps it always live */
function getDealEnd() {
  const key = 'flash_deal_end';
  const stored = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
  if (stored) {
    const d = new Date(stored);
    if (d > new Date()) return d;
  }
  const end = new Date(Date.now() + 24 * 60 * 60 * 1000);
  if (typeof window !== 'undefined') localStorage.setItem(key, end.toISOString());
  return end;
}

function Digit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="tabular-nums text-xl font-bold leading-none text-white sm:text-2xl">
        {value}
      </span>
      <span className="mt-0.5 text-[8px] uppercase tracking-[0.18em] text-white/40">{label}</span>
    </div>
  );
}

export default function FlashDealBanner() {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0, done: false });
  const [dealEnd, setDealEnd] = useState<Date | null>(null);

  useEffect(() => {
    const end = getDealEnd();
    setDealEnd(end);
    setTime(getTimeLeft(end));

    const id = setInterval(() => {
      setTime(getTimeLeft(end));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  if (!dealEnd) return null;

  return (
    <section
      aria-label="Flash deal"
      className="relative overflow-hidden bg-gradient-to-r from-brand-950 via-[#1a0f0a] to-brand-950"
    >
      {/* Animated scan-line shimmer */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.8) 2px, rgba(255,255,255,0.8) 3px)',
          backgroundSize: '100% 6px',
        }}
      />

      <div className="container-xl relative z-10">
        <div className="flex flex-col items-center justify-between gap-5 py-7 sm:flex-row sm:gap-8">

          {/* Left — label + text */}
          <div className="flex items-center gap-4">
            <span className="shrink-0 bg-gold-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-950">
              Flash Sale
            </span>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white">
                Up to 30% off — today only
              </p>
              <p className="mt-0.5 text-[10px] text-brand-500">
                Selected shoes, bags &amp; accessories
              </p>
            </div>
          </div>

          {/* Center — countdown */}
          <div className="flex items-center gap-3" aria-label="Time remaining">
            <Digit value={pad(time.h)} label="Hrs" />
            <span className="mb-3 text-xl font-bold text-white/30">:</span>
            <Digit value={pad(time.m)} label="Min" />
            <span className="mb-3 text-xl font-bold text-white/30">:</span>
            <Digit value={pad(time.s)} label="Sec" />
          </div>

          {/* Right — CTA */}
          <Link
            href="/products"
            className="shrink-0 border border-gold-600 px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-400 transition-all duration-200 hover:bg-gold-600 hover:text-brand-950"
          >
            Shop the Sale →
          </Link>
        </div>
      </div>
    </section>
  );
}
