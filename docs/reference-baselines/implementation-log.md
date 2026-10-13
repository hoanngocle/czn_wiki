# CZN Wiki implementation log

Plan: `docs/superpowers/plans/2026-10-13-czn-wiki-clone.md`

Spec: `docs/superpowers/specs/2026-10-13-czn-wiki-clone-design.md`

## Preflight

- Checkout is on `codex/czn-wiki-clone` after controller created the branch via approved Git metadata escalation. Base commit `f69bac9234cac2c97bd5c0c7414031f176cdca4e`.
- Preserving pre-existing untracked `yarn.lock`, `.codegraph/` and the controller's uncommitted plan. Source snapshots remain unchanged.
- Queried CodeGraph before reading application code; read local Next 16.4.0 guides for caching, dynamic params, not-found, loading, images, fonts and metadata.
- `npm install --save-dev vitest @playwright/test` failed with `ERESOLVE` because Vitest 5 requires Node type definitions 22+ while repo used `@types/node@^20`. Ruling: upgrade dev-only `@types/node` to 26, matching installed Node 26. Follow-up escalated npm install exited 0.

## Task 1

- AES source rule verified at `docs/wiki.e7bot.top/js/index-DKI40WV2.js` near line 16745: Base64 IV prefix 16 bytes, AES-256-CBC/PKCS7, 32-byte key. Importer is offline only.
- Source schema verified in decrypted payload: `data` is the list for `list.html`; Renoa's `start_cards`, `spark_cards`, `combatant_limit_breaks` and `potential_target_cards` live under `data.combatant`, while `potential_nodes` lives at `data` root.
- RED: `npm run test:unit -- tests/unit/import-e7bot.test.ts tests/unit/assets.test.ts` exited 1 because implementation modules were absent. GREEN: same command exited 0, 4/4 tests. Signature test rejects Prydwen `No Content` font and accepts source WebP.
- `npm run import:wiki` exited 0: 87 summaries, 38 combatants, 49 supporters, 108 inventoried assets (107 usable copied, one invalid vanguard icon). The six Renoa WebM assets are included. No asset is fetched from the Internet.
- RED: repository/filter command exited 1 due absent modules. GREEN: `npm run test:unit -- tests/unit/repository.test.ts tests/unit/filters.test.ts` exited 0, 3/3 tests. Nia (`1003`) has a summary and no detail; Renoa (`1041`) has detail.
- Reference server serves the unchanged snapshot on `127.0.0.1:4173`, maps the three captured API routes, blocks path traversal and keeps missing assets/API as 404. QA response only repairs bundle formatter damage `? ?` → `??`; source files remain untouched. Source router requires hash URLs. Server and browser share one process to avoid Windows loopback sandbox isolation.
- `node scripts/capture-reference.mjs` exited 0 and rendered 12 genuine source states: desktop/tablet/mobile × dark/light × unselected/Renoa. `node scripts/capture-reference-states.mjs` exited 0 and rendered desktop/mobile dark card-modal/Manifest Ego/Potential. `e7bot-mobile-dark-picker.png` is a copy of the genuine mobile unselected capture, where the source picker is visible. Missing dark nav icons and blocked ad/tracker requests are noted in `baseline-notes.md`.

## Tasks 2–4

- Wrote shell E2E on starter first (RED 2), then replaced starter page with CZN shell, source colors/system font, prepaint theme, persistent toggle, mobile focus handling, clear disabled navigation. Next starter Turbopack custom CSS loader rule prevented CSS Modules; removing that rule fixed the actual styles without changing Cache Components or Partial Prefetching.
- Picker keeps 38 combatants in shared layout state across route changes. Source order is NEW first, then rarity descending and source six-job order; unknown `vanguard` sorts last. Diff snapshot supplies NEW badge. EGO/job filters use source order. Invalid vanguard icon is detected from the generated manifest and replaced by a glyph. 49 supporters stay out of picker/routes; Nia and 36 other missing-detail combatants show truthful summary state. `proxy.ts` returns production HTTP 404 for unknown, zero-prefixed and supporter IDs before Next streams; both Next cache flags remain enabled.
- RED card/description tests preceded implementation. Renoa now renders 4 source start entries plus linked Dirge Bullet target when Potential Awakening is on, 4 unique entries, Ego skill, 2 collapse cards, 6 Manifest Ego levels and 10 Potential nodes. `_pot`/`_lbk` variants are applied only to the source groups and remain connected to base/modal family. Importer keeps card `talent`/`tooltips`; malformed rarity, cost, required nested arrays, duplicate cards and broken target links error out. Modal has focus trap/Escape/focus return/scroll cleanup. Card videos use local WebM, poster, viewport/animation/reduced-motion checks.
- Scoped independent review found and prompted fixes for keyword import, variant mapping, schema validation, mobile overlay focus, NEW/order, invalid icon and Potential level label. A follow-up review caught `Array.map(normalizeCard)` passing index as the nested flag; it is now explicit callback for every top-level group with a regression test on the second card.

## Task 5 verification (final runs)

- `npm run import:wiki` twice: both exit 0, 87 records/38 combatants/49 supporters/108 inventoried assets. SHA-256 hashes match across both runs for `characters.json`, `characters/1041.json`, `assets.json`, `source-manifest.json` and `combatant-ids.json` (`01731457…`, `176B47DE…`, `0344335E…`, `BBC2DCA9…`, `C304E503…` respectively). Source snapshots unchanged.
- `npm run audit:assets`: exit 0, 107 copied assets valid; invalid source vanguard icon remains excluded.
- `npm run lint`: exit 0, zero errors/warnings after test runner config renamed `.mts` and unused import removed.
- `npm run test:unit`: exit 0, 5 files/10 tests.
- `npm run typecheck`: exit 0, `next typegen` generated route types before `tsc --noEmit`.
- `npm run build`: exit 0, Next 16.4.0 compiled and generated 44 static/partial pages, both cache flags enabled.
- `npm run test:e2e`: final exit 0, 12/12 Chromium tests across shell, combatants, cards and QA. Scoped reruns also passed 3/3 combatants and 3/3 cards after the last regression additions. Coverage includes filtered Renoa→Olga→back/forward, modal families of two cards, source target 160%, video failure poster, reduced motion, system theme, focus traps, blocked storage, HTTP 404, scroll retention, local-only network and 390px overflow.
- `node scripts/capture-reference.mjs`: exit 0, 12 genuine source route/theme/viewport images. `node scripts/capture-reference-states.mjs`: exit 0, six genuine source extra-state images. `node scripts/capture-product.mjs`: exit 0, 18 product images (12 matrix + desktop/mobile modal/Ego/Potential), each `failures:0`; see `product-capture.json`.
- Compared paired screenshots in `visual-review.md`: desktop rail/picker/card scale, mobile picker/detail, modal, Manifest Ego and Potential. Product Potential tab highlights the selected content; source mobile state screenshot shows selected Potential content with Cards visually highlighted despite the active class changing. Final product captures reset scroll before these state screenshots. Remaining differences and intentional missing-icon fallback are recorded there.
- Final review fixes: source card `talent`/`tooltips` survive normalization and are visible as keyboard-accessible keyword details in modal; Potential maps base cards before appending the unmodified 160% Dirge Bullet target; modal family selection resets per card; importer rejects malformed second-card nesting; mobile nav/picker trap and restore focus; NEW badge/order/icons follow source; reduced-motion snapshot is read synchronously to avoid a first-render video autoplay flash.
- Plan Task 1–5 checkboxes are marked complete after this evidence. `npm run lint` was rerun after final E2E additions (exit 0); `git diff --check` exited 0. The Chromium-created root `debug.log` was inspected and removed. Pre-existing untracked `yarn.lock` and `.codegraph/` remain untouched.

## Rulings

- Ruling: copy all 107 valid snapshot assets into the local reference directory — fixed source set covers portraits, card layers and videos; cost is some unused local assets. Exclude the one invalid vanguard icon and render fallback. Missing dark source navigation icons are deliberately replaced with usable light icons.
- Ruling: source mobile picker is the unselected route; detail route keeps it hidden. Product exposes the picker from the top-right search control to preserve filter state across selection. Source modal displays variants as a card grid, implemented with a shared accessible Dialog.
- Environment: Windows sandbox required approved escalation for SWC build/typegen and Chromium loopback QA. No push, publish, external backend fetch or snapshot mutation was performed.

## Follow-up: remove the product URL prefix

- Moved the existing `app/czn` route tree to `app/(wiki)` after verifying both absolute paths were inside the workspace. Next route groups preserve the shell and picker layouts without adding a URL segment. Relative imports remain at the same depth.
- Product URLs are now `/combatant` and `/combatant/[combatantId]`; `/` redirects to `/combatant`. `next.config.ts` permanently redirects old `/czn/:path*` links to `/:path*`. Proxy validation now matches the unprefixed route and still returns real 404 for unknown/zero-prefixed/supporter IDs. Saved source hash URLs and `/reference/.../czn/data` assets were not changed.
- TDD red: updated shell test against the old build failed because `/combatant` had no navigation and `/czn/combatant/1041` returned 200 instead of 308. Green: `npm run lint` exit 0; `npm run typecheck` exit 0 after Next route typegen; `npm run build` exit 0 with `/combatant` and `/combatant/[combatantId]` among 44 generated pages; full `npm run test:e2e` exit 0, 13/13 Chromium tests. Root and legacy redirect tests assert exact pathname; picker test confirms new selected URL, filter persistence and back/forward, with true 404 checks on new routes.
- `node scripts/capture-product.mjs` exit 0 on new URLs: all 18 product screenshot states recorded `failures:0`. The source capture scripts continue using the original E7BOT hash routes. The controller's existing port 3101 preview process was left untouched.
