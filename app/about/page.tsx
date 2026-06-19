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
  { value: '4.8★', label: 'Average Rating' },
];

const team = [
  { name: 'Sushant Poudel', role: 'Founder & CEO', emoji: '👨‍💼' },
  { name: 'Priya Sharma', role: 'Head of Buying', emoji: '👩‍💼' },
  { name: 'Rajan Thapa', role: 'Operations Lead', emoji: '👨‍🔧' },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-16 text-white">
        <div className="container-xl text-center">
          <h1 className="text-4xl font-black sm:text-5xl">
            About <span className="text-brand-400">{SITE_NAME}</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-300">
            We started with a simple belief: every Nepali deserves access to quality fashion
            without leaving home. Today, we deliver happiness to doorsteps across all 77 districts.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section aria-label="Our achievements" className="border-b border-gray-100 bg-white">
        <div className="container-xl py-10">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-black text-brand-600 sm:text-4xl">{value}</p>
                <p className="mt-1 text-sm text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our story */}
      <section className="py-14">
        <div className="container-xl">
          <div className="mx-auto max-w-3xl">
            <h2 className="section-title">Our Story</h2>
            <div className="mt-5 space-y-4 leading-relaxed text-slate-600">
              <p>
                {SITE_NAME} was born in Kathmandu in 2022, when our founder noticed something
                frustrating: Nepali shoppers had to choose between travelling to crowded markets or
                settling for overpriced imports online. Neither option felt right.
              </p>
              <p>
                We built {SITE_NAME} to change that. By working directly with trusted Nepali
                artisans and vetted international brands, we cut out the middlemen and made
                premium fashion accessible at fair prices in Nepali Rupees.
              </p>
              <p>
                From traditional Bhaktapur sandals to the latest sports sunglasses, from elegant
                gold-plated jewelry to everyday backpacks — our curated catalog is designed
                specifically for Nepali tastes, Nepali sizes, and Nepali budgets.
              </p>
              <p>
                Every order placed helps us support local artisans and grow the Nepali fashion
                ecosystem. When you shop at {SITE_NAME}, you invest in Nepal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-heading" className="bg-white py-14">
        <div className="container-xl">
          <h2 id="values-heading" className="section-title text-center">Our Values</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { emoji: '🇳🇵', title: 'Nepal First', desc: 'Every decision we make puts Nepali customers and artisans at the centre.' },
              { emoji: '✅', title: 'Authenticity', desc: 'We verify every product before it reaches you. No fakes, no compromises.' },
              { emoji: '💸', title: 'Fair Pricing', desc: 'Transparent NPR prices with no hidden charges. What you see is what you pay.' },
              { emoji: '♻️', title: 'Sustainability', desc: 'We prioritise eco-friendly packaging and support sustainable fashion practices.' },
              { emoji: '🤝', title: 'Community', desc: 'Partnering with local craftspeople to preserve and celebrate Nepali heritage.' },
              { emoji: '💬', title: 'Honest Service', desc: 'Real humans answer your queries, every time. No bots, no scripts.' },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="rounded-xl border border-gray-100 p-6">
                <span className="text-3xl">{emoji}</span>
                <h3 className="mt-3 font-bold text-slate-900">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section aria-labelledby="team-heading" className="py-14">
        <div className="container-xl">
          <h2 id="team-heading" className="section-title text-center">Meet the Team</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {team.map(({ name, role, emoji }) => (
              <div key={name} className="flex flex-col items-center gap-3 text-center">
                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-slate-100 text-5xl">
                  {emoji}
                </div>
                <div>
                  <p className="font-bold text-slate-900">{name}</p>
                  <p className="text-sm text-slate-500">{role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-600 py-14 text-white">
        <div className="container-xl text-center">
          <h2 className="text-2xl font-black sm:text-3xl">Ready to Upgrade Your Style?</h2>
          <p className="mt-3 text-brand-100">
            Join 10,000+ Nepalis who trust {SITE_NAME} for their fashion needs.
          </p>
          <Link href="/products" className="btn-secondary mt-6 inline-flex">
            Shop Now &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
