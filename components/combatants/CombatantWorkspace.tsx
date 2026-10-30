"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { filterCombatants, type CombatantFilters } from "../../lib/wiki/filters";
import type { CharacterSummary } from "../../lib/wiki/types";
import { combatantSlug, combatantUrl } from "../../lib/wiki/urls";
import { useStoredValue } from "../../lib/ui/storage";
import { label } from "../../lib/wiki/labels";
import styles from "./CombatantWorkspace.module.css";

const empty: CombatantFilters = { query: "", rarities: [], egos: [], jobs: [] };
const egoColors: Record<string, string> = { creed: "#65399d", narcissism: "#a46320", love: "#af3c60", norms: "#278ac2", instinct: "#167251" };
const egoOrder = ["creed", "instinct", "love", "narcissism", "norms"];
const egoLabels: Record<string, string> = { creed: "Void", instinct: "Instinct", love: "Passion", norms: "Order", narcissism: "Justice" };
const jobOrder = ["striker", "vanguard", "ranger", "hunter", "psionic", "controller"];
const jobIcon = (job: string) => `/assets/common/icon_job_${job === "vanguard" ? "knight" : job}.webp`;
const egoIcon = (ego: string) => `/assets/common/icon_ego_${ego}.webp`;

function toggle<T>(current: T[], value: T): T[] { return current.includes(value) ? [] : [value]; }

export function CombatantWorkspace({ characters, newIds, unavailableJobIcons, children }: { characters: CharacterSummary[]; newIds: string[]; unavailableJobIcons: string[]; children: React.ReactNode }) {
  const vietnamese = useStoredValue("czn_combatant_vietnamese", "true") === "true";
  const t = (en: string, vi: string) => vietnamese ? vi : en;
  const pathname = usePathname();
  const selected = pathname.match(/^\/czn\/combatant\/([^/]+)$/)?.[1];
  const indexRoute = pathname === "/czn/combatant";
  const [filters, setFilters] = useState<CombatantFilters>(empty);
  const [pickerOpen, setPickerOpen] = useState(false);
  const opener = useRef<HTMLButtonElement>(null);
  const pickerRef = useRef<HTMLElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const newSet = new Set(newIds);
  const unavailableSet = new Set(unavailableJobIcons);
  const indexOfJob = (job: string) => { const index = jobOrder.indexOf(job); return index === -1 ? 999 : index; };
  const results = filterCombatants(characters, filters).sort((a, b) => Number(newSet.has(b.id)) - Number(newSet.has(a.id)) || b.rarity - a.rarity || indexOfJob(a.job) - indexOfJob(b.job));
  const egos = egoOrder;
  const jobs = jobOrder;
  const jobBadge = (job: string, size: number) => unavailableSet.has(job === "vanguard" ? "knight" : job) ? <span aria-hidden="true">◆</span> : <Image src={jobIcon(job)} width={size} height={size} alt="" unoptimized />;
  useEffect(() => { if (!pickerOpen) return;
    searchRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setPickerOpen(false); opener.current?.focus(); return; }
      if (event.key !== "Tab" || !pickerRef.current) return;
      const focusable = [...pickerRef.current.querySelectorAll<HTMLElement>('input:not([disabled]), button:not([disabled]), a[href]')];
      if (!focusable.length) return;
      if (event.shiftKey && document.activeElement === focusable[0]) { event.preventDefault(); focusable.at(-1)?.focus(); }
      else if (!event.shiftKey && document.activeElement === focusable.at(-1)) { event.preventDefault(); focusable[0].focus(); }
    };
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, [pickerOpen]);
  const select = () => { setPickerOpen(false); if (window.matchMedia("(max-width: 767px)").matches) opener.current?.focus(); };
  return <div className={styles.workspace}>
    <button ref={opener} className={styles.mobileOpen} onClick={() => { if (indexRoute) searchRef.current?.focus(); else setPickerOpen(true); }} aria-label={t("Choose combatant", "Chọn nhân vật")}>⌕</button>
    {pickerOpen && <button className={styles.scrim} aria-label={t("Close combatant picker", "Đóng danh sách nhân vật")} onClick={() => { setPickerOpen(false); opener.current?.focus(); }} />}
    <aside ref={pickerRef} className={`${styles.picker} ${indexRoute ? styles.pickerIndex : ""} ${pickerOpen ? styles.pickerOpen : ""}`} aria-label={t("Combatant picker", "Danh sách nhân vật")}>
      <div className={styles.filters}>
        <div className={styles.searchRow}><input ref={searchRef} aria-label={t("Search combatants", "Tìm nhân vật")} placeholder={t("Search combatants...", "Tìm nhân vật...")} value={filters.query} onChange={(event) => setFilters({ ...filters, query: event.target.value })} />{(filters.query || filters.rarities.length > 0 || filters.egos.length > 0 || filters.jobs.length > 0) && <button aria-label={t("Clear filters", "Xóa bộ lọc")} onClick={() => { setFilters(empty); searchRef.current?.focus(); }} title={t("Clear filters", "Xóa bộ lọc")}>×</button>}</div>
        <div className={styles.rarity} aria-label={t("Rarity filter", "Lọc độ hiếm")}>{[5, 4].map((rarity) => <button key={rarity} aria-label={`${rarity} ${t("stars", "sao")}`} aria-pressed={filters.rarities.includes(rarity)} onClick={() => setFilters({ ...filters, rarities: toggle(filters.rarities, rarity) })}><span className={styles.stars}>{Array.from({ length: rarity }, (_, index) => <Image key={index} src="/assets/common/czn-grade.png" width={24} height={24} alt="" unoptimized />)}</span></button>)}</div>
        <div className={styles.iconRow} aria-label={t("Ego filter", "Lọc hệ Ego")}>{egos.map((ego) => <button key={ego} title={label(egoLabels[ego], vietnamese)} aria-label={`Ego ${vietnamese ? label(egoLabels[ego], true) : ego}`} aria-pressed={filters.egos.includes(ego)} onClick={() => setFilters({ ...filters, egos: toggle(filters.egos, ego) })}><span className={styles.egoFilterIcon} style={{ borderImageSource: `url(/assets/common/bg_ego_${ego}.webp)` }}><Image src={egoIcon(ego)} width={23} height={23} alt="" unoptimized /></span></button>)}</div>
        <div className={styles.iconRow} aria-label={t("Job filter", "Lọc vai trò")}>{jobs.map((job) => <button key={job} title={label(job.charAt(0).toUpperCase() + job.slice(1), vietnamese)} aria-label={t(`Job ${job}`, `Vai trò ${label(job, true)}`)} aria-pressed={filters.jobs.includes(job)} onClick={() => setFilters({ ...filters, jobs: toggle(filters.jobs, job) })}><span className={styles.jobFilterIcon}>{jobBadge(job, 23)}</span></button>)}</div>
      </div>
      <div className={styles.portraits}>
        {results.length ? results.map((character) => <Link data-testid="combatant-portrait" key={character.id} href={combatantUrl(character)} aria-label={character.name} aria-current={selected === combatantSlug(character) ? "page" : undefined} className={`${styles.portrait} ${selected === combatantSlug(character) ? styles.selected : ""}`} onClick={select}>
          <Image src={character.portrait} alt="" fill sizes="(max-width: 767px) 33vw, 130px" unoptimized /><span className={styles.job}>{jobBadge(character.job, 17)}</span><span className={styles.ego} style={{ background: egoColors[character.ego] }}><Image src={egoIcon(character.ego)} width={17} height={17} alt="" unoptimized /></span>{newSet.has(character.id) && <span className={styles.newBadge}>{t("NEW", "MỚI")}</span>}<span className={styles.name}>{character.name}</span>
        </Link>) : <p className={styles.empty}>{t("No combatants match these filters.", "Không có nhân vật phù hợp với bộ lọc.")}</p>}
      </div>
    </aside>
    <div className={`${styles.detail} ${indexRoute ? styles.detailIndex : ""}`}>{children}</div>
  </div>;
}
