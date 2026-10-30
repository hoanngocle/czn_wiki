"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { storyReaderUrl } from "./StorySidebar";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { nodeLabels, getNodeSize, nodeSize, type NodeKind, type StoryNode, type StoryLink } from "../../lib/story/timeline";
import { getStoryArc, storyArcs, arcUrl } from "../../lib/story/arcs";
import { graphBounds, removeNode } from "../../lib/story/graph";
import { linkKey } from "../../lib/story/connections";
import { useConnections } from "./useConnections";
import { StoryConnections } from "./StoryConnections";
import { LinkEditor } from "./LinkEditor";
import { useStoryGraph } from "./useStoryGraph";
import { NodeEditor, type NodeDraft } from "./NodeEditor";
import { fitViewport, zoomViewport, type Viewport } from "../../lib/story/viewport";
import chapterNotes from "../../lib/story/chapter-notes.json";
import styles from "./story-timeline.module.css";
import { Icon, type IconName } from "./StoryIcon";
import { StoryShell } from "./StoryShell";
import { HeroIcon } from "./StoryHeroIcon";
import shell from "./story-shell.module.css";
import arcStyles from "./story-arcs.module.css";

const kindIcon: Record<NodeKind, IconName> = { event: "event", world: "world", character: "person" };
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/Đ/g, "D").toLowerCase();

export function StoryTimeline({ arcId }: { arcId?: string }) {
  const router = useRouter();
  const arc = getStoryArc(arcId);
  const previousArc = storyArcs[arc.order - 2];
  const nextArc = storyArcs[arc.order];
  const storyScope = `Chương ${arc.from}–${arc.to}`;
  useEffect(() => {
    const redirectLegacyReader = () => {
      if (window.location.hash === "#doc-truyen") router.replace(storyReaderUrl + window.location.search);
    };
    redirectLegacyReader();
    window.addEventListener("hashchange", redirectLegacyReader);
    return () => window.removeEventListener("hashchange", redirectLegacyReader);
  }, [router]);
  const { graph, graphRef, loaded, update, persist, storageError, crossLinks } = useStoryGraph(arc);
  const { nodes: storyNodes, links: storyLinks } = graph;
  const [showCharacters, setShowCharacters] = useState(false);
  const visibleNodes = storyNodes.filter((node) => showCharacters || node.kind !== "character" || node.id === "hero");
  const visibleIds = new Set(visibleNodes.map((node) => node.id));
  const visibleLinks = storyLinks.filter((link) => visibleIds.has(link.source) && visibleIds.has(link.target));
  const bounds = graphBounds(visibleNodes);
  const viewportRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLElement>(null);
  const [view, setView] = useState<Viewport>({ x: 40, y: 25, scale: 0.7 });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<NodeKind | "all">("all");
  const [dragging, setDragging] = useState(false);
  const [ready, setReady] = useState(false);
  const [help, setHelp] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const toolsToggleRef = useRef<HTMLButtonElement>(null);
  const drag = useRef<{ id: number; x: number; y: number; node?: { id: string; x: number; y: number; scale: number }; moved?: boolean } | null>(null);
  const suppressNodeClick = useRef<string | null>(null);
  const [editor, setEditor] = useState<{ node?: StoryNode; x: number; y: number; connectTo?: string } | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [linkEditor, setLinkEditor] = useState<StoryLink | null>(null);
  const openLink = (link: StoryLink) => { setSelectedId(null); setDeleteConfirm(false); setLinkEditor(link); };
  const connection = useConnections({ graphRef, viewportRef, view, update, onSelect: openLink });
  const lastNode = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const selected = storyNodes.find((node) => node.id === selectedId);
  useEffect(() => { detailsRef.current?.scrollTo({ top: 0 }); }, [selectedId]);
  const matches = storyNodes.filter((node) => normalize(`${node.title} ${node.summary}`).includes(normalize(query)));
  const matchingIds = new Set(matches.map((node) => node.id));
  const isActive = (node: StoryNode) => (filter === "all" || filter === node.kind) && matchingIds.has(node.id);

  const fit = useCallback((overview = true) => {
    const rect = viewportRef.current?.getBoundingClientRect();
    if (!rect) return;
    const panel = detailsRef.current?.getBoundingClientRect();
    const bottomPanel = panel && panel.width >= rect.width - 2;
    const width = panel && !bottomPanel ? panel.left - rect.left - 12 : rect.width;
    const height = panel && bottomPanel ? panel.top - rect.top - 12 : rect.height;
    const currentBounds = graphBounds(graphRef.current.nodes.filter((node) => showCharacters || node.kind !== "character" || node.id === "hero"));
    const fitted = fitViewport(width, height, currentBounds.width, currentBounds.height);
    if (!overview && !showCharacters) {
      const scale = Math.min(0.65, Math.max(0.45, (height - 100) / currentBounds.height));
      setView({ scale, x: 30 - currentBounds.x * scale, y: Math.max(60, (height - currentBounds.height * scale) / 2) - currentBounds.y * scale });
    } else setView({ ...fitted, x: fitted.x - currentBounds.x * fitted.scale, y: fitted.y - currentBounds.y * fitted.scale });
  }, [graphRef, showCharacters]);

  useEffect(() => {
    const element = viewportRef.current;
    if (!element) return;
    // Each Arc is small enough to fit as an independent diagram.
    const observer = new ResizeObserver(() => { fit(); setReady(true); });
    observer.observe(element);
    const wheel = (event: WheelEvent) => {
      event.preventDefault();
      if (drag.current || connection.draftRef.current) return;
      const rect = element.getBoundingClientRect();
      setView((previous) => zoomViewport(previous, previous.scale * Math.exp(-event.deltaY * 0.002), { x: event.clientX - rect.x, y: event.clientY - rect.y }));
    };
    element.addEventListener("wheel", wheel, { passive: false });
    return () => { observer.disconnect(); element.removeEventListener("wheel", wheel); };
  }, [fit, connection.draftRef]);

  const zoom = (amount: number | "reset") => {
    if (connection.draftRef.current) return;
    const rect = viewportRef.current?.getBoundingClientRect();
    if (rect) setView((previous) => zoomViewport(previous, amount === "reset" ? 1 : previous.scale + amount, { x: rect.width / 2, y: rect.height / 2 }));
  };

  const select = (id: string, focusNode = false) => {
    setSelectedId(id);
    setDeleteConfirm(false);
    if (focusNode && visibleIds.has(id)) {
      const node = storyNodes.find((item) => item.id === id)!;
      const rect = viewportRef.current?.getBoundingClientRect();
      if (rect) setView((previous) => ({ scale: Math.max(0.65, previous.scale), x: (rect.width - (rect.width > 700 ? 390 : 0)) / 2 - (node.x + getNodeSize(node).width / 2) * Math.max(0.65, previous.scale), y: rect.height / 2 - (node.y + getNodeSize(node).height / 2) * Math.max(0.65, previous.scale) }));
    }
    // Leave pointer navigation undisturbed; keyboard users get a path into the panel.
  };

  const closeDetails = () => { setSelectedId(null); setDeleteConfirm(false); lastNode.current?.focus({ preventScroll: true }); };
  const addNode = () => {
    const rect = viewportRef.current?.getBoundingClientRect();
    if (!rect) return;
    connection.cancel();
    const availableWidth = rect.width > 700 && selected ? rect.width - 390 : rect.width;
    setEditor({ x: (availableWidth / 2 - view.x) / view.scale - nodeSize.width / 2, y: (rect.height / 2 - view.y) / view.scale - nodeSize.height / 2, connectTo: selectedId ?? undefined });
  };
  const saveNode = (draft: NodeDraft, connectTo: string) => {
    if (!editor) return;
    const current = graphRef.current;
    const node: StoryNode = { ...editor.node, ...draft, id: editor.node?.id ?? crypto.randomUUID(), x: editor.x, y: editor.y };
    const nodes = editor.node ? current.nodes.map((item) => item.id === node.id ? node : item) : [...current.nodes, node];
    const links = !editor.node && current.nodes.some((item) => item.id === connectTo) ? [...current.links, { source: connectTo, target: node.id, label: "Liên quan" }] : current.links;
    update({ ...current, nodes, links });
    setEditor(null);
    setQuery("");
    setFilter("all");
    select(node.id);
  };
  const deleteNode = () => {
    if (!selectedId) return;
    update(removeNode(graphRef.current, selectedId));
    setSelectedId(null);
    setDeleteConfirm(false);
    lastNode.current = null;
    viewportRef.current?.focus({ preventScroll: true });
  };
  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (!loaded || event.button !== 0 || drag.current || (event.target as HTMLElement).closest("button,a,input")) return;
    if (connection.draftRef.current) { connection.cancel(); return; }
    event.currentTarget.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
    setDragging(true);
  };
  const startNodeDrag = (event: PointerEvent<HTMLButtonElement>, node: StoryNode) => {
    if (!loaded || event.button !== 0 || drag.current) return;
    event.stopPropagation();
    if (connection.draftRef.current) return;
    suppressNodeClick.current = null;
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY, node: { id: node.id, x: node.x, y: node.y, scale: view.scale } };
  };
  const moveDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (connection.draftRef.current) { connection.move(event); return; }
    const previous = drag.current;
    if (!previous || previous.id !== event.pointerId) return;
    const dx = event.clientX - previous.x;
    const dy = event.clientY - previous.y;
    if (previous.node) {
      if (!previous.moved && Math.hypot(dx, dy) < 4) return;
      previous.moved = true;
      setDragging(true);
      const nodeDrag = previous.node;
      const current = graphRef.current;
      update({ ...current, nodes: current.nodes.map((node) => node.id === nodeDrag.id ? { ...node, x: nodeDrag.x + dx / nodeDrag.scale, y: nodeDrag.y + dy / nodeDrag.scale } : node) }, false);
      return;
    }
    drag.current = { id: event.pointerId, x: event.clientX, y: event.clientY };
    setView((current) => ({ ...current, x: current.x + dx, y: current.y + dy }));
  };
  const stopDrag = (event: PointerEvent<HTMLDivElement>) => {
    const active = drag.current;
    if (!active || event.pointerId !== active.id) return;
    if (active.node && active.moved) {
      suppressNodeClick.current = active.node.id;
      if (event.type === "pointercancel") {
        const current = graphRef.current;
        update({ ...current, nodes: current.nodes.map((node) => node.id === active.node!.id ? { ...node, x: active.node!.x, y: active.node!.y } : node) });
      } else persist();
    }
    drag.current = null;
    setDragging(false);
  };
  const nodeKeys = (event: KeyboardEvent<HTMLButtonElement>, node: StoryNode) => {
    const delta: Record<string, [number, number]> = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    if (!loaded || !delta[event.key]) return;
    event.preventDefault(); event.stopPropagation();
    const [dx, dy] = delta[event.key];
    const step = event.shiftKey ? 50 : 10;
    const current = graphRef.current;
    update({ ...current, nodes: current.nodes.map((item) => item.id === node.id ? { ...item, x: item.x + dx * step, y: item.y + dy * step } : item) });
  };
  const boardKeys = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    const steps: Record<string, [number, number]> = { ArrowLeft: [60, 0], ArrowRight: [-60, 0], ArrowUp: [0, 60], ArrowDown: [0, -60] };
    if (steps[event.key]) {
      event.preventDefault();
      const [x, y] = steps[event.key];
      setView((previous) => ({ ...previous, x: previous.x + x, y: previous.y + y }));
    } else if (["+", "=", "-", "0", "Home"].includes(event.key)) {
      event.preventDefault();
      if (event.key === "Home") fit(); else zoom(event.key === "0" ? "reset" : event.key === "-" ? -0.25 : 0.25);
    }
  };

  return <StoryShell activeView="timeline" activeArcId={arc.id}
    onKeyDown={(event) => { if (event.key === "Escape") { connection.cancel(); closeDetails(); setHelp(false); } }}
    overlays={<>{editor && <NodeEditor node={editor.node} nodes={storyNodes} connectTo={editor.connectTo} onSave={saveNode} onClose={() => setEditor(null)} />}
    {linkEditor && <LinkEditor link={linkEditor} sourceName={storyNodes.find((node) => node.id === linkEditor.source)?.title ?? ""} targetName={storyNodes.find((node) => node.id === linkEditor.target)?.title ?? ""} onClose={() => setLinkEditor(null)} onSave={(label) => { const current = graphRef.current; update({ ...current, links: current.links.map((link) => linkKey(link) === linkKey(linkEditor) ? { ...link, label } : link) }); setLinkEditor(null); }} onDelete={() => { const current = graphRef.current; update({ ...current, links: current.links.filter((link) => linkKey(link) !== linkKey(linkEditor)) }); setLinkEditor(null); }} />}</>}>
      <section className={styles.mainArea} aria-label="Cốt Truyện">
        <header className={arcStyles.heading}>
          <div><span className={arcStyles.eyebrow}>Cốt Truyện · Arc {String(arc.order).padStart(2, "0")}</span><h1>{arc.title}</h1><p>{storyScope} · {storyNodes.filter((node) => node.kind === "event").length} mốc truyện · Sơ đồ riêng của Arc</p></div>
          <div className={arcStyles.controls}>
            {previousArc && <Link href={arcUrl(previousArc)} aria-label={`Arc trước: ${previousArc.title}`} title={previousArc.title}>←</Link>}
            <select aria-label="Chọn Arc" value={arc.id} onChange={(event) => router.push(arcUrl(getStoryArc(event.target.value)))}>{storyArcs.map((item) => <option key={item.id} value={item.id}>{item.order}. {item.title} ({item.from}–{item.to})</option>)}</select>
            {nextArc && <Link href={arcUrl(nextArc)} aria-label={`Arc sau: ${nextArc.title}`} title={nextArc.title}>→</Link>}
          </div>
        </header>
        {!!crossLinks.length && <details className={arcStyles.crossLinks}><summary>Liên hệ với Arc khác · {crossLinks.length}</summary>{crossLinks.map((link) => <Link key={`${link.source}:${link.target}`} href={arcUrl({ id: link.arcId })}>{link.label} → {link.title}</Link>)}</details>}
        {storageError && <p role="alert" className={styles.storageError}>{storageError}</p>}

        <div className={styles.boardArea}>
          <div className={styles.boardTools} onKeyDown={(event) => {
            if (event.key === "Escape") {
              event.stopPropagation();
              setToolsOpen(false);
              setHelp(false);
              toolsToggleRef.current?.focus();
            }
          }}>
            <div id="story-board-tools" className={styles.toolsPanel} hidden={!toolsOpen} role="group" aria-label="Công cụ sơ đồ">
          <button className={styles.addNode} onClick={addNode} disabled={!loaded}><HeroIcon name="plus" size={17} />Thêm node</button>
          <div className={styles.filters} aria-label="Lọc loại mục">{(["all", "event", "character", "world"] as const).map((kind) => <button key={kind} aria-pressed={filter === kind} onClick={() => { setFilter(kind); if (kind === "character") setShowCharacters(true); }} className={filter === kind ? styles.activeFilter : ""}>{kind !== "all" && <HeroIcon name={kindIcon[kind]} size={16} />}{kind === "all" ? "Tất cả" : nodeLabels[kind]}</button>)}</div>
          <div className={styles.searchWrap}><HeroIcon name="search" size={16} /><input type="search" aria-label="Tìm trong Arc" placeholder="Tìm trong Arc…" value={query} onChange={(event) => setQuery(event.target.value)} />{query && <button aria-label="Xóa tìm kiếm" onClick={() => setQuery("")}><HeroIcon name="close" size={14} /></button>}
            {query.trim() && <div className={styles.searchResults}>{matches.length ? matches.map((node) => <button key={node.id} aria-label={`Tìm đến ${node.title}`} onClick={() => { select(node.id, true); setQuery(""); setFilter("all"); }}><HeroIcon name={kindIcon[node.kind]} size={16} /><span>{node.title}<small>{nodeLabels[node.kind]}</small></span><HeroIcon name="arrow" size={14} /></button>) : <p>Không tìm thấy mục phù hợp.</p>}</div>}
          </div>
          <button className={shell.actionButton} aria-pressed={showCharacters} onClick={() => { setShowCharacters(!showCharacters); setFilter("all"); }}>{showCharacters ? "Ẩn node nhân vật" : "Hiện node nhân vật"} · {storyNodes.filter((node) => node.kind === "character").length}</button>
          <div className={shell.actionGroup}><button aria-label="Thu nhỏ" title="Thu nhỏ" onClick={() => zoom(-0.25)}><HeroIcon name="minus" size={18} /></button><button aria-label="Đặt lại 100%" title="Đặt lại 100%" onClick={() => zoom("reset")}><span role="status" aria-label="Tỷ lệ thu phóng">{Math.round(view.scale * 100)}%</span></button><button aria-label="Phóng to" title="Phóng to" onClick={() => zoom(0.25)}><HeroIcon name="plus" size={18} /></button><span className={styles.controlDivider} /><button aria-label="Xem toàn bộ sơ đồ" title="Xem toàn bộ sơ đồ" onClick={() => fit()}><HeroIcon name="fit" size={18} /></button></div><button className={shell.actionButton} aria-label="Hướng dẫn thao tác" aria-expanded={help} onClick={() => setHelp(!help)}><HeroIcon name="help" size={18} /></button>
            </div>
            <button ref={toolsToggleRef} type="button" className={styles.toolsToggle} aria-label={toolsOpen ? "Thu gọn công cụ sơ đồ" : "Mở công cụ sơ đồ"} aria-expanded={toolsOpen} aria-controls="story-board-tools" onClick={() => setToolsOpen((open) => !open)}>
              <span className={toolsOpen ? styles.toolsChevronOpen : styles.toolsChevron}><Icon name="chevron" size={16} /></span>
              Công cụ
            </button>
          </div>

          <div ref={viewportRef} className={`${styles.viewport} ${dragging ? styles.dragging : ""}`} data-testid="story-viewport" data-arc={arc.id} data-ready={ready && loaded} tabIndex={0} role="region" aria-label="Sơ đồ tương tác. Kéo node để sắp xếp, kéo vùng trống để di chuyển, cuộn để thu phóng." onPointerDown={startDrag} onPointerMove={moveDrag} onPointerUp={stopDrag} onPointerCancel={stopDrag} onLostPointerCapture={stopDrag} onKeyDown={boardKeys}>
            <div className={styles.scene} data-testid="story-scene" style={{ width: Math.max(2200, bounds.x + bounds.width), height: Math.max(1200, bounds.y + bounds.height), transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }}>
              {storyNodes.length > 0 && <div className={styles.sceneLabel} style={{ left: bounds.x + 30, top: bounds.y + 12 }}><span /> ARC {arc.order} · {storyScope.toLocaleUpperCase("vi")} <span className={styles.sceneLabelLine} /></div>}
              <StoryConnections nodes={visibleNodes} links={visibleLinks} isActive={isActive} draft={connection.draft} scale={view.scale} onSelect={openLink} />
              {visibleNodes.map((node) => <button key={node.id} data-testid={`story-node-${node.id}`} data-story-node={node.id} aria-label={`${node.title} — ${nodeLabels[node.kind]}`} aria-pressed={selectedId === node.id} className={`${styles.node} ${styles[node.kind]} ${node.kind === "event" && node.realm === "reality" ? styles.realityLane : ""} ${selectedId === node.id ? styles.selectedNode : ""} ${connection.draft?.target === node.id ? styles.connectionTarget : ""} ${isActive(node) ? "" : styles.dimmed}`} style={{ left: node.x, top: node.y, ...getNodeSize(node) }} onPointerDown={(event) => startNodeDrag(event, node)} onKeyDown={(event) => nodeKeys(event, node)} onClick={(event) => { if (connection.selectTarget(node.id)) return; if (suppressNodeClick.current === node.id && event.detail !== 0) { suppressNodeClick.current = null; return; } lastNode.current = event.currentTarget; select(node.id); if (event.detail === 0) requestAnimationFrame(() => closeRef.current?.focus()); }}>
                <span className={styles.nodeEyebrow}><Icon name={kindIcon[node.kind]} size={15} /><span className={styles.nodeEyebrowText}>{node.eyebrow}</span><span className={styles.nodeArrow}><Icon name="arrow" size={16} /></span></span>{node.kind === "character" && node.portrait && <Image className={styles.nodePortrait} src={node.portrait} width={80} height={80} unoptimized alt={`Ảnh ${node.title}`} />}<strong>{node.title}</strong><span className={styles.nodeSummary}>{node.summary}</span><span className={styles.nodeKind}><span className={styles.dot} />{nodeLabels[node.kind]}{node.kind === "event" && ` · ${storyLinks.filter((link) => link.introduction && link.source === node.id).length} nhân vật mới`}</span>
              </button>)}
              {visibleNodes.map((node) => <button key={`handle-${node.id}`} data-testid={`connect-handle-${node.id}`} data-story-node={node.id} className={`${styles.connectionHandle} ${isActive(node) ? "" : styles.dimmed}`} style={{ left: node.x + getNodeSize(node).width, top: node.y + getNodeSize(node).height / 2, transform: `translate(-50%, -50%) scale(${1 / view.scale})` }} aria-label={`Nối từ ${node.title}`} title="Kéo sang node khác để nối" disabled={!loaded} onPointerDown={(event) => { if (drag.current) return; setSelectedId(null); connection.pointerDown(event, node); }} onPointerMove={(event) => { event.stopPropagation(); connection.move(event); }} onPointerUp={connection.pointerUp} onPointerCancel={(event) => { event.stopPropagation(); connection.cancel(); }} onLostPointerCapture={() => { if (connection.draftRef.current?.pointerId !== null) connection.cancel(); }} onClick={(event) => { event.stopPropagation(); if (event.detail === 0) { setSelectedId(null); connection.begin(node); } }}><span /></button>)}
              {storyNodes.length > 0 && <div className={styles.endNote} style={{ left: bounds.x + bounds.width - nodeSize.width - 30, top: bounds.y + bounds.height - 20 }}>{nextArc ? `Tiếp tục ở Arc ${nextArc.order}` : "Đã tới phần mới nhất"} <span>→</span></div>}
            </div>
          </div>

          {storyNodes.length === 0 && <div className={styles.emptyBoard}><Icon name="map" size={32} /><h2>Bắt đầu sơ đồ của bạn</h2><p>Thêm node đầu tiên để ghi lại câu chuyện.</p><button className={styles.primaryButton} onClick={addNode}>Tạo node đầu tiên</button></div>}

          {connection.draft && <div className={styles.connectionPrompt} role="status"><span>Chọn hoặc kéo đến node đích</span><button onClick={connection.cancel}>Hủy nối</button></div>}

          <div className={styles.boardBottom}><div className={styles.boardHint}><Icon name="hand" size={15} />Kéo để di chuyển <span>·</span> Cuộn để thu phóng</div></div>
          {help && <div className={styles.helpPanel}><strong>Khám phá sơ đồ</strong><p>Kéo chấm tròn ở cạnh node đến node khác để nối. Bấm tên hoặc đường nối để sửa tên, xóa. Kéo từng node để sắp xếp. Kéo vùng trống để di chuyển bảng. Cuộn chuột hoặc dùng nút + / − để thu phóng.</p><p>Chọn vùng sơ đồ rồi dùng phím mũi tên để di chuyển, phím 0 về 100%, Home để xem toàn bộ. Chọn một thẻ để đọc, sửa hoặc xóa. Khi thẻ được chọn bằng bàn phím, dùng mũi tên để dịch chuyển node; giữ Shift để di chuyển nhanh. Esc để đóng.</p></div>}

          {selected && <aside ref={detailsRef} className={styles.details} aria-label="Chi tiết wiki">
            <div className={styles.detailsTop}>
              <span className={`${styles.detailType} ${styles[selected.kind]}`}><Icon name={kindIcon[selected.kind]} size={18} />{nodeLabels[selected.kind]}</span>
              <button ref={closeRef} aria-label="Đóng chi tiết" onClick={closeDetails}><Icon name="close" /></button>
            </div>
            <div className={styles.nodeActions}>
              <button className={`${styles.secondaryButton} ${styles.iconAction}`} aria-label="Sửa node" title="Sửa node" onClick={() => { setDeleteConfirm(false); setEditor({ node: selected, x: selected.x, y: selected.y }); }}><Icon name="edit" /></button>
              <button className={`${styles.deleteButton} ${styles.iconAction}`} aria-label="Xóa node" title="Xóa node" onClick={() => setDeleteConfirm(true)}><Icon name="trash" /></button>
            </div>
            {selected.kind === "character" && <div className={styles.characterPortrait}>
              {selected.portrait ? <Image src={selected.portrait} width={512} height={512} unoptimized alt={`Ảnh ${selected.title}`} /> : <div className={styles.portraitPlaceholder}><Icon name="person" size={36} /><span>Chưa có ảnh nhân vật</span></div>}
              <button className={styles.secondaryButton} onClick={() => setEditor({ node: selected, x: selected.x, y: selected.y })}>{selected.portrait ? "Đổi ảnh nhân vật" : "Thêm ảnh nhân vật"}</button>
            </div>}
            {deleteConfirm && <div className={styles.deleteConfirm} role="group" aria-label="Xác nhận xóa node"><p>Xóa “{selected.title}” và các đường nối của node này?</p><div><button className={styles.secondaryButton} onClick={() => setDeleteConfirm(false)}>Hủy xóa</button><button className={styles.deleteButton} onClick={deleteNode}>Xác nhận xóa</button></div></div>}
            <span className={styles.smallCaps}>{selected.eyebrow}</span><h2>{selected.title}</h2><div className={styles.detailRule} /><span className={styles.smallCaps}>NỘI DUNG</span><p className={styles.detailSummary}>{selected.summary || "Chưa có nội dung."}</p>
            {selected.kind === "event" && selected.chapters && <div className={styles.chapterNarrative}>
              {chapterNotes.filter((note) => selected.chapters!.includes(note.chapter)).map((note) => <section key={note.chapter}><h3>Chương {note.chapter}: {note.title}</h3><p>{note.summary}</p></section>)}
            </div>}
            {selected.kind === "event" && <div className={styles.introducedCharacters}>
              <h3>Nhân vật liên quan</h3>
              {storyLinks.filter((link) => link.introduction && link.source === selected.id).map((link) => {
                const character = storyNodes.find((node) => node.id === link.target)!;
                return <button key={character.id} onClick={() => select(character.id, showCharacters)}>{character.portrait ? <Image src={character.portrait} width={36} height={36} unoptimized alt="" /> : <Icon name="person" size={23} />}<span>{character.title}<small>{character.eyebrow}</small></span><Icon name="chevron" size={14} /></button>;
              })}
              {!storyLinks.some((link) => link.introduction && link.source === selected.id) && <p>Tiếp tục hành trình của các nhân vật đã xuất hiện.</p>}
            </div>}
            {selected.kind === "character" && storyLinks.filter((link) => link.introduction && link.target === selected.id).map((link) => <button key={link.source} className={styles.secondaryButton} onClick={() => select(link.source, true)}>Về mốc giới thiệu</button>)}
            {selected.source && <a className={styles.sourceLink} href={selected.source.url} target="_blank" rel="noreferrer">{selected.source.title}<Icon name="external" size={14} /></a>}
          </aside>}
        </div>
        <footer className={styles.footer}><span><span className={styles.footerDot} /> Arc {arc.order}/{storyArcs.length} · {storyScope}</span><span>Có tiết lộ nội dung <span className={styles.footerSeparator}>·</span> Chọn một nút để khám phá</span></footer>
      </section>
  </StoryShell>;
}
