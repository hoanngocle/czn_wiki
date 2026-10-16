import glossary from "../../data/wiki/translations/vi/renoa.glossary.json";
import type { Card } from "./types";

const inferredTerms = glossary.terms.filter(term => ["TERM_DESTROY", "TERM_ATTUNEMENT"].includes(term.id));
const normalizeTitle = (title: string) => title.replace(/:$/, "").trim().toLowerCase();

export function getCardTerms(card: Pick<Card, "description" | "talent" | "tooltips">) {
  const terms = new Map<string, Card["tooltips"][number]>();
  for (const term of [...card.talent, ...card.tooltips]) {
    const definition = inferredTerms.find(candidate => candidate.id === term.id || normalizeTitle(candidate.title) === normalizeTitle(term.title));
    const resolved = definition ?? term;
    terms.set(resolved.id, resolved);
  }
  const description = card.description.replace(/<br\s*\/?\s*>/gi, " ").replace(/<[^>]*>/g, "");
  for (const term of inferredTerms) {
    if (new RegExp(`\\b${term.title}\\b`, "i").test(description)) terms.set(term.id, term);
  }
  return [...terms.values()];
}
