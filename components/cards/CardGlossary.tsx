"use client";

import { useState } from "react";
import glossary from "../../data/wiki/translations/vi/renoa.glossary.json";
import { Description } from "./Description";
import styles from "./CardGlossary.module.css";

function normalizeSearch(text: string) {
  return text.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").trim();
}

export function CardGlossary() {
  const [query, setQuery] = useState("");
  const search = normalizeSearch(query);
  const terms = glossary.terms.filter(term => normalizeSearch(`${term.title} ${term.desc.replace(/<br\s*\/?\s*>/gi, " ").replace(/<[^>]*>/g, "")}`).includes(search));
  return <section className={styles.glossary} aria-label="Danh sách thuật ngữ" lang="vi">
    <input className={styles.search} type="search" aria-label="Tìm thuật ngữ" placeholder="Tìm theo tên hoặc giải nghĩa…" value={query} onChange={event => setQuery(event.target.value)} />
    <dl>{terms.map(term => <div key={term.id}>
      <dt>{term.title}</dt><dd><Description text={term.desc} /></dd>
    </div>)}</dl>
    {terms.length === 0 && <p className={styles.empty} role="status">Không tìm thấy thuật ngữ phù hợp.</p>}
  </section>;
}
