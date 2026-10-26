import { readFileSync } from "node:fs";
import { createGameTermNormalizer } from "../lib/wiki/game-term-names.mjs";
const read = path => JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"));
const preserveNames = createGameTermNormalizer(
    read("../data/wiki/translations/vi/terminology.json"),
    read("../data/wiki/translations/game-term-aliases.json"),
);

/**
 * Normalize Vietnamese guide prose without translating English game or card names.
 * @template T
 * @param {T} guide
 * @param {{name: string}[]} cards
 * @param {{englishTitle?: string}[]} terms
 * @returns {T}
 */
export function localizeGuideProse(guide, cards = [], terms = []) {
    const protectedNames = new Set([...cards.map(card => card.name), ...terms.map(term => term.englishTitle)].filter(Boolean));
    const visit = value => {
        if (Array.isArray(value)) return value.map(visit);
        if (!value || typeof value !== "object") return value;
        return Object.fromEntries(Object.entries(value).map(([key, child]) => [key,
            key === "vi" && typeof child === "string" ? protectedNames.has(child) ? child : preserveNames(child.replace(/Soul Rip/g, "Soul Riff"), value.en) : visit(child),
        ]));
    };
    return visit(guide);
}
