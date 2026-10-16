import { afterEach, expect, it } from "vitest";
import { mkdtempSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { decodeSnapshot, normalizeDetail } from "../../scripts/import-e7bot.mjs";
import { applyVideoManifest, collectAnimatedArtKeys, syncCardVideos } from "../../scripts/card-videos.mjs";

const temporary: string[] = [];
afterEach(() => temporary.splice(0).forEach(path => rmSync(path, { recursive: true, force: true })));

it("honors the source animation flag instead of inventing animations for unique artwork", () => {
  const raw = decodeSnapshot(readFileSync("docs/combatant/current/api/czn/characters/1041.html", "utf8"), "2egkWEkLvR9idARLvjqfJdWKfR24HJgY").data;
  raw.combatant.start_cards[3].animation = false;
  expect(normalizeDetail(raw).startCards[3].video).toBeNull();
});

it("downloads missing animations once and shares the verified video with every variant", async () => {
  const publicRoot = mkdtempSync(join(tmpdir(), "card-videos-"));
  temporary.push(publicRoot);
  const bytes = readFileSync("public/assets/card/unique_1041_01.webm");
  const artKeys = collectAnimatedArtKeys([{ sct_name: "unique_1041_01", animation: true, variants: [{ sct_name: "unique_1041_01", animation: true }] }, { sct_name: "start_1041_01", animation: false }]);
  let requests = 0;
  const manifest = await syncCardVideos(artKeys, { publicRoot, fetchImpl: async () => { requests++; return new Response(bytes); } });
  const detail = { startCards: [{ id: "base", artKey: "unique_1041_01", video: null, variants: [{ id: "variant", artKey: "unique_1041_01", video: null }] }] };
  applyVideoManifest(detail, manifest);
  expect(detail.startCards[0].video).toBe("/assets/card/unique_1041_01.webm");
  expect(detail.startCards[0].variants[0].video).toBe("/assets/card/unique_1041_01.webm");
  expect(readFileSync(join(publicRoot, "assets/card/unique_1041_01.webm"))).toEqual(bytes);
  await syncCardVideos(artKeys, { publicRoot, fetchImpl: async () => { throw new Error("Valid cached animation must not be downloaded again"); } });
  expect(requests).toBe(1);
});

it("records missing or invalid source videos without exposing broken playback URLs", async () => {
  const publicRoot = mkdtempSync(join(tmpdir(), "card-videos-"));
  temporary.push(publicRoot);
  const manifest = await syncCardVideos(["missing", "invalid"], { publicRoot, fetchImpl: async (url: Parameters<typeof fetch>[0]) => String(url).includes("missing") ? new Response(null, { status: 404 }) : new Response("<html>upstream error</html>") });
  const cards = [{ id: "a", artKey: "missing", video: "/old.webm" }, { id: "b", artKey: "invalid", video: "/old.webm" }];
  applyVideoManifest(cards, manifest);
  expect(cards.map(card => card.video)).toEqual([null, null]);
  expect(manifest.cards.missing.reason).toBe("HTTP 404");
  expect(manifest.cards.invalid.reason).toBe("Invalid .webm signature");
});
