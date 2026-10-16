import { expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { localizeGuideProse } from "../../scripts/combatant-prose.mjs";

it("localizes guide terminology without changing English card names from allies", () => {
  const source = { note: { en: "Keep the source.", vi: "Exhaust Futility; Dirge Bullet và Soul Rip III cần 1 AP." } };
  const result = localizeGuideProse(source, [{ name: "Futility" }], []);
  expect(result.note.en).toBe(source.note.en);
  expect(result.note.vi).toBe("Kiệt sức Futility; Dirge Bullet và Soul Riff III cần 1 Điểm hành động.");
  expect(source.note.vi).toContain("Exhaust");
});

it("matches complete glossary phrases before shorter card-name fragments", () => {
  const result = localizeGuideProse({ vi: "Shockwave; Launcher Bullet; Shock; Launcher" }, [], []);
  expect(result.vi).toBe("Sóng xung kích; Đạn súng phóng; Shock; Launcher");
});

it("recognizes labels with or without a glossary colon and preserves values", () => {
  const result = localizeGuideProse({ vi: "Inspiration; Inspiration: 2; Ravage; Creation 50%" }, [], []);
  expect(result.vi).toBe("Cảm hứng; Cảm hứng: 2; Suy yếu; Tạo vật 50%");
});

it("preserves every catalog card name and punctuation in additional card names", () => {
  const catalog = JSON.parse(readFileSync("data/deck-builder/catalog.json", "utf8"));
  const names = [...new Set<string>(catalog.cards.map((card: { name: string }) => card.name))];
  expect(localizeGuideProse({ cards: names.map(name => ({ vi: name })) }, [], []).cards.map((card: { vi: string }) => card.vi)).toEqual(names);
  expect(localizeGuideProse({ vi: "Blade (Awakened)+, AP 2" }, [{ name: "Blade (Awakened)+" }], []).vi).toBe("Blade (Awakened)+, Điểm hành động 2");
});

it("does not replace ordinary Vietnamese companion wording with the Partner label", () => {
  expect(localizeGuideProse({ vi: "Tạo bạn đồng hành để hỗ trợ." }, [], []).vi).toBe("Tạo bạn đồng hành để hỗ trợ.");
});
