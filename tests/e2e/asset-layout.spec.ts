import { expect, test } from "@playwright/test";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

test("every local asset is served with its original bytes", async ({ request }) => {
  const files = readdirSync("public/assets", { recursive: true, withFileTypes: true }).filter(entry => entry.isFile());
  for (let offset = 0; offset < files.length; offset += 8) {
    await Promise.all(files.slice(offset, offset + 8).map(async file => {
      const path = join(file.parentPath, file.name);
      const url = `/${relative("public", path).replaceAll("\\", "/")}`;
      const response = await request.get(url);
      expect(response.status(), url).toBe(200);
      const sha256 = (bytes: Buffer) => createHash("sha256").update(bytes).digest("hex");
      expect(sha256(await response.body()), url).toBe(sha256(readFileSync(path)));
      await response.dispose();
    }));
  }
});

test("combatant pages use flat asset URLs and load their images", async ({ page }) => {
  for (const route of ["/combatant", "/combatant/renoa", "/combatant/nia"]) {
    const failures: string[] = [];
    const onResponse = (response: import("@playwright/test").Response) => {
      if (response.url().includes("/assets/") && response.status() >= 400) failures.push(response.url());
    };
    page.on("response", onResponse);
    await page.goto(route);
    await expect(page.getByTestId("combatant-portrait")).toHaveCount(38);
    const images = page.locator("img");
    await images.evaluateAll((elements) => (elements as HTMLImageElement[]).forEach((image) => image.loading = "eager"));
    await expect.poll(() => images.evaluateAll((elements) => (elements as HTMLImageElement[]).filter((image) => !image.complete || image.naturalWidth === 0).map((image) => image.src))).toEqual([]);
    expect(await images.evaluateAll((elements) => (elements as HTMLImageElement[]).every((image) => /^\/assets\/[^/]+\/[^/]+$/.test(new URL(image.src).pathname)))).toBe(true);
    expect(failures).toEqual([]);
    page.off("response", onResponse);
  }
});
