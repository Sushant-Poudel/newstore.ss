const benefits = [
  { title: 'Free Delivery', desc: 'Orders above NPR 2,000' },
  { title: '7-Day Returns', desc: 'No questions asked' },
  { title: 'Authentic Quality', desc: 'Every item verified' },
  { title: 'Secure Payments', desc: 'eSewa · Khalti · COD' },
];

export default function BenefitsBar() {
  return (
    <section aria-label="Shopping benefits" className="border-y border-cream-200 bg-white dark:border-brand-900 dark:bg-brand-950">
      <div className="container-xl">
        <div className="grid grid-cols-2 divide-x divide-y divide-cream-200 dark:divide-brand-900 lg:grid-cols-4 lg:divide-y-0">
          {benefits.map((b) => (
            <div key={b.title} className="flex flex-col items-center justify-center gap-1 py-5 text-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-800 dark:text-brand-300">
                {b.title}
              </p>
              <p className="text-[11px] text-brand-400 dark:text-brand-600">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
