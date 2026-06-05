# ADR-0002: Style Dictionary v5 as the token build

- Status: Accepted · Date: 2026-06-05

## Context
DTCG sources must compile to the CSS custom properties the site consumes. The repo runs Node 24
(meets SD v5's Node 22+) and builds with Vite.

## Decision
Use **Style Dictionary v5** via an ESM build script (`build-tokens.mjs`, `npm run tokens`) that:
- registers a **name-only** transform (no value/color transforms) so values pass through verbatim;
- **filters to the semantic tier**, so primitives are never emitted to CSS (the practical enforcement
  of "components never reference primitives");
- writes `assets/tokens.generated.css` with a deterministic (timestamp-free) header.

The generated file is a **committed build artifact**, never hand-edited. `jeffrey.css` `@import`s it;
Vite bundles everything into one deployed stylesheet. Freshness is enforced by `npm run tokens:check`.

## Consequences
- A new devDependency + a `prebuild` step; offset by mechanical tier discipline and SD's
  reference-integrity check (build fails on an unresolved `{ref}`).
- v4 has DTCG support as a fallback if a v5 feature regresses.
