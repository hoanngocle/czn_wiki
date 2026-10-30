import { expect, it } from "vitest";
import seed from "../../lib/story/legacy/v8.json";
import { createInitialGraph, parseGraph, readStoredGraph } from "../../lib/story/graph";

function migrate(raw: string) {
  const values = new Map([["story-wiki:chu-gioi-tan-the-online:v8", raw]]);
  return parseGraph(readStoredGraph({ getItem: (key) => values.get(key) ?? null, setItem: (key, value) => { values.set(key, value); }, removeItem: (key) => { values.delete(key); } }))!;
}

it("combines chapters 28–37 and three important introductions when upgrading the saved diagram", () => {
  const graph = migrate(JSON.stringify(seed));
  expect(graph).toEqual(JSON.parse(JSON.stringify(createInitialGraph())));
  expect(graph.nodes.some((node) => node.id === "than-vo")).toBe(false);
  expect(graph.nodes.find((node) => node.id === "rescue")!.chapters).toEqual(Array.from({ length: 10 }, (_, index) => index + 28));
  const introductions = seed.links.filter((link) => link.introduction && ["rescue", "than-vo"].includes(link.source));
  expect(introductions).toHaveLength(6);
  expect(graph.links.filter((link) => link.introduction && link.source === "rescue").map((link) => link.target).sort()).toEqual(["cong-ton-tri", "ninh-nguyet-thien", "thi-the-tren-tru-dong"]);
});

it("retains personal notes, portraits and connections of both merged events", () => {
  const old = parseGraph(JSON.stringify(seed))!;
  old.nodes.find((node) => node.id === "rescue")!.summary = "Ghi chú giải cứu";
  old.nodes.find((node) => node.id === "than-vo")!.summary = "Ghi chú Thần Võ";
  old.nodes.find((node) => node.id === "cong-ton-tri")!.portrait = "data:image/webp;base64,UklGRg==";
  old.links.push({ source: "than-vo", target: "anna", label: "Ghi chú A" }, { source: "rescue", target: "anna", label: "Ghi chú B" });
  const graph = migrate(JSON.stringify(old));
  expect(graph.nodes.find((node) => node.id === "rescue")!.summary).toBe("Ghi chú giải cứu\n\nGhi chú Thần Võ");
  expect(graph.nodes.find((node) => node.id === "cong-ton-tri")!.portrait).toBe("data:image/webp;base64,UklGRg==");
  const connections = graph.links.filter((link) => link.source === "rescue" && link.target === "anna");
  expect(connections).toHaveLength(1);
  expect(connections[0].label).toContain("Ghi chú A");
  expect(connections[0].label).toContain("Ghi chú B");
  expect(graph.links.some((link) => link.source === "than-vo" || link.target === "than-vo" || link.source === link.target)).toBe(false);
});
