export const READER_PROGRESS_KEY = "chu-gioi-reader-progress";
// Total chapters in the supplied novel's exported chapters.json manifest.
export const MAX_READING_CHAPTER = 2488;

function validChapter(value: unknown): number | null {
  if (typeof value !== "number" && typeof value !== "string") return null;
  if (typeof value === "string" && !/^\d+$/.test(value.trim())) return null;
  const chapter = Number(value);
  return Number.isInteger(chapter) && chapter >= 1 && chapter <= MAX_READING_CHAPTER ? chapter : null;
}

export function parseReadingChapter(value: unknown): number {
  return validChapter(value) ?? 1;
}

export function resolveReadingChapter(readerRaw: string | null, profileRaw: string | null) {
  try {
    const progress: unknown = JSON.parse(readerRaw ?? "null");
    if (progress && typeof progress === "object" && "chapter" in progress && typeof progress.chapter === "number") {
      const chapter = validChapter(progress.chapter);
      if (chapter !== null) return { chapter, fromReader: true };
    }
  } catch { /* Preserve legacy profile progress when reader storage is malformed. */ }
  return { chapter: parseReadingChapter(profileRaw), fromReader: false };
}
