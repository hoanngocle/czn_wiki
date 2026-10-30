import type { Metadata } from "next";
import { Suspense } from "react";
import { StoryReader } from "../../../../components/story/StoryReader";
import { parseReadingChapter } from "../../../../lib/story/reading-progress";

export const metadata: Metadata = {
  title: "Đọc Chư Giới Tận Thế Online",
  description: "Đọc Chư Giới Tận Thế Online và tiếp tục từ chương đang đọc.",
};

type Props = {
  searchParams: Promise<{ chuong?: string | string[] }>;
};

export default function StoryReaderPage({ searchParams }: Props) {
  return <Suspense><ReaderContent searchParams={searchParams} /></Suspense>;
}

async function ReaderContent({ searchParams }: Props) {
  const { chuong } = await searchParams;
  const initialChapter = chuong === undefined ? undefined : parseReadingChapter(chuong);
  return <StoryReader key={initialChapter ?? "resume"} initialChapter={initialChapter} />;
}
