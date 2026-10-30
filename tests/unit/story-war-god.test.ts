import { describe, expect, it } from "vitest";
import { getWarGodProfile, parseCurrentChap } from "../../lib/story/war-god";

describe("reading chapter validation", () => {
  it.each([null, "", "oops", "2.5", -1, 0, 1501, Infinity, {}, true])("rejects invalid progress %s", (value) => {
    expect(parseCurrentChap(value)).toBe(1);
  });
  it.each([1, "47", 100, 101, 200, 201, 300, 301, 999, 1000, 1001, 1500])("accepts supported progress %s", (value) => {
    expect(parseCurrentChap(value)).toBe(Number(value));
  });
});

describe("chapter-aware character profile", () => {
  it("does not reveal future equipment or skills", () => {
    const early = getWarGodProfile(4);
    expect(early.realm.value).toBe("Luyện Khí tầng 2");
    expect(early.equipment.map((item) => item.id)).not.toContain("earth-sword");
    expect(early.skills.map((item) => item.id)).not.toContain("lightning");
    expect(early.skills.find((item) => item.id === "steady")?.description).not.toContain("Vững Chắc");
    expect(getWarGodProfile(16).skills.find((item) => item.id === "steady")?.description).toContain("Vững Chắc");
    for (let chapter = 1; chapter <= 300; chapter++) {
      const profile = getWarGodProfile(chapter);
      expect([...profile.equipment, ...profile.inventory, ...profile.skills, ...profile.journal].every((item) => item.chapter <= chapter)).toBe(true);
    }
  });
  it("changes realm only at a confirmed breakthrough", () => {
    expect(getWarGodProfile(1).realm.value).toBe("Luyện Khí Tầng 1");
    expect(getWarGodProfile(3).realm.value).toBe("Luyện Khí Tầng 1");
    expect(getWarGodProfile(96).realm.value).not.toContain("Trúc Cơ");
    expect(getWarGodProfile(97).realm.value).toBe("Trúc Cơ");
    expect(getWarGodProfile(100).soul).toEqual({ value: "530 / 20", chapter: 100 });
  });
  it("removes a consumed quest material at chapter 95", () => {
    expect(getWarGodProfile(92).inventory.map((item) => item.id)).toContain("cosmic-heart");
    expect(getWarGodProfile(94).inventory.map((item) => item.id)).toContain("cosmic-heart");
    expect(getWarGodProfile(95).inventory.map((item) => item.id)).not.toContain("cosmic-heart");
  });
  it("replaces Yen Song Phi with Loan Vu instead of duplicating it", () => {
    expect(getWarGodProfile(15).skills.map((item) => item.id)).toContain("swallows");
    expect(getWarGodProfile(16).skills.map((item) => item.id)).not.toContain("swallows");
    expect(getWarGodProfile(16).skills.map((item) => item.id)).toContain("dance");
  });
});
