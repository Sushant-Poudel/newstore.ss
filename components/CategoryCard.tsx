import Link from 'next/link';
import type { Category } from '@/lib/types';

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className="group relative flex flex-col items-center gap-0 text-center"
    >
      {/* Square image placeholder with editorial dark treatment */}
      <div className="relative w-full overflow-hidden bg-brand-900 dark:bg-brand-800 aspect-square">
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)`,
            backgroundSize: '12px 12px',
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span aria-hidden="true" className="text-2xl opacity-30 transition-all duration-500 group-hover:opacity-60 group-hover:scale-110">
            {category.icon}
          </span>
        </div>
        <div className="absolute inset-0 bg-brand-950/0 transition-colors duration-500 group-hover:bg-brand-950/20" />
      </div>

      <div className="mt-3">
        <h3 className="text-[10px] font-medium uppercase tracking-[0.22em] text-brand-900 dark:text-brand-200 transition-colors group-hover:text-gold-700 dark:group-hover:text-gold-400">
          {category.name}
        </h3>
        <p className="mt-0.5 text-[9px] text-brand-400 dark:text-brand-600">{category.productCount} items</p>
      </div>
    </Link>
  );
}
