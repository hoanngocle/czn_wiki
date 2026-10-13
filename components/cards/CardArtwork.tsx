"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import type { Card } from "../../lib/wiki/types";
import styles from "./GameCard.module.css";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

function getReducedMotion() {
  return window.matchMedia(reducedMotionQuery).matches;
}

export function CardArtwork({ card, animationEnabled, visible = false }: { card: Card; animationEnabled: boolean; visible?: boolean }) {
  const container = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [onscreen, setOnscreen] = useState(visible);
  const reduced = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => true);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (visible || !container.current) return;
    const observer = new IntersectionObserver(([entry]) => setOnscreen(entry.isIntersecting), { threshold: .2 });
    observer.observe(container.current);
    return () => observer.disconnect();
  }, [visible]);
  useEffect(() => {
    if (!video.current) return;
    if (reduced || !animationEnabled || !onscreen) video.current.pause();
    else video.current.play().catch(() => setFailed(true));
  }, [reduced, animationEnabled, onscreen]);
  return <div ref={container} className={styles.artwork}>
    {card.artwork ? <Image src={card.artwork} alt="" fill sizes="(max-width: 767px) 164px, 172px" unoptimized /> : <span className={styles.artFallback}>Artwork unavailable</span>}
    {animationEnabled && onscreen && card.video && !failed && <video ref={video} src={card.video} poster={card.artwork ?? undefined} autoPlay={!reduced} muted loop playsInline aria-hidden="true" className={reduced ? styles.videoHidden : styles.video} onError={() => setFailed(true)} />}
  </div>;
}
