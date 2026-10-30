# War God concept implementation plan

**Approved source:** `docs/story/chien-than-concept-spec.md`. User explicitly requested implementation in this chat. Execute inline in the current checkout; preserve ongoing unrelated work and do not commit.

**Goal:** Replace the light card/menu modal with a blue luminous system, source-aware weapon inspection, mission messages, five-slot wheel and four-choice replay.

## Task 1 Evidence projection

Extend `lib/story/war-god-system.ts` with `phase`, `dock`, time/EXP/soul evidence, inspectable weapon records and chapter-gated choices. Preserve existing module/material contracts used by tests; destiny is a notification, never a dock function. Add source chapter and timing notes to all new facts. Use native SVG illustrations until user supplies artwork.

First add tests for chapter 4 seen versus learned skills and grouped cost, chapter 14 EXP removal, chapter 97 unknown choices, chapter 98 exactly two unlocked dock entries, soul over capacity and hourglass states. Run red, implement, run green.

## Task 2 Modal scenes

Rewrite `WarGodSystem.tsx` and CSS; extract visual glyphs and scenes into focused components. Native dialog remains. A keyed screen resets scene selection when evidence chapter changes, without re-opening the dialog. Header/close and dock remain reachable; central stage scrolls. Source utility opens relevant references in the same modal; links only follow explicit clicks. Mission and replay controls stay outside the lore dock.

Add browser tests for inspection, correct sources, mission, material selection, all four choices, replay return to two lit dock buttons, reduced motion, backward chapters and mobile. Retain reader-scroll, keyboard, dismissal and focus tests. Run relevant browser suite, unit suite, TypeScript and scoped lint; inspect screenshots at 1440/390/320 widths.

## Task 3 Documentation and review

Update system documentation and spec implementation status. Fresh read-only reviewer checks listed files and boundaries; fix substantive findings with regression evidence. Report actual checks and asset limitations.

## Review focus

No future names in chapter 97; no invented third dock button; grouped cost stays 2 for two skills; legacy soul values have timestamps; replay never writes progress or spends resources; changing chapters clears stale details; 320px layout and reduced motion.

## Ledger

Pre-flight: scenes consume the pure projection; common shell still provides actual chapter and owns modal presence. Public progress/storage contracts remain unchanged. Approved concept permits vector placeholders for art.

- Task 1: three added projection tests failed against missing behavior, then all seven system tests passed. Data separates seen/learned/replaced techniques and preserves evidence timing.
- Task 2: inspection browser test failed against missing UI before implementation. Native dialog needed explicit Tab cycling to avoid browser-chrome focus escape; observed regression now passes. Reader checks compare scroll before/after modal at the same viewport; viewport resizing naturally reflows reader text.
- Implemented all scene types, source notes, dark dock, five-slot wheel, gated choices, recorded outcome replay, chapter resets and reduced-motion handling. SVG illustrations stand in for future user artwork.
- Verification: 468 unit tests, 20 related browser tests, scoped ESLint and TypeScript pass. Inspected desktop and 390/320px screenshots. Local server stopped during work; restarted with matching local-network permissions for browser tests. No verified Next.js defect retained as feedback.
- Independent review found three issues: a chapter-13 EXP note revealed chapter 14, replay used a fixed travel distance, and mobile utility/close targets were below 44px. Added failing regression checks, then removed the future note, measured the real dock destination for the animation, and enlarged targets. Corrected learned-skill source wording so replacement status is not attributed to the earlier learning chapter.
- Final verification after fixes: all 468 unit tests and 22 related browser tests passed; scoped ESLint and TypeScript passed. Browser tests verify the flight endpoint on desktop and 320px mobile, including final size and visibility. Re-inspected the five-slot wheel and 320px inspection screenshots. Temporary localhost test configuration removed after execution.
- Final Next.js feedback pass: no qualifying verified framework issue; no report needed.
