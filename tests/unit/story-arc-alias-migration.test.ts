import { expect, it } from "vitest";
import { arcForChapter } from "../../lib/story/arcs";
import { arcStorageKey, createArcGraph, readArcGraph, saveArcGraph } from "../../lib/story/arc-graph";
import { createInitialGraph, STORY_STORAGE_KEY } from "../../lib/story/graph";

it("includes recurring characters when the chapter uses their familiar alias", () => {
  const arc = arcForChapter(1066)!;
  const graph = createArcGraph(createInitialGraph(), arc);
  expect(graph.nodes.some((node) => node.id === "black-sea-lady")).toBe(true);
});

it("carries a saved Arc's Thủy Thần edits and links into the Hắc Hải profile", () => {
  const full = createInitialGraph();
  const arc = arcForChapter(720)!;
  const previous = createArcGraph(full, arc);
  const canonical = previous.nodes.find((node) => node.id === "black-sea-lady")!;
  expect(canonical).toBeDefined();
  canonical.id = "thuy-than";
  for (const link of previous.links) {
    if (link.source === "black-sea-lady") link.source = "thuy-than";
    if (link.target === "black-sea-lady") link.target = "thuy-than";
  }
  const saved = structuredClone(previous);
  Object.assign(saved.nodes.find((node) => node.id === "thuy-than")!, {
    title: "Tên riêng của tôi", summary: "Ghi chú riêng Thủy Thần", portrait: "data:image/png;base64,AAAA", x: 123, y: 456,
  });
  saved.nodes.push({ id: "personal-arc", title: "Ghi chú", summary: "Riêng", eyebrow: "", kind: "world", x: 77, y: 88 });
  saved.links.push({ source: "thuy-than", target: "personal-arc", label: "Liên hệ riêng" });
  const values = new Map([[STORY_STORAGE_KEY, JSON.stringify(full)], ...["chapters-200", "chapters-300", "chapters-1000", "chapters-1500", "chapters-2488", "meo-mun-restored"].map((suffix): [string, string] => [`${STORY_STORAGE_KEY}:${suffix}`, "1"])]);
  const storage = { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key, value); }, removeItem: (key: string) => { values.delete(key); } };
  saveArcGraph(storage, arc, saved, previous);
  const oldRaw = values.get(arcStorageKey(arc));
  const result = readArcGraph(storage, arc);
  expect(result.graph.nodes.find((node) => node.id === "black-sea-lady")).toMatchObject({ title: "Tên riêng của tôi", summary: "Ghi chú riêng Thủy Thần", portrait: "data:image/png;base64,AAAA", x: 123, y: 456 });
  expect(result.graph.nodes.some((node) => node.id === "thuy-than")).toBe(false);
  expect(result.graph.links).toContainEqual({ source: "black-sea-lady", target: "personal-arc", label: "Liên hệ riêng" });
  expect(values.get(arcStorageKey(arc))).toBe(oldRaw);
  saveArcGraph(storage, arc, result.graph, result.seed);
  expect(readArcGraph(storage, arc).graph).toEqual(result.graph);
});
