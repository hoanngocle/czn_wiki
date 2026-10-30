import { expect, it } from "vitest";
import seed from "../../lib/story/legacy/v10.json";
import { createInitialGraph, parseGraph, readStoredGraph } from "../../lib/story/graph";

function migrate(raw: string) {
  const values = new Map([["story-wiki:chu-gioi-tan-the-online:v10", raw]]);
  return parseGraph(readStoredGraph({ getItem: (key) => values.get(key) ?? null, setItem: (key, value) => { values.set(key, value); }, removeItem: (key) => { values.delete(key); } }))!;
}

it("merges the three cultivation milestones with their exact chapter ranges and two important introductions", () => {
  const graph = migrate(JSON.stringify(seed));
  expect(graph).toEqual(JSON.parse(JSON.stringify(createInitialGraph())));
  expect(graph.nodes.some((node) => ["sect-family", "foundation"].includes(node.id))).toBe(false);
  const saints = graph.nodes.find((node) => node.id === "saints")!;
  expect(saints.chapters).toEqual([66, 67, 68, 69, 80, 81, 82, 83, 84, 85, 95, 96, 97, 98, 99, 100]);
  expect(saints.eyebrow).toBe("Tu Hành · Chương 66–69, 80–85, 95–100");
  const introductions = seed.links.filter((link) => link.introduction && ["saints", "sect-family", "foundation"].includes(link.source));
  expect(introductions).toHaveLength(10);
  expect(graph.links.filter((link) => link.introduction && link.source === "saints").map((link) => link.target).sort()).toEqual(["tan-tieu-lau", "tu-tu"]);
});

it("retains all authored notes, portraits and connections without duplicate edges", () => {
  const old = parseGraph(JSON.stringify(seed))!;
  for (const id of ["saints", "sect-family", "foundation"]) {
    old.nodes.find((node) => node.id === id)!.summary = `Ghi chú ${id}`;
    old.links.push({ source: id, target: "anna", label: id });
  }
  old.nodes.find((node) => node.id === "tan-tieu-lau")!.portrait = "data:image/webp;base64,UklGRg==";
  const graph = migrate(JSON.stringify(old));
  expect(graph.nodes.find((node) => node.id === "saints")!.summary).toBe("Ghi chú saints\n\nGhi chú sect-family\n\nGhi chú foundation");
  expect(graph.nodes.find((node) => node.id === "tan-tieu-lau")!.portrait).toBe("data:image/webp;base64,UklGRg==");
  const connections = graph.links.filter((link) => link.source === "saints" && link.target === "anna");
  expect(connections).toHaveLength(1);
  expect(connections[0].label).toBe("saints / sect-family / foundation");
  expect(graph.links.some((link) => ["sect-family", "foundation"].includes(link.source) || ["sect-family", "foundation"].includes(link.target) || link.source === link.target)).toBe(false);
});
