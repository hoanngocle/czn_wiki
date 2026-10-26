"use client";

import { useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import type { Card, CharacterDetail } from "../../lib/wiki/types";
import { storeValue, useStoredValue } from "../../lib/ui/storage";
import { CardDetailModal } from "../cards/CardDetailModal";
import { translateCard, translateCharacterDetail } from "../../lib/wiki/translation-core";
import { Description } from "../cards/Description";
import { GameCard } from "../cards/GameCard";
import { Dialog } from "../ui/Dialog";
import { CharacterBuild, CharacterDecks, CharacterReview } from "./CharacterGuide";
import styles from "./RenoaContent.module.css";

import { CharacterGuideContext } from "./CharacterGuideContext";
import { indexCharacterCards, type CharacterGuide } from "../../lib/wiki/character-guide";
import type { CharacterTranslation } from "../../data/wiki/translations";
import { label } from "../../lib/wiki/labels";

const animationKey = "czn_combatant_enable_animation";
const vietnameseKey = "czn_combatant_vietnamese";
type Section = "cards" | "ego" | "potential";
const guideTabs = ["Card", "Review", "Build", "Deck"] as const;
type GuideTab = typeof guideTabs[number];

export function CharacterContent({ detail: originalDetail, guide, translation }: { detail: CharacterDetail; guide?: CharacterGuide; translation?: CharacterTranslation }) {
  const animationEnabled = useStoredValue(animationKey, "false") === "true";
  const vietnameseEnabled = useStoredValue(vietnameseKey, "true") === "true";
  const detail = useMemo(() => vietnameseEnabled ? translateCharacterDetail(originalDetail, translation) : originalDetail, [originalDetail, translation, vietnameseEnabled]);
  const t = (value: string) => label(value, vietnameseEnabled);
  const cards = useMemo(() => indexCharacterCards(detail, guide?.extraCards.map(card => vietnameseEnabled ? translateCard(card, translation) : card)), [detail, guide, translation, vietnameseEnabled]);
  const availableTabs = guide ? guideTabs : (["Card"] as const);
  const [section, setSection] = useState<Section>("cards");
  const [guideTab, setGuideTab] = useState<GuideTab>("Card");
  const tabId = useId();
  const tabButtons = useRef<(HTMLButtonElement | null)[]>([]);
  const navigateTabs = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const next = event.key === "ArrowRight" ? (index + 1) % availableTabs.length
      : event.key === "ArrowLeft" ? (index + availableTabs.length - 1) % availableTabs.length
      : event.key === "Home" ? 0 : event.key === "End" ? availableTabs.length - 1 : null;
    if (next === null) return;
    event.preventDefault();
    setGuideTab(availableTabs[next]);
    tabButtons.current[next]?.focus();
  };
  const [selected, setSelected] = useState<{ base: Card; initialId: string } | null>(null);
  const [selectedPotentialId, setSelectedPotentialId] = useState<string | null>(null);
  const [potentialLevels, setPotentialLevels] = useState<Record<string, string>>({});
  const selectedPotential = detail.potentialNodes.find(node => node.id === selectedPotentialId);
  const setAnimation = (value: boolean) => storeValue(animationKey, String(value));
  const linkedIds = new Set(detail.potentialTargetLinkCardIds ?? (detail.potentialTargetLinkCardId ?? "").replace(/^\[|\]$/g, "").split(",").map(id => id.trim()).filter(Boolean));
  const targets = detail.potentialTargetCards.filter(card => linkedIds.has(card.id));
  const startCards = [...new Map([...detail.startCards, ...targets].map(card => [card.id, card])).values()];
  const egoSkill = detail.egoSkillCard ?? detail.collapseSkillCard;
  const listedIds = new Set([...startCards, ...detail.sparkCards, ...detail.collapseCards, ...(egoSkill ? [egoSkill] : [])].map(card => card.id));
  const generatedCards = [...new Set([...(detail.generatedCards ?? []).map(card => card.id), ...(guide?.generatedCardIds ?? [])])].filter(id => !listedIds.has(id)).map(id => cards.get(id)).filter((card): card is Card => !!card);
  const potentialVariant = (card: Card) => card.variants.find((variant) => /_(pot|lbk)$/.test(variant.id)) ?? card;
  const renderCards = (cards: Card[], awaken = false) => <div className={styles.grid}>{cards.map(card => {
    const display = awaken && !linkedIds.has(card.id) ? potentialVariant(card) : card;
    return <GameCard key={card.id} card={display} animationEnabled={animationEnabled} vietnameseEnabled={vietnameseEnabled} onClick={() => setSelected({ base: card, initialId: display.id })} />;
  })}</div>;

  return <CharacterGuideContext.Provider value={{ guide, cards, animationEnabled }}>
    <div className={styles.guideToolbar}>
      <div className={styles.guideTabs} role="tablist" aria-label={`${originalDetail.name} ${vietnameseEnabled ? "hướng dẫn" : "guide"}`}>{availableTabs.map((value, index) => <button
        key={value} ref={element => { tabButtons.current[index] = element; }} type="button" role="tab"
        id={`${tabId}-tab-${value}`} aria-controls={`${tabId}-panel-${value}`} aria-selected={guideTab === value}
        tabIndex={guideTab === value ? 0 : -1} onClick={() => setGuideTab(value)} onKeyDown={event => navigateTabs(event, index)}
      >{t(value)}</button>)}</div>
      <div className={styles.options}>
        <label><input type="checkbox" checked={animationEnabled} onChange={event => setAnimation(event.target.checked)} /> {t("Animation")}</label>
        <label><input type="checkbox" checked={vietnameseEnabled} onChange={event => storeValue(vietnameseKey, String(event.target.checked))} /> Tiếng Việt</label>
      </div>
    </div>
    <div className={styles.guidePanel} role="tabpanel" id={`${tabId}-panel-Card`} aria-labelledby={`${tabId}-tab-Card`} hidden={guideTab !== "Card"} tabIndex={0}>
    <div className={styles.tabs} role="tablist" aria-label={`${originalDetail.name} ${vietnameseEnabled ? "chi tiết" : "details"}`}>{(["cards", "ego", "potential"] as const).map(value => <button key={value} type="button" role="tab" aria-selected={section === value} onClick={() => setSection(value)}>{t(value === "cards" ? "Cards" : value === "ego" ? "Manifest Ego" : "Potential")}</button>)}</div>
    <div className={styles.panel} data-mobile-active={section === "cards"} lang={vietnameseEnabled ? "vi" : "en"}>
      <div className={styles.sectionTitle}><h2>{t("Start Cards")}</h2></div>
      {renderCards(startCards, true)}
      <h2 className={styles.heading}>{t("Unique Cards")}</h2>{renderCards(detail.sparkCards)}
      {generatedCards.length > 0 && <><h2 className={styles.heading}>{vietnameseEnabled ? "Bài được tạo" : "Generated Cards"}</h2>{renderCards(generatedCards)}</>}
      {egoSkill && <><h2 className={styles.heading}>{t("Ego Skill")}</h2>{renderCards([egoSkill], true)}</>}
      <h2 className={styles.heading}>{t("Collapse Cards")}</h2>{renderCards(detail.collapseCards)}
      {detail.collapseCards.length === 0 && <p>{vietnameseEnabled ? "Chưa có thông tin." : "Not available yet."}</p>}
    </div>
    <section className={styles.panel} data-mobile-active={section === "ego"} lang={vietnameseEnabled ? "vi" : "en"}><h2 className={styles.heading}>{t("Manifest Ego")}</h2>
      <div className={styles.egoGrid}>{detail.manifestEgo.map(level => <article data-testid="manifest-level" className={styles.egoLevel} key={level.id}>
        <div className={styles.egoText}><div className={styles.egoHeading}><span className={styles.levelNumber}>{t("Level")} {level.break_level}</span><strong>{level.title}</strong></div><p><Description text={level.desc} /></p></div>
      </article>)}</div>
    </section>
    <section className={styles.panel} data-mobile-active={section === "potential"} lang={vietnameseEnabled ? "vi" : "en"}><h2 className={styles.heading}>{t("Potential")}</h2>
      {detail.potentialNodes.length === 0 && <p>{vietnameseEnabled ? "Chưa có thông tin." : "Not available yet."}</p>}
      <div className={styles.potentialGrid}>{detail.potentialNodes.map(node => {
        const type = node.potential_node_type_define;
        const levels = [node, ...node.upgrade_nodes].sort((a, b) => Number(a.node_level) - Number(b.node_level));
        const levelIndex = Math.max(0, levels.findIndex(level => level.node_level === (potentialLevels[node.id] ?? node.max_level)));
        const currentLevel = levels[levelIndex];
        return <article data-testid="potential-node" className={styles.potentialNode} key={node.id}>
          <div className={styles.potentialHeading}>
            <strong>{type?.main_title || t("Potential")}</strong>
            {levels.length > 1 && <label className={styles.levelControl}>
              <span>{t("Level")} {currentLevel.node_level} / {levels.at(-1)!.node_level}</span>
              <input type="range" min={1} max={levels.length} step={1} value={levelIndex + 1}
                aria-label={`${type?.sub_title || t("Potential")} ${t("Level")}`} aria-valuetext={`${t("Level")} ${currentLevel.node_level}`}
                onChange={event => {
                  const level = levels[Number(event.target.value) - 1];
                  setPotentialLevels(previous => ({ ...previous, [node.id]: level.node_level }));
                }} />
            </label>}
          </div>
          <button type="button" className={styles.potentialDetails} onClick={() => setSelectedPotentialId(node.id)}>
            <em>{type?.sub_title}</em><p><Description text={currentLevel.desc} /></p>
          </button>
        </article>;
      })}</div>
    </section>
    </div>
    {availableTabs.filter(value => value !== "Card").map(value => <div key={value} className={styles.guidePanel} role="tabpanel"
      id={`${tabId}-panel-${value}`} aria-labelledby={`${tabId}-tab-${value}`} hidden={guideTab !== value} tabIndex={0} lang={vietnameseEnabled ? "vi" : "en"}>
      {value === "Review" ? <CharacterReview vietnamese={vietnameseEnabled} /> : value === "Build" ? <CharacterBuild vietnamese={vietnameseEnabled} /> : <CharacterDecks vietnamese={vietnameseEnabled} />}
    </div>)}
    {selected && <CardDetailModal key={selected.base.id} reviews={guide?.epiphanyReviews} card={selected.base} initialId={selected.initialId} animationEnabled={animationEnabled} vietnameseEnabled={vietnameseEnabled} onClose={() => setSelected(null)} />}
    {selectedPotential && <Dialog closeLabel={vietnameseEnabled ? "Đóng hộp thoại" : "Close dialog"} title={selectedPotential.potential_node_type_define?.sub_title || (vietnameseEnabled ? "Nâng cấp tiềm năng" : "Potential upgrades")} onClose={() => setSelectedPotentialId(null)}><div className={styles.upgrades} lang={vietnameseEnabled ? "vi" : "en"}>{[selectedPotential, ...selectedPotential.upgrade_nodes].map(level => <div key={level.id}><strong>{t("Level")} {level.node_level}</strong><p><Description text={level.desc} /></p></div>)}</div></Dialog>}
  </CharacterGuideContext.Provider>;
}
