import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { characterDetails } from "../../data/wiki/characters/index";
import { characterGuides } from "../../data/wiki/guides";
import { characterTranslations } from "../../data/wiki/translations";
import { indexCharacterCards } from "../../lib/wiki/character-guide";
import { translateCharacterDetail } from "../../lib/wiki/translation";

for (const [id, guide] of Object.entries(characterGuides)) {
  describe(`${guide.name} content contract`, () => {
    const detail = characterDetails[id];
    const translation = characterTranslations[id];
    const cards = indexCharacterCards(detail, guide.extraCards);
    it("registers the right character, complete translations and local assets", () => {
      expect(detail.id).toBe(guide.characterId);
      expect(translation).toBeDefined();
      for (const card of cards.values()) {
        expect(translation.cards[card.id], `Missing translation: ${card.id}`).toBeTruthy();
        for (const asset of [card.artwork, card.video].filter(Boolean) as string[]) {
          expect(asset.startsWith("/assets/")).toBe(true);
          expect(existsSync(join("public", asset)), asset).toBe(true);
        }
        for (const term of [...card.talent, ...card.tooltips]) expect(translation.terms.some(item => item.id === term.id), `Missing term: ${term.id}`).toBe(true);
      }
      for (const asset of Object.values(guide.images)) expect(existsSync(join("public", asset.src)), asset.src).toBe(true);
      expect(existsSync(join("public", guide.portrait))).toBe(true);
      for (const ego of detail.manifestEgo) expect(translation.manifestEgo[ego.id], ego.id).toBeTruthy();
      for (const node of detail.potentialNodes.flatMap(node => [node, ...node.upgrade_nodes])) expect(translation.potentialNodes[node.id], node.id).toBeTruthy();
    });
    it("resolves every guide reference to a canonical card and valid copy count", () => {
      for (const name of guide.identity) expect(guide.images[name], `Missing identity icon: ${name}`).toBeDefined();
      const imageNames = [
        ...guide.partners.map(item => item.name),
        ...guide.fragments.flatMap(item => item.name.split(" + ").map(name => name.replace(/ \(\d\)$/, "")).filter(name => !name.startsWith("Flex"))),
        ...guide.equipment.flatMap(item => [...item.weapons, ...item.armor, ...item.trinkets]),
        ...guide.synergies.map(item => item.name), ...guide.teams.flatMap(team => team.members),
        ...guide.decks.flatMap(deck => [deck.partner, ...deck.gear, ...deck.fragments]).filter(Boolean),
      ];
      for (const name of imageNames) expect(guide.images[name], `Missing image mapping: ${name}`).toBeDefined();
      const refs = [...guide.review.mechanics, ...guide.cardAdvice, ...guide.decks.flatMap(deck => deck.cards), ...(guide.generatedCardIds ?? []).map(cardId => ({ cardId }))];
      for (const ref of refs) expect(cards.has(ref.cardId), ref.cardId).toBe(true);
      for (const [cardId, review] of Object.entries(guide.epiphanyReviews)) {
        expect(cards.has(cardId), cardId).toBe(true);
        if (review.review) {
          expect(review.review.en, `${cardId}/en`).toBeTruthy();
          expect(review.review.vi, `${cardId}/vi`).toBeTruthy();
        } else {
          expect(review.rating, `${cardId}/rating-only review`).toBeDefined();
        }
        if (review.rating !== undefined) {
          expect(review.rating).toBeGreaterThanOrEqual(0);
          expect(review.rating).toBeLessThanOrEqual(5);
        }
      }
      for (const deck of guide.decks) for (const card of deck.cards) {
        expect(Number.isInteger(card.count)).toBe(true);
        expect(card.count).toBeGreaterThan(0);
      }
      expect(Object.values(guide.images).some(asset => /\/card\/prydwen-ronoa/.test(asset.src))).toBe(false);
    });
    it("preserves English card names and gameplay numbers in Vietnamese", () => {
      const translated = indexCharacterCards(translateCharacterDetail(detail), guide.extraCards);
      const numbers = (value: string) => (value.replace(/<[^>]*>/g, " ").match(/\d+(?:\.\d+)?/g) ?? []).sort();
      for (const card of cards.values()) {
        expect(translated.get(card.id)?.name).toBe(card.name);
        expect(numbers(translation.cards[card.id]), card.id).toEqual(numbers(card.description));
      }
      if (guide.source.kind === "kit") {
        expect(guide.source.note?.vi).toBeTruthy();
        expect(guide.review.profile).toEqual([]);
        expect(guide.decks[0].cards.map(card => card.cardId)).toEqual(detail.startCards.map(card => card.id));
      }
    });
  });
}

it("does not apply Renoa translation or editorial data to an unregistered character", () => {
  const unknown = { ...characterDetails["1041"], id: "not-registered", name: "Other" };
  expect(translateCharacterDetail(unknown)).toBe(unknown);
  expect(characterGuides[unknown.id]).toBeUndefined();
});
