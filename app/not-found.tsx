import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center gap-8 bg-white dark:bg-brand-950 text-center px-4">
      <div>
        <p className="font-serif text-[8rem] font-semibold leading-none text-cream-200 dark:text-brand-800 select-none">
          404
        </p>
        <h1 className="mt-4 font-serif text-2xl font-semibold text-brand-900 dark:text-white">
          Page Not Found
        </h1>
        <p className="mt-3 max-w-sm text-[13px] leading-relaxed text-brand-500 dark:text-brand-500">
          The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back to shopping.
        </p>
      </div>
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <Link
          href="/products"
          className="inline-block bg-brand-900 dark:bg-white px-10 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-white dark:text-brand-950 transition-colors hover:bg-brand-700 dark:hover:bg-cream-100"
        >
          Browse Products
        </Link>
        <Link
          href="/"
          className="inline-block border-b border-brand-900 dark:border-white pb-0.5 text-[11px] font-medium uppercase tracking-[0.22em] text-brand-900 dark:text-white transition-all hover:pb-1"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
