import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { createGameTermNormalizer } from "../lib/wiki/game-term-names.mjs";
const read = path => JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"));
export const preserveNames = createGameTermNormalizer(
  read("../data/wiki/translations/vi/terminology.json"), read("../data/wiki/translations/game-term-aliases.json"),
);
const metadata = new Set(["id", "slug", "date", "kind", "src", "url", "sources"]);
export function normalizeArticleTerms(value) {
  if (typeof value === "string") return preserveNames(value);
  if (Array.isArray(value)) return value.map(normalizeArticleTerms);
  if (!value || typeof value !== "object") return value;
  return Object.fromEntries(Object.entries(value).map(([key, child]) => [key, metadata.has(key) ? child : normalizeArticleTerms(child)]));
}
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  const input = JSON.parse(readFileSync(0, "utf8"));
  const output = process.argv.includes("--pairs") ? input.map(({ text, source }) => preserveNames(text, source)) : normalizeArticleTerms(input);
  process.stdout.write(JSON.stringify(output));
}
