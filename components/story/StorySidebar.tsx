"use client";

import Link from "next/link";
import { ArchiveBoxIcon, BoltIcon, SparklesIcon, UserIcon } from "@heroicons/react/24/outline";
import { storyScope } from "../../lib/story/timeline";
import { HeroIcon } from "./StoryHeroIcon";
import styles from "./story-timeline.module.css";
import shell from "./story-shell.module.css";
import { StoryArcMenu } from "./StoryArcMenu";

export const storyUrl = "/ebooks/chu-gioi-tan-the-online";
export const storyReaderUrl = `${storyUrl}/doc-truyen`;
const sections = [
  { id: "character", label: "Nhân vật", icon: UserIcon },
  { id: "equipment", label: "Pháp bảo", icon: SparklesIcon },
  { id: "inventory", label: "Hòm đồ", icon: ArchiveBoxIcon },
  { id: "skills", label: "Kỹ năng", icon: BoltIcon },
];

export function StorySidebar({ activeView, activeArcId }: { activeView: "timeline" | "reader" | "profile"; activeArcId?: string }) {
  return <aside className={styles.sidebar} aria-label="Mục lục wiki">
    <div className={styles.collection}><div className={`${styles.bookCover} ${shell.cover}`}><span className={styles.coverOrbit} /><HeroIcon name="event" size={39} /><span>CHƯ GIỚI<br />TẬN THẾ ONLINE</span><small>MỘT HÀNH TRÌNH · VẠN THẾ GIỚI</small></div></div>
    <div className={styles.sidebarRule} />
    <nav className={shell.sideNav} aria-label="Trang trong wiki truyện">
      <StoryArcMenu activeArcId={activeArcId} />
      <Link className={`${styles.currentView} ${shell.sideLink}`} href={storyReaderUrl} aria-current={activeView === "reader" ? "page" : undefined}><HeroIcon name="book" size={18} />Đọc truyện</Link>
      <Link className={`${styles.currentView} ${shell.sideLink}`} href={`${storyUrl}/chien-than`} aria-current={activeView === "profile" ? "page" : undefined}><HeroIcon name="person" size={18} />Hồ sơ Chiến Thần</Link>
    </nav>
    <nav className={shell.sectionLinks} aria-label="Mục lục hồ sơ">
      <span>GIAO DIỆN CHIẾN THẦN</span>
      {sections.map(({ id, label, icon: SectionIcon }) => <Link key={id} href={`${storyUrl}/chien-than#profile-${id}`}><SectionIcon aria-hidden="true" />{label}</Link>)}
    </nav>
    <div className={styles.sidebarFoot}><p>{storyScope} · Hai tuyến song song</p><span>Hồ sơ cập nhật theo chương đang đọc. Nội dung đang được bổ sung.</span></div>
  </aside>;
}
