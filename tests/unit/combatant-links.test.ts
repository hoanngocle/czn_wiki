import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { CharacterContent } from "../../components/combatants/CharacterContent";
import type { CharacterDetail } from "../../lib/wiki/types";
import { decodeSnapshot, normalizeDetail } from "../../scripts/import-e7bot.mjs";

const luke = () => decodeSnapshot(readFileSync("docs/combatant/current/api/czn/characters/1004.html", "utf8"), "2egkWEkLvR9idARLvjqfJdWKfR24HJgY").data;

describe("combatant potential card links", () => {
  it("imports all four source-linked Luke cards in source order", () => {
    const detail = normalizeDetail(luke());
    expect(detail.potentialTargetLinkCardIds).toEqual(["c_1004_cre1", "c_1004_cre2", "c_1004_cre3", "c_1004_cre4"]);
    expect(detail.potentialTargetLinkCardId).toBe("[c_1004_cre1,c_1004_cre2,c_1004_cre3,c_1004_cre4]");
  });

  it("validates every referenced target, including the final card", () => {
    const record = luke();
    record.combatant.potential_target_link_card_id = "[c_1004_cre1,c_1004_cre_missing]";
    expect(() => normalizeDetail(record)).toThrow("Broken potential target card reference c_1004_cre_missing");
  });

  it("supports a single legacy link and deduplicates repeated links", () => {
    const record = luke();
    record.combatant.potential_target_link_card_id = "[c_1004_cre1, c_1004_cre1]";
    expect(normalizeDetail(record).potentialTargetLinkCardIds).toEqual(["c_1004_cre1"]);
    record.combatant.potential_target_link_card_id = "c_1004_cre1";
    expect(normalizeDetail(record).potentialTargetLinkCardIds).toEqual(["c_1004_cre1"]);
    record.combatant.potential_target_link_card_id = null;
    expect(normalizeDetail(record).potentialTargetLinkCardIds).toEqual([]);
  });

  it("renders every linked card once in the Card tab and supports existing saved details", () => {
    const detail = normalizeDetail(luke()) as CharacterDetail;
    delete detail.potentialTargetLinkCardIds;
    detail.potentialTargetLinkCardId = "[c_1004_cre1,c_1004_cre2,c_1004_cre3,c_1004_cre4,c_1004_cre1]";
    const html = renderToStaticMarkup(createElement(CharacterContent, { detail }));
    for (const card of detail.potentialTargetCards) {
      expect(html.split(`aria-label="${card.name} card"`).length - 1, card.id).toBe(1);
    }
    expect(html).not.toContain("-tab-Review");
  });
});
