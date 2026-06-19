import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <p className="text-8xl font-black text-brand-600">404</p>
      <h1 className="text-2xl font-bold text-slate-900">Page not found</h1>
      <p className="max-w-md text-slate-500">
        The page you are looking for does not exist or has been moved. Let&apos;s get you back
        to shopping!
      </p>
      <div className="flex gap-3">
        <Link href="/" className="btn-primary">
          Go Home
        </Link>
        <Link href="/products" className="btn-secondary">
          Browse Products
        </Link>
      </div>
    </div>
  );
}
