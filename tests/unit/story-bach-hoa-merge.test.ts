import { expect, it } from "vitest";
import seed from "../../lib/story/legacy/v9.json";
import { createInitialGraph, parseGraph, readStoredGraph } from "../../lib/story/graph";

function migrate(raw: string) {
  const values = new Map([["story-wiki:chu-gioi-tan-the-online:v9", raw]]);
  return parseGraph(readStoredGraph({ getItem: (key) => values.get(key) ?? null, setItem: (key, value) => { values.set(key, value); }, removeItem: (key) => { values.delete(key); } }))!;
}

it("combines all three milestones into chapters 44–65 with six important character introductions", () => {
  const graph = migrate(JSON.stringify(seed));
  expect(graph).toEqual(JSON.parse(JSON.stringify(createInitialGraph())));
  expect(graph.nodes.some((node) => ["bach-hoa", "apprenticeship"].includes(node.id))).toBe(false);
  expect(graph.nodes.find((node) => node.id === "sword")!.chapters).toEqual(Array.from({ length: 22 }, (_, index) => index + 44));
  const introductions = seed.links.filter((link) => link.introduction && ["sword", "bach-hoa", "apprenticeship"].includes(link.source));
  expect(introductions).toHaveLength(12);
  expect(graph.links.filter((link) => link.introduction && link.source === "sword").map((link) => link.target).sort()).toEqual(["bach-hoa-master", "bi-nguong-dai-su", "dia-kiem", "huyen-nguyen-thien-ton", "lanh-thien-tinh", "white-goose"]);
});

it("retains notes from all three nodes, portraits and colliding authored connections", () => {
  const old = parseGraph(JSON.stringify(seed))!;
  for (const id of ["sword", "bach-hoa", "apprenticeship"]) {
    old.nodes.find((node) => node.id === id)!.summary = `Ghi chú ${id}`;
    old.links.push({ source: id, target: "anna", label: id });
  }
  old.nodes.find((node) => node.id === "white-goose")!.portrait = "data:image/webp;base64,UklGRg==";
  const graph = migrate(JSON.stringify(old));
  expect(graph.nodes.find((node) => node.id === "sword")!.summary).toBe("Ghi chú sword\n\nGhi chú bach-hoa\n\nGhi chú apprenticeship");
  expect(graph.nodes.find((node) => node.id === "white-goose")!.portrait).toBe("data:image/webp;base64,UklGRg==");
  const connections = graph.links.filter((link) => link.source === "sword" && link.target === "anna");
  expect(connections).toHaveLength(1);
  expect(connections[0].label).toBe("sword / bach-hoa / apprenticeship");
  expect(graph.links.some((link) => ["bach-hoa", "apprenticeship"].includes(link.source) || ["bach-hoa", "apprenticeship"].includes(link.target) || link.source === link.target)).toBe(false);
});

it("does not revive the former Bach Hoa node from a v4 diagram", () => {
  const old = parseGraph(JSON.stringify(seed))!;
  old.links = [{ source: "rescue", target: "bach-hoa", label: "Đường đi riêng" }];
  const values = new Map([["story-wiki:chu-gioi-tan-the-online:v4", JSON.stringify(old)]]);
  const graph = parseGraph(readStoredGraph({ getItem: (key) => values.get(key) ?? null, setItem: (key, value) => { values.set(key, value); }, removeItem: (key) => { values.delete(key); } }))!;
  expect(graph.nodes.some((node) => ["bach-hoa", "apprenticeship"].includes(node.id))).toBe(false);
  expect(graph.links.find((link) => link.source === "rescue" && link.target === "sword")!.label).toBe("Đường đi riêng");
});
