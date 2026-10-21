import Image from "next/image";
import Link from "next/link";
import type { ArticleBlock, WikiArticle } from "../../lib/wiki/articles";
import styles from "./ArticleView.module.css";

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "paragraph": return <p>{block.text}</p>;
    case "heading": return <h3>{block.text}</h3>;
    case "list": return <ul>{block.items.map((item, index) => <li key={index}>{item}</li>)}</ul>;
    case "table": return <div className={styles.tableScroll} role="region" aria-label="Bảng dữ liệu" tabIndex={0}><table>
      <thead><tr>{block.headers.map((header, index) => <th key={index} scope="col">{header}</th>)}</tr></thead>
      <tbody>{block.rows.map((row, index) => <tr key={index}>{row.map((cell, column) => <td key={column}>{cell}</td>)}</tr>)}</tbody>
    </table></div>;
    case "image": return <figure><a href={block.src} target="_blank" rel="noreferrer" aria-label={`Mở ảnh gốc: ${block.alt}`}><Image src={block.src} alt={block.alt} width={1400} height={800} unoptimized className={styles.articleImage} /></a>{block.caption && <figcaption>{block.caption}</figcaption>}</figure>;
  }
}

export function ArticleView({ article }: { article: WikiArticle }) {
  return <article className={styles.page} lang="vi">
    <header className={styles.header}>
      <Link className={styles.back} href="/patch-note">← Patch note</Link>
      <div className={styles.eyebrow}>{article.kind === "mechanics" ? "Cơ chế nhân vật" : "Thông báo cập nhật"} · <time dateTime={article.date}>{article.date.split("-").reverse().join("/")}</time></div>
      <h1>{article.title}</h1><p>{article.description}</p>
      <div className={styles.sources}>Nguồn: {article.sources.map((source, index) => <a key={index} href={source.url} target="_blank" rel="noreferrer">{source.name} ↗</a>)}<span>· Bản dịch tiếng Việt từ tài liệu đã lưu</span></div>
      <div className={styles.related}><Link href="/combatant/rossweisse">Rossweisse · Nhân vật →</Link>{article.kind === "mechanics" ? <Link href="/patch-note/2026-10-21-update#rossweisse">Dữ liệu trong patch note →</Link> : <Link href="/mechanics/rossweisse">Cơ chế Rossweisse →</Link>}</div>
    </header>
    <div className={styles.layout}>
      <nav className={styles.contents} aria-label="Mục lục"><strong>Mục lục</strong>{article.sections.map(section => <a key={section.id} href={`#${section.id}`}>{section.title}</a>)}</nav>
      <div className={styles.body}>{article.sections.map(section => <section key={section.id} id={section.id}><h2>{section.title}</h2>{section.blocks.map((block, index) => <Block key={index} block={block} />)}</section>)}</div>
    </div>
  </article>;
}
