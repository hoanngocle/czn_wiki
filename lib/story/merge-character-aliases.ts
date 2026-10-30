import type { StoryGraph } from "./graph";
import { mergeSeedUpdate } from "./merge-seed";
import aliases from "./character-aliases-1001-1500.json";

/** Normalize both sides before the three-way merge, retaining conflicting personal fields. */
function normalize(graph: StoryGraph, original?: StoryGraph): StoryGraph {
  const nodes = graph.nodes.map((node) => ({ ...node }));
  const remap = (id: string) => aliases.find((alias) => alias.from === id)?.to ?? id;
  for (const alias of aliases) {
    const old = nodes.find((node) => node.id === alias.from);
    if (!old) continue;
    const canonical = nodes.find((node) => node.id === alias.to);
    if (!canonical) {
      old.id = alias.to;
      continue;
    }
    canonical.summary = [...new Set([canonical.summary, old.summary].filter(Boolean))].join("\n\n");
    const oldBase = original?.nodes.find((node) => node.id === alias.from);
    const canonicalBase = original?.nodes.find((node) => node.id === alias.to);
    let conflict = false;
    for (const key of ["title", "eyebrow", "x", "y", "realm", "source", "chapters", "portrait"] as const) {
      const oldChanged = oldBase && JSON.stringify(old[key]) !== JSON.stringify(oldBase[key]);
      const canonicalChanged = canonicalBase && JSON.stringify(canonical[key]) !== JSON.stringify(canonicalBase[key]);
      if (oldChanged && canonicalChanged && JSON.stringify(old[key]) !== JSON.stringify(canonical[key])) conflict = true;
      else if ((oldChanged && !canonicalChanged) || canonical[key] === undefined) Object.assign(canonical, { [key]: old[key] });
    }
    if (conflict) {
      // A single profile has one portrait/source/position. Keep a personal note node
      // for the second authored version instead of discarding either version.
      let id = `personal-${alias.from}`;
      while (nodes.some((node) => node.id === id)) id += "-saved";
      nodes.push({ ...old, id, kind: "world", title: `Ghi chú từ hồ sơ ${old.title}`, eyebrow: "Bản lưu cá nhân khi hợp nhất tên" });
    }
    nodes.splice(nodes.indexOf(old), 1);
  }
  const links = new Map<string, StoryGraph["links"][number]>();
  for (const originalLink of graph.links) {
    const link = { ...originalLink, source: remap(originalLink.source), target: remap(originalLink.target) };
    if (link.source === link.target) continue;
    const key = JSON.stringify([link.source, link.target]);
    const before = links.get(key);
    links.set(key, before ? { ...before, label: [...new Set([before.label, link.label])].join(" / ") } : link);
  }
  return { version: 1, nodes, links: [...links.values()] };
}

export function mergeCharacterAliases(saved: StoryGraph, previous: StoryGraph, next: StoryGraph): StoryGraph {
  return mergeSeedUpdate(normalize(saved, previous), normalize(previous), next);
}
