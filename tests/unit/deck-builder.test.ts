import { describe, expect, it } from "vitest";
import { calculatePT, createDeck, addCard, parseDecks, encodeDeck, decodeDeck, resolveCard, availableCards, validateDeck } from "../../lib/deck-builder/model";
import catalogData from "../../data/deck-builder/catalog.json";
import type { Catalog } from "../../lib/deck-builder/types";

const catalog = catalogData as Catalog;
const mei = () => createDeck("1027", catalog);

describe("deck builder", () => {
  it("starts with eight character cards including potential upgrades at zero PT", () => {
    const deck = mei();
    expect(deck.cardIds).toHaveLength(8);
    expect(deck.cardIds[0].id).toBe("c_1027_srt1_pot");
    expect(calculatePT(deck, catalog).total).toBe(0);
  });
  it("charges deleted initial cards and only charges character copies beyond the first two", () => {
    const deck = mei();
    deck.cardIds.shift();
    expect(calculatePT(deck, catalog).missingScore).toBe(20);
    deck.cardIds.push(deck.cardIds[0], deck.cardIds[0], deck.cardIds[0]);
    expect(calculatePT(deck, catalog)).toMatchObject({ missingScore: 20, copyScore: 40, total: 60 });
  });
  it("does not count epiphany variants as deleted starters", () => {
    const deck = mei();
    deck.cardIds[3] = { id: "c_1027_srt4_rsp5", s: [], e: [] };
    expect(calculatePT(deck, catalog).total).toBe(0);
  });
  it("keeps repeated card entries independent and stops at forty cards", () => {
    let deck = mei();
    while (deck.cardIds.length < 40) deck = addCard(deck, deck.cardIds[0]);
    expect(() => addCard(deck, deck.cardIds[0])).toThrow(/40/);
    expect(deck.cardIds[0]).not.toBe(deck.cardIds[8]);
  });
  it("round trips modified decks and Unicode names through share links", () => {
    const deck = mei(); deck.name = "Bộ bài Mei Lin 火"; deck.ptLimit = 200;
    expect(decodeDeck(encodeDeck(deck), catalog)).toMatchObject({ name: deck.name, cardIds: deck.cardIds, ptLimit: 200 });
  });
  it("rejects invalid imports instead of silently discarding cards", () => {
    expect(() => parseDecks(JSON.stringify([{ ...mei(), cardIds: ["missing-card"] }]), catalog)).toThrow();
    expect(() => parseDecks(JSON.stringify([{ ...mei(), cardIds: Array(41).fill("c_1027_srt1") }]), catalog)).toThrow();
    expect(() => parseDecks("{}", catalog)).toThrow();
    expect(() => decodeDeck("broken", catalog)).toThrow();
  });
  it("accepts reference-format saves with string card IDs", () => {
    const deck = mei();
    expect(parseDecks(JSON.stringify([{ ...deck, cardIds: ["c_1027_srt1"] }]), catalog)[0].cardIds).toEqual([{ id: "c_1027_srt1", s: [], e: [] }]);
  });
  it("filters other combatants and job-restricted cards out of the picker", () => {
    const cards = availableCards("1027", catalog);
    expect(cards.some(c => c.ownerId === "1027")).toBe(true);
    expect(cards.some(c => c.ownerId && c.ownerId !== "1027")).toBe(false);
    expect(cards.every(c => !c.jobs.length || c.jobs.includes("striker"))).toBe(true);
  });
  it("applies god epiphany to both PT and displayed card description", () => {
    const deck = mei(); deck.cardIds[0].s = ["add_r_spark_vitor_01"];
    expect(calculatePT(deck, catalog).godFlashScore).toBe(20);
    expect(resolveCard(deck.cardIds[0], catalog).description).toContain("30");
  });
  it("rejects epiphanies on curse cards", () => {
    const deck = mei();
    deck.cardIds = [{ id: "card_ta_00002", s: ["add_r_spark_vitor_01"], e: [] }];
    expect(() => validateDeck(deck, catalog)).toThrow(/modification/i);
  });
  it("does not apply the selected combatant class to ownerless monster epiphanies", () => {
    const deck = createDeck("1008", catalog);
    deck.cardIds = [{ id: "card_mon_assualt_00001", s: ["c00000"], e: [] }];
    expect(validateDeck(deck, catalog).cardIds).toEqual(deck.cardIds);
  });
  it("rejects string fragment counts that would reference a nonexistent effect", () => {
    expect(() => validateDeck({ ...mei(), pieceSets: [{ id: "set_public_006", effectCount: "2" }] }, catalog)).toThrow();
  });
});
