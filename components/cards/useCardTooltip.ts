"use client";

import { useCallback, useEffect, useId, useRef, useState, useSyncExternalStore } from "react";

// Only one card owns the tooltip, even when keyboard focus and hover differ.
let activeId: string | null = null;
let tabNavigation = false;
const listeners = new Set<() => void>();

function activate(id: string | null) {
  if (activeId === id) return;
  activeId = id;
  listeners.forEach(listener => listener());
}
function onKeyDown(event: KeyboardEvent) {
  tabNavigation = event.key === "Tab";
  if (event.key === "Escape") activate(null);
}
function onPointerDown() {
  tabNavigation = false;
  activate(null);
}
function onWindowBlur() { tabNavigation = false; activate(null); }
function subscribe(listener: () => void) {
  if (!listeners.size) {
    document.addEventListener("keydown", onKeyDown, true);
    document.addEventListener("pointerdown", onPointerDown, true);
    window.addEventListener("blur", onWindowBlur);
  }
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (!listeners.size) {
      document.removeEventListener("keydown", onKeyDown, true);
      document.removeEventListener("pointerdown", onPointerDown, true);
      window.removeEventListener("blur", onWindowBlur);
      queueMicrotask(() => {
        if (!listeners.size) { activeId = null; tabNavigation = false; }
      });
    }
  };
}

export function useCardTooltip() {
  const id = useId();
  const active = useSyncExternalStore(subscribe, () => activeId, () => null);
  const [mounted, setMounted] = useState(false);
  const attached = useRef(false);
  const hide = useCallback(() => { if (activeId === id) activate(null); }, [id]);
  const show = () => {
    setMounted(true);
    activate(id);
  };
  useEffect(() => {
    attached.current = true;
    return () => {
      attached.current = false;
      // Strict Mode replays effects on mount; only a real unmount releases ownership.
      queueMicrotask(() => { if (!attached.current) hide(); });
    };
  }, [hide]);
  return { id, open: active === id, mounted, replaced: active !== null && active !== id, show, hide,
    onFocus: () => { if (tabNavigation) show(); } };
}
