import Link from 'next/link';

export default function HeroSection() {
  return (
    <section aria-label="Hero banner" className="relative overflow-hidden bg-brand-950">
      {/* Grain texture overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '128px',
        }}
      />

      <div className="container-xl relative z-10">
        <div className="flex min-h-[92vh] flex-col items-center justify-center py-24 text-center">

          {/* Eyebrow */}
          <span className="hero-1 inline-block text-[10px] font-medium uppercase tracking-[0.35em] text-gold-500">
            Nepal&apos;s Premier Fashion Destination
          </span>

          {/* Main headline */}
          <h1 className="hero-2 mt-8 max-w-4xl font-serif text-[clamp(3rem,8vw,6.5rem)] font-semibold leading-[0.95] tracking-tight text-white">
            Style That<br />
            <em className="not-italic text-gold-400">Speaks</em> Nepal
          </h1>

          {/* Subheadline */}
          <p className="hero-3 mt-8 max-w-sm text-[13px] leading-loose tracking-wide text-brand-400">
            Premium shoes, clothing, bags &amp; accessories —<br />curated and delivered across Nepal.
          </p>

          {/* CTAs */}
          <div className="hero-4 mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link href="/products" className="btn-white px-10 py-4 text-[11px]">
              Shop the Collection
            </Link>
            <Link href="/category/shoes" className="btn-ghost-white px-10 py-4 text-[11px]">
              Explore Shoes
            </Link>
          </div>

          {/* Stats — separated by thin dividers */}
          <div className="hero-5 mt-20 flex items-center gap-0 divide-x divide-white/10">
            {[
              { value: '500+', label: 'Products' },
              { value: '10k+', label: 'Customers' },
              { value: '77', label: 'Districts' },
            ].map(({ value, label }) => (
              <div key={label} className="px-10 text-center first:pl-0 last:pr-0">
                <p className="font-serif text-2xl font-semibold text-white">{value}</p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-brand-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade to background */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-950 to-transparent" aria-hidden="true" />
    </section>
  );
}
