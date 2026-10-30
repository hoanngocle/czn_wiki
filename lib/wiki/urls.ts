import type { CharacterSummary } from "./types";

export function combatantSlug(character: Pick<CharacterSummary, "name">): string {
  return character.name.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export function combatantUrl(character: Pick<CharacterSummary, "name">): string {
  return `/czn/combatant/${combatantSlug(character)}`;
}
