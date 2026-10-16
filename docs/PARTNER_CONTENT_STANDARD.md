# Partner content standard

This standard applies to every partner page and future partner imports. The verified baseline on 2026-10-16 contains **49 canonical partner IDs**, 49 complete English records, and 49 Vietnamese overlays. A partner record includes its profile, available information fields, Ego card, all five passive levels, and level/breakthrough statistics.

## Sources and identity

- Use the E7BOT supporter roster and complete partner snapshots under `docs/partner/current/api/czn/characters/` for canonical IDs, names, rarity, class, mechanics, and statistics. Import only `CHAR_SUPPORTER` entries.
- Complete snapshots take precedence over older browser captures under `docs/partner/extracted/`, which can contain only the levels selected during capture. A snapshot ID must match its roster entry and filename.
- Use Prydwen as an attributed supplementary source for observed full illustrations. Its spellings and aliases do not replace canonical identity; for example, its `lilian` and `westmaccot` media slugs map to Lillian and Westmacott.
- The three Prydwen entries marked **Coming Soon** are not canonical partners in this baseline. Do not add placeholder IDs, invented cards, passives, stats, or roster entries for them. Add a new partner only after a source provides an identifiable record with verified content.
- Keep source facts separate from editorial advice. Do not infer or fabricate rankings, best builds, recommended teams, or gameplay effects. Any future advice needs a cited source or an explicitly identified analysis with supporting evidence.

## Canonical data and Vietnamese overlays

`data/wiki/partners.json` is the generated canonical catalog. Vietnamese content lives separately in `data/wiki/partners/vi/<id>.json`, is registered in `lib/wiki/partner-translations.ts`, and is exposed through `lib/wiki/partners.ts`. Apply it through `lib/wiki/partner-localization.ts`; never mutate the canonical object while switching language.

Each overlay has exactly these fields:

```ts
{
  profile: string;
  infoValues: string[];
  cardDescription: string;
  terms: Record<string, { title: string; desc: string }>;
  passives: Record<string, { name: string; descriptions: string[] }>;
}
```

Keep `infoValues` in the exact order of the canonical `info` array. Translate races, specialties, and birthdays where applicable; preserve voice actor names and proper names. Include every card tooltip and talent ID in `terms`, and passive levels `"1"` through `"5"` with the same number of description paragraphs as the source.

Partner names, card names, and named card references stay **English** in both languages. Translate interface labels, card explanations, tooltip explanations, passive names and explanations, and profile text. Preserve IDs, cost, rarity, category, art references, stats, and other canonical metadata. If an overlay is missing, retain the canonical English content.

Use `data/wiki/translations/vi/terminology.json` and the existing combatant glossaries as the terminology reference. For partners, use “Nhân vật được ghép cặp” consistently for the assigned Combatant. Existing conventions include Điểm hành động, Đòn đánh thêm, Suy yếu, Lá chắn, Kiệt sức, Sĩ khí, and Kích hoạt qua hiệu ứng. Keep newly translated status names consistent across every occurrence.

Preserve all numerical values, signs, thresholds, duration, targeting, triggers, stack limits, and timing. Preserve formatting tags and paragraph boundaries. Numeric-token and formatting-tag comparisons are necessary checks, but also review the meaning manually: moving the same numbers into the wrong condition can pass a token comparison. Do not “repair” an unusual source mechanic by guessing. Record source discrepancies and resolve them from evidence.

Source references such as `$Effect#1$` are display markup, not a numeric gameplay bonus. The importer removes their wrapper and rank suffix, including suffixes after punctuation such as `Repairs Complete!#1`. Overlays must match the resulting displayed canonical text and must not retain those suffixes.

## Media and unavailable assets

`data/wiki/partners/media.json` records supplementary media by canonical ID, including local artwork paths, source URLs, and the date checked. The baseline contains:

| Asset | Available | Explicitly unavailable |
| --- | ---: | ---: |
| Roster portraits | 49 | 0 |
| Ego card artwork | 49 | 0 |
| Full partner illustrations | 37 | 12 |
| Dedicated passive icons | 0 | 49 |

Available images must be valid local files under `public/assets/`; the UI must not depend on a remote hotlink. Keep unavailable optional media as `null` in the manifest and show the localized unavailable state. Do not use a cropped portrait, unrelated icon, or fabricated picture as a claimed full illustration or passive icon.

The raw snapshot's `char_partner.tactic_passive_icon` is only an asset identifier. It does not prove that its derived URL is available. The inspected partner renderer does not render a passive icon, and the checked URLs returned no usable icons. Likewise, Westmacott's animated reference `face/portrait/30044` is not evidence of a static full illustration. Preserve these limitations until a usable source asset is verified.

When source availability changes, update the manifest, local assets, this dated inventory, and the matching tests together. Keep the source URL and check date even when an asset remains unavailable. A failed request or malformed image must never be saved as an image file.

## Refresh workflow

Run commands from the repository root. First refresh the complete local roster and partner snapshots under `docs/partner/current/` from the verified source. Do not overwrite those snapshots with partial browser selections. The importer defaults to this current directory; the explicit command below is equivalent.

```powershell
npm run import:partners -- docs/partner/current data/wiki public
node scripts/sync-partner-media.mjs
```

The media synchronization requires network access, uses observed source media names and explicit aliases, verifies image bytes, and records a `null` result for unavailable optional assets. Before adding new media names, observe the source URL rather than guessing a list of filenames. Review the generated catalog and manifest diffs, then add or update the corresponding Vietnamese overlays and registry entries. Do not hand-edit generated gameplay values as a substitute for correcting an import or refreshing its source.

Run the focused checks after the catalog, overlays, and media agree:

```powershell
npm run test:unit -- tests/unit/partners.test.ts tests/unit/partners-import.test.ts tests/unit/partner-localization.test.ts
npm run typecheck
npm run lint
npm run build
npm run test:e2e -- tests/e2e/partners.spec.ts
```

The default Playwright configuration starts the production build on port 3100. For an existing development server, set `$env:PLAYWRIGHT_DEV_SERVER = "1"` before the E2E command; that configuration uses port 3000 instead. Do not run competing builds or servers in the same checkout.

The focused tests must cover complete roster/overlay registration, all five passive levels, source numeric and formatting parity, canonical English names and metadata, local media existence, and explicit unavailable assets. Browser checks must exercise language switching, filters, navigation, card tooltips, passive levels, level/breakthrough stats, full-art availability, and mobile/tablet layout. Review any source or translation limitation before claiming full coverage.
