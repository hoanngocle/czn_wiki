"use client";

import { useId, useState, type ReactNode } from "react";
import { GuideImage } from "./GuideImage";
import deckCards from "../../data/wiki/guides/renoa-deck-cards.json";
import deckCardsVi from "../../data/wiki/translations/vi/renoa-deck-cards.json";
import { cardAdvice, decks, renoaSource, review, synergies, teams, type GuideText } from "../../data/wiki/guides/renoa";
import styles from "./RenoaGuide.module.css";

export { RenoaBuild } from "./RenoaBuildGuide";

type Props = { vietnamese: boolean };
const localize = (value: GuideText | string, vietnamese: boolean) => typeof value === "string" ? value : value[vietnamese ? "vi" : "en"];

function ItemLabel({ name }: { name: string }) {
  return <span className={styles.itemLabel}><GuideImage name={name} /><span>{name}</span></span>;
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return <section className={styles.section}><h2>{title}</h2>{children}</section>;
}

export function GuideSource({ vietnamese }: Props) {
  return <p className={styles.source}>
    {vietnamese ? "Tổng hợp từ bản lưu " : "Summarized from the saved "}<a href={renoaSource.url} target="_blank" rel="noreferrer">{renoaSource.name}</a>
    {vietnamese ? " · Cập nhật nguồn: " : " · Source updated: "}<time dateTime={renoaSource.updated}>15/03/2026</time>
  </p>;
}

export function RenoaReview({ vietnamese }: Props) {
  const t = (value: GuideText | string) => localize(value, vietnamese);
  return <div className={styles.guide}>
    <Section title={vietnamese ? "Tổng quan Renoa" : "Renoa overview"}>
      <div className={styles.overview}>
        <div className={styles.overviewText}>
          <div className={styles.identity}><ItemLabel name="Void" /><ItemLabel name="Hunter" /></div>
          <p className={styles.lead}>{t(review.intro)}</p>
        </div>
        <div className={styles.artwork}><GuideImage name="Renoa artwork" className={styles.splash} alt={vietnamese ? "Minh họa Renoa" : "Renoa illustration"} /></div>
      </div>
      <div className={styles.profile}>{review.profile.map(item => <div key={item.label.en}>
        <span>{t(item.label)}</span><strong>{item.score}<small> / 5</small></strong>
        <meter min={0} max={5} value={item.score} aria-label={t(item.label)} />
      </div>)}</div>
      <p className={styles.muted}>{vietnamese ? "Điểm đánh giá theo bản lưu Prydwen." : "Performance ratings from the saved Prydwen guide."}</p>
    </Section>
    <div className={styles.columns}>
      <Section title={vietnamese ? "Điểm mạnh" : "Strengths"}><ul>{review.pros.map(item => <li key={item.en}>{t(item)}</li>)}</ul></Section>
      <Section title={vietnamese ? "Hạn chế" : "Weaknesses"}><ul>{review.cons.map(item => <li key={item.en}>{t(item)}</li>)}</ul></Section>
    </div>
    <Section title={vietnamese ? "Cơ chế & cách chơi" : "Mechanics & playstyle"}>
      <div className={styles.stack}>{review.mechanics.map((item, index) => <article className={`${styles.box} ${styles.mechanic}`} key={t(item.title)}>
        <GuideImage name={["Dirge Bullet", "Echo of Sorrow", "Flower of Devoured Fate"][index]} className={styles.cardArtwork} />
        <div><h3>{t(item.title)}</h3><p>{t(item.body)}</p></div>
      </article>)}</div>
    </Section>
    <GuideSource vietnamese={vietnamese} />
  </div>;
}

export function RenoaCardAdvice({ vietnamese }: Props) {
  const t = (value: GuideText | string) => localize(value, vietnamese);
  return <div className={styles.guide}>
    <Section title={vietnamese ? "Gợi ý chọn Epiphany" : "Epiphany recommendations"}>
      <p className={styles.muted}>{vietnamese ? "Đánh giá I–V theo nguồn; lựa chọn tốt nhất còn phụ thuộc deck." : "Source ratings for I–V; the best choice still depends on the deck."}</p>
      <div className={styles.stack}>{cardAdvice.map(item => <details className={styles.disclosure} key={item.name}>
        <summary><span className={styles.cardSummary}><GuideImage name={item.name} className={styles.cardArtwork} /><span>{item.name}</span><span className={styles.badge}>{item.preferred}</span></span></summary>
        <div className={styles.ratings}>{item.ratings.map((rating, index) => <span key={index}><b>{["I", "II", "III", "IV", "V"][index]}</b><span aria-label={`${rating} / 5`}>{"★".repeat(rating)}<span className={styles.emptyStars} aria-hidden="true">{"☆".repeat(5 - rating)}</span></span></span>)}</div>
        <p>{t(item.note)}</p><p><strong>Divine / Neutral: </strong>{t(item.divine)}</p>
      </details>)}</div>
    </Section>
    <GuideSource vietnamese={vietnamese} />
  </div>;
}

export function RenoaDecks({ vietnamese }: Props) {
  const t = (value: GuideText | string) => localize(value, vietnamese);
  const [selectedDeck, setSelectedDeck] = useState(0);
  const deckId = useId();
  return <div className={styles.guide}>
    <Section title={vietnamese ? "Deck đề xuất" : "Recommended decks"}>
      <div className={styles.deckTabs} role="tablist" aria-label={vietnamese ? "Deck đề xuất" : "Recommended decks"}>{decks.map((deck, index) => <button key={deck.name} type="button" role="tab" id={`${deckId}-tab-${index}`} aria-controls={`${deckId}-panel-${index}`} aria-selected={selectedDeck === index} tabIndex={selectedDeck === index ? 0 : -1} onClick={() => setSelectedDeck(index)} onKeyDown={event => {
        const next = event.key === "Home" ? 0 : event.key === "End" ? decks.length - 1 : event.key === "ArrowRight" ? (index + 1) % decks.length : event.key === "ArrowLeft" ? (index + decks.length - 1) % decks.length : null;
        if (next === null) return;
        event.preventDefault(); setSelectedDeck(next); document.getElementById(`${deckId}-tab-${next}`)?.focus();
      }}>{deck.name}</button>)}</div>
      {decks.map((deck, index) => <article className={styles.deck} key={deck.name} role="tabpanel" id={`${deckId}-panel-${index}`} aria-labelledby={`${deckId}-tab-${index}`} hidden={selectedDeck !== index} tabIndex={0}>
        <h3 className={styles.deckTitle}>{deck.name}</h3>
        <div className={styles.deckLayout}>
          <aside className={styles.setup} aria-label={vietnamese ? "Thiết lập deck" : "Setup Summary"}>
            <h4>{vietnamese ? "Thiết lập deck" : "Setup Summary"}</h4>
            <div className={styles.setupBody}>
              <div className={styles.setupGroup}><h5>{vietnamese ? "Nhân vật" : "Character"}</h5><GuideImage name="Renoa" className={styles.setupPortrait} alt="Renoa" /></div>
              <div className={styles.setupGroup}><h5>Partner</h5><GuideImage name={index === 2 ? "Yuri" : "Janet"} className={styles.setupPortrait} alt={index === 2 ? "Yuri" : "Janet"} /></div>
              <div className={styles.setupGroup}><h5>{vietnamese ? "Trang bị" : "Equipment"}</h5><div className={styles.setupItems}>{deck.gear.length ? deck.gear.map(name => <ItemLabel name={name} key={name} />) : <span className={styles.muted}>{vietnamese ? "Chưa chọn trang bị" : "No equipment"}</span>}</div></div>
              <div className={styles.setupGroup}><h5>Fragments</h5><div className={styles.setupItems}>{deck.fragments ? deck.fragments.split(" + ").map(name => <ItemLabel name={name} key={name} />) : <span className={styles.muted}>{vietnamese ? "Chưa chọn Fragment" : "No Fragments"}</span>}</div></div>
            </div>
          </aside>
          <div className={styles.deckCards}><h4>{vietnamese ? "Danh sách bài" : "Cards Summary"} <span>[{deck.count} {vietnamese ? "lá" : "selected"}]</span></h4>
            <ul className={styles.cardList} aria-label={vietnamese ? "Các lá trong deck" : "Deck cards"}>{deck.cards.flatMap((card, cardIndex) => Array.from({ length: card.count }, (_, copy) => {
              const details = (deckCards as Record<string, { cost: string; type: string; description: string }>)[card.name];
              return <li key={`${cardIndex}-${copy}`} className={styles.deckCard} data-neutral={card.name === "Persona" || undefined}>
                <GuideImage name={card.name} className={styles.deckArtwork} />
                <div className={styles.deckCardHeader}><b className={styles.cardCost}>{details.cost}</b><div><strong title={card.name}>{card.name}</strong><span>{vietnamese ? ({ Skill: "Kỹ năng", Attack: "Tấn công", Upgrade: "Cường hóa" } as Record<string, string>)[details.type] ?? details.type : details.type}</span></div></div>
                <div className={styles.deckCardText} lang={vietnamese ? "vi" : "en"}><span>{vietnamese ? (deckCardsVi as Record<string, string>)[card.name] ?? details.description : details.description}</span>{card.extra && card.name !== "Persona" && <small>{vietnamese ? ({ "Draw 1": "Rút 1 lá", "−1 cost": "Giảm 1 chi phí" } as Record<string, string>)[card.extra] ?? card.extra : card.extra}</small>}</div>
              </li>;
            }))}</ul>
          </div>
        </div>
        <p>{t(deck.note)}</p>
      </article>)}
    </Section>
    <Section title={vietnamese ? "Đồng đội phù hợp" : "Synergies"}><div className={styles.columns}>{synergies.map(item => <article className={styles.box} key={item.name}><h3 className={styles.allyHeading}><GuideImage name={item.name} className={styles.portrait} />{item.name}</h3><p>{t(item.note)}</p></article>)}</div></Section>
    <Section title={vietnamese ? "Đội hình & cách vận hành" : "Teams & rotations"}><div className={styles.stack}>{teams.map(team => <article className={styles.box} key={team.name}>
      <h3>{team.name}</h3><ul className={styles.team}>{team.members.map(name => <li key={name}><GuideImage name={name} className={styles.teamPortrait} /><span>{name}</span></li>)}</ul>
      {team.steps.length > 1 ? <ol>{team.steps.map(step => <li key={step.en}>{t(step)}</li>)}</ol> : <p>{t(team.steps[0])}</p>}
    </article>)}</div></Section>
    <GuideSource vietnamese={vietnamese} />
  </div>;
}
