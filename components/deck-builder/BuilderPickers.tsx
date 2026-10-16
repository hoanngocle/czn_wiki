"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Description } from "../cards/Description";
import { availableCards, baseId, cardGroup, GODS, isGod, modifierAllowed, plainText, resolveCard } from "../../lib/deck-builder/model";
import type { BuilderCharacter, CardSelection, Catalog, Deck, Modifier } from "../../lib/deck-builder/types";
import { BuilderDialog } from "./BuilderDialog";
import { BuilderCard } from "./BuilderCard";
import styles from "./DeckBuilder.module.css";

export function CharacterPicker({ catalog, kind, onSelect, onClose }: { catalog: Catalog; kind: "combatant" | "supporter"; onSelect: (character: BuilderCharacter) => void; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [job, setJob] = useState("");
  const [ego, setEgo] = useState("");
  const [rarity, setRarity] = useState("");
  const all = catalog.characters.filter(c => c.kind === kind);
  const matches = all.filter(c => (!query || [c.name, ...Object.values(c.names)].join(" ").toLowerCase().includes(query.toLowerCase())) && (!job || c.job === job) && (!ego || c.ego === ego) && (!rarity || c.rarity === Number(rarity)));
  return <BuilderDialog title={kind === "combatant" ? "Choose combatant" : "Choose partner"} onClose={onClose} wide>
    <div className={styles.filters}>
      <input type="search" aria-label="Search characters" placeholder="Search by name…" value={query} onChange={e => setQuery(e.target.value)} />
      <select aria-label="Class" value={job} onChange={e => setJob(e.target.value)}><option value="">All classes</option>{[...new Set(all.map(c => c.job))].map(j => <option key={j}>{j}</option>)}</select>
      {kind === "combatant" && <select aria-label="Ego" value={ego} onChange={e => setEgo(e.target.value)}><option value="">All egos</option>{[...new Set(all.map(c => c.ego))].map(j => <option key={j}>{j}</option>)}</select>}
      <select aria-label="Rarity" value={rarity} onChange={e => setRarity(e.target.value)}><option value="">All rarities</option><option value="5">★★★★★</option><option value="4">★★★★</option><option value="3">★★★</option></select>
    </div>
    <div className={styles.characterGrid}>{matches.map(c => <button key={c.id} className={styles.characterOption} aria-label={`Select ${c.name}`} onClick={() => onSelect(c)}>
      <span className={styles.portraitSmall} style={{ backgroundColor: `${c.color}30` }}>{c.portrait ? <Image src={c.portrait} alt="" fill sizes="120px" unoptimized /> : <span>{c.name.slice(0, 1)}</span>}</span>
      <strong>{c.name}</strong><small>{c.job} · {c.rarity}★</small>
    </button>)}</div>
    {!matches.length && <p className={styles.emptyResult}>No characters match these filters.</p>}
  </BuilderDialog>;
}

export function EquipmentPicker({ catalog, slot, onSelect, onClose }: { catalog: Catalog; slot: keyof Deck["relics"]; onSelect: (id: string) => void; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [rarity, setRarity] = useState("");
  const [limit, setLimit] = useState(40);
  const type = { weapon: "EQUIP_WEAPON", armor: "EQUIP_ARMOR", accessory: "EQUIP_ACC" }[slot];
  const items = catalog.relics.filter(r => r.type === type && (!rarity || r.rarity === rarity) && `${r.name} ${plainText(r.description)}`.toLowerCase().includes(query.toLowerCase()));
  return <BuilderDialog title={`Choose ${slot}`} onClose={onClose} wide>
    <div className={styles.filters}><input type="search" aria-label="Search equipment" placeholder="Search equipment or effects…" value={query} onChange={e => { setQuery(e.target.value); setLimit(40); }} /><select aria-label="Equipment rarity" value={rarity} onChange={e => setRarity(e.target.value)}><option value="">All rarities</option>{[...new Set(catalog.relics.map(r => r.rarity))].map(r => <option key={r} value={r}>{r.replace("RARITY_", "")}</option>)}</select></div>
    <div className={styles.optionList}>{items.slice(0, limit).map(r => <button key={r.id} className={styles.itemOption} onClick={() => onSelect(r.id)} aria-label={`Equip ${r.name}`}>
      {r.image && <Image src={r.image} alt="" width={56} height={56} unoptimized />}<span><strong>{r.name}</strong><small>{r.rarity.replace("RARITY_", "")}</small><Description text={r.description} /></span>
    </button>)}</div>
    {!items.length && <p className={styles.emptyResult}>No equipment matches these filters.</p>}
    {limit < items.length && <button className={styles.more} onClick={() => setLimit(limit + 40)}>Show more ({items.length - limit})</button>}
  </BuilderDialog>;
}

export function PiecePicker({ catalog, deck, onSelect, onClose }: { catalog: Catalog; deck: Deck; onSelect: (id: string, effectCount: number) => void; onClose: () => void }) {
  const used = deck.pieceSets.reduce((sum, p) => sum + p.effectCount, 0);
  return <BuilderDialog title={`Memory fragments · ${used}/6`} onClose={onClose} wide>
    <div className={styles.optionList}>{catalog.pieces.flatMap(p => ([2, 4] as const).filter(n => p[n === 2 ? "set2" : "set4"]).map(n => <button key={`${p.id}-${n}`} className={styles.itemOption} disabled={used + n > 6 || deck.pieceSets.some(item => item.id === p.id && item.effectCount === n)} onClick={() => onSelect(p.id, n)}>
      {p.image && <Image src={p.image} alt="" width={48} height={48} unoptimized />}<span><strong>{p.name} · {n} pieces</strong><Description text={p[n === 2 ? "set2" : "set4"]!.description} /></span>
    </button>))}</div>
  </BuilderDialog>;
}

export function CardPicker({ catalog, combatantId, initial, onConfirm, onClose }: { catalog: Catalog; combatantId: string; initial?: CardSelection; onConfirm: (card: CardSelection) => void; onClose: () => void }) {
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
  return <BuilderDialog title={initial ? "Edit card" : "Add card"} onClose={onClose} wide>
    <div className={styles.cardPickerLayout}>
      <div className={styles.pickerMain}>
        <div className={styles.tabs}>{["Cards", "Epiphany"].map(t => <button key={t} aria-pressed={tab === t} disabled={t === "Epiphany" && (!selected || curse)} onClick={() => setTab(t)}>{t === "Epiphany" && persona ? "Engravings" : t}</button>)}</div>
        {tab === "Cards" ? <>
          <div className={styles.filters}>
            <input type="search" aria-label="Search cards" placeholder="Search cards or effects…" value={query} onChange={e => { setQuery(e.target.value); setLimit(48); }} />
            <select aria-label="Card source" value={group} onChange={e => { setGroup(e.target.value); setLimit(48); }}><option value="">All sources</option>{["Combatant", "Neutral", "Monster", "Curse", "Event", "Persona"].map(g => <option key={g}>{g}</option>)}</select>
            <select aria-label="Card cost" value={cost} onChange={e => setCost(e.target.value)}><option value="">All costs</option>{[-1, 0, 1, 2, 3, 4].map(n => <option key={n} value={n}>{n < 0 ? "X" : n === 4 ? "4+" : n}</option>)}</select>
            <select aria-label="Card category" value={category} onChange={e => setCategory(e.target.value)}><option value="">All types</option><option value="CARD_ATK">Attack</option><option value="CARD_SKILL">Skill</option><option value="CARD_POWER">Upgrade</option></select>
          </div>
          <div className={styles.pickerCards}>{results.slice(0, limit).map(c => <BuilderCard key={c.id} card={c} selected={!!selected && baseId(selected.id) === c.id} onClick={() => choose(c.id)} />)}</div>
          {!results.length && <p className={styles.emptyResult}>No cards match these filters.</p>}
          {limit < results.length && <button className={styles.more} onClick={() => setLimit(limit + 48)}>Show more ({results.length - limit})</button>}
        </> : <>
          <div className={styles.filters}>{!persona && <><select aria-label="Epiphany type" value={god} onChange={e => setGod(e.target.value)}><option value="">All epiphanies</option><option value="normal">Normal</option>{GODS.map(g => <option key={g}>{g}</option>)}</select><label><input type="checkbox" checked={sortie} onChange={e => setSortie(e.target.checked)} /> Include Sortie</label></>}</div>
          <p className={styles.help}>{persona ? "Choose up to two engravings. The same engraving can occupy both slots." : "Choose one normal and one divine epiphany. Only compatible effects are shown."}</p>
          <div className={styles.optionList}>{mods.map(m => <button key={m.id} className={styles.itemOption} aria-pressed={persona ? selected!.e.includes(m.id) : selected!.s.includes(m.id)} disabled={persona && selected!.e.length >= 2} onClick={() => toggleModifier(m)}><span><strong>{m.slot_type?.name || m.god_type || "Normal"}{m.is_sortie ? " · Sortie" : ""}</strong><Description text={m.description} /></span></button>)}</div>
          {!mods.length && <p className={styles.emptyResult}>No compatible effects.</p>}
        </>}
      </div>
      <aside className={styles.preview}>
        {card && selected ? <>
          <BuilderCard card={card} onClick={() => { if (!curse) setTab("Epiphany"); }} />
          {variants.length > 1 && <label>Card variant<select aria-label="Card variant" value={selected.id} onChange={e => choose(e.target.value)}>{variants.map(c => <option key={c.id} value={c.id}>{c.id === baseId(c.id) ? "Base card" : c.id.split("_").at(-1)?.toUpperCase()} · {c.cost < 0 ? "X" : c.cost} cost</option>)}</select></label>}
          {[...selected.s.map(id => ({ id, mod: catalog.sparks.find(m => m.id === id)!, index: -1 })), ...selected.e.map((id, index) => ({ id, mod: catalog.eidolons.find(m => m.id === id)!, index }))].map(({ id, mod, index }) => <button className={styles.modChip} key={`${id}-${index}`} aria-label={`Remove ${mod.slot_type?.name || mod.god_type || "normal"} effect`} onClick={() => setSelected(index < 0 ? { ...selected, s: selected.s.filter(s => s !== id) } : { ...selected, e: selected.e.filter((_, i) => i !== index) })}>{plainText(mod.description)} <b>×</b></button>)}
          <button className={styles.primary} onClick={() => onConfirm(selected)}>Confirm card</button>
        </> : <p className={styles.emptyResult}>Select a card to preview and customize it.</p>}
      </aside>
    </div>
  </BuilderDialog>;
}
