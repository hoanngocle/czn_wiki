"use client";

import { useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import type { PartnerDetail as Detail, PartnerMedia, PartnerSummary, PartnerTranslation } from "../../lib/wiki/partner-types";
import { localizePartner } from "../../lib/wiki/partner-localization";
import { label } from "../../lib/wiki/labels";
import { storeValue, useStoredValue } from "../../lib/ui/storage";
import { Description } from "../cards/Description";
import { PartnerJob, PartnerPortrait } from "./PartnerWorkspace";
import { PartnerSupportCard } from "./PartnerSupportCard";
import styles from "./Partners.module.css";

const tabs = ["profile", "skills", "stats", "images"] as const;
const tabLabels = { profile: ["Profile", "Hồ sơ"], skills: ["Skills", "Kỹ năng"], stats: ["Stats", "Chỉ số"], images: ["Images", "Hình ảnh"] };
const infoLabels: Record<string, string> = { "Race Type": "Chủng tộc", Birthday: "Sinh nhật", Specialty: "Sở trường", "CV (JP)": "Lồng tiếng (Nhật)", "CV (KR)": "Lồng tiếng (Hàn)" };
const languageKey = "czn_combatant_vietnamese";

export function PartnerDetail({ partner, detail: originalDetail, translation, media }: { partner: PartnerSummary; detail?: Detail; translation?: PartnerTranslation; media?: PartnerMedia }) {
  const vietnamese = useStoredValue(languageKey, "true") === "true";
  const detail = useMemo(() => originalDetail && vietnamese ? localizePartner(originalDetail, translation) : originalDetail, [originalDetail, translation, vietnamese]);
  const t = (en: string, vi: string) => vietnamese ? vi : en;
  const passives = detail?.passives ?? [];
  const levels = [...new Set(detail?.stats.map(stat => stat.level) ?? [])].sort((a, b) => a - b);
  const [passiveLevel, setPassiveLevel] = useState(Math.max(0, ...passives.map(passive => passive.level)));
  const [level, setLevel] = useState(levels.at(-1) ?? 1);
  const [breakthrough, setBreakthrough] = useState(true);
  const [tab, setTab] = useState<typeof tabs[number]>("profile");
  const tabId = useId();
  const tabButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const passive = passives.find(item => item.level === passiveLevel);
  const stats = detail?.stats.find(stat => stat.level === level && stat.breakthrough === breakthrough);
  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const target = event.key === "ArrowRight" ? (index + 1) % tabs.length : event.key === "ArrowLeft" ? (index + tabs.length - 1) % tabs.length : event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : null;
    if (target === null) return;
    event.preventDefault();
    setTab(tabs[target]);
    tabButtons.current[target]?.focus();
  };
  const panelProps = (value: typeof tabs[number]) => ({ id: `${tabId}-panel-${value}`, role: "tabpanel", "aria-labelledby": `${tabId}-tab-${value}`, hidden: tab !== value, tabIndex: 0 });

  return <article className={styles.partnerDetail} lang={vietnamese ? "vi" : "en"}>
    <header className={styles.detailHeader}>
      <div className={styles.face}><div className={styles.faceImage}><PartnerPortrait partner={partner} /></div><Image className={styles.faceFrame} src="/assets/common/img_profile_wrap-CTTH6v0z.png" alt="" fill sizes="120px" unoptimized /></div>
      <div className={styles.identity}><div className={styles.meta}><PartnerJob job={partner.job} /><span>{label(partner.job.charAt(0).toUpperCase() + partner.job.slice(1), vietnamese)}</span><span>{t("Partner", "Đối tác")}</span></div><div className={styles.nameRow}><h1>{partner.name}</h1><span className={styles.stars} aria-label={`${partner.rarity} ${t("stars", "sao")}`}>{Array.from({ length: partner.rarity }, (_, index) => <Image key={index} src="/assets/combatant/combatant-rarity.png" alt="" width={23} height={23} unoptimized />)}</span></div></div>
    </header>
    <div className={styles.detailTools}><label className={styles.languageToggle}><input type="checkbox" checked={vietnamese} onChange={event => storeValue(languageKey, String(event.target.checked))} />Tiếng Việt</label></div>
    {!detail ? <p className={styles.missing}>{t("Partner details are not available yet.", "Chưa có thông tin chi tiết về đối tác này.")}</p> : <>
      <div className={styles.tabs} role="tablist" aria-label={t("Partner details", "Thông tin đối tác")}>{tabs.map((value, index) => <button key={value} ref={element => { tabButtons.current[index] = element; }} id={`${tabId}-tab-${value}`} type="button" role="tab" aria-selected={tab === value} aria-controls={`${tabId}-panel-${value}`} tabIndex={tab === value ? 0 : -1} onClick={() => setTab(value)} onKeyDown={event => onTabKeyDown(event, index)}>{tabLabels[value][vietnamese ? 1 : 0]}</button>)}</div>
      <section {...panelProps("profile")} className={styles.tabPanel}>
        <div className={styles.profile}><h2>{t("Profile", "Hồ sơ")}</h2><div className={styles.profileBody}><p className={styles.description}><Description text={detail.profile} /></p>{detail.info.length > 0 && <dl className={styles.info}>{detail.info.map(item => <div key={item.label}><dt>{vietnamese ? infoLabels[item.label] ?? item.label : item.label}</dt><dd>{item.value}</dd></div>)}</dl>}</div></div>
      </section>
      <section {...panelProps("skills")} className={styles.tabPanel}>
        <div className={styles.abilities}>
          <section className={styles.cardSection} aria-label={t("Support card", "Bài hỗ trợ")}><h2>{t("Support Card", "Bài hỗ trợ")}</h2>{detail.card ? <PartnerSupportCard card={detail.card} vietnamese={vietnamese} /> : <p className={styles.muted}>{t("No support card available.", "Chưa có bài hỗ trợ.")}</p>}</section>
          <section className={styles.panel} aria-label={t("Passive", "Nội tại")}><div className={styles.sectionHeading}><h2>{t("Passive", "Nội tại")}</h2><div className={styles.levelButtons} aria-label={t("Passive level", "Cấp nội tại")}>{passives.map(item => <button key={item.level} aria-label={`${t("Level", "Cấp")} ${item.level}`} aria-pressed={item.level === passiveLevel} onClick={() => setPassiveLevel(item.level)}>{item.level}</button>)}</div></div>{passive ? <div className={styles.passive}><h3 className={styles.passiveTitle}>{passive.name}</h3>{passive.descriptions.map((description, index) => <p key={index} className={styles.description}><Description text={description} /></p>)}</div> : <p className={styles.muted}>{t("Passive details are not available.", "Chưa có thông tin nội tại.")}</p>}</section>
        </div>
      </section>
      <section {...panelProps("stats")} className={styles.tabPanel}>
        <div className={styles.sectionHeading}><h2>{t("Stats", "Chỉ số")}</h2><label className={styles.breakthrough}><input type="checkbox" checked={breakthrough} onChange={event => setBreakthrough(event.target.checked)} />{t("Breakthrough", "Đột phá")}</label></div>
        {levels.length > 0 ? <><div className={styles.levelControl}><label htmlFor={`${tabId}-level`}>{t("Level", "Cấp")}</label><select id={`${tabId}-level`} aria-label={t("Partner level", "Cấp đối tác")} value={level} onChange={event => setLevel(Number(event.target.value))}>{levels.map(value => <option key={value} value={value}>{value}</option>)}</select><span>/ {levels.at(-1)}</span></div>{stats ? <dl className={styles.stats}>{([[t("Attack", "Tấn công"), "attack"], [t("Defense", "Phòng thủ"), "defense"], [t("HP", "Máu"), "hp"]] as const).map(([statLabel, key]) => <div key={key}><dt>{statLabel}</dt><dd data-testid={`stat-${key}`}>{stats[key]}</dd></div>)}</dl> : <p className={styles.muted}>{t("Stats for this level and breakthrough state are not available.", "Chưa có chỉ số cho cấp và trạng thái đột phá này.")}</p>}</> : <p className={styles.muted}>{t("Stats are not available.", "Chưa có thông tin chỉ số.")}</p>}
      </section>
      <section {...panelProps("images")} className={styles.tabPanel}>
        <h2>{t("Images", "Hình ảnh")}</h2>
        <div className={styles.imageGallery}>
          {partner.portrait && <figure><div className={styles.galleryImage}><Image src={partner.portrait} alt={t(`${partner.name} portrait`, `Chân dung ${partner.name}`)} fill sizes="(max-width: 767px) 45vw, 260px" unoptimized /></div><figcaption>{t("Portrait", "Chân dung")}</figcaption></figure>}
          {detail.card?.artwork && <figure><div className={styles.galleryImage}><Image src={detail.card.artwork} alt={t(`Support card artwork: ${detail.card.name}`, `Ảnh bài hỗ trợ: ${detail.card.name}`)} fill sizes="(max-width: 767px) 45vw, 260px" unoptimized /></div><figcaption>{t("Support card artwork", "Ảnh bài hỗ trợ")} · <span lang="en">{detail.card.name}</span></figcaption></figure>}
        </div>
        {media?.artwork ? <figure className={styles.artwork}><div className={styles.fullArtwork}><Image src={media.artwork} alt={t(`Full artwork of ${partner.name}`, `Hình ảnh toàn thân của ${partner.name}`)} fill sizes="(max-width: 767px) 95vw, 700px" unoptimized /></div><figcaption><a href={media.artwork} target="_blank" rel="noreferrer">{t("View full image", "Xem ảnh đầy đủ")}</a></figcaption></figure> : <p className={styles.muted}>{t("Full artwork is not available yet.", "Chưa có hình ảnh toàn thân.")}</p>}
      </section>
    </>}
  </article>;
}
