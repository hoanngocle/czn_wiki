"use client";

import { useLayoutEffect, useRef, type RefObject } from "react";
import { createPortal } from "react-dom";
import type { Card } from "../../lib/wiki/types";
import { getCardTerms } from "../../lib/wiki/card-terms";
import { Description } from "./Description";
import styles from "./CardTooltip.module.css";

const rarityNames: Record<string, string> = {
  RARITY_COMMON: "Common", RARITY_RARE: "Rare", RARITY_LEGEND: "Legendary", RARITY_UNIQUE: "Unique",
};

export function CardTooltip({ card, id, anchor, open, replaced, onClose }: {
  card: Card;
  id: string;
  anchor: RefObject<HTMLElement | null>;
  onClose: () => void;
  open: boolean;
  replaced: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const terms = getCardTerms(card);

  useLayoutEffect(() => {
    if (!open) return;
    function position() {
      if (!anchor.current || !ref.current) return;
      const rect = anchor.current.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= window.innerHeight || rect.right <= 0 || rect.left >= window.innerWidth) {
        onClose();
        return;
      }
      const { offsetWidth: width, offsetHeight: height } = ref.current;
      const gap = 15;
      const left = window.innerWidth - rect.right - gap < width && rect.left - gap >= width
        ? rect.left - width - gap : rect.right + gap;
      ref.current.style.left = `${Math.max(10, Math.min(left, window.innerWidth - width - 10))}px`;
      ref.current.style.top = `${Math.max(10, Math.min(rect.top + rect.height * .02, window.innerHeight - height - 10))}px`;
    }
    position();
    const observer = new ResizeObserver(position);
    if (ref.current) observer.observe(ref.current);
    window.addEventListener("resize", position);
    window.addEventListener("scroll", position, true);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", position);
      window.removeEventListener("scroll", position, true);
    };
  }, [anchor, onClose, open]);

  return createPortal(<div ref={ref} id={id} role="tooltip" aria-hidden={!open} data-open={open} data-replaced={replaced} className={styles.tooltip}>
    <div className={styles.item}><div className={styles.title}>Rarity</div><div>{rarityNames[card.rarity] ?? card.rarity}</div></div>
    {terms.map(term => <div className={styles.item} key={term.id}>
      <div className={styles.title}>{term.title}</div>
      <div><Description text={term.desc} /></div>
    </div>)}
  </div>, document.body);
}
