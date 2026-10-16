"use client";
import { useId, useState, type KeyboardEvent, type ReactNode } from "react";
import styles from "./RenoaBuildGuide.module.css";
export function VerticalTabs({ labels, best, label, children, vietnamese = false }: { labels: string[]; best: number; label: string; children: ReactNode[]; vietnamese?: boolean }) {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const handleKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = event.key === "Home" ? 0 : event.key === "End" ? labels.length - 1 : event.key === "ArrowDown" || event.key === "ArrowRight" ? (index + 1) % labels.length : event.key === "ArrowUp" || event.key === "ArrowLeft" ? (index + labels.length - 1) % labels.length : null;
    if (next === null) return;
    event.preventDefault(); setSelected(next); document.getElementById(`${id}-tab-${next}`)?.focus();
  };
  return <div className={styles.verticalTabs}><div className={styles.tabList} role="tablist" aria-orientation="vertical" aria-label={label}>
    {labels.map((name, i) => <button key={name} type="button" role="tab" id={`${id}-tab-${i}`} aria-controls={`${id}-panel-${i}`} aria-selected={selected === i} tabIndex={selected === i ? 0 : -1} onClick={() => setSelected(i)} onKeyDown={event => handleKey(event, i)}>
      {i === best && <small>{vietnamese ? "TỐT NHẤT" : "BEST"}</small>}<span>{name}</span>
    </button>)}
  </div>{children.map((child, i) => <div key={labels[i]} className={styles.tabPanel} role="tabpanel" id={`${id}-panel-${i}`} aria-labelledby={`${id}-tab-${i}`} hidden={selected !== i} tabIndex={0}>{child}</div>)}</div>;
}

