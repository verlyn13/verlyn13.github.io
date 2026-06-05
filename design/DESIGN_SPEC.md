---
system: jvjohnson.dev design system
token_source: tokens/*.tokens.json # DTCG 2025.10, authoritative
generated_css: assets/tokens.generated.css # Style Dictionary artifact — do not hand-edit
build: build-tokens.mjs # `npm run tokens`
layers: [tokens, base, components, patterns, pages] # see layers.json
themes: [light] # light-only today (docs/adr/0004-theming.md)
human_reference: docs/design-system.md
last_updated: 2026-06-05
---

# DESIGN_SPEC — jvjohnson.dev

High-signal, machine-readable orientation for agents (Claude Code to build; Claude Design to extract
a UI kit). **Tokens + code are authoritative; this file is derived from them.** Keep it small.

## Token tiers
- **primitive** — `tokens/primitive.tokens.json`: raw palette + scales. **Never referenced by components.**
- **semantic** — `tokens/semantic.tokens.json`: intent names; **what `assets/jeffrey.css` uses** via `var(--token)`.
- component tier: optional, not used (YAGNI).

Style Dictionary emits **only the semantic tier** to `assets/tokens.generated.css` (primitives stay
internal — the practical enforcement of "components never touch primitives").

## Semantic vocabulary (the only colors components may use)
`ink` `paper` `paper-deep` `paper-deeper` `muted` `heading` `heading-2` `accent` `accent-light`
`accent-subtle` `accent-dark` `accent-2` `warn` `ok` `on-accent` `surface` `surface-pill`
`surface-hover` `inset-warm` `inset-cool` `code-bg` `ring` `accent-tint` `rule-highlight`
`border-faint` `border-soft` `border-hairline` `ok-bg` `ok-tint` `green-bg` `amber-bg` `amber-ink`
`warn-tint` `ink-print`
Shape/space/type: `border` `shadow` `shadow-hard` `shadow-lift` `shadow-soft` `shadow-float`
`radius` `radius-sm` `space-1..5` `measure` `font` `mono` `lh`

## Voice / visual principles
Rigorous, practical, systems-minded, warm-but-not-squishy. Academic credibility over commercial
appeal. One accent (`--accent`), **reserved for the primary action and the flagship**.

## Components (layer 2) — name → tokens consumed
- **hero** (`.hero-title` claim, `.hero-home h1` kicker, `.hero-link[--primary]`, `.hero-now`) →
  `accent`, `accent-dark`, `accent-subtle`, `ink`, `muted`, `on-accent`, `surface-pill`, `surface-hover`, `ring`
- **approach card** (`.approach-card[--flagship]`, `.approach-flagship-tag`, `.aspect-tag`) →
  `surface`, `border`, `accent`, `accent-subtle`, `on-accent`, `inset-warm`, `inset-cool`, `shadow-lift`
- **cards** (`.card`, `.project-card`, `.bento-card`) → `surface`, `border`, `shadow`, `shadow-hard`, `shadow-lift`
- **status/badges** (`.project-status.*`, `.badge--*`, `.tech-tag`) → `ok-bg`, `green-bg`, `amber-bg`, `amber-ink`, `inset-cool`, `accent`, `on-accent`
- **callouts** (`.callout[.ok/.warn]`) → `accent-tint`, `ok-tint`, `warn-tint`, `accent`, `ok`, `warn`
- **nav / footer** (`.site-footer` → `.footer-cta` email line + `.footer-links` back-nav + colophon) →
  `paper`, `inset-warm`, `border`, `border-faint`, `muted`, `accent`, `ink`, `shadow-soft`

## Hard rules
- Components reference **semantic** tokens only — never primitives, never raw color literals.
- Edit `tokens/*.tokens.json` + `npm run tokens`; **never** hand-edit `assets/tokens.generated.css`.
- One stylesheet (`assets/jeffrey.css`); Vite bundles tokens + rules into one deployed file.
- Reserve `--accent` for the primary action + flagship. AA contrast on changed text/controls.
- Gates (CI + pre-commit): `npm run conformance` (no raw colors) · `npm run tokens:check` (fresh).
- Token / palette / scale / pattern changes are **ask-first**.
