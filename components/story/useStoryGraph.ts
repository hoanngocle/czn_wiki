"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createInitialGraph, parseGraph, readStoredGraph, STORY_STORAGE_KEY, type StoryGraph } from "../../lib/story/graph";
import { createArcGraph, readArcGraph, saveArcGraph, type CrossArcLink } from "../../lib/story/arc-graph";
import type { StoryArc } from "../../lib/story/arcs";

export function useStoryGraph(arc?: StoryArc) {
  const [graph, setGraph] = useState(() => arc ? createArcGraph(createInitialGraph(), arc) : createInitialGraph());
  const graphRef = useRef(graph);
  const seedRef = useRef(graph);
  const writable = useRef(true);
  const [crossLinks, setCrossLinks] = useState<CrossArcLink[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [saveState, setSaveState] = useState<"ready" | "saved" | "pending" | "error">("ready");
  const [storageError, setStorageError] = useState("");

  useEffect(() => {
    try {
      if (arc) {
        const saved = readArcGraph(localStorage, arc);
        seedRef.current = saved.seed;
        graphRef.current = saved.graph;
        // Hydrate the browser-only Arc save once after the server render.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setGraph(saved.graph);
        setCrossLinks(saved.crossLinks);
        setSaveState("saved");
        setLoaded(true);
        return;
      }
      const raw = readStoredGraph(localStorage);
      if (raw !== null) {
        const saved = parseGraph(raw);
        // Browser storage is unavailable during SSR; hydrate once after mounting.
        if (saved) { graphRef.current = saved; setGraph(saved); setSaveState("saved"); }
        else setStorageError("Không đọc được sơ đồ đã lưu. Đang hiển thị bản ban đầu; dữ liệu cũ chỉ được thay thế khi bạn chỉnh sửa.");
      }
    } catch (cause) { if (arc) writable.current = false; setStorageError(cause instanceof Error && cause.message.startsWith("Không đọc được") ? cause.message : "Không thể đọc hoặc ghi dữ liệu trình duyệt. Thay đổi chỉ được giữ trong phiên đang mở."); setSaveState("error"); }
    setLoaded(true);
  }, [arc]);

  const persist = useCallback(() => {
    if (!writable.current) return;
    try {
      if (arc) saveArcGraph(localStorage, arc, graphRef.current, seedRef.current);
      else localStorage.setItem(STORY_STORAGE_KEY, JSON.stringify(graphRef.current));
      setSaveState("saved");
      setStorageError("");
    } catch {
      setSaveState("error");
      setStorageError("Không thể lưu thay đổi trong trình duyệt. Hãy giữ trang này mở để tránh mất nội dung vừa sửa.");
    }
  }, [arc]);

  const update = useCallback((next: StoryGraph, save = true) => {
    graphRef.current = next;
    setGraph(next);
    if (save) persist(); else setSaveState("pending");
  }, [persist]);

  return { graph, graphRef, loaded, update, persist, saveState, storageError, crossLinks };
}
