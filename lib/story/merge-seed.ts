import type { StoryGraph } from "./graph";

export const combinedMilestones = [{ from: "training", to: "awakening", prepend: false }, { from: "than-vo", to: "rescue", prepend: false }, { from: "bach-hoa", to: "sword", prepend: false }, { from: "apprenticeship", to: "sword", prepend: false }, { from: "sect-family", to: "saints", prepend: false }, { from: "foundation", to: "saints", prepend: false }, { from: "archery", to: "impartial-goddess", prepend: false }, { from: "sea", to: "impartial-goddess", prepend: false }, { from: "upgrade", to: "impartial-goddess", prepend: false }, { from: "outbreak", to: "cosmic-search", prepend: false }];
export const mergedMilestoneId = (id: string) => combinedMilestones.find((item) => item.from === id)?.to ?? id;

/** Fold combined milestones together while carrying personal notes and relationships. */
export function mergeStoryMilestones(saved: StoryGraph, previous: StoryGraph, next: StoryGraph): StoryGraph {
  const remap = (graph: StoryGraph): StoryGraph => {
    const links = new Map<string, StoryGraph["links"][number]>();
    for (const original of graph.links) {
      const link = { ...original, source: mergedMilestoneId(original.source), target: mergedMilestoneId(original.target) };
      if (link.source === link.target) continue;
      const key = JSON.stringify([link.source, link.target]);
      const existing = links.get(key);
      links.set(key, existing ? { ...existing, label: [...new Set([existing.label, link.label].filter(Boolean))].join(" / ") } : link);
    }
    return { ...graph, links: [...links.values()] };
  };
  const merged = mergeSeedUpdate(remap(saved), remap(previous), next);
  for (const item of combinedMilestones) {
    const personal = saved.nodes.find((node) => node.id === item.from);
    const original = previous.nodes.find((node) => node.id === item.from);
    const target = merged.nodes.find((node) => node.id === item.to);
    if (personal && original && target) {
      if (personal.summary && personal.summary !== original.summary) target.summary = (item.prepend ? [personal.summary, target.summary] : [target.summary, personal.summary]).join("\n\n");
      if (personal.source && !target.source) target.source = personal.source;
    }
  }
  // A personal label on an edge inside a merged milestone remains readable as a note.
  for (const link of saved.links) {
    const targetId = mergedMilestoneId(link.source);
    if (link.source === link.target || targetId !== mergedMilestoneId(link.target) || !link.label) continue;
    const original = previous.links.find((item) => item.source === link.source && item.target === link.target);
    const target = merged.nodes.find((node) => node.id === targetId);
    if (target && link.label !== original?.label) target.summary += `\n\nGhi chú đường nối: ${link.label}`;
  }
  return merged;
}

function mergeFields<T extends object>(saved: T, previous: T, next: T): T {
  let merged = { ...next };
  for (const key of Object.keys({ ...previous, ...saved }) as (keyof T)[]) {
    if (JSON.stringify(saved[key]) !== JSON.stringify(previous[key])) merged = { ...merged, [key]: saved[key] };
  }
  return merged;
}

/** Three-way update: refresh unchanged seed fields and retain authored changes. */
export function mergeSeedUpdate(saved: StoryGraph, previous: StoryGraph, next: StoryGraph): StoryGraph {
  if (!saved.nodes.length) return saved;
  const previousNodes = new Map(previous.nodes.map((node) => [node.id, node]));
  const savedNodes = new Map(saved.nodes.map((node) => [node.id, node]));
  const nextIds = new Set(next.nodes.map((node) => node.id));
  const nodes = next.nodes.flatMap((node) => {
    const before = previousNodes.get(node.id);
    const personal = savedNodes.get(node.id);
    if (before && !personal) return []; // Intentional deletion.
    return [before && personal ? mergeFields(personal, before, node) : personal ?? node];
  });
  nodes.push(...saved.nodes.filter((node) => !nextIds.has(node.id) && !previousNodes.has(node.id)));
  const existing = new Set(nodes.map((node) => node.id));
  const key = (link: StoryGraph["links"][number]) => JSON.stringify([link.source, link.target]);
  const previousLinks = new Map(previous.links.map((link) => [key(link), link]));
  const savedLinks = new Map(saved.links.map((link) => [key(link), link]));
  const nextLinkKeys = new Set(next.links.map(key));
  const links = next.links.flatMap((link) => {
    const before = previousLinks.get(key(link));
    const personal = savedLinks.get(key(link));
    if (before && !personal) return [];
    return [before && personal ? mergeFields(personal, before, link) : personal ?? link];
  });
  links.push(...saved.links.filter((link) => !nextLinkKeys.has(key(link)) && (!previousLinks.has(key(link)) || JSON.stringify(link) !== JSON.stringify(previousLinks.get(key(link))))));
  return { version: 1, nodes, links: links.filter((link) => existing.has(link.source) && existing.has(link.target)) };
}
