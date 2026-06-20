'use client';

import { usePathname } from 'next/navigation';
import ScrollToTop from '@/components/ScrollToTop';

interface Props {
  children: React.ReactNode;
  header: React.ReactNode;
  footer: React.ReactNode;
}

export default function StoreShell({ children, header, footer }: Props) {
  const pathname = usePathname();

  if (pathname.startsWith('/admin')) {
    return <>{children}</>;
  }

  return (
    <>
      {header}
      <main className="flex-1">{children}</main>
      {footer}
      <ScrollToTop />
    </>
  );
}
