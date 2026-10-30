# Story node editor

User requested add/edit/delete and drag/drop on the existing timeline. Implement in the existing board with no removed title/caption restored.

- [x] Add behavior tests for CRUD, persistence, deleting connected nodes, validation and dragging at 75%/125%; observe failure before implementation.
- [x] Introduce a validated versioned browser-local graph store. Persist committed edits and completed drags; report unavailable storage instead of claiming success.
- [x] Add an accessible native dialog for node title, category, eyebrow, summary and optional HTTP(S) source. New nodes may link to an existing node.
- [x] Add edit/delete to selected-node details; use an inline delete confirmation. Delete incident links and update the sidebar/count.
- [x] Separate node dragging from canvas panning; account for zoom, suppress click after dragging and support arrow keys on focused nodes. Fit must use current node bounds, including negative positions.
- [x] Verify old and new browser interactions, full unit suite and production build. Inspect responsive editor; obtain one independent review.

Implementation choices: browser-local persistence, no server or account changes. No new dependencies. Existing unrelated modifications preserved. Directly implement the requested extension on the current branch.

## Verification

- RED: new browser test timed out waiting for Add node; graph unit test failed before graph module existed.
- GREEN: 15 focused browser tests passed, including CRUD/reload, zoom-adjusted drag and edge movement, deletion cleanup, invalid inputs, failed storage, corrupt storage, empty graph/mobile creation, and text containment. Full unit suite: 32 files, 393 tests passed. Production build passed.
- Independent review found long editable titles overflowing fixed cards. Added a reproducing test, observed failure, then contained titles/eyebrows and wrapped detail text. Regression test and suites now pass.
- Fit retains the existing 25–200% zoom range; very large layouts can require panning at minimum zoom.
- Mobile editor visually inspected at 390×844 and in the user's current preview. No test data was saved into the user's browser.
- Next.js feedback pass: no qualifying framework issue observed during this change.
- No remote deployment, merge or commit performed. Existing unrelated changes preserved.
