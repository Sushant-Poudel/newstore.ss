export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import BenefitsBar from '@/components/BenefitsBar';
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
      <BenefitsBar />

      {/* ── Shop by Category ────────────────────────────────── */}
      <section aria-labelledby="categories-heading" className="py-24 bg-cream-50">
        <div className="container-xl">
          <AnimateIn>
            <div className="mb-12 flex items-end justify-between">
              <div>
                <span className="eyebrow">Collections</span>
                <h2 id="categories-heading" className="section-title mt-3">Shop by Category</h2>
              </div>
              <Link
                href="/products"
                className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-brand-400 underline-offset-4 transition-colors hover:text-brand-900 hover:underline sm:block"
              >
                View all →
              </Link>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-3 lg:grid-cols-6">
            {getCategories().map((cat, i) => (
              <AnimateIn key={cat.id} delay={i * 0.05}>
                <CategoryCard category={cat} />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ───────────────────────────────── */}
      <section aria-labelledby="featured-heading" className="bg-white py-24">
        <div className="container-xl">
          <AnimateIn>
            <div className="mb-12 flex items-end justify-between">
              <div>
                <span className="eyebrow">Handpicked</span>
                <h2 id="featured-heading" className="section-title mt-3">Featured Products</h2>
              </div>
              <Link
                href="/products"
                className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-brand-400 underline-offset-4 transition-colors hover:text-brand-900 hover:underline sm:block"
              >
                Shop all →
              </Link>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
            {featured.slice(0, 8).map((product, i) => (
              <AnimateIn key={product.id} delay={i * 0.06}>
                <ProductCard product={product} />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Editorial promo strip ───────────────────────────── */}
      <AnimateIn>
        <section aria-label="Promotional offer" className="bg-brand-900 py-20 text-center">
          <div className="container-xl">
            <span className="eyebrow text-gold-500">Limited Time</span>
            <h2 className="mt-4 font-serif text-3xl font-semibold text-white sm:text-4xl">
              Up to 30% Off Selected Items
            </h2>
            <p className="mx-auto mt-5 max-w-sm text-[13px] leading-loose text-brand-400">
              New deals every week — only at {SITE_NAME}.
            </p>
            <Link href="/products" className="btn-white mt-10 inline-flex px-10">
              Browse Sale Items
            </Link>
          </div>
        </section>
      </AnimateIn>

      {/* ── Bestsellers ─────────────────────────────────────── */}
      <section aria-labelledby="bestsellers-heading" className="bg-cream-50 py-24">
        <div className="container-xl">
          <AnimateIn>
            <div className="mb-12 flex items-end justify-between">
              <div>
                <span className="eyebrow">Most Loved</span>
                <h2 id="bestsellers-heading" className="section-title mt-3">Bestsellers in Nepal</h2>
              </div>
              <Link
                href="/products"
                className="hidden text-[10px] font-medium uppercase tracking-[0.2em] text-brand-400 underline-offset-4 transition-colors hover:text-brand-900 hover:underline sm:block"
              >
                View all →
              </Link>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-2 gap-x-5 gap-y-12 lg:grid-cols-4">
            {bestsellers.slice(0, 4).map((product, i) => (
              <AnimateIn key={product.id} delay={i * 0.06}>
                <ProductCard product={product} />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
