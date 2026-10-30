import { expect, it } from "vitest";
import seed from "../../lib/story/legacy/v11.json";
import { createInitialGraph, parseGraph, readStoredGraph } from "../../lib/story/graph";

function migrate(raw: string) {
  const values = new Map([["story-wiki:chu-gioi-tan-the-online:v11", raw]]);
  return parseGraph(readStoredGraph({ getItem: (key) => values.get(key) ?? null, setItem: (key, value) => { values.set(key, value); }, removeItem: (key) => { values.delete(key); } }))!;
}

it("merges the selected reality milestones with exact chapter ranges and important introductions", () => {
  const graph = migrate(JSON.stringify(seed));
  expect(graph).toEqual(JSON.parse(JSON.stringify(createInitialGraph())));
  expect(graph.nodes.some((node) => ["archery", "sea", "upgrade"].includes(node.id))).toBe(false);
  const event = graph.nodes.find((node) => node.id === "impartial-goddess")!;
  expect(event.chapters).toEqual([21, 22, 23, 24, 25, 26, 27, 38, 39, 40, 41, 42, 43, 44, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80]);
  expect(event.eyebrow).toBe("Thế giới thực · Chương 21–27, 38–44, 69–80");
  const introductions = seed.links.filter((link) => link.introduction && ["impartial-goddess", "archery", "upgrade"].includes(link.source));
  expect(introductions).toHaveLength(23);
  expect(graph.links.filter((link) => link.introduction && link.source === "impartial-goddess").map((link) => link.target).sort()).toEqual(["to-hung-trieu", "truong-anh-hao"]);
});

it("keeps personal notes, portraits and labels of relationships folded inside the new milestone", () => {
  const old = parseGraph(JSON.stringify(seed))!;
  for (const id of ["impartial-goddess", "archery", "upgrade"]) old.nodes.find((node) => node.id === id)!.summary = `Ghi chú ${id}`;
  old.nodes.find((node) => node.id === "truong-anh-hao")!.portrait = "data:image/webp;base64,UklGRg==";
  old.links.find((link) => link.source === "archery" && link.target === "upgrade")!.label = "Liên hệ tôi ghi";
  const graph = migrate(JSON.stringify(old));
  const summary = graph.nodes.find((node) => node.id === "impartial-goddess")!.summary;
  for (const note of ["Ghi chú impartial-goddess", "Ghi chú archery", "Ghi chú upgrade", "Liên hệ tôi ghi"]) expect(summary).toContain(note);
  expect(graph.nodes.find((node) => node.id === "truong-anh-hao")!.portrait).toBe("data:image/webp;base64,UklGRg==");
  expect(graph.links.some((link) => ["archery", "sea", "upgrade"].includes(link.source) || ["archery", "sea", "upgrade"].includes(link.target) || link.source === link.target)).toBe(false);
});
