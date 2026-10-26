"use client";

import { useState } from "react";
import Image from "next/image";
import { Description } from "../cards/Description";
import { Dialog } from "../ui/Dialog";
import styles from "./EquipmentBrowser.module.css";

type Equipment = {
  id: string; name: string; names: Record<string, string>; type: string;
  rarity: string; image: string; description: string; chaos: string | null;
};
const types: Record<string, string> = { EQUIP_WEAPON: "Weapon", EQUIP_ARMOR: "Armor", EQUIP_ACC: "Accessory" };
const rarities: Record<string, string> = { RARITY_LEGEND: "Legendary", RARITY_UNIQUE: "Unique", RARITY_RARE: "Rare", RARITY_COMMON: "Common" };
const rarityOrder = Object.keys(rarities);
const batchSize = 48;
const normalize = (text: string) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/gi, "d").toLowerCase().trim();

export function EquipmentBrowser({ equipment }: { equipment: Equipment[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [rarity, setRarity] = useState("");
  const [chaos, setChaos] = useState("");
  const [limit, setLimit] = useState(batchSize);
  const [selected, setSelected] = useState<Equipment | null>(null);
  const search = normalize(query);
  const areas = [...new Set(equipment.flatMap(item => item.chaos ? [item.chaos] : []))].sort();
  const filtered = equipment.filter(item => (!type || item.type === type) && (!rarity || item.rarity === rarity) && (!chaos || item.chaos === chaos)
    && normalize(`${item.name} ${Object.values(item.names).join(" ")} ${item.description.replace(/<br\s*\/?\s*>/gi, " ").replace(/<[^>]*>/g, "")} ${item.chaos ?? ""}`).includes(search))
    .sort((a, b) => rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity) || a.name.localeCompare(b.name, "en") || a.id.localeCompare(b.id));
  const reset = () => { setQuery(""); setType(""); setRarity(""); setChaos(""); setLimit(batchSize); };

  return <div className={styles.page} lang="vi">
    <header className={styles.header}>
      <div><span className={styles.eyebrow}>CHAOS ZERO NIGHTMARE</span><h1>Equipment</h1><p>Tra cứu Weapon, Armor và Accessory. Chọn Equipment để xem đầy đủ hiệu ứng.</p></div>
      <span className={styles.total}><strong>{equipment.length}</strong> trang bị</span>
    </header>
    <section className={styles.toolbar} aria-label="Bộ lọc trang bị">
      <div className={styles.types} role="group" aria-label="Loại trang bị">
        {Object.entries({ "": "Tất cả", ...types }).map(([value, label]) => <button key={value} type="button" aria-pressed={type === value} onClick={() => { setType(value); setLimit(batchSize); }}>{label}</button>)}
      </div>
      <div className={styles.filters}>
        <label className={styles.search}>Tìm kiếm<input type="search" placeholder="Tên hoặc hiệu ứng trang bị…" value={query} onChange={event => { setQuery(event.target.value); setLimit(batchSize); }} /></label>
        <label>Rarity<select value={rarity} onChange={event => { setRarity(event.target.value); setLimit(batchSize); }}><option value="">Tất cả Rarity</option>{Object.entries(rarities).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>
        <label>Khu vực<select value={chaos} onChange={event => { setChaos(event.target.value); setLimit(batchSize); }}><option value="">Tất cả khu vực</option>{areas.map(area => <option key={area}>{area}</option>)}</select></label>
      </div>
    </section>
    <div className={styles.results}><p role="status" aria-live="polite">{filtered.length} / {equipment.length} trang bị</p><button type="button" onClick={reset} disabled={!query && !type && !rarity && !chaos}>Xóa bộ lọc</button></div>
    <div className={styles.grid}>
      {filtered.slice(0, limit).map(item => <button key={item.id} type="button" className={styles.card} data-rarity={item.rarity} data-equipment-id={item.id} aria-label={`Xem ${item.name}`} onClick={() => setSelected(item)}>
        <span className={styles.cardHeader}><span className={styles.artwork}><Image src={item.image} alt="" width={84} height={84} unoptimized /></span><span className={styles.identity}><span className={styles.rarity}>{rarities[item.rarity]}</span><span className={styles.name} lang="en">{item.name}</span><span className={styles.type}>{types[item.type]}</span></span></span>
        <span className={styles.description} lang="en"><Description text={item.description} /></span>
        <span className={styles.cardFooter}>{item.chaos ?? "—"}<span aria-hidden="true">↗</span></span>
      </button>)}
    </div>
    {filtered.length === 0 && <div className={styles.empty}><h2>Không tìm thấy trang bị phù hợp.</h2><p>Thử tên khác hoặc xóa bộ lọc để xem tất cả trang bị.</p></div>}
    {filtered.length > limit && <button type="button" className={styles.more} onClick={() => setLimit(current => current + batchSize)}>Xem thêm ({filtered.length - limit})</button>}
    {selected && <Dialog title={selected.name} closeLabel="Đóng chi tiết" onClose={() => setSelected(null)}>
      <div className={styles.detail} data-rarity={selected.rarity}>
        <div className={styles.detailHeader}><span className={styles.artwork}><Image src={selected.image} alt={selected.name} width={112} height={112} unoptimized /></span><div><span className={styles.rarity}>{rarities[selected.rarity]}</span><p>{types[selected.type]}</p>{selected.chaos && <p>Khu vực: <span lang="en">{selected.chaos}</span></p>}</div></div>
        <h3>Hiệu ứng</h3><div className={styles.effect} lang="en"><Description text={selected.description} /></div>
      </div>
    </Dialog>}
  </div>;
}
