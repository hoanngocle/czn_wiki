"use client";

import { useId, useRef, useState } from "react";
import { Cog6ToothIcon, MoonIcon, SunIcon, XMarkIcon } from "@heroicons/react/24/outline";
import styles from "./reader-settings.module.css";

type Props = {
  font: number;
  theme: "light" | "dark";
  onAction: (action: "font-up" | "font-down" | "theme") => void;
};

export function ReaderSettings({ font, theme, onAction }: Props) {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const title = useId();
  const [open, setOpen] = useState(false);
  return <>
    <button ref={trigger} type="button" className={styles.trigger} aria-label="Cài đặt đọc truyện" title="Cài đặt đọc truyện" aria-haspopup="dialog" aria-expanded={open} onClick={() => { dialog.current?.showModal(); setOpen(true); }}><Cog6ToothIcon width={22} aria-hidden="true" /></button>
    <dialog ref={dialog} className={styles.modal} aria-labelledby={title} onClose={() => { setOpen(false); trigger.current?.focus({ preventScroll: true }); }} onKeyDown={(event) => event.stopPropagation()} onClick={(event) => {
      if (event.target !== event.currentTarget) return;
      const box = event.currentTarget.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) event.currentTarget.close();
    }}>
      <div className={styles.heading}><h2 id={title}>Cài đặt đọc truyện</h2><button type="button" aria-label="Đóng cài đặt" onClick={() => dialog.current?.close()} autoFocus><XMarkIcon width={22} aria-hidden="true" /></button></div>
      <div className={styles.row}><span>Cỡ chữ</span><div className={styles.fontControls}>
        <button type="button" aria-label="Giảm cỡ chữ" disabled={font <= 16} onClick={() => onAction("font-down")}>A−</button>
        <output aria-label="Cỡ chữ hiện tại" aria-live="polite">{font}</output>
        <button type="button" aria-label="Tăng cỡ chữ" disabled={font >= 30} onClick={() => onAction("font-up")}>A+</button>
      </div></div>
      <div className={styles.row}><span>Nền đọc</span><button type="button" className={styles.themeButton} aria-label="Đổi nền sáng tối" aria-pressed={theme === "dark"} onClick={() => onAction("theme")}>{theme === "dark" ? <MoonIcon width={18} aria-hidden="true" /> : <SunIcon width={18} aria-hidden="true" />}{theme === "dark" ? "Nền tối" : "Nền sáng"}</button></div>
    </dialog>
  </>;
}
