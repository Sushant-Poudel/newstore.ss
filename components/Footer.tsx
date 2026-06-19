import Link from 'next/link';
import { SITE_NAME, WHATSAPP_NUMBER, categories } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-brand-400">
      {/* Main footer grid */}
      <div className="container-xl py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-serif text-xl font-semibold text-white">
                Style<span className="text-gold-500">Nepal</span>
              </span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed">
              Nepal&apos;s premier destination for fashion accessories — from traditional crafts to
              modern essentials, delivered fast.
            </p>

            {/* Social links */}
            <div className="mt-6 flex gap-3">
              {[
                {
                  label: 'Facebook',
                  href: 'https://www.facebook.com/stylenepal',
                  path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
                },
                {
                  label: 'Instagram',
                  href: 'https://www.instagram.com/stylenepal',
                  path: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M7.5 2.5h9a5 5 0 015 5v9a5 5 0 01-5 5h-9a5 5 0 01-5-5v-9a5 5 0 015-5z',
                },
              ].map(({ label, href, path }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center border border-brand-800 text-brand-500 transition-colors hover:border-gold-600 hover:text-gold-500"
                >
                  <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={path} />
                  </svg>
                </a>
              ))}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-8 w-8 items-center justify-center border border-brand-800 text-brand-500 transition-colors hover:border-green-500 hover:text-green-400"
              >
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.091.535 4.06 1.47 5.782L0 24l6.335-1.418A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.95 0-3.77-.524-5.33-1.435l-.38-.226-3.97.888.948-3.847-.248-.397A9.772 9.772 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Categories
            </h3>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm transition-colors hover:text-gold-400"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products" className="text-sm transition-colors hover:text-gold-400">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Help
            </h3>
            <ul className="space-y-3">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact' },
                { href: '/contact', label: 'Shipping Policy' },
                { href: '/contact', label: 'Returns & Refunds' },
                { href: '/contact', label: 'Size Guide' },
                { href: '/contact', label: 'FAQs' },
              ].map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="text-sm transition-colors hover:text-gold-400">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Contact
            </h3>
            <address className="not-italic space-y-3 text-sm">
              <p>New Road, Kathmandu, Nepal</p>
              <p>
                <a href="tel:+9779800000000" className="transition-colors hover:text-gold-400">
                  +977-9800000000
                </a>
              </p>
              <p>
                <a href="mailto:support@stylenepal.com" className="transition-colors hover:text-gold-400">
                  support@stylenepal.com
                </a>
              </p>
              <p className="text-brand-500">Sun–Fri · 9 AM – 6 PM NST</p>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-900">
        <div className="container-xl flex flex-col items-center justify-between gap-3 py-5 text-xs text-brand-600 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <div className="flex items-center gap-2 text-brand-600">
            {['eSewa', 'Khalti', 'IME Pay', 'Cash on Delivery'].map((m) => (
              <span key={m} className="border border-brand-800 px-2 py-0.5">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
