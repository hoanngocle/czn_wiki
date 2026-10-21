import { expect, it } from "vitest";
import { characterTranslations } from "../../data/wiki/translations";
import { collectGlossary } from "../../lib/wiki/glossary";
import { label, preserveGameTermNames } from "../../lib/wiki/labels";
import { getCardTerms } from "../../lib/wiki/card-terms";

it("deduplicates punctuation aliases while preserving parameterized glossary titles", () => {
  const terms = collectGlossary(characterTranslations);
  const attunement = terms.filter(term => term.englishTitle?.startsWith("Attunement"));
  expect(attunement).toHaveLength(1);
  expect(attunement[0].englishTitle).toBe("Attunement");
  expect(attunement[0].desc).toContain("đầu lượt");
  for (const title of ["Exhaust 2", "Exhaust 3"]) expect(terms.filter(term => term.englishTitle === title)).toHaveLength(1);
});

it("keeps distinct effects that share an English title", () => {
  const terms = collectGlossary(characterTranslations);
  const definitions = (title: string) => terms.find(term => term.englishTitle === title)?.definitions ?? [];
  expect(definitions("Performance Buzz").map(term => term.desc).join(" ")).toMatch(/100[\s\S]*150/);
  expect(definitions("Retain").map(term => term.id)).toEqual(expect.arrayContaining(["TALENT_RETAIN", "TRIGGER_RETAIN"]));
  expect(definitions("Attack").map(term => term.id)).toEqual(expect.arrayContaining(["CARD_ATK", "TERM_ATTACK_STAT"]));
  expect(definitions("Morale").map(term => term.desc).join(" ")).toMatch(/Tăng[\s\S]*Giảm/);
});

it("merges repeated inline translations without losing parameterized effects", () => {
  const terms = collectGlossary(characterTranslations);
  expect(terms.find(term => term.englishTitle === "Exhaust")?.definitions).toHaveLength(1);
  expect(terms.find(term => term.englishTitle === "Attunement")?.definitions).toHaveLength(1);
  const points = terms.find(term => term.englishTitle === "AP");
  expect(points?.aliases).toContain("Action Points");
  expect(points?.definitions).toHaveLength(1);
  expect(terms.some(term => term.englishTitle === "Action Points")).toBe(false);
});

it("preserves source contexts even when IDs and numeric values match", () => {
  const terms = collectGlossary({ sample: { cards: {}, manifestEgo: {}, potentialNodes: {}, terms: [
    { id: "SAME_ID", title: "Hiệu ứng", englishTitle: "Effect", englishDesc: "At turn start, gain 1", desc: "Đầu lượt, nhận 1" },
    { id: "SAME_ID", title: "Hiệu ứng", englishTitle: "Effect", englishDesc: "At turn end, gain 1", desc: "Cuối lượt, nhận 1" },
  ] } });
  expect(terms[0].definitions.map(term => term.desc)).toEqual(["Đầu lượt, nhận 1", "Cuối lượt, nhận 1"]);
});

it("keeps game terminology names in English with Vietnamese explanations", () => {
  for (const term of collectGlossary(characterTranslations)) {
    expect(term.title, term.id).toBe(term.englishTitle);
  }
  for (const name of ["Attack", "Skill", "AP", "Exhaust", "Attunement", "Potential", "Justice", "Striker", "Critical Chance"]) {
    expect(label(name, true)).toBe(name);
  }
  expect(label("Animation", true)).toBe("Ảnh động");
});

it("explains cost-reduced activation and Diana's current Flutter timing", () => {
  const glossary = collectGlossary(characterTranslations);
  const efficiency = glossary.find(term => term.englishTitle === "Efficiency");
  expect(efficiency?.desc).toContain("chi phí đã được giảm");
  expect(getCardTerms({ description: "Efficiency: nhận 1 AP", talent: [], tooltips: [] }, true).find(term => term.title === "Efficiency")?.desc).toContain("chi phí đã được giảm");
  const flutter = glossary.find(term => term.englishTitle === "Flutters");
  expect(flutter?.desc).toContain("HP tối đa cao nhất");
  expect(flutter?.desc).toContain("vào đầu lượt");
});

it("preserves game names in Vietnamese prose without changing markup or partial words", () => {
  expect(preserveGameTermNames('Nhận <color_orange>2 Đòn đánh thêm</> và Lá chắn từ Shieldbearer; tăng sát thương.'))
    .toBe('Nhận <color_orange>2 Extra Attack</> và Shield từ Shieldbearer; tăng sát thương.');
  expect(preserveGameTermNames('<u>Thức tỉnh thần thánh</u>: giảm chi phí.'))
    .toBe('<u>Divine Epiphany</u>: giảm chi phí.');
  expect(preserveGameTermNames("Kích hoạt phần hiệu ứng sau Điều hòa. Sử dụng một lá bài."))
    .toBe("Kích hoạt phần hiệu ứng sau Attunement. Sử dụng một lá bài.");
  expect(preserveGameTermNames("Kích hoạt phần hiệu ứng <u>Kích hoạt</u>."))
    .toBe("Kích hoạt phần hiệu ứng <u>Activate</u>.");
});
