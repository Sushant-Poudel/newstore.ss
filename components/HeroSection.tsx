import Link from 'next/link';

export default function HeroSection() {
  return (
    <section aria-label="Hero banner" className="relative bg-[#F5F0EB] dark:bg-brand-950 overflow-hidden">
      <div className="container-xl">
        <div className="grid min-h-[88vh] grid-cols-1 items-center gap-0 lg:grid-cols-2">

          {/* Text column */}
          <div className="flex flex-col justify-center py-20 lg:py-32 lg:pr-16">
            <p className="hero-1 text-[9px] font-medium uppercase tracking-[0.4em] text-brand-500 dark:text-brand-500">
              Nepal&apos;s Premier Fashion Destination
            </p>

            <h1 className="hero-2 mt-6 font-serif text-[clamp(2.8rem,6vw,5.5rem)] font-semibold leading-[0.93] tracking-[-0.01em] text-brand-950 dark:text-white">
              Wear What<br />
              <em className="not-italic italic">Defines</em><br />
              Nepal
            </h1>

            <p className="hero-3 mt-8 max-w-xs text-[13px] leading-[1.9] text-brand-500 dark:text-brand-500">
              Premium shoes, clothing, bags &amp; accessories — curated and delivered across Nepal.
            </p>

            <div className="hero-4 mt-12 flex items-center gap-6">
              <Link
                href="/products"
                className="inline-block border-b border-brand-900 dark:border-white pb-0.5 text-[11px] font-medium uppercase tracking-[0.22em] text-brand-900 dark:text-white transition-all hover:pb-1"
              >
                Shop the Collection
              </Link>
              <Link
                href="/category/shoes"
                className="text-[11px] font-medium uppercase tracking-[0.22em] text-brand-400 dark:text-brand-500 transition-colors hover:text-brand-900 dark:hover:text-white"
              >
                Explore Shoes →
              </Link>
            </div>

            <div className="hero-5 mt-16 flex items-center gap-8 border-t border-cream-300 dark:border-brand-800 pt-8">
              {[
                { value: '500+', label: 'Products' },
                { value: '10,000+', label: 'Customers' },
                { value: '77', label: 'Districts' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-serif text-xl font-semibold text-brand-900 dark:text-white">{value}</p>
                  <p className="mt-0.5 text-[9px] uppercase tracking-[0.22em] text-brand-400 dark:text-brand-600">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image column — editorial mosaic */}
          <div className="hero-2 relative hidden lg:flex lg:h-full lg:min-h-[88vh] lg:items-stretch">
            {/* Tall portrait image placeholder with brand pattern */}
            <div className="relative w-full bg-brand-900 dark:bg-brand-900 overflow-hidden">
              {/* Pattern overlay */}
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage: `repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)`,
                  backgroundSize: '24px 24px',
                }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-12">
                <span className="font-serif text-[5rem] font-semibold leading-none text-white/10">SN</span>
                <p className="text-center text-[10px] font-medium uppercase tracking-[0.4em] text-white/20">
                  StyleNepal<br />Collection 2025
                </p>
              </div>
              {/* Floating tag */}
              <div className="absolute bottom-10 left-10 border border-white/20 bg-black/40 backdrop-blur-sm px-5 py-4">
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/60">New Season</p>
                <p className="mt-1 font-serif text-lg text-white">Summer Edit</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
