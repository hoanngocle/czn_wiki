import type { ReactNode } from "react";

const glyphs: Record<string, ReactNode> = {
  titles: <><path d="m12 18 10 8 10-16 10 16 10-8-5 29H17L12 18Zm7 35h26M24 36h16" /><circle cx="32" cy="33" r="4" /></>,
  technique: <><circle cx="32" cy="32" r="22" /><circle cx="32" cy="32" r="16" strokeDasharray="2 6" /><path d="m32 14 5 9-5 22-5-22 5-9ZM22 38l10 5 10-5M32 43v8" /></>,
  hourglass: <><path d="M20 8h24M20 56h24M23 9c0 15 1 17 9 23-8 6-9 8-9 23m18-46c0 15-1 17-9 23 8 6 9 8 9 23" /><path d="m26 48 6-7 6 7H26Zm0-30 6 7 6-7H26Z" fill="currentColor" opacity=".5" /></>,
  clock: <><circle cx="32" cy="32" r="22" /><path d="M32 16v17l11 6M32 10v4m22 18h-4M32 54v-4M10 32h4" /></>,
  fist: <><path d="m18 50-4-17 1-14c0-6 7-6 7 0v7-13c0-6 7-6 7 0v12-15c0-6 7-6 7 0v15-11c0-6 7-6 7 0v17l5-6c5-4 9 1 5 6L40 50v8H21v-8Z" /><path d="m16 31 8 3 13-2M22 50h17" /></>,
  woman: <><path d="M17 42c-5-28 4-34 15-34s20 6 15 34M22 21c0 22 20 22 20 0-7 0-8-7-8-7s-4 7-12 7ZM25 39l-2 8-11 8m27-16 2 8 11 8M23 47l9 6 9-6" /></>,
  snakes: <><path d="M40 8c-23-9-34 14-14 23 31 15 15 35-3 24-13-8 2-17 13-15 26 5 27-27 10-29" /><path d="M24 8c23-9 34 14 14 23C7 46 23 66 41 55c13-8-2-17-13-15C2 45 1 13 18 11" opacity=".6" /><path d="m40 8 8-2-2 7-6-5Zm-16 0-8-2 2 7 6-5Z" fill="currentColor" /><path d="m44 4 2-3m-26 3-2-3" /></>,
  chaos: <><path d="m9 39 8-17 17-7 15 7 5 13-12-6-6 8-11-4-7 11M17 28l3 15-7 8m25-14 3 11 12 2M8 53h48M25 47l8-4 6 4-5 5-9-5Z" /><circle cx="43" cy="24" r="1.5" fill="currentColor" /></>,
  abyss: <><path d="M10 10h44v44H10z" opacity=".3" /><path d="M13 16h34v6H21v6h24v6H27v6h16v6H33v9" /><path d="m8 12 6 44m42-44-6 44" opacity=".5" /></>,
  cosmic: <><circle cx="32" cy="35" r="15" /><ellipse cx="32" cy="35" rx="6" ry="15" /><path d="M17 35h30M8 8l8 10 4 15M25 5l2 12 4 4M43 6l-2 13-5 5M57 11l-8 11-5 14" /></>,
  underworld: <><path d="M6 53h52M12 53V40l10-5 7 9 1 9m9 0V32l7-6 9 4M43 30V19l-6-6m9 16 9-12" /><circle cx="20" cy="29" r="5" /><circle cx="44" cy="14" r="5" /></>,
  unknown: <><path d="M17 39C1 35 5 20 17 21c0-16 24-18 29-3 15-2 20 19 5 23H17Z" /><path d="m20 23-5-12-7-3m35 15 9-11 7-1M25 39l-6 12-8 4m30-15 5 12 8 5" /></>,
};
export function SystemGlyph({ name, className }: { name: string; className?: string }) {
  return <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{glyphs[name] ?? <><circle cx="32" cy="32" r="16" strokeDasharray="2 5" /><path d="M27 25a6 6 0 0 1 11 3c0 5-6 5-6 10m0 5v1" /></>}</svg>;
}
export function WeaponIllustration({ kind }: { kind: string }) {
  return <svg viewBox="0 0 240 300" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="120" cy="150" r="90" strokeWidth=".5" opacity=".2" /><circle cx="120" cy="150" r="105" strokeWidth=".5" strokeDasharray="1 9" opacity=".4" />
    {kind === "bow" ? <><path d="M77 24C62 65 185 68 161 150S57 227 77 276" strokeWidth="5" /><path d="M77 24v252" strokeWidth="1" /><path d="m157 130 6 40" strokeWidth="9" /><path d="M43 150h158m-11-6 13 6-13 6M43 150l-7-7m7 7-7 7" strokeWidth="1.5" /><path d="m150 83-7 9m13-3-8 9m6 112-9-9m2 14-9-9" strokeWidth="2" opacity=".5" /></>
      : kind === "saber" ? <><path d="M111 218c65-52 74-131 38-193 9 66-12 125-54 168l16 25Z" fill="currentColor" fillOpacity=".09" strokeWidth="2" /><path d="m135 141 8 3-10 9m-2-75 9 6M88 191l33 29m-20-13-26 50 11 5 27-48M72 258l18 9" strokeWidth="3" /></>
      : <><path d="m120 17 12 41-12 20-12-20 12-41Zm0 61v202m-6-205 12 5m-12 4 12 5m-12 4 12 5" strokeWidth="3" /><path d="m119 28-3 31 4 10" opacity=".5" /></>}
  </svg>;
}
