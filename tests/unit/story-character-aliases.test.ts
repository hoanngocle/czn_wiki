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
