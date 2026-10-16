"use client";

import { useId, useState, type KeyboardEvent, type ReactNode } from "react";
import { critNote, dupes, equipment, fragments, partners, potentialAdvice, renoaSource, stats } from "../../data/wiki/guides/renoa";
import { GuideImage } from "./GuideImage";
import styles from "./RenoaBuildGuide.module.css";

type Props = { vietnamese: boolean };
type Translation = { en: string; vi: string };
const text = (en: string, vi: string): Translation => ({ en, vi });

const partnerNotes = [
  text("-", "-"),
  text("E4 Serithea is the Hunter Battle Pass partner who has outstanding passive stats featuring both Crit Rate and Crit Damage, both of which are high value. This makes E4 Serithea a suitable generic alternative or close contender with many E0+ signatures if you have her.", "Serithea E4 là Partner Hunter từ Battle Pass, sở hữu chỉ số nội tại nổi bật về cả Tỷ lệ Bạo kích và Sát thương Bạo kích. Vì vậy, nếu đã có cô ấy, Serithea E4 là lựa chọn thay thế đa dụng và có thể cạnh tranh với nhiều Partner trấn ở E0 trở lên."),
  text("-", "-"), text("-", "-"),
  text("If you don't have any of the options above Yuri is a fine completely F2P starting option for Renoa which also offers some utility and can be used on support characters after you upgrade out of her ensuring your investment isn't wasted.", "Nếu chưa có các lựa chọn trên, Yuri là Partner khởi đầu hoàn toàn miễn phí phù hợp với Renoa và còn cung cấp thêm tiện ích. Sau khi đổi sang Partner mạnh hơn, bạn có thể chuyển Yuri cho nhân vật hỗ trợ để tiếp tục tận dụng khoản đầu tư."),
  text("-", "-"),
];
const fragmentNotes = [
  text("A solid option for most Renoa builds as Dirge Bullets are considered 1 cost cards even when discarded granting them this Memory Fragment's Crit DMG boost. However this set usually loses out to the Crit Rate from Prelude to a Hero.", "Lựa chọn tốt cho hầu hết cách xây dựng Renoa: Dirge Bullet vẫn được tính là lá bài tiêu hao 1 điểm dù bị loại bỏ, nên nhận được Sát thương Bạo kích từ bộ này. Tuy nhiên, hiệu quả thường thấp hơn Tỷ lệ Bạo kích của Prelude to a Hero."),
  text("As a discard themed character Renoa has no issues activating Prelude to a Hero’s conditions allowing her to take advantage of its Crit Rate in all modes making it one of her best sets.", "Với lối chơi loại bỏ bài, Renoa dễ dàng kích hoạt điều kiện của Prelude to a Hero và tận dụng Tỷ lệ Bạo kích trong mọi chế độ. Đây là một trong những bộ phù hợp nhất với cô ấy."),
  text("A consistent, accessible damage option for Renoa which works across all builds and game modes. However, it loses out to 4P memory fragment sets with better optimized stats.", "Phương án tăng sát thương ổn định, dễ ghép và phù hợp với mọi cách xây dựng cũng như chế độ chơi. Tuy nhiên, bộ này kém hơn các bộ 4 món có chỉ số được tối ưu tốt."),
];
const dupeNotes = [
  text("Base performance of the character.", "Hiệu suất cơ bản của nhân vật."),
  text("Renoa’s first Ego unlocked increases the damage scaling on her Last-Ditch Assault card by +20% for each Dirge Bullet Discarded. This is a solid damage boost that can add up quickly due to how many Dirge Bullets Renoa is able to create.", "Ego đầu tiên tăng thêm 20% hệ số sát thương của Last-Ditch Assault với mỗi Dirge Bullet bị loại bỏ. Mức tăng này cộng dồn nhanh nhờ lượng lớn Dirge Bullet mà Renoa có thể tạo."),
  text("Renoa's next Ego grants access to creating a stronger Dirge Bullet for every 4 Dirge Bullets she creates. Dirge Bullet: Finale has a higher base damage of 200% and when moved to the Discard Pile, deals 160% Extra-Attack damage twice. This is a great Ego skill that pushes Renoa’s damage even higher.", "Cứ tạo 4 Dirge Bullet, Renoa sẽ tạo thêm một phiên bản mạnh hơn. Dirge Bullet: Finale có sát thương cơ bản 200%; khi chuyển vào chồng bài loại bỏ, nó gây 2 lần Đòn Đánh Thêm với hệ số 160%. Đây là mốc Ego mạnh, giúp tăng đáng kể sát thương."),
  text("Her third Ego node boosts her Ego Skill, increasing the damage dealt by an additional +200%. A substantial damage boost to her Ego skill, but otherwise relatively unremarkable.", "Ego thứ ba tăng thêm 200% sát thương cho kỹ năng Ego. Đây là mức tăng đáng kể cho riêng kỹ năng này, nhưng không tạo thay đổi lớn ở các phần khác."),
  text("The fourth Ego when unlocked grants Renoa 1 stack of Rose’s Resolve whenever Dirge Bullet is Discarded. Rose’s Resolve stacks up to 4 times and increases Renoa’s damage by 10% for each stack and is removed whenever a shuffle occurs. Another Ego that further pushes Renoa’s damage output.", "Mỗi lần loại bỏ Dirge Bullet, Renoa nhận 1 tầng Rose’s Resolve, tối đa 4 tầng. Mỗi tầng tăng 10% sát thương và toàn bộ hiệu ứng mất khi xáo bài. Đây là một mốc Ego tiếp tục nâng cao sát thương của Renoa."),
  text("This node increases the base and maximum level of their [Basic Card Upgrade], [Unique Card Upgrade] and [Common Card Upgrade] Potentials by 3. A solid potential boost for Renoa’s damage output.", "Tăng 3 cấp cơ bản và tối đa của các Tiềm năng Nâng cấp Bài Cơ bản, Nâng cấp Bài Độc quyền và Nâng cấp Bài Thường. Đây là mức nâng cấp hữu ích cho sát thương của Renoa."),
  text("Renoa’s final Ego point when unlocked now causes Renoa to do a 50% Extra-Attack to a random enemy whenever Dirge Bullet is drawn. This is a strong final Ego that helps slightly offset the downside of drawing unwanted Dirge Bullets. As this is an Extra-attack, this damage can be scaled as well.", "Ego cuối khiến Renoa gây Đòn Đánh Thêm 50% lên một kẻ địch ngẫu nhiên mỗi khi rút Dirge Bullet. Hiệu ứng giúp bù đắp phần nào bất lợi khi rút phải đạn không cần thiết; sát thương này cũng hưởng các hiệu ứng tăng Đòn Đánh Thêm."),
];

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

function VerticalTabs({ labels, best, label, children }: { labels: string[]; best: number; label: string; children: ReactNode[] }) {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const handleKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = event.key === "Home" ? 0 : event.key === "End" ? labels.length - 1 : event.key === "ArrowDown" || event.key === "ArrowRight" ? (index + 1) % labels.length : event.key === "ArrowUp" || event.key === "ArrowLeft" ? (index + labels.length - 1) % labels.length : null;
    if (next === null) return;
    event.preventDefault(); setSelected(next); document.getElementById(`${id}-tab-${next}`)?.focus();
  };
  return <div className={styles.verticalTabs}><div className={styles.tabList} role="tablist" aria-orientation="vertical" aria-label={label}>
    {labels.map((name, i) => <button key={name} type="button" role="tab" id={`${id}-tab-${i}`} aria-controls={`${id}-panel-${i}`} aria-selected={selected === i} tabIndex={selected === i ? 0 : -1} onClick={() => setSelected(i)} onKeyDown={event => handleKey(event, i)}>
      {i === best && <small>{label.startsWith("Trang") || label.startsWith("Sức") ? "TỐT NHẤT" : "BEST"}</small>}<span>{name}</span>
    </button>)}
  </div>{children.map((child, i) => <div key={labels[i]} className={styles.tabPanel} role="tabpanel" id={`${id}-panel-${i}`} aria-labelledby={`${id}-tab-${i}`} hidden={selected !== i} tabIndex={0}>{child}</div>)}</div>;
}

function Seasonal({ vietnamese }: Props) {
  const t = (en: string, vi: string) => vietnamese ? vi : en;
  return <VerticalTabs labels={[4, 3, 2, 1].map(n => `${t("Season", "Mùa")} ${n}`)} best={1} label={t("Seasonal powers", "Sức mạnh theo mùa")}>
    {[
      <div className={styles.prose} key="desire"><p><em>{t("Introduces Desire Cards. Desire Cards primarily give a strong passive buff by meeting Desire Thresholds (3/5/7), which requires multiple allies to also use decks made in Season 4.", "Giới thiệu Bài Khát vọng: những lá bài cung cấp hiệu ứng nội tại mạnh khi đạt các ngưỡng Khát vọng (3/5/7). Để đạt các ngưỡng này, nhiều đồng đội cũng cần dùng bộ bài được tạo trong Mùa 4.")}</em></p>
        <ul><li>{t("A common flexible setup is ", "Cách kết hợp linh hoạt thường dùng là ")}<strong><u>1 Claim / 1 Survival / 1 Inquiry</u></strong>{t(". You can also use ", ". Bạn cũng có thể dùng ")}<strong><u>3 X</u></strong>{t(" to reach a threshold more easily, or ", " để dễ đạt ngưỡng hơn, hoặc ")}<strong><u>2 X / 1 Inquiry</u></strong>{t(" to retain Sample Collection as the card effect. ", " để giữ hiệu ứng bài Sample Collection. ")}<strong>{t("The choice depends heavily on allied Desire Cards and your team’s goal.", "Lựa chọn phụ thuộc rất nhiều vào Bài Khát vọng của đồng đội và mục tiêu xây dựng đội.")}</strong></li></ul>
        <aside className={styles.callout}>{t("X is a placeholder for the desired threshold. For example, when aiming for 7 Claim, you might use ", "X đại diện cho loại Khát vọng mà bạn cần đạt ngưỡng. Ví dụ, khi hướng tới 7 Claim, bạn có thể dùng ")}<strong><u>2 Claim / 1 Inquiry</u></strong>.</aside>
      </div>,
      <div className={styles.prose} key="persona"><p><em>{t("Introduces Persona Cards and Engravings. Persona Cards enable powerful new playstyles and buffs or debuffs. Engravings apply effects to Persona Cards and equipment, similarly to Season 2 Refinements but with new effects.", "Giới thiệu Bài Persona và Khắc ấn. Bài Persona tạo lối chơi mới hoặc các hiệu ứng tăng cường, suy yếu mạnh. Khắc ấn áp dụng lên cả Bài Persona lẫn trang bị, hoạt động tương tự Tinh luyện Mùa 2 nhưng có hiệu ứng mới.")}</em></p>
        <ul><li>{t("For Attack Persona Cards, the common Card Engravings are ", "Với Bài Persona Tấn công, Khắc ấn Bài thường dùng là ")}<strong><em>{t("“For each Lux Engraving, apply 1 Mark to random enemies”", "“Với mỗi Khắc ấn Lux, gây 1 Dấu ấn lên kẻ địch ngẫu nhiên”")}</em></strong>{t(" or ", " hoặc ")}<strong><em>{t("“Attunement: Decrease Cost by 1 until used.”", "“Điều hòa: Giảm 1 tiêu hao cho tới khi sử dụng.”")}</em></strong>
          <ul><li>{t("For Skill Persona Cards, use ", "Với Bài Persona Kỹ năng, chọn ")}<strong><em>{t("“When this card is Discarded, activate this card”", "“Khi lá bài này bị loại bỏ, kích hoạt lá bài này”")}</em></strong>{t(" if the team can reliably discard it.", " nếu đội có cách chủ động loại bỏ lá bài.")}</li></ul></li>
          <li>{t("The common Equipment Engraving is ", "Khắc ấn Trang bị thường được ưu tiên là ")}<strong><em>{t("“When allies create 5 or more cards through abilities, +30% damage to this unit’s Extra Attacks (once per turn).”", "“Khi đồng đội tạo ít nhất 5 lá bài bằng kỹ năng, tăng 30% sát thương Đòn Đánh Thêm của nhân vật này (1 lần mỗi lượt).”")}</em></strong> <strong><u>{t("This effect stacks.", "Hiệu ứng này cộng dồn.")}</u></strong>{t(" Other damage effects remain usable, but are considerably weaker for Extra Attack units.", " Các hiệu ứng tăng sát thương khác vẫn dùng được, nhưng kém hơn đáng kể đối với nhân vật dùng Đòn Đánh Thêm.")}</li></ul>
      </div>,
      <div className={styles.prose} key="refinements"><p><em>{t("Introduces Refinements: additional equipment effects with no Faint Memory cost after Season 2. God’s Hammer adds a random copy of another equipment effect, costs 10 Faint Memory and is only obtained from the boss.", "Giới thiệu Tinh luyện: bổ sung hiệu ứng trang bị mà không tốn Ký ức Mờ nhạt sau Mùa 2. Búa Thần thêm một bản sao ngẫu nhiên của hiệu ứng trang bị khác, tốn 10 Ký ức Mờ nhạt và chỉ nhận được từ trùm.")}</em></p>
        <ul>{[t("Increase Attack Card damage by 20%.", "Tăng 20% sát thương Bài Tấn công."), t("Increase damage of Attack Cards costing 1 or less by 30%.", "Tăng 30% sát thương Bài Tấn công có tiêu hao từ 1 trở xuống."), t("Increase Extra Attack damage by 25%.", "Tăng 25% sát thương Đòn Đánh Thêm.")].map(value => <li key={value}><strong><em>{value}</em></strong></li>)}</ul>
        <aside className={`${styles.callout} ${styles.warning}`}>{t("God’s Hammer is completely random at the end of the run, so there is no specific recommendation. ATK-based attackers generally prefer ATK% equipment effects; DEF-based attackers prefer DEF%.", "Búa Thần hoàn toàn ngẫu nhiên ở cuối lượt khám phá, nên không có lựa chọn cụ thể để khuyến nghị. Nhân vật gây sát thương theo Tấn công thường ưu tiên hiệu ứng Tấn công%; nhân vật gây sát thương theo Phòng thủ ưu tiên Phòng thủ%.")}</aside>
      </div>,
      <div className={styles.prose} key="forbidden"><p><em>{t("Introduces Forbidden Cards, powerful cards that create new synergies. They can only be acquired once per run, with duplication available through one event or save data editing.", "Giới thiệu Bài Cấm, những lá bài mạnh tạo ra cách phối hợp mới. Mỗi lượt khám phá chỉ nhận được một lần; có thể nhân bản qua một sự kiện hoặc chỉnh sửa dữ liệu lưu.")}</em></p>
        <ul>{[
          ["Gesture of Freedom", t("Permanent cost reduction for one card; the target can be controlled.", "Giảm tiêu hao vĩnh viễn cho một lá bài; có thể chủ động chọn mục tiêu.")],
          ["Portrait of Fury", t("More draw and damage.", "Tăng mạnh khả năng rút bài và tăng sát thương.")],
          ["Ecstasy of Violence", t("More damage.", "Tăng sát thương.")],
          ["Eternal Hunger", t("More draw and much more AP. Depends on allies.", "Tăng khả năng rút bài và tăng mạnh Điểm Hành động. Phụ thuộc đồng đội.")],
        ].map(([name, note]) => <li key={name}><strong>{t("Forbidden", "Bài Cấm")}: <u>{name}</u>.</strong> <em>{note}</em></li>)}</ul>
      </div>,
    ]}
  </VerticalTabs>;
}

export function RenoaBuild({ vietnamese }: Props) {
  const t = (en: string, vi: string) => vietnamese ? vi : en;
  const localize = (value: Translation) => value[vietnamese ? "vi" : "en"];
  return <div className={styles.guide}>
    <h2 className={styles.heading}>{t("RENOA BUILD", "XÂY DỰNG RENOA")}</h2>
    <Section eyebrow={t("Partners", "Đối tác")} title={t("Renoa Best Partners", "Đối tác tốt nhất cho Renoa")} artwork="Renoa artwork">
      <div className={styles.rankTable} role="table" aria-label={t("Partner rankings", "Xếp hạng Đối tác")}>
        <div className={styles.rankHead} role="row"><span role="columnheader">#</span><span role="columnheader">{t("Partner", "Đối tác")}</span><span role="columnheader">{t("Performance", "Hiệu suất")}</span><span role="columnheader">{t("Notes", "Nhận xét")}</span></div>
        {partners.map((partner, i) => <div className={styles.rankRow} role="row" key={partner.name}>
          <span className={styles.rankNumber} role="cell">{i + 1}</span><div className={`${styles.partner} ${partner.name.startsWith("Akad") ? styles.partnerGold : partner.name.startsWith("Yuri") ? styles.partnerBlue : ""}`} role="cell"><GuideImage name={partner.name} className={styles.partnerIcon} /><strong>{partner.name.replace(/ E\d$/, "")}</strong><small>{partner.name.match(/E\d$/)?.[0]}</small></div>
          <strong className={styles.performance} role="cell">{partner.score}</strong><div className={styles.notes} role="cell">{localize(partnerNotes[i])}</div>
        </div>)}
      </div>
    </Section>
    <Section eyebrow={t("Memory Fragments", "Mảnh Ký ức")} title={t("Renoa Fragment Ranking", "Xếp hạng Mảnh Ký ức cho Renoa")} artwork="Conquerer's Aspect">
      <div className={styles.rankTable} role="table" aria-label={t("Fragment rankings", "Xếp hạng Mảnh Ký ức")}>
        <div className={styles.rankHead} role="row"><span role="columnheader">#</span><span role="columnheader">{t("Set", "Bộ")}</span><span role="columnheader">{t("Performance", "Hiệu suất")}</span><span role="columnheader">{t("Notes", "Nhận xét")}</span></div>
        {[fragments[1], fragments[0], fragments[2]].map((fragment, i) => <div className={styles.rankRow} role="row" key={fragment.name}><span className={styles.rankNumber} role="cell">{i + 1}</span><div className={styles.fragmentChain} role="cell">{fragment.name.split(" + ").map(name => name.startsWith("Flex") ? <span className={styles.flex} key={name}>{t("Flex", "Tùy chọn")}</span> : <Item key={name} name={name} kind="fragment" vietnamese={vietnamese} />)}</div><strong className={styles.performance} role="cell">{fragment.score}</strong><div className={styles.notes} role="cell">{localize(fragmentNotes[i])}</div></div>)}
      </div>
    </Section>
    <Section eyebrow={t("Main Stats", "Chỉ số chính")} title={t("Renoa Stats", "Chỉ số Renoa")}>
      <div className={styles.stats}>{stats.slice(0, 3).map((stat, i) => <div className={styles.stat} key={stat.name}><span>{vietnamese ? ["Lý tưởng", "Khát vọng", "Tưởng tượng"][i] : stat.name}</span><p>{vietnamese ? ["Tỷ lệ Bạo kích > Sát thương Bạo kích", "Sát thương Hư vô% > Tấn công%", "Tấn công%"][i] : stat.value}</p></div>)}</div>
      <div className={`${styles.stat} ${styles.substats}`}><span>{t("Substats", "Chỉ số phụ")}</span><p>{t(stats[3].value, "Sát thương Đòn Đánh Thêm% ≥ Tỷ lệ Bạo kích% > Sát thương Bạo kích% > Tấn công > Tấn công%")}</p></div>
      <div className={styles.investmentNote}>{localize(critNote)}</div>
    </Section>
    <Section eyebrow={t("Investment", "Đầu tư")} title={t("Renoa Potential Priority", "Ưu tiên Tiềm năng của Renoa")}>
      <div className={styles.investmentNote}><p>{t("Renoa’s Potentials all increase her damage, with none offering mechanical changes.", "Các Tiềm năng của Renoa đều tăng sát thương, không thay đổi cơ chế vận hành.")}</p><ul>{[potentialAdvice[0], potentialAdvice[2], potentialAdvice[1]].map(item => <li key={item.name}><strong>{item.name}:</strong> {localize(item.note)}</li>)}</ul></div>
    </Section>
    <Section eyebrow={t("Equipment", "Trang bị")} title={t("Renoa Equipment", "Trang bị của Renoa")}>
      <VerticalTabs labels={equipment.map((item, i) => (vietnamese ? item.name.replace("Swamp", "Đầm lầy").replace("Season", "Mùa") : item.name).replace(" · ", ": ") + (i === 1 ? t(" (Current)", " (Hiện tại)") : ""))} best={0} label={t("Equipment groups", "Trang bị theo khu vực")}>
        {equipment.map(item => <div className={styles.equipmentColumns} key={item.name}>{[
          { title: t("Weapons", "Vũ khí"), entries: item.weapons },
          { title: t("Armor", "Giáp"), entries: item.armor },
          { title: t("Trinkets", "Phụ kiện"), entries: item.trinkets },
        ].map(group => <div key={group.title}><h4>{group.title}</h4><div className={styles.equipmentItems}>{group.entries.map(name => <Item key={name} name={name} />)}</div></div>)}</div>)}
      </VerticalTabs>
    </Section>
    <Section eyebrow={t("Seasonal", "Theo mùa")} title={t("Renoa Seasonal Powers", "Sức mạnh theo mùa của Renoa")}><Seasonal vietnamese={vietnamese} /></Section>
    <Section eyebrow={t("Dupes", "Bản sao")} title={t("Renoa Dupes", "Bản sao Renoa")}>
      <div className={styles.dupeTable} role="table" aria-label={t("Manifest Ego performance", "Hiệu suất Manifest Ego")}><div className={styles.dupeHead} role="row"><span role="columnheader">{t("Dupe", "Bản sao")}</span><span role="columnheader">{t("Performance", "Hiệu suất")}</span><span role="columnheader">{t("Notes", "Nhận xét")}</span></div>
        {dupes.map((dupe, i) => <div className={styles.dupeRow} role="row" key={dupe.name}><strong role="cell">{i ? `Ego ${i}` : t("Base", "Cơ bản")}</strong><strong role="cell">{i ? dupe.score : "—"}</strong><div role="cell">{localize(dupeNotes[i])}</div></div>)}
      </div>
    </Section>
    <p className={styles.source}>{t("Source", "Nguồn")}: <a href={renoaSource.url} target="_blank" rel="noreferrer">{renoaSource.name}</a> · <time dateTime={renoaSource.updated}>15/03/2026</time></p>
  </div>;
}
