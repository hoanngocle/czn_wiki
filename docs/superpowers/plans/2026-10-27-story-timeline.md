# Story Timeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Add a Vietnamese story wiki with a plain-background, pannable and zoomable timeline mindmap.

**Architecture:** An independent App Router page supplies metadata and renders a client board. Typed story records are separate from rendering. CSS Modules isolate the board from the existing game wiki.

**Tech Stack:** Existing Next.js 16.4.3, React 19.3.0, TypeScript, CSS Modules, SVG, Playwright.

**Spec:** `docs/superpowers/specs/2026-10-27-story-timeline-design.md`

## Global Constraints

- Route: `/truyen/chu-gioi-tan-the-online`.
- Plain background, no dots or grid; zoom range 25–200%.
- Preserve existing home route and uncommitted edits.
- Read installed Next.js routing, client component, CSS and metadata documentation before implementation.
- Do not present unverified story events as facts.
- No additional dependencies, authentication, backend persistence or collaborative editor.

## Review Focus

- Zoom at either limit remains finite and keeps the viewport anchor stable.
- Pointer release outside the board stops dragging.
- Selecting a node does not accidentally drag the canvas.
- Narrow screens keep node details and zoom controls reachable.
- Fit-to-view works after viewport resize and detail-panel changes.

## Task 1: Story board page

**Files:**
- Create `app/truyen/chu-gioi-tan-the-online/page.tsx`: route and metadata.
- Create `components/story/StoryTimeline.tsx`: board, selection and controls.
- Create `components/story/story-timeline.module.css`: isolated responsive styling.
- Create `lib/story/timeline.ts`: typed nodes, links and verified or explicitly illustrative initial content.
- Create `tests/e2e/story-timeline.spec.ts`: user-visible interaction checks.

**Interfaces:**
- `StoryNode`: `id`, `title`, `kind` (`event`, `character`, `world`), `summary`, `x`, `y`, optional source link.
- `StoryLink`: source and target node IDs.
- `StoryTimeline`: renders initial nodes and links; viewport state stays client-side.

- [x] Add browser checks for the route, zoom bounds, detail selection, drag release, fit-to-view and narrow-screen controls; confirm they fail before the page exists.
- [x] Verify story references or clearly label illustrative content, then create the typed content file.
- [x] Implement the route, SVG connectors, node cards, pointer dragging, anchored zoom and fit-to-view.
- [x] Add detail-panel behavior and responsive, keyboard-accessible controls.
- [x] Run the focused browser checks and `npm run typecheck`; inspect desktop and narrow-screen rendering.
- [x] Review the diff and report exact validation results. Perform the required Next.js feedback pass if a qualifying issue occurred.

## Approval status

User approved implementation. Completed on codex/story-timeline; see 2026-10-27-story-timeline-progress.md for verification.
