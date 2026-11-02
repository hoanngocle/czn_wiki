import { afterEach, expect, it } from "vitest";
import { applyProfileEvents, storyExtension, type StoryExtension } from "../../lib/story/war-god-extension";
import type { ProfileEntry } from "../../lib/story/war-god";

const originalEvents = storyExtension.profileEvents;
afterEach(() => { storyExtension.profileEvents = originalEvents; });
const entries: ProfileEntry[] = [
  { id: "sword", name: "Kiếm thuật", chapter: 10, kind: "skill", tag: "Kiếm", description: "Đã học" },
  { id: "dragon", name: "Long chú", chapter: 20, kind: "skill", tag: "Chú", description: "Đã nhận" },
];
const events: StoryExtension["profileEvents"] = [
  { chapter: 30, section: "skills", operation: "availability", available: false, exceptIds: ["dragon"], description: "Tạm phong ấn khi nhập thế giới", paragraphs: "4–7" },
  { chapter: 31, section: "skills", operation: "upsert", id: "sword", name: "Kiếm thuật", kind: "skill", tag: "Kiếm", description: "Thông tin mới không phải giải phong ấn", paragraphs: "8–9" },
  { chapter: 32, section: "skills", operation: "availability", available: true, ids: ["sword"], description: "Đã giải phong ấn", paragraphs: "10–11" },
  { chapter: 33, section: "skills", operation: "remove", id: "sword", paragraphs: "12" },
];

it("retains sealed abilities with dated evidence, exceptions and explicit restoration", () => {
  storyExtension.profileEvents = events;
  expect(applyProfileEvents(entries, "skills", 29)).toEqual(entries);
  const sealed = applyProfileEvents(entries, "skills", 30);
  expect(sealed).toHaveLength(2);
  expect(sealed.find((entry) => entry.id === "sword")).toMatchObject({ chapter: 10, availability: { available: false, chapter: 30, description: "Tạm phong ấn khi nhập thế giới" } });
  expect(sealed.find((entry) => entry.id === "dragon")?.availability).toBeUndefined();
  expect(applyProfileEvents(entries, "skills", 31).find((entry) => entry.id === "sword")).toMatchObject({ description: "Thông tin mới không phải giải phong ấn", availability: { available: false, chapter: 30 } });
  expect(applyProfileEvents(entries, "skills", 32).find((entry) => entry.id === "sword")?.availability).toMatchObject({ available: true, chapter: 32 });
  expect(applyProfileEvents(entries, "skills", 33).some((entry) => entry.id === "sword")).toBe(false);
  expect(applyProfileEvents(entries, "equipment", 32)).toEqual(entries);
  expect(entries.every((entry) => entry.availability === undefined)).toBe(true);
});

it("does not invent missing entries or seal abilities acquired after the sealing event", () => {
  const restore = events[2];
  if (restore.operation !== "availability") throw new Error("Expected an availability fixture");
  storyExtension.profileEvents = [events[0], { ...restore, ids: ["missing"] }, {
    chapter: 34, section: "skills", operation: "upsert", id: "new", name: "Mới học", kind: "skill", tag: "Mới", description: "Năng lực nhận sau khi phong ấn", paragraphs: "15",
  }];
  const result = applyProfileEvents([...entries, { id: "later-base", name: "Học sau", chapter: 34, kind: "skill", tag: "Mới", description: "Học sau phong ấn" }], "skills", 34);
  expect(result.map((entry) => entry.id)).toEqual(["sword", "dragon", "later-base", "new"]);
  expect(result.find((entry) => entry.id === "later-base")?.availability).toBeUndefined();
  expect(result.find((entry) => entry.id === "new")?.availability).toBeUndefined();
});
