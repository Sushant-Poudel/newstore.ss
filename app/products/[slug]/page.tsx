import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductBySlug, products as allProducts, SITE_NAME, SITE_URL } from '@/lib/data';
import { ProductJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd';
import ProductDetailClient from '@/components/ProductDetailClient';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return allProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) return {};

  const title = `${product.name} in Nepal`;
  const description = `Buy ${product.name} online in Nepal for ${new Intl.NumberFormat('en-NP').format(product.price)} NPR. ${product.description} Shop at ${SITE_NAME} — fast delivery across Nepal, easy returns.`;

  return {
    title,
    description,
    keywords: [...product.tags, 'buy online Nepal', 'Nepal delivery', SITE_NAME],
    alternates: { canonical: `${SITE_URL}/products/${product.slug}` },
    openGraph: {
      type: 'website',
      title: `${title} | ${SITE_NAME}`,
      description,
      url: `${SITE_URL}/products/${product.slug}`,
      images: [
        {
          url: product.image,
          width: 600,
          height: 600,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [product.image],
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = allProducts
    .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <ProductJsonLd
        product={{
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image,
          slug: product.slug,
          rating: product.rating,
          reviewCount: product.reviewCount,
          sku: product.sku,
          brand: product.brand,
          stock: product.stock,
        }}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: SITE_URL },
          { name: 'Products', url: `${SITE_URL}/products` },
          { name: product.category, url: `${SITE_URL}/category/${product.categorySlug}` },
          { name: product.name, url: `${SITE_URL}/products/${product.slug}` },
        ]}
      />
      <ProductDetailClient product={product} related={related} />
    </>
  );
}
