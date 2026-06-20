export const dynamic = 'force-dynamic';

import { notFound } from 'next/navigation';
import { getProducts } from '@/lib/data';
import ProductForm from '@/components/admin/ProductForm';
import Link from 'next/link';

interface Props { params: { id: string } }

export default function EditProductPage({ params }: Props) {
  const product = getProducts().find((p) => p.id === params.id);
  if (!product) notFound();

  return (
    <div className="p-8">
      <div className="mb-6">
        <Link href="/admin/products" className="text-xs text-gray-500 hover:text-gray-300">
          ← Back to Products
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-white">Edit Product</h1>
        <p className="mt-0.5 text-sm text-gray-400">{product.name}</p>
      </div>
      <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
        <ProductForm mode="edit" initial={product} />
      </div>
    </div>
  );
}
