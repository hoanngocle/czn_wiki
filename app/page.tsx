import Link from "next/link";
import { ArrowUpRightIcon, BookOpenIcon, SparklesIcon } from "@heroicons/react/24/outline";
import styles from "./page.module.css";

export default function Home() {
  return <main className={styles.home}>
    <header className={styles.header}><span className={styles.wordmark}>the collection<span> / </span></span><span>WIKI & READING ROOM</span></header>
    <section className={styles.intro}><p className={styles.eyebrow}>HAI THẾ GIỚI. MỘT ĐIỂM BẮT ĐẦU.</p><h1>Hôm nay, bạn muốn<br /><em>khám phá điều gì?</em></h1><p>Tra cứu thế giới Chaos Zero Nightmare, hoặc tìm một câu chuyện để đắm mình vào.</p></section>
    <div className={styles.destinations}>
      <Link href="/czn" className={`${styles.destination} ${styles.czn}`} aria-label="Khám phá CZN">
        <div className={styles.topline}><span>01 / GAME WIKI</span><SparklesIcon aria-hidden="true" /></div>
        <div className={styles.cardBody}><span className={styles.monogram} aria-hidden="true">CZN</span><h2>Chaos Zero Nightmare</h2><p>Nhân vật, đối tác, trang bị, bộ bài và những điều bạn cần cho hành trình tiếp theo.</p></div>
        <div className={styles.cardFoot}><span>Khám phá CZN</span><ArrowUpRightIcon aria-hidden="true" /></div>
      </Link>
      <Link href="/ebooks" className={`${styles.destination} ${styles.books}`} aria-label="Mở thư viện">
        <div className={styles.topline}><span>02 / THƯ VIỆN TRUYỆN</span><BookOpenIcon aria-hidden="true" /></div>
        <div className={styles.cardBody}><span className={styles.bookArt} aria-hidden="true"><i /><i /><i /></span><h2>Mỗi cuốn sách, một thế giới.</h2><p>Chọn một câu chuyện, tiếp tục chương đang đọc và khám phá những mảnh ghép của cốt truyện.</p></div>
        <div className={styles.cardFoot}><span>Mở thư viện</span><ArrowUpRightIcon aria-hidden="true" /></div>
      </Link>
    </div>
    <footer className={styles.footer}><span>Một nơi để khám phá. Một nơi để trở về.</span><span>CZN / EBOOKS</span></footer>
  </main>;
}
