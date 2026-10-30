import { getNodeSize, sceneSize, storyLinks, storyNodes, type StoryLink, type StoryNode } from "./timeline";
import { isPortraitData } from "./portraits";
import previousSeed from "./legacy/v5.json";
import previousSeedV6 from "./legacy/v6.json";
import previousSeedV7 from "./legacy/v7.json";
import previousSeedV8 from "./legacy/v8.json";
import previousSeedV9 from "./legacy/v9.json";
import previousSeedV10 from "./legacy/v10.json";
import previousSeedV11 from "./legacy/v11.json";
import previousSeedV12 from "./legacy/v12.json";
import { combinedMilestones, mergedMilestoneId, mergeStoryMilestones } from "./merge-seed";
import retiredCharacterIds from "./retired-character-ids.json";
import previousSeedV13 from "./legacy/v13.json";
import previousSeed200 from "./legacy/chapters-200.json";
import previousSeed300 from "./legacy/chapters-300.json";
import previousSeed1000 from "./legacy/chapters-1000.json";
import { mergeSeedUpdate } from "./merge-seed";
import { mergeCharacterAliases } from "./merge-character-aliases";

export const STORY_STORAGE_KEY = "story-wiki:chu-gioi-tan-the-online:v13";
export type StoryGraph = { version: 1; nodes: StoryNode[]; links: StoryLink[] };

const legacyLinkLabels = new Map<string, string>([
  ["hero:awakening", "Tu Hành"], ["awakening:rescue", "Giải cứu"], ["rescue:bach-hoa", "Bái sư"],
  ["hero:truong-da-trap", "Thế giới thực"], ["truong-da-trap:anna", "Đối đầu"], ["anna:impartial-goddess", "Chế tạo"],
  ...Object.entries({ rescue: ["cong-ton-tri", "ninh-nguyet-thien", "lanh-thien-tinh"], "bach-hoa": ["bach-hoa-master", "white-goose", "tan-tieu-lau", "tu-tu"], "truong-da-trap": ["truong-da", "to-tuyet-nhi"], anna: ["anna-character"], "impartial-goddess": ["impartial-goddess-character"] })
    .flatMap(([source, targets]) => targets.map((target): [string, string] => [`${source}:${target}`, "Xuất hiện"])),
]);

export function createInitialGraph(): StoryGraph {
  return { version: 1, nodes: storyNodes.map((node) => ({ ...node, source: node.source ? { ...node.source } : undefined })), links: storyLinks.map((link) => ({ ...link })) };
}

export function readStoredGraph(storage: Pick<Storage, "getItem" | "setItem" | "removeItem">): string {
  let raw = storage.getItem(STORY_STORAGE_KEY);
  if (raw === null) {
    const savedV12 = storage.getItem("story-wiki:chu-gioi-tan-the-online:v12");
    const savedV11 = storage.getItem("story-wiki:chu-gioi-tan-the-online:v11");
    const savedV10 = storage.getItem("story-wiki:chu-gioi-tan-the-online:v10");
    const savedV9 = storage.getItem("story-wiki:chu-gioi-tan-the-online:v9");
    const savedV8 = storage.getItem("story-wiki:chu-gioi-tan-the-online:v8");
    const savedV7 = storage.getItem("story-wiki:chu-gioi-tan-the-online:v7");
    const savedV6 = storage.getItem("story-wiki:chu-gioi-tan-the-online:v6");
    const previous = savedV12 ?? savedV11 ?? savedV10 ?? savedV9 ?? savedV8 ?? savedV7 ?? savedV6 ?? storage.getItem("story-wiki:chu-gioi-tan-the-online:v5");
    if (previous !== null) {
      const saved = parseGraph(previous);
      if (!saved) throw new Error("Không đọc được sơ đồ cũ; bản lưu cũ vẫn được giữ nguyên.");
      const baseline = savedV12 !== null ? previousSeedV12 : savedV11 !== null ? previousSeedV11 : savedV10 !== null ? previousSeedV10 : savedV9 !== null ? previousSeedV9 : savedV8 !== null ? previousSeedV8 : savedV7 !== null ? previousSeedV7 : savedV6 !== null ? previousSeedV6 : previousSeed;
      raw = JSON.stringify(mergeStoryMilestones(saved, baseline as StoryGraph, createInitialGraph()));
      storage.setItem(STORY_STORAGE_KEY, raw);
    }
  }
  if (raw === null) {
    const previous = storage.getItem("story-wiki:chu-gioi-tan-the-online:v4") ?? storage.getItem("story-wiki:chu-gioi-tan-the-online:v3");
    const saved = previous === null ? null : parseGraph(previous);
    if (previous !== null && !saved) throw new Error("Không đọc được sơ đồ cũ; bản lưu cũ vẫn được giữ nguyên.");
    const next = createInitialGraph();
    if (saved) {
      // Canonical facts are replaced; keep personal nodes and portraits. The old
      // storage key remains a backup of all earlier authored text and positions.
      const seedIds = new Set([...storyNodes.map((node) => node.id), ...combinedMilestones.map((item) => item.from), "tan-tieu-lau", "tu-tu"]);
      const custom = saved.nodes.filter((node) => !seedIds.has(node.id));
      next.nodes = next.nodes.map((node) => ({ ...node, portrait: saved.nodes.find((old) => old.id === node.id)?.portrait }));
      next.nodes.push(...custom);
      const existing = new Set(next.nodes.map((node) => node.id));
      for (const original of saved.links) {
        const link = { ...original, source: mergedMilestoneId(original.source), target: mergedMilestoneId(original.target) };
        if (link.source === link.target || !existing.has(link.source) || !existing.has(link.target)) continue;
        const legacyLabel = legacyLinkLabels.get(`${original.source}:${original.target}`);
        const replacement = next.links.find((item) => item.source === link.source && item.target === link.target);
        if (replacement) {
          if (link.label !== legacyLabel) replacement.label = link.label;
        } else if (link.label !== legacyLabel) {
          // Preserve authored relationships, but do not revive an obsolete fork.
          next.links.push(legacyLabel === undefined ? link : { source: link.source, target: link.target, label: link.label });
        }
      }
      if (!saved.nodes.length) { next.nodes = []; next.links = []; }
    }
    raw = JSON.stringify(next);
    storage.setItem(STORY_STORAGE_KEY, raw);
  }
  // Apply the curated roster to existing browser saves as well as the new seed.
  // Only known retired characters are removed; personal additions remain intact.
  const saved = parseGraph(raw);
  if (saved) {
    const retired = new Set(retiredCharacterIds);
    const nodes = saved.nodes.filter((node) => node.kind !== "character" || !retired.has(node.id));
    if (nodes.length !== saved.nodes.length) {
      const backupKey = `${STORY_STORAGE_KEY}:before-character-curation`;
      if (storage.getItem(backupKey) === null) storage.setItem(backupKey, raw);
      const existing = new Set(nodes.map((node) => node.id));
      raw = JSON.stringify({ ...saved, nodes, links: saved.links.filter((link) => existing.has(link.source) && existing.has(link.target)) });
      storage.setItem(STORY_STORAGE_KEY, raw);
    }
  }
  // Restore the explicitly requested companion once, including already curated saves.
  // A later manual deletion remains the reader's choice.
  const restoreKey = `${STORY_STORAGE_KEY}:meo-mun-restored`;
  if (saved && storage.getItem(restoreKey) === null) {
    const current = parseGraph(raw)!;
    const companion = storyNodes.find((node) => node.id === "meo-mun");
    if (companion && current.nodes.length && !current.nodes.some((node) => node.id === companion.id)) {
      current.nodes.push({ ...companion });
      const existing = new Set(current.nodes.map((node) => node.id));
      current.links.push(...storyLinks.filter((link) => link.target === companion.id && existing.has(link.source)).map((link) => ({ ...link })));
      raw = JSON.stringify(current);
      storage.setItem(STORY_STORAGE_KEY, raw);
    }
    storage.setItem(restoreKey, "1");
  }
  const extensionKey = `${STORY_STORAGE_KEY}:chapters-200`;
  if (saved && storage.getItem(extensionKey) === null) {
    const backupKey = `${STORY_STORAGE_KEY}:before-chapters-200`;
    if (storage.getItem(backupKey) === null) storage.setItem(backupKey, raw);
    raw = JSON.stringify(mergeSeedUpdate(parseGraph(raw)!, previousSeedV13 as StoryGraph, createInitialGraph()));
    storage.setItem(STORY_STORAGE_KEY, raw);
    storage.setItem(extensionKey, "1");
  }
  const extension300Key = `${STORY_STORAGE_KEY}:chapters-300`;
  if (saved && storage.getItem(extension300Key) === null) {
    const backupKey = `${STORY_STORAGE_KEY}:before-chapters-300`;
    if (storage.getItem(backupKey) === null) storage.setItem(backupKey, raw);
    raw = JSON.stringify(mergeSeedUpdate(parseGraph(raw)!, previousSeed200 as StoryGraph, createInitialGraph()));
    storage.setItem(STORY_STORAGE_KEY, raw);
    storage.setItem(extension300Key, "1");
  }
  const extension1000Key = `${STORY_STORAGE_KEY}:chapters-1000`;
  if (saved && storage.getItem(extension1000Key) === null) {
    const backupKey = `${STORY_STORAGE_KEY}:before-chapters-1000`;
    if (storage.getItem(backupKey) === null) storage.setItem(backupKey, raw);
    raw = JSON.stringify(mergeSeedUpdate(parseGraph(raw)!, previousSeed300 as StoryGraph, createInitialGraph()));
    storage.setItem(STORY_STORAGE_KEY, raw);
    storage.setItem(extension1000Key, "1");
  }
  const extension1500Key = `${STORY_STORAGE_KEY}:chapters-1500`;
  if (saved && storage.getItem(extension1500Key) === null) {
    const backupKey = `${STORY_STORAGE_KEY}:before-chapters-1500`;
    if (storage.getItem(backupKey) === null) storage.setItem(backupKey, raw);
    raw = JSON.stringify(mergeCharacterAliases(parseGraph(raw)!, previousSeed1000 as StoryGraph, createInitialGraph()));
    storage.setItem(STORY_STORAGE_KEY, raw);
    storage.setItem(extension1500Key, "1");
  }
  // The author explicitly replaced the previous diagram, including saved copies.
  storage.removeItem("story-wiki:chu-gioi-tan-the-online:v1");
  storage.removeItem("story-wiki:chu-gioi-tan-the-online:v2");
  return raw;
}

export function isSourceUrl(value: string): boolean {
  try { return ["http:", "https:"].includes(new URL(value).protocol); } catch { return false; }
}

export function parseGraph(raw: string): StoryGraph | null {
  try {
    const value = JSON.parse(raw);
    if (!value || value.version !== 1 || !Array.isArray(value.nodes) || !Array.isArray(value.links)) return null;
    const ids = new Set<string>();
    for (const node of value.nodes) {
      if (!node || typeof node.id !== "string" || !node.id || ids.has(node.id) ||
        typeof node.title !== "string" || !node.title.trim() || typeof node.summary !== "string" ||
        typeof node.eyebrow !== "string" || !["event", "world", "character"].includes(node.kind) ||
        !Number.isFinite(node.x) || !Number.isFinite(node.y) ||
        (node.realm !== undefined && !["cultivation", "reality"].includes(node.realm))) return null;
      if (node.source !== undefined && (!node.source || typeof node.source.title !== "string" || typeof node.source.url !== "string" || !isSourceUrl(node.source.url))) return null;
      if (node.portrait !== undefined && !isPortraitData(node.portrait)) return null;
      if (node.chapters !== undefined && (!Array.isArray(node.chapters) || !node.chapters.length || node.chapters.some((chapter: unknown) => typeof chapter !== "number" || !Number.isInteger(chapter) || chapter < 1 || chapter > 1500))) return null;
      ids.add(node.id);
    }
    for (const link of value.links) {
      if (!link || !ids.has(link.source) || !ids.has(link.target) || typeof link.label !== "string" ||
        (link.timeline !== undefined && typeof link.timeline !== "boolean") ||
        (link.fork !== undefined && typeof link.fork !== "boolean") ||
        (link.introduction !== undefined && typeof link.introduction !== "boolean")) return null;
    }
    return { version: 1, nodes: value.nodes, links: value.links };
  } catch { return null; }
}

export function removeNode(graph: StoryGraph, id: string): StoryGraph {
  return { ...graph, nodes: graph.nodes.filter((node) => node.id !== id), links: graph.links.filter((link) => link.source !== id && link.target !== id) };
}

export function graphBounds(nodes: StoryNode[]) {
  if (!nodes.length) return { x: 0, y: 0, ...sceneSize };
  const x = Math.min(...nodes.map((node) => node.x)) - 30;
  const y = Math.min(...nodes.map((node) => node.y)) - 40;
  return { x, y, width: Math.max(...nodes.map((node) => node.x + getNodeSize(node).width)) + 30 - x, height: Math.max(...nodes.map((node) => node.y + getNodeSize(node).height)) + 40 - y };
}
