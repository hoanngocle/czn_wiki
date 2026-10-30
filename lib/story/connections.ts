import { getNodeSize, type StoryLink, type StoryNode } from "./timeline";
import type { StoryGraph } from "./graph";

export const linkKey = (link: Pick<StoryLink, "source" | "target">) => JSON.stringify([link.source, link.target]);

export function connectNodes(graph: StoryGraph, source: string, target: string): StoryGraph {
  if (source === target || !graph.nodes.some((node) => node.id === source) || !graph.nodes.some((node) => node.id === target) || graph.links.some((link) => link.source === source && link.target === target)) return graph;
  return { ...graph, links: [...graph.links, { source, target, label: "Liên quan", timeline: true }] };
}

export function connectionGeometry(from: StoryNode, to: StoryNode, hasReverse = false) {
  const fromSize = getNodeSize(from);
  const toSize = getNodeSize(to);
  const a = { x: from.x + fromSize.width / 2, y: from.y + fromSize.height / 2 };
  const b = { x: to.x + toSize.width / 2, y: to.y + toSize.height / 2 };
  const horizontal = Math.abs(b.x - a.x) >= Math.abs(b.y - a.y);
  const sign = (horizontal ? b.x >= a.x : b.y >= a.y) ? 1 : -1;
  const start = { x: a.x + (horizontal ? sign * fromSize.width / 2 : 0), y: a.y + (horizontal ? 0 : sign * fromSize.height / 2) };
  const end = { x: b.x - (horizontal ? sign * toSize.width / 2 : 0), y: b.y - (horizontal ? 0 : sign * toSize.height / 2) };
  const bend = Math.max(35, Math.abs(horizontal ? end.x - start.x : end.y - start.y) * 0.45);
  const dx = horizontal ? sign * bend : 0;
  const dy = horizontal ? 0 : sign * bend;
  // Opposite directions bow onto opposite sides, keeping both hit targets accessible.
  const offsetX = hasReverse && !horizontal ? -sign * 90 : 0;
  const offsetY = hasReverse && horizontal ? sign * 40 : 0;
  return { path: `M${start.x},${start.y} C${start.x + dx + offsetX},${start.y + dy + offsetY} ${end.x - dx + offsetX},${end.y - dy + offsetY} ${end.x},${end.y}`, label: { x: (start.x + end.x) / 2 + offsetX * 0.75, y: (start.y + end.y) / 2 + offsetY * 0.75 } };
}

export function forkGeometry(from: StoryNode, to: StoryNode) {
  // Both branches share the same short stem before curving toward their lane.
  // Fall back to the general routing if the user drags a target behind the root.
  const fromSize = getNodeSize(from);
  const toSize = getNodeSize(to);
  if (to.x < from.x + fromSize.width + 60) return connectionGeometry(from, to);
  const startX = from.x + fromSize.width;
  const forkX = startX + 30;
  const fromY = from.y + fromSize.height / 2;
  const toY = to.y + toSize.height / 2;
  return {
    path: `M${startX},${fromY} H${forkX} C${forkX + 50},${fromY} ${to.x - 50},${toY} ${to.x},${toY}`,
    label: { x: (forkX + to.x) / 2, y: (fromY + toY) / 2 },
  };
}

export function introductionGeometry(from: StoryNode, to: StoryNode) {
  const fromSize = getNodeSize(from);
  const toSize = getNodeSize(to);
  const trunkX = from.x + 260;
  if (trunkX >= to.x && trunkX <= to.x + toSize.width) return connectionGeometry(from, to);
  const above = to.y < from.y;
  const startY = from.y + (above ? 0 : fromSize.height);
  const turnY = startY + (above ? -40 : 40);
  const targetY = to.y + toSize.height / 2;
  const edgeX = to.x + (trunkX > to.x ? toSize.width : 0);
  return {
    path: `M${from.x + fromSize.width / 2},${startY} V${turnY} H${trunkX} V${targetY} H${edgeX}`,
    label: { x: trunkX, y: targetY - 12 },
  };
}
