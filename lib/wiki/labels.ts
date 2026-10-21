import terminology from "../../data/wiki/translations/vi/terminology.json";
// Only interface controls are localized; game names stay identical to the source.
const interfaceLabels = new Set(["Review", "Animation"]);
const labels = new Map(Object.entries(terminology).filter(([key]) => interfaceLabels.has(key)).map(([key, value]) => [key.toLowerCase(), value]));
// These translations also serve as ordinary Vietnamese prose, rather than names.
const proseWords = new Set(["Activate", "Use", "Stats", "All Piles"]);
const englishNames = new Map<string, string>();
const englishKeywords = new Map<string, string>();
for (const [english, translated] of Object.entries(terminology)) {
  if (interfaceLabels.has(english) || english === english.toLowerCase() || english === translated) continue;
  if (!englishKeywords.has(translated.toLowerCase())) englishKeywords.set(translated.toLowerCase(), english);
  if (proseWords.has(english)) continue;
  if (!englishNames.has(translated)) englishNames.set(translated, english);
}
const escapePattern = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const termPattern = new RegExp(`(?<![\\p{L}\\p{N}_])(?:${[...englishNames.keys()].sort((a, b) => b.length - a.length).map(escapePattern).join("|")})(?![\\p{L}\\p{N}_])`, "gu");

export function preserveGameTermNames(text: string): string {
  const namedKeywords = text.replace(/<u>([^<]*)<\/u>/g, (_, name: string) => `<u>${englishKeywords.get(name.toLowerCase()) ?? name}</u>`);
  return namedKeywords.split(/(<[^>]*>)/).map(part => part.startsWith("<") ? part : part.replace(termPattern, match => englishNames.get(match)!)).join("");
}

export function label(value: string, vietnamese: boolean): string {
  return vietnamese ? labels.get(value.toLowerCase()) ?? value : value;
}
