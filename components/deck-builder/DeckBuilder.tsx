"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Description } from "../cards/Description";
import { addCard, calculatePT, cardGroup, createDeck, decodeDeck, encodeDeck, parseDecks, resolveCard, STORAGE_KEY, validateDeck } from "../../lib/deck-builder/model";
import type { BuilderCharacter, Catalog, Deck } from "../../lib/deck-builder/types";
import { BuilderCard } from "./BuilderCard";
import { BuilderDialog } from "./BuilderDialog";
import { CardPicker, CharacterPicker, EquipmentPicker, PiecePicker } from "./BuilderPickers";
import styles from "./DeckBuilder.module.css";

type Modal = "combatant" | "supporter" | "cards" | "weapon" | "armor" | "accessory" | "pieces" | "save" | "history" | "share" | "pt" | null;
const slots = ["weapon", "armor", "accessory"] as const;

function Portrait({ character, label, onClick, onRemove }: { character?: BuilderCharacter; label: string; onClick: () => void; onRemove: () => void }) {
  return <div className={styles.portraitWrap}>
    <button className={`${styles.portrait} ${character ? styles.filledPortrait : ""}`} aria-label={`Choose ${label}`} onClick={onClick} style={character ? { backgroundColor: `${character.color}30` } : undefined}>
      {character?.portrait && <Image src={character.portrait} alt="" fill sizes="180px" unoptimized />}
      {character ? <span className={styles.portraitCaption}><small>{character.job} · {"★".repeat(character.rarity)}</small><strong>{character.name}</strong></span> : <span className={styles.placeholder}><b>＋</b><span>Select {label}</span></span>}
    </button>
    {character && <button className={styles.removePortrait} aria-label={`Remove ${label}`} onClick={onRemove}>×</button>}
  </div>;
}

export function DeckBuilder({ catalog }: { catalog: Catalog }) {
  const [deck, setDeck] = useState(() => createDeck("", catalog));
  const [saved, setSaved] = useState<Deck[]>([]);
  const [modal, setModal] = useState<Modal>(null);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [notice, setNotice] = useState("");
  const [mobileTab, setMobileTab] = useState("Setup");
  const [shareLink, setShareLink] = useState("");
  const [ready, setReady] = useState(false);
  const [storageLocked, setStorageLocked] = useState(false);
  const storageSnapshot = useRef<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const character = catalog.characters.find(c => c.id === deck.combatantId);
  const partner = catalog.characters.find(c => c.id === deck.partnerId);
  const partnerDetail = catalog.partners.find(p => p.id === deck.partnerId);
  const cards = useMemo(() => deck.cardIds.map(s => resolveCard(s, catalog)), [deck.cardIds, catalog]);
  const pt = useMemo(() => calculatePT(deck, catalog), [deck, catalog]);
  const pieceCount = deck.pieceSets.reduce((sum, p) => sum + p.effectCount, 0);
  const average = cards.length ? cards.reduce((sum, c) => sum + Math.max(0, c.cost), 0) / cards.length : 0;
  const costs = [0, 1, 2, 3, 4, -1].map(cost => ({ label: cost < 0 ? "X" : cost === 4 ? "4+" : String(cost), count: cards.filter(c => cost === 4 ? c.cost >= 4 : c.cost === cost).length }));
  const groups = ["Combatant", "Neutral", "Monster", "Curse", "Event", "Persona"].map(label => ({ label, count: cards.filter(c => cardGroup(c, deck.combatantId) === label).length }));
  const close = () => setModal(null);
  const report = (error: unknown) => setNotice(error instanceof Error ? error.message : "Unable to complete this action.");

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        const text = localStorage.getItem(STORAGE_KEY);
        storageSnapshot.current = text;
        if (text) setSaved(parseDecks(text, catalog));
      } catch { setStorageLocked(true); setNotice("Saved decks could not be read. Saving is paused to preserve your data. Open Saved decks to export the original backup."); }
      try {
        const url = new URL(window.location.href);
        const encoded = url.searchParams.get("deck") ?? new URLSearchParams(url.hash.split("?")[1] ?? "").get("deck");
        if (encoded) { setDeck(decodeDeck(encoded, catalog)); setMobileTab("Deck"); }
      } catch { setNotice("This share link is invalid or contains data unavailable in the local catalog."); }
      setReady(true);
    });
    return () => cancelAnimationFrame(frame);
  }, [catalog]);

  function persist(next: Deck[]) {
    if (storageLocked) throw new Error("Saving is paused to protect unreadable browser data. Export the original backup from Saved decks before resetting storage.");
    const current = localStorage.getItem(STORAGE_KEY);
    if (current !== storageSnapshot.current) {
      try { setSaved(current ? parseDecks(current, catalog) : []); storageSnapshot.current = current; }
      catch { setStorageLocked(true); throw new Error("Browser data has changed and cannot be read. Saving is paused to protect it."); }
      throw new Error("Saved decks changed in another tab. The list has been refreshed; please try again.");
    }
    if (next.length > 500) throw new Error("You can save up to 500 decks. Export a backup before removing old decks.");
    const serialized = JSON.stringify(next);
    if (serialized.length > 2_000_000) throw new Error("Saved decks exceed 2 MB. Export a backup and remove older decks first.");
    localStorage.setItem(STORAGE_KEY, serialized);
    storageSnapshot.current = serialized;
    setSaved(next);
  }
  function save(copy = false) {
    try {
      const next = validateDeck({ ...deck, name, id: !copy && deck.id ? deck.id : crypto.randomUUID(), savedAt: Date.now() }, catalog);
      persist([next, ...saved.filter(d => d.id !== next.id)]);
      setDeck(next); close(); setNotice("Deck saved in this browser.");
    } catch (error) { report(error); }
  }
  function newDeck() {
    if (deck.combatantId && !window.confirm("Start a new deck? Unsaved changes will be discarded.")) return;
    setDeck(createDeck("", catalog)); setMobileTab("Setup"); setNotice("");
    window.history.replaceState(null, "", window.location.pathname);
  }
  function exportDecks(raw = false) {
    const blob = new Blob([raw ? storageSnapshot.current ?? "[]" : JSON.stringify(saved)], { type: "application/json" });
    const url = URL.createObjectURL(blob), anchor = document.createElement("a");
    anchor.href = url; anchor.download = `czn_decks_backup_${new Date().toISOString().slice(0, 10)}.json`;
    anchor.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  async function importDecks(file?: File) {
    if (!file) return;
    try {
      if (file.size > 2_000_000) throw new Error("Backup is too large (maximum 2 MB).");
      const incoming = parseDecks(await file.text(), catalog);
      const fingerprint = (d: Deck) => JSON.stringify([d.name, d.combatantId, d.partnerId, d.cardIds, d.relics, d.pieceSets, d.ptLimit]);
      const seen = new Set(saved.map(fingerprint));
      const additions = incoming.filter(d => { const key = fingerprint(d); if (seen.has(key)) return false; seen.add(key); return true; }).map(d => ({ ...d, id: crypto.randomUUID(), savedAt: Date.now() }));
      persist([...additions, ...saved]); setNotice(`${additions.length} deck(s) imported.`);
    } catch (error) { report(error); }
    finally { if (fileInput.current) fileInput.current.value = ""; }
  }
  function share() {
    const url = new URL(window.location.pathname, window.location.origin);
    url.searchParams.set("deck", encodeDeck(deck)); setShareLink(url.toString()); setModal("share");
  }

  return <div className={styles.page}>
    <header className={styles.pageHeader}><div><h1>Deck Builder</h1><p>Build, customize, and save your Chaos Zero Nightmare decks.</p></div><div className={styles.toolbar}><button onClick={newDeck}>＋ New deck</button><button aria-label="Saved decks" onClick={() => setModal("history")} disabled={!ready}>Saved decks <span>{saved.length}</span></button></div></header>
    {notice && <div role="status" className={styles.notice}>{notice}<button aria-label="Dismiss notification" onClick={() => setNotice("")}>×</button></div>}
    <div className={`${styles.tabs} ${styles.mobileTabs}`} aria-label="Builder sections">{["Setup", "Deck", "Stats"].map(tab => <button key={tab} aria-pressed={tab === mobileTab} onClick={() => setMobileTab(tab)}>{tab}{tab === "Deck" ? ` (${cards.length})` : ""}</button>)}</div>
    <div className={styles.layout}>
      <section className={`${styles.setup} ${mobileTab !== "Setup" ? styles.mobileHidden : ""}`} aria-label="Deck setup">
        <div className={styles.portraits}>
          <Portrait character={character} label="combatant" onClick={() => setModal("combatant")} onRemove={newDeck} />
          <Portrait character={partner} label="partner" onClick={() => setModal("supporter")} onRemove={() => setDeck({ ...deck, partnerId: null })} />
        </div>
        {partnerDetail && <details className={styles.partnerDetails}><summary>{partner?.name} · Partner effects</summary><Description text={partnerDetail.description} /><h4>{partnerDetail.card.name}</h4><Description text={partnerDetail.card.description} /></details>}
        <div className={styles.sectionHeading}><h2>Equipment</h2><small>3 slots</small></div>
        <div className={styles.equipment}>{slots.map(slot => {
          const relic = catalog.relics.find(r => r.id === deck.relics[slot]);
          return <div key={slot} className={styles.equipmentWrap}><button className={styles.equipmentSlot} disabled={!character} aria-label={`Choose ${slot}`} onClick={() => setModal(slot)} title={relic?.name}>
            {relic?.image ? <Image src={relic.image} alt="" width={54} height={54} unoptimized /> : <b>{relic ? "◆" : "＋"}</b>}<small>{relic?.name ?? slot}</small>
          </button>{relic && <button className={styles.removeEquipment} aria-label={`Remove ${slot}`} onClick={() => setDeck({ ...deck, relics: { ...deck.relics, [slot]: null } })}>×</button>}</div>;
        })}</div>
        {slots.map(slot => { const relic = catalog.relics.find(r => r.id === deck.relics[slot]); return relic ? <details key={slot} className={styles.partnerDetails}><summary>{relic.name}</summary><Description text={relic.description} /></details> : null; })}
        <div className={styles.sectionHeading}><h2>Memory fragments</h2><small>{pieceCount}/6</small></div>
        <div className={styles.pieces}>{deck.pieceSets.map((selection, index) => {
          const p = catalog.pieces.find(p => p.id === selection.id)!;
          return <div key={`${p.id}-${selection.effectCount}`} className={styles.piece}><div><strong>{p.name} ({selection.effectCount})</strong><Description text={p[selection.effectCount === 2 ? "set2" : "set4"]!.description} /></div><button aria-label={`Remove ${p.name}`} onClick={() => setDeck({ ...deck, pieceSets: deck.pieceSets.filter((_, i) => i !== index) })}>×</button></div>;
        })}<button className={styles.addPiece} disabled={!character || pieceCount >= 6} onClick={() => setModal("pieces")}>＋ Add memory fragments</button></div>
      </section>
      <section className={`${styles.deckPanel} ${mobileTab !== "Deck" ? styles.mobileHidden : ""}`} aria-label="Deck cards">
        <div className={styles.sectionHeading}><div><h2>{character ? deck.name : "Your deck"}</h2><small>{cards.length} / 40 cards</small></div><button className={styles.primary} disabled={!character || cards.length >= 40} onClick={() => { setEditIndex(null); setModal("cards"); }}>Add card</button></div>
        {!cards.length ? <div className={styles.emptyDeck}><span aria-hidden="true">▱</span><h3>{character ? "Your deck is empty" : "Start with a combatant"}</h3><p>{character ? "Add cards to build your deck." : "Select a combatant to load their starting cards, then customize your build."}</p><button onClick={() => { setEditIndex(null); setModal(character ? "cards" : "combatant"); }}>{character ? "Choose cards" : "Select combatant"}</button></div> : <div className={styles.deckGrid}>{cards.map((card, index) => <article key={index} className={styles.deckCard} data-testid="deck-card">
          <BuilderCard card={card} onClick={() => { setEditIndex(index); setModal("cards"); }} />
          <div className={styles.cardActions}><button aria-label={`Edit ${card.name}`} onClick={() => { setEditIndex(index); setModal("cards"); }}>Edit</button><button aria-label={`Copy ${card.name}`} disabled={cards.length >= 40} onClick={() => { try { setDeck(addCard(deck, deck.cardIds[index], index + 1)); } catch (error) { report(error); } }}>Copy</button><button aria-label={`Remove ${card.name}`} onClick={() => setDeck({ ...deck, cardIds: deck.cardIds.filter((_, i) => i !== index) })}>×</button></div>
        </article>)}</div>}
      </section>
      <aside className={`${styles.stats} ${mobileTab !== "Stats" ? styles.mobileHidden : ""}`} aria-label="Deck statistics">
        <div className={styles.statsBox}><h2>Deck statistics</h2>
          <div className={styles.statRow}><span>Total cards</span><strong>{cards.length}</strong></div>
          <div className={styles.statRow}><span>Average cost</span><strong>{average.toFixed(2)}</strong></div>
          <div className={styles.ptBox} data-over={pt.total > deck.ptLimit}><button className={styles.ptSummary} onClick={() => setModal("pt")}><span>PT</span><strong data-testid="pt-total">{pt.total}</strong><small>/ {deck.ptLimit}</small></button><progress aria-label="PT usage" max={Math.max(1, deck.ptLimit)} value={Math.min(pt.total, Math.max(1, deck.ptLimit))} /><label>PT limit<input aria-label="PT limit" type="number" min={0} max={999} value={deck.ptLimit} onChange={e => { const value = Number(e.target.value); if (Number.isInteger(value) && value >= 0 && value <= 999) setDeck({ ...deck, ptLimit: value }); }} /></label>{pt.total > deck.ptLimit && <small className={styles.danger}>Over the PT limit by {pt.total - deck.ptLimit}</small>}</div>
          <h3>Card composition</h3><div className={styles.composition}>{groups.map(g => <div key={g.label}><span>{g.label}</span><div><i style={{ width: `${cards.length ? g.count / cards.length * 100 : 0}%` }} /></div><strong>{g.count}</strong></div>)}</div>
          <h3>Cost distribution</h3><div className={styles.costChart}>{costs.map(c => <div key={c.label}><strong>{c.count}</strong><div><i style={{ height: `${c.count / Math.max(1, ...costs.map(c => c.count)) * 100}%` }} /></div><span>{c.label}</span></div>)}</div>
        </div>
        <button className={styles.primary} disabled={!character} aria-label="Save deck" onClick={() => { setName(deck.name); setModal("save"); }}>Save deck</button>
        <button disabled={!character} onClick={share}>Share deck</button>
        <p className={styles.help}>Decks are saved in this browser. Export a backup to keep or transfer them.</p>
      </aside>
    </div>
    {(modal === "combatant" || modal === "supporter") && <CharacterPicker catalog={catalog} kind={modal} onClose={close} onSelect={c => {
      if (modal === "combatant") { if (deck.combatantId && !window.confirm("Change combatant and replace the current deck?")) return; setDeck(createDeck(c.id, catalog)); }
      else setDeck({ ...deck, partnerId: c.id }); close();
    }} />}
    {modal && slots.includes(modal as typeof slots[number]) && <EquipmentPicker catalog={catalog} slot={modal as typeof slots[number]} onClose={close} onSelect={id => { setDeck({ ...deck, relics: { ...deck.relics, [modal]: id } }); close(); }} />}
    {modal === "pieces" && <PiecePicker catalog={catalog} deck={deck} onClose={close} onSelect={(id, effectCount) => { setDeck({ ...deck, pieceSets: [...deck.pieceSets, { id, effectCount }] }); close(); }} />}
    {modal === "cards" && <CardPicker catalog={catalog} combatantId={deck.combatantId} initial={editIndex === null ? undefined : deck.cardIds[editIndex]} onClose={close} onConfirm={selection => {
      try { setDeck(editIndex === null ? addCard(deck, selection) : { ...deck, cardIds: deck.cardIds.map((c, i) => i === editIndex ? selection : c) }); close(); } catch (error) { report(error); }
    }} />}
    {modal === "save" && <BuilderDialog title="Save deck" onClose={close} notice={notice}><form className={styles.form} onSubmit={e => { e.preventDefault(); save(); }}><label>Deck name<input aria-label="Deck name" value={name} maxLength={120} required onChange={e => setName(e.target.value)} /></label><div className={styles.toolbar}><button className={styles.primary} type="submit">Save</button>{deck.id && <button type="button" onClick={() => save(true)}>Save as copy</button>}</div></form></BuilderDialog>}
    {modal === "history" && <BuilderDialog title="Saved decks" onClose={close} notice={notice} wide>
      <div className={styles.historyTools}><button disabled={!saved.length} onClick={() => exportDecks()}>Export JSON</button><button onClick={() => fileInput.current?.click()}>Import JSON</button></div>
      {storageLocked && <div className={styles.form}><p>Your original saved data has not been overwritten. Download it before resetting this browser’s saved decks.</p><button onClick={() => exportDecks(true)}>Export original backup</button><button onClick={() => { if (!window.confirm("Reset saved decks? Make sure you have exported the original backup. This removes the unreadable saved data from this browser.")) return; try { localStorage.removeItem(STORAGE_KEY); storageSnapshot.current = null; setStorageLocked(false); setSaved([]); setNotice("Saved deck storage reset. You can now save or import a valid backup."); } catch (error) { report(error); } }}>Reset saved deck storage</button></div>}
      {!saved.length && <p className={styles.emptyResult}>No saved decks yet. Build a deck and save it here.</p>}
      <div className={styles.savedList}>{saved.map(d => <div key={d.id} className={styles.savedDeck}><div><strong>{d.name}</strong><small>{catalog.characters.find(c => c.id === d.combatantId)?.name} · {d.cardIds.length} cards · {calculatePT(d, catalog).total} PT</small></div><div className={styles.toolbar}><button aria-label={`Load ${d.name}`} onClick={() => { setDeck(d); close(); setMobileTab("Deck"); }}>Load</button><button aria-label={`Rename ${d.name}`} onClick={() => { const nextName = window.prompt("Deck name", d.name); if (nextName === null) return; try { const next = validateDeck({ ...d, name: nextName }, catalog); persist(saved.map(item => item.id === d.id ? next : item)); if (deck.id === d.id) setDeck({ ...deck, name: next.name }); } catch (error) { report(error); } }}>Rename</button><button aria-label={`Delete ${d.name}`} onClick={() => { if (!window.confirm(`Delete “${d.name}”?`)) return; try { persist(saved.filter(item => item.id !== d.id)); if (deck.id === d.id) setDeck({ ...deck, id: "" }); } catch (error) { report(error); } }}>Delete</button></div></div>)}</div>
    </BuilderDialog>}
    {modal === "share" && <BuilderDialog title="Share deck" onClose={close} notice={notice}><div className={styles.form}><p>Anyone with this link can open a copy of your deck.</p><label>Share link<input aria-label="Share link" value={shareLink} readOnly onFocus={e => e.target.select()} /></label><button className={styles.primary} onClick={async () => { try { await navigator.clipboard.writeText(shareLink); setNotice("Share link copied."); } catch { setNotice("Select and copy the share link manually."); } }}>Copy link</button></div></BuilderDialog>}
    {modal === "pt" && <BuilderDialog title="PT breakdown" onClose={close}><div className={styles.form}>{[["Removed starting cards", pt.missingScore], ["Copies beyond the first two", pt.copyScore], ["Neutral, event and curse cards", pt.neutralTabooScore], ["Monster cards", pt.monsterScore], ["Divine epiphanies", pt.godFlashScore]].map(([label, score]) => <div className={styles.statRow} key={label}><span>{label}</span><strong>{score} PT</strong></div>)}<div className={styles.statRow}><strong>Total</strong><strong>{pt.total} / {deck.ptLimit} PT</strong></div><p className={styles.help}>Removed starting cards: 20 PT each. The first two copies are free, then 40 PT each. Neutral, event and curse cards: 20 PT. Monster cards: 20 / 50 / 80 PT by rarity. Divine epiphanies: 20 PT per card.</p></div></BuilderDialog>}
    <input ref={fileInput} type="file" accept=".json,application/json" aria-label="Import deck backup" hidden onChange={e => void importDecks(e.target.files?.[0])} />
  </div>;
}
