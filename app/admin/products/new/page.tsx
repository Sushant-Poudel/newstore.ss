import ProductForm from '@/components/admin/ProductForm';
import Link from 'next/link';

export default function NewProductPage() {
  return (
    <div className="p-8">
      <div className="mb-6">
        <Link href="/admin/products" className="text-xs text-gray-500 hover:text-gray-300">
          ← Back to Products
        </Link>
        <h1 className="mt-2 text-2xl font-semibold text-white">Add New Product</h1>
      </div>
      <div className="rounded-lg border border-gray-800 bg-gray-900 p-6">
        <ProductForm mode="create" />
      </div>
    </div>
  );
}
