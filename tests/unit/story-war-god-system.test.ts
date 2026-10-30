import { describe, expect, it } from "vitest";
import { getWarGodSystem } from "../../lib/story/war-god-system";

describe("Chiến Thần system chapter evidence", () => {
  it("separates seen techniques from learned techniques and keeps the shared cost", () => {
    const system = getWarGodSystem(4);
    const bow = system.weapons.find((weapon) => weapon.id === "bow")!;
    expect(bow.techniques.map((entry) => entry.name)).toEqual(["Ổn Định & Liên Xạ", "Chính Xác", "Yến Song Phi"]);
    expect(bow.techniques[0]).toMatchObject({ cost: 2, status: "Đã lĩnh ngộ", performer: "Trương Vũ" });
    expect(bow.techniques[2].status).toBe("Chưa lĩnh ngộ");
    expect(getWarGodSystem(15).weapons.find((weapon) => weapon.id === "bow")?.techniques[2].status).toBe("Đã lĩnh ngộ");
    expect(getWarGodSystem(16).weapons.find((weapon) => weapon.id === "bow")?.techniques[2].status).toBe("Được thay thế bởi Loạn Vũ");
    expect(getWarGodSystem(3).weapons.some((weapon) => weapon.id === "bow")).toBe(false);
  });

  it("keeps chapter and timing evidence for soul, experience and hourglass", () => {
    expect(JSON.stringify(getWarGodSystem(13))).not.toContain("chương 14");
    expect(getWarGodSystem(4).soul).toMatchObject({ value: "1 / 5", chapter: 4 });
    expect(getWarGodSystem(4).soul.note).toContain("trước khi thăng cấp");
    expect(getWarGodSystem(4).experience?.value).toBe("0 / 10");
    expect(getWarGodSystem(14).experience).toBeNull();
    expect(getWarGodSystem(99).soul.value).toBe("640 / 20");
    expect(getWarGodSystem(100).soul.value).toBe("530 / 20");
    expect(getWarGodSystem(4).hourglass?.value).toBe("Đã hết");
    expect(getWarGodSystem(5).hourglass?.value).toBe("Chưa xác định");
    expect(getWarGodSystem(99).hourglass?.value).toBe("Rơi rất chậm");
  });

  it("does not invent a destiny dock button or spoil the four choices", () => {
    expect(getWarGodSystem(34).dock).toEqual(["technique"]);
    expect(getWarGodSystem(81).phase).toBe("wheel");
    expect(getWarGodSystem(95).choices).toEqual([]);
    const early = getWarGodSystem(97);
    expect(early.phase).toBe("choices");
    expect(early.choices).toHaveLength(4);
    expect(early.choices[0].glyph).toBe("clock");
    expect(early.choices.slice(1).every((choice) => choice.glyph === "unknown")).toBe(true);
    expect(JSON.stringify(early.choices)).not.toMatch(/Không Quyền|Tru Tà|Biến Thân|Tuyên Ngôn/);
    expect(getWarGodSystem(98).dock).toEqual(["technique", "divinity"]);
    expect(getWarGodSystem(98).choices.map((choice) => choice.name)).toEqual(["Tuyên Ngôn Thời Gian", "Không Quyền", "Biến Thân Thành Nữ", "Tru Tà"]);
  });
  it("keeps future modules and material names hidden", () => {
    expect(getWarGodSystem(2).modules).toEqual([]);
    expect(getWarGodSystem(3).modules.map((item) => item.id)).toEqual(["technique"]);
    expect(getWarGodSystem(33).modules.map((item) => item.id)).toEqual(["technique"]);
    expect(getWarGodSystem(34).modules.map((item) => item.id)).toEqual(["technique", "destiny"]);
    expect(getWarGodSystem(80).materials).toEqual([]);
  });

  it("distinguishes ongoing destiny from its confirmed completion", () => {
    expect(getWarGodSystem(69).modules.find((item) => item.id === "destiny")?.status).toBe("Đang tiến hành");
    expect(getWarGodSystem(79).modules.find((item) => item.id === "destiny")?.status).toBe("Đang tiến hành");
    expect(getWarGodSystem(80).modules.find((item) => item.id === "destiny")).toMatchObject({ status: "Đã hoàn thành", chapter: 80 });
    expect(getWarGodSystem(81).modules.find((item) => item.id === "destiny")?.status).toBe("Đã hoàn thành");
  });

  it("distinguishes collecting, carrying and submitting the last material", () => {
    expect(getWarGodSystem(81).materials.every((item) => item.state === "Chưa ghi nhận")).toBe(true);
    expect(getWarGodSystem(82).materials.filter((item) => item.state === "Đã thu thập")).toHaveLength(4);
    expect(getWarGodSystem(84).materials.filter((item) => item.state === "Đã đưa vào vòng quay")).toHaveLength(0);
    expect(getWarGodSystem(85).materials.filter((item) => item.state === "Đã đưa vào vòng quay")).toHaveLength(4);
    expect(getWarGodSystem(91).materials.find((item) => item.id === "cosmic")?.name).toBeUndefined();
    expect(getWarGodSystem(92).materials.find((item) => item.id === "cosmic")?.name).toBe("Mảnh tim quái vật vũ trụ");
    expect(getWarGodSystem(94).materials.find((item) => item.id === "cosmic")?.state).toBe("Đã thu thập");
    expect(getWarGodSystem(95).materials.every((item) => item.state === "Đã đưa vào vòng quay")).toBe(true);
  });

  it("reveals the thunder outcome only at its source chapter and caps coverage", () => {
    expect(JSON.stringify(getWarGodSystem(97))).not.toContain("Tru Tà");
    expect(JSON.stringify(getWarGodSystem(98))).toContain("Tru Tà");
    expect(JSON.stringify(getWarGodSystem(98))).not.toContain("một giây");
    expect(JSON.stringify(getWarGodSystem(99))).toContain("một giây");
    expect(getWarGodSystem(1501)).toEqual(getWarGodSystem(1500));
    expect(getWarGodSystem(NaN)).toEqual(getWarGodSystem(1));
  });
});
