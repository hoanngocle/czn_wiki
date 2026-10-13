import Image from "next/image";
import type { CharacterDetail, CharacterSummary } from "../../lib/wiki/types";
import styles from "./CombatantWorkspace.module.css";
import { RenoaContent } from "./RenoaContent";

export function CombatantDetail({ summary, detail }: { summary: CharacterSummary; detail?: CharacterDetail }) {
  return <article className={styles.combatantDetail}>
    <header className={styles.detailHeader}><div className={styles.face}><Image src={summary.portrait} alt="" fill sizes="110px" unoptimized /></div><div><div className={styles.meta}><span>{summary.ego === "creed" ? "Void" : summary.ego}</span><span>{summary.job}</span></div><h1>{summary.name} <small>{"▲".repeat(summary.rarity)}</small></h1><p>{detail?.info?.title ? String(detail.info.title) : detail ? "Poet of the Black Rose." : `${summary.rarity}-star ${summary.job} combatant`}</p></div>{detail && <div className={styles.actions} aria-label="Source actions unavailable offline"><span title="Counseling unavailable offline">▤ <b>Counseling</b></span><span title="Town Visit unavailable offline">◎ <b>Town Visit</b></span><span title="Share unavailable offline">⇧ <b>Share</b></span></div>}</header>
    {detail ? <RenoaContent detail={detail} /> : <section className={styles.missing}><h2>Detail not available</h2><p>The saved E7BOT snapshot has a summary for {summary.name}, but no detailed kit or cards.</p></section>}
  </article>;
}
