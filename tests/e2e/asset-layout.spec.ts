import { expect, test } from "@playwright/test";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

test("every flattened asset is served with its original bytes", async ({ request }) => {
  for (const category of readdirSync("public/assets")) {
    for (const file of readdirSync(join("public/assets", category))) {
      const url = `/assets/${category}/${file}`;
      const response = await request.get(url);
      expect(response.status(), url).toBe(200);
      expect(await response.body(), url).toEqual(readFileSync(join("public", url)));
    }
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
