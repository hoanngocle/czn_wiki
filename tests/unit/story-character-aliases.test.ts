import { expect, it } from "vitest";
import baseline from "../../lib/story/legacy/chapters-1000.json";
import type { StoryGraph } from "../../lib/story/graph";
import { mergeCharacterAliases } from "../../lib/story/merge-character-aliases";

it("retains two different personal portraits without retaining duplicate character profiles", () => {
  const previous = structuredClone(baseline) as StoryGraph;
  const saved = structuredClone(previous);
  saved.nodes.find((node) => node.id === "black-sea-lady")!.portrait = "data:image/png;base64,AAAA";
  saved.nodes.find((node) => node.id === "thuy-than")!.portrait = "data:image/png;base64,BBBB";
  const next = structuredClone(previous);
  next.nodes = next.nodes.filter((node) => node.id !== "thuy-than");
  next.links = next.links.filter((link) => link.target !== "thuy-than");
  const result = mergeCharacterAliases(saved, previous, next);
  expect(result.nodes.find((node) => node.id === "black-sea-lady")?.portrait).toBe("data:image/png;base64,AAAA");
  expect(result.nodes.find((node) => node.portrait === "data:image/png;base64,BBBB")).toMatchObject({ kind: "world" });
  expect(result.nodes.some((node) => node.id === "thuy-than")).toBe(false);
});

it("preserves an authored relationship between merged aliases as a note without duplicating it", () => {
  const previous = structuredClone(baseline) as StoryGraph;
  const saved = structuredClone(previous);
  saved.links.push({ source: "thuy-than", target: "black-sea-lady", label: "So sánh thân phận của tôi" });
  const next = structuredClone(previous);
  next.nodes = next.nodes.filter((node) => node.id !== "thuy-than");
  next.links = next.links.filter((link) => link.target !== "thuy-than");
  const result = mergeCharacterAliases(saved, previous, next);
  expect(result.nodes.find((node) => node.id === "black-sea-lady")?.summary).toContain("Ghi chú đường nối: So sánh thân phận của tôi");
  expect(result.links.every((link) => link.source !== link.target)).toBe(true);
  expect(mergeCharacterAliases(result, next, next)).toEqual(result);
});
