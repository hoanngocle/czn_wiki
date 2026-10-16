"use client";

import { useState } from "react";
import Image from "next/image";
import images from "../../data/wiki/guides/renoa-images.json";
import guideStyles from "./RenoaGuide.module.css";
import styles from "./GuideImage.module.css";

export function GuideImage({ name, className = guideStyles.icon, alt = "" }: { name: string; className?: string; alt?: string }) {
  const key = name.replace(/ E\d+$| \(\d\)$| (?:I|II|III|IV|V)$/, "");
  const asset = (images as Record<string, { src: string; width: number; height: number }>)[key];
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!asset || failedSrc === asset.src) {
    return <span className={`${className} ${styles.placeholder}`} data-image-placeholder={name} role={alt ? "img" : undefined} aria-label={alt || undefined} aria-hidden={alt ? undefined : true} style={{ aspectRatio: asset ? `${asset.width} / ${asset.height}` : undefined }}>
      <svg viewBox="0 0 32 32" fill="none" aria-hidden="true"><rect x="4" y="5" width="24" height="22" rx="3" /><circle cx="11" cy="12" r="2" /><path d="m5 23 8-8 5 5 4-4 5 7" /></svg>
    </span>;
  }

  return <Image className={className} src={asset.src} width={asset.width} height={asset.height} alt={alt} unoptimized onError={() => setFailedSrc(asset.src)} />;
}
