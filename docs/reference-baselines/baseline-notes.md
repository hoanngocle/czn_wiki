# E7BOT source baseline

Captured from immutable `docs/wiki.e7bot.top` with Playwright Chromium 156, locale `en-US`, timezone `Asia/Saigon`, reduced motion, and explicit `themeMode` dark/light. The source uses a hash router, so QA opens `/#/czn/combatant` and `/#/czn/combatant/1041`. The product uses clean Next routes.

The saved `CznCard` and `style` bundles contain formatter damage: JavaScript `??` appears as `? ?`. `scripts/reference-server.mjs` repairs only the served JavaScript response; the snapshot files are untouched. The server also removes tracker tags from HTML, and the browser blocks external requests.

Viewport images: `e7bot-{desktop|tablet|mobile}-{dark|light}-{unselected|renoa-cards}.png`, with dimensions 1440×900, 1024×768, 390×844. Each state uses a fresh browser context. Source defaults to the Epic7 game group, so QA selects CZN through the source selector before capture. Animation, portrait-only, and April Fool preferences are set false. Renoa's Potential Awakening control defaults true and shows an added target card alongside four `start_cards` (five visible cards).

Known source missing resources: five dark navigation icons (`icon_tab_{combatant,partner,deck,spark,encounter}-dark-*.png`) return 404 and appear broken in source dark screenshots. The Renoa route also tries a Google ads script, blocked by QA. Light snapshots have the corresponding available icons. The clone should use deliberate local icon fallback, with this visual difference recorded.

Capture metadata, response URLs, and errors are in `baseline-capture.json`. Screenshots show actual source render after API mapping and response-only syntax repair; they are not screenshots of the new app.

Additional source states are `e7bot-{desktop|mobile}-dark-{card-modal|manifest-ego|potential}.png`, captured through the source controls and recorded in `baseline-state-capture.json`. `e7bot-mobile-dark-picker.png` duplicates the genuine mobile unselected state because the source displays the picker on that route. In the source mobile Manifest Ego/Potential screenshots, the content and active tab class change, but the visible tab highlight remains on Cards; the product highlights the selected content tab. Compare the paired images in `visual-review.md`.
