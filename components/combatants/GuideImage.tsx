"use client";

import { useState } from "react";
import Image from "next/image";
import { useCharacterGuide } from "./CharacterGuideContext";
import guideStyles from "./RenoaGuide.module.css";
import styles from "./GuideImage.module.css";

export function GuideImage({ name = "", cardId, className = guideStyles.icon, alt = "" }: { name?: string; cardId?: string; className?: string; alt?: string }) {
  const { guide, cards } = useCharacterGuide();
  const card = cardId ? cards.get(cardId) : undefined;
  const asset = cardId ? (card?.artwork ? { src: card.artwork, width: 468, height: 680 } : undefined) : guide?.images[name];
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!asset || failedSrc === asset.src) {
    return <span className={`${className} ${styles.placeholder}`} data-image-placeholder={name} role={alt ? "img" : undefined} aria-label={alt || undefined} aria-hidden={alt ? undefined : true} style={{ aspectRatio: asset ? `${asset.width} / ${asset.height}` : undefined }}>
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect x="4" y="5" width="24" height="22" rx="3" /><circle cx="11" cy="12" r="2" /><path d="m5 23 8-8 5 5 4-4 5 7" /></svg>
    </span>;
  }

  return <Image className={className} src={asset.src} width={asset.width} height={asset.height} alt={alt} unoptimized onError={() => setFailedSrc(asset.src)} />;
}
