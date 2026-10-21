import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { CharacterContent } from "../../components/combatants/CharacterContent";
import { getCharacterDetail } from "../../lib/wiki/repository";

it("shows published generated and Ego cards without a guide or fabricated Potential data", () => {
  const base = getCharacterDetail("1003")!;
  const card = { ...base.startCards[0], rarity: "RARITY_UNKNOWN", variants: [], talent: [], tooltips: [] };
  const detail = { ...base, startCards: [], sparkCards: [], collapseCards: [], collapseSkillCard: null, potentialTargetCards: [], potentialNodes: [],
    generatedCards: [{ ...card, id: "tassel", name: "Sword Tassel", costLabel: "Unactivatable" }],
    egoSkillCard: { ...card, id: "white-night", name: "Flickering White Night", cost: 6, costLabel: "EP" },
  };
  const html = renderToStaticMarkup(createElement(CharacterContent, { detail }));
  expect(html).toContain('aria-label="Sword Tassel card"');
  expect(html).toContain('aria-label="Flickering White Night card"');
  expect(html).toContain("Unactivatable");
  expect(html).toContain("EP");
  expect(html).toContain("Chưa được công bố");
  expect(html).not.toContain("card_rarity_unknown.webp");
});
