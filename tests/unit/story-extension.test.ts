import { expect, it } from "vitest";
import previousSeed from "../../lib/story/legacy/v5.json";
import { createInitialGraph, parseGraph, readStoredGraph, STORY_STORAGE_KEY } from "../../lib/story/graph";

const previousKey = "story-wiki:chu-gioi-tan-the-online:v5";
const oldGraph = () => parseGraph(JSON.stringify(previousSeed))!;
function storageFor(raw: string) {
  const values = new Map([[previousKey, raw]]);
  return { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key, value); }, removeItem: (key: string) => { values.delete(key); } };
}

it("extends an untouched v5 diagram to the latest chapter 100 seed", () => {
  const raw = JSON.stringify(previousSeed);
  const storage = storageFor(raw);
  const graph = parseGraph(readStoredGraph(storage))!;
  expect(STORY_STORAGE_KEY).not.toBe(previousKey);
  expect(graph).toEqual(JSON.parse(JSON.stringify(createInitialGraph())));
  expect(graph.nodes.some((node) => node.chapters?.includes(100))).toBe(true);
  expect(storage.getItem(previousKey)).toBe(raw);
});

it("keeps personal text, positions, portraits, sources, relationships and deletions when adding new chapters", () => {
  const old = oldGraph();
  const goose = old.nodes.find((node) => node.id === "white-goose")!;
  goose.summary = "Ghi chú riêng về Ngỗng Trắng";
  goose.x = 123;
  goose.portrait = "data:image/webp;base64,UklGRg==";
  goose.source = { title: "Nguồn của tôi", url: "https://example.com/notes" };
  old.nodes = old.nodes.filter((node) => node.id !== "trieu-luc");
  old.links = old.links.filter((link) => link.target !== "trieu-luc" && !(link.source === "hero" && link.target === "awakening"));
  old.links.find((link) => link.source === "anna" && link.target === "impartial-goddess")!.label = "Nhãn riêng";
  old.links.push({ source: "hero", target: "white-goose", label: "Ghi chú quan hệ" });
  old.nodes.push({ id: "custom", title: "Mốc riêng", kind: "event", summary: "Tôi bổ sung", eyebrow: "", x: 10, y: 20 });
  const storage = storageFor(JSON.stringify(old));
  const graph = parseGraph(readStoredGraph(storage))!;
  const migrated = graph.nodes.find((node) => node.id === "white-goose")!;
  expect(migrated).toMatchObject({ summary: goose.summary, x: 123, portrait: goose.portrait, source: goose.source });
  expect(migrated.title).toContain("Bạch Ánh Thiên");
  expect(graph.nodes.some((node) => node.id === "trieu-luc")).toBe(false);
  expect(graph.nodes.some((node) => node.id === "custom")).toBe(true);
  expect(graph.nodes.some((node) => node.id === "tan-tieu-lau")).toBe(true);
  expect(graph.links.some((link) => link.source === "hero" && link.target === "awakening")).toBe(false);
  expect(graph.links.find((link) => link.source === "anna" && link.target === "impartial-goddess")!.label).toBe("Nhãn riêng");
  expect(graph.links).toContainEqual({ source: "hero", target: "white-goose", label: "Ghi chú quan hệ" });
});

it("preserves an empty v5 graph and retains the backup if migration cannot be saved", () => {
  const empty = JSON.stringify({ version: 1, nodes: [], links: [] });
  expect(readStoredGraph(storageFor(empty))).toBe(empty);
  const raw = JSON.stringify(previousSeed);
  const storage = storageFor(raw);
  storage.setItem = () => { throw new Error("Quota exceeded"); };
  expect(() => readStoredGraph(storage)).toThrow("Quota exceeded");
  expect(storage.getItem(previousKey)).toBe(raw);
});
