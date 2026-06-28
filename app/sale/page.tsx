export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import AnimateIn from '@/components/AnimateIn';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { getProducts, SITE_URL, SITE_NAME, getDiscount } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Sale',
  description: `Shop discounted fashion accessories at ${SITE_NAME}. Save on shoes, clothing, bags, jewelry, watches, and sunglasses — delivered across Nepal.`,
  alternates: { canonical: `${SITE_URL}/sale` },
};

export default function SalePage() {
  const products = getProducts().filter((p) => p.originalPrice && p.originalPrice > p.price);
  const sorted = [...products].sort((a, b) => {
    const discA = a.originalPrice ? (a.originalPrice - a.price) / a.originalPrice : 0;
    const discB = b.originalPrice ? (b.originalPrice - b.price) / b.originalPrice : 0;
    return discB - discA;
  });

  const maxDiscount = sorted.length > 0 && sorted[0].originalPrice
    ? Math.round(((sorted[0].originalPrice - sorted[0].price) / sorted[0].originalPrice) * 100)
    : 0;

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: SITE_URL },
        { name: 'Sale', url: `${SITE_URL}/sale` },
      ]} />

      {/* Header */}
      <div className="border-b border-cream-200 dark:border-brand-900 bg-white dark:bg-brand-950">
        <div className="container-xl pt-10 pb-0">
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-brand-400">
            <a href="/" className="hover:text-brand-900 dark:hover:text-white transition-colors">Home</a>
            <span>/</span>
            <span className="text-brand-700 dark:text-brand-300">Sale</span>
          </nav>
          <div className="flex items-end justify-between gap-4 pb-5">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.35em] text-red-500">Limited Time</p>
              <h1 className="mt-2 font-serif text-2xl font-semibold text-brand-900 dark:text-white sm:text-3xl">
                Sale
              </h1>
              {maxDiscount > 0 && (
                <p className="mt-1 text-sm text-brand-500 dark:text-brand-400">
                  Up to {maxDiscount}% off selected styles
                </p>
              )}
            </div>
            <span className="shrink-0 text-[11px] text-brand-400 dark:text-brand-600">
              {sorted.length} {sorted.length === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container-xl py-12">
        {sorted.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
            {sorted.map((product, i) => (
              <AnimateIn key={product.id} delay={Math.min(i * 0.04, 0.25)}>
                <ProductCard product={product} />
              </AnimateIn>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-6 py-32 text-center">
            <p className="font-serif text-lg font-semibold text-brand-900 dark:text-white">No sale items right now</p>
            <p className="text-sm text-brand-500">Check back soon — we regularly add discounted styles.</p>
            <a href="/products" className="border-b border-brand-900 dark:border-white text-[11px] font-medium uppercase tracking-[0.2em] text-brand-900 dark:text-white pb-0.5 hover:pb-1 transition-all">
              Browse all products
            </a>
          </div>
        )}
      </div>
    </>
  );
}
