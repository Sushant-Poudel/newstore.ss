import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_NAME, SITE_URL } from '@/lib/data';

export const metadata: Metadata = {
  title: `About Us`,
  description: `Learn about ${SITE_NAME} — Nepal's leading online fashion and accessories store. Our story, mission, and why thousands of Nepalis trust us for their fashion needs.`,
  alternates: { canonical: `${SITE_URL}/about` },
};

const stats = [
  { value: '10,000+', label: 'Happy Customers' },
  { value: '500+', label: 'Products' },
  { value: '77', label: 'Districts Served' },
  { value: '4.8', label: 'Average Rating' },
];

const values = [
  { title: 'Nepal First', desc: 'Every decision we make puts Nepali customers and artisans at the centre.' },
  { title: 'Authenticity', desc: 'We verify every product before it reaches you. No fakes, no compromises.' },
  { title: 'Fair Pricing', desc: 'Transparent NPR prices with no hidden charges. What you see is what you pay.' },
  { title: 'Sustainability', desc: 'Eco-friendly packaging and support for sustainable fashion practices.' },
  { title: 'Community', desc: 'Partnering with local craftspeople to preserve and celebrate Nepali heritage.' },
  { title: 'Honest Service', desc: 'Real humans answer your queries, every time. No bots, no scripts.' },
];

const team = [
  { name: 'Sushant Poudel', role: 'Founder & CEO' },
  { name: 'Priya Sharma', role: 'Head of Buying' },
  { name: 'Rajan Thapa', role: 'Operations Lead' },
];

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-brand-950">

      {/* Hero */}
      <section className="border-b border-cream-200 dark:border-brand-800 bg-[#F5F0EB] dark:bg-brand-900 py-20 sm:py-28">
        <div className="container-xl max-w-3xl">
          <p className="text-[9px] font-medium uppercase tracking-[0.4em] text-brand-400">Our Story</p>
          <h1 className="mt-5 font-serif text-[clamp(2.2rem,5vw,4rem)] font-semibold leading-[1.05] tracking-[-0.01em] text-brand-950 dark:text-white">
            Bringing Premium Fashion<br />
            <em className="not-italic italic">to Every Corner</em><br />
            of Nepal
          </h1>
          <p className="mt-8 max-w-xl text-[14px] leading-[1.9] text-brand-500">
            {SITE_NAME} was born in Kathmandu with a simple mission: make quality fashion accessible to every Nepali,
            whether they live in Thamel or Taplejung.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section aria-label="Our achievements" className="border-b border-cream-200 dark:border-brand-800 bg-white dark:bg-brand-950">
        <div className="container-xl">
          <div className="grid grid-cols-2 divide-x divide-y divide-cream-200 dark:divide-brand-800 sm:grid-cols-4 sm:divide-y-0">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center gap-1 py-10 text-center">
                <p className="font-serif text-3xl font-semibold text-brand-900 dark:text-white sm:text-4xl">{value}</p>
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-brand-400">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container-xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-[0.35em] text-brand-400">How we started</p>
              <h2 className="mt-4 font-serif text-2xl font-semibold text-brand-900 dark:text-white sm:text-3xl">
                From Kathmandu, For Nepal
              </h2>
              <div className="mt-6 space-y-5 text-[14px] leading-[1.9] text-brand-600 dark:text-brand-400">
                <p>
                  {SITE_NAME} was founded in 2022 when our team noticed something frustrating: Nepali shoppers had
                  to choose between travelling to crowded markets or settling for overpriced imports. Neither felt right.
                </p>
                <p>
                  We built {SITE_NAME} to change that. By working directly with trusted Nepali artisans and vetted
                  international brands, we cut out the middlemen and made premium fashion accessible at fair prices
                  in Nepali Rupees.
                </p>
                <p>
                  From traditional Bhaktapur sandals to the latest sports sunglasses — our curated catalog is
                  designed specifically for Nepali tastes, Nepali sizes, and Nepali budgets.
                </p>
              </div>
            </div>
            <div className="relative bg-brand-900 dark:bg-brand-800 aspect-square lg:aspect-auto overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage: `repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)`,
                  backgroundSize: '20px 20px',
                }}
                aria-hidden="true"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <span className="font-serif text-[6rem] font-semibold leading-none text-white/10">SN</span>
                <p className="text-center text-[10px] font-medium uppercase tracking-[0.4em] text-white/20">
                  StyleNepal<br />Est. 2022
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-heading" className="border-y border-cream-200 dark:border-brand-800 bg-[#F5F0EB] dark:bg-brand-900 py-20">
        <div className="container-xl">
          <p className="text-[9px] font-medium uppercase tracking-[0.35em] text-brand-400">What we stand for</p>
          <h2 id="values-heading" className="mt-4 font-serif text-2xl font-semibold text-brand-900 dark:text-white sm:text-3xl">
            Our Values
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-px bg-cream-200 dark:bg-brand-800 sm:grid-cols-2 lg:grid-cols-3">
            {values.map(({ title, desc }) => (
              <div key={title} className="bg-[#F5F0EB] dark:bg-brand-900 p-8">
                <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-900 dark:text-white">{title}</h3>
                <p className="mt-3 text-[13px] leading-relaxed text-brand-600 dark:text-brand-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section aria-labelledby="team-heading" className="py-20">
        <div className="container-xl">
          <p className="text-[9px] font-medium uppercase tracking-[0.35em] text-brand-400">The people behind it</p>
          <h2 id="team-heading" className="mt-4 font-serif text-2xl font-semibold text-brand-900 dark:text-white sm:text-3xl">
            Meet the Team
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {team.map(({ name, role }) => (
              <div key={name} className="border border-cream-200 dark:border-brand-800 p-8">
                <div className="mb-4 h-16 w-16 bg-brand-900 dark:bg-brand-700" aria-hidden="true" />
                <p className="font-serif text-base font-semibold text-brand-900 dark:text-white">{name}</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-brand-400">{role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-950 py-24 text-center">
        <div className="container-xl max-w-xl">
          <p className="text-[9px] font-medium uppercase tracking-[0.4em] text-gold-500">Join Us</p>
          <h2 className="mt-5 font-serif text-2xl font-semibold text-white sm:text-3xl">
            Ready to Upgrade Your Style?
          </h2>
          <p className="mt-4 text-[13px] leading-loose text-brand-400">
            Join 10,000+ Nepalis who trust {SITE_NAME} for their fashion needs.
          </p>
          <Link
            href="/products"
            className="mt-10 inline-block border border-white/30 px-10 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-white transition-all hover:bg-white hover:text-brand-950"
          >
            Shop the Collection
          </Link>
        </div>
      </section>
    </div>
  );
}
