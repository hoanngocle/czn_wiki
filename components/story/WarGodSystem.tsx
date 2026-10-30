"use client";
import { useEffect, useId, useRef, useState } from "react";
import { LockClosedIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { getWarGodSystem, type WarGodSystemState } from "../../lib/story/war-god-system";
import { MAX_PROFILE_CHAPTER } from "../../lib/story/war-god";
import { SystemGlyph } from "./WarGodGlyphs";
import { InspectionScene, WheelScene } from "./WarGodScenes";
import { WarGodMissions } from "./WarGodMissions";
import styles from "./war-god-system.module.css";

type View = "technique" | "wheel" | "missions" | "system";
type SourceMode = "stage" | "status" | null;
type Source = { chapter: number; note: string };
export function WarGodSystemIcon() {
  return <svg width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><circle cx="16" cy="16" r="13" opacity=".45" /><circle cx="16" cy="16" r="9" /><circle cx="16" cy="16" r="4" fill="currentColor" fillOpacity=".15" /><path d="M16 1v4m0 22v4M1 16h4m22 0h4" /></svg>;
}
function SystemScreen({ system, actualChapter, heading, onClose }: { system: WarGodSystemState; actualChapter: number; heading: string; onClose: () => void }) {
  const [view, setView] = useState<View>("missions");
  const [weaponId, setWeaponId] = useState(system.weapons[0]?.id ?? "bow");
  const [materialIndex, setMaterialIndex] = useState(0);
  const [sourceMode, setSourceMode] = useState<SourceMode>(null);
  const stage = useRef<HTMLDivElement>(null);
  const sourceOpener = useRef<HTMLElement | null>(null);
  const sourceClose = useRef<HTMLButtonElement>(null);
  const weapon = system.weapons.find((item) => item.id === weaponId) ?? system.weapons[0];
  const changeView = (next: View) => { setView(next); setSourceMode(null); stage.current?.scrollTo({ top: 0 }); };
  const showSource = (mode: SourceMode) => { sourceOpener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null; setSourceMode(mode); stage.current?.scrollTo({ top: 0 }); };
  const closeSource = () => { setSourceMode(null); requestAnimationFrame(() => sourceOpener.current?.focus({ preventScroll: true })); };
  useEffect(() => { if (sourceMode) sourceClose.current?.focus({ preventScroll: true }); }, [sourceMode]);
  let sources: Source[];
  if (sourceMode === "status") sources = [{ chapter: system.realm.chapter, note: `Cảnh giới: ${system.realm.value}.` }, system.soul, ...(system.experience ? [system.experience] : []), ...(system.hourglass ? [system.hourglass] : [])];
  else if (view === "technique" && weapon) sources = [{ chapter: weapon.chapter, note: weapon.description }, ...weapon.techniques.filter((item) => item.learnedChapter && item.learnedChapter !== weapon.chapter).map((item) => ({ chapter: item.learnedChapter!, note: `${item.name}: ghi nhận lĩnh ngộ.` })), ...(system.chapter >= 16 && weapon.id === "bow" ? [{ chapter: 16, note: "Loạn Vũ thay thế Yến Song Phi trên giao diện." }] : [])];
  else if (view === "wheel") sources = [{ chapter: 81, note: "Bàn quay tròn với năm hốc, đồ án và thời hạn 48 giờ trong truyện." }, ...(system.materials[materialIndex]?.name ? [{ chapter: system.materials[materialIndex].chapter, note: `${system.materials[materialIndex].name}: thời điểm thu thập.` }] : []), ...(system.chapter >= 95 ? [{ chapter: 95, note: "Khảm mảnh tim vào hốc cuối; năm hốc trở thành điểm sáng." }] : [])];
  else sources = [{ chapter: Math.min(system.chapter, 3), note: system.chapter < 3 ? "Hệ thống chưa thức tỉnh tại mốc đang đọc." : "Hệ thống thức tỉnh, hàng nút tối và chức năng Kỹ nghệ đầu tiên." }];
  return <>
    <header className={styles.header}>
      <WarGodSystemIcon /><h2 id={heading}>Chiến Thần</h2>
      <nav className={styles.menu} aria-label="Menu Chiến Thần">
        <button type="button" aria-label="Danh sách nhiệm vụ" aria-pressed={(view === "missions") && !sourceMode} onClick={() => changeView("missions")}>Nhiệm vụ</button>
        {system.chapter >= 301 && <button type="button" aria-pressed={view === "system" && !sourceMode} onClick={() => changeView("system")}>Chức năng đã mở</button>}
        {system.chapter >= 81 && <button type="button" aria-label="Xem vòng quay Thần thông Chiến Thần" aria-pressed={view === "wheel" && !sourceMode} onClick={() => changeView("wheel")}>Vòng quay năm chủng</button>}
      </nav>
      <button type="button" className={styles.close} aria-label="Đóng hệ thống Chiến Thần" onClick={onClose} autoFocus><XMarkIcon width={22} /></button>
    </header>
    <div className={styles.screen}>
    <div className={styles.statusBar}><button type="button" className={styles.identity} onClick={() => showSource("status")}><span className={styles.personSeal}>山</span><span><small>CỐ THANH SƠN</small><strong>{system.realm.value}</strong></span></button><button type="button" className={styles.stat} data-testid="system-soul" onClick={() => showSource("status")}><small>HỒN LỰC</small><strong>{system.soul.value}</strong></button>{system.experience && <button type="button" className={`${styles.stat} ${styles.exp}`} onClick={() => showSource("status")}><small>KINH NGHIỆM</small><strong>{system.experience.value}</strong></button>}{system.hourglass && system.hourglass.value !== "Chưa xác định" && <button type="button" className={styles.hourglass} onClick={() => showSource("status")}><SystemGlyph name="hourglass" /><span><small>ĐỒNG HỒ CÁT</small><strong>{system.hourglass.value}</strong></span></button>}</div>
    <div ref={stage} className={styles.stage} data-testid="system-stage">{sourceMode ? <section className={styles.sources} aria-label="Nguồn đang xem"><div className={styles.sourceHeading}><h3>Đối chiếu truyện</h3><button ref={sourceClose} type="button" aria-label="Đóng ghi chú nguồn" onClick={closeSource}><XMarkIcon width={22} /></button></div>{sources.map((source, index) => <article key={`${source.chapter}-${index}`}><a href={`/chu-gioi-tan-the-online/html/chuong-${String(source.chapter).padStart(4, "0")}.html`} target="_blank" rel="noreferrer">Chương {source.chapter}</a><p>{source.note}</p></article>)}{actualChapter > MAX_PROFILE_CHAPTER && <p>Dữ liệu hệ thống hiện đến chương {MAX_PROFILE_CHAPTER}.</p>}</section> : <div key={view} className={styles.scene}>
      {view === "technique" && !weapon && <section className={styles.sleeping}><span className={styles.darkOrb} aria-hidden="true" /><h3>Chưa thức tỉnh</h3></section>}
      {view === "technique" && weapon && <><InspectionScene weapon={weapon} weapons={system.weapons} onSelect={setWeaponId} />{system.chapter >= 101 && <section className={styles.techniques} aria-label="Kỹ năng đã ghi nhận"><h3>Kỹ năng</h3>{system.modules.find((item) => item.id === "technique")?.status === "Đông lạnh" && <p>Tu vi đang trong thời kỳ đông lạnh. Thêm hồn lực để rút ngắn thời gian.</p>}{system.skills.filter((item) => item.chapter >= 101).map((item) => <article key={item.id}><h4>{item.name}</h4><p>{item.description}</p><a href={`/chu-gioi-tan-the-online/html/chuong-${String(item.chapter).padStart(4, "0")}.html`}>Chương {item.chapter} ↗</a></article>)}</section>}</>}
      {view === "wheel" && <WheelScene system={system} selectedIndex={materialIndex} onSelect={setMaterialIndex} />}
      {view === "missions" && <WarGodMissions chapter={system.chapter} actualChapter={actualChapter} />}
      {view === "system" && <section className={styles.techniques} aria-label="Chức năng đã mở theo chương"><h3>Chức năng đã mở</h3>{system.modules.map((module) => <article key={module.id}><h4>{module.name}</h4><p className={styles.techniqueState}>{module.status}</p><p>{module.description}</p><a href={`/chu-gioi-tan-the-online/html/chuong-${String(module.chapter).padStart(4, "0")}.html`}>Chương {module.chapter} ↗</a></article>)}<h3>Danh hiệu đã ghi nhận</h3>{system.titles.map((title) => <article key={title.id}><h4>{title.name} · {title.skill}</h4><p>{title.description}</p><a href={`/chu-gioi-tan-the-online/html/chuong-${String(title.chapter).padStart(4, "0")}.html`}>Chương {title.chapter} ↗</a></article>)}</section>}
    </div>}</div>
    <nav className={styles.dock} aria-label="Chức năng hệ thống Chiến Thần">
      <button type="button" aria-label="Kỹ nghệ Chiến Thần" aria-pressed={view === "technique" && !sourceMode} onClick={() => changeView("technique")}>
        <span className={styles.orb}><SystemGlyph name="technique" /></span><span>Kỹ nghệ Chiến Thần</span>
      </button>
      {["snakes", "titles", "hourglass", "cosmic", "abyss"].map((glyph, index) => <button type="button" key={glyph} className={styles.lockedSlot} disabled aria-label={`Chức năng chưa mở khóa ${index + 1}`}>
        <span className={`${styles.orb} ${styles.lockedOrb}`} aria-hidden="true">
          <SystemGlyph name={glyph} className={styles.hiddenGlyph} />
          <svg className={styles.chains} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.8">
            {[45, -45].map((angle) => <g key={angle} transform={`rotate(${angle} 32 32)`}>
              {[2, 14, 26, 38, 50].map((x) => <rect key={x} x={x} y="28" width="14" height="8" rx="4" />)}
            </g>)}
          </svg>
          <span className={styles.lockSeal}><LockClosedIcon /></span>
        </span>
      </button>)}
    </nav>
  </div></>;
}
export function WarGodSystem({ chapter, onClose }: { chapter: number; onClose: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const heading = useId();
  const system = getWarGodSystem(chapter);
  useEffect(() => { const element = dialog.current; const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null; element?.showModal(); return () => { element?.close(); opener?.focus({ preventScroll: true }); }; }, []);
  return <dialog ref={dialog} className={styles.modal} aria-labelledby={heading} onCancel={(event) => { event.preventDefault(); onClose(); }} onKeyDown={(event) => {
    event.stopPropagation();
    if (event.key !== "Tab") return;
    const controls = [...event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], select, input')].filter((node) => node.getClientRects().length > 0);
    const first = controls[0], last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }} onClick={(event) => { if (event.target !== event.currentTarget) return; const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose(); }}><SystemScreen key={system.chapter} system={system} actualChapter={chapter} heading={heading} onClose={onClose} /></dialog>;
}
