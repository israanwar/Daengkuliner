# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

## Product direction: Daengkuliner

- Treat Daengkuliner as an editorial guide to Makassar food culture, never as a generic restaurant, delivery product, or agency page.
- Work on this repository individually. Do not batch-match it to other portfolio repositories.
- The selected visual direction is an interactive food atlas: dark food documentation beside an ivory editorial reading panel, forest-green navigation, saffron details, and a focused dish selector.
- Keep public copy careful: the portfolio prototype may describe dishes and ingredients, but must not invent live restaurants, opening hours, bookings, delivery, ratings, or operational recommendations.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.
