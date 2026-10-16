import { expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { inspectAsset } from "../../scripts/audit-reference-assets.mjs";

it("rejects placeholder fonts but accepts a real WebP", () => {
  const font = Buffer.from("No Content");
  const webp = readFileSync("public/assets/combatant/portrait_character_crop_half_1041.webp");
  expect(inspectAsset(font, ".woff2").status).toBe("invalid");
  expect(inspectAsset(webp, ".webp").status).toBe("available");
});
