import Image from "next/image";
import type { CharacterDetail, CharacterSummary } from "../../lib/wiki/types";
import styles from "./CombatantWorkspace.module.css";
import { RenoaContent } from "./RenoaContent";

export function CombatantDetail({ summary, detail }: { summary: CharacterSummary; detail?: CharacterDetail }) {
  const assets = "/assets/common";
  const hasJobIcon = ["striker", "knight", "ranger", "hunter", "psionic", "controller", "defender"].includes(summary.job);
  const face = summary.id === "1041" ? "/assets/combatant/face_character_1041.webp" : summary.portrait;
  return <article className={styles.combatantDetail}>
    <header className={styles.detailHeader}>
      <div className={styles.face}>
        <Image className={styles.facePortrait} src={face} alt={`${summary.name} portrait`} width={104} height={104} unoptimized />
        <Image className={styles.faceFrame} src={`${assets}/img_profile_wrap-CTTH6v0z.png`} alt="" fill sizes="120px" unoptimized />
      </div>
      <div className={styles.identity}>
        <div className={styles.meta}>
          <span><Image src={`${assets}/icon_type_ego_${summary.ego}.png`} alt="" width={24} height={24} unoptimized />{summary.ego === "creed" ? "Void" : summary.ego}</span>
          <span>{hasJobIcon ? <Image src={`${assets}/icon_type_job_${summary.job}.png`} alt="" width={24} height={24} unoptimized /> : <span className={styles.jobFallback} aria-hidden="true">◆</span>}{summary.job}</span>
        </div>
        <div className={styles.nameRow}><h1>{summary.name}</h1><span className={styles.rarityStars} aria-label={`${summary.rarity} stars`}>{Array.from({ length: summary.rarity }, (_, index) => <Image key={index} src="/assets/combatant/combatant-rarity.png" alt="" width={24} height={24} unoptimized />)}</span></div>
        <p>{detail?.info?.title ? String(detail.info.title) : detail ? "Poet of the Black Rose." : `${summary.rarity}-star ${summary.job} combatant`}</p>
      </div>
      {detail && <div className={styles.actions} aria-label="Source actions unavailable offline">
        <span title="Town Visit unavailable offline"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 0 1 18 0Z" /><circle cx="12" cy="10" r="3" /></svg><b>Town Visit</b></span>
      </div>}
    </header>
    {detail ? <RenoaContent detail={detail} /> : <section className={styles.missing}><h2>Detail not available</h2><p>The saved E7BOT snapshot has a summary for {summary.name}, but no detailed kit or cards.</p></section>}
  </article>;
}
