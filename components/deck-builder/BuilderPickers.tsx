"use client";

import { useUiLanguage } from "../../lib/ui/language";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Description } from "../cards/Description";
import { availableCards, baseId, cardGroup, GODS, isGod, modifierAllowed, plainText, resolveCard } from "../../lib/deck-builder/model";
import type { BuilderCharacter, CardSelection, Catalog, Deck, Modifier } from "../../lib/deck-builder/types";
import { BuilderDialog } from "./BuilderDialog";
import { BuilderCard } from "./BuilderCard";
import styles from "./DeckBuilder.module.css";

export function CharacterPicker({ catalog, kind, onSelect, onClose }: { catalog: Catalog; kind: "combatant" | "supporter"; onSelect: (character: BuilderCharacter) => void; onClose: () => void }) {
  const { t } = useUiLanguage();
  const [query, setQuery] = useState("");
  const [job, setJob] = useState("");
  const [ego, setEgo] = useState("");
  const [rarity, setRarity] = useState("");
  const all = catalog.characters.filter(c => c.kind === kind);
  const matches = all.filter(c => (!query || [c.name, ...Object.values(c.names)].join(" ").toLowerCase().includes(query.toLowerCase())) && (!job || c.job === job) && (!ego || c.ego === ego) && (!rarity || c.rarity === Number(rarity)));
  return <BuilderDialog title={kind === "combatant" ? t("Choose combatant") : t("Choose partner")} onClose={onClose} wide>
    <div className={styles.filters}>
      <input type="search" aria-label={t("Search characters")} placeholder={t("Search by name…")} value={query} onChange={e => setQuery(e.target.value)} />
      <select aria-label={t("Class")} value={job} onChange={e => setJob(e.target.value)}><option value="">{t("All classes")}</option>{[...new Set(all.map(c => c.job))].map(j => <option key={j} value={j}>{t(j)}</option>)}</select>
      {kind === "combatant" && <select aria-label="Ego" value={ego} onChange={e => setEgo(e.target.value)}><option value="">{t("All egos")}</option>{[...new Set(all.map(c => c.ego))].map(j => <option key={j} value={j}>{t(j)}</option>)}</select>}
      <select aria-label={t("Rarity")} value={rarity} onChange={e => setRarity(e.target.value)}><option value="">{t("All rarities")}</option><option value="5">★★★★★</option><option value="4">★★★★</option><option value="3">★★★</option></select>
    </div>
    <div className={styles.characterGrid}>{matches.map(c => <button key={c.id} className={styles.characterOption} aria-label={`${t("Select")} ${c.name}`} onClick={() => onSelect(c)}>
      <span className={styles.portraitSmall} style={{ backgroundColor: `${c.color}30` }}>{c.portrait ? <Image src={c.portrait} alt="" fill sizes="120px" unoptimized /> : <span>{c.name.slice(0, 1)}</span>}</span>
      <strong>{c.name}</strong><small>{t(c.job)} · {c.rarity}★</small>
    </button>)}</div>
    {!matches.length && <p className={styles.emptyResult}>{t("No characters match these filters.")}</p>}
  </BuilderDialog>;
}

export function EquipmentPicker({ catalog, slot, onSelect, onClose }: { catalog: Catalog; slot: keyof Deck["relics"]; onSelect: (id: string) => void; onClose: () => void }) {
  const { t } = useUiLanguage();
  const [query, setQuery] = useState("");
  const [rarity, setRarity] = useState("");
  const [limit, setLimit] = useState(40);
  const type = { weapon: "EQUIP_WEAPON", armor: "EQUIP_ARMOR", accessory: "EQUIP_ACC" }[slot];
  const items = catalog.relics.filter(r => r.type === type && (!rarity || r.rarity === rarity) && `${r.name} ${plainText(r.description)}`.toLowerCase().includes(query.toLowerCase()));
  return <BuilderDialog title={`${t("Choose")} ${t(slot)}`} onClose={onClose} wide>
    <div className={styles.filters}><input type="search" aria-label={t("Search equipment")} placeholder={t("Search equipment or effects…")} value={query} onChange={e => { setQuery(e.target.value); setLimit(40); }} /><select aria-label={t("Equipment rarity")} value={rarity} onChange={e => setRarity(e.target.value)}><option value="">{t("All rarities")}</option>{[...new Set(catalog.relics.map(r => r.rarity))].map(r => <option key={r} value={r}>{t(r.replace("RARITY_", ""))}</option>)}</select></div>
    <div className={styles.optionList}>{items.slice(0, limit).map(r => <button key={r.id} className={styles.itemOption} onClick={() => onSelect(r.id)} aria-label={`${t("Equip")} ${r.name}`}>
      {r.image && <Image src={r.image} alt="" width={56} height={56} unoptimized />}<span><strong>{r.name}</strong><small>{t(r.rarity.replace("RARITY_", ""))}</small><Description text={r.description} /></span>
    </button>)}</div>
    {!items.length && <p className={styles.emptyResult}>{t("No equipment matches these filters.")}</p>}
    {limit < items.length && <button className={styles.more} onClick={() => setLimit(limit + 40)}>{t("Show more")} ({items.length - limit})</button>}
  </BuilderDialog>;
}

export function PiecePicker({ catalog, deck, onSelect, onClose }: { catalog: Catalog; deck: Deck; onSelect: (id: string, effectCount: number) => void; onClose: () => void }) {
  const { t } = useUiLanguage();
  const used = deck.pieceSets.reduce((sum, p) => sum + p.effectCount, 0);
  return <BuilderDialog title={`${t("Memory fragments")} · ${used}/6`} onClose={onClose} wide>
    <div className={styles.optionList}>{catalog.pieces.flatMap(p => ([2, 4] as const).filter(n => p[n === 2 ? "set2" : "set4"]).map(n => <button key={`${p.id}-${n}`} className={styles.itemOption} disabled={used + n > 6 || deck.pieceSets.some(item => item.id === p.id && item.effectCount === n)} onClick={() => onSelect(p.id, n)}>
      {p.image && <Image src={p.image} alt="" width={48} height={48} unoptimized />}<span><strong>{p.name} · {n} {t("pieces")}</strong><Description text={p[n === 2 ? "set2" : "set4"]!.description} /></span>
    </button>))}</div>
  </BuilderDialog>;
}

export function CardPicker({ catalog, combatantId, initial, onConfirm, onClose }: { catalog: Catalog; combatantId: string; initial?: CardSelection; onConfirm: (card: CardSelection) => void; onClose: () => void }) {
  const { t } = useUiLanguage();
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState(initial ? cardGroup(resolveCard(initial, catalog), combatantId) : "Combatant");
  const [cost, setCost] = useState("");
  const [category, setCategory] = useState("");
  const [selected, setSelected] = useState<CardSelection | null>(initial ?? null);
  const [tab, setTab] = useState("Cards");
  const [god, setGod] = useState("");
  const [sortie, setSortie] = useState(false);
  const [limit, setLimit] = useState(48);
  const all = useMemo(() => availableCards(combatantId, catalog), [combatantId, catalog]);
  const results = all.filter(c => baseId(c.id) === c.id && (!group || cardGroup(c, combatantId) === group) && (!category || c.category === category) && (!cost || (cost === "4" ? c.cost >= 4 : c.cost === Number(cost))) && `${c.name} ${plainText(c.description)}`.toLowerCase().includes(query.toLowerCase()));
  const base = selected ? catalog.cards.find(c => c.id === selected.id)! : null;
  const card = selected ? resolveCard(selected, catalog) : null;
  const variants = base ? all.filter(c => baseId(c.id) === baseId(base.id)) : [];
  const persona = base?.sort === "SORT_EIDOLON";
  const curse = base?.tags.includes("taboo");
  const mods = base ? (persona ? catalog.eidolons : catalog.sparks).filter(m => modifierAllowed(m, base) && (sortie || !m.is_sortie) && (!god || (god === "normal" ? !isGod(m) : m.god_type === god))) : [];
  function toggleModifier(mod: Modifier) {
    if (!selected) return;
    if (persona) { if (selected.e.length < 2) setSelected({ ...selected, e: [...selected.e, mod.id] }); }
    else setSelected({ ...selected, s: selected.s.includes(mod.id) ? selected.s.filter(id => id !== mod.id) : [...selected.s.filter(id => isGod(catalog.sparks.find(m => m.id === id)!) !== isGod(mod)), mod.id] });
  }
  function choose(id: string) { setSelected({ id, s: [], e: [] }); }
  return <BuilderDialog title={initial ? t("Edit card") : t("Add card")} onClose={onClose} wide>
    <div className={styles.cardPickerLayout}>
      <div className={styles.pickerMain}>
        <div className={styles.tabs}>{["Cards", "Epiphany"].map(value => <button key={value} aria-pressed={tab === value} disabled={value === "Epiphany" && (!selected || curse)} onClick={() => setTab(value)}>{t(value === "Epiphany" && persona ? "Engravings" : value)}</button>)}</div>
        {tab === "Cards" ? <>
          <div className={styles.filters}>
            <input type="search" aria-label={t("Search cards")} placeholder={t("Search cards or effects…")} value={query} onChange={e => { setQuery(e.target.value); setLimit(48); }} />
            <select aria-label={t("Card source")} value={group} onChange={e => { setGroup(e.target.value); setLimit(48); }}><option value="">{t("All sources")}</option>{["Combatant", "Neutral", "Monster", "Curse", "Event", "Persona"].map(g => <option key={g} value={g}>{t(g)}</option>)}</select>
            <select aria-label={t("Card cost")} value={cost} onChange={e => setCost(e.target.value)}><option value="">{t("All costs")}</option>{[-1, 0, 1, 2, 3, 4].map(n => <option key={n} value={n}>{n < 0 ? "X" : n === 4 ? "4+" : n}</option>)}</select>
            <select aria-label={t("Card category")} value={category} onChange={e => setCategory(e.target.value)}><option value="">{t("All types")}</option><option value="CARD_ATK">{t("Attack")}</option><option value="CARD_SKILL">{t("Skill")}</option><option value="CARD_POWER">{t("Upgrade")}</option></select>
          </div>
          <div className={styles.pickerCards}>{results.slice(0, limit).map(c => <BuilderCard key={c.id} card={c} selected={!!selected && baseId(selected.id) === c.id} onClick={() => choose(c.id)} />)}</div>
          {!results.length && <p className={styles.emptyResult}>{t("No cards match these filters.")}</p>}
          {limit < results.length && <button className={styles.more} onClick={() => setLimit(limit + 48)}>{t("Show more")} ({results.length - limit})</button>}
        </> : <>
          <div className={styles.filters}>{!persona && <><select aria-label={t("Epiphany type")} value={god} onChange={e => setGod(e.target.value)}><option value="">{t("All epiphanies")}</option><option value="normal">{t("Normal")}</option>{GODS.map(g => <option key={g} value={g}>{t(g)}</option>)}</select><label><input type="checkbox" checked={sortie} onChange={e => setSortie(e.target.checked)} /> {t("Include Sortie")}</label></>}</div>
          <p className={styles.help}>{persona ? t("Choose up to two engravings. The same engraving can occupy both slots.") : t("Choose one normal and one divine epiphany. Only compatible effects are shown.")}</p>
          <div className={styles.optionList}>{mods.map(m => <button key={m.id} className={styles.itemOption} aria-pressed={persona ? selected!.e.includes(m.id) : selected!.s.includes(m.id)} disabled={persona && selected!.e.length >= 2} onClick={() => toggleModifier(m)}><span><strong>{t(m.slot_type?.name || m.god_type || "Normal")}{m.is_sortie ? ` · ${t("Sortie")}` : ""}</strong><Description text={m.description} /></span></button>)}</div>
          {!mods.length && <p className={styles.emptyResult}>{t("No compatible effects.")}</p>}
        </>}
      </div>
      <aside className={styles.preview}>
        {card && selected ? <>
          <BuilderCard card={card} onClick={() => { if (!curse) setTab("Epiphany"); }} />
          {variants.length > 1 && <label>{t("Card variant")}<select aria-label={t("Card variant")} value={selected.id} onChange={e => choose(e.target.value)}>{variants.map(c => <option key={c.id} value={c.id}>{c.id === baseId(c.id) ? t("Base card") : c.id.split("_").at(-1)?.toUpperCase()} · {c.cost < 0 ? "X" : c.cost} {t("cost")}</option>)}</select></label>}
          {[...selected.s.map(id => ({ id, mod: catalog.sparks.find(m => m.id === id)!, index: -1 })), ...selected.e.map((id, index) => ({ id, mod: catalog.eidolons.find(m => m.id === id)!, index }))].map(({ id, mod, index }) => <button className={styles.modChip} key={`${id}-${index}`} aria-label={`${t("Remove")} ${t(mod.slot_type?.name || mod.god_type || "Normal")} ${t("effect")}`} onClick={() => setSelected(index < 0 ? { ...selected, s: selected.s.filter(s => s !== id) } : { ...selected, e: selected.e.filter((_, i) => i !== index) })}>{plainText(mod.description)} <b>×</b></button>)}
          <button className={styles.primary} onClick={() => onConfirm(selected)}>{t("Confirm card")}</button>
        </> : <p className={styles.emptyResult}>{t("Select a card to preview and customize it.")}</p>}
      </aside>
    </div>
  </BuilderDialog>;
}
