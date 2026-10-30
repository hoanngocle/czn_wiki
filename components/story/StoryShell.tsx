"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type KeyboardEventHandler, type ReactNode } from "react";
import { WarGodSystem, WarGodSystemIcon } from "./WarGodSystem";
import { useStoredValue } from "../../lib/ui/storage";
import { CURRENT_CHAP_KEY } from "../../lib/story/war-god";
import { MAX_READING_CHAPTER, READER_PROGRESS_KEY, resolveReadingChapter } from "../../lib/story/reading-progress";
import { StorySidebar, storyUrl, storyReaderUrl } from "./StorySidebar";
import { HeroIcon as Icon } from "./StoryHeroIcon";
import styles from "./story-timeline.module.css";
import shell from "./story-shell.module.css";
import { StoryArcMenu } from "./StoryArcMenu";

type Props = {
  activeView: "timeline" | "reader" | "profile";
  activeArcId?: string;
  children: ReactNode;
  headerControls?: ReactNode;
  overlays?: ReactNode;
  currentChapter?: number;
  onKeyDown?: KeyboardEventHandler<HTMLElement>;
  readerTheme?: "light" | "dark";
  onReadChapter?: (href: string) => void;
};

export function StoryShell({ activeView, activeArcId, children, headerControls, overlays, currentChapter, onKeyDown, readerTheme = "light", onReadChapter }: Props) {
  const router = useRouter();
  const [systemOpen, setSystemOpen] = useState(false);
  const reader = useStoredValue(READER_PROGRESS_KEY, "");
  const savedChapter = useStoredValue(CURRENT_CHAP_KEY, "1");
  const chapter = currentChapter ?? resolveReadingChapter(reader, savedChapter).chapter;
  return <main className={`${styles.wiki} ${shell.frame}`} data-reader-theme={readerTheme} onKeyDown={onKeyDown}>
    <header className={`${styles.header} ${shell.header} ${activeView === "reader" ? shell.readerHeader : ""}`} data-testid="story-header">
      <Link href="/ebooks" className={styles.brand} aria-label="Về thư viện truyện"><span className={styles.brandMark}><Icon name="book" size={24} /></span><span>ebooks<span className={styles.brandSub}>THƯ VIỆN TRUYỆN</span></span></Link>
      <button type="button" className={shell.systemTrigger} aria-label="Mở hệ thống Chiến Thần" title="Hệ thống Chiến Thần" aria-haspopup="dialog" aria-expanded={systemOpen} onClick={() => setSystemOpen(true)}><WarGodSystemIcon /></button>
      {headerControls}
      <label className={shell.chapter}><select aria-label="Chương hiện tại" value={chapter} onChange={(event) => {
        const href = `/chu-gioi-tan-the-online/html/chuong-${event.target.value.padStart(4, "0")}.html`;
        if (onReadChapter) onReadChapter(href);
        else router.push(`${storyReaderUrl}?chuong=${event.target.value}`);
      }}>{Array.from({ length: MAX_READING_CHAPTER }, (_, index) => <option key={index + 1} value={index + 1}>Chương {index + 1}</option>)}</select></label>
    </header>
    <nav className={shell.mobileNav} aria-label="Chuyển trang truyện"><StoryArcMenu activeArcId={activeArcId} mobile /><Link href={storyReaderUrl} aria-current={activeView === "reader" ? "page" : undefined}>Đọc truyện</Link><Link href={`${storyUrl}/chien-than`} aria-current={activeView === "profile" ? "page" : undefined}>Chiến Thần<Icon name="external" size={13} /></Link></nav>
    <div className={styles.workspace}>
      <StorySidebar activeView={activeView} activeArcId={activeArcId} />
      {children}
    </div>
    {overlays}
    {systemOpen && <WarGodSystem chapter={chapter} onClose={() => setSystemOpen(false)} />}
  </main>;
}
