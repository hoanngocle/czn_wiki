# Editable connections and simplified details

All requested changes: drag between node handles to connect; select link to rename/delete; wider details with icon edit/delete; remove instructional note, related wiki entries and reference sources from details; label timeline start as “Bắt đầu: Chương 1”. Existing browser-local data must survive.

- [x] Write failing browser tests for zoom-adjusted drag connection, cancel/blank/self/duplicate behavior, rename/delete/reload and details requirements.
- [x] Add stable pair identity and safe graph connection helper; retain v1 storage compatibility without resetting saved graphs.
- [x] Add visible handles, pointer preview and click/keyboard fallback; separate connecting from moving nodes and panning canvas.
- [x] Extract connection rendering and accessible link editor, with enlarged stroke hit areas and persistent rename/delete.
- [x] Simplify and enlarge node details, replace action text by labeled icons, update start label; retain existing node editing features.
- [x] Run browser regression suite, unit suite, production build, inspect preview and perform independent review.

Implementation choices: one directed connection per source-target pair; no self-links. Starting a new connection does not delete old ones. Sources are removed from the details display without deleting users' stored data. “Bắt đầu: Chương 1” is a timeline label, not an invented chapter summary.

Validation: 393 unit tests passed; 21 browser regression tests passed, followed by all 7 connection tests including the added vertical reverse-link case (22 distinct browser cases total). Production build passed. Independent review identified overlapping reverse connections; opposite curves and separated labels now pass horizontal and vertical selection regressions. Mobile preview visually inspected. No qualifying Next.js feedback candidates were found.
