import { expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { localizeGuideProse } from "../../scripts/combatant-prose.mjs";

it("preserves English terminology and restores translated names in guide prose", () => {
  const source = { note: { en: "Keep the source.", vi: "Exhaust Futility; Dirge Bullet và Soul Rip III cần 1 Điểm hành động." } };
  const result = localizeGuideProse(source, [{ name: "Futility" }], []);
  expect(result.note.en).toBe(source.note.en);
  expect(result.note.vi).toBe("Exhaust Futility; Dirge Bullet và Soul Riff III cần 1 AP.");
  expect(source.note.vi).toContain("Exhaust");
});

it("matches complete glossary phrases before shorter card-name fragments", () => {
  const result = localizeGuideProse({ vi: "Shockwave; Launcher Bullet; Shock; Launcher" }, [], []);
  expect(result.vi).toBe("Shockwave; Launcher Bullet; Shock; Launcher");
});

it("recognizes labels with or without a glossary colon and preserves values", () => {
  const result = localizeGuideProse({ vi: "Inspiration; Inspiration: 2; Ravage; Creation 50%" }, [], []);
  expect(result.vi).toBe("Inspiration; Inspiration: 2; Ravage; Creation 50%");
});

it("preserves every catalog card name and punctuation in additional card names", () => {
  const catalog = JSON.parse(readFileSync("data/deck-builder/catalog.json", "utf8"));
  const names = [...new Set<string>(catalog.cards.map((card: { name: string }) => card.name))];
  expect(localizeGuideProse({ cards: names.map(name => ({ vi: name })) }, [], []).cards.map((card: { vi: string }) => card.vi)).toEqual(names);
  expect(localizeGuideProse({ vi: "Blade (Awakened)+, AP 2" }, [{ name: "Blade (Awakened)+" }], []).vi).toBe("Blade (Awakened)+, AP 2");
});

it("does not replace ordinary Vietnamese companion wording with the Partner label", () => {
  expect(localizeGuideProse({ vi: "Tạo bạn đồng hành để hỗ trợ." }, [], []).vi).toBe("Tạo bạn đồng hành để hỗ trợ.");
});

it("uses the English source to distinguish terms that shared a Vietnamese name", () => {
  const result = localizeGuideProse({ notes: [
    { en: "Only Bind cards remain.", vi: "Chỉ còn các lá Liên kết." },
    { en: "Activate Linked.", vi: "Kích hoạt Liên kết." },
    { en: "Spend Shards of Memory.", vi: "Tiêu hao Mảnh Ký Ức (Shards of Memory)." },
  ] }, [], []);
  expect(result.notes.map(note => note.vi)).toEqual([
    "Chỉ còn các lá Bind.", "Kích hoạt Linked.", "Tiêu hao Shards of Memory.",
  ]);
});

it("keeps ordinary Vietnamese explanations for free costs and usual behavior", () => {
  const result = localizeGuideProse({
    en: "Usually activate the card for free to increase damage efficiency.",
    vi: "Thường kích hoạt lá bài miễn phí để tăng hiệu suất sát thương.",
  }, [], []);
  expect(result.vi).toBe("Thường kích hoạt lá bài miễn phí để tăng hiệu suất sát thương.");
  expect(localizeGuideProse({ en: "Performance", vi: "Hiệu suất" }, [], []).vi).toBe("Hiệu suất");
  expect(localizeGuideProse({ en: "Add a link button.", vi: "Thêm nút liên kết." }, [], []).vi).toBe("Thêm nút liên kết.");
  expect(localizeGuideProse({ en: "Increase Extra Attack damage by 25%.", vi: "Tăng 25% sát thương đòn đánh thêm." }, [], []).vi).toBe("Tăng 25% sát thương Extra Attack.");
});
