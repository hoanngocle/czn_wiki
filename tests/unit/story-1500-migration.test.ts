import { describe, expect, it } from "vitest";
import baseline from "../../lib/story/legacy/chapters-1000.json";
import { parseGraph, readStoredGraph, STORY_STORAGE_KEY, type StoryGraph } from "../../lib/story/graph";

const portrait = "data:image/png;base64,iVBORw0KGgo=";
function storageFor(graph: StoryGraph) {
  const raw = JSON.stringify(graph);
  const values = new Map([[STORY_STORAGE_KEY, raw], ...["chapters-200", "chapters-300", "chapters-1000", "meo-mun-restored"].map((suffix): [string, string] => [`${STORY_STORAGE_KEY}:${suffix}`, "1"])]);
  return { raw, values, storage: {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value); },
    removeItem: (key: string) => { values.delete(key); },
  } };
}

describe("chapter-1500 saved graph migration", () => {
  it("backs up once, preserves personal nodes, links, portraits and intentional deletions", () => {
    const saved = structuredClone(baseline) as StoryGraph;
    saved.nodes = saved.nodes.filter((node) => node.id !== "lieu-hanh");
    saved.links = saved.links.filter((link) => link.source !== "lieu-hanh" && link.target !== "lieu-hanh");
    const anna = saved.nodes.find((node) => node.id === "anna-character")!;
    anna.summary = "Ghi chú cá nhân của tôi";
    anna.x = 123;
    anna.portrait = portrait;
    saved.nodes.push({ id: "personal", kind: "world", title: "Ghi chú riêng", summary: "Tự viết", eyebrow: "Của tôi", x: 5, y: 10 });
    saved.links.push({ source: "anna-character", target: "personal", label: "Đường nối riêng" });
    const { storage, values, raw } = storageFor(saved);
    const graph = parseGraph(readStoredGraph(storage))!;
    expect(graph.nodes.some((node) => node.chapters?.includes(1500))).toBe(true);
    expect(graph.nodes.some((node) => node.id === "lieu-hanh")).toBe(false);
    expect(graph.nodes.find((node) => node.id === "anna-character")).toMatchObject({ summary: anna.summary, x: 123, portrait });
    expect(graph.nodes.find((node) => node.id === "personal")?.summary).toBe("Tự viết");
    expect(graph.links).toContainEqual({ source: "anna-character", target: "personal", label: "Đường nối riêng" });
    expect(values.get(`${STORY_STORAGE_KEY}:before-chapters-1500`)).toBe(raw);
    expect(parseGraph(readStoredGraph(storage))).toEqual(graph);
  });

  it("merges the revealed alias and retains notes, portrait and authored relationships", () => {
    const saved = structuredClone(baseline) as StoryGraph;
    saved.nodes.find((node) => node.id === "black-sea-lady")!.summary = "Ghi chú Hắc Hải";
    const water = saved.nodes.find((node) => node.id === "thuy-than")!;
    water.summary = "Ghi chú Thủy Thần";
    water.portrait = portrait;
    saved.links.push({ source: "thuy-than", target: "anna-character", label: "Liên hệ tự viết" });
    const { storage } = storageFor(saved);
    const graph = parseGraph(readStoredGraph(storage))!;
    expect(graph.nodes.some((node) => node.id === "thuy-than")).toBe(false);
    const merged = graph.nodes.find((node) => node.id === "black-sea-lady")!;
    expect(merged.summary).toContain("Ghi chú Hắc Hải");
    expect(merged.summary).toContain("Ghi chú Thủy Thần");
    expect(merged.portrait).toBe(portrait);
    expect(graph.links).toContainEqual({ source: "black-sea-lady", target: "anna-character", label: "Liên hệ tự viết" });
    expect(parseGraph(readStoredGraph(storage))).toEqual(graph);
  });

  it("does not restore a character when both known identities were deleted", () => {
    const saved = structuredClone(baseline) as StoryGraph;
    const removed = new Set(["black-sea-lady", "thuy-than"]);
    saved.nodes = saved.nodes.filter((node) => !removed.has(node.id));
    saved.links = saved.links.filter((link) => !removed.has(link.source) && !removed.has(link.target));
    const graph = parseGraph(readStoredGraph(storageFor(saved).storage))!;
    expect(graph.nodes.some((node) => removed.has(node.id))).toBe(false);
  });
});
