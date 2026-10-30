import { describe, expect, it } from "vitest";
import { resolveReadingChapter } from "../../lib/story/reading-progress";

describe("reader progress is the source for the character profile", () => {
  it("prefers the reader chapter over an older manual profile chapter", () => {
    expect(resolveReadingChapter('{"chapter":97,"scroll":412}', "16")).toEqual({ chapter: 97, fromReader: true });
  });
  it("keeps actual reading progress beyond the available profile data", () => {
    expect(resolveReadingChapter('{"chapter":135}', "100")).toEqual({ chapter: 135, fromReader: true });
  });
  it.each([null, "broken json", "null", "[]", '{"chapter":0}', '{"chapter":2.5}', '{"chapter":"97"}', '{"chapter":2489}'])("falls back safely for malformed reader data %s", (raw) => {
    expect(resolveReadingChapter(raw, "47")).toEqual({ chapter: 47, fromReader: false });
  });
  it("starts at chapter one when both sources are invalid", () => {
    expect(resolveReadingChapter("{}", "bad")).toEqual({ chapter: 1, fromReader: false });
  });
});
