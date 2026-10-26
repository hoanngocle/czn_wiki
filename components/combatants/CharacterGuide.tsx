"use client";

import { useId, useState, type ReactNode } from "react";
import { GuideImage } from "./GuideImage";
import type { GuideText } from "../../lib/wiki/character-guide";
import { resolveDeckCard } from "../../lib/wiki/character-guide";
import { useCharacterGuide } from "./CharacterGuideContext";
import { label, preserveGameTermNames } from "../../lib/wiki/labels";
import { GameCard } from "../cards/GameCard";
import { CardDetailModal } from "../cards/CardDetailModal";
import type { Card } from "../../lib/wiki/types";
import styles from "./RenoaGuide.module.css";

export { CharacterBuild } from "./CharacterBuildGuide";

type Props = { vietnamese: boolean };
const localize = (value: GuideText | string, vietnamese: boolean) => typeof value === "string" ? value : vietnamese ? preserveGameTermNames(value.vi, value.en) : value.en;

function ItemLabel({ name, vietnamese = false, pieces }: { name: string; vietnamese?: boolean; pieces?: number }) {
  return <span className={styles.itemLabel}><GuideImage name={name} /><span>{label(name, vietnamese)}{Boolean(pieces) && <small> [{pieces}{vietnamese ? " món" : "-PC"}]</small>}</span></span>;
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return <section className={styles.section}><h2>{title}</h2>{children}</section>;
}

export function CharacterReview({ vietnamese }: Props) {
  const { guide } = useCharacterGuide();
  const { review } = guide!;
  const t = (value: GuideText | string) => localize(value, vietnamese);
  return <div className={styles.guide}>
    <Section title={vietnamese ? `Tổng quan ${guide!.name}` : `${guide!.name} overview`}>
      <div className={styles.overview}>
        <div className={styles.overviewText}>
          <div className={styles.identity}>{guide!.identity.map(name => <ItemLabel key={name} name={name} vietnamese={vietnamese} />)}</div>
          <p className={styles.lead}>{t(review.intro)}</p>
        </div>
        <div className={styles.artwork}><GuideImage name={`${guide!.name} artwork`} className={styles.splash} alt={vietnamese ? `Minh họa ${guide!.name}` : `${guide!.name} illustration`} /></div>
      </div>
      <div className={styles.profile}>{review.profile.map(item => <div key={item.label.en}>
        <span>{t(item.label)}</span><strong>{item.score}<small> / 5</small></strong>
        <meter min={0} max={5} value={item.score} aria-label={t(item.label)} />
      </div>)}</div>
    </Section>
    <div className={styles.columns}>
      <Section title={vietnamese ? "Điểm mạnh" : "Strengths"}><ul>{review.pros.map(item => <li key={item.en}>{t(item)}</li>)}</ul></Section>
      <Section title={vietnamese ? "Hạn chế" : "Weaknesses"}><ul>{review.cons.map(item => <li key={item.en}>{t(item)}</li>)}</ul></Section>
    </div>
    <Section title={vietnamese ? "Cơ chế & cách chơi" : "Mechanics & playstyle"}>
      <div className={styles.stack}>{review.mechanics.map((item) => <article className={`${styles.box} ${styles.mechanic}`} key={t(item.title)}>
        <GuideImage cardId={item.cardId} className={styles.cardArtwork} />
        <div><h3>{localize(item.title, false)}</h3><p>{t(item.body)}</p></div>
      </article>)}</div>
    </Section>
  </div>;
}

export function CharacterDecks({ vietnamese }: Props) {
  const { guide, cards, animationEnabled } = useCharacterGuide();
  const { decks, synergies, teams } = guide!;
  const t = (value: GuideText | string) => localize(value, vietnamese);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [selectedDeck, setSelectedDeck] = useState(0);
  const deckId = useId();
  const deckHeading = guide!.source.kind === "kit" ? (vietnamese ? "Bộ bài khởi đầu" : "Starting deck") : (vietnamese ? "Bộ bài đề xuất" : "Recommended decks");
  return <div className={styles.guide}>
    <Section title={deckHeading}>
      <div className={styles.deckTabs} role="tablist" aria-label={deckHeading}>{decks.map((deck, index) => <button key={deck.name.en} type="button" role="tab" id={`${deckId}-tab-${index}`} aria-controls={`${deckId}-panel-${index}`} aria-selected={selectedDeck === index} tabIndex={selectedDeck === index ? 0 : -1} onClick={() => setSelectedDeck(index)} onKeyDown={event => {
        const next = event.key === "Home" ? 0 : event.key === "End" ? decks.length - 1 : event.key === "ArrowRight" ? (index + 1) % decks.length : event.key === "ArrowLeft" ? (index + decks.length - 1) % decks.length : null;
        if (next === null) return;
        event.preventDefault(); setSelectedDeck(next); document.getElementById(`${deckId}-tab-${next}`)?.focus();
      }}>{t(deck.name)}</button>)}</div>
      {decks.map((deck, index) => <article className={styles.deck} key={deck.name.en} role="tabpanel" id={`${deckId}-panel-${index}`} aria-labelledby={`${deckId}-tab-${index}`} hidden={selectedDeck !== index} tabIndex={0}>
        <h3 className={styles.deckTitle}>{t(deck.name)}</h3>
        <p className={styles.muted}>{t(deck.role)}</p>
        <div className={styles.deckLayout}>
          <aside className={styles.setup} aria-label={vietnamese ? "Thiết lập bộ bài" : "Setup Summary"}>
            <h4>{vietnamese ? "Thiết lập bộ bài" : "Setup Summary"}</h4>
            <div className={styles.setupBody}>
              <div className={styles.setupGroup}><h5>{vietnamese ? "Nhân vật" : "Character"}</h5><GuideImage name={guide!.name} className={styles.setupPortrait} alt={guide!.name} /></div>
              {deck.partner && <div className={styles.setupGroup}><h5>Partner</h5><GuideImage name={deck.partner} className={styles.setupPortrait} alt={deck.partner} /></div>}
              <div className={styles.setupGroup}><h5>Equipment</h5><div className={styles.setupItems}>{deck.gear.length ? deck.gear.map(name => <ItemLabel name={name} key={name} />) : <span className={styles.muted}>{vietnamese ? "Chưa chọn Equipment" : "No equipment"}</span>}</div></div>
              <div className={styles.setupGroup}><h5>Memory Fragments</h5><div className={styles.setupItems}>{deck.fragments.length ? deck.fragments.map((name, index) => <ItemLabel name={name} key={name} pieces={deck.fragmentPieces?.[index]} vietnamese={vietnamese} />) : <span className={styles.muted}>{vietnamese ? "Chưa chọn Memory Fragments" : "No Memory Fragments"}</span>}</div></div>
            </div>
          </aside>
          <div className={styles.deckCards}><h4>{vietnamese ? "Danh sách bài" : "Cards Summary"} <span>[{deck.cards.reduce((sum, card) => sum + card.count, 0)} {vietnamese ? "lá" : "selected"}]</span></h4>
            <ul className={styles.cardList} aria-label={vietnamese ? "Các lá trong bộ bài" : "Deck cards"}>{deck.cards.flatMap((card, cardIndex) => Array.from({ length: card.count }, (_, copy) => {
              const display = resolveDeckCard(cards, card, vietnamese);
              return <li key={`${cardIndex}-${copy}`} className={styles.sharedDeckCard} data-card-id={card.cardId}>
                <GameCard card={display} animationEnabled={animationEnabled} vietnameseEnabled={vietnamese} onClick={() => setSelectedCard(display)} />
                <span className={styles.deckCaption}>{display.name}</span>
                {card.costDelta !== undefined && <small className={styles.deckModifier}>{vietnamese ? `Điều chỉnh chi phí: ${card.costDelta}` : `Cost modifier: ${card.costDelta}`}</small>}
              </li>;
            }))}</ul>
          </div>
        </div>
        <p className={styles.deckNotes}>{t(deck.note)}</p>
        {deck.code && <details className={styles.deckCode}><summary>{vietnamese ? "Mã bộ bài" : "Deck code"}</summary><textarea readOnly aria-label={vietnamese ? "Mã bộ bài" : "Deck code"} value={deck.code} onFocus={event => event.currentTarget.select()} /></details>}
      </article>)}
    </Section>
    {synergies.length > 0 && <Section title={vietnamese ? "Đồng đội phù hợp" : "Synergies"}><div className={styles.columns}>{synergies.map(item => <article className={styles.box} key={item.name}><h3 className={styles.allyHeading}><GuideImage name={item.name} className={styles.portrait} />{item.name}</h3><p>{t(item.note)}</p></article>)}</div></Section>}
    {teams.length > 0 && <Section title={vietnamese ? "Đội hình & cách vận hành" : "Teams & rotations"}><div className={styles.stack}>{teams.map(team => <article className={styles.box} key={team.name.en}>
      <h3>{t(team.name)}</h3><ul className={styles.team}>{team.members.map(name => <li key={name}><GuideImage name={name} className={styles.teamPortrait} /><span>{name}</span></li>)}</ul>
      {team.steps.length > 1 ? <ol>{team.steps.map(step => <li key={step.en}>{t(step)}</li>)}</ol> : <p>{t(team.steps[0])}</p>}
    </article>)}</div></Section>}
    {selectedCard && <CardDetailModal card={selectedCard} initialId={selectedCard.id} animationEnabled={animationEnabled} vietnameseEnabled={vietnamese} reviews={guide?.epiphanyReviews} onClose={() => setSelectedCard(null)} />}
  </div>;
}
