"use client";

import { useRef, useState } from "react";
import { getWarGodMissions, MAX_MISSION_CHAPTER, type MissionKind, type MissionStatus } from "../../lib/story/war-god-missions";
import styles from "./war-god-missions.module.css";

const kinds: Record<MissionKind, string> = {
  destiny: "Vận Mệnh · Định Mệnh",
  system: "Nhiệm vụ hệ thống",
};
const statuses: Record<MissionStatus, string> = {
  active: "Đang tiến hành",
  completed: "Đã hoàn thành",
};
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/gi, "d").toLowerCase().trim();
const kindOrder: MissionKind[] = ["destiny", "system"];

export function WarGodMissions({ chapter, actualChapter }: { chapter: number; actualChapter: number }) {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<MissionKind | "all">("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const detail = useRef<HTMLElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const missions = getWarGodMissions(chapter).sort((a, b) => kindOrder.indexOf(a.kind) - kindOrder.indexOf(b.kind) || b.firstChapter - a.firstChapter);
  const visible = missions.filter((mission) => (kind === "all" || mission.kind === kind) && normalize(`${mission.title} ${mission.issuer}`).includes(normalize(query)));
  const selected = visible.find((mission) => mission.id === selectedId) ?? visible.find((mission) => mission.status === "active") ?? visible[0];
  const choose = (id: string) => {
    setSelectedId(id);
    requestAnimationFrame(() => { detail.current?.focus({ preventScroll: true }); detail.current?.scrollIntoView({ block: "nearest" }); });
  };

  return <section className={styles.panel} aria-label="Danh sách nhiệm vụ">
    <header className={styles.heading}>
      <h3>Danh sách nhiệm vụ</h3>
      {actualChapter > MAX_MISSION_CHAPTER && <p className={styles.coverage}>Dữ liệu đến chương {MAX_MISSION_CHAPTER}.</p>}
    </header>
    <div className={styles.filters}>
      <label><span>Tìm nhiệm vụ</span><input ref={search} type="search" value={query} onChange={(event) => { setQuery(event.target.value); setSelectedId(null); }} placeholder="Tìm theo tên nhiệm vụ…" /></label>
      <label><span>Loại nhiệm vụ</span><select value={kind} onChange={(event) => { setKind(event.target.value as MissionKind | "all"); setSelectedId(null); }}><option value="all">Tất cả</option>{Object.entries(kinds).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></label>
    </div>
    <p className={styles.count} aria-live="polite">{visible.length} nhiệm vụ</p>
    {visible.length === 0 ? <p className={styles.empty}>{missions.length === 0 ? "Chưa có nhiệm vụ." : "Không tìm thấy nhiệm vụ phù hợp."}</p> : <div className={styles.layout}>
      <div className={styles.list} data-testid="mission-list" role="group" aria-label="Các nhiệm vụ đã ghi nhận">
        {visible.map((mission) => <button type="button" key={mission.id} aria-pressed={mission.id === selected?.id} onClick={() => choose(mission.id)}>
          <small>{kinds[mission.kind]}</small>
          <strong>{mission.title}</strong>
          <span data-status={mission.status}>{statuses[mission.status]}</span>
        </button>)}
      </div>
      {selected && <article ref={detail} tabIndex={-1} className={styles.detail} data-testid="mission-detail" aria-label={selected.title}>
        <div className={styles.detailMeta}><span>{kinds[selected.kind]}</span><span data-status={selected.status}>{statuses[selected.status]}</span></div>
        <h4>{selected.title}</h4>
        <p className={styles.issuer}>{selected.issuer}</p>
        <p className={styles.objective}>{selected.objective}</p>
        {!!selected.facts?.length && <dl className={styles.facts}>{selected.facts.map((fact, index) => <div key={`${fact.chapter}-${index}`}><dt>{fact.label}</dt><dd>{fact.text}</dd></div>)}</dl>}
        <h5>Diễn tiến</h5>
        <ol className={styles.events}>{selected.events.map((event, index) => <li key={`${event.chapter}-${index}`}><span>Chương {event.chapter}</span><p>{event.text}</p></li>)}</ol>
        <button type="button" className={styles.back} onClick={() => { search.current?.focus({ preventScroll: true }); search.current?.scrollIntoView({ block: "nearest" }); }}>Về danh sách</button>
      </article>}
    </div>}
  </section>;
}
