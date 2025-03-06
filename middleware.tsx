import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Vérifier si nous sommes déjà sur la route /subdomain pour éviter la boucle
  if (request.nextUrl.pathname.startsWith("/subdomain")) {
    return NextResponse.next();
  }

  const hostname = request.headers.get("host");
  if (!hostname) {
    return NextResponse.next();
  }

  // Extraire le hostname sans le port
  const subdomain = hostname.split(":")[0].split(".")[0];
  const excludedSubdomains = ["www", "localhost"];

  if (subdomain && !excludedSubdomains.includes(subdomain)) {
    const url = new URL(`/subdomain/${subdomain}`, request.url);
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// Spécifier les chemins sur lesquels le middleware doit s'exécuter
export const config = {
  matcher: [
    // Exclure les fichiers statiques et API routes
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
