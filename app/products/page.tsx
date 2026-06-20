export const dynamic = 'force-dynamic';

import type { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import AnimateIn from '@/components/AnimateIn';
import Breadcrumb from '@/components/Breadcrumb';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { getProducts, getCategories, SITE_URL, SITE_NAME } from '@/lib/data';

export const metadata: Metadata = {
  title: 'All Products',
  description: `Browse our full collection of fashion accessories in Nepal — shoes, clothing, bags, jewelry, watches, and sunglasses. Shop at ${SITE_NAME} with fast delivery and easy returns.`,
  alternates: { canonical: `${SITE_URL}/products` },
};

const PRICE_RANGES = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under NPR 2,000', min: 0, max: 2000 },
  { label: 'NPR 2,000–5,000', min: 2000, max: 5000 },
  { label: 'NPR 5,000–10,000', min: 5000, max: 10000 },
  { label: 'NPR 10,000+', min: 10000, max: Infinity },
];

interface Props {
  searchParams: { search?: string; category?: string; sort?: string; price?: string };
}

const SORT_OPTIONS = [
  { value: '', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest First' },
];

export default function ProductsPage({ searchParams }: Props) {
  const products = getProducts();
  const categories = getCategories();
  const search = searchParams.search?.toLowerCase() ?? '';
  const categoryFilter = searchParams.category ?? '';
  const sort = searchParams.sort ?? '';
  const priceKey = searchParams.price ?? '';
  const priceRange = PRICE_RANGES.find((r) => r.label === decodeURIComponent(priceKey)) ?? PRICE_RANGES[0];

  let filtered = products.filter((p) => {
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search) ||
      p.description.toLowerCase().includes(search) ||
      p.tags.some((t) => t.includes(search));
    const matchCategory = !categoryFilter || p.categorySlug === categoryFilter;
    const matchPrice = p.price >= priceRange.min && p.price < priceRange.max;
    return matchSearch && matchCategory && matchPrice;
  });

  if (sort === 'price-asc')  filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  if (sort === 'rating')     filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  if (sort === 'newest')     filtered = [...filtered].sort((a) => (a.isNew ? -1 : 1));

  const selectedCategory = categories.find((c) => c.slug === categoryFilter);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Products', url: `${SITE_URL}/products` },
        ]}
      />

      {/* Page header */}
      <div className="border-b border-cream-200 dark:border-brand-900 bg-white dark:bg-brand-950">
        <div className="container-xl py-8">
          <Breadcrumb
            crumbs={[
              { label: 'Home', href: '/' },
              { label: selectedCategory ? selectedCategory.name : 'All Products' },
            ]}
          />
          <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="section-title dark:text-white">
                {search
                  ? `Results for "${searchParams.search}"`
                  : selectedCategory
                  ? selectedCategory.name
                  : 'All Products'}
              </h1>
              <p className="mt-1 text-xs text-brand-400">
                {filtered.length} product{filtered.length !== 1 ? 's' : ''}
              </p>
            </div>

            {/* Sort (server-side via URL) */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] uppercase tracking-widest text-brand-400">Sort:</span>
              <div className="flex flex-wrap gap-1.5">
                {SORT_OPTIONS.map((opt) => (
                  <a
                    key={opt.value}
                    href={`/products?${categoryFilter ? `category=${categoryFilter}&` : ''}${search ? `search=${encodeURIComponent(search)}&` : ''}${opt.value ? `sort=${opt.value}` : ''}`}
                    className={`px-3 py-1 text-[11px] font-medium uppercase tracking-widest transition-colors ${
                      sort === opt.value
                        ? 'bg-brand-900 text-white dark:bg-gold-600 dark:text-brand-950'
                        : 'border border-cream-300 dark:border-brand-800 text-brand-500 dark:text-brand-500 hover:border-brand-900 hover:text-brand-900 dark:hover:border-gold-600 dark:hover:text-gold-400'
                    }`}
                  >
                    {opt.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xl py-10">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* ── Sidebar ──────────────────────────────── */}
          <aside className="w-full shrink-0 lg:w-48 space-y-8" aria-label="Filters">
            {/* Category */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-500 mb-3">
                Category
              </p>
              <ul className="space-y-0.5">
                <li>
                  <a
                    href={`/products${sort ? `?sort=${sort}` : ''}${priceKey ? `${sort ? '&' : '?'}price=${encodeURIComponent(priceKey)}` : ''}`}
                    className={`block py-2 text-sm transition-colors ${
                      !categoryFilter
                        ? 'font-semibold text-brand-900 dark:text-white underline underline-offset-2'
                        : 'text-brand-500 hover:text-brand-900 dark:hover:text-white'
                    }`}
                  >
                    All Categories
                  </a>
                </li>
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <a
                      href={`/products?category=${cat.slug}${sort ? `&sort=${sort}` : ''}${priceKey ? `&price=${encodeURIComponent(priceKey)}` : ''}`}
                      className={`flex items-center justify-between py-2 text-sm transition-colors ${
                        categoryFilter === cat.slug
                          ? 'font-semibold text-brand-900 dark:text-white underline underline-offset-2'
                          : 'text-brand-500 hover:text-brand-900 dark:hover:text-white'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-[11px] text-brand-300 dark:text-brand-700">{cat.productCount}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price range */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-500 mb-3">
                Price
              </p>
              <ul className="space-y-0.5">
                {PRICE_RANGES.map((range) => {
                  const active = range.label === priceRange.label;
                  return (
                    <li key={range.label}>
                      <a
                        href={`/products?${categoryFilter ? `category=${categoryFilter}&` : ''}${sort ? `sort=${sort}&` : ''}${range.min > 0 || range.max !== Infinity ? `price=${encodeURIComponent(range.label)}` : ''}`}
                        className={`block py-2 text-sm transition-colors ${
                          active
                            ? 'font-semibold text-brand-900 dark:text-white underline underline-offset-2'
                            : 'text-brand-500 hover:text-brand-900 dark:hover:text-white'
                        }`}
                      >
                        {range.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* ── Product grid ─────────────────────────── */}
          <div className="flex-1">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((product, i) => (
                  <AnimateIn key={product.id} delay={Math.min(i * 0.05, 0.3)}>
                    <ProductCard product={product} />
                  </AnimateIn>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-5 py-24 text-center">
                <svg className="h-14 w-14 text-cream-300 dark:text-brand-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-brand-900 dark:text-white">No products found</h3>
                  <p className="mt-1 text-sm text-brand-500">Try a different search or browse all categories.</p>
                </div>
                <a href="/products" className="btn-outline btn-sm">
                  Clear filters
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
