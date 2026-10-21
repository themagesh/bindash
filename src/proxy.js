import { NextResponse } from 'next/server';
import { SESSION_COOKIE, verifySessionToken } from '@/lib/auth';

// Public routes that must stay reachable without a session.
const PUBLIC_PATHS = ['/login'];

// Auth endpoints handle their own credential checks and must not be blocked.
const PUBLIC_API_PREFIXES = ['/api/auth/login', '/api/auth/logout', '/api/auth/session'];

const PUBLIC_PREFIXES = [
  '/_next',
  '/favicon.ico',
  '/icon.png',
  '/bala.svg',
  '/file.svg',
  '/globe.svg',
  '/next.svg',
  '/vercel.svg',
  '/window.svg',
];

function isPublicPath(pathname) {
  if (PUBLIC_PATHS.includes(pathname)) return true;
  if (PUBLIC_API_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return true;
  return PUBLIC_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );
}

export function proxy(request) {
  const { pathname } = request.nextUrl;

  if (isPublicPath(pathname)) {
    return NextResponse.next();
  }

  const session = request.cookies.get(SESSION_COOKIE)?.value;
  const isAuthenticated = verifySessionToken(session);

  if (isAuthenticated) {
    return NextResponse.next();
  }

  // API routes must not be redirected to the login HTML page.
  if (pathname.startsWith('/api/')) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const loginUrl = new URL('/login', request.url);
  if (pathname !== '/') {
    loginUrl.searchParams.set('from', pathname);
  }
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    // Everything except Next.js internals and static files.
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
