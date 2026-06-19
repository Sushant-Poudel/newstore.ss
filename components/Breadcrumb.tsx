import Link from 'next/link';

interface Crumb {
  label: string;
  href?: string;
}

export default function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="py-2">
      <ol className="flex flex-wrap items-center gap-2 text-xs">
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1;
          return (
            <li key={crumb.label} className="flex items-center gap-2">
              {i > 0 && (
                <span className="text-brand-300" aria-hidden="true">/</span>
              )}
              {isLast || !crumb.href ? (
                <span className={`font-medium uppercase tracking-wider ${isLast ? 'text-brand-700 dark:text-brand-300' : 'text-brand-400 dark:text-brand-600'}`}>
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="font-medium uppercase tracking-wider text-brand-400 dark:text-brand-600 transition-colors hover:text-brand-900 dark:hover:text-white"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
