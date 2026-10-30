import { expect, it } from "vitest";
import seed from "../../lib/story/legacy/v7.json";
import { createInitialGraph, parseGraph, readStoredGraph } from "../../lib/story/graph";

function migrate(raw: string) {
  const values = new Map([["story-wiki:chu-gioi-tan-the-online:v7", raw]]);
  return parseGraph(readStoredGraph({ getItem: (key) => values.get(key) ?? null, setItem: (key, value) => { values.set(key, value); }, removeItem: (key) => { values.delete(key); } }))!;
}

it("merges awakening and training without assigning the intervening real-world chapters to cultivation", () => {
  const graph = migrate(JSON.stringify(seed));
  expect(graph).toEqual(JSON.parse(JSON.stringify(createInitialGraph())));
  expect(graph.nodes.some((node) => node.id === "training")).toBe(false);
  const awakening = graph.nodes.find((node) => node.id === "awakening")!;
  expect(awakening.chapters).toEqual([1, 2, 3, 4, 12, 13, 14, 15, 16]);
  expect(awakening.eyebrow).toBe("Tu Hành · Chương 1–4, 12–16");
  const oldIntroductions = seed.links.filter((link) => link.introduction && ["training", "awakening"].includes(link.source));
  expect(oldIntroductions).toHaveLength(8);
  expect(graph.links.filter((link) => link.introduction && link.source === "awakening").map((link) => link.target).sort()).toEqual([]);
});

it("preserves edits and portraits, remaps relationships and does not leave duplicate edges", () => {
  const old = parseGraph(JSON.stringify(seed))!;
  old.nodes.find((node) => node.id === "awakening")!.summary = "Ghi chú thức tỉnh";
  old.nodes.find((node) => node.id === "awakening")!.x = 600;
  old.nodes.find((node) => node.id === "training")!.summary = "Ghi chú tu luyện";
  old.nodes.find((node) => node.id === "hero")!.portrait = "data:image/webp;base64,UklGRg==";
  old.links.push({ source: "training", target: "anna", label: "Tu luyện" }, { source: "awakening", target: "anna", label: "Thức tỉnh" });
  const graph = migrate(JSON.stringify(old));
  const awakening = graph.nodes.find((node) => node.id === "awakening")!;
  expect(awakening.summary).toContain("Ghi chú thức tỉnh");
  expect(awakening.summary).toContain("Ghi chú tu luyện");
  expect(awakening.x).toBe(600);
  expect(graph.nodes.find((node) => node.id === "hero")!.portrait).toBe("data:image/webp;base64,UklGRg==");
  expect(graph.links.filter((link) => link.source === "awakening" && link.target === "anna")).toHaveLength(1);
  expect(graph.links.find((link) => link.source === "awakening" && link.target === "anna")!.label).toContain("Tu luyện");
  expect(graph.links.some((link) => link.source === "training" || link.target === "training" || link.source === link.target)).toBe(false);
});
