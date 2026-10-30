import { describe, expect, it } from "vitest";
import notes from "../../lib/story/chapter-notes.json";
import { storyArcs, getStoryArc, arcForChapter } from "../../lib/story/arcs";
import { createArcGraph, readArcGraph, saveArcGraph, arcStorageKey, getCrossArcLinks } from "../../lib/story/arc-graph";
import { createInitialGraph, STORY_STORAGE_KEY, type StoryGraph } from "../../lib/story/graph";

describe("separate story arcs", () => {
  it("covers every integrated chapter once, with short independent diagrams", () => {
    expect(storyArcs.length).toBeGreaterThan(10);
    expect(storyArcs.flatMap((arc) => Array.from({ length: arc.to - arc.from + 1 }, (_, i) => arc.from + i))).toEqual(notes.map((note) => note.chapter));
    const full = createInitialGraph();
    const covered = new Set<number>();
    for (const arc of storyArcs) {
      const graph = createArcGraph(full, arc);
      const events = graph.nodes.filter((node) => node.kind === "event");
      expect(events.length).toBeGreaterThan(0);
      expect(events.length).toBeLessThan(18);
      expect(Math.max(...events.map((node) => node.x))).toBeLessThan(2500);
      for (const node of events) for (const chapter of node.chapters ?? []) {
        expect(chapter).toBeGreaterThanOrEqual(arc.from);
        expect(chapter).toBeLessThanOrEqual(arc.to);
        covered.add(chapter);
      }
      const ids = new Set(graph.nodes.map((node) => node.id));
      expect(ids.size).toBe(graph.nodes.length);
      expect(graph.links.every((link) => ids.has(link.source) && ids.has(link.target))).toBe(true);
    }
    expect([...covered].sort((a, b) => a - b)).toEqual(notes.map((note) => note.chapter));
    expect(getStoryArc("unknown")).toEqual(storyArcs[0]);
    expect(arcForChapter(1000)?.id).toBe(storyArcs.find((arc) => arc.from <= 1000 && arc.to >= 1000)?.id);
  });

  it("retains old notes, portraits, deletions and connected or orphan personal nodes", () => {
    const source = createInitialGraph();
    const arc = arcForChapter(500)!;
    const base = createArcGraph(source, arc);
    const event = base.nodes.find((node) => node.kind === "event")!;
    source.nodes.find((node) => node.id === event.id)!.summary = "Ghi chú riêng của tôi";
    source.nodes.find((node) => node.id === "hero")!.portrait = "data:image/png;base64,AAAA";
    source.nodes = source.nodes.filter((node) => node.id !== "anna-character");
    source.links = source.links.filter((link) => link.target !== "anna-character");
    source.nodes.push({ id: "my-node", kind: "event", title: "Ghi chú", summary: "Riêng", eyebrow: "", x: 20, y: 30 });
    source.nodes.push({ id: "orphan", kind: "world", title: "Chưa nối", summary: "", eyebrow: "", x: 10, y: 20 });
    source.links.push({ source: event.id, target: "my-node", label: "Tự nối" });
    const graph = createArcGraph(source, arc);
    expect(graph.nodes.find((node) => node.id === event.id)?.summary).toBe("Ghi chú riêng của tôi");
    expect(graph.nodes.find((node) => node.id === "hero")?.portrait).toContain("base64");
    expect(graph.nodes.some((node) => node.id === "anna-character")).toBe(false);
    expect(graph.links.some((link) => link.label === "Tự nối")).toBe(true);
    expect(createArcGraph(source, storyArcs[0]).nodes.some((node) => node.id === "orphan")).toBe(true);
    expect(createArcGraph({ version: 1, nodes: [], links: [] }, arc).nodes).toEqual([]);
  });

  it("keeps arc edits separate and retains the original whole-map save", () => {
    const full = createInitialGraph();
    const raw = JSON.stringify(full);
    const values = new Map([[STORY_STORAGE_KEY, raw], ...["chapters-200", "chapters-300", "chapters-1000", "chapters-1500", "meo-mun-restored"].map((suffix): [string, string] => [`${STORY_STORAGE_KEY}:${suffix}`, "1"])]);
    const storage = { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key, value); }, removeItem: (key: string) => { values.delete(key); } };
    const first = readArcGraph(storage, storyArcs[0]);
    const changed = structuredClone(first.graph);
    changed.nodes[0].title = "Ghi chú Arc đầu";
    changed.nodes[0].x += 40;
    saveArcGraph(storage, storyArcs[0], changed, first.seed);
    expect(readArcGraph(storage, storyArcs[0]).graph).toEqual(changed);
    expect(readArcGraph(storage, storyArcs[1]).graph.nodes.some((node) => node.title === "Ghi chú Arc đầu")).toBe(false);
    expect(values.get(STORY_STORAGE_KEY)).toBe(raw);
    const empty: StoryGraph = { version: 1, nodes: [], links: [] };
    saveArcGraph(storage, storyArcs[0], empty, first.seed);
    expect(readArcGraph(storage, storyArcs[0]).graph).toEqual(empty);
    const corrupt = '{"broken":true}';
    values.set(arcStorageKey(storyArcs[1]), corrupt);
    expect(() => readArcGraph(storage, storyArcs[1])).toThrow();
    expect(values.get(arcStorageKey(storyArcs[1]))).toBe(corrupt);
  });

  it("keeps a cross-arc authored relationship as navigation instead of a long edge", () => {
    const source = createInitialGraph();
    const first = source.nodes.find((node) => node.kind === "event" && node.chapters?.includes(1))!;
    const last = source.nodes.find((node) => node.kind === "event" && node.chapters?.includes(1000))!;
    source.links.push({ source: first.id, target: last.id, label: "Gợi mở và kết quả" });
    expect(getCrossArcLinks(source, storyArcs[0])).toContainEqual(expect.objectContaining({ label: "Gợi mở và kết quả", arcId: arcForChapter(1000)!.id }));
  });
  it("moves an entire personal chain and exposes edited boundary labels", () => {
    const source = createInitialGraph();
    const arc = getStoryArc("huyen-khong");
    const anchor = source.nodes.find((node) => node.kind === "event" && node.chapters?.includes(470))!;
    source.nodes.push({ id: "chain-a", kind: "event", title: "A", summary: "", eyebrow: "", x: anchor.x + 500, y: anchor.y });
    source.nodes.push({ id: "chain-b", kind: "event", title: "B", summary: "", eyebrow: "", x: anchor.x + 900, y: anchor.y + 200 });
    source.links.push({ source: anchor.id, target: "chain-a", label: "A" }, { source: "chain-a", target: "chain-b", label: "B" });
    const boundary = source.links.find((link) => link.timeline && link.target === anchor.id)!;
    boundary.label = "Ghi chú riêng trên đường nối";
    const result = createArcGraph(source, arc);
    const projected = result.nodes.find((node) => node.id === anchor.id)!;
    expect(result.nodes.find((node) => node.id === "chain-b")?.x).toBe(projected.x + 900);
    expect(getCrossArcLinks(source, arc).some((link) => link.label === boundary.label)).toBe(true);
  });
});
