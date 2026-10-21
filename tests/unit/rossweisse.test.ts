import { expect, it } from "vitest";
import { getCharacter, getCharacterDetail } from "../../lib/wiki/repository";
import { filterCombatants } from "../../lib/wiki/filters";
import { getCombatants } from "../../lib/wiki/repository";
import { indexCharacterCards } from "../../lib/wiki/character-guide";
import { translateCharacterDetail } from "../../lib/wiki/translation";

it("finds officially announced Ross and preserves her published kit without inventing unpublished data", () => {
  expect(filterCombatants(getCombatants(), { query: "Ross", rarities: [5], egos: ["narcissism"], jobs: ["striker"] }).map(item => item.id)).toContain("rossweisse");
  expect(getCharacter("rossweisse")?.source).toBe("stove");
  const detail = getCharacterDetail("rossweisse");
  expect(detail).toBeDefined();
  if (!detail) return;
  expect(detail.startCards.map(card => card.name)).toEqual(["Sword Slash", "Sword Slash", "Standing Blade", "Flicker Blade", "Shard:Light", "Shard:Dark"]);
  for (const card of [...detail.startCards.slice(3), ...detail.sparkCards.slice(0, 3)]) expect(card.variants).toHaveLength(5);
  expect(detail.manifestEgo).toHaveLength(6);
  expect(detail.potentialNodes).toEqual([]);
  expect(detail.collapseSkillCard).toBeNull();
  expect(detail.collapseCards).toEqual([]);
  const cards = indexCharacterCards(detail);
  expect([...cards.values()].find(card => card.name === "Sword Tassel")?.description).toContain("+80%");
  expect([...cards.values()].find(card => card.name === "Flickering White Night")?.cost).toBe(6);
  const localized = indexCharacterCards(translateCharacterDetail(detail));
  const numbers = (value: string) => (value.match(/\d+(?:,\d{3})*(?:\.\d+)?/g) ?? []).sort();
  for (const card of cards.values()) {
    const translated = localized.get(card.id)!;
    expect(translated.name).toBe(card.name);
    expect(translated.description).not.toBe(card.description);
    expect(numbers(translated.description), card.id).toEqual(numbers(card.description));
  }
});
