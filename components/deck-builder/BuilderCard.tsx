"use client";

import Image from "next/image";
import { useRef } from "react";
import { Description } from "../cards/Description";
import { CardTooltip } from "../cards/CardTooltip";
import { useCardTooltip } from "../cards/useCardTooltip";
import type { BuilderCard as Card } from "../../lib/deck-builder/types";
import styles from "./DeckBuilder.module.css";

export function BuilderCard({ card, onClick, selected = false }: { card: Card; onClick: () => void; selected?: boolean }) {
  const anchor = useRef<HTMLButtonElement>(null);
  const tooltip = useCardTooltip();
  return <><button ref={anchor} type="button" className={`${styles.card} ${selected ? styles.selectedCard : ""}`} aria-label={`${card.name} card`} aria-pressed={selected} data-rarity={card.rarity}
    aria-describedby={tooltip.open ? tooltip.id : undefined}
    onPointerEnter={event => { if (event.pointerType !== "touch") tooltip.show(); }}
    onPointerLeave={tooltip.hide} onPointerCancel={tooltip.hide}
    onFocus={tooltip.onFocus} onBlur={tooltip.hide}
    onClick={() => { tooltip.hide(); onClick(); }}>
    {card.artwork ? <Image src={card.artwork} alt="" fill sizes="180px" unoptimized /> : <span className={styles.cardPlaceholder} aria-hidden="true">◇</span>}
    <span className={styles.cardTop}><b>{card.cost < 0 ? "X" : card.cost}</b><span><strong>{card.name}</strong><small>{card.category === "CARD_ATK" ? "Attack" : card.category === "CARD_POWER" ? "Upgrade" : "Skill"}</small></span></span>
    <span className={styles.cardDescription}>{card.talent.length > 0 && <strong className={styles.talent}>[{card.talent.map(t => t.title).join(" / ")}]<br /></strong>}<Description text={card.description} /></span>
    {card.id !== card.id.replace(/_(rsp[1-5]|pot|lbk)$/, "") && <span className={styles.variantBadge}>{card.id.split("_").at(-1)?.toUpperCase()}</span>}
  </button>
    {tooltip.mounted && <CardTooltip card={card} id={tooltip.id} anchor={anchor} open={tooltip.open} replaced={tooltip.replaced} onClose={tooltip.hide} />}
  </>;
}
