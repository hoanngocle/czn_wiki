# Separate CZN and Ebooks

Approved in chat: move the full CZN wiki beneath `/czn`, create a library at `/ebooks`, move the existing story and profile beneath `/ebooks/chu-gioi-tan-the-online`, and make `/` a two-destination entrance.

## Approach

Use real App Router segments in the existing Next.js application, keeping the independent CZN and story shells. Entry aliases alone would leave mixed URLs; separate applications would add deployment work without a user benefit here. The user selected full separation and authorized implementation.

## Behavior and constraints

- `/czn` opens the existing combatant catalog; all CZN sections and detail pages use `/czn/...`.
- `/ebooks` is a responsive library with the actual supplied cover, title, author, chapter count, title/author search, empty results, and links to read or explore the story.
- `/ebooks/chu-gioi-tan-the-online` retains the timeline, embedded reader and Chiến Thần profile.
- Old CZN and `/truyen` URLs redirect to their new equivalents, preserving query strings and fragments.
- Keep exported EPUB assets and existing storage keys stable so reading progress and saved edits survive.
- Reuse dependencies, local fonts and existing data. No invented books or newly claimed content.
- Preserve unrelated in-progress work in the current checkout.

## Implementation choices

Rename `(wiki)` to `czn` and `truyen` to `ebooks`; both keep the same import depth. Retain static chapter URLs as asset URLs. Use scoped CSS for the entrance and library, with a warm paper palette independent of the CZN theme.
