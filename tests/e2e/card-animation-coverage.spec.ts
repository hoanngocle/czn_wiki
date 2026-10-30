import { expect, test } from "@playwright/test";
import manifest from "../../data/wiki/card-videos.json";
import { characterDetails } from "../../data/wiki/characters/index";
import { characterGuides } from "../../data/wiki/guides";
import { combatantSlug } from "../../lib/wiki/urls";
import { indexCharacterCards } from "../../lib/wiki/character-guide";

test("every synchronized animation decodes a real frame in the browser", async ({ page }) => {
  test.setTimeout(120_000);
  await page.goto("/czn/combatant/nia");
  const paths = Object.values(manifest.cards).filter(item => item.status === "available").map(item => item.localUrl);
  expect(paths).toHaveLength(168);
  const failures = await page.evaluate(async paths => {
    const failures: string[] = [];
    for (let offset = 0; offset < paths.length; offset += 6) {
      await Promise.all(paths.slice(offset, offset + 6).map(path => new Promise<void>(resolve => {
        const video = document.createElement("video");
        video.muted = true;
        video.preload = "auto";
        const finish = (ok: boolean) => {
          clearTimeout(timer);
          video.onloadeddata = null;
          video.onerror = null;
          if (!ok) failures.push(path);
          video.removeAttribute("src");
          video.load();
          resolve();
        };
        const timer = setTimeout(() => finish(false), 15_000);
        video.onloadeddata = () => finish(video.videoWidth > 0 && video.videoHeight > 0 && video.duration > 0);
        video.onerror = () => finish(false);
        video.src = path;
      })));
    }
    return failures;
  }, paths);
  expect(failures).toEqual([]);
});

for (const id of ["1041", "1027", "1062"]) {
  const detail = characterDetails[id];
  const guide = characterGuides[id];
  test(`${detail.name} plays animation in Card and Deck tabs`, async ({ page }) => {
    await page.goto(`/czn/combatant/${combatantSlug(detail)}`);
    await page.getByRole("checkbox", { name: "Ảnh động" }).check();
    const cards = indexCharacterCards(detail, guide.extraCards);
    const animated = [...cards.values()].find(card => card.video && detail.sparkCards.some(base => base.id === card.id))!;
    const cardButton = page.getByRole("button", { name: `${animated.name} card`, exact: true }).first();
    await cardButton.scrollIntoViewIfNeeded();
    const video = cardButton.locator("video");
    await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.currentTime > 0 && !element.paused)).toBe(true);
    await page.getByRole("tab", { name: "Deck", exact: true }).click();
    // Scroll to an animated canonical card; viewport observation controls playback.
    const ref = guide.decks[0].cards.find(entry => cards.get(entry.cardId)?.video)!;
    const target = page.locator(`[data-card-id="${ref.cardId}"]`).filter({ visible: true }).first();
    await target.scrollIntoViewIfNeeded();
    await expect.poll(() => target.locator("video").evaluate((element: HTMLVideoElement) => element.currentTime > 0 && !element.paused)).toBe(true);

  });
}
