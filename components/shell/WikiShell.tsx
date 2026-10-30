"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./WikiShell.module.css";
import { storeValue, useStoredValue } from "../../lib/ui/storage";
import { languageKey, useUiLanguage } from "../../lib/ui/language";

const icons = {
  Combatant: "combatant",
  Partner: "partner",
  Cards: "card",
  "Deck Builder": "deck",
  Equipment: "relic",
  Items: "item",
  Terminology: "terminology",
  "Patch note": "patch-note",
};
const nav = ["Combatant", "Partner", "Cards", "Deck Builder", "Equipment", "Items", "Terminology", "Patch note"] as const;
const routes: Partial<Record<typeof nav[number], string>> = { Combatant: "/czn/combatant", Partner: "/czn/partner", "Deck Builder": "/czn/deck-builder", Equipment: "/czn/equipment", Terminology: "/czn/terminology", "Patch note": "/czn/patch-note" };
const logo = "/assets/common/c1016_sd01_s-BmcFnoIZ.png";

function NavIcon({ item }: { item: keyof typeof icons }) {
  if (item === "Patch note") return <span className={styles.navIcon} aria-hidden="true"><svg width="52" height="44" viewBox="0 0 52 44" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M14 5h17l8 8v26H14V5Zm16 0v9h9M20 21h13m-13 6h13m-13 6h8" /></svg></span>;
  if (item === "Terminology") return <span className={styles.navIcon} aria-hidden="true"><svg width="52" height="44" viewBox="0 0 52 44" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M26 11c-5-4-12-4-18-2v25c6-2 13-2 18 2 5-4 12-4 18-2V9c-6-2-13-2-18 2Zm0 0v25M13 15h8m-8 6h8m10-6h8m-8 6h8" /></svg></span>;
  // Original E7BOT tab assets, including the PNGs embedded in its bundle.
  const category = { Combatant: "combatant", Partner: "partner", Cards: "card", "Deck Builder": "common", Equipment: "item", Items: "item" }[item];
  const source = `/assets/${category}/${icons[item]}`;
  return <span className={styles.navIcon} aria-hidden="true">
    <Image className={styles.iconLight} src={`${source}-light.png`} width={52} height={44} alt="" unoptimized />
    <Image className={styles.iconDark} src={`${source}-dark.png`} width={52} height={44} alt="" unoptimized />
  </span>;
}

function ThemeToggle() {
  const { t } = useUiLanguage();
  const mode = useStoredValue("themeMode", "system");
  const toggle = () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    storeValue("themeMode", next);
  };
  return <button type="button" className={`${styles.utility} ${styles.themeToggle}`} aria-label={t("Toggle theme")} title={`${t("Theme")}: ${t(mode)}`} onClick={toggle}>{mode === "light" ? "☀️" : "🌙"}</button>;
}

export function WikiShell({ children }: { children: React.ReactNode }) {
  const { vietnamese, t } = useUiLanguage();
  useEffect(() => { document.documentElement.lang = vietnamese ? "vi" : "en"; }, [vietnamese]);
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const opener = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => { if (!menuOpen) return;
    const frame = requestAnimationFrame(() => navRef.current?.querySelector<HTMLElement>("a")?.focus());
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setMenuOpen(false); opener.current?.focus(); return; }
      if (event.key !== "Tab" || !navRef.current) return;
      const focusable = [...navRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])")];
      if (!focusable.length) return;
      if (event.shiftKey && document.activeElement === focusable[0]) { event.preventDefault(); focusable.at(-1)?.focus(); }
      else if (!event.shiftKey && document.activeElement === focusable.at(-1)) { event.preventDefault(); focusable[0].focus(); }
    };
    window.addEventListener("keydown", onKey); return () => { cancelAnimationFrame(frame); window.removeEventListener("keydown", onKey); };
  }, [menuOpen]);
  return <div className={styles.shell}>
    <header className={styles.mobileHeader}>
      <button ref={opener} aria-label={t("Open navigation")} aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>☰</button>
      <Link href="/czn/combatant" className={styles.mobileBrand}><Image src={logo} alt="" width={30} height={30} unoptimized /> CZN</Link>
      <span aria-hidden="true" style={{ width: 22 }} />
    </header>
    {menuOpen && <button className={styles.scrim} aria-label={t("Close navigation")} onClick={() => { setMenuOpen(false); opener.current?.focus(); }} />}
    <nav ref={navRef} aria-label={t("CZN navigation")} className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
      <Link className={styles.brand} href="/czn/combatant" onClick={() => setMenuOpen(false)}><Image src={logo} alt="" width={42} height={42} unoptimized /><small>CZN</small></Link>
      <div className={styles.navItems}>{nav.map((item) => {
        const href = routes[item];
        const active = href && (pathname === href || pathname.startsWith(`${href}/`) || item === "Patch note" && pathname.startsWith("/czn/mechanics/"));
        return href ? <Link key={item} href={href} aria-current={active ? "page" : undefined} className={`${styles.navItem} ${active ? styles.active : ""}`} onClick={() => setMenuOpen(false)}><NavIcon item={item} /><span>{t(item)}</span></Link> : <span key={item} className={`${styles.navItem} ${styles.disabled}`} aria-disabled="true" title={t("Coming soon")}><NavIcon item={item} /><span>{t(item)}</span></span>;
      })}</div>
      <div className={styles.bottom}><ThemeToggle /><button type="button" className={styles.utility} aria-label={vietnamese ? "Switch to English" : "Chuyển sang tiếng Việt"} title={vietnamese ? "Switch to English" : "Chuyển sang tiếng Việt"} onClick={() => storeValue(languageKey, String(!vietnamese))}>{vietnamese ? "VI" : "EN"}</button></div>
    </nav>
    <main className={styles.main}>{children}</main>
  </div>;
}
