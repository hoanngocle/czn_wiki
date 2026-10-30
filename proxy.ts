import { NextResponse, type NextRequest } from "next/server";
import characters from "./data/wiki/characters.json";
import partners from "./data/wiki/partners.json";
import { combatantSlug } from "./lib/wiki/urls";

const validRoutes = new Set(characters.filter((character) => character.kind === "combatant").flatMap((character) => [character.id, combatantSlug(character)]));
const partnerRoutes = new Map(partners.characters.flatMap(partner => {
  const slug = combatantSlug(partner);
  return [[partner.id, slug], [slug, slug]];
}));

export function proxy(request: NextRequest) {
  const parts = request.nextUrl.pathname.split("/").filter(Boolean).slice(1);
  if (parts.length <= 1) return NextResponse.next();
  // Validate before the cached page shell streams, so unknown routes keep HTTP 404.
  if (parts[0] === "partner") {
    const slug = parts.length === 2 ? partnerRoutes.get(parts[1]) : undefined;
    if (!slug) return new NextResponse("<!doctype html><html lang=\"en\"><title>Partner not found</title><body><main><h1>Partner not found</h1><p>This partner is not in the saved partner inventory.</p><a href=\"/czn/partner\">Browse partners</a></main></body></html>", { status: 404, headers: { "Content-Type": "text/html; charset=utf-8", "X-Robots-Tag": "noindex" } });
    if (parts[1] !== slug) {
      const url = request.nextUrl.clone();
      url.pathname = `/czn/partner/${slug}`;
      return NextResponse.redirect(url, 308);
    }
    return NextResponse.next();
  }
  if (parts.length === 2 && validRoutes.has(parts[1])) return NextResponse.next();
  return new NextResponse("<!doctype html><html lang=\"en\"><title>Combatant not found</title><body><main><h1>Combatant not found</h1><p>This character is not in the saved combatant inventory.</p><a href=\"/czn/combatant\">Browse combatants</a></main></body></html>", { status: 404, headers: { "Content-Type": "text/html; charset=utf-8", "X-Robots-Tag": "noindex" } });
}

export const config = { matcher: ["/czn/combatant/:path*", "/czn/partner/:path*"] };
