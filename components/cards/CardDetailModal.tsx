"use client";

import { useState } from "react";
import type { Card } from "../../lib/wiki/types";
import { Dialog } from "../ui/Dialog";
import { Description } from "./Description";
import { GameCard } from "./GameCard";
import styles from "./CardDetailModal.module.css";

export function CardDetailModal({ card, initialId, animationEnabled, onClose }: { card: Card; initialId: string; animationEnabled: boolean; onClose: () => void }) {
  const cards = [card, ...card.variants];
  const [selected, setSelected] = useState(cards.find((item) => item.id === initialId) ?? card);
  return <Dialog title={card.name} onClose={onClose} immersive>
    <div className={styles.grid}>{cards.map((variant, index) => <div className={styles.variant} key={variant.id}>
      <div className={styles.card}><GameCard card={variant} animationEnabled={animationEnabled && selected.id === variant.id} portraitOnly={false} onClick={() => setSelected(variant)} /></div>
      <button type="button" className={styles.label} aria-label={index === 0 ? "Base" : variant.id.endsWith("_pot") ? "Potential" : variant.id.endsWith("_lbk") ? "Ego Upgrade" : `Epiphany ${index}`} aria-pressed={selected.id === variant.id} onClick={() => setSelected(variant)}>{index === 0 ? "Base Card" : variant.id.endsWith("_pot") ? "Potential" : variant.id.endsWith("_lbk") ? "Ego Upgrade" : "Epiphany"}</button>
      {(variant.talent.length > 0 || variant.tooltips.length > 0) && <details className={styles.keywords}><summary>Keywords</summary>{[...variant.talent, ...variant.tooltips].map((term) => <p key={term.id}><strong>{term.title}</strong> — <Description text={term.desc} /></p>)}</details>}
    </div>)}</div>
  </Dialog>;
}
