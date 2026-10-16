"use client";

import Image from "next/image";
import type { CharacterDetail, CharacterSummary } from "../../lib/wiki/types";
import styles from "./CombatantWorkspace.module.css";
import { CharacterContent } from "./CharacterContent";
import type { CharacterGuide } from "../../lib/wiki/character-guide";
import type { CharacterTranslation } from "../../data/wiki/translations";
import { label } from "../../lib/wiki/labels";
import { useStoredValue } from "../../lib/ui/storage";

export function CombatantDetail({ summary, detail, guide, translation }: { summary: CharacterSummary; detail?: CharacterDetail; guide?: CharacterGuide; translation?: CharacterTranslation }) {
  const vietnamese = useStoredValue("czn_combatant_vietnamese", "true") === "true";
  const assets = "/assets/common";
  const iconJob = summary.job === "vanguard" ? "knight" : summary.job;
  const hasJobIcon = ["striker", "knight", "ranger", "hunter", "psionic", "controller", "defender"].includes(iconJob);
  const face = guide?.portrait ?? summary.portrait;
  const egoLabels: Record<string, string> = { creed: "Void", instinct: "Instinct", love: "Passion", norms: "Order", narcissism: "Justice" };
  return <article className={styles.combatantDetail}>
    <header className={styles.detailHeader}>
      <div className={styles.face}>
        <Image className={styles.facePortrait} src={face} alt={vietnamese ? `Chân dung ${summary.name}` : `${summary.name} portrait`} width={104} height={104} unoptimized />
        <Image className={styles.faceFrame} src={`${assets}/img_profile_wrap-CTTH6v0z.png`} alt="" fill sizes="120px" unoptimized />
      </div>
      <div className={styles.identity}>
        <div className={styles.meta}>
          <span><Image src={`${assets}/icon_type_ego_${summary.ego}.png`} alt="" width={24} height={24} unoptimized />{label(egoLabels[summary.ego] ?? summary.ego, vietnamese)}</span>
          <span>{hasJobIcon ? <Image src={`${assets}/icon_type_job_${iconJob}.png`} alt="" width={24} height={24} unoptimized /> : <span className={styles.jobFallback} aria-hidden="true">◆</span>}{label(summary.job.charAt(0).toUpperCase() + summary.job.slice(1), vietnamese)}</span>
        </div>
        <div className={styles.nameRow}><h1>{summary.name}</h1><span className={styles.rarityStars} aria-label={`${summary.rarity} ${vietnamese ? "sao" : "stars"}`}>{Array.from({ length: summary.rarity }, (_, index) => <Image key={index} src="/assets/combatant/combatant-rarity.png" alt="" width={24} height={24} unoptimized />)}</span></div>
        <p>{guide ? guide.subtitle[vietnamese ? "vi" : "en"] : !vietnamese && detail?.info?.title ? String(detail.info.title) : `${summary.rarity} ${vietnamese ? "sao" : "stars"}`}</p>
      </div>
      {detail && <div className={styles.actions} aria-label={vietnamese ? "Chức năng nguồn không khả dụng ngoại tuyến" : "Source actions unavailable offline"}>
        <span title={vietnamese ? "Thăm thị trấn không khả dụng ngoại tuyến" : "Town Visit unavailable offline"}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 0 1 18 0Z" /><circle cx="12" cy="10" r="3" /></svg><b>{vietnamese ? "Thăm thị trấn" : "Town Visit"}</b></span>
      </div>}
    </header>
    {detail ? <CharacterContent detail={detail} guide={guide} translation={translation} /> : <section className={styles.missing}><h2>{vietnamese ? "Chưa có thông tin chi tiết" : "Detail not available"}</h2><p>{vietnamese ? `Bản lưu E7BOT có thông tin tổng quan về ${summary.name}, nhưng chưa có kỹ năng và thẻ bài chi tiết.` : `The saved E7BOT snapshot has a summary for ${summary.name}, but no detailed kit or cards.`}</p></section>}
  </article>;
}
