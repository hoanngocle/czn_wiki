export type DescriptionNode =
  | { kind: "text"; text: string }
  | { kind: "break" }
  | { kind: "emphasis" | "keyword" | "underline" | "muted"; children: DescriptionNode[] };

type Container = { children: DescriptionNode[]; kind?: DescriptionNode["kind"] };

const tagKinds: Record<string, "emphasis" | "keyword" | "underline" | "muted"> = {
  color_orange: "emphasis", color_red: "emphasis", color_blue: "emphasis", cc: "keyword", u: "underline", color_darkgray: "muted",
};

function decodeEntities(value: string): string {
  return value.replaceAll("&nbsp;", " ").replaceAll("&amp;", "&").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&quot;", '"').replaceAll("&#39;", "'");
}

export function parseDescription(input: string): DescriptionNode[] {
  // Saved game text can retain localization delimiters and duplicate percent suffixes.
  const display = input.replace(/\$([\p{L}][\p{L} ]*)\$/gu, "$1").replace(/%((?:<\/[^>]*>)*)%/g, "%$1");
  const root: Container = { children: [] };
  const stack: Container[] = [root];
  const tokens = display.match(/<[^>]*>|\r\n|\n|[^<\r\n]+/g) ?? [];
  let unsafe = "";
  for (const token of tokens) {
    if (token.startsWith("<")) {
      const match = /^<\s*(\/)?\s*([a-zA-Z_][\w-]*)?[^>]*>$/.exec(token);
      if (!match) continue;
      const closing = Boolean(match[1]);
      const tag = (match[2] ?? "").toLowerCase();
      if (unsafe) { if (closing && tag === unsafe) unsafe = ""; continue; }
      if (!closing && ["script", "style", "iframe", "svg"].includes(tag)) { unsafe = tag; continue; }
      if (tag === "br" || tag === "br/") { stack.at(-1)!.children.push({ kind: "break" }); continue; }
      if (closing) { if (stack.length > 1) stack.pop(); continue; }
      const kind = tagKinds[tag];
      if (kind) { const node: DescriptionNode = { kind, children: [] }; stack.at(-1)!.children.push(node); stack.push(node); }
      continue;
    }
    if (unsafe) continue;
    if (token === "\n" || token === "\r\n") { stack.at(-1)!.children.push({ kind: "break" }); continue; }
    stack.at(-1)!.children.push({ kind: "text", text: decodeEntities(token) });
  }
  return root.children;
}
