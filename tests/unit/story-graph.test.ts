import { describe, expect, it } from "vitest";
import { parseGraph, removeNode, graphBounds, createInitialGraph } from "../../lib/story/graph";

describe("editable story graph", () => {
  it("deletes incident edges without deleting neighboring nodes", () => {
    const result = removeNode(createInitialGraph(), "rescue");
    expect(result.nodes.some((node) => node.id === "rescue")).toBe(false);
    expect(result.nodes.some((node) => node.id === "hero")).toBe(true);
    expect(result.links.some((edge) => edge.source === "rescue" || edge.target === "rescue")).toBe(false);
    expect(result.links.some((edge) => edge.source === "anna" && edge.target === "impartial-goddess")).toBe(true);
  });
  it("roundtrips an empty graph instead of restoring deleted seed nodes", () => {
    expect(parseGraph(JSON.stringify({ version: 1, nodes: [], links: [] })))
      .toEqual({ version: 1, nodes: [], links: [] });
  });
  it("rejects corrupt data, duplicates, invalid positions and executable source URLs", () => {
    expect(parseGraph("not json")).toBeNull();
    const graph = createInitialGraph();
    graph.nodes[0].source = { title: "unsafe", url: "javascript:alert(1)" };
    expect(parseGraph(JSON.stringify(graph))).toBeNull();
    const duplicate = createInitialGraph();
    duplicate.nodes.push(duplicate.nodes[0]);
    expect(parseGraph(JSON.stringify(duplicate))).toBeNull();
    const position = createInitialGraph();
    position.nodes[0].x = Infinity;
    expect(parseGraph(JSON.stringify(position))).toBeNull();
  });
  it("rejects dangling links", () => {
    const graph = createInitialGraph();
    graph.links.push({ source: "missing", target: "hero", label: "bad" });
    expect(parseGraph(JSON.stringify(graph))).toBeNull();
  });
  it("fits negative and distant node positions", () => {
    const graph = createInitialGraph();
    graph.nodes = [
      { ...graph.nodes[0], x: -400, y: -200 },
      { ...graph.nodes[1], x: 2200, y: 1000 },
    ];
    const bounds = graphBounds(graph.nodes);
    expect(bounds.x).toBeLessThanOrEqual(-400);
    expect(bounds.y).toBeLessThanOrEqual(-200);
    expect(bounds.x + bounds.width).toBeGreaterThanOrEqual(2460);
    expect(bounds.y + bounds.height).toBeGreaterThanOrEqual(1164);
  });
});
