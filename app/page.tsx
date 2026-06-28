export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import Newsletter from '@/components/Newsletter';
import AnimateIn from '@/components/AnimateIn';
import { getCategories, getFeaturedProducts, getBestsellerProducts, SITE_NAME, SITE_URL } from '@/lib/data';

export const metadata: Metadata = {
  alternates: { canonical: SITE_URL },
};

export default function HomePage() {
  const featured = getFeaturedProducts();
  const bestsellers = getBestsellerProducts();

  return (
    <>
      <HeroSection />

      {/* ── Shop by Category ── */}
      <section aria-labelledby="categories-heading" className="py-20 bg-white dark:bg-brand-950">
        <div className="container-xl">
          <AnimateIn>
            <div className="mb-10 flex items-end justify-between border-b border-cream-200 dark:border-brand-800 pb-5">
              <div>
                <p className="text-[9px] font-medium uppercase tracking-[0.35em] text-brand-400">Collections</p>
                <h2 id="categories-heading" className="mt-2 font-serif text-xl font-semibold text-brand-900 dark:text-white sm:text-2xl">
                  Shop by Category
                </h2>
              </div>
              <Link
                href="/products"
                className="text-[10px] font-medium uppercase tracking-[0.2em] text-brand-400 transition-colors hover:text-brand-900 dark:hover:text-white"
              >
                View all →
              </Link>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
            {getCategories().map((cat, i) => (
              <AnimateIn key={cat.id} delay={i * 0.05}>
                <CategoryCard category={cat} />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      <section aria-labelledby="featured-heading" className="bg-[#F5F0EB] dark:bg-brand-900 py-20">
        <div className="container-xl">
          <AnimateIn>
            <div className="mb-10 flex items-end justify-between border-b border-cream-300 dark:border-brand-800 pb-5">
              <div>
                <p className="text-[9px] font-medium uppercase tracking-[0.35em] text-brand-400">Handpicked</p>
                <h2 id="featured-heading" className="mt-2 font-serif text-xl font-semibold text-brand-900 dark:text-white sm:text-2xl">
                  Featured Products
                </h2>
              </div>
              <Link
                href="/products"
                className="text-[10px] font-medium uppercase tracking-[0.2em] text-brand-400 transition-colors hover:text-brand-900 dark:hover:text-white"
              >
                Shop all →
              </Link>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
            {featured.slice(0, 8).map((product, i) => (
              <AnimateIn key={product.id} delay={Math.min(i * 0.05, 0.25)}>
                <ProductCard product={product} />
              </AnimateIn>
            ))}
          </div>

          <AnimateIn>
            <div className="mt-14 text-center">
              <Link
                href="/products"
                className="inline-block border-b border-brand-900 dark:border-white pb-0.5 text-[11px] font-medium uppercase tracking-[0.22em] text-brand-900 dark:text-white transition-all hover:pb-1"
              >
                Discover the Full Collection
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Editorial banner ── */}
      <AnimateIn>
        <section aria-label="Promotional offer" className="bg-brand-950 py-24 text-center">
          <div className="container-xl max-w-2xl">
            <p className="text-[9px] font-medium uppercase tracking-[0.4em] text-gold-500">Limited Time</p>
            <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight text-white sm:text-4xl">
              Up to 30% Off<br />Selected Styles
            </h2>
            <p className="mx-auto mt-6 max-w-sm text-[13px] leading-loose text-brand-400">
              New deals added every week — only at {SITE_NAME}.
            </p>
            <Link
              href="/sale"
              className="mt-10 inline-block border border-white/30 px-10 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-all hover:bg-white hover:text-brand-950"
            >
              Browse Sale Items
            </Link>
          </div>
        </section>
      </AnimateIn>

      {/* ── New Arrivals strip ── */}
      <AnimateIn>
        <section aria-label="New Arrivals" className="border-y border-cream-200 dark:border-brand-800 bg-white dark:bg-brand-950 py-10">
          <div className="container-xl flex items-center justify-between">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.4em] text-gold-600">Just Landed</p>
              <p className="mt-1 font-serif text-xl font-semibold text-brand-900 dark:text-white">New This Week</p>
            </div>
            <a
              href="/new-arrivals"
              className="inline-block border-b border-brand-900 dark:border-white pb-0.5 text-[11px] font-medium uppercase tracking-[0.22em] text-brand-900 dark:text-white transition-all hover:pb-1"
            >
              View New Arrivals
            </a>
          </div>
        </section>
      </AnimateIn>

      {/* ── Bestsellers ── */}
      <section aria-labelledby="bestsellers-heading" className="bg-white dark:bg-brand-950 py-20">
        <div className="container-xl">
          <AnimateIn>
            <div className="mb-10 flex items-end justify-between border-b border-cream-200 dark:border-brand-800 pb-5">
              <div>
                <p className="text-[9px] font-medium uppercase tracking-[0.35em] text-brand-400">Most Loved</p>
                <h2 id="bestsellers-heading" className="mt-2 font-serif text-xl font-semibold text-brand-900 dark:text-white sm:text-2xl">
                  Bestsellers in Nepal
                </h2>
              </div>
              <Link
                href="/products"
                className="text-[10px] font-medium uppercase tracking-[0.2em] text-brand-400 transition-colors hover:text-brand-900 dark:hover:text-white"
              >
                View all →
              </Link>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
            {bestsellers.slice(0, 4).map((product, i) => (
              <AnimateIn key={product.id} delay={i * 0.06}>
                <ProductCard product={product} />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Brand promise strip ── */}
      <section aria-label="Brand values" className="border-y border-cream-200 dark:border-brand-800 bg-white dark:bg-brand-950 py-12">
        <div className="container-xl">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              { icon: '🚚', title: 'Free Delivery', desc: 'On orders above NPR 3,000' },
              { icon: '↩️', title: 'Easy Returns', desc: '7-day hassle-free returns' },
              { icon: '🔒', title: 'Secure Payment', desc: 'eSewa, Khalti & more' },
              { icon: '🌐', title: 'All 77 Districts', desc: 'Delivered across Nepal' },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="flex flex-col items-center gap-2 text-center">
                <span className="text-xl" aria-hidden="true">{icon}</span>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-900 dark:text-white">{title}</p>
                <p className="text-[10px] text-brand-400 dark:text-brand-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
