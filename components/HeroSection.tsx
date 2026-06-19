import Link from 'next/link';

export default function HeroSection() {
  return (
    <section
      aria-label="Hero banner"
      className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-red-950"
    >
      {/* Decorative circles */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-600 opacity-10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-brand-800 opacity-10 blur-3xl" />

      <div className="container-xl relative z-10 py-20 sm:py-28 lg:py-36">
        <div className="max-w-2xl">
          <span className="inline-block rounded-full bg-brand-600/20 px-4 py-1 text-sm font-semibold text-brand-400">
            Nepal&apos;s #1 Fashion Store
          </span>

          <h1 className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl text-balance">
            Style That Speaks{' '}
            <span className="text-brand-400">Nepal</span>
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-slate-300 text-balance">
            Discover premium shoes, clothing, bags, jewelry, watches, and sunglasses — all
            delivered fast to your doorstep anywhere in Nepal.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/products" className="btn-primary px-8 py-3.5 text-base">
              Shop Now
            </Link>
            <Link href="/category/shoes" className="btn-outline border-slate-500 px-8 py-3.5 text-base text-slate-300 hover:border-brand-500 hover:bg-brand-600 hover:text-white">
              View Shoes
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-slate-400">
            {[
              { icon: '🚚', text: 'Free delivery above NPR 2,000' },
              { icon: '🔄', text: 'Easy 7-day returns' },
              { icon: '✅', text: '100% authentic products' },
              { icon: '💳', text: 'eSewa & Khalti accepted' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <span aria-hidden="true">{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
