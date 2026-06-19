import Link from 'next/link';
import type { Category } from '@/lib/types';

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group flex flex-col items-start gap-3 border border-cream-200 bg-white p-6 transition-all duration-300 hover:border-brand-900 hover:shadow-md"
    >
      <span
        aria-hidden="true"
        className="text-2xl opacity-70 transition-transform duration-300 group-hover:scale-110"
      >
        {category.icon}
      </span>

      <div className="flex-1">
        <h3 className="font-serif text-base font-semibold text-brand-900 transition-colors group-hover:text-gold-700">
          {category.name}
        </h3>
        <p className="mt-1 text-xs leading-relaxed text-brand-500">{category.description}</p>
      </div>

      <div className="flex w-full items-center justify-between">
        <span className="text-xs text-brand-400">{category.productCount} items</span>
        <span className="text-xs font-medium uppercase tracking-widest text-brand-400 transition-colors group-hover:text-brand-900">
          Shop →
        </span>
      </div>
    </Link>
  );
}
