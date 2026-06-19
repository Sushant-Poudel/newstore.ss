import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

async function sha256hex(text: string): Promise<string> {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, '0')).join('');
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const pw = process.env.ADMIN_PASSWORD ?? 'AAAA123BCDEF.';
    const expected = await sha256hex(pw);
    const token = request.cookies.get('admin_token')?.value;
    if (token !== expected) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
