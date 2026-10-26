import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { getCombatants, getCharacterDetail } from "../../lib/wiki/repository";
import { characterGuides } from "../../data/wiki/guides";
import { characterTranslations } from "../../data/wiki/translations";
import { indexCharacterCards, resolveDeckCard } from "../../lib/wiki/character-guide";
import { translateCard, translateCharacterDetail } from "../../lib/wiki/translation-core";
import { inspectAsset } from "../../scripts/audit-reference-assets.mjs";

const roster = getCombatants();
const legacy = new Set(["1041", "1033", "1052", "30075"]);
const numbers = (text: string) => (text.replace(/<[^>]*>/g, " ").match(/\d+(?:\.\d+)?/g) ?? []).sort();
it("covers imported combatants with guides and officially announced combatants with source kits", () => {
  expect(roster).toHaveLength(39);
  for (const summary of roster.filter(item => item.source === "e7bot")) expect(characterGuides[summary.id]).toBeDefined();
  for (const id of Object.keys(characterGuides)) expect(roster.some(item => item.id === id)).toBe(true);
  expect(Object.keys(characterTranslations).sort()).toEqual(roster.map(item => item.id).sort());
});
describe.each(roster)("$name complete catalog", summary => {
  it("uses valid local portrait and canonical artwork for every card variant", () => {
    const detail = getCharacterDetail(summary.id)!;
    expect(detail?.name).toBe(summary.name);
    expect(existsSync(join("public", summary.portrait))).toBe(true);
    const cards = indexCharacterCards(detail);
    expect(cards.size).toBeGreaterThan(20);
    for (const card of cards.values()) {
      if (summary.source === "stove" && !card.artwork) continue;
      expect(card.artwork, card.id).toBeTruthy();
      const path = join("public", card.artwork!);
      expect(existsSync(path), path).toBe(true);
      expect(inspectAsset(readFileSync(path), ".webp").status, path).toBe("available");
    }
  });
  it("translates every card, term, Ego and potential level without changing gameplay numbers", () => {
    const detail = getCharacterDetail(summary.id)!;
    const translation = characterTranslations[summary.id];
    expect(translation).toBeDefined();
    const localized = translateCharacterDetail(detail, translation);
    const translatedCards = indexCharacterCards(localized);

    for (const card of indexCharacterCards(detail, characterGuides[summary.id]?.extraCards).values()) {
      expect(translation.cards[card.id], card.id).toBeTruthy();
      expect((translatedCards.get(card.id) ?? translateCard(card, translation)).name).toBe(card.name);
      expect(numbers(translation.cards[card.id]), card.id).toEqual(numbers(card.description));
      for (const term of [...card.tooltips, ...card.talent]) {
        const localizedTerm = translation.terms.find(item => item.id === term.id && item.englishDesc === term.desc) ?? translation.terms.find(item => item.id === term.id && item.englishDesc === undefined);
        expect(localizedTerm, term.id).toBeDefined();
        if (!legacy.has(summary.id)) expect(numbers(localizedTerm!.desc), term.id).toEqual(numbers(term.desc));
      }
    }
    for (const ego of detail.manifestEgo) expect(numbers(translation.manifestEgo[ego.id]), ego.id).toEqual(numbers(ego.desc));
    for (const node of detail.potentialNodes.flatMap(node => [node, ...node.upgrade_nodes])) expect(numbers(translation.potentialNodes[node.id]), node.id).toEqual(numbers(node.desc));
  });
});

it("preserves independent modifiers and aliases in source decks", () => {
  const nia = characterGuides["1003"];
  const chord = nia.decks[0].cards.find(card => card.cardId === "c_1003_srt4")!;
  expect(chord.draw).toBe(1);
  expect(chord.effects?.vi).toBe("Nhận 2 Morale trong 1 lượt");
  const cards = indexCharacterCards(getCharacterDetail("1003")!, nia.extraCards);
  const displayed = resolveDeckCard(cards, chord, true);
  expect(displayed.description).toContain("Nhận 2 Morale trong 1 lượt");
  expect(displayed.description).toContain("Rút <color_orange>1</> lá");
  expect(nia.decks[0].cards.some(card => card.cardId === "c_1003_uni2")).toBe(true);
  const luke = characterGuides["1004"].decks[0];
  expect(luke.cards.filter(card => card.cardId === "c_1004_srt4_rsp2")).toEqual([
    { cardId: "c_1004_srt4_rsp2", count: 3, costDelta: -1 },
    { cardId: "c_1004_srt4_rsp2", count: 1 },
  ]);
});

it("uses context-specific Exhaust counts for canonical and neutral cards", () => {
  const translation = characterTranslations["1009"];
  const terms = translation.terms.filter(term => term.id === "TALENT_EXHAUST_N");
  expect(new Set(terms.map(term => term.englishDesc)).size).toBeGreaterThan(1);
  for (const card of indexCharacterCards(getCharacterDetail("1009")!, characterGuides["1009"].extraCards).values()) {
    const localized = translateCard(card, translation);
    card.talent.forEach((term, index) => expect(numbers(localized.talent[index].desc)).toEqual(numbers(term.desc)));
  }
});
