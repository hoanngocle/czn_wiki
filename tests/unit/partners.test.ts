import { existsSync } from "node:fs";
import { join } from "node:path";
import { expect, it } from "vitest";
import { getPartner, getPartnerDetail, getPartners, partnerUrl } from "../../lib/wiki/partners";

it("publishes complete local partner cards, passive ranks, and stats in both breakthrough states", () => {
  for (const partner of getPartners()) {
    const detail = getPartnerDetail(partner.id);
    expect(detail, partner.name).toBeDefined();
    expect(detail!.passives.map(passive => passive.level), partner.name).toEqual([1, 2, 3, 4, 5]);
    expect(detail!.card?.artwork, partner.name).toBeTruthy();
    expect(existsSync(join("public", detail!.card!.artwork!)), partner.name).toBe(true);
    expect(partner.portrait, partner.name).toBeTruthy();
    expect(existsSync(join("public", partner.portrait!)), partner.name).toBe(true);
    expect(detail!.stats, partner.name).toHaveLength(120);
    for (let level = 1; level <= 60; level++) for (const breakthrough of [false, true]) {
      const rows = detail!.stats.filter(row => row.level === level && row.breakthrough === breakthrough);
      expect(rows, `${partner.name}, level ${level}, breakthrough ${breakthrough}`).toHaveLength(1);
      expect([rows[0].attack, rows[0].defense, rows[0].hp].every(value => Number.isFinite(value) && value >= 0)).toBe(true);
    }
  }
});

it("resolves partner bookmarks without exposing combatants or invalid IDs", () => {
  expect(getPartner("30116")?.name).toBe("Licinia");
  expect(getPartner("licinia")?.id).toBe("30116");
  expect(partnerUrl({ name: "Licinia" })).toBe("/czn/partner/licinia");
  expect(getPartner("1041")).toBeUndefined();
  expect(getPartner("renoa")).toBeUndefined();
  expect(getPartner("missing")).toBeUndefined();
  expect(getPartnerDetail("missing")).toBeUndefined();
});
