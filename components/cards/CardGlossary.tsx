"use client";

import { useState } from "react";
import type { GlossaryTerm } from "../../lib/wiki/glossary";
import { Description } from "./Description";
import styles from "./CardGlossary.module.css";

function normalizeSearch(text: string) {
  return text.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").trim();
}

export function CardGlossary({ definitions }: { definitions: GlossaryTerm[] }) {
  const [query, setQuery] = useState("");
  const search = normalizeSearch(query);
  const terms = definitions.filter(term => normalizeSearch(`${term.aliases.join(" ")} ${term.title} ${term.definitions.map(definition => `${definition.title} ${definition.desc}`).join(" ").replace(/<br\s*\/?\s*>/gi, " ").replace(/<[^>]*>/g, "")}`).includes(search));
  return <section className={styles.glossary} aria-label="Danh sách thuật ngữ" lang="vi">
    <input className={styles.search} type="search" aria-label="Tìm thuật ngữ" placeholder="Tìm theo tên hoặc giải nghĩa…" value={query} onChange={event => setQuery(event.target.value)} />
    <p className={styles.summary}>{terms.length} / {definitions.length} thuật ngữ</p>
    <dl>{terms.map(term => <div key={term.englishTitle ?? term.title}>
      <dt><span>{term.title}</span>{term.englishTitle !== term.title && <span className={styles.englishTitle} lang="en">{term.englishTitle}</span>}</dt>
      <dd>{term.definitions.map((definition, index) => <div className={styles.definition} key={`${definition.id}-${index}`}>
        {term.definitions.length > 1 && <span className={styles.context}>{definition.id.startsWith("TALENT_") ? "Đặc tính lá bài" : definition.id.startsWith("TRIGGER_") ? "Điều kiện kích hoạt" : definition.id === "CARD_ATK" ? "Loại bài" : definition.id === "TERM_ATTACK_STAT" ? "Chỉ số nhân vật" : definition.id.startsWith("SERENIEL_") ? "Ghi chú bộ bài" : `Định nghĩa ${index + 1}`}</span>}
        <Description text={definition.desc} />
      </div>)}</dd>
    </div>)}</dl>
    {terms.length === 0 && <p className={styles.empty} role="status">Không tìm thấy thuật ngữ phù hợp.</p>}
  </section>;
}
