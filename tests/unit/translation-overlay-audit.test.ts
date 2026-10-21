import { expect, it } from "vitest";
import { readFileSync, readdirSync } from "node:fs";

const read = (path: string) => JSON.parse(readFileSync(path, "utf8"));
const directory = "data/wiki/translations/vi/";

it("shows readable Vietnamese instead of unresolved source variables in tooltip descriptions", () => {
  for (const file of readdirSync(directory).filter(file => file.endsWith(".glossary.json"))) {
    for (const term of read(directory + file).terms) {
      expect(term.desc, `${file}/${term.id}`).not.toMatch(/#[a-z_]+#|\{\d+\}|undefined/);
    }
  }
});

it("translates Diana's bullet category while preserving the actual card names", () => {
  const glossary = read(directory + "1061.glossary.json");
  const term = glossary.terms.find((term: { id: string }) => term.id === "CARD_HEART");
  expect(term.title).toBe("Đạn trái tim");
  expect(term.desc).toContain("Heart Breaker");
  expect(term.desc).toContain("Heart Shaker");
  expect(read(directory + "1061.cards.json").c_1061_srt4_rsp5).toContain("Heart Breaker");
});

it("covers every canonical card and progression effect without changing source numbers", () => {
  const slugs: Record<string, string> = { "1041": "renoa", "1033": "veronica", "1052": "narja", "30075": "sereniel" };
  const numbers = (text: string) => (text.replace(/<[^>]*>/g, " ").match(/\d+(?:\.\d+)?/g) ?? []).sort();
  for (const file of readdirSync("data/wiki/characters").filter(file => file.endsWith(".json"))) {
    const detail = read("data/wiki/characters/" + file);
    const slug = slugs[detail.id] ?? detail.id;
    const cards = read(directory + slug + ".cards.json");
    const progression = read(directory + slug + ".progression.json");
    const check = (id: string, source: string, translated: string) => {
      expect(translated, `${slug}/${id}`).toBeTypeOf("string");
      expect(numbers(translated), `${slug}/${id}`).toEqual(numbers(source));
    };
    const visit = (card: { id: string; description: string; variants: unknown[] }) => {
      check(card.id, card.description, cards[card.id]);
      card.variants.forEach(variant => visit(variant as typeof card));
    };
    [...detail.startCards, ...detail.sparkCards, ...(detail.generatedCards ?? []), detail.egoSkillCard, ...detail.collapseCards, ...detail.potentialTargetCards, detail.collapseSkillCard].filter(Boolean).forEach(visit);
    for (const level of detail.manifestEgo) check(level.id, level.desc, progression.manifestEgo[level.id]);
    for (const node of detail.potentialNodes) {
      for (const level of [node, ...(node.upgrade_nodes ?? [])]) check(level.id, level.desc, progression.potentialNodes[level.id]);
    }
  }
});
