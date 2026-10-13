# CZN Wiki

An offline CZN combatant wiki built with Next.js 16. The visual reference is the saved E7BOT snapshot under `docs/wiki.e7bot.top`; the app never requests its backend at runtime.

## Run

```powershell
npm install
npm run dev
```

Open `http://localhost:3000/combatant` to browse the 38 combatants, or `/combatant/1041` for Renoa's complete saved kit. Existing `/czn/combatant` links redirect to the new URL. The remaining 37 combatants have honest summary pages because their detail responses were not captured. The 49 supporter records are not part of this Combatant picker.

## Data and checks

```powershell
npm run import:wiki       # offline AES decode and local asset copy
npm run audit:assets      # validate copied asset signatures
npm run lint
npm run typecheck          # Next typegen, then TypeScript
npm run test:unit
npm run build
npm run test:e2e          # production build must exist; uses Chromium
```

The importer reads immutable saved responses and produces typed static JSON in `data/wiki` plus valid assets in `public/reference/e7bot`. The asset manifest records source provenance and unusable files. Regeneration is deterministic by content. The reference QA server can be run with `npm run reference:serve`; it is separate from the product and only serves the saved source on localhost.

Source/product screenshots, capture metadata, visual comparison, and test evidence are in [`docs/reference-baselines`](docs/reference-baselines). The full implementation scope and known limitations are in the [plan](docs/superpowers/plans/2026-10-13-czn-wiki-clone.md) and [implementation log](docs/reference-baselines/implementation-log.md).
