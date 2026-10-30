import { expect, it } from "vitest";
import seed from "../../lib/story/legacy/v6.json";
import { createInitialGraph, parseGraph, readStoredGraph, STORY_STORAGE_KEY } from "../../lib/story/graph";

const oldKey = "story-wiki:chu-gioi-tan-the-online:v6";
function migrate(raw: string) {
  const values = new Map([[oldKey, raw]]);
  const graph = parseGraph(readStoredGraph({ getItem: (key) => values.get(key) ?? null, setItem: (key, value) => { values.set(key, value); }, removeItem: (key) => { values.delete(key); } }))!;
  return { graph, values };
}

it("merges the saved 69–70 milestone into 69–80 and refreshes the two branches", () => {
  const raw = JSON.stringify(seed);
  const { graph, values } = migrate(raw);
  expect(STORY_STORAGE_KEY).not.toBe(oldKey);
  expect(graph).toEqual(JSON.parse(JSON.stringify(createInitialGraph())));
  expect(graph.nodes.find((node) => node.id === "impartial-goddess")?.chapters).toEqual(expect.arrayContaining(Array.from({ length: 12 }, (_, index) => index + 69)));
  expect(graph.nodes.some((node) => node.id === "sea")).toBe(false);
  expect(values.get(oldKey)).toBe(raw);
});

it("keeps portraits, notes and authored connections on the merged milestone", () => {
  const old = parseGraph(JSON.stringify(seed))!;
  old.nodes.find((node) => node.id === "sea")!.summary = "Ghi chú riêng về biển";
  old.nodes.find((node) => node.id === "upgrade")!.summary = "Ghi chú riêng về Cửu phủ";
  old.nodes.find((node) => node.id === "white-goose")!.portrait = "data:image/webp;base64,UklGRg==";
  old.links.push({ source: "sea", target: "white-goose", label: "Quan hệ riêng" });
  old.links.find((link) => link.source === "archery" && link.target === "sea")!.label = "Nhãn riêng";
  const { graph } = migrate(JSON.stringify(old));
  expect(graph.nodes.find((node) => node.id === "impartial-goddess")?.summary).toContain("Ghi chú riêng về biển");
  expect(graph.nodes.find((node) => node.id === "impartial-goddess")?.summary).toContain("Ghi chú riêng về Cửu phủ");
  expect(graph.nodes.find((node) => node.id === "white-goose")?.portrait).toBe("data:image/webp;base64,UklGRg==");
  expect(graph.links).toContainEqual({ source: "impartial-goddess", target: "white-goose", label: "Quan hệ riêng" });
  expect(graph.nodes.find((node) => node.id === "impartial-goddess")?.summary).toContain("Nhãn riêng");
  expect(graph.links.some((link) => link.source === link.target || link.source === "sea" || link.target === "sea")).toBe(false);
});

it("consolidates authored relationships that share endpoints after merging, retaining both labels", () => {
  const old = parseGraph(JSON.stringify(seed))!;
  old.links.push({ source: "hero", target: "sea", label: "Ghi chú biển" }, { source: "hero", target: "upgrade", label: "Ghi chú Cửu phủ" });
  const { graph } = migrate(JSON.stringify(old));
  const links = graph.links.filter((link) => link.source === "hero" && link.target === "impartial-goddess");
  expect(links).toHaveLength(1);
  expect(links[0].label).toContain("Ghi chú biển");
  expect(links[0].label).toContain("Ghi chú Cửu phủ");
});
