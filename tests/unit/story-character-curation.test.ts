import { describe, expect, it } from "vitest";
import { createInitialGraph, parseGraph, readStoredGraph, STORY_STORAGE_KEY } from "../../lib/story/graph";
import previousSeed from "../../lib/story/legacy/v12.json";

const retiredExamples = ["vuong-tien", "chuot-dong", "ly-dong", "dai-hac-ngu", "tuan-loc-dong-hoang", "truong-da", "trieu-luc", "nhiep-van", "dao-hoang", "doc-co-quynh", "chu-khai-vu"];
function storageFor(raw: string) {
  const values = new Map([[STORY_STORAGE_KEY, raw]]);
  return { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key, value); }, removeItem: (key: string) => { values.delete(key); } };
}

describe("important story character roster", () => {
  it("keeps the selected central cast, with no passing characters", () => {
    const graph = createInitialGraph();
    const ids = graph.nodes.filter((node) => node.kind === "character").map((node) => node.id);
    expect(graph.nodes.filter((node) => node.kind === "character" && node.chapters![0] <= 300)).toHaveLength(33);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toContain("meo-mun");
    for (const id of ["hero", "to-tuyet-nhi", "anna-character", "bach-hoa-master", "truong-anh-hao", "ninh-nguyet-thien", "thi-the-tren-tru-dong"]) expect(ids).toContain(id);
    for (const id of retiredExamples) expect(ids).not.toContain(id);
    expect(parseGraph(JSON.stringify(graph))).not.toBeNull();
  });

  it("prunes saved minor characters and their links while preserving edits and custom nodes", () => {
    const graph = createInitialGraph();
    graph.nodes = graph.nodes.filter((node) => !retiredExamples.includes(node.id));
    graph.links = graph.links.filter((link) => !retiredExamples.includes(link.source) && !retiredExamples.includes(link.target));
    graph.nodes.push(...previousSeed.nodes.filter((node) => retiredExamples.includes(node.id)) as typeof graph.nodes);
    for (const id of retiredExamples) graph.links.push({ source: "hero", target: id, label: "Nối cũ" });
    const anna = graph.nodes.find((node) => node.id === "anna-character")!;
    anna.summary = "Ghi chú riêng";
    anna.x = 123;
    anna.portrait = "data:image/webp;base64,UklGRg==";
    graph.nodes.push({ id: "custom-character", title: "Nhân vật tôi thêm", kind: "character", summary: "Ghi chú của tôi", eyebrow: "", x: 1, y: 2 });
    graph.links.push({ source: "hero", target: "custom-character", label: "Riêng" });
    const raw = JSON.stringify(graph);
    const storage = storageFor(raw);
    const updated = parseGraph(readStoredGraph(storage))!;
    expect(updated).not.toBeNull();
    for (const id of retiredExamples) expect(updated.nodes.some((node) => node.id === id)).toBe(false);
    expect(updated.nodes.find((node) => node.id === anna.id)).toEqual(anna);
    expect(updated.nodes.some((node) => node.id === "custom-character")).toBe(true);
    expect(updated.links).toContainEqual({ source: "hero", target: "custom-character", label: "Riêng" });
    expect(storage.getItem(`${STORY_STORAGE_KEY}:before-character-curation`)).toBe(raw);
    expect(readStoredGraph(storage)).toBe(JSON.stringify(updated));
    expect(storage.getItem(`${STORY_STORAGE_KEY}:before-character-curation`)).toBe(raw);
  });

  it("restores Mèo mun once to a curated save without reviving later deletions", () => {
    const graph = createInitialGraph();
    graph.nodes = graph.nodes.filter((node) => node.id !== "meo-mun");
    graph.links = graph.links.filter((link) => link.target !== "meo-mun");
    const storage = storageFor(JSON.stringify(graph));
    const restored = parseGraph(readStoredGraph(storage))!;
    expect(restored.nodes.find((node) => node.id === "meo-mun")).toMatchObject({ title: "Mèo mun — Thiên Tuyển Kỹ", chapters: [85] });
    expect(restored.links.filter((link) => link.target === "meo-mun")).toHaveLength(1);
    expect(parseGraph(readStoredGraph(storage))).toEqual(restored);
    storage.setItem(STORY_STORAGE_KEY, JSON.stringify(graph));
    expect(parseGraph(readStoredGraph(storage))).toEqual(graph);
  });

  it("keeps an intentionally empty save empty", () => {
    const graph = { version: 1, nodes: [], links: [] };
    expect(parseGraph(readStoredGraph(storageFor(JSON.stringify(graph))))).toEqual(graph);
  });

  it("does not replace saved data when its backup cannot be written", () => {
    const raw = JSON.stringify(previousSeed);
    const storage = storageFor(raw);
    storage.setItem = () => { throw new Error("Quota exceeded"); };
    expect(() => readStoredGraph(storage)).toThrow("Quota exceeded");
    expect(storage.getItem(STORY_STORAGE_KEY)).toBe(raw);
  });
});
