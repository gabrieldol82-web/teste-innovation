import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
  
  const token = request.cookies.get('token_de_acesso')?.value;
  const { pathname } = request.nextUrl;

  if (!token && pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && pathname === '/login') {
    return NextResponse.redirect(new URL('/produtos', request.url));
  }

  return NextResponse.next();
}

// O Matcher define em quais rotas o middleware vai rodar. 
// Vamos ignorar arquivos estáticos e de sistema para não travar o Next.js
export const config = {
  matcher: [
    /*
     * Ignora rotas de API, arquivos estáticos (_next/static, _next/image),
     * e o ícone do favicon.ico.
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};