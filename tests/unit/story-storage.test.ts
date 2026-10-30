import { describe, expect, it } from "vitest";
import { createInitialGraph, readStoredGraph, STORY_STORAGE_KEY } from "../../lib/story/graph";

function memoryStorage(entries: Record<string, string>) {
  const values = new Map(Object.entries(entries));
  return {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => { values.set(key, value); },
    removeItem: (key: string) => { values.delete(key); },
  };
}

describe.each(["v1", "v2"])("replacement of the old %s diagram", (version) => {
  const oldKey = `story-wiki:chu-gioi-tan-the-online:${version}`;
  it("replaces and removes the old saved diagram with the two-world timeline", () => {
    const storage = memoryStorage({ [oldKey]: JSON.stringify({ version: 1, nodes: [], links: [] }) });
    expect(JSON.parse(readStoredGraph(storage)!)).toEqual(createInitialGraph());
    expect(storage.getItem(oldKey)).toBeNull();
    expect(storage.getItem(STORY_STORAGE_KEY)).not.toBeNull();
  });
  it("preserves edits and an intentionally empty new diagram on subsequent loads", () => {
    const saved = JSON.stringify({ version: 1, nodes: [], links: [] });
    const storage = memoryStorage({ [STORY_STORAGE_KEY]: saved, [oldKey]: "old diagram" });
    expect(readStoredGraph(storage)).toBe(saved);
    expect(storage.getItem(oldKey)).toBeNull();
  });
  it("does not delete the old value if writing the replacement fails", () => {
    const storage = memoryStorage({ [oldKey]: "old diagram" });
    storage.setItem = () => { throw new Error("Storage full"); };
    expect(() => readStoredGraph(storage)).toThrow("Storage full");
    expect(storage.getItem(oldKey)).toBe("old diagram");
  });
});

it("refreshes canonical facts and keeps old text in the v3 backup", () => {
  const old = createInitialGraph();
  old.nodes = old.nodes.filter((node) => node.kind === "event" || node.id === "hero");
  old.links = old.links.filter((link) => old.nodes.some((node) => node.id === link.target));
  old.nodes.find((node) => node.id === "rescue")!.summary = "Ghi chú riêng của tôi";
  const storage = memoryStorage({ "story-wiki:chu-gioi-tan-the-online:v3": JSON.stringify(old) });
  const graph = JSON.parse(readStoredGraph(storage));
  expect(graph.nodes.find((node: { id: string }) => node.id === "rescue").summary).toBe(createInitialGraph().nodes.find((node) => node.id === "rescue")!.summary);
  expect(storage.getItem("story-wiki:chu-gioi-tan-the-online:v3")).toContain("Ghi chú riêng của tôi");
  expect(graph.nodes.some((node: { id: string }) => node.id === "cong-ton-tri")).toBe(true);
});

it("does not resurrect deleted stages when migrating an empty v3 diagram", () => {
  const empty = { version: 1, nodes: [], links: [] };
  const storage = memoryStorage({ "story-wiki:chu-gioi-tan-the-online:v3": JSON.stringify(empty) });
  expect(JSON.parse(readStoredGraph(storage))).toEqual(empty);
});

it("keeps custom nodes, links and portraits when replacing v4 facts", () => {
  const old = createInitialGraph();
  old.nodes[0].portrait = "data:image/webp;base64,UklGRg==";
  old.nodes.push({ id: "mine", kind: "event", title: "Ghi chú", summary: "Riêng", eyebrow: "", x: 1, y: 2 });
  old.nodes = old.nodes.filter((node) => node.id !== "tu-tu");
  old.links = old.links.filter((link) => link.target !== "tu-tu");
  old.nodes.push({ id: "tu-tu", kind: "character", title: "Tú Tú", summary: "Sai phạm vi", eyebrow: "", x: 3, y: 4 });
  old.links.push({ source: "hero", target: "mine", label: "Riêng" });
  const previous = JSON.stringify(old);
  const storage = memoryStorage({ "story-wiki:chu-gioi-tan-the-online:v4": previous });
  const graph = JSON.parse(readStoredGraph(storage));
  expect(graph.nodes.find((node: { id: string }) => node.id === "hero").portrait).toBe(old.nodes[0].portrait);
  expect(graph.nodes.find((node: { id: string }) => node.id === "mine").summary).toBe("Riêng");
  expect(graph.nodes.find((node: { id: string }) => node.id === "tu-tu").chapters).toEqual([81]);
  expect(graph.links).toContainEqual({ source: "hero", target: "mine", label: "Riêng" });
  expect(storage.getItem("story-wiki:chu-gioi-tan-the-online:v4")).toBe(previous);
});

it("preserves malformed previous data and does not write a replacement over it", () => {
  const storage = memoryStorage({ "story-wiki:chu-gioi-tan-the-online:v4": "broken" });
  expect(() => readStoredGraph(storage)).toThrow("Không đọc được");
  expect(storage.getItem(STORY_STORAGE_KEY)).toBeNull();
  expect(storage.getItem("story-wiki:chu-gioi-tan-the-online:v4")).toBe("broken");
});

it("retains custom relationships between canonical nodes and edited labels without reviving old routes", () => {
  const old = createInitialGraph();
  old.links = [
    { source: "hero", target: "anna-character", label: "Ân nhân kiếp trước" },
    { source: "hero", target: "awakening", label: "Bắt đầu lại", timeline: true, fork: true },
    { source: "awakening", target: "rescue", label: "Giải cứu", timeline: true },
  ];
  const storage = memoryStorage({ "story-wiki:chu-gioi-tan-the-online:v4": JSON.stringify(old) });
  const graph = JSON.parse(readStoredGraph(storage));
  expect(graph.links).toContainEqual({ source: "hero", target: "anna-character", label: "Ân nhân kiếp trước" });
  expect(graph.links.find((link: { source: string; target: string }) => link.source === "hero" && link.target === "awakening").label).toBe("Bắt đầu lại");
  expect(graph.links.find((link: { source: string; target: string }) => link.source === "awakening" && link.target === "rescue").label).toBe("Tiếp diễn");
  expect(graph.links.filter((link: { fork?: boolean }) => link.fork)).toHaveLength(2);
});
