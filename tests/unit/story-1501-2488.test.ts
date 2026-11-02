import { describe, expect, it } from "vitest";
import notes from "../../lib/story/chapter-notes.json";
import { createInitialGraph, parseGraph } from "../../lib/story/graph";
import { getWarGodProfile, MAX_PROFILE_CHAPTER } from "../../lib/story/war-god";
import { getWarGodMissions, MAX_MISSION_CHAPTER } from "../../lib/story/war-god-missions";
import { getWarGodSystem } from "../../lib/story/war-god-system";
import { arcForChapter } from "../../lib/story/arcs";

describe("remaining EPUB chapters 1501–2488", () => {
  it("uses the last available EPUB chapter as the coverage boundary", () => {
    expect(MAX_PROFILE_CHAPTER).toBe(2488);
    expect(MAX_MISSION_CHAPTER).toBe(2488);
    expect(getWarGodProfile(2489)).toEqual(getWarGodProfile(1));
  });
  it("makes every remaining chapter reachable from the timeline and its Arc", () => {
    expect(notes.filter((note) => note.chapter > 1500).map((note) => note.chapter)).toEqual(Array.from({ length: 988 }, (_, i) => i + 1501));
    const graph = createInitialGraph();
    expect(parseGraph(JSON.stringify(graph))).not.toBeNull();
    const chapters = new Set(graph.nodes.filter((node) => node.kind === "event").flatMap((node) => node.chapters ?? []));
    for (let chapter = 1501; chapter <= 2488; chapter++) {
      expect(chapters.has(chapter), `timeline ${chapter}`).toBe(true);
      const arc = arcForChapter(chapter);
      expect(arc?.from).toBeLessThanOrEqual(chapter);
      expect(arc?.to).toBeGreaterThanOrEqual(chapter);
    }
    expect(notes.at(-1)).toMatchObject({ chapter: 2488, title: "Chuẩn bị" });
    expect(notes.find((note) => note.chapter === 2469)?.title).toContain("Đại kết cục");
    expect(notes.find((note) => note.chapter === 2470)?.title).toContain("Ngoại truyện 1");
    expect(notes.every((note) => note.summary.trim().length > 30 && !/^Chương \d+:/.test(note.title))).toBe(true);
  });

  it("projects the selected late chapter without future facts or duplicate identities", () => {
    for (let chapter = 1501; chapter <= 2488; chapter++) {
      const profile = getWarGodProfile(chapter);
      expect(profile.currentChap, `selected ${chapter}`).toBe(chapter);
      expect(profile.realm.chapter).toBeLessThanOrEqual(chapter);
      for (const entries of [profile.skills, profile.equipment, profile.inventory]) {
        expect(entries.every((entry) => entry.chapter <= chapter)).toBe(true);
        expect(new Set(entries.map((entry) => entry.id)).size).toBe(entries.length);
      }
      expect(profile.journal.every((entry) => entry.chapter <= chapter)).toBe(true);
      const system = getWarGodSystem(chapter);
      expect(system.soul.value).toBe(profile.soul?.value);
      expect([...system.modules, ...system.titles].every((entry) => entry.chapter <= chapter)).toBe(true);
      const missions = getWarGodMissions(chapter);
      expect(new Set(missions.map((mission) => mission.id)).size).toBe(missions.length);
      for (const mission of missions) expect([...mission.events, ...(mission.facts ?? [])].every((event) => event.chapter <= chapter)).toBe(true);
    }
  });

  it("distinguishes the destroyed ancient-tree armor from the repaired death-flame armor", () => {
    const ids = (chapter: number) => getWarGodProfile(chapter).equipment.map((entry) => entry.id);
    expect(ids(1701)).toContain("ancient-tree-absolution-armor");
    expect(ids(1702)).not.toContain("ancient-tree-absolution-armor");
    expect(ids(1702)).toContain("death-flame-armor");
  });

  it("keeps the codex and wind key lifecycles across packet boundaries", () => {
    const ids = (chapter: number) => getWarGodProfile(chapter).inventory.map((entry) => entry.id);
    expect(ids(1799)).toContain("condemnation-codex");
    expect(ids(1800)).not.toContain("condemnation-codex");
    expect(ids(1800)).toContain("sea-book");
    expect(ids(1853)).toContain("wind-key");
    expect(ids(1854)).not.toContain("wind-key");
    expect(ids(2045)).toContain("wind-key");
    for (const id of ["wind-key", "sea-book", "flame-spirit-earring"]) {
      expect(ids(2188)).toContain(id);
      expect(ids(2189)).not.toContain(id);
    }
  });

  it("dates the void mission completion and the powers transferred to Cố Tô An", () => {
    const mission = (chapter: number) => getWarGodMissions(chapter).find((entry) => entry.id === "mission-1327-chien-than-hu-khong");
    expect(mission(1851)?.objective).toContain("cuối cùng");
    expect(mission(2141)?.status).toBe("active");
    expect(mission(2142)?.status).toBe("completed");
    for (const id of ["duy-do-vu", "nam-giu-chan-ly", "nhan-toc-chuc-phuc"]) {
      expect(getWarGodProfile(2146).skills.some((entry) => entry.id === id)).toBe(true);
      expect(getWarGodProfile(2147).skills.some((entry) => entry.id === id)).toBe(false);
    }
  });

  it("retains swords during temporary separation and replaces them only on fusion", () => {
    const equipment = (chapter: number, id: string) => getWarGodProfile(chapter).equipment.find((entry) => entry.id === id);
    expect(equipment(2251, "earth-sword")?.availability?.available).toBe(false);
    expect(equipment(2295, "earth-sword")?.availability?.available).toBe(true);
    expect(equipment(2405, "earth-sword")).toBeDefined();
    expect(equipment(2406, "earth-sword")).toBeUndefined();
    expect(equipment(2406, "heaven-sword")).toBeUndefined();
    expect(equipment(2406, "heaven-earth-sword")).toBeDefined();
  });

  it("does not seal newly issued mundane gear or repair a broken bow by lifting the general seal", () => {
    const equipment = (chapter: number, id: string) => getWarGodProfile(chapter).equipment.find((entry) => entry.id === id);
    for (const id of ["patrol-leather-armor", "patrol-long-blade", "patrol-long-bow"]) {
      expect(equipment(1814, id)).toBeDefined();
      expect(equipment(1814, id)?.availability?.available).not.toBe(false);
    }
    expect(getWarGodProfile(1814).skills.find((entry) => entry.id === "yeu-nguyet")?.availability?.available).not.toBe(false);
    expect(equipment(1901, "patrol-long-bow")?.availability?.available).toBe(false);
    expect(equipment(1901, "earth-sword")?.availability?.available).toBe(false);
    expect(equipment(2014, "earth-sword")?.availability?.available).toBe(true);
  });
});
