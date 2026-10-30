"use client";

import { useEffect, useRef, useState } from "react";
import { CURRENT_CHAP_KEY } from "../../lib/story/war-god";
import { MAX_READING_CHAPTER, READER_PROGRESS_KEY, resolveReadingChapter } from "../../lib/story/reading-progress";
import { StoryShell } from "./StoryShell";
import { ReaderSettings } from "./ReaderSettings";
import styles from "./story-timeline.module.css";

const chapterUrl = (chapter: number) => `/chu-gioi-tan-the-online/html/chuong-${String(chapter).padStart(4, "0")}.html`;

export function StoryReader({ initialChapter }: { initialChapter?: number }) {
  const [readerUrl, setReaderUrl] = useState<string | null>(null);
  const [readerTheme, setReaderTheme] = useState<"light" | "dark">("light");
  const [readerFont, setReaderFont] = useState(20);
  const [chapter, setChapter] = useState(initialChapter);
  const readerRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const initialize = () => {
      if (initialChapter !== undefined && new URL(window.location.href).searchParams.has("chuong")) {
        const href = chapterUrl(initialChapter);
        // A retained route can be opened again with the same chapter query.
        if (readerRef.current?.contentWindow) readerRef.current.contentWindow.location.assign(href);
        else setReaderUrl(href);
        return;
      }
      try {
        const progress = resolveReadingChapter(localStorage.getItem(READER_PROGRESS_KEY), localStorage.getItem(CURRENT_CHAP_KEY));
        if (progress.fromReader) {
          setChapter(progress.chapter);
          setReaderUrl(chapterUrl(progress.chapter));
          return;
        }
      } catch { /* The contents page works even when storage is unavailable. */ }
      setReaderUrl((current) => current ?? "/chu-gioi-tan-the-online/index.html");
    };
    initialize();
  }, [initialChapter]);

  useEffect(() => {
    const syncReader = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || event.source !== readerRef.current?.contentWindow || event.data?.type !== "reader-state") return;
      if (event.data.theme === "light" || event.data.theme === "dark") setReaderTheme(event.data.theme);
      if (Number.isFinite(event.data.font) && event.data.font >= 16 && event.data.font <= 30) setReaderFont(event.data.font);
      if (Number.isInteger(event.data.chapter) && event.data.chapter >= 1 && event.data.chapter <= MAX_READING_CHAPTER) setChapter(event.data.chapter);
    };
    window.addEventListener("message", syncReader);
    return () => window.removeEventListener("message", syncReader);
  }, []);

  const onLoad = () => {
    readerRef.current?.contentWindow?.postMessage({ type: "reader-action", action: "state" }, window.location.origin);
    // A chapter query selects the initial document. Later reloads resume saved progress.
    const url = new URL(window.location.href);
    if (url.searchParams.has("chuong")) {
      url.searchParams.delete("chuong");
      window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash);
    }
  };

  const readChapter = (href: string) => {
    // The iframe can navigate itself while React's src still names its initial document.
    if (readerRef.current?.contentWindow) readerRef.current.contentWindow.location.assign(href);
    else setReaderUrl(href);
  };

  return <StoryShell activeView="reader" readerTheme={readerTheme} currentChapter={chapter}
    onReadChapter={readChapter}
    headerControls={<ReaderSettings font={readerFont} theme={readerTheme} onAction={(action) => readerRef.current?.contentWindow?.postMessage({ type: "reader-action", action }, window.location.origin)} />}>
    <section className={styles.readerArea} aria-label="Đọc truyện">
      <h1 className={styles.srOnly}>Đọc Chư Giới Tận Thế Online</h1>
      {readerUrl && <iframe ref={readerRef} className={styles.readerFrame} title="Đọc Chư Giới Tận Thế Online" src={readerUrl} onLoad={onLoad} />}
    </section>
  </StoryShell>;
}
