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

      {/* Shop by Category */}
      <section aria-labelledby="categories-heading" className="py-20">
        <div className="container-xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="eyebrow">Collections</span>
              <h2 id="categories-heading" className="section-title mt-3">Shop by Category</h2>
            </div>
            <Link
              href="/products"
              className="hidden text-xs font-medium uppercase tracking-widest text-brand-500 underline-offset-4 hover:text-brand-900 hover:underline transition-colors sm:block"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section aria-labelledby="featured-heading" className="border-t border-cream-200 bg-white py-20">
        <div className="container-xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="eyebrow">Handpicked for You</span>
              <h2 id="featured-heading" className="section-title mt-3">Featured Products</h2>
            </div>
            <Link
              href="/products"
              className="hidden text-xs font-medium uppercase tracking-widest text-brand-500 underline-offset-4 hover:text-brand-900 hover:underline transition-colors sm:block"
            >
              Shop All
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {featured.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Full-width editorial banner */}
      <section
        aria-label="Promotional banner"
        className="bg-cream-100 py-20"
      >
        <div className="container-xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="eyebrow">Limited Time</span>
              <h2 className="section-title mt-3 text-4xl sm:text-5xl">
                Up to 30% Off<br />
                <span className="text-gold-700">Selected Items</span>
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-brand-600">
                New deals added every week. Don&apos;t miss out on premium accessories at prices
                made for Nepal.
              </p>
              <Link href="/products" className="btn-primary mt-8 inline-flex">
                Browse Sale
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Shoes', href: '/category/shoes', emoji: '👟' },
                { label: 'Bags', href: '/category/bags', emoji: '👜' },
                { label: 'Watches', href: '/category/watches', emoji: '⌚' },
              ].map(({ label, href, emoji }) => (
                <Link
                  key={label}
                  href={href}
                  className="group flex aspect-square flex-col items-center justify-center gap-2 border border-cream-300 bg-white transition-colors hover:border-brand-900"
                >
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">{emoji}</span>
                  <span className="text-xs font-medium uppercase tracking-widest text-brand-700 group-hover:text-brand-900">
                    {label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section aria-labelledby="bestsellers-heading" className="border-t border-cream-200 bg-white py-20">
        <div className="container-xl">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <span className="eyebrow">Most Loved</span>
              <h2 id="bestsellers-heading" className="section-title mt-3">Bestsellers in Nepal</h2>
            </div>
            <Link
              href="/products"
              className="hidden text-xs font-medium uppercase tracking-widest text-brand-500 underline-offset-4 hover:text-brand-900 hover:underline transition-colors sm:block"
            >
              View All
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4">
            {bestsellers.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Why StyleNepal */}
      <section aria-labelledby="why-us-heading" className="bg-cream-100 py-20">
        <div className="container-xl">
          <div className="text-center">
            <span className="eyebrow">Why Choose Us</span>
            <h2 id="why-us-heading" className="section-title mt-3">
              Nepal Shops Smarter with {SITE_NAME}
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Locally Curated',
                desc: 'Every product is handpicked for Nepali tastes — right styles, right sizes, right prices in NPR.',
                icon: '🇳🇵',
              },
              {
                title: 'Fast Nationwide Delivery',
                desc: 'Same-day within Kathmandu Valley. 1–3 business days across all 77 districts.',
                icon: '🚀',
              },
              {
                title: 'Verified Quality',
                desc: 'Each item passes our quality check before it leaves our warehouse. No fakes.',
                icon: '✓',
              },
              {
                title: 'Nepali Payment Methods',
                desc: 'Pay via eSewa, Khalti, IME Pay, or Cash on Delivery — no friction, no surprises.',
                icon: '💳',
              },
              {
                title: 'Dedicated Support',
                desc: 'Real humans available on WhatsApp and phone. We respond within 2 hours.',
                icon: '💬',
              },
              {
                title: 'Easy 7-Day Returns',
                desc: 'If you are not satisfied, we make returns simple, fast, and free of charge.',
                icon: '↩',
              },
            ].map(({ title, desc, icon }) => (
              <div key={title} className="border border-cream-200 bg-white p-7">
                <span className="block text-2xl">{icon}</span>
                <h3 className="mt-4 font-serif text-base font-semibold text-brand-900">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
