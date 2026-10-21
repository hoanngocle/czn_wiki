"use client";

import { useState } from "react";
import type { Card } from "../../lib/wiki/types";
import type { CardReview } from "../../lib/wiki/character-guide";
import { label } from "../../lib/wiki/labels";
import { Dialog } from "../ui/Dialog";
import { GameCard } from "./GameCard";
import styles from "./CardDetailModal.module.css";

export function CardDetailModal({ card, initialId, animationEnabled, vietnameseEnabled = false, reviews = {}, onClose }: { card: Card; initialId: string; animationEnabled: boolean; vietnameseEnabled?: boolean; reviews?: Record<string, CardReview>; onClose: () => void }) {
  const t = (value: string) => label(value, vietnameseEnabled);
  const cards = [card, ...card.variants];
  const [selected, setSelected] = useState(cards.find((item) => item.id === initialId) ?? card);
  return <Dialog title={card.name} closeLabel={vietnameseEnabled ? "Đóng hộp thoại" : "Close dialog"} onClose={onClose} immersive>
    <div lang={vietnameseEnabled ? "vi" : "en"}>
    <div className={styles.grid}>{cards.map((variant, index) => {
      const advice = reviews[variant.id];
      const epiphanyNumber = variant.id.match(/_rsp([1-5])$/)?.[1];
      const epiphanyLabel = epiphanyNumber ? `${t("Epiphany")} ${["I", "II", "III", "IV", "V"][Number(epiphanyNumber) - 1]}` : t("Epiphany");
      return <div className={styles.variant} key={variant.id}>
      <div className={styles.card}><GameCard card={variant} animationEnabled={animationEnabled} vietnameseEnabled={vietnameseEnabled} onClick={() => setSelected(variant)} /></div>
      <button type="button" className={styles.label} aria-label={index === 0 && !epiphanyNumber ? t("Base") : variant.id.endsWith("_pot") ? t("Potential") : variant.id.endsWith("_lbk") ? t("Ego Upgrade") : `${t("Epiphany")} ${epiphanyNumber ?? index}`} aria-pressed={selected.id === variant.id} onClick={() => setSelected(variant)}>{index === 0 && !epiphanyNumber ? t("Base Card") : variant.id.endsWith("_pot") ? t("Potential") : variant.id.endsWith("_lbk") ? t("Ego Upgrade") : epiphanyLabel}</button>
      {advice && <div className={styles.review} role="note" aria-label={`${epiphanyLabel} · Prydwen`} lang={vietnameseEnabled ? "vi" : "en"}>
        <span className={styles.rating} role="img" aria-label={`Prydwen: ${advice.rating} / 5`}><span aria-hidden="true">{"★".repeat(advice.rating)}<span className={styles.emptyStars}>{"☆".repeat(5 - advice.rating)}</span></span></span>
        <p>{vietnameseEnabled ? advice.review.vi : advice.review.en}</p>
      </div>}
    </div>})}</div>
    </div>
  </Dialog>;
}
