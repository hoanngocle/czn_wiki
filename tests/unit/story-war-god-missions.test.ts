import { describe, expect, it } from "vitest";
import { getWarGodMissions, warGodMissions } from "../../lib/story/war-god-missions";

const mission = (chapter: number, id: string) => getWarGodMissions(chapter).find((entry) => entry.id === id);

describe("mission evidence at the end of each chapter", () => {
  it("does not introduce a destiny quest before its activation", () => {
    expect(getWarGodMissions(33).filter((entry) => entry.kind === "destiny")).toEqual([]);
    expect(mission(34, "death-battle")?.status).toBe("active");
    expect(mission(80, "divinity-materials")).toBeUndefined();
  });

  it("keeps rescue active after the saint intervenes until the explicit system confirmation", () => {
    expect(mission(66, "death-battle")?.status).toBe("active");
    expect(mission(69, "death-battle")?.status).toBe("active");
    expect(mission(79, "death-battle")?.status).toBe("active");
    expect(mission(80, "death-battle")?.status).toBe("completed");
  });

  it("distinguishes material collection, submission and the later reward", () => {
    expect(mission(92, "divinity-materials")?.status).toBe("active");
    expect(mission(94, "divinity-materials")?.status).toBe("active");
    expect(mission(95, "divinity-materials")?.status).toBe("completed");
    expect(JSON.stringify(mission(97, "divinity-materials"))).not.toContain("Tru Tà");
    expect(JSON.stringify(mission(98, "divinity-materials"))).toContain("Tru Tà");
    expect(JSON.stringify(mission(98, "divinity-materials"))).not.toContain("một giây");
    expect(JSON.stringify(mission(99, "divinity-materials"))).toContain("một giây");
  });

  it("contains only tasks explicitly issued by the War God system", () => {
    expect(warGodMissions.filter((entry) => entry.firstChapter <= 200).map((entry) => entry.id)).toEqual(["death-battle", "divinity-materials", "decisive-battle", "divinity-upgrade"]);
    expect(getWarGodMissions(100).map((entry) => entry.title)).toEqual(["Trận Chiến Chết Chóc", "Thần thông Chiến Thần"]);
    expect(getWarGodMissions(100).every((entry) => entry.issuer === "Giao diện Chiến Thần")).toBe(true);
    for (const chapter of [1, 3, 11, 17, 33]) expect(getWarGodMissions(chapter)).toEqual([]);
    for (const chapter of [34, 44, 55, 69, 80]) expect(getWarGodMissions(chapter)).toHaveLength(1);
    for (const chapter of [81, 94, 100]) expect(getWarGodMissions(chapter)).toHaveLength(2);
  });

  it("filters every dated event and fact without mutating the canonical history", () => {
    const canonical = JSON.stringify(warGodMissions);
    for (let chapter = 1; chapter <= 300; chapter++) {
      for (const entry of getWarGodMissions(chapter)) {
        expect(entry.firstChapter).toBeLessThanOrEqual(chapter);
        expect(entry.events.length).toBeGreaterThan(0);
        expect(entry.events.every((event) => event.chapter <= chapter && event.paragraphs.length > 0)).toBe(true);
        expect((entry.facts ?? []).every((fact) => fact.chapter <= chapter)).toBe(true);
      }
    }
    const projected = mission(98, "divinity-materials")!;
    projected.events[0].text = "changed by consumer";
    if (projected.facts?.[0]) projected.facts[0].text = "changed by consumer";
    expect(JSON.stringify(warGodMissions)).toBe(canonical);
  });

  it("uses the same invalid-input and coverage boundary as the system panel", () => {
    for (const value of [NaN, Infinity, -1, 0, 1.5]) expect(getWarGodMissions(value)).toEqual([]);
    expect(getWarGodMissions(1501)).toEqual(getWarGodMissions(1500));
  });
});
