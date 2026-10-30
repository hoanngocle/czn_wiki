import { describe, expect, it } from "vitest";
import chapters from "../../lib/story/chapter-notes.json";
import baseline from "../../lib/story/legacy/v13.json";
import { createInitialGraph, parseGraph, readStoredGraph, STORY_STORAGE_KEY } from "../../lib/story/graph";
import { getWarGodProfile } from "../../lib/story/war-god";
import { getWarGodMissions } from "../../lib/story/war-god-missions";
import { getWarGodSystem } from "../../lib/story/war-god-system";

describe("chapter 101–200 extension", () => {
  it("covers every chapter in notes and timeline with valid links", () => {
    expect(chapters.filter((entry) => entry.chapter <= 200).map((entry) => entry.chapter)).toEqual(Array.from({ length: 200 }, (_, i) => i + 1));
    const graph = createInitialGraph();
    expect(parseGraph(JSON.stringify(graph))).not.toBeNull();
    expect(new Set(graph.nodes.filter((node) => node.kind === "event").flatMap((node) => node.chapters?.filter((chapter) => chapter <= 200) ?? [])).size).toBe(200);
  });
  it("adds new milestones to saved diagrams while retaining edits and deletions", () => {
    const saved = structuredClone(baseline);
    saved.nodes = saved.nodes.filter((node) => node.id !== "to-tuyet-nhi");
    saved.links = saved.links.filter((link) => link.target !== "to-tuyet-nhi");
    saved.nodes.find((node) => node.id === "anna-character")!.summary = "Ghi chú cá nhân";
    const values = new Map([[STORY_STORAGE_KEY, JSON.stringify(saved)]]);
    const storage = { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, raw: string) => { values.set(key, raw); }, removeItem: (key: string) => { values.delete(key); } };
    const updated = parseGraph(readStoredGraph(storage))!;
    expect(updated.nodes.some((node) => node.chapters?.includes(200))).toBe(true);
    expect(updated.nodes.some((node) => node.id === "to-tuyet-nhi")).toBe(false);
    expect(updated.nodes.find((node) => node.id === "anna-character")!.summary).toBe("Ghi chú cá nhân");
    expect(parseGraph(readStoredGraph(storage))).toEqual(updated);
  });
  it("dates quests and excludes other issuers", () => {
    expect(getWarGodMissions(133).map((mission) => mission.id)).not.toContain("decisive-battle");
    expect(getWarGodMissions(134).find((mission) => mission.id === "decisive-battle")?.status).toBe("active");
    expect(getWarGodMissions(166).find((mission) => mission.id === "decisive-battle")?.status).toBe("active");
    expect(getWarGodMissions(167).find((mission) => mission.id === "decisive-battle")?.status).toBe("completed");
    expect(getWarGodMissions(200).every((mission) => mission.issuer === "Giao diện Chiến Thần")).toBe(true);
  });
  it("keeps textual soul records and confirmed end-of-chapter cultivation", () => {
    expect(getWarGodProfile(118).soul?.value).toBe("0 / 20");
    expect(getWarGodProfile(141).soul?.value).toBe("270 / 20");
    expect(getWarGodProfile(142).realm.value).toBe("Trúc Cơ hậu kỳ");
    expect(getWarGodProfile(167).soul?.value).toBe("270");
    expect(getWarGodProfile(189).soul?.value).toBe("220");
    expect(getWarGodProfile(191).soul?.value).toBe("0");
    for (const chapter of [118, 142, 167, 189, 191, 200]) expect(getWarGodSystem(chapter).soul.value).toBe(getWarGodProfile(chapter).soul?.value);
  });
  it("gates all acquired skills and facts by their chapter", () => {
    for (let chapter = 1; chapter <= 200; chapter++) {
      const profile = getWarGodProfile(chapter);
      expect([...profile.skills, ...profile.inventory, ...profile.equipment, ...profile.journal].every((entry) => entry.chapter <= chapter)).toBe(true);
      expect(profile.realm.chapter).toBeLessThanOrEqual(chapter);
      for (const mission of getWarGodMissions(chapter)) expect([...mission.events, ...(mission.facts ?? [])].every((entry) => entry.chapter <= chapter)).toBe(true);
    }
  });
  it("separates offered skills, upgrades, titles and actual cultivation", () => {
    expect(getWarGodProfile(135).skills.some((skill) => skill.id === "concealment")).toBe(false);
    expect(getWarGodProfile(141).skills.some((skill) => skill.id === "concealment")).toBe(true);
    expect(getWarGodProfile(190).skills.some((skill) => skill.id === "seven-star-dragon")).toBe(false);
    expect(getWarGodProfile(191).skills.some((skill) => skill.id === "seven-star-dragon")).toBe(true);
    expect(getWarGodProfile(200).realm.value).toBe("Trúc Cơ đỉnh phong");
    expect(getWarGodSystem(133).titles).toHaveLength(0);
    expect(getWarGodSystem(134).titles).toHaveLength(2);
    expect(getWarGodSystem(166).titles.some((title) => title.id === "guerrilla")).toBe(false);
    expect(getWarGodSystem(167).titles.map((title) => title.id)).toEqual(["sword-fifteen", "guerrilla", "commander"]);
    expect(getWarGodSystem(118).weapons.find((weapon) => weapon.id === "bow")!.techniques.find((skill) => skill.name === "Loạn Vũ")!.status).toContain("Trung cấp");
    expect(getWarGodProfile(180).equipment.find((entry) => entry.id === "earth-sword")!.description).toContain("6.000");
    expect(getWarGodProfile(181).equipment.find((entry) => entry.id === "earth-sword")!.description).toContain("60.000");
    expect(getWarGodMissions(189).find((entry) => entry.id === "divinity-upgrade")!.events).toHaveLength(1);
    expect(getWarGodMissions(200).find((entry) => entry.id === "divinity-upgrade")!.status).toBe("active");
  });
});
