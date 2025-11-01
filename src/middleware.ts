import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/app/actions';

export const runtime = 'nodejs';

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get('session')?.value;

  // Se não houver cookie, redireciona para o login
  if (!sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const session = await decrypt(sessionCookie);

    // Se a sessão for inválida ou o usuário não for admin, redireciona
    if (!session?.userId || session.role !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // Se for admin, permite o acesso
    return NextResponse.next();

  } catch (error) {
    // Em caso de erro na descriptografia do token (ex: expirado), redireciona
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// O middleware só será aplicado às rotas que correspondem a este padrão
export const config = {
  matcher: '/admin/:path*',
}