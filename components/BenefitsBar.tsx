const benefits = [
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
    ),
    title: 'Free Delivery',
    desc: 'On orders above NPR 2,000',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    ),
    title: '7-Day Returns',
    desc: 'No questions asked',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    ),
    title: '100% Authentic',
    desc: 'Verified quality products',
  },
  {
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    ),
    title: 'Secure Payment',
    desc: 'eSewa, Khalti, Cash on Delivery',
  },
];

export default function BenefitsBar() {
  return (
    <section aria-label="Shopping benefits" className="border-y border-gray-100 bg-white">
      <div className="container-xl py-8">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.title} className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50">
                <svg className="h-5 w-5 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {b.icon}
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">{b.title}</p>
                <p className="text-xs text-slate-500">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
