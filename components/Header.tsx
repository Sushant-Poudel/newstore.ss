'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { SITE_NAME } from '@/lib/data';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Shop' },
  { href: '/category/shoes', label: 'Shoes' },
  { href: '/category/clothing', label: 'Clothing' },
  { href: '/category/bags', label: 'Bags' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();
  const pathname = usePathname();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-900 text-white shadow-lg">
      {/* Announcement bar */}
      <div className="bg-brand-600 py-2 text-center text-xs font-medium tracking-wide">
        Free delivery on orders above NPR 2,000 &bull; Cash on Delivery available across Nepal
      </div>

      <div className="container-xl">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 text-2xl font-black tracking-tight">
            <span className="text-brand-500">Style</span>
            <span className="text-white">Nepal</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-brand-400 ${
                  pathname === link.href ? 'text-brand-400' : 'text-slate-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <button
              aria-label="Search"
              onClick={() => setSearchOpen(!searchOpen)}
              className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Cart */}
            <Link
              href="/cart"
              aria-label={`Shopping cart, ${totalItems} items`}
              className="relative rounded-lg p-2 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-xs font-bold text-white">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu */}
            <button
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
              className="rounded-lg p-2 text-slate-300 transition-colors hover:bg-slate-700 hover:text-white lg:hidden"
            >
              {menuOpen ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-slate-700 py-3">
            <form onSubmit={handleSearch} className="flex gap-2">
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search shoes, bags, jewelry..."
                autoFocus
                className="w-full rounded-lg bg-slate-800 px-4 py-2 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button type="submit" className="btn-primary shrink-0 px-4 py-2 text-sm">
                Search
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="border-t border-slate-700 bg-slate-900 lg:hidden" aria-label="Mobile navigation">
          <div className="container-xl py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-2 py-3 text-sm font-medium transition-colors hover:text-brand-400 ${
                  pathname === link.href ? 'text-brand-400' : 'text-slate-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
