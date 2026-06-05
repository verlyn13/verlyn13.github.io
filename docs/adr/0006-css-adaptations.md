# ADR-0006: Adapting the workflow to a single-file vanilla-CSS site

- Status: Accepted · Date: 2026-06-05

## Context
The agentic-design-system workflow assumes a component app (a primitives/components/patterns/routes
import graph with type-checking). This site is vanilla HTML + one stylesheet (`assets/jeffrey.css`),
JS-minimal. Parts of the workflow have no direct target here.

## Decision
- **Adopt fully:** DTCG token tiers, Style Dictionary build, `DESIGN_SPEC.md`, the no-raw-values gate
  (§7.1), token-reference integrity (§7.3, free from SD), and the migration harness.
- **Reinterpret:** the five-layer model is documented in `layers.json`/`DESIGN_SPEC.md` as conceptual
  sections, not files.
- **Waive (no target):** the cross-file **layer-boundary import check (§7.2)** — there is one CSS file,
  no import graph. Its intent ("components never touch primitives") is instead enforced by Style
  Dictionary emitting **only** the semantic tier. The component-**extraction** phases (§5–6) are
  documentation, not code-motion.
- **Scope the no-raw-values gate to colors.** Structural `px` (1px borders, `999px` pills, media
  `768/640px`, `44px` targets) stay literal; spacing/radius are tokenized.

## Consequences
- The valuable, enforceable guarantees hold (no raw colors, fresh tokens, primitive isolation) without
  inventing a component framework the site doesn't need.
