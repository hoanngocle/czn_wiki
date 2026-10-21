"use client";

import type { ReactNode } from "react";
import { VerticalTabs } from "./GuideTabs";
import { useCharacterGuide } from "./CharacterGuideContext";
import { seasonalGuideExtensions } from "./guide-extensions";
import { GuideImage } from "./GuideImage";
import { label, preserveGameTermNames } from "../../lib/wiki/labels";
import styles from "./RenoaBuildGuide.module.css";

type Props = { vietnamese: boolean };
type Translation = { en: string; vi: string };
function Section({ eyebrow, title, artwork, children }: { eyebrow: string; title: string; artwork?: string; children: ReactNode }) {
  return <section className={styles.section}><header className={`${styles.sectionTitle} ${artwork ? styles.withArtwork : ""}`}>
    {artwork && <GuideImage name={artwork} className={styles.bannerArtwork} />}
    <span>{eyebrow}</span><h3>{title}</h3>
  </header><div className={styles.body}>{children}</div></section>;
}

function Item({ name, kind = "equipment", vietnamese = false }: { name: string; kind?: "equipment" | "fragment"; vietnamese?: boolean }) {
  const cleanName = name.replace(/ \(\d\)$/, "");
  const pieces = name.match(/\((\d)\)$/)?.[1];
  const purple = ["Criticism of Discord", "Tentacles of Chaos", "Verdant Shackles", "Sphere of Randomness", "Shell Bug Horn", "Fragment of the Empty Void"].includes(cleanName);
  return <span className={`${styles.item} ${kind === "fragment" ? styles.fragment : purple ? styles.purple : styles.orange}`}>
    <GuideImage name={cleanName} className={styles.itemIcon} /><span>{cleanName}{pieces && <small> [{pieces}{vietnamese ? " món" : "-PC"}]</small>}</span>
  </span>;
}

export function CharacterBuild({ vietnamese }: Props) {
  const { guide } = useCharacterGuide();
  const { partners, fragments, stats, critNote, potentialAdvice, equipment, dupes, source: renoaSource } = guide!;
  const Seasonal = seasonalGuideExtensions[guide!.characterId];
  const t = (en: string, vi: string) => vietnamese ? preserveGameTermNames(vi) : en;
  const localize = (value: Translation) => vietnamese ? preserveGameTermNames(value.vi) : value.en;
  return <div className={styles.guide}>
    {renoaSource.note && <p className={styles.investmentNote}>{localize(renoaSource.note)}</p>}
    <h2 className={styles.heading}>{t(`${guide!.name} BUILD`, `XÂY DỰNG ${guide!.name}`)}</h2>
    {Boolean(guide!.buildAdvice?.length) && <Section eyebrow="Build" title={t("Build priorities", "Ưu tiên xây dựng")}>
      <div className={styles.prose}>{guide!.buildAdvice!.map(item => <section key={item.title.en}><h4>{localize(item.title)}</h4><p>{localize(item.body)}</p></section>)}</div>
    </Section>}
    {partners.length > 0 && <Section eyebrow={t("Partners", "Đối tác")} title={t(`${guide!.name} Best Partners`, `Đối tác tốt nhất cho ${guide!.name}`)} artwork={`${guide!.name} artwork`}>
      <div className={styles.rankTable} role="table" aria-label={t("Partner rankings", "Xếp hạng Đối tác")}>
        <div className={styles.rankHead} role="row"><span role="columnheader">#</span><span role="columnheader">{t("Partner", "Đối tác")}</span><span role="columnheader">{t("Performance", "Hiệu suất")}</span><span role="columnheader">{t("Notes", "Nhận xét")}</span></div>
        {partners.map((partner, i) => <div className={styles.rankRow} role="row" key={partner.name}>
          <span className={styles.rankNumber} role="cell">{i + 1}</span><div className={`${styles.partner} ${partner.name.startsWith("Akad") ? styles.partnerGold : partner.name.startsWith("Yuri") ? styles.partnerBlue : ""}`} role="cell"><GuideImage name={partner.name} className={styles.partnerIcon} /><strong>{partner.name.replace(/ E\d$/, "")}</strong><small>{partner.name.match(/E\d$/)?.[0]}</small></div>
          <strong className={styles.performance} role="cell">{partner.score}</strong><div className={styles.notes} role="cell">{localize(partner.note)}</div>
        </div>)}
      </div>
    </Section>}
    {fragments.length > 0 && <Section eyebrow={t("Memory Fragments", "Mảnh Ký ức")} title={t(`${guide!.name} Fragment Ranking`, `Xếp hạng Mảnh Ký ức cho ${guide!.name}`)} artwork={fragments[0]?.name.split(" (")[0]}>
      <div className={styles.rankTable} role="table" aria-label={t("Fragment rankings", "Xếp hạng Mảnh Ký ức")}>
        <div className={styles.rankHead} role="row"><span role="columnheader">#</span><span role="columnheader">{t("Set", "Bộ")}</span><span role="columnheader">{t("Performance", "Hiệu suất")}</span><span role="columnheader">{t("Notes", "Nhận xét")}</span></div>
        {fragments.map((fragment, i) => <div className={styles.rankRow} role="row" key={fragment.name}><span className={styles.rankNumber} role="cell">{i + 1}</span><div className={styles.fragmentChain} role="cell">{fragment.name.split(" + ").map(name => name.startsWith("Flex") ? <span className={styles.flex} key={name}>{t("Flex", "Tùy chọn")}</span> : <Item key={name} name={name} kind="fragment" vietnamese={vietnamese} />)}</div><strong className={styles.performance} role="cell">{fragment.score}</strong><div className={styles.notes} role="cell">{localize(fragment.note)}</div></div>)}
      </div>
    </Section>}
    {(stats.length > 0 || critNote.en) && <Section eyebrow={t("Main Stats", "Chỉ số chính")} title={t(`${guide!.name} Stats`, `Chỉ số ${guide!.name}`)}>
      <div className={styles.stats}>{stats.slice(0, 3).map((stat) => <div className={styles.stat} key={stat.name.en}><span>{stat.name.en}</span><p>{stat.value.en}</p></div>)}</div>
      {stats.slice(3).map(stat => <div className={`${styles.stat} ${styles.substats}`} key={stat.name.en}><span>{stat.name.en}</span><p>{stat.value.en}</p></div>)}
      <div className={styles.investmentNote}>{localize(critNote)}</div>
    </Section>}
    <Section eyebrow={t("Investment", "Đầu tư")} title={t(`${guide!.name} Potential`, `Tiềm năng của ${guide!.name}`)}>
      <div className={styles.investmentNote}><p>{localize(guide!.potentialIntro)}</p><ul>{potentialAdvice.map(item => <li key={item.name}><strong>{label(item.name, vietnamese)}:</strong> {localize(item.note)}</li>)}</ul></div>
    </Section>
    {equipment.length > 0 && <Section eyebrow={t("Equipment", "Trang bị")} title={t(`${guide!.name} Equipment`, `Trang bị của ${guide!.name}`)}>
      <VerticalTabs vietnamese={vietnamese} labels={equipment.map(item => item.name.en)} best={0} label={t("Equipment groups", "Trang bị theo khu vực")}>
        {equipment.map(item => <div key={item.name.en}>{item.note && <p className={styles.investmentNote}>{localize(item.note)}</p>}<div className={styles.equipmentColumns}>{[
          { title: t("Weapons", "Vũ khí"), entries: item.weapons },
          { title: t("Armor", "Giáp"), entries: item.armor },
          { title: t("Trinkets", "Phụ kiện"), entries: item.trinkets },
        ].map(group => <div key={group.title}><h4>{group.title}</h4><div className={styles.equipmentItems}>{group.entries.map(name => <Item key={name} name={name} />)}</div></div>)}</div></div>)}
      </VerticalTabs>
    </Section>}
    {(Seasonal || guide!.seasonal.length > 0) && <Section eyebrow={t("Seasonal", "Theo mùa")} title={t(`${guide!.name} Seasonal Powers`, `Sức mạnh theo mùa của ${guide!.name}`)}>{guide!.seasonal.length === 0 && Seasonal ? <Seasonal vietnamese={vietnamese} /> : <div className={styles.prose}>{guide!.seasonal.map(item => <section key={item.name.en}><h4>{localize(item.name)}</h4><p>{localize(item.note)}</p></section>)}</div>}</Section>}
    {dupes.length > 0 && <Section eyebrow={t("Dupes", "Bản sao")} title={t(`${guide!.name} Dupes`, `Bản sao ${guide!.name}`)}>
      <div className={styles.dupeTable} role="table" aria-label={t("Manifest Ego performance", "Hiệu suất thức tỉnh Ego")}><div className={styles.dupeHead} role="row"><span role="columnheader">{t("Dupe", "Bản sao")}</span><span role="columnheader">{t("Performance", "Hiệu suất")}</span><span role="columnheader">{t("Notes", "Nhận xét")}</span></div>
        {dupes.map((dupe, i) => <div className={styles.dupeRow} role="row" key={dupe.name}><strong role="cell">{i ? `Ego ${i}` : t("Base", "Cơ bản")}</strong><strong role="cell">{i ? dupe.score : "—"}</strong><div role="cell">{localize(dupe.note)}</div></div>)}
      </div>
    </Section>}
    <p className={styles.source}>{t("Source", "Nguồn")}: <a href={renoaSource.url} target="_blank" rel="noreferrer">{renoaSource.name}</a>{renoaSource.updated && <> · <time dateTime={renoaSource.updated}>{renoaSource.updated.split("-").reverse().join("/")}</time></>}</p>
  </div>;
}
