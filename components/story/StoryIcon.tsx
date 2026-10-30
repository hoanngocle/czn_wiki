export type IconName = "book" | "map" | "search" | "plus" | "minus" | "fit" | "arrow" | "close" | "person" | "world" | "event" | "hand" | "chevron" | "external" | "edit" | "trash";
export function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, string> = {
    book: "M12 5C8 2 4 3 2 4v15c4-2 7-1 10 1 3-2 6-3 10-1V4c-2-1-6-2-10 1Zm0 0v15",
    map: "m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Zm6-3v15m6-12v15",
    search: "M21 21l-5-5m2-6a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
    plus: "M12 5v14M5 12h14", minus: "M5 12h14",
    fit: "M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5M8 8h8v8H8Z",
    arrow: "M4 12h16m-6-6 6 6-6 6", close: "m6 6 12 12M6 18 18 6",
    person: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0M4 21v-2a8 8 0 0 1 16 0v2",
    world: "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18",
    event: "m12 3 3 6 6 3-6 3-3 6-3-6-6-3 6-3Z",
    hand: "M8 12V6a2 2 0 0 1 4 0v5-7a2 2 0 0 1 4 0v8-5a2 2 0 0 1 4 0v8c0 5-3 7-7 7-3 0-5-2-7-5l-3-4c-1-2 1-4 3-2l2 2",
    chevron: "m9 5 7 7-7 7", external: "M14 3h7v7m0-7L10 14M10 3H3v18h18v-7",
    edit: "m15 5 4 4M4 20l4-1L20 7a3 3 0 0 0-4-4L4 15Z",
    trash: "M3 6h18M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7",
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]} /></svg>;
}

