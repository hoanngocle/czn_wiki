import { describe, expect, it } from "vitest";
import notes from "../../lib/story/chapter-notes.json";
import baseline from "../../lib/story/legacy/chapters-300.json";
import { createInitialGraph, parseGraph, readStoredGraph, STORY_STORAGE_KEY } from "../../lib/story/graph";
import { getWarGodProfile, MAX_PROFILE_CHAPTER } from "../../lib/story/war-god";
import { getWarGodMissions, MAX_MISSION_CHAPTER } from "../../lib/story/war-god-missions";
import { getWarGodSystem } from "../../lib/story/war-god-system";

describe("chapters 301–1000", () => {
  it("covers every chapter with a summary and a valid timeline", () => {
    expect(notes.filter((note) => note.chapter <= 1000).map((note) => note.chapter)).toEqual(Array.from({ length: 1000 }, (_, i) => i + 1));
    const graph = createInitialGraph();
    expect(parseGraph(JSON.stringify(graph))).not.toBeNull();
    expect([...new Set(graph.nodes.filter((node) => node.kind === "event").flatMap((node) => node.chapters ?? []))].sort((a, b) => a - b)).toEqual(notes.map((note) => note.chapter));
    expect(notes.every((note) => note.summary.trim().length > 30 && !/^Chương \d+:/.test(note.title))).toBe(true);
  });
  it("migrates chapter 300 saves once while retaining personal fields and deletions", () => {
    const saved = structuredClone(baseline);
    saved.nodes = saved.nodes.filter((node) => node.id !== "lieu-hanh");
    saved.links = saved.links.filter((link) => link.target !== "lieu-hanh");
    const anna = saved.nodes.find((node) => node.id === "anna-character")!;
    anna.summary = "Ghi chú cá nhân sau chương 300";
    anna.x = 123;
    const raw = JSON.stringify(saved);
    const values = new Map([[STORY_STORAGE_KEY, raw], ...["chapters-200", "chapters-300", "meo-mun-restored"].map((suffix): [string, string] => [`${STORY_STORAGE_KEY}:${suffix}`, "1"])]);
    const storage = { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key, value); }, removeItem: (key: string) => { values.delete(key); } };
    const graph = parseGraph(readStoredGraph(storage))!;
    expect(graph.nodes.some((node) => node.chapters?.includes(1000))).toBe(true);
    expect(graph.nodes.some((node) => node.id === "lieu-hanh")).toBe(false);
    expect(graph.nodes.find((node) => node.id === "anna-character")).toMatchObject({ summary: anna.summary, x: 123 });
    expect(values.get(`${STORY_STORAGE_KEY}:before-chapters-1000`)).toBe(raw);
    expect(parseGraph(readStoredGraph(storage))).toEqual(graph);
  });
  it("supports the full coverage without revealing future facts or duplicate abilities", () => {
    expect(MAX_PROFILE_CHAPTER).toBeGreaterThanOrEqual(1000);
    expect(MAX_MISSION_CHAPTER).toBeGreaterThanOrEqual(1000);
    for (let chapter = 301; chapter <= 1000; chapter++) {
      const profile = getWarGodProfile(chapter);
      expect(profile.currentChap).toBe(chapter);
      for (const entries of [profile.skills, profile.equipment, profile.inventory, profile.journal]) {
        expect(entries.every((entry) => entry.chapter <= chapter)).toBe(true);
      }
      for (const entries of [profile.skills, profile.equipment, profile.inventory]) expect(new Set(entries.map((entry) => entry.id)).size).toBe(entries.length);
      expect(profile.realm.chapter).toBeLessThanOrEqual(chapter);
      expect(getWarGodSystem(chapter).soul.value).toBe(profile.soul?.value);
      const missions = getWarGodMissions(chapter);
      expect(new Set(missions.map((mission) => mission.id)).size).toBe(missions.length);
      for (const mission of missions) {
        expect(mission.issuer).toBe("Giao diện Chiến Thần");
        expect([...mission.events, ...(mission.facts ?? [])].every((event) => event.chapter <= chapter)).toBe(true);
      }
    }
  });
  it("distinguishes a pillar inheritance, a real rollback and the completed tribulation", () => {
    expect(getWarGodProfile(957).realm.value).toBe("Ba Ngàn Thế Giới đỉnh phong");
    expect(getWarGodProfile(971).realm.value).toBe("Ba Ngàn Thế Giới đỉnh phong");
    expect(getWarGodProfile(972).realm.value).toBe("Ba Ngàn Thế Giới sơ kỳ");
    expect(getWarGodProfile(992).realm.value).toBe("Ba Ngàn Thế Giới trung kỳ");
    expect(getWarGodProfile(995).realm.value).toBe("Ba Ngàn Thế Giới đỉnh phong");
    expect(getWarGodProfile(996).realm.value).toBe("Tứ Trụ Thánh");
  });
  it("keeps consumed, returned and unlearned powers out of usable possessions", () => {
    const inventory = (chapter: number) => getWarGodProfile(chapter).inventory.map((entry) => entry.id);
    expect(inventory(926)).toContain("earth-double-card");
    expect(inventory(927)).not.toContain("earth-double-card");
    expect(inventory(936)).toContain("three-time-coins");
    expect(inventory(937)).not.toContain("three-time-coins");
    expect(inventory(956)).toContain("earth-coin");
    expect(inventory(957)).not.toContain("earth-coin");
    expect(inventory(957)).toContain("unlearned-killing-sword-art");
    expect(getWarGodProfile(1000).skills.some((entry) => entry.id === "unlearned-killing-sword-art")).toBe(false);
    expect(inventory(983)).toContain("blood-sea-war-card");
    expect(inventory(984)).not.toContain("blood-sea-war-card");
    expect(inventory(997)).toContain("amber-ring");
    expect(inventory(998)).not.toContain("amber-ring");
    expect(getWarGodProfile(1000).equipment.some((entry) => entry.id === "temporary-soul-weapons")).toBe(false);
  });
  it("dates the new modules and the two separate sword mission confirmations", () => {
    expect(getWarGodSystem(574).modules.some((item) => item.id === "chronicle")).toBe(false);
    expect(getWarGodSystem(575).modules.some((item) => item.id === "chronicle")).toBe(true);
    expect(getWarGodSystem(587).modules.some((item) => item.id === "destiny")).toBe(false);
    expect(getWarGodSystem(587).modules.some((item) => item.id === "missions")).toBe(true);
    expect(getWarGodSystem(977).modules.find((item) => item.id === "chronicle")?.name).toBe("Biên niên sử ngày tận thế");
    expect(getWarGodSystem(978).modules.find((item) => item.id === "chronicle")?.name).toBe("Tình báo cá nhân");
    expect(getWarGodMissions(934).find((item) => item.id === "mission-0821-gianh-lay-thien-kiem")?.status).toBe("active");
    expect(getWarGodMissions(940).find((item) => item.id === "mission-0821-gianh-lay-thien-kiem")?.status).toBe("completed");
    expect(getWarGodMissions(999).some((item) => item.id === "mission-1000-khe-uoc-y-chi-the-gioi")).toBe(false);
    expect(getWarGodMissions(1000).find((item) => item.id === "mission-1000-khe-uoc-y-chi-the-gioi")).toMatchObject({ status: "active", firstChapter: 1000 });
    expect(getWarGodSystem(330).hourglass?.value).toBe("Không còn giới hạn");
  });
  it("replaces titles, restores the absent interface and keeps upgrades consistent", () => {
    expect(getWarGodSystem(748).titles.some((item) => item.id === "guerrilla")).toBe(true);
    expect(getWarGodSystem(749).titles.some((item) => item.id === "guerrilla")).toBe(false);
    expect(getWarGodSystem(749).titles.some((item) => item.id === "divine-might-general")).toBe(true);
    expect(getWarGodSystem(865).modules.every((item) => !/sẵn sàng/i.test(item.status))).toBe(true);
    expect(getWarGodSystem(940).modules.every((item) => !/vắng mặt/i.test(item.status))).toBe(true);
    expect(getWarGodProfile(497).skills.find((item) => item.id === "lightning")?.description).toContain("Đoạn Ly");
    expect(getWarGodProfile(811).skills.find((item) => item.id === "lightning")?.description).toContain("Kinh Mộng");
    expect(getWarGodProfile(852).skills.some((item) => item.id === "shadow-origin-concealment")).toBe(true);
    expect(getWarGodProfile(853).skills.some((item) => item.id === "shadow-origin-concealment")).toBe(false);
    const end = getWarGodProfile(1000);
    expect(end.skills.filter((item) => item.name === "Sứ giả Đoạn Tội")).toHaveLength(1);
    expect([...end.equipment, ...end.inventory].filter((item) => item.id === "true-red-demon-spear")).toHaveLength(1);
    expect(end.skills.some((item) => item.id === "bleeding-card")).toBe(false);
    expect(end.equipment.some((item) => item.id === "ancient-flying-swords")).toBe(false);
    expect(end.equipment.find((item) => item.id === "earth-sword")?.description).toContain("kiếm tự chịu sức nặng");
  });
});
