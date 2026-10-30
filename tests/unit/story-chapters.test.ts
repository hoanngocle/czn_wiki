import { describe, expect, it } from "vitest";
import { storyNodes, storyLinks } from "../../lib/story/timeline";
import chapters from "../../lib/story/chapter-notes.json";

describe("EPUB chapters 1–1500", () => {
  it("covers every chapter with a moderate number of chronological milestones on two horizontal branches", () => {
    expect(chapters.map((chapter) => chapter.chapter)).toEqual(Array.from({ length: 1500 }, (_, i) => i + 1));
    const events = storyNodes.filter((node) => node.kind === "event");
    expect(events.length).toBeGreaterThan(6);
    expect(events.length).toBeLessThanOrEqual(225);
    expect([...new Set(events.flatMap((node) => node.chapters ?? []))].sort((a, b) => a - b)).toEqual(chapters.map((chapter) => chapter.chapter));
    for (const realm of ["cultivation", "reality"]) {
      const branch = events.filter((node) => node.realm === realm);
      expect(new Set(branch.map((node) => node.y)).size).toBe(1);
      for (let i = 1; i < branch.length; i++) {
        expect(branch[i].x).toBeGreaterThan(branch[i - 1].x + 400);
        expect(branch[i].chapters![0]).toBeGreaterThan(branch[i - 1].chapters![0]);
      }
      expect(branch.every((node) => node.eyebrow.includes("Chương") && !node.eyebrow.includes("Chặng"))).toBe(true);
    }
    expect(storyLinks.filter((link) => link.fork)).toHaveLength(2);
  });
  it("links each character to the earliest milestone and separates introduction from name reveal", () => {
    const characters = storyNodes.filter((node) => node.kind === "character" && node.id !== "hero");
    expect(new Set(characters.map((node) => node.title)).size).toBe(characters.length);
    for (const character of characters) {
      const edges = storyLinks.filter((link) => link.introduction && link.target === character.id);
      expect(edges).toHaveLength(1);
      expect(storyNodes.find((node) => node.id === edges[0].source)!.chapters).toContain(character.chapters![0]);
    }
    const anna = characters.find((node) => node.id === "anna-character")!;
    expect(anna.chapters![0]).toBe(8);
    expect(anna.summary).toContain("17");
    expect(anna.summary).toContain("20");
    expect(characters.find((node) => node.id === "impartial-goddess-character")!.chapters![0]).toBe(17);
    expect(characters.find((node) => node.id === "bach-hoa-master")!.chapters![0]).toBe(54);
    expect(characters.find((node) => node.id === "tan-tieu-lau")!.chapters).toEqual([81]);
    expect(characters.find((node) => node.id === "tu-tu")!.chapters).toEqual([81]);
    expect(characters.find((node) => node.id === "white-goose")!.title).toContain("Bạch Ánh Thiên");
    expect(characters.filter((node) => node.title.includes("Bạch Ánh Thiên"))).toHaveLength(1);
    expect(characters.find((node) => node.id === "truong-anh-hao")!.chapters).toEqual([74]);
    expect(characters.find((node) => node.id === "doc-co-quynh")).toBeUndefined();
    expect(characters.find((node) => node.id === "chu-khai-vu")).toBeUndefined();
    expect(characters.filter((node) => /Lý Đông Nguyên|Hải hoàng/i.test(node.title))).toHaveLength(0);
  });
});
