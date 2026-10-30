"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { isSourceUrl } from "../../lib/story/graph";
import { readCharacterPortrait } from "../../lib/story/portraits";
import { nodeLabels, type NodeKind, type StoryNode } from "../../lib/story/timeline";
import styles from "./story-timeline.module.css";

export type NodeDraft = Pick<StoryNode, "title" | "kind" | "eyebrow" | "summary" | "source" | "portrait">;

export function NodeEditor({ node, nodes, connectTo, onSave, onClose }: {
  node?: StoryNode;
  nodes: StoryNode[];
  connectTo?: string;
  onSave: (draft: NodeDraft, connectTo: string) => void;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [error, setError] = useState("");
  const [kind, setKind] = useState<NodeKind>(node?.kind ?? "event");
  const [portrait, setPortrait] = useState(node?.portrait);
  const [imageBusy, setImageBusy] = useState(false);
  const imageRequest = useRef(0);
  useEffect(() => {
    const dialog = dialogRef.current!;
    dialog.showModal();
    // This mutable counter invalidates asynchronous file reads on unmount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => { imageRequest.current++; dialog.close(); };
  }, []);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (imageBusy) return;
    const data = new FormData(event.currentTarget);
    const title = String(data.get("title") ?? "").trim();
    const url = String(data.get("sourceUrl") ?? "").trim();
    if (!title) { setError("Vui lòng nhập tiêu đề cho node."); return; }
    if (url && !isSourceUrl(url)) { setError("Đường dẫn nguồn phải bắt đầu bằng http:// hoặc https://."); return; }
    onSave({ title, kind, portrait: kind === "character" ? portrait : undefined, eyebrow: String(data.get("eyebrow") ?? "").trim(), summary: String(data.get("summary") ?? "").trim(), source: url ? { title: String(data.get("sourceTitle") ?? "").trim() || "Nguồn tham khảo", url } : undefined }, String(data.get("connectTo") ?? ""));
  };

  return <dialog ref={dialogRef} className={styles.editorDialog} aria-labelledby="node-editor-title" onKeyDown={(event) => { if (event.key === "Escape") event.stopPropagation(); }} onCancel={(event) => { event.preventDefault(); onClose(); }}>
    <form onSubmit={submit}>
      <div className={styles.editorHeading}><div><span className={styles.smallCaps}>WIKI CỦA BẠN</span><h2 id="node-editor-title">{node ? "Sửa node" : "Thêm node"}</h2></div><button type="button" aria-label="Đóng trình sửa" onClick={onClose}>×</button></div>
      <div className={styles.editorFields}>
        <label>Tiêu đề<input autoFocus name="title" defaultValue={node?.title} maxLength={160} required placeholder="Tên sự kiện, nhân vật hoặc thế giới" /></label>
        <div className={styles.editorRow}><label>Loại node<select name="kind" value={kind} onChange={(event) => setKind(event.target.value as NodeKind)}>{Object.entries(nodeLabels).map(([kind, label]) => <option value={kind} key={kind}>{label}</option>)}</select></label><label>Nhãn phụ<input name="eyebrow" defaultValue={node?.eyebrow} maxLength={100} placeholder="Ví dụ: Chương 12" /></label></div>
        {kind === "character" && <div className={styles.portraitEditor}>
          <strong>Ảnh nhân vật</strong>
          {portrait ? <Image src={portrait} width={140} height={140} unoptimized alt="Ảnh nhân vật xem trước" /> : <p>Chưa có ảnh. Bạn có thể thêm ảnh từ máy.</p>}
          <label>Chọn ảnh nhân vật<input type="file" accept="image/png,image/jpeg,image/webp" onChange={async (event) => {
            const file = event.currentTarget.files?.[0]; event.currentTarget.value = "";
            if (!file) return;
            const request = ++imageRequest.current; setImageBusy(true); setError("");
            try { const data = await readCharacterPortrait(file); if (request === imageRequest.current) setPortrait(data); }
            catch (cause) { if (request === imageRequest.current) setError(cause instanceof Error ? cause.message : "Không đọc được ảnh."); }
            finally { if (request === imageRequest.current) setImageBusy(false); }
          }} /></label>
          <small>PNG, JPEG hoặc WebP · tối đa 8 MB. Ảnh được thu nhỏ và lưu trong trình duyệt này.</small>
          {imageBusy && <p role="status">Đang xử lý ảnh…</p>}
          {portrait && <button type="button" className={styles.secondaryButton} onClick={() => { imageRequest.current++; setImageBusy(false); setPortrait(undefined); setError(""); }}>Xóa ảnh</button>}
        </div>}
        <label>Nội dung<textarea name="summary" defaultValue={node?.summary} maxLength={10000} rows={4} placeholder="Ghi lại diễn biến, thông tin hoặc ghi chú…" /></label>
        {!node && <label>Kết nối với<select name="connectTo" defaultValue={connectTo ?? ""}><option value="">Không có kết nối</option>{nodes.map((item) => <option key={item.id} value={item.id}>{item.title}</option>)}</select></label>}
        <div className={styles.editorRow}><label>Tên nguồn<input name="sourceTitle" defaultValue={node?.source?.title} maxLength={200} placeholder="Không bắt buộc" /></label><label>Đường dẫn nguồn<input name="sourceUrl" defaultValue={node?.source?.url} maxLength={2048} placeholder="https://…" inputMode="url" /></label></div>
        {error && <p role="alert" className={styles.formError}>{error}</p>}
      </div>
      <div className={styles.editorFooter}><span>Lưu trong trình duyệt này</span><button type="button" className={styles.secondaryButton} onClick={onClose}>Hủy</button><button className={styles.primaryButton} type="submit" disabled={imageBusy}>{node ? "Lưu thay đổi" : "Tạo node"}</button></div>
    </form>
  </dialog>;
}
