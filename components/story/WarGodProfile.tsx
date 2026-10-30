"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { ArchiveBoxIcon, ArrowUpRightIcon, BoltIcon, BookOpenIcon, SparklesIcon } from "@heroicons/react/24/outline";
import { CURRENT_CHAP_KEY, getWarGodProfile, MAX_PROFILE_CHAPTER, type ProfileEntry } from "../../lib/story/war-god";
import { READER_PROGRESS_KEY, resolveReadingChapter } from "../../lib/story/reading-progress";
import styles from "./war-god.module.css";
import { StoryShell } from "./StoryShell";

const chapterUrl = (chapter: number) => `/chu-gioi-tan-the-online/html/chuong-${String(chapter).padStart(4, "0")}.html`;

function EntryIcon({ kind = "weapon" }: { kind?: string }) {
  const Icon = kind === "weapon" ? SparklesIcon
    : kind === "material" ? ArchiveBoxIcon
      : kind === "manual" ? BookOpenIcon : BoltIcon;
  return <Icon strokeWidth={1.5} aria-hidden="true" />;
}

function CharacterSeal() {
  return <div className={styles.seal} aria-hidden="true">
    <div className={styles.orbit} /><div className={styles.orbitInner} /><span className={styles.sealTop}>CHƯ GIỚI · CHIẾN THẦN</span>
    <svg viewBox="0 0 300 340" fill="none" className={styles.swordsman}>
      <defs><linearGradient id="robe" x1="112" y1="90" x2="188" y2="310" gradientUnits="userSpaceOnUse"><stop stopColor="#99ad8e" /><stop offset="1" stopColor="#2c493c" /></linearGradient></defs>
      <path d="m190 40-7 204" stroke="#7b9c70" strokeWidth="3" /><path d="m174 234 24 2m-12 7-2 27" stroke="#b3864b" strokeWidth="4" />
      <path d="M138 83c-9-14-3-39 13-39 18 0 24 27 14 40l-4 22-26-2 3-21Z" fill="#c1bda0" />
      <path d="M134 69c-10-28 28-40 36-13l-4 35-8-26-22 1-5 30-10 13 8-31Z" fill="#293d36" />
      <path d="m133 98-25 20-15 70 22 5-14 92-15 33 48-10 19 11 54-9-21-38-15-88 14-3-13-59-20-24-19 15-9-15Z" fill="url(#robe)" stroke="#72917b" strokeOpacity=".45" />
      <path d="m132 108 20 60 12-61M117 177l56-4M140 183l-14 116m26-113 28 112M109 123l13 48m43-24 14 27" stroke="#294437" strokeWidth="5" />
      <path d="m172 143 9 25 8 3 1-15-7-13" fill="#c1bda0" /><path d="M115 186c-5 43-13 72-34 96m45-92c-1 44 2 67 8 94" stroke="#a8b28b" strokeOpacity=".3" />
      <path d="M73 320h157" stroke="#72836a" strokeOpacity=".4" />
    </svg>
    <span className={styles.sealBottom}>MỘT KIẾM · VẠN THẾ GIỚI</span>
  </div>;
}

function EntryCard({ entry, selected, onSelect, onClose }: { entry: ProfileEntry; selected: boolean; onSelect: () => void; onClose: () => void }) {
  const tooltipId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = null;
  };

  useLayoutEffect(() => {
    const tooltip = tooltipRef.current;
    const button = buttonRef.current;
    if (!selected || !tooltip || !button) return;
    tooltip.showPopover();
    const bounds = button.getBoundingClientRect();
    const width = tooltip.offsetWidth;
    const height = tooltip.offsetHeight;
    const below = bounds.bottom + 8;
    const top = below + height <= window.innerHeight - 12 ? below : bounds.top - height - 8;
    tooltip.style.left = `${Math.max(12, Math.min(bounds.left, window.innerWidth - width - 12))}px`;
    tooltip.style.top = `${Math.max(12, Math.min(top, window.innerHeight - height - 12))}px`;
    const outside = (event: PointerEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) onClose();
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (tooltip.contains(document.activeElement)) button.focus();
        onClose();
      }
    };
    const scroll = (event: Event) => {
      if (tooltip.contains(event.target as Node)) return;
      // Focus/scroll-into-view can queue a scroll event before this popover opens.
      // Its position already uses the new bounds; only dismiss if the anchor moved.
      const current = button.getBoundingClientRect();
      if (Math.abs(current.top - bounds.top) > 1 || Math.abs(current.left - bounds.left) > 1) onClose();
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    document.addEventListener("scroll", scroll, true);
    window.addEventListener("resize", onClose);
    return () => {
      tooltip.hidePopover();
      cancelClose();
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
      document.removeEventListener("scroll", scroll, true);
      window.removeEventListener("resize", onClose);
    };
  }, [selected, onClose]);

  return <div ref={wrapperRef}
    onPointerEnter={cancelClose}
    onPointerMove={(event) => { if (event.pointerType !== "touch") { cancelClose(); if (!selected) onSelect(); } }}
    onPointerLeave={(event) => { if (event.pointerType !== "touch") { cancelClose(); closeTimer.current = setTimeout(onClose, 150); } }}
    onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) onClose(); }}>
    <button ref={buttonRef} type="button" className={`${styles.entry} ${selected ? styles.selected : ""}`} onClick={onSelect} onFocus={onSelect} aria-describedby={selected ? tooltipId : undefined}>
      <span className={`${styles.itemIcon} ${entry.kind === "weapon" ? styles.gold : ""}`}><EntryIcon kind={entry.kind} /></span>
      <span><strong>{entry.name}</strong><small>{entry.tag}</small></span><ArrowUpRightIcon className={styles.entryArrow} strokeWidth={1.5} aria-hidden="true" />
    </button>
    <div ref={tooltipRef} id={tooltipId} role="tooltip" popover="manual" className={styles.entryTooltip}>
      <span className={styles.eyebrow}>{entry.tag}</span>
      <h3>{entry.name}</h3><p>{entry.description}</p>
      <a href={chapterUrl(entry.chapter)}>Đối chiếu chương {entry.chapter} ↗</a>
    </div>
  </div>;
}

export function WarGodProfile() {
  const [currentChap, setCurrentChap] = useState(1);
  const currentChapRef = useRef(1);
  const [storageError, setStorageError] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [inventoryFilter, setInventoryFilter] = useState("all");

  useEffect(() => {
    let lastSource: string | null = null;
    const refresh = () => {
      try {
        const saved = localStorage.getItem(CURRENT_CHAP_KEY);
        const { chapter, fromReader } = resolveReadingChapter(localStorage.getItem(READER_PROGRESS_KEY), saved);
        const source = `${fromReader ? "reader" : "profile"}:${chapter}`;
        // Focus, scroll and cache notifications do not constitute new reading progress.
        if (source === lastSource) return;
        lastSource = source;
        // Reader scroll events also update storage; only a chapter change resets selection.
        if (chapter !== currentChapRef.current) {
          currentChapRef.current = chapter;
          setCurrentChap(chapter);
          setSelectedId(null);
        }
        if (fromReader) {
          if (saved !== String(chapter)) localStorage.setItem(CURRENT_CHAP_KEY, String(chapter));
          setStorageError("");
        }
      } catch { setStorageError("Chưa lưu được · Tiến độ chỉ giữ trong phiên này"); }
    };
    // Hydrate browser progress after SSR and refresh when returning from the reader.
    refresh();
    const sync = (event: StorageEvent) => {
      if (event.key === READER_PROGRESS_KEY || event.key === CURRENT_CHAP_KEY || event.key === null) refresh();
    };
    const visible = () => { if (document.visibilityState === "visible") refresh(); };
    window.addEventListener("storage", sync);
    window.addEventListener("focus", refresh);
    window.addEventListener("pageshow", refresh);
    document.addEventListener("visibilitychange", visible);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("focus", refresh);
      window.removeEventListener("pageshow", refresh);
      document.removeEventListener("visibilitychange", visible);
    };
  }, []);

  const profile = getWarGodProfile(Math.min(currentChap, MAX_PROFILE_CHAPTER));
  const visibleInventory = profile.inventory.filter((entry) => inventoryFilter === "all" || entry.kind === inventoryFilter);
  const soulMatch = profile.soul?.value.match(/^(\d+)\s*\/\s*(\d+)$/);
  const soulCurrent = soulMatch ? Number(soulMatch[1]) : null;
  const soulLimit = soulMatch ? Number(soulMatch[2]) : null;
  const soulPercent = soulCurrent !== null && soulLimit !== null && soulLimit > 0 ? Math.min(100, soulCurrent / soulLimit * 100) : null;
  const soulOverflow = soulCurrent !== null && soulLimit !== null ? Math.max(0, soulCurrent - soulLimit) : 0;

  return <StoryShell activeView="profile" currentChapter={currentChap}>
    <section className={styles.page} aria-label="Hồ sơ Chiến Thần" tabIndex={0}>
    <div className={styles.content}>
      {storageError && <p className={styles.footnote} role="status">{storageError}</p>}
      {currentChap > MAX_PROFILE_CHAPTER && <p className={styles.footnote}>Bạn đang đọc chương {currentChap}. Hồ sơ hiện có dữ liệu đến chương {MAX_PROFILE_CHAPTER}.</p>}

      <div className={styles.dashboard}>
        <section id="profile-character" className={`${styles.panel} ${styles.character}`} aria-labelledby="character-label">
          <div className={styles.panelHeading}><h2 id="character-label">Nhân vật</h2></div>
          <CharacterSeal />
          <div className={styles.identity}>
            <h2>Cố Thanh Sơn</h2>
            <p className={styles.realmText} data-testid="realm" aria-label="Cảnh giới tu hành">{profile.realm.value}</p>
          </div>
          <div className={styles.cultivationStats}>
            <section className={`${styles.soulCard} ${soulOverflow > 0 ? styles.soulOverflow : ""}`} aria-label="Hồn lực">
              <div className={styles.soulHeading}><span><BoltIcon aria-hidden="true" />Hồn lực</span><strong>{profile.soul?.value ?? "— / —"}</strong></div>
              {soulPercent !== null && <div className={styles.soulMeter} role="progressbar" aria-label="Hồn lực được ghi nhận" aria-valuemin={0} aria-valuemax={soulLimit!} aria-valuenow={Math.min(soulCurrent!, soulLimit!)} aria-valuetext={`${profile.soul!.value}${soulOverflow ? `, vượt ngưỡng ${soulOverflow}` : ""}, ghi nhận ở chương ${profile.soul!.chapter}`}><span style={{ width: `${soulPercent}%` }} /></div>}
              {soulOverflow > 0 && <span className={styles.overflowBadge}>+{soulOverflow} vượt ngưỡng</span>}
              {profile.soul && <p className={styles.soulSource}><a href={chapterUrl(profile.soul.chapter)}>Ghi nhận ở chương {profile.soul.chapter} ↗</a><span>{profile.soul.note ?? "Số liệu tại mốc này, không phải hồn lực trực tiếp."}</span></p>}
            </section>
          </div>
        </section>

        <div className={styles.middleColumn}>
          <section id="profile-equipment" className={styles.panel} aria-labelledby="equipment-label"><div className={styles.panelHeading}><h2 id="equipment-label">Pháp bảo</h2></div><div className={styles.equipmentList}>{profile.equipment.map((entry) => <EntryCard key={entry.id} entry={entry} selected={selectedId === entry.id} onSelect={() => setSelectedId(entry.id)} onClose={() => setSelectedId((id) => id === entry.id ? null : id)} />)}{!profile.equipment.length && <div className={styles.empty}><EntryIcon /><p>Chưa có pháp bảo được ghi nhận.</p><small>Tiếp tục hành trình để khám phá.</small></div>}</div></section>

          <section id="profile-inventory" className={styles.panel} aria-labelledby="inventory-label"><div className={styles.panelHeading}><h2 id="inventory-label">Hòm đồ</h2></div>
            <div className={styles.filters} aria-label="Lọc hòm đồ">{[["all", "Tất cả"], ["material", "Vật liệu"], ["manual", "Công pháp"]].map(([id, label]) => <button key={id} type="button" aria-pressed={inventoryFilter === id} onClick={() => setInventoryFilter(id)}>{label}</button>)}</div>
            <div className={styles.inventoryList}>{visibleInventory.map((entry) => <EntryCard key={entry.id} entry={entry} selected={selectedId === entry.id} onSelect={() => setSelectedId(entry.id)} onClose={() => setSelectedId((id) => id === entry.id ? null : id)} />)}{!visibleInventory.length && <p className={styles.emptyText}>Chưa ghi nhận vật phẩm trong nhóm này.</p>}</div>
            <p className={styles.footnote}>Sổ ghi nhận vật phẩm và công pháp; số lượng chưa xác nhận được để trống.</p>
          </section>

        </div>

        <div className={styles.rightColumn}>
          <section id="profile-skills" className={styles.panel} aria-labelledby="skills-label"><div className={styles.panelHeading}><h2 id="skills-label">Kỹ năng</h2></div><div className={styles.skillList}>{profile.skills.map((entry) => <EntryCard key={entry.id} entry={entry} selected={selectedId === entry.id} onSelect={() => setSelectedId(entry.id)} onClose={() => setSelectedId((id) => id === entry.id ? null : id)} />)}{!profile.skills.length && <div className={styles.empty}><EntryIcon kind="skill" /><p>Con đường tu hành còn phía trước.</p><small>Kỹ năng sẽ xuất hiện theo chương.</small></div>}</div></section>
        </div>
      </div>
    </div>
    </section>
  </StoryShell>;
}
