import type { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import Breadcrumb from '@/components/Breadcrumb';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import { products, categories, SITE_URL, SITE_NAME } from '@/lib/data';

export const metadata: Metadata = {
  title: 'All Products',
  description: `Browse our full collection of fashion accessories in Nepal — shoes, clothing, bags, jewelry, watches, and sunglasses. Shop online at ${SITE_NAME} with fast delivery and easy returns.`,
  alternates: { canonical: `${SITE_URL}/products` },
  openGraph: {
    title: `All Products | ${SITE_NAME}`,
    url: `${SITE_URL}/products`,
  },
};

interface Props {
  searchParams: { search?: string; category?: string; sort?: string };
}

const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest First' },
];

export default function ProductsPage({ searchParams }: Props) {
  const search = searchParams.search?.toLowerCase() ?? '';
  const categoryFilter = searchParams.category ?? '';
  const sort = searchParams.sort ?? 'default';

  let filtered = products.filter((p) => {
    const matchesSearch =
      !search ||
      p.name.toLowerCase().includes(search) ||
      p.description.toLowerCase().includes(search) ||
      p.tags.some((t) => t.toLowerCase().includes(search));
    const matchesCategory = !categoryFilter || p.categorySlug === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price);
  else if (sort === 'rating') filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  else if (sort === 'newest') filtered = [...filtered].filter((p) => p.isNew).concat(filtered.filter((p) => !p.isNew));

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Products', url: `${SITE_URL}/products` },
        ]}
      />

      <div className="container-xl py-8">
        <Breadcrumb crumbs={[{ label: 'Home', href: '/' }, { label: 'All Products' }]} />

        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="section-title">All Products</h1>
            <p className="mt-1 text-sm text-slate-500">
              {search ? (
                <>Showing results for &ldquo;<strong>{searchParams.search}</strong>&rdquo;</>
              ) : (
                `${filtered.length} products available`
              )}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-6 lg:flex-row">
          {/* Sidebar filters */}
          <aside className="w-full shrink-0 lg:w-56" aria-label="Filter products">
            <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-700">
                Filter by Category
              </h2>
              <ul className="space-y-1">
                <li>
                  <a
                    href="/products"
                    className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                      !categoryFilter
                        ? 'bg-brand-50 font-semibold text-brand-700'
                        : 'text-slate-600 hover:bg-gray-50'
                    }`}
                  >
                    All Categories
                  </a>
                </li>
                {categories.map((cat) => (
                  <li key={cat.slug}>
                    <a
                      href={`/products?category=${cat.slug}${sort !== 'default' ? `&sort=${sort}` : ''}`}
                      className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                        categoryFilter === cat.slug
                          ? 'bg-brand-50 font-semibold text-brand-700'
                          : 'text-slate-600 hover:bg-gray-50'
                      }`}
                    >
                      <span>
                        <span aria-hidden="true" className="mr-2">{cat.icon}</span>
                        {cat.name}
                      </span>
                      <span className="text-xs text-slate-400">{cat.productCount}</span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-700">
                  Sort By
                </h2>
                <ul className="space-y-1">
                  {SORT_OPTIONS.map((opt) => (
                    <li key={opt.value}>
                      <a
                        href={`/products?${categoryFilter ? `category=${categoryFilter}&` : ''}sort=${opt.value}`}
                        className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                          sort === opt.value
                            ? 'bg-brand-50 font-semibold text-brand-700'
                            : 'text-slate-600 hover:bg-gray-50'
                        }`}
                      >
                        {opt.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-4 rounded-xl bg-white py-20 text-center shadow-sm">
                <span className="text-5xl">🔍</span>
                <h3 className="text-lg font-bold text-slate-900">No products found</h3>
                <p className="text-sm text-slate-500">
                  Try a different search term or browse all categories.
                </p>
                <a href="/products" className="btn-primary">
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
