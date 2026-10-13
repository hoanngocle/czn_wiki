import { expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { inspectAsset } from "../../scripts/audit-reference-assets.mjs";

it("rejects placeholder fonts but accepts a real WebP", () => {
  const font = readFileSync("docs/www.prydwen.gg/_next/static/media/Anuphan_Regular-s.p.00aegfjv64v2k.woff2");
  const webp = readFileSync("docs/wiki.e7bot.top/api/assets/file/czn/data/face/character/portrait_character_crop_half_1041.webp");
  expect(inspectAsset(font, ".woff2").status).toBe("invalid");
  expect(inspectAsset(webp, ".webp").status).toBe("available");
});
