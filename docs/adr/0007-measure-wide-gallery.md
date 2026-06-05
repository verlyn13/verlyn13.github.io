# ADR-0007: A wide gallery container (`--measure-wide`) for the Approach grid

- Status: Accepted · Date: 2026-06-05

## Context
`--measure` (`72ch`) caps `<main>` on every page (`main { max-width: var(--measure) }`). The home
`.approach-grid` (`repeat(auto-fit, minmax(320px, 1fr))`) therefore renders as a single column at all
realistic widths — the seven near-equal Approach cards become a long vertical scroll that wastes
desktop horizontal space (design-critique 2026-06-05, "biggest lever"). A card gallery wants more
width than prose. Per `AGENTS.md`, breaking the `72ch` measure and adding a width token are ask-first
and require an ADR.

## Decision
- Add a semantic token **`--measure-wide` (`1080px`)** in `tokens/semantic.tokens.json`; regenerate via
  `npm run tokens` (never hand-edit `assets/tokens.generated.css`).
- On the **home page only**, allow `<main class="home">` to expand to `--measure-wide`. Every section
  keeps its own centered `.container` at `--measure`, so Hero / Background / Technical Foundation are
  visually unchanged (72ch, centered). This reuses the existing pattern by which `.experience-content`
  overrides the element-level `main { max-width }` with a class on `<main>`.
- The Approach section opts into the wide measure via `.container--wide`; its `.section-intro` prose
  stays capped at `--measure` for readability. `.approach-grid` becomes **2-up at ≥769px** (single
  column below 769px), with the **flagship card spanning both columns** as a full-width banner.
- `--accent` remains reserved for the primary action and the flagship (unchanged).

## Consequences
- The Approach gallery uses available desktop width; all other pages and the other home sections are
  untouched — the global `main { max-width: var(--measure) }` still governs them; only `.home`
  overrides it.
- `--measure-wide` enters the token vocabulary (recorded in `design/DESIGN_SPEC.md` and
  `docs/design-system.md`).
- Switching the grid from `minmax(320px, 1fr)` to `1fr` / `repeat(2, 1fr)` also resolves the
  pre-existing `.approach-grid` overflow below ~410px noted in the design-system drift-watch.
- No change to theming (single light theme), the single deployed stylesheet, or dependencies.
