import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import Breadcrumb from '@/components/Breadcrumb';
import { BreadcrumbJsonLd } from '@/components/JsonLd';
import {
  getCategoryBySlug,
  getProductsByCategory,
  getCategories,
  SITE_URL,
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

      {/* Category hero */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 py-10">
        <div className="container-xl">
          <Breadcrumb
            crumbs={[
              { label: 'Home', href: '/' },
              { label: 'Products', href: '/products' },
              { label: category.name },
            ]}
          />
          <div className="mt-4 flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-4xl">
              {category.icon}
            </span>
            <div>
              <h1 className="text-3xl font-black text-white sm:text-4xl">{category.name}</h1>
              <p className="mt-1 text-slate-400">{category.description}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-xl py-10">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            {categoryProducts.length} product{categoryProducts.length !== 1 ? 's' : ''} in {category.name}
          </p>
          <a href="/products" className="text-sm font-semibold text-brand-600 hover:underline">
            View all categories &rarr;
          </a>
        </div>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-xl bg-white py-20 text-center shadow-sm">
            <p className="text-4xl">📦</p>
            <p className="mt-4 font-semibold text-slate-700">No products in this category yet.</p>
          </div>
        )}
      </div>
    </>
  );
}
