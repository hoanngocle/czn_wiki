const escapePattern = value => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const proseWords = new Set(["Activate", "Use", "Stats", "All Piles"]);
const interfaceLabels = new Set(["Review", "Animation"]);

/**
 * Restore named game terms while leaving Vietnamese explanations and markup intact.
 * Explicit aliases handle older translations; longest matches also remove bilingual names.
 * @param {Record<string, string>} terminology
 * @param {Record<string, string[]>} aliases
 */
export function createGameTermNormalizer(terminology, aliases) {
  const names = new Map();
  const keywords = new Map();
  const candidates = new Map();
  const sourceOnly = new Set();
  const ordinaryWords = new Set(["Attack", "Skill", "Healing", "Recover", "Card", "Cards", "Deck", "Build", "Level", "Rarity", "Common", "Rare", "Unique", "Base", "Damage", "Damage Amount", "Cost", "Efficiency"]);
  const contextualWords = new Set(["F2P", "Common", "Rare", "Unique", "Base", "Efficiency"]);
  const add = (english, translated, prefer = false) => {
    const variants = new Set([translated, translated.replace(/\p{L}+/gu, word => word[0].toUpperCase() + word.slice(1))]);
    for (const variant of variants) {
      if (prefer || !keywords.has(variant.toLowerCase())) keywords.set(variant.toLowerCase(), english);
      if (!proseWords.has(english)) {
        if (prefer || !names.has(variant)) names.set(variant, english);
        names.set(`${variant} (${english})`, english);
        const choices = candidates.get(variant) ?? new Set();
        choices.add(english);
        candidates.set(variant, choices);
        // A lower-case word may just be Vietnamese prose. Restore it only
        // when the accompanying English source explicitly names that mechanic.
        const lower = variant.toLowerCase();
        if (variant !== lower && !ordinaryWords.has(english) && !names.has(lower)) {
          names.set(lower, english);
          sourceOnly.add(lower);
          candidates.set(lower, choices);
        }
        if (variant === lower) sourceOnly.delete(lower);
      }
    }
  };
  for (const [english, translated] of Object.entries(terminology)) {
    if (interfaceLabels.has(english) || english === english.toLowerCase() || english === translated) continue;
    add(english, translated);
  }
  for (const [english, variants] of Object.entries(aliases)) for (const variant of variants) add(english, variant, true);
  const pattern = new RegExp(`(?<![\\p{L}\\p{N}_])(?:${[...names.keys()].sort((a, b) => b.length - a.length).map(escapePattern).join("|")})(?![\\p{L}\\p{N}_])`, "gu");
  const explicitPattern = new RegExp(`(?<![\\p{L}\\p{N}_])(?:${[...names.keys()].filter(name => !sourceOnly.has(name)).sort((a, b) => b.length - a.length).map(escapePattern).join("|")})(?![\\p{L}\\p{N}_])`, "gu");
  /** @param {string} text @param {string} [englishSource] */
  return function preserveGameTermNames(text, englishSource) {
    const resolveName = match => {
      const defaultName = names.get(match);
      if (contextualWords.has(defaultName) && (englishSource
        ? !new RegExp(`(?<![\\p{L}\\p{N}_])${escapePattern(defaultName)}(?![\\p{L}\\p{N}_])`, "iu").test(englishSource)
        : text.trim() !== match)) return match;
      if (sourceOnly.has(match) && (!englishSource || ![...candidates.get(match)].some(name => new RegExp(`(?<![\\p{L}\\p{N}_])${escapePattern(name)}(?![\\p{L}\\p{N}_])`, "iu").test(englishSource)))) return match.replace(explicitPattern, resolveName);
      if (englishSource && candidates.get(match)?.size > 1) {
        const matching = [...candidates.get(match)].filter(name => new RegExp(`(?<![\\p{L}\\p{N}_])${escapePattern(name)}(?![\\p{L}\\p{N}_])`, "iu").test(englishSource));
        if (matching.length === 1) return matching[0];
      }
      return names.get(match);
    };
    const namedKeywords = text.replace(/<u>([^<]*)<\/u>/g, (_, name) => `<u>${keywords.get(name.toLowerCase()) ?? name}</u>`);
    return namedKeywords.split(/(<[^>]*>)/).map(part => /^<\/?[A-Za-z][\w-]*(?:\s+[^<>]*)?\/?>$|^<\/>$/.test(part) ? part : part.replace(pattern, resolveName)).join("");
  };
}
