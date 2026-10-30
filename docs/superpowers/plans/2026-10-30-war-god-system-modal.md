# Chiến Thần system modal implementation plan

User clarified that the missing system is a separate modal, not the character profile page. Add a system icon to the common story header, retain the existing profile and reader state, and create a Vietnamese asset preparation file.

Implementation uses the current checkout, React, CSS Modules and a native dialog. No dependency, commit or worktree change. Existing unrelated edits belong to ongoing work.

## Task 1 System modal and chapter projection

- Add `lib/story/war-god-system.ts`: `getWarGodSystem(chapter: number)` derives available system modules and five material slots from verified chapters 3, 34, 69, 81, 82, 92, 95, 98–99. Clamp evidence to 100, preserve the actual reading chapter in the UI.
- Add `components/story/WarGodSystem.tsx` and `war-god-system.module.css`; native modal, focus containment, Escape, close button, backdrop dismissal, module detail selection. The modal must not bubble keyboard shortcuts into the map.
- Integrate one persistent trigger in `StoryShell.tsx`. Preserve current URL, reader iframe and scroll when opening and closing.
- First run unit tests for spoiler boundaries and material states and browser tests for opening from map/profile/reader, closing and mobile width. Observe failure, implement, rerun.
- Verify with scoped ESLint, TypeScript, unit suite and related Playwright specs; inspect desktop/mobile screenshots.

## Task 2 Asset brief

- Create `docs/story/danh-sach-anh-vat-dung.md`: existing equipment/manual/material entries, five ritual materials and system assets; source references, factual versus suggested visual details, filenames, dimensions and checkboxes. Document which assets are currently used or planned, without claiming automatic image import.
- Link from the story README and document the modal in `docs/story/chien-than-profile.md`.

## Review focus

Spoilers before unlock; acquired versus deposited materials; chapter >100; keyboard focus and background shortcuts; reader scroll preservation; mobile overflow. Native dialog must remain above the reader and header.

## Execution ledger

Pre-flight: modal consumes the pure projection and the common shell's already-resolved reading chapter. Asset filenames are a preparation convention, not an implemented image loader.

- Implemented native dialog and shared-header icon; user explicitly confirmed modal presentation. Preserved existing profile and all unrelated edits.
- Unit red: new projection module absent; green: all four boundary tests pass. Browser preflight initially blocked by local-server hostname mismatch and sandbox network denial; reused the existing 127.0.0.1 server with approved local-network access.
- Verification: 465 unit tests pass; 13 distinct related browser tests pass across two runs, including map/profile/reader, three dismissal paths, focus return, 320–1440 px width and unchanged reader scroll/iframe. Scoped ESLint and TypeScript pass. Desktop, empty mobile and populated mobile screenshots inspected.
- Asset brief complete: 134 lines and 13 verified local source links, with factual/guidance separation and preparation checkboxes.
- Independent read-only review found no actionable defect. Source evidence and screenshot verification were performed by the implementer.
- Next.js feedback reporting pass: no qualifying candidates. Server reuse and sandbox access were environment configuration issues, not verified Next.js defects.
