import type { Metadata } from 'next';
import Link from 'next/link';
import HeroSection from '@/components/HeroSection';
import BenefitsBar from '@/components/BenefitsBar';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import Newsletter from '@/components/Newsletter';
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

      {/* Categories */}
      <section aria-labelledby="categories-heading" className="py-14">
        <div className="container-xl">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Explore</p>
              <h2 id="categories-heading" className="section-title mt-1">Shop by Category</h2>
            </div>
            <Link href="/products" className="text-sm font-semibold text-brand-600 hover:underline">
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section aria-labelledby="featured-heading" className="bg-white py-14">
        <div className="container-xl">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Handpicked</p>
              <h2 id="featured-heading" className="section-title mt-1">Featured Products</h2>
            </div>
            <Link href="/products" className="text-sm font-semibold text-brand-600 hover:underline">
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <section
        aria-label="Promotional banner"
        className="relative overflow-hidden bg-slate-900 py-14"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-brand-950/50 to-transparent" />
        <div className="container-xl relative z-10">
          <div className="max-w-xl">
            <span className="inline-block rounded-full bg-brand-500/20 px-4 py-1 text-sm font-semibold text-brand-300">
              Limited Time Offer
            </span>
            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
              Up to 30% Off on Selected Items
            </h2>
            <p className="mt-3 text-slate-400">
              Grab your favourite accessories before stock runs out. New deals every week — only on {SITE_NAME}.
            </p>
            <Link href="/products" className="btn-primary mt-6 inline-flex">
              Shop Sale Items
            </Link>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section aria-labelledby="bestsellers-heading" className="py-14">
        <div className="container-xl">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Most Loved</p>
              <h2 id="bestsellers-heading" className="section-title mt-1">Bestsellers in Nepal</h2>
            </div>
            <Link href="/products" className="text-sm font-semibold text-brand-600 hover:underline">
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bestsellers.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section aria-labelledby="why-us-heading" className="border-t border-gray-100 bg-white py-14">
        <div className="container-xl">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Why StyleNepal</p>
            <h2 id="why-us-heading" className="section-title mt-1">Nepal Loves Shopping With Us</h2>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Locally Curated',
                desc: 'Every product is handpicked for Nepali customers — right sizes, right styles, right prices.',
                emoji: '🇳🇵',
              },
              {
                title: 'Island-fast Delivery',
                desc: 'Same-day delivery in Kathmandu Valley. 1–3 days across Nepal.',
                emoji: '🚀',
              },
              {
                title: 'Verified Quality',
                desc: 'All products pass our quality check before reaching your hands.',
                emoji: '✅',
              },
              {
                title: 'Nepali Payment Methods',
                desc: 'Pay via eSewa, Khalti, IME Pay, or good old Cash on Delivery.',
                emoji: '💳',
              },
              {
                title: 'Customer-first Support',
                desc: 'Reach us via WhatsApp, phone, or email — we respond within 2 hours.',
                emoji: '🤝',
              },
              {
                title: 'Easy Returns',
                desc: '7-day no-questions-asked return policy. Your trust matters more than the sale.',
                emoji: '🔄',
              },
            ].map(({ title, desc, emoji }) => (
              <div key={title} className="rounded-xl border border-gray-100 bg-gray-50 p-6">
                <span className="text-3xl">{emoji}</span>
                <h3 className="mt-3 font-bold text-slate-900">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
