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
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-slate-800 py-14 text-white">
        <div className="container-xl text-center">
          <h1 className="text-4xl font-black sm:text-5xl">
            Contact <span className="text-brand-400">{SITE_NAME}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-slate-300">
            Have a question, need help with your order, or want to collaborate? We&apos;re here
            for you — reply within 2 hours during business hours.
          </p>
        </div>
      </section>

      <ContactForm />
    </div>
  );
}
