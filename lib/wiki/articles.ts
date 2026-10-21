export type ArticleBlock =
  | { type: "paragraph" | "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "image"; src: string; alt: string; caption?: string };

export type WikiArticle = {
  slug: string;
  title: string;
  description: string;
  date: string;
  kind: "patch-note" | "mechanics";
  sources: { name: string; url: string }[];
  sections: { id: string; title: string; blocks: ArticleBlock[] }[];
};
