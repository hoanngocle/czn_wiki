import { describe, expect, it } from "vitest";
import notes from "../../lib/story/chapter-notes.json";
import { createInitialGraph, parseGraph } from "../../lib/story/graph";
import { getWarGodProfile, MAX_PROFILE_CHAPTER } from "../../lib/story/war-god";
import { getWarGodMissions, MAX_MISSION_CHAPTER } from "../../lib/story/war-god-missions";
import { getWarGodSystem } from "../../lib/story/war-god-system";

describe("chapters 1001–1500", () => {
  it("covers all 1500 chapters with valid summaries and timeline nodes", () => {
    expect(notes.map((note) => note.chapter)).toEqual(Array.from({ length: 1500 }, (_, i) => i + 1));
    const graph = createInitialGraph();
    expect(parseGraph(JSON.stringify(graph))).not.toBeNull();
    const chapters = [...new Set(graph.nodes.filter((node) => node.kind === "event").flatMap((node) => node.chapters ?? []))].sort((a, b) => a - b);
    expect(chapters).toEqual(notes.map((note) => note.chapter));
    expect(notes.every((note) => note.summary.trim().length > 30 && !/^Chương \d+:/.test(note.title))).toBe(true);
  });

  it("projects every selected chapter without leaking future facts or duplicating identities", () => {
    expect(MAX_PROFILE_CHAPTER).toBe(1500);
    expect(MAX_MISSION_CHAPTER).toBe(1500);
    for (let chapter = 1001; chapter <= 1500; chapter++) {
      const profile = getWarGodProfile(chapter);
      expect(profile.currentChap).toBe(chapter);
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
      for (const mission of missions) {
        expect(mission.issuer).toBe("Giao diện Chiến Thần");
        expect([...mission.events, ...(mission.facts ?? [])].every((event) => event.chapter <= chapter)).toBe(true);
      }
    }
  });

  it("continues the world-will contract across chapter 1000 without restarting it", () => {
    const mission = (chapter: number) => getWarGodMissions(chapter).find((item) => item.id === "mission-1000-khe-uoc-y-chi-the-gioi");
    expect(mission(1000)).toMatchObject({ firstChapter: 1000, status: "active" });
    expect(mission(1013)?.status).toBe("active");
    expect(mission(1014)?.status).toBe("completed");
    expect(getWarGodMissions(1014).filter((item) => item.id === "mission-1000-khe-uoc-y-chi-the-gioi")).toHaveLength(1);
  });

  it("tracks loans, returns and destruction of the four An Hồn Hương rings", () => {
    const inventory = (chapter: number) => getWarGodProfile(chapter).inventory.map((item) => item.id);
    expect(inventory(1084)).toContain("nhan-vuong-gia-an-hon-huong");
    expect(inventory(1085)).not.toContain("nhan-vuong-gia-an-hon-huong");
    expect(inventory(1096)).toContain("nhan-vuong-gia-an-hon-huong");
    for (const id of ["nhan-vuong-gia-an-hon-huong", "nhan-bao-ve-an-hon-huong", "nhan-bao-ve-an-hon-huong-2", "nhan-bao-ve-an-hon-huong-3"]) {
      expect(inventory(1103)).toContain(id);
      expect(inventory(1104)).not.toContain(id);
    }
  });

  it("keeps sword attainment separate from cultivation and dates the title exchange", () => {
    expect(getWarGodProfile(1087).realm.value).toBe("Tứ Trụ Thánh");
    expect(getWarGodProfile(1100).realm.value).toBe("Tứ Trụ Thánh");
    expect(getWarGodProfile(1100).skills.find((item) => item.id === "sword-immortal")?.name).toContain("Nhất Kiếm");
    expect(getWarGodSystem(1040).titles.some((item) => item.id === "enemy-of-chaos")).toBe(false);
    expect(getWarGodSystem(1041).titles.some((item) => item.id === "enemy-of-chaos")).toBe(true);
    expect(getWarGodSystem(1081).titles.some((item) => item.id === "enemy-of-chaos")).toBe(false);
  });

  it("confirms breakthroughs only after their final trial and advances the void mission objective", () => {
    expect(getWarGodProfile(1215).realm.value).toBe("Dạ Ma Thiên đỉnh phong");
    expect(getWarGodProfile(1216).realm.value).toBe("Tự Tại Thiên Vương");
    expect(getWarGodProfile(1244).realm.value).toBe("Tự Tại Thiên Vương");
    expect(getWarGodProfile(1245).realm.value).toBe("Tu Di Sơn Chủ");
    expect(getWarGodProfile(1477).realm.value).toBe("Tu Di Sơn Chủ");
    expect(getWarGodProfile(1478).realm.value).toBe("Tinh Hà Thánh Nhân");
    const mission = (chapter: number) => getWarGodMissions(chapter).find((item) => item.id === "mission-1327-chien-than-hu-khong");
    expect(mission(1326)).toBeUndefined();
    expect(mission(1363)?.objective).toContain("Kẻ phán xử");
    expect(mission(1364)?.objective).toContain("Vạn Địa Chi Mẫu");
    expect(mission(1364)?.status).toBe("active");
  });
});
