"use client";

import { useEffect, useRef } from "react";
import styles from "./DeckBuilder.module.css";

export function BuilderDialog({ title, children, onClose, wide = false, notice }: { title: string; children: React.ReactNode; onClose: () => void; wide?: boolean; notice?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    dialog?.showModal();
    return () => { dialog?.close(); previous?.focus(); };
  }, []);
  return <dialog ref={ref} className={`${styles.dialog} ${wide ? styles.wide : ""}`} aria-label={title} onCancel={event => { event.preventDefault(); onClose(); }} onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className={styles.dialogInner}>
      <header className={styles.dialogHeader}><h2>{title}</h2><button type="button" onClick={onClose} aria-label="Close dialog">×</button></header>
      {notice && <div className={styles.notice} role="status">{notice}</div>}
      {children}
    </div>
  </dialog>;
}
