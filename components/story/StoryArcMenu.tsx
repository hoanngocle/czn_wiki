"use client";

import Link from "next/link";
import { useState } from "react";
import { storyArcs, arcUrl } from "../../lib/story/arcs";
import { HeroIcon } from "./StoryHeroIcon";
import styles from "./story-arcs.module.css";

export function StoryArcMenu({ activeArcId, mobile = false }: { activeArcId?: string; mobile?: boolean }) {
  const [open, setOpen] = useState(!mobile && !!activeArcId);
  return <div className={`${styles.menu} ${mobile ? styles.mobileMenu : ""}`}>
    <button type="button" className={styles.menuTrigger} aria-expanded={open} aria-controls={mobile ? "mobile-story-arcs" : "sidebar-story-arcs"} onClick={() => setOpen(!open)}>
      {!mobile && <HeroIcon name="map" size={18} />}<span>Cốt Truyện</span><span className={styles.chevron} aria-hidden="true">{open ? "−" : "+"}</span>
    </button>
    <nav id={mobile ? "mobile-story-arcs" : "sidebar-story-arcs"} className={styles.arcList} aria-label={mobile ? "Chọn Arc trên điện thoại" : "Các Arc cốt truyện"} hidden={!open}>
      {storyArcs.map((arc) => <Link key={arc.id} href={arcUrl(arc)} prefetch={false} aria-current={arc.id === activeArcId ? "page" : undefined} onClick={() => { if (mobile) setOpen(false); }}>
        <span className={styles.arcNumber}>{String(arc.order).padStart(2, "0")}</span><span>{arc.title}<small>Chương {arc.from}–{arc.to}</small></span>
      </Link>)}
    </nav>
  </div>;
}
