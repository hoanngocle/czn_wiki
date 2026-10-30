import type { Metadata } from "next";
import { Suspense } from "react";
import { StoryTimeline } from "../../../components/story/StoryTimeline";
import { getStoryArc } from "../../../lib/story/arcs";

export const metadata: Metadata = {
  title: "Cốt Truyện · Chư Giới Tận Thế Online",
  description: "Khám phá Chư Giới Tận Thế Online theo từng Arc, với sơ đồ riêng, diễn biến từng chương và các nhân vật liên quan.",
};

async function ArcContent({ searchParams }: { searchParams: Promise<{ arc?: string | string[] }> }) {
  const { arc: requested } = await searchParams;
  const arc = getStoryArc(typeof requested === "string" ? requested : undefined);
  return <StoryTimeline key={arc.id} arcId={arc.id} />;
}

export default function StoryWikiPage({ searchParams }: { searchParams: Promise<{ arc?: string | string[] }> }) {
  return <Suspense fallback={<p role="status">Đang mở Cốt Truyện…</p>}><ArcContent searchParams={searchParams} /></Suspense>;
}
