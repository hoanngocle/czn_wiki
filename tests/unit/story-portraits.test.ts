import { describe, expect, it } from "vitest";
import { createInitialGraph, parseGraph } from "../../lib/story/graph";
import { isPortraitData, MAX_PORTRAIT_DATA_LENGTH } from "../../lib/story/portraits";

describe("persisted character portraits", () => {
  const portrait = "data:image/webp;base64,UklGRg==";
  it("roundtrips a bitmap portrait with a character", () => {
    expect(isPortraitData(portrait)).toBe(true);
    const graph = createInitialGraph();
    graph.nodes.find((node) => node.id === "hero")!.portrait = portrait;
    expect(parseGraph(JSON.stringify(graph))?.nodes.find((node) => node.id === "hero")?.portrait).toBe(portrait);
  });
  it.each(["javascript:alert(1)", "https://example.com/a.png", "data:image/svg+xml;base64,PHN2Zz4=", "data:text/html;base64,PHNjcmlwdD4=", "data:image/png;base64,not base64!"])("rejects unsupported portrait payload %s", (value) => {
    expect(isPortraitData(value)).toBe(false);
    const graph = createInitialGraph();
    graph.nodes[0].portrait = value;
    expect(parseGraph(JSON.stringify(graph))).toBeNull();
  });
  it("rejects excessive persisted payloads", () => {
    expect(isPortraitData("data:image/png;base64," + "A".repeat(MAX_PORTRAIT_DATA_LENGTH))).toBe(false);
  });
});
