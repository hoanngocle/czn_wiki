import { expect, test } from "@playwright/test";

test("Vietnamese navigation is the default and the language setting follows page navigation", async ({ page }) => {
  await page.goto("/combatant/renoa");
  await expect(page.locator("html")).toHaveAttribute("lang", "vi");
  const nav = page.getByRole("navigation", { name: "Điều hướng CZN" });
  await expect(nav.getByRole("link", { name: "Nhân vật", exact: true })).toBeVisible();
  await nav.getByRole("link", { name: "Xây bộ bài", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Xây bộ bài", exact: true })).toBeVisible();
  await page.getByRole("region", { name: "Thiết lập bộ bài" }).getByRole("button", { name: "Chọn nhân vật", exact: true }).click();
  await page.getByRole("searchbox", { name: "Tìm nhân vật" }).fill("Mei Lin");
  await page.getByRole("button", { name: "Chọn Mei Lin", exact: true }).click();
  await expect(page.getByTestId("deck-card")).toHaveCount(8);
  await page.getByRole("button", { name: "Thêm bài", exact: true }).click();
  await expect(page.getByRole("combobox", { name: "Nguồn bài" })).toHaveValue("Combatant");
  await expect(page.getByRole("dialog").getByRole("button", { name: "Strike card", exact: true }).first()).toBeVisible();
  await page.getByRole("button", { name: "Đóng hộp thoại" }).click();
  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { name: "Deck Builder", exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Partner", exact: true }).click();
  await expect(page.getByRole("textbox", { name: "Search partners" })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("navigation", { name: "CZN navigation" })).toBeVisible();
  await page.getByRole("button", { name: "Chuyển sang tiếng Việt" }).click();
  await expect(page.getByRole("textbox", { name: "Tìm đối tác" })).toBeVisible();
});

test("every font weight renders Vietnamese glyphs from the local Be Vietnam Pro font", async ({ page }) => {
  await page.goto("/combatant/renoa");
  await page.evaluate(async () => {
    const sample = "ĂăÂâĐđÊêÔôƠơƯư " + Array.from({ length: 90 }, (_, index) => String.fromCharCode(0x1ea0 + index)).join("");
    for (const weight of [300, 400, 500, 600, 700]) {
      const element = document.createElement("span");
      element.id = `font-probe-${weight}`;
      element.textContent = sample;
      element.style.fontWeight = String(weight);
      document.body.append(element);
      await document.fonts.load(`${weight} 16px ${getComputedStyle(element).fontFamily}`, sample);
    }
    await document.fonts.ready;
  });
  const client = await page.context().newCDPSession(page);
  await client.send("DOM.enable");
  await client.send("CSS.enable");
  const { root } = await client.send("DOM.getDocument");
  for (const weight of [300, 400, 500, 600, 700]) {
    const { nodeId } = await client.send("DOM.querySelector", { nodeId: root.nodeId, selector: `#font-probe-${weight}` });
    const { fonts } = await client.send("CSS.getPlatformFontsForNode", { nodeId });
    expect(fonts.length).toBeGreaterThan(0);
    for (const font of fonts) {
      expect(font.isCustomFont, `${weight}: ${font.familyName} must be a web font`).toBe(true);
      expect(font.familyName).toContain("Be Vietnam Pro");
    }
  }
});

test("headings and controls share the global font on every workspace", async ({ page }) => {
  for (const route of ["/combatant/renoa", "/partner", "/deck-builder", "/equipment", "/terminology"]) {
    await page.goto(route);
    const fonts = await page.evaluate(async () => {
      await document.fonts.ready;
      const body = getComputedStyle(document.body).fontFamily;
      const elements = [...document.querySelectorAll("h1, h2, button, input, select, textarea")];
      return { body, mismatches: elements.filter(element => getComputedStyle(element).fontFamily !== body).map(element => element.tagName) };
    });
    expect(fonts.body).toMatch(/beVietnamPro/i);
    expect(fonts.mismatches, route).toEqual([]);
  }
});
