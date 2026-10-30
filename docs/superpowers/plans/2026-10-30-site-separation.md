# Site Separation Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Give CZN and the ebook library independent public URL spaces and working navigation.

**Architecture:** Rename existing route directories at the same depth, update internal URL producers and pathname consumers, and redirect legacy routes. Build a small catalog-driven library and a two-destination home page without changing story state or static EPUB assets.

**Tech Stack:** Existing Next.js 16.4.3, React, TypeScript, CSS Modules, Vitest and Playwright.

**Spec:** `docs/superpowers/specs/2026-10-30-site-separation-design.md`

## Global Constraints

- Preserve in-progress changes and existing local storage keys.
- Reuse existing dependencies, fonts, cover and book data.
- Read bundled Next.js routing documentation before editing.

## Review Focus

- Old deep links with queries and fragments must reach new URLs.
- CZN selection and active navigation must work with the added prefix.
- Story/profile navigation and saved reading position must survive migration.
- Vietnamese search must work without diacritics and offer an empty state.
- At 320px, both entry pages must fit and keep links usable.

### Task 1: Migrate route namespaces

**Files:** `app/(wiki)/` → `app/czn/`, `app/truyen/` → `app/ebooks/`, `next.config.ts`, CZN URL helpers, shell/workspace/article links, story sidebar/shell, route expectations in existing tests.

**Interfaces:** CZN links start `/czn/`; `storyUrl` starts `/ebooks/`; old URLs redirect permanently.

- [x] Add and run failing Playwright navigation tests for canonical CZN selection and legacy redirects.
- [x] Move route directories, update URL producers/consumers and configure narrow legacy redirects.
- [x] Update existing test route expectations and run typecheck plus targeted regressions.

### Task 2: Entrance and searchable library

**Files:** `app/page.tsx`, `app/page.module.css`, `app/layout.tsx`, `app/ebooks/page.tsx`, `components/ebooks/EbookLibrary.tsx`, `components/ebooks/EbookLibrary.module.css`, `lib/ebooks/catalog.ts`, `tests/e2e/site-separation.spec.ts`.

**Interfaces:** Catalog entries supply title, author, cover, chapter count and canonical story URL; library links use `#doc-truyen` for reading.

- [x] Add browser coverage for entry links, accent-insensitive search, empty results, reader entry and mobile overflow; observe missing entry behavior fail before implementation.
- [x] Implement scoped entrance and library, plus return-to-library navigation from the story shell.
- [x] Run unit suite, typecheck, lint, production build and focused browser tests; inspect desktop/mobile screenshots.
- [x] Obtain an independent final review and address material findings.

## Progress

- Design approved; implementation authorized in chat. Execute in the existing `codex/story-timeline` checkout to preserve the user's uncommitted story work. No commits or separate worktree needed for this task.

- Task 1 complete: real route migration, canonical links and pathname checks, legacy redirects, proxy validation and 404 links updated. The existing partner invalid-ID regression caught a missed proxy prefix; it now passes.
- Task 2 complete: responsive entrance and searchable library using the actual cover and existing chapter count, with saved reading progress retained.
- Verification: `npm run typecheck` passed; `npm run test:unit` passed (48 files, 474 tests); production `npm run build` passed (106 static pages); 28 focused Playwright tests passed against the production server.
- Lint: application-source lint passed. The repository-wide command initially linted an existing `.codex-staged-check` temporary copy of third-party bundles; `npm run lint -- --ignore-pattern '.codex-staged-check/**'` passed.
- Visual QA: desktop and mobile library inspected; no horizontal overflow at 320px; browser runtime errors absent in checks.
- Independent review completed, including a follow-up review of the corrected proxy; no remaining material findings.
- Next.js feedback reporting pass: no verified framework issues retained. Build write restrictions were sandbox permissions; the 404 regression was application routing; screenshot caret hydration was a test timing issue.
