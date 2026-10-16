"use client";

import { useState } from "react";
import Image from "next/image";
import type { Card } from "../../lib/wiki/types";
import { Description } from "../cards/Description";
import { Dialog } from "../ui/Dialog";
import styles from "./Partners.module.css";

export function PartnerSupportCard({ card, vietnamese = true }: { card: Card; vietnamese?: boolean }) {
  const [open, setOpen] = useState(false);
  const terms = [...new Map([...card.tooltips, ...card.talent].map(term => [term.id, term])).values()];
  return <>
    <button className={styles.supportCard} aria-label={`${vietnamese ? "Xem lá hỗ trợ" : "View support card"}: ${card.name}`} onClick={() => setOpen(true)}>
      <span className={styles.cardArt}>{card.artwork ? <Image src={card.artwork} alt="" fill sizes="250px" unoptimized /> : <span className={styles.initials}>✦</span>}<span className={styles.cardCost} aria-label={`${card.cost} TP`}>{Array.from({ length: card.cost }, (_, index) => <i key={index} />)}<b>{card.cost} TP</b></span></span>
      <span className={styles.cardBody}><span className={styles.supportLabel}>{vietnamese ? "Hỗ trợ" : "Support"}</span><strong lang="en">{card.name}</strong><span className={styles.description}><Description text={card.description} /></span></span>
    </button>
    {open && <Dialog title={card.name} closeLabel={vietnamese ? "Đóng hộp thoại" : "Close dialog"} onClose={() => setOpen(false)}><div className={styles.cardDialog} lang={vietnamese ? "vi" : "en"}><p className={styles.supportLabel}>{vietnamese ? "Hỗ trợ" : "Support"} · {card.cost} TP</p><p className={styles.description}><Description text={card.description} /></p>{terms.map(tooltip => <section key={tooltip.id}><h3>{tooltip.title}</h3><p className={styles.description}><Description text={tooltip.desc} /></p></section>)}</div></Dialog>}
  </>;
}
