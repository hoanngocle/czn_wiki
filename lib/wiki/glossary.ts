import type { CharacterTranslation } from "../../data/wiki/translations";
import { label } from "./labels";

type Definition = CharacterTranslation["terms"][number];
export type GlossaryTerm = Definition & { aliases: string[]; definitions: Definition[] };

const strip = (text: string) => text.replace(/<[^>]*>/g, "").toLocaleLowerCase().replace(/[\s.,:;]+/g, " ").trim();
const numbers = (text: string) => text.replace(/<[^>]*>/g, "").match(/-?\d+(?:\.\d+)?/g)?.join("|") ?? "";
// These editorial entries expand the same source mechanic, not every same-name effect.
const equivalents: Record<string, string> = {
  TERM_ATTUNEMENT: "TRIGGER_WHEN_BREAK",
  TERM_TENACITY_DAMAGE: "CARD_EGO_DAMAGE",
  TERM_ACTION_POINTS: "CARD_ENERGY",
};

export function collectGlossary(translations: Record<string, CharacterTranslation>): GlossaryTerm[] {
  const groups = new Map<string, { title: string; aliases: Set<string>; entries: Definition[] }>();
  for (const translation of Object.values(translations)) for (const term of translation.terms) {
    const originalTitle = (term.englishTitle ?? term.title).replace(/:\s*$/, "").trim();
    const title = originalTitle === "Action Points" ? "AP" : originalTitle;
    const key = title.toLocaleLowerCase();
    const group = groups.get(key) ?? { title, aliases: new Set<string>(), entries: [] };
    group.aliases.add(originalTitle);
    group.entries.push(term);
    groups.set(key, group);
  }
  return [...groups.values()].map(group => {
    const definitions: Definition[] = [];
    // Source descriptions distinguish contextual definitions that reuse an ID.
    const entries = [...group.entries].sort((a, b) => Number(Boolean(b.englishDesc)) - Number(Boolean(a.englishDesc)));
    for (const term of entries) {
      const identity = equivalents[term.id] ?? term.id;
      const index = definitions.findIndex(existing => {
        if ((equivalents[existing.id] ?? existing.id) !== identity) return false;
        if (equivalents[term.id] || equivalents[existing.id]) return true;
        if (existing.englishDesc && term.englishDesc) return strip(existing.englishDesc) === strip(term.englishDesc);
        // Older overlays have no English description; match their original ID and parameters.
        return numbers(existing.desc) === numbers(term.desc);
      });
      if (index === -1) definitions.push(term);
      else if (equivalents[term.id]) definitions[index] = term;
    }
    const primary = definitions[0];
    const translatedTitle = label(group.title, true);
    return { ...primary, title: translatedTitle !== group.title ? translatedTitle : primary.title.replace(/:\s*$/, "").trim(),
      englishTitle: group.title, aliases: [...group.aliases], definitions };
  }).sort((a, b) => (a.englishTitle ?? a.title).localeCompare(b.englishTitle ?? b.title, "en", { numeric: true }));
}
