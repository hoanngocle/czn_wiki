import { describe, expect, it } from "vitest";
import sources from "../../docs/combatant/prydwen/extracted.json";
import mappings from "../../docs/combatant/prydwen/deck-mapping.json";
import supplement from "../../docs/combatant/prydwen/supplement-source.json";
import { characterGuides } from "../../data/wiki/guides";
import { characterDetails } from "../../data/wiki/characters/index";
import { characterTranslations } from "../../data/wiki/translations";
import { indexCharacterCards } from "../../lib/wiki/character-guide";

const capturedGuides = Object.values(characterGuides).filter(guide => sources.some(source => source.name === guide.name));

describe("complete captured Prydwen decks", () => {
  it("imports all 102 decks for all 38 released combatants", () => {
    expect(sources).toHaveLength(38);
    expect(capturedGuides.reduce((sum, guide) => sum + guide.decks.length, 0)).toBe(102);
    for (const source of sources) {
      const guide = Object.values(characterGuides).find(item => item.name === source.name)!;
      expect(guide.decks.map(deck => deck.name.en), source.name).toEqual(source.decks.map(deck => deck.name));
      const cards = indexCharacterCards(characterDetails[guide.characterId], guide.extraCards);
      for (const [index, sourceDeck] of source.decks.entries()) {
        const deck = guide.decks[index];
        expect(deck.cards.map(card => card.count), `${source.name}/${sourceDeck.name}`).toEqual(sourceDeck.cards.map(card => card.count));
        expect(deck.partner).toBe(sourceDeck.partner);
        expect(deck.gear).toEqual(sourceDeck.equipment);
        expect(deck.code ?? "").toBe(sourceDeck.code);
        expect(deck.name.vi).not.toBe(`Bộ bài: ${sourceDeck.name}`);
        expect(deck.note.vi.length).toBeGreaterThan(40);
        const mapping = mappings.find(item => item.id === guide.characterId && item.deckIndex === index)!;
        for (const [cardIndex, entry] of mapping.entries.entries()) {
          const ref = deck.cards[cardIndex];
          const card = cards.get(ref.cardId)!;
          if (entry.cardId) expect(card.id).toBe(entry.cardId);
          else {
            expect(card.name).toBe("Persona");
            expect(card.description).toContain(entry.description);
            expect(card.description).toContain(entry.classRestriction);
            for (const tag of entry.tags) expect(card.description).toContain(`[${tag}]`);
            expect(card.category).toBe(entry.type === "Skill" ? "CARD_SKILL" : "CARD_ATK");
            expect(characterTranslations[guide.characterId].cards[ref.cardId]).toBeTruthy();
          }
          if (entry.divine === "Reduce the cost of this card by 1.") expect(ref.costDelta).toBe(-1);
          if (entry.divine === "Draw 1") expect(ref.draw).toBe(1);
          if (entry.epiphanyEffect) expect(ref.effects?.en).toContain(entry.epiphanyEffect);
        }
      }
    }
  });

  it("keeps different Persona effects separate within the same character", () => {
    const guide = characterGuides["30093"];
    const first = guide.decks[0].cards.find(c => c.cardId.includes("persona"))!;
    const second = guide.decks[1].cards.find(c => c.cardId.includes("persona"))!;
    expect(first.cardId).not.toBe(second.cardId);
    expect(guide.extraCards.filter(c => c.id === first.cardId)).toHaveLength(1);
    expect(guide.extraCards.filter(c => c.id === second.cardId)).toHaveLength(1);
  });

  it("includes every captured card advice, season and Ego commentary", () => {
    expect(Object.values(characterGuides).every(guide => guide.cardAdvice.length === 0)).toBe(true);
    for (const source of supplement) {
      const guide = Object.values(characterGuides).find(item => item.name === source.name)!;
      expect(guide.seasonal, source.name).toHaveLength(source.seasonal.length);
      expect(guide.dupes, source.name).toHaveLength(source.dupes.length);
      expect(guide.cardAdvice, source.name).toEqual([]);
      const baseIds = Object.entries(guide.epiphanyReviews)
        .filter(([id, review]) => !/_rsp[1-5]$/.test(id) && review.review?.en.includes("Neutral / Divine:"))
        .map(([id]) => id);
      expect(baseIds, source.name).toHaveLength(source.cards.length);
      for (const [index, group] of source.cards.entries()) {
        const baseId = baseIds[index];
        const baseReview = guide.epiphanyReviews[baseId];
        expect(baseReview?.rating, `${source.name}/${group.name}/base rating`).toBeUndefined();
        expect(baseReview?.review?.en, `${source.name}/${group.name}/base EN`).toContain("Neutral / Divine:");
        expect(baseReview?.review?.vi, `${source.name}/${group.name}/base VI`).toMatch(/(?:Trung lập \/ Thần thánh|Neutral \/ Divine):/);
        const ratings = [1, 2, 3, 4, 5].map(epiphany => guide.epiphanyReviews[`${baseId}_rsp${epiphany}`]?.rating);
        expect(ratings, `${source.name}/${group.name}`).toEqual(group.variants.slice(1).map(variant => variant.rating));
      }
      for (const season of guide.seasonal) expect(season.note.vi.length).toBeGreaterThan(20);
      for (const [index, ego] of guide.dupes.entries()) {
        if (["", "-"].includes(source.dupes[index].text)) expect(ego.note).toEqual({ en: "", vi: "" });
        else expect(ego.note.vi).toBeTruthy();
      }
    }
  });
});
