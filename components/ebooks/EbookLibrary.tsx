"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeftIcon, ArrowUpRightIcon, BookOpenIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { ebooks, ebookUrl } from "../../lib/ebooks/catalog";
import styles from "./EbookLibrary.module.css";

const normalize = (value: string) => value.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d");

export function EbookLibrary() {
  const [query, setQuery] = useState("");
  const term = normalize(query);
  const books = ebooks.filter(book => normalize(`${book.title} ${book.alternateTitle} ${book.author}`).includes(term));

  return <div className={styles.library}>
    <header className={styles.header}>
      <Link href="/ebooks" className={styles.brand} aria-label="Ebooks · Thư viện truyện"><BookOpenIcon aria-hidden="true" /><span>ebooks<span className={styles.brandDot}>.</span></span></Link>
      <nav aria-label="Điều hướng thư viện"><Link href="/ebooks" aria-current="page">Thư viện</Link><Link href="/" className={styles.homeLink}><ArrowLeftIcon aria-hidden="true" />Trang chủ</Link></nav>
    </header>
    <main>
      <section className={styles.hero}>
        <div><p className={styles.eyebrow}>GÓC ĐỌC CỦA BẠN</p><h1>Thư viện truyện</h1><p className={styles.subtitle}>Lật một trang sách.<br /><em>Bước vào một thế giới khác.</em></p><p className={styles.description}>Những câu chuyện để đọc chậm, khám phá sâu<br className={styles.desktopBreak} /> và trở lại bất cứ khi nào bạn muốn.</p></div>
        <div className={styles.heroArt} aria-hidden="true"><span className={styles.orbit} /><BookOpenIcon /><span className={styles.star}>✳</span><span className={styles.artCaption}>MỘT CHƯƠNG MỚI ĐANG CHỜ</span></div>
      </section>
      <section aria-label="Danh sách truyện" className={styles.collection}>
        <div className={styles.toolbar}>
          <div className={styles.collectionTitle}><h2>Tủ sách</h2><span>{ebooks.length.toString().padStart(2, "0")} TÁC PHẨM</span></div>
          <label className={styles.search}><MagnifyingGlassIcon aria-hidden="true" /><input type="search" aria-label="Tìm truyện hoặc tác giả" placeholder="Tìm truyện hoặc tác giả…" value={query} onChange={event => setQuery(event.target.value)} /></label>
        </div>
        <div className={styles.resultLine}><span>Tất cả truyện</span><p role="status">{books.length} tác phẩm{term ? " phù hợp" : " trong thư viện"}</p></div>
        {books.length ? <div className={styles.grid}>{books.map(book => <article key={book.slug} className={styles.book}>
          <Link href={ebookUrl(book.slug)} className={styles.coverArea} aria-label={`Khám phá ${book.title}`}><span className={styles.coverShadow}><Image src={book.cover} alt={`Bìa ${book.title}`} width={220} height={320} priority className={styles.cover} /></span><span className={styles.coverHint}>KHÁM PHÁ CÂU CHUYỆN <ArrowUpRightIcon aria-hidden="true" /></span></Link>
          <div className={styles.bookInfo}><div className={styles.genres}>{book.genres.map(genre => <span key={genre}>{genre}</span>)}</div><h3><Link href={ebookUrl(book.slug)}>{book.title}</Link></h3><p className={styles.author}>{book.author}</p><p className={styles.summary}>{book.description}</p><div className={styles.bookMeta}><BookOpenIcon aria-hidden="true" /><span>{book.chapters.toLocaleString("vi-VN")} chương</span><span className={styles.dot}>·</span><span>Bản đồ cốt truyện</span></div><div className={styles.actions}><Link href={`${ebookUrl(book.slug)}/doc-truyen`} className={styles.read}>Đọc truyện <ArrowUpRightIcon aria-hidden="true" /></Link><Link href={ebookUrl(book.slug)} className={styles.explore}>Khám phá</Link></div></div>
        </article>)}</div> : <div className={styles.empty}><BookOpenIcon aria-hidden="true" /><h3>Không tìm thấy truyện phù hợp.</h3><p>Thử tìm theo tên truyện hoặc tên tác giả khác.</p><button type="button" onClick={() => setQuery("")}>Xóa tìm kiếm</button></div>}
      </section>
    </main>
    <footer className={styles.footer}><span>Đọc một chút, mỗi ngày.</span><span>EBOOKS / THƯ VIỆN CÁ NHÂN</span></footer>
  </div>;
}
