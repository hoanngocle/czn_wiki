import { expect, it } from "vitest";
import { getCharacter, getCharacterDetail } from "../../lib/wiki/repository";
import { filterCombatants } from "../../lib/wiki/filters";
import { getCombatants } from "../../lib/wiki/repository";
import { indexCharacterCards } from "../../lib/wiki/character-guide";
import { translateCharacterDetail } from "../../lib/wiki/translation";

it("finds Ross and includes the released E7BOT kit with complete Vietnamese translations", () => {
  expect(filterCombatants(getCombatants(), { query: "Ross", rarities: [5], egos: ["narcissism"], jobs: ["striker"] }).map(item => item.id)).toContain("rossweisse");
  expect(getCharacter("rossweisse")?.source).toBe("e7bot");
  expect(getCharacter("rossweisse")?.sourceId).toBe("30134");
  const detail = getCharacterDetail("rossweisse");
  expect(detail).toBeDefined();
  if (!detail) return;
  expect(detail.startCards.map(card => card.name)).toEqual(["Sword Slash", "Sword Slash", "Standing Blade", "Flicker Blade"]);
  expect(detail.generatedCards?.map(card => card.name)).toEqual(["Shard:Light", "Shard:Dark", "Sword Tassel"]);
  for (const card of [...detail.startCards.slice(3), ...detail.sparkCards.slice(0, 3)]) expect(card.variants).toHaveLength(5);
  expect(detail.manifestEgo).toHaveLength(6);
  expect(detail.potentialNodes).toHaveLength(10);
  expect(detail.potentialNodes.flatMap(node => [node, ...node.upgrade_nodes])).toHaveLength(63);
  expect(detail.collapseSkillCard?.name).toBe("Flickering White Night");
  expect(detail.collapseCards).toHaveLength(2);
  const cards = indexCharacterCards(detail);
  expect(cards.size).toBe(48);
  expect([...cards.values()].every(card => card.sourceId.startsWith("c_30134_"))).toBe(true);
  expect(cards.get("rossweisse_tassel")?.description.replace(/<[^>]*>/g, "")).toContain("+80%");
  expect(cards.get("rossweisse_srt1_pot")?.cost).toBe(0);
  expect(cards.get("rossweisse_uni4_lbk")?.description).toContain("AP");
  expect(cards.get("rossweisse_ego_lbk")?.description).toContain("1600%");
  expect(cards.get("rossweisse_uni2_rsp5")?.description).not.toContain("each<color_orange>0");
  expect([...cards.values()].find(card => card.name === "Flickering White Night")?.cost).toBe(6);
  const localized = indexCharacterCards(translateCharacterDetail(detail));
  const numbers = (value: string) => (value.replace(/<[^>]*>/g, " ").match(/\d+(?:,\d{3})*(?:\.\d+)?/g) ?? []).sort();
  for (const card of cards.values()) {
    const translated = localized.get(card.id)!;
    expect(translated.name).toBe(card.name);
    expect(translated.description).not.toBe(card.description);
    expect(numbers(translated.description), card.id).toEqual(numbers(card.description));
  }
});
