import Link from 'next/link';
import type { Category } from '@/lib/types';

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group flex flex-col items-center gap-3 border border-cream-200 bg-white px-4 py-6 text-center transition-all duration-300 hover:border-brand-800 hover:shadow-sm"
    >
      <span aria-hidden="true" className="text-2xl opacity-60 transition-transform duration-300 group-hover:scale-110">
        {category.icon}
      </span>

      <div>
        <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-900 transition-colors group-hover:text-gold-700">
          {category.name}
        </h3>
        <p className="mt-1 text-[10px] text-brand-400">{category.productCount} items</p>
      </div>
    </Link>
  );
}
