"use client";

import { useState } from "react";
import type { Card, CharacterDetail } from "../../lib/wiki/types";
import { storeValue, useStoredValue } from "../../lib/ui/storage";
import { CardDetailModal } from "../cards/CardDetailModal";
import { Description } from "../cards/Description";
import { GameCard } from "../cards/GameCard";
import { Dialog } from "../ui/Dialog";
import styles from "./RenoaContent.module.css";

const animationKey = "czn_combatant_enable_animation";
const portraitKey = "czn_combatant_show_portrait_only";
type Section = "cards" | "ego" | "potential";

export function RenoaContent({ detail }: { detail: CharacterDetail }) {
  const animationEnabled = useStoredValue(animationKey, "false") === "true";
  const portraitOnly = useStoredValue(portraitKey, "false") === "true";
  const [potentialAwakening, setPotentialAwakening] = useState(true);
  const [section, setSection] = useState<Section>("cards");
  const [selected, setSelected] = useState<{ base: Card; initialId: string } | null>(null);
  const [selectedPotential, setSelectedPotential] = useState<CharacterDetail["potentialNodes"][number] | null>(null);
  const setAnimation = (value: boolean) => storeValue(animationKey, String(value));
  const setPortrait = (value: boolean) => storeValue(portraitKey, String(value));
  const linkedId = detail.potentialTargetLinkCardId?.replace(/^\[|\]$/g, "");
  const target = detail.potentialTargetCards.find(card => card.id === linkedId);
  const startCards = target && potentialAwakening ? [...detail.startCards, target] : detail.startCards;
  const potentialVariant = (card: Card) => card.variants.find((variant) => /_(pot|lbk)$/.test(variant.id)) ?? card;
  const renderCards = (cards: Card[], awaken = false) => <div className={styles.grid}>{cards.map(card => {
    const display = awaken && potentialAwakening && card.id !== target?.id ? potentialVariant(card) : card;
    return <GameCard key={card.id} card={display} animationEnabled={animationEnabled} portraitOnly={portraitOnly} onClick={() => setSelected({ base: card, initialId: display.id })} />;
  })}</div>;

  return <>
    <div className={styles.tabs} role="tablist" aria-label="Renoa details">{(["cards", "ego", "potential"] as const).map(value => <button key={value} type="button" role="tab" aria-selected={section === value} onClick={() => setSection(value)}>{value === "cards" ? "Cards" : value === "ego" ? "Manifest Ego" : "Potential"}</button>)}</div>
    <div className={styles.panel} data-mobile-active={section === "cards"}>
      <div className={styles.sectionTitle}><h2>Start Cards</h2><div className={styles.options}>
        <label><input type="checkbox" checked={potentialAwakening} onChange={event => setPotentialAwakening(event.target.checked)} /> Potential Awakening</label>
        <label><input type="checkbox" disabled /> April Fool</label>
        <label><input type="checkbox" checked={animationEnabled} onChange={event => setAnimation(event.target.checked)} /> Animation</label>
        <label><input type="checkbox" checked={portraitOnly} onChange={event => setPortrait(event.target.checked)} /> Portrait</label>
      </div></div>
      {renderCards(startCards, true)}
      <h2 className={styles.heading}>Unique Cards</h2>{renderCards(detail.sparkCards)}
      {detail.collapseSkillCard && <><h2 className={styles.heading}>Ego Skill</h2>{renderCards([detail.collapseSkillCard], true)}</>}
      <h2 className={styles.heading}>Collapse Cards</h2>{renderCards(detail.collapseCards)}
    </div>
    <section className={styles.panel} data-mobile-active={section === "ego"}><h2 className={styles.heading}>Manifest Ego</h2>
      <div className={styles.egoGrid}>{detail.manifestEgo.map(level => <article data-testid="manifest-level" className={styles.egoLevel} key={level.id}>
        <div className={styles.egoText}><div className={styles.egoHeading}><span className={styles.levelNumber}>Level {level.break_level}</span><strong>{level.title}</strong></div><p><Description text={level.desc} /></p></div>
      </article>)}</div>
    </section>
    <section className={styles.panel} data-mobile-active={section === "potential"}><h2 className={styles.heading}>Potential</h2>
      <div className={styles.potentialGrid}>{detail.potentialNodes.map(node => {
        const type = node.potential_node_type_define;
        return <button type="button" data-testid="potential-node" className={styles.potentialNode} key={node.id} onClick={() => setSelectedPotential(node)}>
          <div className={styles.potentialHeading}><strong>{type?.main_title || "Potential"}</strong><span className={styles.nodeNumber}>Potential{node.node_num.split("_")[0]}</span></div><em>{type?.sub_title}</em><p><Description text={node.desc} /></p>
        </button>;
      })}</div>
    </section>
    {selected && <CardDetailModal key={selected.base.id} card={selected.base} initialId={selected.initialId} animationEnabled={animationEnabled} onClose={() => setSelected(null)} />}
    {selectedPotential && <Dialog title={selectedPotential.potential_node_type_define?.sub_title || "Potential upgrades"} onClose={() => setSelectedPotential(null)}><div className={styles.upgrades}>{[selectedPotential, ...selectedPotential.upgrade_nodes].map(level => <div key={level.id}><strong>Level {level.node_level}</strong><p><Description text={level.desc} /></p></div>)}</div></Dialog>}
  </>;
}
