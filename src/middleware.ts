import { NextRequest, NextResponse } from 'next/server';

const PROTECTED = ['/dashboard'];
const AUTH_ONLY = ['/login'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasSession = !!request.cookies.get('inai_biz_rt');

  const isProtected = PROTECTED.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  const isAuthOnly = AUTH_ONLY.some((p) => pathname === p || pathname.startsWith(`${p}/`));

  if (isProtected && !hasSession) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isAuthOnly && hasSession) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
};
