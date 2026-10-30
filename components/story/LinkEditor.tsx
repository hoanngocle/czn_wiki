"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { StoryLink } from "../../lib/story/timeline";
import styles from "./story-timeline.module.css";

export function LinkEditor({ link, sourceName, targetName, onSave, onDelete, onClose }: {
  link: StoryLink; sourceName: string; targetName: string;
  onSave: (label: string) => void; onDelete: () => void; onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => { const dialog = ref.current!; dialog.showModal(); return () => dialog.close(); }, []);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const label = String(new FormData(event.currentTarget).get("label") ?? "").trim();
    if (!label) { setError("Vui lòng nhập tên đường nối."); return; }
    onSave(label);
  };
  return <dialog ref={ref} className={`${styles.editorDialog} ${styles.linkDialog}`} aria-labelledby="link-editor-title" onKeyDown={(event) => { if (event.key === "Escape") event.stopPropagation(); }} onCancel={(event) => { event.preventDefault(); onClose(); }}>
    <form onSubmit={submit}>
      <div className={styles.editorHeading}><div><span className={styles.smallCaps}>LIÊN KẾT GIỮA CÁC NODE</span><h2 id="link-editor-title">Đường nối</h2></div><button type="button" aria-label="Đóng trình sửa đường nối" onClick={onClose}>×</button></div>
      <div className={styles.editorFields}><p className={styles.linkEndpoints}>{sourceName}<span>→</span>{targetName}</p><label>Tên đường nối<input name="label" defaultValue={link.label} autoFocus required maxLength={120} /></label>{error && <p role="alert" className={styles.formError}>{error}</p>}
        {confirmDelete ? <div className={styles.deleteConfirm}><p>Xóa đường nối này? Hai node vẫn được giữ lại.</p><div><button type="button" className={styles.secondaryButton} onClick={() => setConfirmDelete(false)}>Hủy xóa</button><button type="button" className={styles.deleteButton} onClick={onDelete}>Xác nhận xóa</button></div></div> : <button type="button" className={styles.deleteButton} onClick={() => setConfirmDelete(true)}>Xóa đường nối</button>}
      </div><div className={styles.editorFooter}><button type="button" className={styles.secondaryButton} onClick={onClose}>Đóng</button><button type="submit" className={styles.primaryButton}>Lưu tên</button></div>
    </form>
  </dialog>;
}
