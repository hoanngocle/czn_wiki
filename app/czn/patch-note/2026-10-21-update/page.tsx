import { ArticleView } from "../../../../components/articles/ArticleView";
import update from "../../../../data/wiki/articles/2026-10-21-update.json";
import type { WikiArticle } from "../../../../lib/wiki/articles";

export const metadata = { title: `${update.title} | CZN Wiki`, description: update.description };

export default function PatchNotePage() { return <ArticleView article={update as WikiArticle} />; }
