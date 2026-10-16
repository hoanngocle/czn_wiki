import { NextResponse, type NextRequest } from "next/server";
import characters from "./data/wiki/characters.json";
import { combatantSlug } from "./lib/wiki/urls";

const validRoutes = new Set(characters.filter((character) => character.kind === "combatant").flatMap((character) => [character.id, combatantSlug(character)]));

export function proxy(request: NextRequest) {
  const parts = request.nextUrl.pathname.split("/").filter(Boolean);
  if (parts.length <= 1) return NextResponse.next();
  if (parts.length === 2 && validRoutes.has(parts[1])) return NextResponse.next();
  return new NextResponse("<!doctype html><html lang=\"en\"><title>Combatant not found</title><body><main><h1>Combatant not found</h1><p>This character is not in the saved combatant inventory.</p><a href=\"/combatant\">Browse combatants</a></main></body></html>", { status: 404, headers: { "Content-Type": "text/html; charset=utf-8", "X-Robots-Tag": "noindex" } });
}

export const config = { matcher: "/combatant/:path*" };
