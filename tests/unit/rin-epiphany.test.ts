import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { CardDetailModal } from "../../components/cards/CardDetailModal";
import { characterDetails } from "../../data/wiki/characters/index";
import { characterGuides } from "../../data/wiki/guides";
import { indexCharacterCards } from "../../lib/wiki/character-guide";

describe("Rin Epiphany guidance", () => {
  const guide = characterGuides["1018"];

  it("keeps recommendations out of the standalone guide section", () => {
    expect(guide.cardAdvice).toEqual([]);
  });

  it("attaches every I-V recommendation to its card variant", () => {
    const expectedRatings = {
      c_1018_srt4_rsp1: 4,
      c_1018_srt4_rsp2: 5,
      c_1018_srt4_rsp3: 4,
      c_1018_srt4_rsp4: 4,
      c_1018_srt4_rsp5: 4,
      c_1018_uni1_rsp1: 1,
      c_1018_uni1_rsp2: 1,
      c_1018_uni1_rsp3: 1,
      c_1018_uni1_rsp4: 5,
      c_1018_uni1_rsp5: 1,
      c_1018_uni2_rsp1: 2,
      c_1018_uni2_rsp2: 4,
      c_1018_uni2_rsp3: 3,
      c_1018_uni2_rsp4: 1,
      c_1018_uni2_rsp5: 4,
      c_1018_uni3_rsp1: 3,
      c_1018_uni3_rsp2: 5,
      c_1018_uni3_rsp3: 3,
      c_1018_uni3_rsp4: 3,
      c_1018_uni3_rsp5: 4,
    } as const;

    expect(Object.fromEntries(Object.entries(guide.epiphanyReviews).filter(([, review]) => review.rating !== undefined).map(([id, review]) => [id, review.rating]))).toEqual(expectedRatings);
    for (const review of Object.values(guide.epiphanyReviews).filter(review => review.rating !== undefined)) {
      expect(review.review?.en.length).toBeGreaterThan(40);
      expect(review.review?.vi.length).toBeGreaterThan(40);
    }
  });

  it("preserves Neutral and Divine guidance on each base card", () => {
    const expected = {
      c_1018_srt4: ["2 Vulnerable", "1 AP", "2 Vulnerable", "1 AP"],
      c_1018_uni1: ["avoid Neutral", "1 AP", "tránh", "1 AP"],
      c_1018_uni2: ["Neutral 1 Morale", "Weakness Attack", "1 Morale Neutral", "Weakness Attack"],
      c_1018_uni3: ["Neutral 1 Morale", "1 Morale Neutral"],
    } as const;

    for (const [cardId, phrases] of Object.entries(expected)) {
      const review = guide.epiphanyReviews[cardId];
      expect(review.rating, cardId).toBeUndefined();
      for (const phrase of phrases) expect(`${review.review?.en} ${review.review?.vi}`, `${cardId}/${phrase}`).toContain(phrase);
    }
  });

  it("renders a base-card recommendation without an empty star rating", () => {
    const card = indexCharacterCards(characterDetails["1018"], guide.extraCards).get("c_1018_srt4")!;
    const html = renderToStaticMarkup(createElement(CardDetailModal, {
      card,
      initialId: card.id,
      animationEnabled: false,
      vietnameseEnabled: true,
      reviews: { [card.id]: { review: { en: "Card guidance", vi: "Gợi ý lá bài" } } },
      onClose: () => undefined,
    }));

    expect(html).toContain('aria-label="Gợi ý lá bài"');
    expect(html).toContain("Gợi ý lá bài");
    expect(html).not.toContain("Prydwen");
  });

  it("renders a zero source rating as not rated instead of zero stars", () => {
    const card = indexCharacterCards(characterDetails["1018"], guide.extraCards).get("c_1018_srt4")!;
    const variant = card.variants.find(item => item.id.endsWith("_rsp1"))!;
    const html = renderToStaticMarkup(createElement(CardDetailModal, {
      card,
      initialId: variant.id,
      animationEnabled: false,
      vietnameseEnabled: true,
      reviews: { [variant.id]: { rating: 0 } },
      onClose: () => undefined,
    }));

    expect(html).toContain('aria-label="Chưa chấm điểm"');
    expect(html).toContain("—");
    expect(html).not.toContain("Prydwen");
  });
});
