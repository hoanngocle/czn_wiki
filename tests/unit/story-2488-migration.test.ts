import { describe, expect, it } from "vitest";
import baseline from "../../lib/story/legacy/chapters-1500.json";
import { parseGraph, readStoredGraph, STORY_STORAGE_KEY, type StoryGraph } from "../../lib/story/graph";

function storageFor(graph: StoryGraph) {
  const raw = JSON.stringify(graph);
  const values = new Map([[STORY_STORAGE_KEY, raw], ...["chapters-200", "chapters-300", "chapters-1000", "chapters-1500", "meo-mun-restored"].map((suffix): [string, string] => [`${STORY_STORAGE_KEY}:${suffix}`, "1"])]);
  return { raw, values, storage: {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value); },
    removeItem: (key: string) => { values.delete(key); },
  } };
}

describe("remaining EPUB chapters saved graph migration", () => {
  it("adds the ending while retaining authored fields, custom links and deliberate deletions", () => {
    const saved = structuredClone(baseline) as StoryGraph;
    saved.nodes = saved.nodes.filter((node) => node.id !== "lieu-hanh");
    saved.links = saved.links.filter((link) => link.source !== "lieu-hanh" && link.target !== "lieu-hanh");
    Object.assign(saved.nodes.find((node) => node.id === "anna-character")!, { title: "Anna của tôi", summary: "Ghi chú riêng", x: 123, y: 456, portrait: "data:image/png;base64,iVBORw0KGgo=" });
    saved.nodes.push({ id: "personal-ending", kind: "world", title: "Ghi chú riêng", summary: "Chưa đọc hết", eyebrow: "", x: 5, y: 10 });
    saved.links.push({ source: "anna-character", target: "personal-ending", label: "Đường nối riêng" });
    const removedLink = saved.links.find((link) => link.timeline)!;
    saved.links = saved.links.filter((link) => link !== removedLink);
    const { storage, values, raw } = storageFor(saved);
    const graph = parseGraph(readStoredGraph(storage))!;
    expect(graph.nodes.some((node) => node.chapters?.includes(2488))).toBe(true);
    expect(graph.nodes.some((node) => node.id === "lieu-hanh")).toBe(false);
    expect(graph.nodes.find((node) => node.id === "anna-character")).toMatchObject({ title: "Anna của tôi", summary: "Ghi chú riêng", x: 123, y: 456, portrait: "data:image/png;base64,iVBORw0KGgo=" });
    expect(graph.nodes.find((node) => node.id === "personal-ending")?.summary).toBe("Chưa đọc hết");
    expect(graph.links).toContainEqual({ source: "anna-character", target: "personal-ending", label: "Đường nối riêng" });
    expect(graph.links.some((link) => link.source === removedLink.source && link.target === removedLink.target)).toBe(false);
    expect(values.get(`${STORY_STORAGE_KEY}:before-chapters-2488`)).toBe(raw);
    expect(parseGraph(readStoredGraph(storage))).toEqual(graph);
    expect(values.get(`${STORY_STORAGE_KEY}:before-chapters-2488`)).toBe(raw);
  });

  it("preserves an intentionally empty diagram and leaves malformed saves untouched", () => {
    const { storage, values } = storageFor({ version: 1, nodes: [], links: [] });
    expect(parseGraph(readStoredGraph(storage))).toEqual({ version: 1, nodes: [], links: [] });
    expect(values.get(`${STORY_STORAGE_KEY}:chapters-2488`)).toBe("1");
    const broken = '{"unfinished":true}';
    values.set(STORY_STORAGE_KEY, broken);
    values.delete(`${STORY_STORAGE_KEY}:chapters-2488`);
    expect(readStoredGraph(storage)).toBe(broken);
    expect(values.get(`${STORY_STORAGE_KEY}:chapters-2488`)).toBeUndefined();
  });
});
