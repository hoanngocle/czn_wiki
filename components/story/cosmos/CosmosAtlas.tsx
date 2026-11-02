"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRef, useState, type CSSProperties } from "react";
import { StoryShell } from "../StoryShell";
import { HeroIcon } from "../StoryHeroIcon";
import { COSMOS_SCOPE, chapterHref, cosmosEntities, cosmosKindLabels, cosmosRelations, getConnections, relationLabels, searchCosmos } from "../../../lib/story/cosmos";
import type { CameraRequest } from "./CosmosScene";
import styles from "./cosmos.module.css";

const CosmosScene = dynamic(() => import("./CosmosScene"), { ssr: false, loading: () => <div className={styles.loading} role="status">Đang mở không gian vũ trụ…</div> });
const groups = ["roi-rac", "sieu-duy", "tranh-ba", "luan-ham", "ky-di", "luc-dao"];

function Sources({ chapters }: { chapters: number[] }) {
  return <div className={styles.sources}>{chapters.map((chapter) => <Link key={chapter} href={chapterHref(chapter)} prefetch={false}>Chương {chapter}<HeroIcon name="external" size={11} /></Link>)}</div>;
}

export function CosmosAtlas() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("all");
  const [showRelations, setShowRelations] = useState(true);
  const [cameraRequest, setCameraRequest] = useState<CameraRequest>({ id: null, serial: 0 });
  const detailsRef = useRef<HTMLElement>(null);
  const selected = cosmosEntities.find((entity) => entity.id === selectedId);
  const connections = selected ? getConnections(selected.id) : [];
  const groupIds = group === "all" ? cosmosEntities.map((entity) => entity.id) : [group, ...cosmosRelations.filter((edge) => edge.source === group && ["contains", "system"].includes(edge.kind)).map((edge) => edge.target)];
  const results = searchCosmos(query).filter((entity) => groupIds.includes(entity.id));
  const visibleIds = results.map((entity) => entity.id);

  function select(id: string) {
    setSelectedId(id);
    setQuery("");
    setGroup("all");
    setCameraRequest((previous) => ({ id, serial: previous.serial + 1 }));
    requestAnimationFrame(() => {
      const inspector = detailsRef.current;
      if (!inspector) return;
      inspector.scrollTop = 0;
      inspector.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
        block: window.matchMedia("(max-width: 700px)").matches ? "start" : "nearest",
      });
    });
  }

  function overview() {
    setSelectedId(null);
    setQuery("");
    setGroup("all");
    setCameraRequest((previous) => ({ id: null, serial: previous.serial + 1 }));
  }

  return <StoryShell activeView="cosmos">
    <section className={styles.atlas} aria-label="Bản đồ vũ trụ">
      <header className={styles.heading}>
        <div><div className={styles.eyebrow}><span />CHƯ GIỚI TẬN THẾ ONLINE · ATLAS 01</div><h1>Bản đồ vũ trụ<span>Chín trăm triệu tầng thế giới</span></h1></div>
        <span className={styles.scope}>Bản thử nghiệm <strong>Đến chương {COSMOS_SCOPE}</strong></span>
      </header>
      <div className={styles.controls}>
        <label className={styles.search}><HeroIcon name="search" size={17} /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} aria-label="Tìm khu vực hoặc thế giới" placeholder="Tìm thế giới, khu vực…" /></label>
        <label className={styles.groupFilter}><span>Phạm vi</span><select value={group} onChange={(event) => { const id = event.target.value; setGroup(id); setQuery(""); setCameraRequest((previous) => ({ id: id === "all" ? null : id, serial: previous.serial + 1 })); }} aria-label="Lọc khu vực"><option value="all">Toàn vũ trụ</option>{groups.map((id) => { const entity = cosmosEntities.find((item) => item.id === id)!; return <option key={id} value={id}>{entity.shortName}</option>; })}</select></label>
        <button className={styles.overviewButton} type="button" onClick={overview}><HeroIcon name="fit" size={16} />Toàn cảnh</button>
      </div>
      <div className={styles.explorer}>
        <div className={styles.space}>
          <CosmosScene selectedId={selectedId} visibleIds={visibleIds} showRelations={showRelations} cameraRequest={cameraRequest} onSelect={select} />
          <div className={styles.spaceCaption}><span>KHÔNG GIAN THẾ GIỚI</span><p>{selected ? selected.name : "Mỗi điểm sáng, một thế giới."}</p></div>
          <div className={styles.spaceTools}>
            <button type="button" aria-label="Phóng to bản đồ" title="Phóng to" onClick={() => setCameraRequest((previous) => ({ id: selectedId, serial: previous.serial + 1, zoom: 8 }))}><HeroIcon name="plus" size={18} /></button>
            <button type="button" aria-label="Thu nhỏ bản đồ" title="Thu nhỏ" onClick={() => setCameraRequest((previous) => ({ id: selectedId, serial: previous.serial + 1, zoom: -8 }))}><HeroIcon name="minus" size={18} /></button>
            <button type="button" aria-pressed={showRelations} aria-label="Hiện quan hệ của điểm đang chọn" title="Hiện quan hệ" onClick={() => setShowRelations((value) => !value)}><HeroIcon name="map" size={18} /></button>
          </div>
          <div className={styles.spaceFooter}><span>Kéo để xoay · Cuộn / chụm để thu phóng</span><span>Bố cục minh họa · Không theo tỷ lệ</span></div>
        </div>
        <aside ref={detailsRef} className={styles.inspector} data-testid="cosmos-details" aria-label="Chi tiết địa điểm">
          {selected ? <>
            <div className={styles.detailTop}><span style={{ color: selected.color }}><i style={{ background: selected.color }} />{cosmosKindLabels[selected.kind]}</span><button type="button" aria-label="Đóng chi tiết địa điểm" onClick={() => setSelectedId(null)}><HeroIcon name="close" size={18} /></button></div>
            <h2>{selected.name}</h2>
            {selected.aliases && <p className={styles.aliases}>Còn gọi: {selected.aliases.join(" · ")}</p>}
            <p className={styles.summary}>{selected.summary}</p>
            {selected.note && <p className={styles.note}><HeroIcon name="book" size={15} /><span>{selected.note}</span></p>}
            <h3>Đối chiếu nguyên tác</h3><Sources chapters={selected.chapters} />
            {selected.history && <><h3>Dấu mốc</h3><ol className={styles.history}>{selected.history.map((event) => <li key={event.chapter}><Link prefetch={false} href={chapterHref(event.chapter)}>Ch. {event.chapter}</Link><p>{event.text}</p></li>)}</ol></>}
            <h3>Quan hệ <span>{connections.length}</span></h3>
            <ul className={styles.relations}>{connections.map(({ entity, relation }) => <li key={`${relation.source}-${relation.target}-${relation.kind}`}>
              <span className={styles.relationType} data-kind={relation.kind}>{relationLabels[relation.kind]}</span>
              <button type="button" onClick={() => select(entity.id)}><span>{entity.name}</span><HeroIcon name="arrow" size={15} /></button>
              <strong>{relation.label}</strong><p>{relation.detail}</p><Sources chapters={relation.chapters} />
            </li>)}</ul>
          </> : <div className={styles.intro}>
            <div className={styles.introOrbit}><HeroIcon name="world" size={36} /></div>
            <span className={styles.eyebrow}>BẮT ĐẦU KHÁM PHÁ</span><h2>Nhìn thấy<br /> mối liên hệ.</h2>
            <p>Chọn một thế giới trên bản đồ hoặc trong danh mục để xem vị trí trong hệ vũ trụ, lịch sử và các quan hệ.</p>
            <button type="button" onClick={() => select("reality")}>Từ thế giới hiện thực<HeroIcon name="arrow" size={17} /></button>
            <div className={styles.introLegend}><span><i style={{ background: "#91bccb" }} />Thế giới / hệ thế giới</span><span><i className={styles.legendRing} />Khu vực minh họa</span><span><i className={styles.legendDiamond} />Khái niệm / bí mật</span></div>
            <p className={styles.introNote}>Chỉ hiện đường nối của điểm đang chọn. Các giới đã dung hợp vẫn được giữ riêng để tra cứu lịch sử.</p>
          </div>}
        </aside>
      </div>
      <section className={styles.catalog} aria-label="Danh mục khu vực và thế giới">
        <div className={styles.catalogHeader}><h2>Danh mục vũ trụ</h2><span>{results.length} / {cosmosEntities.length} địa điểm & khái niệm</span></div>
        <div className={styles.results} data-testid="cosmos-results">{results.map((entity) => <button type="button" key={entity.id} aria-pressed={entity.id === selectedId} onClick={() => select(entity.id)} style={{ "--entity-color": entity.color } as CSSProperties}><i /><span>{entity.name}<small>{cosmosKindLabels[entity.kind]}</small></span><HeroIcon name="chevron" size={13} /></button>)}</div>
        {!results.length && <p className={styles.empty}>Không tìm thấy địa điểm phù hợp.</p>}
      </section>
      <footer className={styles.footnote}>Nguồn: EPUB trong thư viện · Nội dung chọn lọc đến chương 700, có tiết lộ cốt truyện. Khoảng cách và kích thước chỉ phục vụ trực quan hóa.</footer>
    </section>
  </StoryShell>;
}
