"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { filterCombatants, type CombatantFilters } from "../../lib/wiki/filters";
import type { CharacterSummary } from "../../lib/wiki/types";
import { combatantSlug, combatantUrl } from "../../lib/wiki/urls";
import styles from "./CombatantWorkspace.module.css";

const empty: CombatantFilters = { query: "", rarities: [], egos: [], jobs: [] };
const egoColors: Record<string, string> = { creed: "#65399d", narcissism: "#a46320", love: "#af3c60", norms: "#278ac2", instinct: "#167251" };
const egoOrder = ["creed", "instinct", "love", "narcissism", "norms"];
const jobOrder = ["striker", "knight", "ranger", "hunter", "psionic", "controller"];
const jobIcon = (job: string) => `/assets/common/icon_job_${job}.webp`;
const egoIcon = (ego: string) => `/assets/common/icon_ego_${ego}.webp`;

function toggle<T>(current: T[], value: T): T[] { return current.includes(value) ? [] : [value]; }

export function CombatantWorkspace({ characters, newIds, unavailableJobIcons, children }: { characters: CharacterSummary[]; newIds: string[]; unavailableJobIcons: string[]; children: React.ReactNode }) {
  const pathname = usePathname();
  const selected = pathname.match(/^\/combatant\/([^/]+)$/)?.[1];
  const indexRoute = pathname === "/combatant";
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
  const jobBadge = (job: string, size: number) => unavailableSet.has(job) ? <span aria-hidden="true">◆</span> : <Image src={jobIcon(job)} width={size} height={size} alt="" unoptimized />;
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
    <button ref={opener} className={styles.mobileOpen} onClick={() => { if (indexRoute) searchRef.current?.focus(); else setPickerOpen(true); }} aria-label="Choose combatant">⌕</button>
    {pickerOpen && <button className={styles.scrim} aria-label="Close combatant picker" onClick={() => { setPickerOpen(false); opener.current?.focus(); }} />}
    <aside ref={pickerRef} className={`${styles.picker} ${indexRoute ? styles.pickerIndex : ""} ${pickerOpen ? styles.pickerOpen : ""}`} aria-label="Combatant picker">
      <div className={styles.filters}>
        <div className={styles.searchRow}><input ref={searchRef} aria-label="Search combatants" placeholder="Search combatants..." value={filters.query} onChange={(event) => setFilters({ ...filters, query: event.target.value })} />{(filters.query || filters.rarities.length > 0 || filters.egos.length > 0 || filters.jobs.length > 0) && <button aria-label="Clear filters" onClick={() => { setFilters(empty); searchRef.current?.focus(); }} title="Clear filters">×</button>}</div>
        <div className={styles.rarity} aria-label="Rarity filter">{[5, 4].map((rarity) => <button key={rarity} aria-label={"▲".repeat(rarity)} aria-pressed={filters.rarities.includes(rarity)} onClick={() => setFilters({ ...filters, rarities: toggle(filters.rarities, rarity) })}><span className={styles.stars}>{Array.from({ length: rarity }, (_, index) => <Image key={index} src="/assets/common/czn-grade.png" width={24} height={24} alt="" unoptimized />)}</span></button>)}</div>
        <div className={styles.iconRow} aria-label="Ego filter">{egos.map((ego) => <button key={ego} title={ego} aria-label={`Ego ${ego}`} aria-pressed={filters.egos.includes(ego)} onClick={() => setFilters({ ...filters, egos: toggle(filters.egos, ego) })}><span className={styles.egoFilterIcon} style={{ borderImageSource: `url(/assets/common/bg_ego_${ego}.webp)` }}><Image src={egoIcon(ego)} width={23} height={23} alt="" unoptimized /></span></button>)}</div>
        <div className={styles.iconRow} aria-label="Job filter">{jobs.map((job) => <button key={job} title={job} aria-label={`Job ${job}`} aria-pressed={filters.jobs.includes(job)} onClick={() => setFilters({ ...filters, jobs: toggle(filters.jobs, job) })}><span className={styles.jobFilterIcon}>{jobBadge(job, 23)}</span></button>)}</div>
      </div>
      <div className={styles.portraits}>
        {results.length ? results.map((character) => <Link data-testid="combatant-portrait" key={character.id} href={combatantUrl(character)} aria-label={character.name} aria-current={selected === combatantSlug(character) ? "page" : undefined} className={`${styles.portrait} ${selected === combatantSlug(character) ? styles.selected : ""}`} onClick={select}>
          <Image src={character.portrait} alt="" fill sizes="(max-width: 767px) 33vw, 130px" unoptimized /><span className={styles.job}>{jobBadge(character.job, 17)}</span><span className={styles.ego} style={{ background: egoColors[character.ego] }}><Image src={egoIcon(character.ego)} width={17} height={17} alt="" unoptimized /></span>{newSet.has(character.id) && <span className={styles.newBadge}>NEW</span>}<span className={styles.name}>{character.name}</span>
        </Link>) : <p className={styles.empty}>No combatants match these filters.</p>}
      </div>
    </aside>
    <div className={`${styles.detail} ${indexRoute ? styles.detailIndex : ""}`}>{children}</div>
  </div>;
}
