
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/app/actions';
import { cookies } from 'next/headers';

// This is required to enable Node.js APIs in middleware
export const runtime = 'nodejs'

// 1. Specify protected routes
const protectedRoutes = ['/admin'];

// The default export is the middleware function itself
export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some((prefix) => path.startsWith(prefix));

  if (!isProtectedRoute) {
    return NextResponse.next();
  }
  
  // 2. Decrypt the session from the cookie
  const cookie = cookies().get('session')?.value;
  const session = await decrypt(cookie);

  // 3. Redirect to login if the user is not authenticated or is not an admin
  if (!session?.userId || session.role !== 'admin') {
    return NextResponse.redirect(new URL('/login', req.nextUrl));
  }
  
  return NextResponse.next();
}

// The config object specifies which routes the middleware should run on.
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
