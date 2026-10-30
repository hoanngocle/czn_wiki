import chapterNotes from "./chapter-notes.json";
import { storyNodes, storyLinks, chapterLabel, type StoryNode } from "./timeline";
import { parseGraph, readStoredGraph, STORY_STORAGE_KEY, type StoryGraph } from "./graph";
import { mergeSeedUpdate } from "./merge-seed";
import { arcForChapter, storyArcs, type StoryArc } from "./arcs";

const original = new Map(storyNodes.map((node) => [node.id, node]));
const within = (node: StoryNode, arc: StoryArc) => node.chapters?.some((chapter) => chapter >= arc.from && chapter <= arc.to) ?? false;
const words = (text: string) => ` ${text.normalize("NFC").toLocaleLowerCase("vi").replace(/[^\p{L}\p{N}]+/gu, " ").trim()} `;
const aliases: Record<string, string[]> = {
  "bach-hoa-master": ["Tạ Đạo Linh", "Bách Hoa"], "anna-character": ["Anna"], "to-tuyet-nhi": ["Tuyết Nhi", "Tô Khả Nhi"],
  "impartial-goddess-character": ["Nữ Thần Công Chính"], "ninh-nguyet-thien": ["Nguyệt Thiền"],
  "sleeping-card-maiden": ["Tiểu Tịch", "Thiên sứ Đoạn Tội"], "lam-chuc-menh-gia": ["Chức Mệnh Giả", "Hình nhân bóng tối"],
  "lam": ["Lam Tụ"], "thi-the-tren-tru-dong": ["Thi thể trên trụ đồng"],
};

/** Project a short diagram without mutating the original full-map save. */
export function createArcGraph(source: StoryGraph, arc: StoryArc): StoryGraph {
  if (!source.nodes.length) return { version: 1, nodes: [], links: [] };
  const events = source.nodes.filter((node) => node.kind !== "character" && within(node, arc));
  const prose = words(chapterNotes.filter((note) => note.chapter >= arc.from && note.chapter <= arc.to).map((note) => note.summary).join(" "));
  const characters = source.nodes.filter((node) => {
    if (node.kind !== "character" || node.id === "hero") return false;
    if (within(node, arc)) return true;
    if (!node.chapters || Math.min(...node.chapters) > arc.to) return false;
    const name = original.get(node.id)?.title ?? node.title;
    return [name, ...(aliases[node.id] ?? [])].some((alias) => prose.includes(words(alias)));
  });
  const ids = new Set([...(source.nodes.some((node) => node.id === "hero") ? ["hero"] : []), ...events.map((node) => node.id), ...characters.map((node) => node.id)]);
  const custom = source.nodes.filter((node) => !original.has(node.id));
  // Include each connected personal component where its anchor appears. Orphans go to Arc 1.
  const visited = new Set<string>();
  for (const node of custom) {
    if (visited.has(node.id)) continue;
    const component = new Set([node.id]);
    const anchors = new Set<string>();
    for (const id of component) {
      visited.add(id);
      for (const link of source.links.filter((item) => item.source === id || item.target === id)) {
        const other = link.source === id ? link.target : link.source;
        if (!original.has(other)) component.add(other); else if (other !== "hero") anchors.add(other);
      }
    }
    const hasChapters = source.nodes.some((item) => component.has(item.id) && item.chapters?.length);
    if ([...component].some((id) => ids.has(id)) || [...anchors].some((id) => ids.has(id)) || (!anchors.size && !hasChapters && arc.id === storyArcs[0].id)) {
      for (const id of component) ids.add(id);
    }
  }

  const positions = new Map<string, { x: number; y: number }>();
  let rowTop = 260;
  for (const realm of ["cultivation", "reality", undefined] as const) {
    const lane = events.filter((node) => node.realm === realm);
    lane.forEach((node, index) => {
      const row = Math.floor(index / 3);
      const column = row % 2 ? 2 - index % 3 : index % 3;
      positions.set(node.id, { x: 440 + column * 580, y: rowTop + row * 380 });
    });
    if (lane.length) rowTop += Math.ceil(lane.length / 3) * 380 + 100;
  }
  positions.set("hero", { x: 0, y: 330 });
  characters.forEach((node, index) => positions.set(node.id, { x: 100 + index % 5 * 340, y: rowTop + Math.floor(index / 5) * 310 }));
  const sourceNodes = new Map(source.nodes.map((node) => [node.id, node]));
  for (const [id, target] of positions) {
    const before = original.get(id), saved = sourceNodes.get(id);
    if (before && saved) positions.set(id, { x: target.x + saved.x - before.x, y: target.y + saved.y - before.y });
  }
  // Propagate the same translation through every personal node in an anchored component.
  for (const [id, target] of positions) {
    const anchor = sourceNodes.get(id);
    if (!anchor) continue;
    for (const link of source.links.filter((item) => item.source === id || item.target === id)) {
      const otherId = link.source === id ? link.target : link.source;
      const other = sourceNodes.get(otherId);
      if (other && ids.has(otherId) && !positions.has(otherId) && !original.has(otherId)) positions.set(otherId, { x: target.x + other.x - anchor.x, y: target.y + other.y - anchor.y });
    }
  }
  const nodes = source.nodes.filter((node) => ids.has(node.id)).map((node) => {
    const before = original.get(node.id);
    const target = positions.get(node.id);
    const chapters = node.kind === "event" ? node.chapters?.filter((chapter) => chapter >= arc.from && chapter <= arc.to) : node.chapters;
    const partial = chapters?.length && chapters.length !== node.chapters?.length;
    const scoped = partial ? {
      ...(before && node.eyebrow === before.eyebrow ? { eyebrow: `${node.realm === "reality" ? "Thế giới thực" : "Tu Hành"} · ${chapterLabel(chapters)}` } : {}),
      ...(before && node.summary === before.summary ? { summary: chapterNotes.filter((note) => chapters.includes(note.chapter)).map((note) => note.summary).join(" ") } : {}),
    } : {};
    return { ...node, ...scoped, chapters: chapters?.length ? chapters : undefined, ...target };
  });
  const links = source.links.filter((link) => ids.has(link.source) && ids.has(link.target)).map((link) => ({ ...link }));
  const add = (link: StoryGraph["links"][number]) => {
    if (ids.has(link.source) && ids.has(link.target) && !links.some((item) => item.source === link.source && item.target === link.target)) links.push(link);
  };
  for (const realm of ["cultivation", "reality"] as const) {
    const first = events.find((node) => node.realm === realm);
    if (first && source.links.some((link) => link.timeline && link.target === first.id)) add({ source: "hero", target: first.id, label: realm === "cultivation" ? "Tu Hành" : "Thế giới thực", timeline: true, fork: true });
  }
  for (const node of characters) {
    const oldIntroduction = storyLinks.find((link) => link.introduction && link.target === node.id);
    if (oldIntroduction && ids.has(oldIntroduction.source)) continue; // Keep a deleted introduction deleted.
    const name = original.get(node.id)?.title ?? node.title;
    const event = events.find((item) => [name, ...(aliases[node.id] ?? [])].some((alias) => words(item.summary).includes(words(alias)))) ?? events[0];
    if (event) add({ source: event.id, target: node.id, label: "Liên quan trong Arc", introduction: true });
  }
  return { version: 1, nodes, links };
}

export type CrossArcLink = { arcId: string; title: string; label: string; source: string; target: string };
export function getCrossArcLinks(source: StoryGraph, arc: StoryArc): CrossArcLink[] {
  const nodes = new Map(source.nodes.map((node) => [node.id, node]));
  const visible = new Set(createArcGraph(source, arc).nodes.map((node) => node.id));
  return source.links.flatMap((link) => {
    const seedLink = storyLinks.find((item) => item.source === link.source && item.target === link.target);
    if ((link.timeline || link.introduction) && seedLink?.label === link.label) return [];
    const from = nodes.get(link.source), to = nodes.get(link.target);
    if (!from || !to || visible.has(from.id) === visible.has(to.id)) return [];
    const outside = visible.has(from.id) ? to : from;
    const destination = arcForChapter(outside.chapters?.[0] ?? 0);
    return destination && destination.id !== arc.id ? [{ arcId: destination.id, title: outside.title, label: link.label, source: link.source, target: link.target }] : [];
  });
}

type StoragePort = Pick<Storage, "getItem" | "setItem" | "removeItem">;
export const arcStorageKey = (arc: Pick<StoryArc, "id">) => `${STORY_STORAGE_KEY}:arc:${arc.id}`;
export function readArcGraph(storage: StoragePort, arc: StoryArc) {
  const source = parseGraph(readStoredGraph(storage));
  if (!source) throw new Error("Không đọc được bản đồ cũ; bản lưu vẫn được giữ nguyên.");
  const seed = createArcGraph(source, arc);
  const raw = storage.getItem(arcStorageKey(arc));
  if (raw === null) return { graph: seed, seed, crossLinks: getCrossArcLinks(source, arc) };
  let snapshot;
  try { snapshot = JSON.parse(raw); } catch { throw new Error("Không đọc được sơ đồ Arc đã lưu; bản lưu vẫn được giữ nguyên."); }
  const saved = parseGraph(JSON.stringify(snapshot?.graph));
  const previous = parseGraph(JSON.stringify(snapshot?.seed));
  if (snapshot?.version !== 1 || !saved || !previous) throw new Error("Không đọc được sơ đồ Arc đã lưu; bản lưu vẫn được giữ nguyên.");
  return { graph: mergeSeedUpdate(saved, previous, seed), seed, crossLinks: getCrossArcLinks(source, arc) };
}
export function saveArcGraph(storage: Pick<Storage, "setItem">, arc: StoryArc, graph: StoryGraph, seed: StoryGraph) {
  storage.setItem(arcStorageKey(arc), JSON.stringify({ version: 1, seed, graph }));
}
