export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import AnimateIn from '@/components/AnimateIn';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { getProducts, getCategories, SITE_URL, SITE_NAME } from '@/lib/data';

export const metadata: Metadata = {
  title: 'All Products',
  description: `Browse our full collection of fashion accessories in Nepal — shoes, clothing, bags, jewelry, watches, and sunglasses. Shop at ${SITE_NAME} with fast delivery and easy returns.`,
  alternates: { canonical: `${SITE_URL}/products` },
};

const PRICE_RANGES = [
  { label: 'All', min: 0, max: Infinity },
  { label: 'Under NPR 2,000', min: 0, max: 2000 },
  { label: 'NPR 2,000–5,000', min: 2000, max: 5000 },
  { label: 'NPR 5,000–10,000', min: 5000, max: 10000 },
  { label: 'NPR 10,000+', min: 10000, max: Infinity },
];

const SORT_OPTIONS = [
  { value: '', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low–High' },
  { value: 'price-desc', label: 'Price: High–Low' },
  { value: 'rating', label: 'Top Rated' },
];

interface Props {
  searchParams: { search?: string; category?: string; sort?: string; price?: string };
}

function buildUrl(params: Record<string, string | undefined>) {
  const p = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => { if (v) p.set(k, v); });
  const s = p.toString();
  return `/products${s ? `?${s}` : ''}`;
}

export default function ProductsPage({ searchParams }: Props) {
  const products = getProducts();
  const categories = getCategories();
  const search = searchParams.search?.toLowerCase() ?? '';
  const categoryFilter = searchParams.category ?? '';
  const sort = searchParams.sort ?? '';
  const priceLabel = searchParams.price ? decodeURIComponent(searchParams.price) : 'All';
  const priceRange = PRICE_RANGES.find((r) => r.label === priceLabel) ?? PRICE_RANGES[0];

  let filtered = products.filter((p) => {
    const matchSearch = !search ||
      p.name.toLowerCase().includes(search) ||
      p.description.toLowerCase().includes(search) ||
      p.tags.some((t) => t.includes(search));
    const matchCat = !categoryFilter || p.categorySlug === categoryFilter;
    const matchPrice = p.price >= priceRange.min && p.price < priceRange.max;
    return matchSearch && matchCat && matchPrice;
  });

  if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  if (sort === 'newest') filtered = [...filtered].sort((a) => (a.isNew ? -1 : 1));

  const activeCategory = categories.find((c) => c.slug === categoryFilter);
  const pageTitle = search
    ? `Search: "${searchParams.search}"`
    : activeCategory?.name ?? 'All Products';

  const base = { category: categoryFilter || undefined, sort: sort || undefined, price: priceLabel !== 'All' ? priceLabel : undefined };

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: SITE_URL },
        { name: pageTitle, url: `${SITE_URL}/products${categoryFilter ? `?category=${categoryFilter}` : ''}` },
      ]} />

      {/* Page header */}
      <div className="border-b border-cream-200 dark:border-brand-900 bg-white dark:bg-brand-950">
        <div className="container-xl pt-10 pb-0">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-brand-400">
            <a href="/" className="hover:text-brand-900 dark:hover:text-white transition-colors">Home</a>
            <span>/</span>
            <span className="text-brand-700 dark:text-brand-300">{pageTitle}</span>
          </nav>

          <div className="flex items-end justify-between gap-4 pb-5">
            <h1 className="font-serif text-2xl font-semibold text-brand-900 dark:text-white sm:text-3xl">
              {pageTitle}
            </h1>
            <span className="shrink-0 text-[11px] text-brand-400 dark:text-brand-600">
              {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
            </span>
          </div>

          {/* Horizontal filter strip */}
          <div className="flex items-center gap-0 overflow-x-auto border-t border-cream-200 dark:border-brand-800 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {/* Category chips */}
            <div className="flex shrink-0 items-center gap-0">
              <a
                href={buildUrl({ ...base, category: undefined })}
                className={`whitespace-nowrap border-b-2 px-4 py-3.5 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors ${
                  !categoryFilter
                    ? 'border-brand-900 dark:border-white text-brand-900 dark:text-white'
                    : 'border-transparent text-brand-400 hover:text-brand-700 dark:hover:text-brand-300'
                }`}
              >
                All
              </a>
              {categories.map((cat) => (
                <a
                  key={cat.slug}
                  href={buildUrl({ ...base, category: cat.slug })}
                  className={`whitespace-nowrap border-b-2 px-4 py-3.5 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors ${
                    categoryFilter === cat.slug
                      ? 'border-brand-900 dark:border-white text-brand-900 dark:text-white'
                      : 'border-transparent text-brand-400 hover:text-brand-700 dark:hover:text-brand-300'
                  }`}
                >
                  {cat.name}
                </a>
              ))}
            </div>

            {/* Spacer */}
            <div className="flex-1" />

            {/* Sort select */}
            <div className="shrink-0 border-l border-cream-200 dark:border-brand-800">
              <select
                defaultValue={sort}
                onChange={(e) => { window.location.href = buildUrl({ ...base, sort: e.target.value || undefined }); }}
                className="h-full border-0 bg-transparent py-3.5 pl-4 pr-8 text-[10px] font-medium uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400 focus:outline-none cursor-pointer"
                aria-label="Sort products"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>

            {/* Price select */}
            <div className="shrink-0 border-l border-cream-200 dark:border-brand-800">
              <select
                defaultValue={priceLabel}
                onChange={(e) => {
                  const val = e.target.value;
                  window.location.href = buildUrl({ ...base, price: val !== 'All' ? val : undefined });
                }}
                className="h-full border-0 bg-transparent py-3.5 pl-4 pr-8 text-[10px] font-medium uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400 focus:outline-none cursor-pointer"
                aria-label="Filter by price"
              >
                {PRICE_RANGES.map((r) => (
                  <option key={r.label} value={r.label}>{r.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container-xl py-12">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((product, i) => (
              <AnimateIn key={product.id} delay={Math.min(i * 0.04, 0.25)}>
                <ProductCard product={product} />
              </AnimateIn>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-6 py-32 text-center">
            <svg className="h-12 w-12 text-cream-300 dark:text-brand-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <div>
              <h2 className="font-serif text-lg font-semibold text-brand-900 dark:text-white">No products found</h2>
              <p className="mt-2 text-sm text-brand-500">Try adjusting your filters or browse all categories.</p>
            </div>
            <a href="/products" className="border-b border-brand-900 dark:border-white text-[11px] font-medium uppercase tracking-[0.2em] text-brand-900 dark:text-white pb-0.5 hover:pb-1 transition-all">
              Clear all filters
            </a>
          </div>
        )}
      </div>
    </>
  );
}
