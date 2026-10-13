"use client";

import Image from "next/image";
import type { Card } from "../../lib/wiki/types";
import { CardArtwork } from "./CardArtwork";
import { Description } from "./Description";
import styles from "./GameCard.module.css";

const base = "/reference/e7bot/api/assets/file/czn/data/card";

export function GameCard({ card, animationEnabled, portraitOnly, onClick }: { card: Card; animationEnabled: boolean; portraitOnly: boolean; onClick: () => void }) {
  const rarity = card.rarity.replace("RARITY_", "").toLowerCase();
  const category = card.category.replace("CARD_", "").toLowerCase();
  return <button type="button" className={styles.card} data-rarity={rarity} aria-label={`${card.name} card`} onClick={onClick}>
    <CardArtwork card={card} animationEnabled={animationEnabled} />
    <Image className={styles.frame} src={`${base}/card_rarity_${rarity}.webp`} alt="" width={14} height={37} unoptimized />
    {!portraitOnly && <>
      <div className={styles.top}><strong className={styles.cost}>{card.cost}</strong><span className={styles.title}>{card.name}</span><span className={styles.category}>{["atk", "skill", "collapse"].includes(category) && <Image src={`${base}/icon_category_card_${category}.webp`} alt="" width={13} height={13} unoptimized />}{category === "atk" ? "Attack" : category === "skill" ? "Skill" : category === "power" ? "Upgrade" : category}</span></div>
      <div className={styles.description}>{card.talent.length > 0 && <div className={styles.talents}>[{card.talent.map((talent) => talent.title).join("/")}]</div>}<Description text={card.description} /></div>
    </>}
  </button>;
}
