import { describe, expect, it } from "vitest";
import notes from "../../lib/story/chapter-notes.json";
import baseline from "../../lib/story/legacy/chapters-200.json";
import { createInitialGraph, parseGraph, readStoredGraph, STORY_STORAGE_KEY } from "../../lib/story/graph";
import { getWarGodProfile } from "../../lib/story/war-god";
import { getWarGodMissions } from "../../lib/story/war-god-missions";
import { getWarGodSystem } from "../../lib/story/war-god-system";

describe("chapters 201–300", () => {
  it("covers 300 chapters with valid scene links", () => {
    expect(notes.filter((note) => note.chapter <= 300).map((note) => note.chapter)).toEqual(Array.from({ length: 300 }, (_, i) => i + 1));
    const graph = createInitialGraph();
    expect(parseGraph(JSON.stringify(graph))).not.toBeNull();
    expect(new Set(graph.nodes.filter((node) => node.kind === "event").flatMap((node) => node.chapters ?? []).filter((chapter) => chapter <= 300)).size).toBe(300);
    expect(notes.every((note) => !/^Chương \d+:/.test(note.title))).toBe(true);
  });
  it("updates a previously migrated 200-chapter save once without overwriting edits", () => {
    const saved = structuredClone(baseline);
    saved.nodes = saved.nodes.filter((node) => node.id !== "lieu-hanh");
    saved.links = saved.links.filter((link) => link.target !== "lieu-hanh");
    saved.nodes.find((node) => node.id === "anna-character")!.summary = "Ghi chú của tôi";
    const values = new Map([[STORY_STORAGE_KEY, JSON.stringify(saved)], [`${STORY_STORAGE_KEY}:chapters-200`, "1"], [`${STORY_STORAGE_KEY}:meo-mun-restored`, "1"]]);
    const storage = { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key, value); }, removeItem: (key: string) => { values.delete(key); } };
    const graph = parseGraph(readStoredGraph(storage))!;
    expect(graph.nodes.some((node) => node.chapters?.includes(300))).toBe(true);
    expect(graph.nodes.some((node) => node.id === "lieu-hanh")).toBe(false);
    expect(graph.nodes.find((node) => node.id === "anna-character")!.summary).toBe("Ghi chú của tôi");
    expect(parseGraph(readStoredGraph(storage))).toEqual(graph);
  });
  it("finishes Tru Ta only when the system grants the upgrade", () => {
    expect(getWarGodMissions(236).find((mission) => mission.id === "divinity-upgrade")?.status).toBe("active");
    expect(getWarGodMissions(237).find((mission) => mission.id === "divinity-upgrade")?.status).toBe("completed");
    expect(getWarGodProfile(236).skills.some((entry) => entry.name === "Cương Trực")).toBe(false);
    expect(getWarGodProfile(237).skills.some((entry) => entry.name === "Cương Trực")).toBe(true);
    expect(getWarGodProfile(237).skills.some((entry) => entry.id === "control")).toBe(false);
  });
  it("records explicit power and realm without promoting the character early", () => {
    expect(getWarGodProfile(268).soul?.value).toBe("80 / 40");
    expect(getWarGodProfile(275).realm.value).toContain("Trúc Cơ");
    expect(getWarGodProfile(276).realm.value).toContain("Kim Đan");
    for (const chapter of [201, 237, 268, 276, 300]) expect(getWarGodSystem(chapter).soul.value).toBe(getWarGodProfile(chapter).soul?.value);
  });
  it("gates each entry and task event to its evidence chapter", () => {
    for (let chapter = 201; chapter <= 300; chapter++) {
      const profile = getWarGodProfile(chapter);
      expect([...profile.skills, ...profile.equipment, ...profile.inventory, ...profile.journal].every((entry) => entry.chapter <= chapter)).toBe(true);
      for (const mission of getWarGodMissions(chapter)) {
        expect(mission.issuer).toBe("Giao diện Chiến Thần");
        expect([...mission.events, ...(mission.facts ?? [])].every((event) => event.chapter <= chapter)).toBe(true);
      }
    }
  });
  it("projects changed objectives and separates completing a task from receiving its reward", () => {
    const mission = (chapter: number, id: string) => getWarGodMissions(chapter).find((entry) => entry.id === id);
    expect(mission(263, "decisive-battle-lower")).toBeUndefined();
    expect(mission(275, "decisive-battle-lower")?.objective).toContain("Tìm nguyên nhân");
    expect(mission(276, "decisive-battle-lower")?.objective).toBe("Bảo vệ hiện trạng thế giới Thần Võ.");
    expect(mission(300, "decisive-battle-lower")?.status).toBe("active");
    expect(mission(271, "prove-worth")?.status).toBe("completed");
    expect(getWarGodProfile(271).skills.some((entry) => entry.id === "spirit-intent")).toBe(false);
    expect(getWarGodProfile(272).skills.some((entry) => entry.id === "spirit-intent")).toBe(true);
    expect(mission(295, "divinity-third")?.objective).not.toContain("vực sâu");
    expect(mission(296, "divinity-third")?.objective).toContain("vực sâu");
    expect(mission(297, "divinity-third")?.status).toBe("active");
    expect(mission(298, "divinity-third")?.status).toBe("completed");
    expect(mission(300, "divinity-fourth")?.status).toBe("active");
    expect(getWarGodMissions(300)).toHaveLength(10);
  });
  it("updates the modal, titles and temporary inventory at their chapter boundaries", () => {
    expect(getWarGodSystem(236).control).toMatchObject({ seconds: 1 });
    expect(getWarGodSystem(237).control).toMatchObject({ name: "Cương Trực", seconds: 2 });
    expect(getWarGodSystem(237).modules.find((entry) => entry.id === "divinity")?.status).toBe("Đã nâng cấp");
    expect(getWarGodSystem(266).titles).toHaveLength(3);
    expect(getWarGodSystem(267).titles.at(-1)?.name).toBe("Kẻ Ám Sát");
    expect(getWarGodSystem(268).titles.at(-1)?.name).toBe("Vương Bài Thích Khách");
    expect(getWarGodSystem(268).titles).toHaveLength(4);
    expect(getWarGodSystem(282).modules.find((entry) => entry.id === "technique")?.status).toBe("Đông lạnh");
    expect(getWarGodSystem(283).modules.find((entry) => entry.id === "technique")?.status).toBe("Đã kích hoạt");
    expect(getWarGodSystem(300).modules.find((entry) => entry.id === "technique")?.status).toBe("Đông lạnh");
    expect(getWarGodProfile(282).inventory.some((entry) => entry.id === "fish-dragon-pearl")).toBe(true);
    expect(getWarGodProfile(283).inventory.some((entry) => entry.id === "fish-dragon-pearl")).toBe(false);
    expect(getWarGodProfile(300).equipment.some((entry) => /Hồng Hoang/.test(entry.name))).toBe(false);
    expect(getWarGodProfile(300).realm.value).toBe("Nguyên Anh hậu kỳ");
  });
  it("keeps the sealed reward unknown until its contents are disclosed at 277", () => {
    const sphere = (chapter: number) => getWarGodProfile(chapter).inventory.find((entry) => entry.id === "sealed-sphere");
    expect(sphere(275)).toBeUndefined();
    expect(sphere(276)?.description).not.toMatch(/kiếm thuật|Triệu Hồn Nhân Quả/);
    expect(sphere(276)?.tag).not.toContain("Một lần");
    expect(sphere(277)?.description).toContain("Triệu Hồn Nhân Quả");
  });
});
