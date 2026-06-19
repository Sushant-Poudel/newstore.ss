import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';
import { ToastProvider } from '@/context/ToastContext';
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/JsonLd';
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '@/lib/data';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Nepal's Fashion & Accessories Store`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'fashion store Nepal', 'accessories Nepal', 'buy shoes Nepal',
    'clothing Nepal online', 'bags Nepal', 'jewelry Nepal',
    'watches Nepal', 'sunglasses Nepal', 'online shopping Nepal',
    'Kathmandu fashion', 'nepali fashion store', 'stylenepal',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true, follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website', locale: 'en_NP', url: SITE_URL, siteName: SITE_NAME,
    title: `${SITE_NAME} — Nepal's Fashion & Accessories Store`,
    description: SITE_DESCRIPTION,
    images: [{ url: `${SITE_URL}/og-image.jpg`, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Nepal's Fashion & Accessories Store`,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.jpg`],
  },
  alternates: { canonical: SITE_URL },
  verification: { google: 'your-google-verification-code' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="flex min-h-screen flex-col bg-cream-50 font-sans antialiased">
        <CartProvider>
          <ToastProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </ToastProvider>
        </CartProvider>
      </body>
    </html>
  );
}
