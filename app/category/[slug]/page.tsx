import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import AnimateIn from '@/components/AnimateIn';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import {
  getCategoryBySlug,
  getProductsByCategory,
  getCategories,
  SITE_URL,
  SITE_NAME,
} from '@/lib/data';

interface Props {
  params: { slug: string };
}

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  return getCategories().map((cat) => ({ slug: cat.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const category = getCategoryBySlug(params.slug);
  if (!category) return {};

  return {
    title: category.metaTitle,
    description: category.metaDescription,
    alternates: { canonical: `${SITE_URL}/category/${category.slug}` },
    openGraph: {
      title: category.metaTitle,
      description: category.metaDescription,
      url: `${SITE_URL}/category/${category.slug}`,
      siteName: SITE_NAME,
      type: 'website',
    },
  };
}

export default function CategoryPage({ params }: Props) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const categoryProducts = getProductsByCategory(params.slug);

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Products', url: `${SITE_URL}/products` },
          { name: category.name, url: `${SITE_URL}/category/${category.slug}` },
        ]}
      />

      {/* Page header */}
      <div className="border-b border-cream-200 dark:border-brand-900 bg-white dark:bg-brand-950">
        <div className="container-xl pt-10 pb-0">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-brand-400">
            <a href="/" className="hover:text-brand-900 dark:hover:text-white transition-colors">Home</a>
            <span>/</span>
            <a href="/products" className="hover:text-brand-900 dark:hover:text-white transition-colors">Products</a>
            <span>/</span>
            <span className="text-brand-700 dark:text-brand-300">{category.name}</span>
          </nav>

          <div className="flex items-end justify-between gap-4 pb-5">
            <h1 className="font-serif text-2xl font-semibold text-brand-900 dark:text-white sm:text-3xl">
              {category.name}
            </h1>
            <span className="shrink-0 text-[11px] text-brand-400 dark:text-brand-600">
              {categoryProducts.length} {categoryProducts.length === 1 ? 'result' : 'results'}
            </span>
          </div>

          {/* Category tabs — link to other categories */}
          <div className="flex items-center gap-0 overflow-x-auto border-t border-cream-200 dark:border-brand-800 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <a
              href="/products"
              className="whitespace-nowrap border-b-2 border-transparent px-4 py-3.5 text-[10px] font-medium uppercase tracking-[0.18em] text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
            >
              All
            </a>
            {getCategories().map((cat) => (
              <a
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`whitespace-nowrap border-b-2 px-4 py-3.5 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors ${
                  cat.slug === params.slug
                    ? 'border-brand-900 dark:border-white text-brand-900 dark:text-white'
                    : 'border-transparent text-brand-400 hover:text-brand-700 dark:hover:text-brand-300'
                }`}
              >
                {cat.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="container-xl py-12">
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
            {categoryProducts.map((product, i) => (
              <AnimateIn key={product.id} delay={Math.min(i * 0.04, 0.25)}>
                <ProductCard product={product} />
              </AnimateIn>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-6 py-32 text-center">
            <svg className="h-12 w-12 text-cream-300 dark:text-brand-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4" />
            </svg>
            <div>
              <h2 className="font-serif text-lg font-semibold text-brand-900 dark:text-white">No products yet</h2>
              <p className="mt-2 text-sm text-brand-500">Check back soon or browse other categories.</p>
            </div>
            <a href="/products" className="border-b border-brand-900 dark:border-white text-[11px] font-medium uppercase tracking-[0.2em] text-brand-900 dark:text-white pb-0.5 hover:pb-1 transition-all">
              Browse all products
            </a>
          </div>
        )}
      </div>
    </>
  );
}
