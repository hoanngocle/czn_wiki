import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { decodeSnapshot, normalizeCharacters, normalizeDetail } from "../../scripts/import-e7bot.mjs";

const key = "2egkWEkLvR9idARLvjqfJdWKfR24HJgY";
const source = "docs/wiki.e7bot.top/api/czn/characters";

describe("E7BOT snapshot import", () => {
  it("decodes the envelope and splits 38 combatants from 49 supporters", () => {
    const envelope = decodeSnapshot(readFileSync(`${source}/list.html`, "utf8"), key);
    const characters = normalizeCharacters(envelope.data);
    expect(envelope.code).toBe(0);
    expect(characters).toHaveLength(87);
    expect(characters.filter((item) => item.kind === "combatant")).toHaveLength(38);
    expect(characters.filter((item) => item.kind === "supporter")).toHaveLength(49);
    expect(characters.find((item) => item.id === "1003")?.name).toBe("Nia");
  });
  it("preserves nested Renoa card groups and potential links", () => {
    const envelope = decodeSnapshot(readFileSync(`${source}/1041.html`, "utf8"), key);
    const detail = normalizeDetail(envelope.data);
    expect(detail.id).toBe("1041");
    expect(detail.startCards).toHaveLength(4);
    expect(detail.sparkCards).toHaveLength(4);
    expect(detail.manifestEgo).toHaveLength(6);
    expect(detail.potentialNodes).toHaveLength(10);
    expect(detail.potentialTargetCards).toHaveLength(1);
    expect(detail.collapseCards).toHaveLength(2);
    expect(detail.startCards[3].variants).toHaveLength(5);
    expect(detail.potentialTargetCards[0].talent.map((item: { title: string }) => item.title)).toEqual(["Bullet", "Exhaust"]);
    expect(detail.collapseSkillCard?.tooltips.map((item: { title: string }) => item.title)).toContain("Graveyard");
  });
  it("rejects a damaged payload", () => {
    expect(() => decodeSnapshot('{"data":"broken","encrypted":true}', key)).toThrow(/decrypt|payload|invalid/i);
  });
  it("rejects malformed character and nested detail schema", () => {
    expect(() => normalizeCharacters([{ id: "1", name: "Broken", char_type: "CHAR_COMBATANT" }])).toThrow(/rarity/i);
    const envelope = decodeSnapshot(readFileSync(`${source}/1041.html`, "utf8"), key);
    const malformed = structuredClone(envelope.data);
    delete malformed.combatant.start_cards;
    expect(() => normalizeDetail(malformed)).toThrow(/start_cards/i);
    const malformedCard = structuredClone(envelope.data);
    delete malformedCard.combatant.start_cards[0].cost;
    expect(() => normalizeDetail(malformedCard)).toThrow(/cost/i);
    const malformedSecondCard = structuredClone(envelope.data);
    delete malformedSecondCard.combatant.start_cards[1].r_spark_cards;
    expect(() => normalizeDetail(malformedSecondCard)).toThrow(/variants/i);
  });
});
