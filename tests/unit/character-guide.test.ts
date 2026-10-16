import { describe, expect, it } from "vitest";
import { getCharacterDetail } from "../../lib/wiki/repository";
import { indexCharacterCards, resolveDeckCard } from "../../lib/wiki/character-guide";
import sereniel from "../../data/wiki/characters/30075.json";
import type { CharacterDetail } from "../../lib/wiki/types";

describe("shared character card references", () => {
  it("preserves X cost when resolving a Sereniel deck variant", () => {
    const cards = indexCharacterCards(sereniel as CharacterDetail);
    const card = resolveDeckCard(cards, { cardId: "c_30075_uni2_rsp4", count: 1 }, true);
    expect(card.cost).toBe(-1);
  });
  it("resolves variants without copying artwork or modifying original stats", () => {
    const cards = indexCharacterCards(getCharacterDetail("1041")!);
    const source = cards.get("c_1041_uni3_rsp4")!;
    const display = resolveDeckCard(cards, { cardId: source.id, count: 4, costDelta: -1, draw: 1 }, true);
    expect(display.cost).toBe(0);
    expect(source.cost).toBe(1);
    expect(display.name).toBe("Flower of Devoured Fate IV");
    expect(display.artwork).toBe(source.artwork);
    expect(display.video).toBe(source.video);
    expect(display.description).toContain("Rút <color_orange>1</> lá");
    expect(source.description).not.toContain("Rút");
  });
  it("fails clearly for an invalid variant instead of silently showing another card", () => {
    expect(() => resolveDeckCard(new Map(), { cardId: "missing", count: 1 }, false)).toThrow("Unknown guide card: missing");
  });
});
