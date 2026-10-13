"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import styles from "./WikiShell.module.css";
import { storeValue, useStoredValue } from "../../lib/ui/storage";

const icons = {
  Combatant: "/reference/e7bot/assets/icon_tab_combatant-light-pCwOlrjy.png",
  Partner: "/reference/e7bot/assets/icon_tab_partner-light-D2UMFv2P.png",
  Cards: "/reference/e7bot/assets/icon_tab_spark-light-BU2waQGr.png",
  "Deck Builder": "/reference/e7bot/assets/icon_tab_deck-light-CE9QKEAP.png",
  Encounters: "/reference/e7bot/assets/icon_tab_encounter-light-BMCFpKBB.png",
};
const nav = ["Combatant", "Partner", "Cards", "Deck Builder", "Epiphany", "Engravings", "Equipment", "Items", "Encounters"];
const logo = "/reference/e7bot/assets/c1016_sd01_s-BmcFnoIZ.png";

function ThemeToggle() {
  const mode = useStoredValue("themeMode", "system");
  const toggle = () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    storeValue("themeMode", next);
  };
  return <button type="button" className={styles.utility} aria-label="Toggle theme" title={`Theme: ${mode}`} onClick={toggle}>{mode === "light" ? "☀️" : "🌙"}</button>;
}

export function WikiShell({ children }: { children: React.ReactNode }) {
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
      <button ref={opener} aria-label="Open navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>☰</button>
      <Link href="/combatant" className={styles.mobileBrand}><Image src={logo} alt="" width={30} height={30} unoptimized /> E7BOT</Link>
      <span aria-hidden="true" style={{ width: 22 }} />
    </header>
    {menuOpen && <button className={styles.scrim} aria-label="Close navigation" onClick={() => { setMenuOpen(false); opener.current?.focus(); }} />}
    <nav ref={navRef} aria-label="CZN navigation" className={`${styles.nav} ${menuOpen ? styles.open : ""}`}>
      <Link className={styles.brand} href="/combatant" onClick={() => setMenuOpen(false)}><Image src={logo} alt="" width={42} height={42} unoptimized /><small>E7BOT</small></Link>
      <div className={styles.group}>CZN <span>▼</span></div>
      <div className={styles.navItems}>{nav.map((item) => item === "Combatant" ? <Link key={item} href="/combatant" aria-current={pathname.startsWith("/combatant") ? "page" : undefined} className={`${styles.navItem} ${pathname.startsWith("/combatant") ? styles.active : ""}`} onClick={() => setMenuOpen(false)}><Image src={icons.Combatant} width={27} height={27} alt="" unoptimized /><span>{item}</span></Link> : <span key={item} className={`${styles.navItem} ${styles.disabled}`} aria-disabled="true" title="Coming soon">{item in icons ? <Image src={icons[item as keyof typeof icons]} width={27} height={27} alt="" unoptimized /> : <span className={styles.fallbackIcon} aria-hidden="true">◇</span>}<span>{item}</span></span>)}</div>
      <div className={styles.bottom}><ThemeToggle /><span className={styles.utility} aria-label="Language: English">EN</span></div>
    </nav>
    <main className={styles.main}>{children}</main>
  </div>;
}
