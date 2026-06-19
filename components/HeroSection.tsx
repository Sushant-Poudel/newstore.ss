import Link from 'next/link';

export default function HeroSection() {
  return (
    <section aria-label="Hero banner" className="relative overflow-hidden bg-brand-900">
      {/* Subtle dot pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="container-xl relative z-10">
        <div className="grid min-h-[90vh] grid-cols-1 items-center gap-12 py-20 lg:grid-cols-2">

          {/* Left — text (CSS stagger animations on load) */}
          <div className="max-w-xl">
            <span className="eyebrow hero-1 text-gold-400">New Collection 2025</span>

            <h1 className="hero-2 mt-5 font-serif text-5xl font-semibold leading-[1.1] text-white sm:text-6xl lg:text-[5.5rem]">
              Style That<br />
              <em className="not-italic text-gold-400">Speaks</em><br />
              Nepal
            </h1>

            <p className="hero-3 mt-6 max-w-md text-base leading-relaxed text-brand-300">
              Premium shoes, clothing, bags, jewellery, watches &amp; sunglasses —
              curated for modern Nepal, delivered to your door.
            </p>

            <div className="hero-4 mt-10 flex flex-wrap gap-4">
              <Link href="/products" className="btn-white">
                Shop Collection
              </Link>
              <Link href="/category/shoes" className="btn-ghost-white">
                Explore Shoes
              </Link>
            </div>

            {/* Stats */}
            <div className="hero-5 mt-14 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              {[
                { value: '500+', label: 'Products' },
                { value: '10k+', label: 'Happy Customers' },
                { value: '77', label: 'Districts Served' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-serif text-2xl font-semibold text-white">{value}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-widest text-brand-400">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — category grid (desktop only) */}
          <div className="hero-3 hidden gap-3 lg:grid lg:grid-cols-2">
            {[
              { label: 'Shoes', href: '/category/shoes', emoji: '👟', delay: 'delay-100' },
              { label: 'Jewellery', href: '/category/jewelry', emoji: '💎', delay: 'delay-150' },
              { label: 'Bags', href: '/category/bags', emoji: '👜', delay: 'delay-200' },
              { label: 'Watches', href: '/category/watches', emoji: '⌚', delay: 'delay-300' },
            ].map(({ label, href, emoji }) => (
              <Link
                key={label}
                href={href}
                className="
                  group relative flex aspect-[3/4] flex-col items-start justify-end
                  overflow-hidden bg-brand-800 p-5
                  ring-1 ring-white/5
                  transition-all duration-500 ease-out
                  hover:ring-gold-600/60 hover:scale-[0.98]
                "
              >
                {/* Big emoji fading into corner */}
                <span
                  aria-hidden="true"
                  className="absolute right-5 top-5 text-5xl opacity-20 transition-all duration-500 group-hover:opacity-50 group-hover:scale-110"
                >
                  {emoji}
                </span>

                {/* Category label */}
                <div className="relative z-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60 transition-colors group-hover:text-gold-400">
                    {label}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-widest text-white/30 transition-colors group-hover:text-white/60">
                    Shop now →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
