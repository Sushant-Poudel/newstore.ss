'use client';

import { useEffect, useState } from 'react';
import type { Review } from '@/lib/db';

function Stars({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) {
  const cls = size === 'lg' ? 'h-5 w-5' : 'h-3.5 w-3.5';
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`${cls} ${i < rating ? 'text-gold-500' : 'text-cream-200 dark:text-brand-800'}`} fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(n)}
          aria-label={`Rate ${n} star${n > 1 ? 's' : ''}`}
          className="transition-transform hover:scale-110 active:scale-95"
        >
          <svg className={`h-6 w-6 ${(hovered || value) >= n ? 'text-gold-500' : 'text-cream-200 dark:text-brand-700'}`} fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

const INPUT = 'w-full border border-cream-200 dark:border-brand-700 bg-white dark:bg-brand-900 px-4 py-3 text-sm text-brand-900 dark:text-white placeholder:text-brand-400 dark:placeholder:text-brand-600 focus:border-brand-900 dark:focus:border-gold-600 focus:outline-none transition-colors';

export default function ProductReviews({ productId, productSlug }: { productId: string; productSlug: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({ author: '', rating: 0, title: '', body: '' });

  useEffect(() => {
    fetch(`/api/reviews/${productId}`)
      .then((r) => r.json())
      .then((data) => { setReviews(data); setLoading(false); });
  }, [productId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.rating === 0) return;
    setSubmitting(true);
    const res = await fetch(`/api/reviews/${productId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, productSlug }),
    });
    if (res.ok) {
      const newReview = await res.json();
      setReviews((prev) => [newReview, ...prev]);
      setSubmitted(true);
      setShowForm(false);
      setForm({ author: '', rating: 0, title: '', body: '' });
    }
    setSubmitting(false);
  }

  const avgRating = reviews.length
    ? Math.round((reviews.reduce((s, r) => s + r.rating, 0) / reviews.length) * 10) / 10
    : 0;

  const dist = [5, 4, 3, 2, 1].map((n) => ({
    stars: n,
    count: reviews.filter((r) => r.rating === n).length,
    pct: reviews.length ? Math.round((reviews.filter((r) => r.rating === n).length / reviews.length) * 100) : 0,
  }));

  return (
    <section className="mt-16 border-t border-cream-200 dark:border-brand-800 pt-14" aria-labelledby="reviews-heading">
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="text-[9px] font-medium uppercase tracking-[0.35em] text-brand-400">What customers say</p>
          <h2 id="reviews-heading" className="mt-2 font-serif text-xl font-semibold text-brand-900 dark:text-white">
            Reviews {reviews.length > 0 && <span className="text-brand-400 dark:text-brand-600">({reviews.length})</span>}
          </h2>
        </div>
        {!showForm && !submitted && (
          <button
            onClick={() => setShowForm(true)}
            className="border-b border-brand-900 dark:border-white pb-0.5 text-[11px] font-medium uppercase tracking-[0.22em] text-brand-900 dark:text-white transition-all hover:pb-1"
          >
            Write a Review
          </button>
        )}
      </div>

      {/* Summary bar */}
      {reviews.length > 0 && (
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-12">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <p className="font-serif text-5xl font-semibold text-brand-900 dark:text-white">{avgRating}</p>
            <Stars rating={Math.round(avgRating)} size="sm" />
            <p className="text-[11px] text-brand-400">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</p>
          </div>
          <div className="flex-1 space-y-2">
            {dist.map(({ stars, count, pct }) => (
              <div key={stars} className="flex items-center gap-3">
                <span className="w-4 text-right text-[11px] text-brand-500">{stars}</span>
                <div className="h-1.5 flex-1 bg-cream-200 dark:bg-brand-800">
                  <div className="h-full bg-gold-500 transition-all" style={{ width: `${pct}%` }} />
                </div>
                <span className="w-6 text-[11px] text-brand-400">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Write review form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-10 border border-cream-200 dark:border-brand-800 p-6 space-y-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-500 dark:text-brand-500">Your Review</p>

          <div>
            <p className="mb-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-brand-400">Rating *</p>
            <StarPicker value={form.rating} onChange={(n) => setForm((f) => ({ ...f, rating: n }))} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.25em] text-brand-400">Your Name *</label>
              <input
                required
                value={form.author}
                onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                placeholder="Rajesh Sharma"
                className={INPUT}
              />
            </div>
            <div>
              <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.25em] text-brand-400">Review Title</label>
              <input
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Great quality!"
                className={INPUT}
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-[9px] font-semibold uppercase tracking-[0.25em] text-brand-400">Your Review *</label>
            <textarea
              required
              rows={4}
              value={form.body}
              onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
              placeholder="Tell others what you think about this product…"
              className={`${INPUT} resize-none`}
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={submitting || form.rating === 0}
              className="bg-brand-900 dark:bg-white px-8 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-white dark:text-brand-950 transition-colors hover:bg-brand-700 dark:hover:bg-cream-100 disabled:opacity-50"
            >
              {submitting ? 'Submitting…' : 'Submit Review'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="text-[11px] text-brand-400 hover:text-brand-900 dark:hover:text-white transition-colors uppercase tracking-widest">
              Cancel
            </button>
          </div>
        </form>
      )}

      {submitted && (
        <div className="mb-8 border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 px-5 py-4">
          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Thank you! Your review has been posted.</p>
        </div>
      )}

      {/* Reviews list */}
      {loading ? (
        <div className="py-12 text-center text-sm text-brand-400">Loading reviews…</div>
      ) : reviews.length === 0 ? (
        <div className="py-16 text-center">
          <p className="font-serif text-base font-semibold text-brand-900 dark:text-white">No reviews yet</p>
          <p className="mt-2 text-sm text-brand-500">Be the first to share your experience with this product.</p>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="mt-6 border-b border-brand-900 dark:border-white pb-0.5 text-[11px] font-medium uppercase tracking-[0.22em] text-brand-900 dark:text-white transition-all hover:pb-1"
            >
              Write a Review
            </button>
          )}
        </div>
      ) : (
        <div className="divide-y divide-cream-200 dark:divide-brand-800">
          {reviews.map((review) => (
            <div key={review.id} className="py-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <Stars rating={review.rating} />
                  {review.title && (
                    <p className="mt-2 font-semibold text-brand-900 dark:text-white text-sm">{review.title}</p>
                  )}
                </div>
                <time className="shrink-0 text-[11px] text-brand-400 dark:text-brand-600">
                  {new Date(review.createdAt).toLocaleDateString('en-NP', { year: 'numeric', month: 'short', day: 'numeric' })}
                </time>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-brand-600 dark:text-brand-400">{review.body}</p>
              <div className="mt-3 flex items-center gap-2">
                <p className="text-[11px] font-semibold text-brand-700 dark:text-brand-300">{review.author}</p>
                {review.verified && (
                  <span className="text-[9px] font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Verified Purchase</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
