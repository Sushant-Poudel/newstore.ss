import type { Metadata } from 'next';
import { SITE_NAME, SITE_URL } from '@/lib/data';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: `Get in touch with ${SITE_NAME} — Nepal's fashion accessories store. Reach us via WhatsApp, phone, or email for orders, returns, and general queries. We respond within 2 hours.`,
  alternates: { canonical: `${SITE_URL}/contact` },
  openGraph: {
    title: `Contact Us | ${SITE_NAME}`,
    description: `Reach ${SITE_NAME} via WhatsApp, phone, or email. Fast support for your fashion orders in Nepal.`,
    url: `${SITE_URL}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className="bg-white dark:bg-brand-950">
      {/* Header */}
      <div className="border-b border-cream-200 dark:border-brand-800 bg-[#F5F0EB] dark:bg-brand-900 py-16 sm:py-20">
        <div className="container-xl">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-brand-400">
            <a href="/" className="hover:text-brand-900 dark:hover:text-white transition-colors">Home</a>
            <span>/</span>
            <span className="text-brand-700 dark:text-brand-300">Contact</span>
          </nav>
          <p className="text-[9px] font-medium uppercase tracking-[0.4em] text-brand-400">We&apos;re here to help</p>
          <h1 className="mt-4 font-serif text-3xl font-semibold text-brand-950 dark:text-white sm:text-4xl">
            Get in Touch
          </h1>
          <p className="mt-4 max-w-md text-[14px] leading-[1.9] text-brand-500">
            Questions about your order, returns, or just want to say hello? We respond within 2 hours during business hours.
          </p>
        </div>
      </div>

      <ContactForm />
    </div>
  );
}
