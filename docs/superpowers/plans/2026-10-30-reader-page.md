# Separate reader page implementation plan

**Goal:** Move `#doc-truyen` to `/ebooks/chu-gioi-tan-the-online/doc-truyen`.
**Architecture:** Extract the iframe and theme synchronization from StoryTimeline into StoryReader. Reuse StoryShell with an explicit reader view. Keep exported chapter files and their progress storage unchanged.
**Tech stack:** Next.js App Router, React, existing static EPUB reader, Playwright.
**Spec:** User request in this chat: turn `#doc-truyen` into a separate page.

- [x] Add failing coverage for direct reader access, resume/reload, browser history, legacy hash navigation, and chapter selection.
- [x] Add the reader page and component; remove reader mounting from the timeline; update sidebar, mobile, library, and header navigation.
- [x] Preserve legacy hashes with client replacement. Consume an optional `chuong` query when opening a specific chapter; resume normal progress after the chapter loads.
- [x] Run affected reader, shell, library and system checks, lint and TypeScript; review narrow screens and storage-unavailable fallback.

Constraints: preserve recent styling and unrelated workspace changes; keep navigation as real links; do not load timeline graph in the reader page. No deployment or git integration requested.

Validation: production build and ESLint passed. The affected end-to-end run passed 30 cases; the remaining repeated-query test was corrected to await completed timeline navigation, then passed on rerun. Five reader-route regression cases cover resume/reload, legacy hashes, unavailable storage, invalid input, selecting the initial chapter again, and cached-route history.

Review: independent review confirmed stale initial chapter on retained-route reactivation. Fixed by honoring a chapter query only while present and navigating the actual iframe for chapter selection. Review of the fix found no further actionable issues.

Ruling: Next retains prior routes as hidden Activity trees. After navigation, checks distinguish visible pages; direct reader entry still asserts no timeline graph is mounted. Preserve existing unrelated changes and leave work uncommitted.
