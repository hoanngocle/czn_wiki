# Chapters 1–71 and character portraits implementation plan

> **For agentic workers:** Use executing-plans for application work. Three independent source readers are dispatched under dispatching-parallel-agents; they only own their chapter-note JSON files.

**Goal:** Replace the approximate story map with concise, source-backed milestones from the local EPUB through chapter 71 and let the user attach character portraits.

**Architecture:** Read the entire requested range into per-chapter original notes, then synthesize a modest number of milestones on the existing horizontal two-realm graph. Add chapter metadata and separate short summaries from expanded detail. Store resized user-uploaded portraits with graph data and validate saved payloads.

**Tech Stack:** Next.js/React/TypeScript, local EPUB via Python stdlib, Vitest, Playwright, browser Canvas and localStorage.

**Spec:** User-approved request in this chat: read local `Chu Gioi Tan The Online - Yen Hoa Thanh Thanh.epub`, chapters 1–71, moderate milestone count, horizontal two branches, chapter labels, first character appearances, user-provided pictures.

## Global constraints
- Source numbering comes from this EPUB's chapter entries and primary headings, not web editions or stray inner headings.
- Do not copy chapter text into the application or publish the EPUB. Notes and summaries are original paraphrases.
- Preserve readable wrapped titles, editing, connections and saved custom nodes. Do not commit existing unrelated work.
- Existing checkout contains the user's unfinished graph and book; continue there without creating a checkout that omits those untracked inputs.
- No new service, image generation, remote upload or dependency is needed for portraits.

## Review focus
- All 71 chapters are accounted for; future characters and later aliases are excluded.
- First mention, first direct appearance and name reveal may differ.
- Images survive reload, can be removed/replaced, and invalid or oversized input has a useful error.
- Storage upgrade replaces obsolete seed facts while keeping custom nodes and compatible user portraits; failed writes leave prior saved values intact.
- Wider map remains navigable on mobile, long titles stay visible, and portrait dimensions agree with connection geometry.

## Task 1: Source evidence and timeline content
- [x] Read all chapters in three non-overlapping ranges and save `docs/story/chapter-notes-*.json`.
- [x] Reconcile names and global first appearances; choose roughly 12–16 milestones with exact chapter lists.
- [x] Add content coverage, first-appearance and scope regression tests, then implement chapter-based data and expanded detail.
- [x] Verify source notes cover each chapter once and event references cover all chapters, with no references beyond 71.

## Task 2: Character portraits
- [x] Add validation and upload/persist/remove tests before implementation.
- [x] Add `portrait` field, bounded bitmap decoding/resizing, file picker with preview and removal, card thumbnails and detail images/placeholders.
- [x] Reject SVG/executable URL payloads and oversized files; keep the previous portrait if replacement fails.
- [x] Verify reload, edit, removal, invalid input and storage parsing with Vitest and Playwright.

## Task 3: Integrate, migrate and inspect
- [x] Update range and chapter labels, migrate existing graph safely, reconcile test fixtures with new milestones.
- [x] Run targeted unit/UI tests, typecheck and lint; visually inspect overview and character detail on desktop/mobile.
- [x] Review final diff and source claims, record outcomes here, and perform the required Next.js feedback-candidate pass.

## Decisions / progress
- Execution is already authorized by the user; proceed without another approval round.
- Readers own only their respective notes, while the main agent owns application changes.
- Source readers have confirmed that early previous approximations were wrong: AI appears in chapter 17, top authority in 24, apprenticeship in 65; Tần Tiểu Lâu/Tú Tú are outside the requested excerpt.

## Completed outcome
- Read 71/71 EPUB chapters in three disjoint ranges; retained original summaries and source caveats in docs/story. Parent reconciled all chapter summaries and character registries, and spot-checked EPUB identities/first references.
- Shipped 14 milestones: 8 cultivation and 6 reality, with 71 expandable chapter summaries and 65 character/entity profiles. Character nodes are optional on the canvas; first-introduction rosters and search remain available in the compact view.
- Replaced stage labels with chapter ranges; excluded later sư môn names and aliases. Titles wrap without ellipsis. Default framing is readable; overview fits the complete horizontal graph.
- Portrait picker accepts PNG/JPEG/WebP up to 8 MB, resizes to at most 512 pixels, saves locally, supports replacement/removal and retains previous images after invalid input.
- v5 migration replaces obsolete canonical facts, preserves custom nodes/relationships/edited link labels/portraits and retains v3/v4 backups. The targeted reviewer found one lost-custom-edge case; reproduced with a failing test, fixed and re-reviewed with no remaining important findings.
- Detail panels reset scroll on selecting another entry so portrait controls are immediately available.

## Verification
- Vitest: 29 story unit tests passed (6 files).
- Playwright: all 26 story UI tests passed; after the scroll fix, the 3 relevant chapter/portrait tests passed again.
- TypeScript: npm run typecheck passed.
- ESLint: components/story, lib/story, app/truyen and story tests passed without warnings.
- Visually inspected desktop readable framing/overview, mobile detail sheet, blank portrait slot and uploaded portrait screenshots.
- git diff --check passed. Existing unrelated edits and the source EPUB were preserved; no commit or publishing action was requested.
- Next.js feedback reporting pass: no qualifying Next.js crash, docs issue or framework defect found. Test fixture adjustments were ordinary application verification; no feedback submission required.
