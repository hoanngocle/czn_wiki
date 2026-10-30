# Chiến Thần profile implementation plan

> **For agentic workers:** Use superpowers:executing-plans to implement task-by-task.

**Goal:** Add the approved chapter-aware character profile and persist `currentChap` locally.
**Architecture:** A pure chapter projection selects evidence-backed records; a client component owns reading progress and item selection. A server route supplies metadata. CSS Modules isolate the RPG presentation.
**Tech Stack:** Existing Next.js, React, TypeScript, CSS Modules, Vitest, Playwright.
**Spec:** docs/superpowers/specs/2026-10-30-chien-than-profile-design.md

## Global constraints
- Vietnamese UI; chapter range 1–100; no future chapter disclosures.
- No invented HP, rarity, inventory counts or cultivation percentages.
- User approved the design and added a persisted `currentChap` variable.
- Reuse the current checkout: the existing story feature is uncommitted here. Preserve other ongoing work; no commits or worktree migration in this task.

## Review focus
- Invalid persisted progress must fall back safely (Task 1).
- Earlier chapters must hide future entries and detail selections (Tasks 1–2).
- Spent/transferred inventory must stop appearing as held (Task 1).
- Unavailable browser storage must not disable navigation (Task 2).
- Mobile viewport must retain controls without horizontal overflow (Task 2).

## Task 1: Chapter projection
Files: `lib/story/war-god.ts`, `tests/unit/story-war-god.test.ts`.
Interface: `parseCurrentChap(value: unknown): number`, `getWarGodProfile(chapter: number): WarGodProfile`, `CURRENT_CHAP_KEY`.
- [x] Write boundary, spoiler, acquisition/removal, and evidence tests; run and observe failure.
- [x] Implement evidence-backed changes and chapter validation; currentChap uses a story-scoped storage key.
- [x] Run `npx vitest run tests/unit/story-war-god.test.ts`; expect all passing.

## Task 2: Screen and persistence
Files: `components/story/WarGodProfile.tsx`, `components/story/war-god.module.css`, `app/truyen/chu-gioi-tan-the-online/chien-than/page.tsx`, `components/story/StoryTimeline.tsx`, `tests/e2e/story-war-god.spec.ts`.
Consumes Task 1 projection. Includes chapter input and previous/next, milestone selector, profile, equipment, inventory filter, skill detail, chapter citations and journal.
- [x] Write browser tests for persistence, spoilers, inventory interaction, unavailable storage and mobile width. Initial browser run blocked by environment before reaching route; regressions below were observed failing then passing.
- [x] Implement screen and a visible entry link from the story wiki.
- [x] Run targeted browser tests, scoped ESLint, TypeScript and unit suite; inspect desktop/mobile screenshots.
- [x] Request fresh review, resolve actionable issues and record results below.

## Execution ledger
- Ruling: Execute directly in the existing feature checkout after approval; no repeated execution-method confirmation is needed.
- Pre-flight: Task 2 consumes the exact projection and parser interfaces defined in Task 1.
- Task 1 complete: 17 tests pass; source uses end-of-chapter state. Chapter 4 ends at Luyện Khí tầng 2 (corrected after full chapter inspection).
- Task 2 complete: 7 browser tests pass; all 450 unit tests pass; scoped ESLint and typecheck pass. Desktop 1440px and mobile 390px screenshots inspected.
- Fresh reviewer identified a later skill alias in early description and form remount dropping keyboard focus. Reproduced both with failing regression tests, gated alias by chapter and retained the form with controlled input; tests now pass.
- Added a mobile toolbar link because the existing story sidebar and breadcrumb are hidden at narrow widths. Browser test verifies navigation from the wiki.
- Review ruling: exhaustive inventory coverage is outside this initial curated profile; visible UI calls records out as incomplete and gives chapter evidence. No claim of exhaustive possession state.
- Storage: `currentChap` is local component state persisted as a numeric string under `story-wiki:chu-gioi-tan-the-online:currentChap`. It is independent of the separately exported reader's progress, and listens for cross-tab storage updates.
- Environment: reused existing development server at 127.0.0.1:3000, installed Playwright browser cache; browser tests needed sandbox network escalation. No Next.js feedback candidates after reporting pass: encountered friction was test environment configuration, not a verified Next.js issue.

## Follow-up: automatic reader synchronization
- User requested automatic `currentChap` updates from the existing HTML reader. Read its current storage contract before changing the profile.
- Added `lib/story/reading-progress.ts` to validate reader progress and prefer it over the legacy profile cache; kept the reader's resume/scroll records untouched.
- Updated the profile to subscribe to reader storage, page focus/visibility and pageshow. Real reading chapters support the verified 2488-chapter manifest, with profile projection limited to 100 and a visible coverage note.
- Existing manual controls act as local previews when reader progress exists; ordinary refreshes with unchanged source chapters preserve previews and unsaved session progress.
- Verification: 461 unit tests passed; 12 browser tests passed including actual reader navigation, two-tab synchronization, backwards chapters, scrolling, chapter135, cross-profile preview preservation and quota failures. Scoped ESLint and TypeScript passed.
- Fresh review found stale-source resets and cross-profile cache feedback; both reproduced with failing tests before fixes, then passed. No Next.js feedback candidates in this follow-up.

## Follow-up: shared story layout
- Extracted `StoryShell` and `StoryIcon`; timeline and profile now share header, sidebar, navigation and palette. Preserved the embedded reader integration being developed in the same checkout.
- Added current chapter to the shared header, profile section navigation, mobile page navigation, and container breakpoints for the profile's narrower content area.
- Verification: 461 unit tests and 22 related browser tests passed; scoped ESLint and TypeScript passed. Desktop/mobile screenshots inspected; tests confirm matching shell geometry, fixed header while scrolling, chapter synchronization and no horizontal overflow. No Next.js feedback candidates.

## Follow-up: automatic progress and common header actions
- Removed manual chapter entry/update from the profile. Milestone previews now use separate local state; the header and shared progress always retain the actual reading chapter.
- Consolidated map controls and embedded reader navigation/font/theme actions into the shared header, using common control sizing and responsive wrapping.
- Reader commands and state use an origin/source-checked postMessage bridge; source templates and published assets match. Standalone reader controls remain available.
- Verification: 22 related browser tests passed, including chapter/preview synchronization, reader settings, navigation and map interactions. Additional reader checks passed at widths 320–1440px, including the contents action. Desktop/mobile screenshots inspected.
