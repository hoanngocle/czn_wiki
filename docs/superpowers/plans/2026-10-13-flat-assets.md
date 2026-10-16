# Flat asset directories

**Goal:** Store application assets directly inside `public/assets/combatant`, `item`, `partner`, `card`, and `common`, preserving every existing asset and page reference.

**Approach:** Use one source-path mapper for both import scripts. Move existing files without changing their bytes; update generated data and UI references. Keep downloaded source snapshots in `docs` intact.

- [x] Add regression coverage for flat paths, importer output, and available asset integrity.
- [x] Map source assets to flat category directories, reject conflicting file names, and migrate existing files and references.
- [x] Update both import scripts so subsequent imports retain the new layout.
- [x] Verify file hashes/counts, unit tests, asset audit, typecheck, and browser image loading on existing pages.

Review focus: basename collisions, supporter portraits, nested item images, card videos, shared navigation icons, and pre-existing missing source assets. Preserve concurrent workspace changes.

Verification: 153 assets retained with matching SHA-256 values; all are served successfully with matching bytes. 24 unit tests and 13 browser tests for assets, combatants, cards, and shell pass. Typecheck and targeted ESLint pass. Both importers rerun successfully. Independent review found no material issues. Additional Deck Builder browser tests are blocked by the concurrently developed feature's missing `DeckBuilder.module.css`; all non-null catalog asset URLs resolve to existing files.
