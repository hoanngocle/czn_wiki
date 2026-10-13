"use client";

import { useEffect, useId, useRef, type ReactNode } from "react";
import styles from "./Dialog.module.css";

let openDialogs = 0;
let originalOverflow = "";

export function Dialog({ title, onClose, children, immersive = false }: { title: string; onClose: () => void; children: ReactNode; immersive?: boolean }) {
  const titleId = useId();
  const panel = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  useEffect(() => { onCloseRef.current = onClose; }, [onClose]);

  useEffect(() => {
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    if (openDialogs++ === 0) {
      originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    closeRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); onCloseRef.current(); return; }
      if (event.key !== "Tab" || !panel.current) return;
      const focusable = [...panel.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])')];
      if (!focusable.length) return;
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      if (--openDialogs === 0) document.body.style.overflow = originalOverflow;
      previous?.focus();
    };
  }, []);

  return <div className={`${styles.backdrop} ${immersive ? styles.immersiveBackdrop : ""}`} onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div ref={panel} className={`${styles.panel} ${immersive ? styles.immersivePanel : ""}`} role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <div className={`${styles.header} ${immersive ? styles.immersiveHeader : ""}`}><h2 id={titleId}>{title}</h2><button ref={closeRef} type="button" aria-label="Close dialog" onClick={onClose}>×</button></div>
      {children}
    </div>
  </div>;
}
