'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import ThemeToggle from '@/components/ThemeToggle';

const navLeft = [
  { href: '/products', label: 'Shop All' },
  { href: '/category/shoes', label: 'Shoes' },
  { href: '/category/clothing', label: 'Clothing' },
  { href: '/category/bags', label: 'Bags' },
];

const navRight = [
  { href: '/category/jewelry', label: 'Jewelry' },
  { href: '/category/watches', label: 'Watches' },
  { href: '/category/sunglasses', label: 'Sunglasses' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  }

  const linkClass = (href: string) =>
    `text-[11px] font-medium uppercase tracking-[0.18em] transition-colors duration-200 ${
      pathname === href
        ? 'text-brand-900 dark:text-white'
        : 'text-brand-500 hover:text-brand-900 dark:text-brand-500 dark:hover:text-white'
    }`;

  return (
    <header className={`sticky top-0 z-50 w-full bg-white dark:bg-brand-950 transition-shadow duration-300 ${
      scrolled ? 'shadow-[0_1px_0_0_#e2ddd4] dark:shadow-[0_1px_0_0_#252320]' : ''
    }`}>
      {/* Announcement bar */}
      <div className="bg-brand-900 dark:bg-brand-950 border-b border-transparent dark:border-brand-900 py-1.5 text-center text-[10px] font-medium tracking-[0.22em] text-brand-300 uppercase">
        Free delivery on orders above NPR 2,000 &nbsp;·&nbsp; Cash on Delivery &nbsp;·&nbsp; 7-day returns
      </div>

      {/* Main header */}
      <div className="border-b border-cream-200 dark:border-brand-900">
        <div className="container-xl">
          {/* 3-col grid: nav-left | logo | nav-right+icons */}
          <div className="grid h-[60px] grid-cols-[1fr_auto_1fr] items-center gap-2">

            {/* Col 1: mobile hamburger OR desktop left nav */}
            <div className="flex items-center">
              <button
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex h-8 w-8 flex-col items-center justify-center gap-[5px] text-brand-700 dark:text-brand-400 lg:hidden"
              >
                <span className={`block h-px w-5 bg-current transition-all duration-300 ${menuOpen ? 'translate-y-[6px] rotate-45' : ''}`} />
                <span className={`block h-px w-5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                <span className={`block h-px w-5 bg-current transition-all duration-300 ${menuOpen ? '-translate-y-[6px] -rotate-45' : ''}`} />
              </button>
              <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation left">
                {navLeft.map((link) => (
                  <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Col 2: Logo — always centered */}
            <Link href="/">
              <span className="font-serif text-[1.35rem] font-semibold tracking-wide text-brand-900 dark:text-white whitespace-nowrap">
                Style<span className="text-gold-600 dark:text-gold-500">Nepal</span>
              </span>
            </Link>

            {/* Col 3: desktop right nav + icons */}
            <div className="flex items-center justify-end gap-6">
              <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation right">
                {navRight.map((link) => (
                  <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="flex items-center gap-4">
                <ThemeToggle />
                <button
                  aria-label="Search"
                  onClick={() => setSearchOpen(!searchOpen)}
                  className="text-brand-400 transition-colors hover:text-brand-900 dark:hover:text-white"
                >
                  <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
                <Link
                  href="/cart"
                  aria-label={`Shopping bag, ${totalItems} items`}
                  className="relative text-brand-400 transition-colors hover:text-brand-900 dark:hover:text-white"
                >
                  <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  {totalItems > 0 && (
                    <span className="absolute -right-1.5 -top-1.5 flex h-[14px] w-[14px] items-center justify-center bg-brand-900 dark:bg-gold-600 text-[9px] font-bold text-white dark:text-brand-950">
                      {totalItems > 9 ? '9+' : totalItems}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="border-t border-cream-200 dark:border-brand-900 py-3">
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products…"
                  autoFocus
                  className="w-full border-0 border-b border-brand-200 dark:border-brand-700 bg-transparent px-1 py-2 text-sm text-brand-900 dark:text-white placeholder:text-brand-300 dark:placeholder:text-brand-600 focus:border-brand-900 dark:focus:border-gold-600 focus:outline-none"
                />
                <button type="submit" className="shrink-0 text-[11px] font-medium uppercase tracking-[0.18em] text-brand-500 dark:text-brand-400 hover:text-brand-900 dark:hover:text-white transition-colors">
                  Search
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 top-[calc(60px+28px)] z-40 bg-white dark:bg-brand-950 lg:hidden overflow-y-auto">
          <nav className="container-xl py-8 flex flex-col gap-1">
            {[...navLeft, ...navRight].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block py-3 text-[11px] font-medium uppercase tracking-[0.22em] border-b border-cream-100 dark:border-brand-900 ${
                  pathname === link.href ? 'text-brand-900 dark:text-white' : 'text-brand-500 dark:text-brand-500'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-brand-500 dark:text-brand-500"
            >
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
