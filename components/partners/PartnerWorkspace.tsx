"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { storeValue, useStoredValue } from "../../lib/ui/storage";
import { label } from "../../lib/wiki/labels";
import type { PartnerSummary } from "../../lib/wiki/partner-types";
import styles from "./Partners.module.css";

const jobs = ["striker", "knight", "ranger", "hunter", "psionic", "controller"];
const initialFilters = { query: "", rarity: 0, job: "" };

export function PartnerJob({ job, size = 22 }: { job: string; size?: number }) {
  return jobs.includes(job) ? <Image src={`/assets/common/icon_job_${job}.webp`} alt="" width={size} height={size} unoptimized /> : <span aria-hidden="true">◆</span>;
}

export function PartnerPortrait({ partner, className }: { partner: PartnerSummary; className?: string }) {
  return partner.portrait ? <Image className={className} src={partner.portrait} alt="" fill sizes="(max-width: 767px) 33vw, 130px" unoptimized /> : <span className={styles.initials} aria-hidden="true">{partner.name.split(/\s+/).map(word => word[0]).slice(0, 2).join("")}</span>;
}

export function PartnerWorkspace({ partners, children }: { partners: (PartnerSummary & { url: string })[]; children: React.ReactNode }) {
  const vietnamese = useStoredValue("czn_combatant_vietnamese", "true") === "true";
  const t = (en: string, vi: string) => vietnamese ? vi : en;
  const pathname = usePathname();
  const indexRoute = pathname === "/czn/partner";
  const [filters, setFilters] = useState(initialFilters);
  const [pickerOpen, setPickerOpen] = useState(false);
  const workspace = useRef<HTMLDivElement>(null);
  const detail = useRef<HTMLDivElement>(null);
  const opener = useRef<HTMLButtonElement>(null);
  const picker = useRef<HTMLElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const query = filters.query.trim().toLocaleLowerCase();
  const results = partners.filter(partner => (!query || [partner.name, ...Object.values(partner.names)].some(name => name?.toLocaleLowerCase().includes(query))) && (!filters.rarity || partner.rarity === filters.rarity) && (!filters.job || partner.job === filters.job))
    .sort((a, b) => b.rarity - a.rarity || (jobs.indexOf(a.job) === -1 ? jobs.length : jobs.indexOf(a.job)) - (jobs.indexOf(b.job) === -1 ? jobs.length : jobs.indexOf(b.job)));
  const classes = [...new Set([...jobs, ...partners.map(partner => partner.job).filter(Boolean)])];
  const close = () => { setPickerOpen(false); opener.current?.focus(); };

  useEffect(() => {
    if (!pickerOpen) return;
    const openerElement = opener.current;
    search.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const covered = new Map<HTMLElement, { inert: boolean; ariaHidden: string | null }>();
    const cover = (element: HTMLElement | null) => {
      if (!element || covered.has(element)) return;
      covered.set(element, { inert: element.inert, ariaHidden: element.getAttribute("aria-hidden") });
      element.inert = true;
      element.setAttribute("aria-hidden", "true");
    };
    cover(detail.current);
    cover(opener.current);
    let current: HTMLElement | null = workspace.current;
    while (current?.parentElement) {
      const parent = current.parentElement;
      for (const sibling of parent.children) {
        if (sibling !== current && sibling instanceof HTMLElement && !["SCRIPT", "STYLE"].includes(sibling.tagName)) cover(sibling);
      }
      if (parent === document.body) break;
      current = parent;
    }
    const mobile = window.matchMedia("(max-width: 767px)");
    const onViewportChange = () => { if (!mobile.matches) setPickerOpen(false); };
    mobile.addEventListener("change", onViewportChange);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); setPickerOpen(false); opener.current?.focus(); return; }
      if (event.key !== "Tab" || !picker.current) return;
      const focusable = [...picker.current.querySelectorAll<HTMLElement>('input:not([disabled]), button:not([disabled]), a[href]')];
      if (event.shiftKey && document.activeElement === focusable[0]) { event.preventDefault(); focusable.at(-1)?.focus(); }
      else if (!event.shiftKey && document.activeElement === focusable.at(-1)) { event.preventDefault(); focusable[0]?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      mobile.removeEventListener("change", onViewportChange);
      document.body.style.overflow = previousOverflow;
      covered.forEach((previous, element) => {
        element.inert = previous.inert;
        if (previous.ariaHidden === null) element.removeAttribute("aria-hidden");
        else element.setAttribute("aria-hidden", previous.ariaHidden);
      });
      openerElement?.focus();
    };
  }, [pickerOpen]);

  return <div ref={workspace} className={styles.workspace} lang={vietnamese ? "vi" : "en"}>
    <button ref={opener} className={styles.mobileOpen} aria-label={t("Choose partner", "Chọn đối tác")} aria-expanded={pickerOpen} onClick={() => indexRoute ? search.current?.focus() : setPickerOpen(true)}>⌕</button>
    {pickerOpen && <button className={styles.scrim} aria-hidden="true" tabIndex={-1} onClick={close} />}
    <aside ref={picker} role={pickerOpen ? "dialog" : "complementary"} aria-modal={pickerOpen ? true : undefined} className={`${styles.picker} ${indexRoute ? styles.pickerIndex : ""} ${pickerOpen ? styles.pickerOpen : ""}`} aria-label={t("Partner picker", "Bộ chọn đối tác")}>
      <div className={styles.filters}>
        {indexRoute && <label className={styles.languageToggle}><input type="checkbox" checked={vietnamese} onChange={event => storeValue("czn_combatant_vietnamese", String(event.target.checked))} />Tiếng Việt</label>}
        <div className={styles.searchRow}><input ref={search} aria-label={t("Search partners", "Tìm đối tác")} placeholder={t("Search partners...", "Tìm đối tác...")} value={filters.query} onChange={event => setFilters({ ...filters, query: event.target.value })} />{(filters.query || filters.rarity || filters.job) ? <button aria-label={t("Clear filters", "Xóa bộ lọc")} onClick={() => { setFilters(initialFilters); search.current?.focus(); }}>×</button> : null}{pickerOpen && <button aria-label={t("Close partner picker", "Đóng bộ chọn đối tác")} onClick={close}>{t("Close", "Đóng")}</button>}</div>
        <div className={styles.rarity} aria-label={t("Rarity filter", "Lọc độ hiếm")}>{[5, 4, 3].map(rarity => <button key={rarity} aria-label={`${rarity} ${t("stars", "sao")}`} aria-pressed={filters.rarity === rarity} onClick={() => setFilters({ ...filters, rarity: filters.rarity === rarity ? 0 : rarity })}><span className={styles.stars}>{Array.from({ length: rarity }, (_, index) => <Image key={index} src="/assets/common/czn-grade.png" width={24} height={24} alt="" unoptimized />)}</span></button>)}</div>
        <div className={styles.classes} aria-label={t("Class filter", "Lọc hệ")}>{classes.map(job => <button key={job} title={label(job.charAt(0).toUpperCase() + job.slice(1), vietnamese)} aria-label={vietnamese ? `Hệ ${label(job.charAt(0).toUpperCase() + job.slice(1), true)}` : `Class ${job}`} aria-pressed={filters.job === job} onClick={() => setFilters({ ...filters, job: filters.job === job ? "" : job })}><PartnerJob job={job} /></button>)}</div>
      </div>
      <div className={styles.portraits}>
        {results.map(partner => <Link key={partner.id} data-testid="partner-portrait" href={partner.url} aria-label={partner.name} aria-current={pathname === partner.url ? "page" : undefined} className={styles.portrait} onClick={() => { setPickerOpen(false); if (window.matchMedia("(max-width: 767px)").matches) opener.current?.focus(); }}>
          <PartnerPortrait partner={partner} /><span className={styles.job}><PartnerJob job={partner.job} size={17} /></span><span className={styles.name}>{partner.name}</span>
        </Link>)}
        {!results.length && <p className={styles.empty}>{t("No partners match these filters.", "Không có đối tác phù hợp với bộ lọc.")}</p>}
      </div>
    </aside>
    <div ref={detail} className={`${styles.detail} ${indexRoute ? styles.detailIndex : ""}`}>{children}</div>
  </div>;
}

export function PartnerSelectionPrompt() {
  const vietnamese = useStoredValue("czn_combatant_vietnamese", "true") === "true";
  return <div className={styles.selectionPrompt} lang={vietnamese ? "vi" : "en"}><span aria-hidden="true">◇</span><h1>{vietnamese ? "Chọn đối tác" : "Select Partner"}</h1><p>{vietnamese ? "Chọn một đối tác để xem bài hỗ trợ, nội tại và chỉ số." : "Choose a partner to view their support card, passive, and stats."}</p></div>;
}
