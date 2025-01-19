import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Autoriser les requêtes OPTIONS (CORS preflight)
  if (request.method === 'OPTIONS') {
    return NextResponse.next()
  }

  // Vérifier si nous sommes déjà sur la route /subdomain pour éviter la boucle
  if (request.nextUrl.pathname.startsWith('/subdomain')) {
    return NextResponse.next()
  }

  // Autoriser les requêtes API
  if (request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  const hostname = request.headers.get('host')
  if (!hostname) {
    return NextResponse.next()
  }

  // Extraire le hostname sans le port
  const subdomain = hostname.split(':')[0].split('.')[0]
  const excludedSubdomains = ['www', 'localhost']

  if (subdomain && !excludedSubdomains.includes(subdomain)) {
    const url = new URL(`/subdomain/${subdomain}`, request.url)
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

// Mettre à jour le matcher pour exclure explicitement les routes API
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
