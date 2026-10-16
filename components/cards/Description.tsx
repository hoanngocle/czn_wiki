import { parseDescription, type DescriptionNode } from "../../lib/wiki/description";
import styles from "./GameCard.module.css";

function renderNode(node: DescriptionNode, key: number): React.ReactNode {
  if (node.kind === "text") return node.text;
  if (node.kind === "break") return <br key={key} />;
  return <span key={key} className={styles[node.kind]}>{node.children.map(renderNode)}</span>;
}

export function Description({ text }: { text: string }) {
  return <>{parseDescription(text).map(renderNode)}</>;
}
