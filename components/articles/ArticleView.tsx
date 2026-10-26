import Image from "next/image";
import Link from "next/link";
import type { ArticleBlock, WikiArticle } from "../../lib/wiki/articles";
import { preserveGameTermNames as t } from "../../lib/wiki/labels";
import styles from "./ArticleView.module.css";

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "paragraph": return <p>{t(block.text)}</p>;
    case "heading": return <h3>{t(block.text)}</h3>;
    case "list": return <ul>{block.items.map((item, index) => <li key={index}>{t(item)}</li>)}</ul>;
    case "table": return <div className={styles.tableScroll} role="region" aria-label="Bảng dữ liệu" tabIndex={0}><table>
      <thead><tr>{block.headers.map((header, index) => <th key={index} scope="col">{t(header)}</th>)}</tr></thead>
      <tbody>{block.rows.map((row, index) => <tr key={index}>{row.map((cell, column) => <td key={column}>{t(cell)}</td>)}</tr>)}</tbody>
    </table></div>;
    case "image": return <figure><a href={block.src} target="_blank" rel="noreferrer" aria-label={`Mở ảnh gốc: ${t(block.alt)}`}><Image src={block.src} alt={t(block.alt)} width={1400} height={800} unoptimized className={styles.articleImage} /></a>{block.caption && <figcaption>{t(block.caption)}</figcaption>}</figure>;
  }
}

export function ArticleView({ article }: { article: WikiArticle }) {
  return <article className={styles.page} lang="vi">
    <header className={styles.header}>
      <Link className={styles.back} href="/patch-note">← Patch note</Link>
      <div className={styles.eyebrow}>{article.kind === "mechanics" ? "Cơ chế nhân vật" : "Thông báo cập nhật"} · <time dateTime={article.date}>{article.date.split("-").reverse().join("/")}</time></div>
      <h1>{t(article.title)}</h1><p>{t(article.description)}</p>
      <div className={styles.related}><Link href="/combatant/rossweisse">Rossweisse · Nhân vật →</Link>{article.kind === "mechanics" ? <Link href="/patch-note/2026-10-21-update#rossweisse">Dữ liệu trong patch note →</Link> : <Link href="/mechanics/rossweisse">Cơ chế Rossweisse →</Link>}</div>
    </header>
    <div className={styles.layout}>
      <nav className={styles.contents} aria-label="Mục lục"><strong>Mục lục</strong>{article.sections.map(section => <a key={section.id} href={`#${section.id}`}>{t(section.title)}</a>)}</nav>
      <div className={styles.body}>{article.sections.map(section => <section key={section.id} id={section.id}><h2>{t(section.title)}</h2>{section.blocks.map((block, index) => <Block key={index} block={block} />)}</section>)}</div>
    </div>
  </article>;
}
