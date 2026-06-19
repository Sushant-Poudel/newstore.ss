import Link from 'next/link';
import type { Category } from '@/lib/types';

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group flex flex-col items-center gap-3 rounded-xl bg-white p-6 text-center shadow-sm ring-1 ring-gray-100 card-hover"
    >
      <span
        aria-hidden="true"
        className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-3xl transition-transform duration-300 group-hover:scale-110"
      >
        {category.icon}
      </span>
      <div>
        <h3 className="font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
          {category.name}
        </h3>
        <p className="mt-0.5 text-xs text-slate-500">{category.description}</p>
      </div>
      <span className="rounded-full bg-brand-50 px-3 py-0.5 text-xs font-semibold text-brand-700">
        {category.productCount} products
      </span>
    </Link>
  );
}
