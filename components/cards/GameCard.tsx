"use client";

import Image from "next/image";
import type { Card } from "../../lib/wiki/types";
import { CardArtwork } from "./CardArtwork";
import { Description } from "./Description";
import { useCardHover } from "./useCardHover";
import { CardTooltip } from "./CardTooltip";
import { useCardTooltip } from "./useCardTooltip";
import styles from "./GameCard.module.css";
import { label } from "../../lib/wiki/labels";

const base = "/assets/card";

export function GameCard({ card, animationEnabled, vietnameseEnabled = false, onClick }: { card: Card; animationEnabled: boolean; vietnameseEnabled?: boolean; onClick: () => void }) {
  const { cardRef: hoverRef, surfaceRef } = useCardHover();
  const tooltip = useCardTooltip();
  const rarity = card.rarity.replace("RARITY_", "").toLowerCase();
  const category = card.category.replace("CARD_", "").toLowerCase();
  const categoryLabels: Record<string, string> = { atk: "Attack", skill: "Skill", power: "Upgrade", collapse: "Collapse" };
  const categoryLabel = label(categoryLabels[category] ?? category, vietnameseEnabled);
  return <><span ref={surfaceRef} className={styles.cardSurface}
    onPointerEnter={event => { if (event.pointerType !== "touch") tooltip.show(); }}
    onPointerLeave={tooltip.hide}
    onPointerCancel={tooltip.hide}>
    <button ref={hoverRef} type="button" className={styles.card} data-animation={animationEnabled} data-rarity={rarity} aria-label={`${card.name} card`}
    aria-describedby={tooltip.open ? tooltip.id : undefined}
    onFocus={tooltip.onFocus}
    onBlur={tooltip.hide}
    onClick={() => { tooltip.hide(); onClick(); }}>
    <CardArtwork card={card} animationEnabled={animationEnabled} vietnamese={vietnameseEnabled} />
    {rarity !== "unknown" && <Image className={styles.frame} src={`${base}/card_rarity_${rarity}.webp`} alt="" width={14} height={37} unoptimized />}
      <div className={styles.top}><strong className={styles.cost}>{card.costLabel === "Unactivatable" ? "—" : card.cost === -1 ? "X" : card.cost}</strong><span className={styles.title}>{card.name}</span><span className={styles.category}>{["atk", "skill", "power", "collapse"].includes(category) && <Image src={`${base}/icon_category_card_${category}.webp`} alt="" width={13} height={13} unoptimized />}{categoryLabel}</span></div>
      <div className={styles.description}>{card.costLabel && <div className={styles.talents}>{card.costLabel === "Unactivatable" ? "Unactivatable" : `${card.costLabel} ${card.cost}`}</div>}{card.talent.length > 0 && <div className={styles.talents}>[{card.talent.map((talent) => talent.title).join("/")}]</div>}<Description text={card.description} /></div>
    <span className={styles.shine} aria-hidden="true" />
    <span className={styles.holo} aria-hidden="true" />
  </button></span>
    {tooltip.mounted && <CardTooltip card={card} vietnamese={vietnameseEnabled} id={tooltip.id} anchor={surfaceRef} open={tooltip.open} replaced={tooltip.replaced} onClose={tooltip.hide} />}
  </>;
}
