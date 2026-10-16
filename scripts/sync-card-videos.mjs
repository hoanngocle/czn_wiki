import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { decodeSnapshot } from "./import-e7bot.mjs";
import { applyVideoManifest, collectAnimatedArtKeys, syncCardVideos } from "./card-videos.mjs";

const snapshotRoot = "docs/combatant/current/api/czn";
const key = "2egkWEkLvR9idARLvjqfJdWKfR24HJgY";
const artKeys = new Set();
const snapshots = readdirSync(join(snapshotRoot, "characters")).filter(name => /^\d+\.html$/.test(name)).map(name => join(snapshotRoot, "characters", name));
snapshots.push(join(snapshotRoot, "cards/list.html"));
for (const path of snapshots) collectAnimatedArtKeys(decodeSnapshot(readFileSync(path, "utf8"), key).data, artKeys);
const manifest = await syncCardVideos(artKeys);
writeFileSync("data/wiki/card-videos.json", JSON.stringify(manifest, null, 2) + "\n");
const characters = [];
for (const name of readdirSync("data/wiki/characters").filter(name => name.endsWith(".json"))) {
  const path = join("data/wiki/characters", name);
  const detail = JSON.parse(readFileSync(path, "utf8"));
  const before = JSON.stringify(detail);
  applyVideoManifest(detail, manifest);
  if (JSON.stringify(detail) !== before) writeFileSync(path, JSON.stringify(detail, null, 2) + "\n");
  characters.push(detail.id);
}
const entries = Object.values(manifest.cards);
console.log(JSON.stringify({ characters: characters.length, animations: entries.length, available: entries.filter(item => item.status === "available").length, unavailable: entries.filter(item => item.status !== "available") }));
