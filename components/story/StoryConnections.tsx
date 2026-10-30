"use client";

import { connectionGeometry, forkGeometry, introductionGeometry, linkKey } from "../../lib/story/connections";
import { getNodeSize, sceneSize, type StoryLink, type StoryNode } from "../../lib/story/timeline";
import type { ConnectionDraft } from "./useConnections";
import styles from "./story-timeline.module.css";

export function StoryConnections({ nodes, links, isActive, draft, scale, onSelect }: {
  nodes: StoryNode[]; links: StoryLink[]; isActive: (node: StoryNode) => boolean;
  draft: ConnectionDraft | null; scale: number; onSelect: (link: StoryLink) => void;
}) {
  const rendered = links.flatMap((link) => {
    const from = nodes.find((node) => node.id === link.source);
    const to = nodes.find((node) => node.id === link.target);
    const hasReverse = links.some((other) => other.source === link.target && other.target === link.source);
    return from && to ? [{ link, from, to, geometry: link.introduction && !hasReverse ? introductionGeometry(from, to) : link.fork && !hasReverse ? forkGeometry(from, to) : connectionGeometry(from, to, hasReverse), active: isActive(from) && isActive(to) }] : [];
  });
  const source = draft && nodes.find((node) => node.id === draft.source);
  return <>
    <svg className={styles.connections} width={sceneSize.width} height={sceneSize.height} aria-hidden="true">
      <defs><marker id="story-arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#7e9588" /></marker></defs>
      {rendered.map(({ link, geometry, active }) => <g key={linkKey(link)} opacity={active ? 1 : 0.16}>
        <path data-testid={`story-link-${link.source}-${link.target}`} data-fork={link.fork || undefined} d={geometry.path} fill="none" stroke={link.timeline ? "#7e9588" : "#a9b7a4"} strokeWidth={2} strokeDasharray={link.timeline ? undefined : "5 5"} markerEnd="url(#story-arrow)" />
        <path className={styles.linkHit} d={geometry.path} fill="none" stroke="transparent" strokeWidth={18} vectorEffect="non-scaling-stroke" onPointerDown={(event) => event.stopPropagation()} onClick={(event) => { event.stopPropagation(); onSelect(link); }} />
      </g>)}
      {source && draft && <path data-testid="connection-preview" d={`M${source.x + getNodeSize(source).width},${source.y + getNodeSize(source).height / 2} L${draft.x},${draft.y}`} fill="none" stroke="#618764" strokeWidth={2 / scale} strokeDasharray={`${5 / scale} ${4 / scale}`} />}
    </svg>
    {rendered.map(({ link, from, to, geometry, active }) => <button key={linkKey(link)} className={`${styles.linkLabel} ${link.introduction ? styles.introductionLabel : ""}`} style={{ left: geometry.label.x, top: geometry.label.y, opacity: active ? 1 : 0.16 }} aria-label={`Đường nối ${from.title} đến ${to.title}: ${link.label}`} title={`${link.label} · Bấm để sửa hoặc xóa`} onPointerDown={(event) => event.stopPropagation()} onClick={() => onSelect(link)}>{link.label || "Đường nối"}</button>)}
  </>;
}
