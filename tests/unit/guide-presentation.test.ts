import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { expect, it } from "vitest";
import { CharacterBuild, CharacterDecks, CharacterReview } from "../../components/combatants/CharacterGuide";
import { CharacterGuideContext } from "../../components/combatants/CharacterGuideContext";
import { characterGuides } from "../../data/wiki/guides";
import { getCharacterDetail } from "../../lib/wiki/repository";
import { indexCharacterCards } from "../../lib/wiki/character-guide";

it("shows gameplay advice without source notes in either language", () => {
  for (const guide of Object.values(characterGuides)) {
    const cards = indexCharacterCards(getCharacterDetail(guide.characterId)!, guide.extraCards);
    for (const vietnamese of [false, true]) {
      for (const Component of [CharacterBuild, CharacterDecks, CharacterReview]) {
        const html = renderToStaticMarkup(createElement(CharacterGuideContext.Provider, {
          value: { guide, cards, animationEnabled: false },
        }, createElement(Component, { vietnamese })));
        const text = html.replace(/<[^>]*>/g, " ");
        expect(text, `${guide.name}/${Component.name}/${vietnamese}`).not.toMatch(/Prydwen|E7BOT|STOVE|the source|captured source|saved snapshot|Tổng hợp từ bản lưu|Cập nhật nguồn|Nguồn chưa|Nguồn đã|Nguồn cung cấp|Mã bộ bài từ nguồn/i);
        expect(html).not.toMatch(/href="https?:\/\/(?:www\.)?(?:prydwen\.gg|e7bot\.)/i);
        if (Component === CharacterBuild && guide.equipment.length) {
          for (const name of ["Equipment", "Weapon", "Armor", "Accessory"]) expect(text).toContain(name);
        }
      }
    }
  }
});
