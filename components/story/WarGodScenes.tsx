"use client";
import type { CSSProperties } from "react";
import type { InspectedWeapon } from "../../lib/story/war-god-inspection";
import type { WarGodSystemState } from "../../lib/story/war-god-system";
import { SystemGlyph, WeaponIllustration } from "./WarGodGlyphs";
import styles from "./war-god-system.module.css";

export function InspectionScene({ weapon, weapons, onSelect }: { weapon: InspectedWeapon; weapons: InspectedWeapon[]; onSelect: (id: InspectedWeapon["id"]) => void }) {
  return <><div className={styles.sceneHeading}><h3>Kỹ nghệ Chiến Thần</h3></div>
    <div className={styles.inspection}><div className={styles.artifact}><WeaponIllustration kind={weapon.id} /><h4>{weapon.name}</h4><div className={styles.weaponPicker}>{weapons.map((item) => <button type="button" key={item.id} aria-label={item.name} aria-pressed={item.id === weapon.id} onClick={() => onSelect(item.id)}>{item.id === "bow" ? "Cung" : item.id === "saber" ? "Đao" : "Giáo"}</button>)}</div></div>
      <div className={styles.techniques}><p className={styles.description}>{weapon.description}</p>{weapon.techniques.map((item) => <article key={item.name}><div><h4>{item.name}</h4><span className={styles.cost}>{item.cost === null ? "—" : item.cost}<small>HỒN LỰC</small></span></div><p>Người thi triển: {item.performer}</p><p className={styles.techniqueState}>{item.status}</p>{item.costNote && <small>{item.costNote}</small>}</article>)}</div></div></>;
}
export function WheelScene({ system, selectedIndex, onSelect }: { system: WarGodSystemState; selectedIndex: number; onSelect: (index: number) => void }) {
  const selected = system.materials[selectedIndex];
  return <><div className={styles.sceneHeading}><h3>Vòng quay năm chủng</h3></div>
    <div className={styles.wheelLayout}><div className={`${styles.wheel} ${system.chapter >= 95 ? styles.completeWheel : ""}`} role="group" aria-label="Bàn quay năm chủng"><div className={styles.wheelRings} aria-hidden="true" /><div className={styles.wheelCore}><span>{system.chapter >= 95 ? "HOÀN THÀNH" : "THỜI HẠN"}</span><strong>{system.chapter >= 95 ? "五" : "48"}</strong><small>{system.chapter >= 95 ? "NĂM CHỦNG" : "GIỜ"}</small></div>{system.materials.map((item, index) => <button type="button" key={item.id} className={styles.socket} style={{ "--angle": `${index * 72}deg`, "--reverse": `${-index * 72}deg` } as CSSProperties} aria-label={item.kind} aria-pressed={index === selectedIndex} data-filled={item.state === "Đã đưa vào vòng quay"} onClick={() => onSelect(index)} onFocus={() => onSelect(index)}><SystemGlyph name={item.id} /></button>)}</div>
      <section className={styles.wheelDetail} aria-live="polite"><h4>{selected.kind}</h4><div className={styles.materialFact}><span>VẬT LIỆU</span><strong>{selected.name ?? "Chưa tìm thấy"}</strong>{selected.name && <small>{selected.state}</small>}</div></section></div></>;
}
export function ChoiceScene({ system, selectedIndex, onSelect, returning, onReplay }: { system: WarGodSystemState; selectedIndex: number; onSelect: (index: number) => void; returning: boolean; onReplay: () => void }) {
  const selected = system.choices[selectedIndex];
  return <><div className={styles.sceneHeading}><h3>Thức tỉnh thần thông</h3></div>
    <div className={`${styles.choiceOrbit} ${returning ? styles.returning : ""}`} role="group" aria-label="Bốn lựa chọn Thần thông"><div className={styles.choiceCenter} aria-hidden="true">{returning ? "Tru Tà" : "S"}</div>{system.choices.map((item, index) => <button type="button" key={item.id} aria-label={item.name} aria-pressed={selectedIndex === index} className={styles.choice} onMouseEnter={() => { if (!returning) onSelect(index); }} onFocus={() => { if (!returning) onSelect(index); }} onClick={() => { if (!returning) onSelect(index); }}><SystemGlyph name={item.glyph === "unknown" ? "unrevealed" : item.glyph} /><span>{item.name}</span></button>)}</div>
    <section className={styles.choiceDetail} aria-live="polite" data-testid="choice-detail"><h4>{selected.name}</h4>{selected.glyph !== "unknown" && <p>{system.chapter < 98 ? "Thời gian" : selected.description}</p>}</section>{system.chapter >= 98 && <button type="button" className={styles.replayButton} disabled={returning} onClick={onReplay}>Xem lại lựa chọn Tru Tà <span aria-hidden="true">↘</span></button>}</>;
}
export function MissionScene({ system, alert = false }: { system: WarGodSystemState; alert?: boolean }) {
  const mission = system.modules.find((item) => item.id === "destiny");
  return <section className={`${styles.mission} ${alert || system.chapter < 80 ? styles.danger : ""}`}><div className={styles.lightSweep} aria-hidden="true" /><span className={styles.eyebrow}>{alert ? "CẢNH BÁO · CHƯƠNG 94" : "NHIỆM VỤ ĐỊNH MỆNH"}</span><h3>{alert ? "Dòng thời gian hỗn loạn" : "Trận Chiến Chết Chóc"}</h3>{alert && <p className={styles.missionLead}>Tiến vào thế giới tu hành trước khi đường hầm không gian đóng lại.</p>}<div className={styles.missionLines}>{alert ? <><p><span>THỜI HẠN</span>15 giây</p></> : <><p><span>MỤC TIÊU</span>Cứu giúp Công Tôn Trí và Ninh Nguyệt Thiền.</p><p><span>PHẦN THƯỞNG</span>{system.chapter >= 81 ? "Thần thông Chiến Thần · Kịch bản đặc biệt" : "Chiến Thần Thần Thông (duy nhất)"}</p><p><span>TRẠNG THÁI</span>{mission?.status}</p>{system.chapter < 80 ? <p className={styles.failure}>Thất bại: người chơi bị xóa sổ.</p> : <p>{system.chapter >= 81 ? "Cả hai đã trở về Nhân tộc an toàn." : "Hệ thống đã thông báo nhiệm vụ hoàn thành."}</p>}</>}</div></section>;
}
export function DivinityScene({ system, onReplay }: { system: WarGodSystemState; onReplay: () => void }) {
  return <section className={styles.divinity}><span className={styles.eyebrow}>THẦN THÔNG CHIẾN THẦN</span><div className={styles.divinitySeal}><SystemGlyph name="snakes" /></div><h3>Tru Tà</h3><p>{system.modules.find((item) => item.id === "divinity")?.description}</p>{system.control && <div className={styles.lightningFact}><span>{system.control.name.toLocaleUpperCase("vi")}</span><strong>{system.control.seconds} <small>giây</small></strong></div>}<button type="button" className={styles.replayButton} onClick={onReplay}>Xem lại bốn lựa chọn <span aria-hidden="true">↗</span></button></section>;
}

export function TitlesScene({ system }: { system: WarGodSystemState }) {
  return <section className={styles.messages} aria-label="Danh Hiệu Chiến Thần"><h3>Danh hiệu Chiến Thần</h3><p>Chỉ có thể trang bị một danh hiệu cùng lúc.</p><div className={styles.techniques}>{system.titles.map((title) => <article key={title.id}><h4>{title.name}</h4><p>{title.skill}</p><p>{title.description}</p><a href={`/chu-gioi-tan-the-online/html/chuong-${String(title.chapter).padStart(4, "0")}.html`}>Chương {title.chapter} ↗</a></article>)}</div></section>;
}
