import type { Metadata } from 'next';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import BenefitsBar from '@/components/BenefitsBar';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import Newsletter from '@/components/Newsletter';
import AnimateIn from '@/components/AnimateIn';
import { categories, getFeaturedProducts, getBestsellerProducts, SITE_NAME, SITE_URL } from '@/lib/data';

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

      {/* ── Shop by Category ──────────────────────────────── */}
      <section aria-labelledby="categories-heading" className="py-20">
        <div className="container-xl">
          <AnimateIn>
            <div className="mb-10 flex items-end justify-between">
              <div>
                <span className="eyebrow">Collections</span>
                <h2 id="categories-heading" className="section-title mt-3">
                  Shop by Category
                </h2>
              </div>
              <Link
                href="/products"
                className="hidden text-[11px] font-semibold uppercase tracking-widest text-brand-400 underline-offset-4 transition-colors hover:text-brand-900 hover:underline sm:block"
              >
                View all →
              </Link>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat, i) => (
              <AnimateIn key={cat.id} delay={i * 0.05}>
                <CategoryCard category={cat} />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Products ─────────────────────────────── */}
      <section
        aria-labelledby="featured-heading"
        className="border-t border-cream-200 bg-white py-20"
      >
        <div className="container-xl">
          <AnimateIn>
            <div className="mb-10 flex items-end justify-between">
              <div>
                <span className="eyebrow">Handpicked</span>
                <h2 id="featured-heading" className="section-title mt-3">
                  Featured Products
                </h2>
              </div>
              <Link
                href="/products"
                className="hidden text-[11px] font-semibold uppercase tracking-widest text-brand-400 underline-offset-4 transition-colors hover:text-brand-900 hover:underline sm:block"
              >
                Shop all →
              </Link>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {featured.slice(0, 8).map((product, i) => (
              <AnimateIn key={product.id} delay={i * 0.07}>
                <ProductCard product={product} />
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Promo strip ───────────────────────────────────── */}
      <AnimateIn>
        <section
          aria-label="Promotional offer"
          className="bg-brand-900 py-16 text-center text-white"
        >
          <div className="container-xl">
            <span className="eyebrow text-gold-400">Limited Time</span>
            <h2 className="section-title mt-3 text-white sm:text-4xl">
              Up to 30% Off Selected Items
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-brand-400">
              New deals every week — only at {SITE_NAME}.
            </p>
            <Link href="/products" className="btn-white mt-8 inline-flex">
              Browse Sale Items
            </Link>
          </div>
        </section>
      </AnimateIn>

      {/* ── Bestsellers ───────────────────────────────────── */}
      <section
        aria-labelledby="bestsellers-heading"
        className="border-b border-cream-200 bg-white py-20"
      >
        <div className="container-xl">
          <AnimateIn>
            <div className="mb-10 flex items-end justify-between">
              <div>
                <span className="eyebrow">Most Loved</span>
                <h2 id="bestsellers-heading" className="section-title mt-3">
                  Bestsellers in Nepal
                </h2>
              </div>
              <Link
                href="/products"
                className="hidden text-[11px] font-semibold uppercase tracking-widest text-brand-400 underline-offset-4 transition-colors hover:text-brand-900 hover:underline sm:block"
              >
                View all →
              </Link>
            </div>
          </AnimateIn>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {bestsellers.slice(0, 4).map((product, i) => (
              <AnimateIn key={product.id} delay={i * 0.07}>
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
