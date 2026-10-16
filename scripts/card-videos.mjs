import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { inspectAsset } from "./audit-reference-assets.mjs";

// E7BOT's saved api-BhwEKNwi.js and CznCard-BU_7QlaH.js use this URL
// only when the card's animation flag is true.
export function collectAnimatedArtKeys(value, result = new Set()) {
  if (!value || typeof value !== "object") return result;
  if (value.animation === true && value.sct_name) result.add(value.sct_name);
  for (const child of Object.values(value)) collectAnimatedArtKeys(child, result);
  return result;
}

export function cardVideoUrl(card, manifest) {
  const entry = manifest.cards[card.artKey ?? card.sct_name];
  return entry?.status === "available" ? entry.localUrl : null;
}

export function applyVideoManifest(value, manifest) {
  if (!value || typeof value !== "object") return;
  if (value.id && typeof value.artKey === "string" && "video" in value) value.video = cardVideoUrl(value, manifest);
  for (const child of Object.values(value)) applyVideoManifest(child, manifest);
}

export async function syncCardVideos(artKeys, { publicRoot = "public", fetchImpl = fetch } = {}) {
  const cards = {};
  const keys = [...new Set(artKeys)].sort();
  for (let offset = 0; offset < keys.length; offset += 6) {
    await Promise.all(keys.slice(offset, offset + 6).map(async artKey => {
      if (!/^[a-zA-Z0-9_-]+$/.test(artKey)) throw new Error(`Invalid animation art key: ${artKey}`);
      const localUrl = `/assets/card/${artKey}.webm`;
      const sourceUrl = `https://wiki.e7bot.top/api/assets/file/czn/data/card_illustration/${artKey}.webm`;
      const path = join(publicRoot, localUrl);
      let bytes = existsSync(path) ? readFileSync(path) : null;
      if (!bytes || inspectAsset(bytes, ".webm").status !== "available") {
        const response = await fetchImpl(sourceUrl);
        if (response.status === 404) {
          cards[artKey] = { sourceUrl, localUrl: null, status: "unavailable", reason: "HTTP 404" };
          return;
        }
        if (!response.ok) throw new Error(`${response.status}: ${sourceUrl}`);
        bytes = Buffer.from(await response.arrayBuffer());
        const inspection = inspectAsset(bytes, ".webm");
        if (inspection.status !== "available") {
          cards[artKey] = { sourceUrl, localUrl: null, status: "unavailable", reason: inspection.reason };
          return;
        }
        mkdirSync(dirname(path), { recursive: true });
        writeFileSync(path, bytes);
      }
      cards[artKey] = { sourceUrl, localUrl, status: "available", bytes: bytes.length, sha256: createHash("sha256").update(bytes).digest("hex") };
    }));
  }
  return { source: "e7bot", checkedAt: new Date().toISOString(), cards: Object.fromEntries(keys.map(key => [key, cards[key]])) };
}
