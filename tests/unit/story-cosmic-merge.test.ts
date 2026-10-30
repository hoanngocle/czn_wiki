import { expect, it } from "vitest";
import seed from "../../lib/story/legacy/v12.json";
import { createInitialGraph, parseGraph, readStoredGraph } from "../../lib/story/graph";

function migrate(raw: string) {
  const values = new Map([["story-wiki:chu-gioi-tan-the-online:v12", raw]]);
  return parseGraph(readStoredGraph({ getItem: (key) => values.get(key) ?? null, setItem: (key, value) => { values.set(key, value); }, removeItem: (key) => { values.delete(key); } }))!;
}

it("combines chapters 85–95 without retired character introductions", () => {
  const graph = migrate(JSON.stringify(seed));
  expect(graph).toEqual(JSON.parse(JSON.stringify(createInitialGraph())));
  expect(graph.nodes.some((node) => node.id === "outbreak")).toBe(false);
  expect(graph.nodes.find((node) => node.id === "cosmic-search")!.chapters).toEqual(Array.from({ length: 11 }, (_, index) => index + 85));
  const introductions = seed.links.filter((link) => link.introduction && ["cosmic-search", "outbreak"].includes(link.source));
  expect(introductions).toHaveLength(7);
  expect(graph.links.filter((link) => link.introduction && link.source === "cosmic-search").map((link) => link.target).sort()).toEqual(["meo-mun"]);
});

it("retains notes, portraits and personal labels when combining the two events", () => {
  const old = parseGraph(JSON.stringify(seed))!;
  old.nodes.find((node) => node.id === "cosmic-search")!.summary = "Ghi chú kết minh";
  old.nodes.find((node) => node.id === "outbreak")!.summary = "Ghi chú dịch quỷ";
  old.nodes.find((node) => node.id === "truong-anh-hao")!.portrait = "data:image/webp;base64,UklGRg==";
  old.links.find((link) => link.source === "cosmic-search" && link.target === "outbreak")!.label = "Liên hệ riêng";
  const graph = migrate(JSON.stringify(old));
  const summary = graph.nodes.find((node) => node.id === "cosmic-search")!.summary;
  for (const note of ["Ghi chú kết minh", "Ghi chú dịch quỷ", "Liên hệ riêng"]) expect(summary).toContain(note);
  expect(graph.nodes.find((node) => node.id === "truong-anh-hao")!.portrait).toBe("data:image/webp;base64,UklGRg==");
  expect(graph.links.some((link) => link.source === "outbreak" || link.target === "outbreak" || link.source === link.target)).toBe(false);
});
