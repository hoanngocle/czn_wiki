import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { decodeSnapshot, normalizeDetail } from "../../scripts/import-e7bot.mjs";

const snapshots = [["narja", "1052"], ["veronica", "1033"], ["serienial", "30075"]];
function read(slug: string, id: string) {
  return decodeSnapshot(readFileSync(`docs/${slug}/api/czn/characters/${id}.html`, "utf8"), "2egkWEkLvR9idARLvjqfJdWKfR24HJgY").data;
}
describe("individual character snapshots", () => {
  it.each(snapshots)("preserves %s cards, variants and progression", (slug, id) => {
    const raw = read(slug, id);
    const detail = normalizeDetail(raw);
    expect(detail.id).toBe(id);
    expect(detail.sourceFile).toBe(`api/czn/characters/${id}.html`);
    expect(detail.startCards.map((card: { name: string }) => card.name)).toEqual(raw.combatant.start_cards.map((card: { name: string }) => card.name));
    expect(detail.sparkCards).toHaveLength(4);
    expect(detail.manifestEgo).toHaveLength(6);
    expect(detail.potentialNodes).toHaveLength(10);
  });
  it("allows the X-cost sentinel but rejects other negative costs", () => {
    const raw = read("serienial", "30075");
    expect(normalizeDetail(raw).sparkCards[1].variants[3].cost).toBe(-1);
    raw.combatant.spark_cards[1].r_spark_cards[3].cost = -2;
    expect(() => normalizeDetail(raw)).toThrow(/Invalid cost/);
  });
});
