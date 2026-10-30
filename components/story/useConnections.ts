"use client";

import { useRef, useState, type PointerEvent, type RefObject } from "react";
import { connectNodes } from "../../lib/story/connections";
import { getNodeSize, type StoryLink, type StoryNode } from "../../lib/story/timeline";
import type { StoryGraph } from "../../lib/story/graph";
import type { Viewport } from "../../lib/story/viewport";

export type ConnectionDraft = { source: string; x: number; y: number; target?: string; pointerId: number | null; startX: number; startY: number; moved: boolean };

export function useConnections({ graphRef, viewportRef, view, update, onSelect }: {
  graphRef: RefObject<StoryGraph>; viewportRef: RefObject<HTMLDivElement | null>; view: Viewport;
  update: (graph: StoryGraph) => void; onSelect: (link: StoryLink) => void;
}) {
  const [draft, setDraft] = useState<ConnectionDraft | null>(null);
  const draftRef = useRef<ConnectionDraft | null>(null);
  const changeDraft = (next: ConnectionDraft | null) => { draftRef.current = next; setDraft(next); };
  const cancel = () => changeDraft(null);
  const hitNode = (x: number, y: number) => document.elementFromPoint(x, y)?.closest<HTMLElement>("[data-story-node]")?.dataset.storyNode;
  const finish = (target?: string) => {
    const current = draftRef.current;
    cancel();
    if (!current || !target || current.source === target) return;
    const graph = graphRef.current;
    const next = connectNodes(graph, current.source, target);
    const link = next.links.find((item) => item.source === current.source && item.target === target);
    if (!link) return;
    if (next !== graph) update(next);
    onSelect(link);
  };
  const begin = (node: StoryNode, pointerId: number | null = null, startX = 0, startY = 0) => {
    changeDraft({ source: node.id, x: node.x + getNodeSize(node).width, y: node.y + getNodeSize(node).height / 2, pointerId, startX, startY, moved: false });
  };
  const move = (event: PointerEvent<HTMLElement>) => {
    const current = draftRef.current;
    const rect = viewportRef.current?.getBoundingClientRect();
    if (!current || !rect || (current.pointerId !== null && current.pointerId !== event.pointerId)) return;
    const target = hitNode(event.clientX, event.clientY);
    changeDraft({ ...current, x: (event.clientX - rect.left - view.x) / view.scale, y: (event.clientY - rect.top - view.y) / view.scale, target: target !== current.source ? target : undefined, moved: current.moved || Math.hypot(event.clientX - current.startX, event.clientY - current.startY) >= 4 });
  };
  const pointerDown = (event: PointerEvent<HTMLButtonElement>, node: StoryNode) => {
    event.stopPropagation();
    if (event.button !== 0) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    begin(node, event.pointerId, event.clientX, event.clientY);
  };
  const pointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    const current = draftRef.current;
    if (!current || current.pointerId !== event.pointerId) return;
    if (current.moved) finish(hitNode(event.clientX, event.clientY));
    else changeDraft({ ...current, pointerId: null });
  };
  const selectTarget = (id: string) => {
    if (!draftRef.current || draftRef.current.pointerId !== null) return false;
    finish(id);
    return true;
  };
  return { draft, draftRef, begin, cancel, move, pointerDown, pointerUp, selectTarget };
}
