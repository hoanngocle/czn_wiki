import { describe, expect, it } from "vitest";
import { storyNodes, storyLinks } from "../../lib/story/timeline";

describe("characters introduced by the chapter milestones", () => {
  it("includes each important character once at the first stage mentioning them", () => {
    const expected = {
      rescue: ["Công Tôn Trí", "Ninh Nguyệt Thiền"],
      sword: ["Lãnh Thiên Tinh", "Bách Hoa Tiên Tử (Tạ Đạo Linh)", "Ngỗng Trắng (Bạch Ánh Thiên)"],
      "truong-da-trap": ["Tô Tuyết Nhi", "Anna"],
      anna: ["Nữ Thần Công Chính"],
    };
    for (const [stage, names] of Object.entries(expected)) {
      for (const title of names) {
        const matching = storyNodes.filter((node) => node.kind === "character" && node.title === title);
        expect(matching, title).toHaveLength(1);
        expect(storyLinks.filter((link) => link.target === matching[0].id).map((link) => link.source)).toEqual([stage]);
      }
    }
    expect(storyNodes.filter((node) => node.kind === "event" && node.chapters![0] <= 300)).toHaveLength(26);
  });
});
