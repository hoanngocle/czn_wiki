import { ArticleView } from "../../../../components/articles/ArticleView";
import mechanics from "../../../../data/wiki/articles/rossweisse-mechanics.json";
import type { WikiArticle } from "../../../../lib/wiki/articles";

export const metadata = { title: "Cơ chế Rossweisse | CZN Wiki", description: "Giới thiệu cơ chế Rossweisse: Polarize, Sword Tassel và hợp nhất Equilux." };
export default function RossweisseMechanicsPage() { return <ArticleView article={mechanics as WikiArticle} />; }
