import Link from 'next/link';
import { SITE_NAME, WHATSAPP_NUMBER } from '@/lib/data';
import { categories } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container-xl py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-2xl font-black">
              <span className="text-brand-500">Style</span>
              <span className="text-white">Nepal</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              Nepal&apos;s premier online fashion accessories store. We deliver premium shoes,
              clothing, bags, jewelry, watches, and sunglasses right to your door.
            </p>
            <div className="mt-5 flex gap-3">
              {[
                { label: 'Facebook', href: 'https://www.facebook.com/stylenepal', icon: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z' },
                { label: 'Instagram', href: 'https://www.instagram.com/stylenepal', icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01M6.5 6.5h.01M2 12c0 5.523 4.477 10 10 10s10-4.477 10-10S17.523 2 12 2 2 6.477 2 12z' },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition-colors hover:bg-brand-600 hover:text-white"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                  </svg>
                </a>
              ))}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition-colors hover:bg-green-600 hover:text-white"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.091.535 4.06 1.47 5.782L0 24l6.335-1.418A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818c-1.95 0-3.77-.524-5.33-1.435l-.38-.226-3.97.888.948-3.847-.248-.397A9.772 9.772 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182c5.43 0 9.818 4.388 9.818 9.818 0 5.43-4.388 9.818-9.818 9.818z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Shop Categories
            </h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-sm text-slate-400 transition-colors hover:text-brand-400"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/products" className="text-sm text-slate-400 transition-colors hover:text-brand-400">
                  All Products
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Help
            </h3>
            <ul className="space-y-2">
              {[
                { href: '/about', label: 'About Us' },
                { href: '/contact', label: 'Contact Us' },
                { href: '/contact', label: 'Shipping Policy' },
                { href: '/contact', label: 'Return & Refund' },
                { href: '/contact', label: 'Size Guide' },
                { href: '/contact', label: 'FAQs' },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-400 transition-colors hover:text-brand-400">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                New Road, Kathmandu, Nepal
              </li>
              <li className="flex gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +977-9800000000
              </li>
              <li className="flex gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                support@stylenepal.com
              </li>
              <li className="flex gap-2">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Sun–Fri: 9 AM – 6 PM NST
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="container-xl flex flex-col items-center justify-between gap-3 py-5 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>We accept:</span>
            {['eSewa', 'Khalti', 'IME Pay', 'Cash on Delivery'].map((m) => (
              <span key={m} className="rounded bg-slate-800 px-2 py-0.5 text-slate-400">
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
