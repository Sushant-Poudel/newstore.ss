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

interface Props {
  searchParams: { search?: string; category?: string; sort?: string };
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

  let filtered = products.filter((p) => {
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search) ||
      p.description.toLowerCase().includes(search) ||
      p.tags.some((t) => t.includes(search));
    const matchCategory = !categoryFilter || p.categorySlug === categoryFilter;
    return matchSearch && matchCategory;
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
      <div className="border-b border-cream-200 bg-white">
        <div className="container-xl py-8">
          <Breadcrumb
            crumbs={[
              { label: 'Home', href: '/' },
              { label: selectedCategory ? selectedCategory.name : 'All Products' },
            ]}
          />
          <div className="mt-3 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="section-title">
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
                        ? 'bg-brand-900 text-white'
                        : 'border border-cream-300 text-brand-500 hover:border-brand-900 hover:text-brand-900'
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
          <aside className="w-full shrink-0 lg:w-48" aria-label="Filter by category">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-500 mb-3">
              Category
            </p>
            <ul className="space-y-0.5">
              <li>
                <a
                  href={`/products${sort ? `?sort=${sort}` : ''}`}
                  className={`block py-2 text-sm transition-colors ${
                    !categoryFilter
                      ? 'font-semibold text-brand-900 underline underline-offset-2'
                      : 'text-brand-500 hover:text-brand-900'
                  }`}
                >
                  All Categories
                </a>
              </li>
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <a
                    href={`/products?category=${cat.slug}${sort ? `&sort=${sort}` : ''}`}
                    className={`flex items-center justify-between py-2 text-sm transition-colors ${
                      categoryFilter === cat.slug
                        ? 'font-semibold text-brand-900 underline underline-offset-2'
                        : 'text-brand-500 hover:text-brand-900'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-[11px] text-brand-300">{cat.productCount}</span>
                  </a>
                </li>
              ))}
            </ul>
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
                <svg className="h-14 w-14 text-cream-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-brand-900">No products found</h3>
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
