'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';

const navLinks = [
  { href: '/products', label: 'Shop All' },
  { href: '/category/shoes', label: 'Shoes' },
  { href: '/category/clothing', label: 'Clothing' },
  { href: '/category/bags', label: 'Bags' },
  { href: '/category/jewelry', label: 'Jewelry' },
  { href: '/category/watches', label: 'Watches' },
  { href: '/category/sunglasses', label: 'Sunglasses' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const { totalItems } = useCart();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      {/* Announcement bar */}
      <div className="bg-brand-900 py-2 text-center text-xs font-medium tracking-widest text-white uppercase">
        Free delivery above NPR 2,000 &nbsp;&bull;&nbsp; Cash on Delivery available &nbsp;&bull;&nbsp; Easy 7-day returns
      </div>

      {/* Main header */}
      <div className={`border-b transition-shadow duration-300 ${scrolled ? 'border-cream-200 shadow-sm' : 'border-cream-200'}`}>
        <div className="container-xl">
          <div className="flex h-16 items-center justify-between gap-6">

            {/* Left: mobile menu toggle */}
            <button
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-brand-700 hover:text-brand-900 transition-colors lg:hidden"
            >
              {menuOpen ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className="font-serif text-xl font-semibold tracking-wide text-brand-900">
                Style<span className="text-gold-700">Nepal</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-xs font-medium uppercase tracking-widest transition-colors ${
                    pathname === link.href
                      ? 'text-brand-900 border-b border-brand-900 pb-0.5'
                      : 'text-brand-500 hover:text-brand-900'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right icons */}
            <div className="flex items-center gap-4">
              {/* Search */}
              <button
                aria-label="Search"
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-brand-500 hover:text-brand-900 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Cart */}
              <Link
                href="/cart"
                aria-label={`Shopping cart, ${totalItems} items`}
                className="relative text-brand-500 hover:text-brand-900 transition-colors"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalItems > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-900 text-[10px] font-bold text-white">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </Link>

              {/* About — desktop only */}
              <Link
                href="/about"
                className="hidden text-xs font-medium uppercase tracking-widest text-brand-500 hover:text-brand-900 transition-colors xl:block"
              >
                About
              </Link>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="border-t border-cream-200 py-3">
              <form onSubmit={handleSearch} className="flex gap-2">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search shoes, bags, jewelry…"
                  autoFocus
                  className="w-full border border-cream-300 bg-cream-50 px-4 py-2.5 text-sm text-brand-900 placeholder:text-brand-400 focus:border-brand-900 focus:outline-none focus:ring-0"
                />
                <button type="submit" className="btn-primary px-5 py-2.5 text-xs">
                  Search
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="border-b border-cream-200 bg-white lg:hidden" aria-label="Mobile navigation">
          <div className="container-xl py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-2 py-2.5 text-sm font-medium uppercase tracking-widest transition-colors ${
                  pathname === link.href ? 'text-brand-900' : 'text-brand-500 hover:text-brand-900'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/about"
              onClick={() => setMenuOpen(false)}
              className="block px-2 py-2.5 text-sm font-medium uppercase tracking-widest text-brand-500 hover:text-brand-900"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="block px-2 py-2.5 text-sm font-medium uppercase tracking-widest text-brand-500 hover:text-brand-900"
            >
              Contact
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
