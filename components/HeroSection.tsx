import Link from 'next/link';

export default function HeroSection() {
  return (
    <section aria-label="Hero banner" className="relative overflow-hidden bg-brand-900">
      {/* Subtle texture overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      <div className="container-xl relative z-10">
        <div className="grid min-h-[88vh] grid-cols-1 items-center gap-12 py-20 lg:grid-cols-2">
          {/* Left — text */}
          <div className="max-w-xl">
            <span className="eyebrow text-gold-400">New Collection 2025</span>

            <h1 className="mt-5 font-serif text-5xl font-semibold leading-tight text-white sm:text-6xl lg:text-7xl text-balance">
              Style That
              <br />
              <em className="not-italic text-gold-400">Speaks</em>
              <br />
              Nepal
            </h1>

            <p className="mt-6 max-w-md text-base leading-relaxed text-brand-300">
              Premium shoes, clothing, bags, jewellery, watches &amp; sunglasses — curated for
              modern Nepal, delivered to your door.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/products" className="btn-white">
                Shop Collection
              </Link>
              <Link href="/category/shoes" className="btn-ghost-white">
                Explore Shoes
              </Link>
            </div>

            {/* Stats row */}
            <div className="mt-14 flex gap-10 border-t border-white/10 pt-8">
              {[
                { value: '500+', label: 'Products' },
                { value: '10k+', label: 'Customers' },
                { value: '77', label: 'Districts' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="font-serif text-2xl font-semibold text-white">{value}</p>
                  <p className="mt-0.5 text-xs uppercase tracking-widest text-brand-400">{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — featured category grid */}
          <div className="hidden lg:grid grid-cols-2 gap-3">
            {[
              { label: 'Shoes', emoji: '👟', bg: 'from-stone-700 to-stone-900' },
              { label: 'Jewelry', emoji: '💎', bg: 'from-amber-900 to-stone-900' },
              { label: 'Bags', emoji: '👜', bg: 'from-stone-800 to-zinc-900' },
              { label: 'Watches', emoji: '⌚', bg: 'from-neutral-700 to-stone-900' },
            ].map(({ label, emoji, bg }) => (
              <Link
                key={label}
                href={`/category/${label.toLowerCase()}`}
                className={`group relative flex aspect-square items-end overflow-hidden rounded-sm bg-gradient-to-br ${bg} p-5`}
              >
                <span className="absolute right-4 top-4 text-4xl opacity-40 transition-all duration-500 group-hover:opacity-70 group-hover:scale-110">
                  {emoji}
                </span>
                <span className="relative z-10 text-xs font-medium uppercase tracking-widest text-white/80 group-hover:text-white transition-colors">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
