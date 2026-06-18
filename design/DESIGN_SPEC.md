---
system: jvjohnson.dev design system
token_source: tokens/*.tokens.json # DTCG 2025.10, authoritative
generated_css: assets/tokens.generated.css # Style Dictionary artifact — do not hand-edit
build: build-tokens.mjs # `npm run tokens`
layers: [tokens, base, components, patterns, pages] # see layers.json
themes: [light] # light-only today (docs/adr/0004-theming.md)
human_reference: docs/design-system.md
last_updated: 2026-06-17
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
`radius` `radius-sm` `space-1..5` `measure` `measure-wide` `font` `mono` `lh`

## Voice / visual principles
Rigorous, practical, systems-minded, warm-but-not-squishy. Academic credibility over commercial
appeal. One accent (`--accent`), **reserved for the primary action and the flagship**.

## Components (layer 2) — name → tokens consumed
- **hero** (`.hero-title` claim, `.hero-home h1` kicker, `.hero-selected` work rail, `.hero-link[--primary]`, `.hero-now`) →
  `accent`, `accent-dark`, `accent-subtle`, `ink`, `muted`, `on-accent`, `surface-pill`, `surface-hover`, `ring`
- **approach card** (`.approach-card[--flagship]`, `.approach-flagship-tag`, `.aspect-tag`; 2-up in a
  `.container--wide` gallery at ≥769px, flagship full-width — ADR-0007) →
  `surface`, `border`, `accent`, `accent-subtle`, `on-accent`, `inset-warm`, `inset-cool`, `shadow-lift`
- **cards** (`.card`, `.project-card`, `.bento-card`) → `surface`, `border`, `shadow`, `shadow-hard`, `shadow-lift`
- **status/badges** (`.project-status.*`, `.badge--*`, `.tech-tag`) → `ok-bg`, `green-bg`, `amber-bg`, `amber-ink`, `inset-cool`, `accent`, `on-accent`
- **callouts** (`.callout[.ok/.warn]`) → `accent-tint`, `ok-tint`, `warn-tint`, `accent`, `ok`, `warn`
- **nav / footer** (`.site-footer` → `.footer-cta` email line + `.footer-links` back-nav + colophon) →
  `paper`, `inset-warm`, `border`, `border-faint`, `muted`, `accent`, `ink`, `shadow-soft`
- **project conversion footer** (`.project-links-footer` + `.project-cta-actions`: one filled
  `.primary-link` "Email me about this" + secondary `.section-link`s) → `accent`, `on-accent`, `ink`, `muted`, `border`
- **publishing pipeline** (`.pipeline` → `.pipeline-lane` / `.pipeline-lane__label` / `.pipeline-track` /
  `.pipeline-step[--gate|--live]`; the colophon's 3-lane swimlane, human-merge step in `--accent`, live
  endpoint in `--accent-2`/`--green-bg` with `--ink` text) →
  `surface`, `border`, `border-faint`, `muted`, `accent`, `accent-subtle`, `accent-dark`, `accent-2`, `green-bg`, `ink`
- **evidence blocks** (`.evidence-grid` + `.evidence-card` `__label`/`__value`/`__note`; `.guarantee-list`
  checklist) → `surface`, `border`, `shadow-hard`, `muted`, `ink`, `ok`
- **portfolio overview** (S1: `.portfolio-overview` `__lead`/`__metric`/`__methods`/`__methods-label`; the
  body-of-work band — a definitional sentence, not a stats hero) → `ink`, `muted`, `border`
- **body-of-work index** (S2: `.dswork` `__group`/`__group-title`/`__count`, `.ds-list`, and the reusable
  `.ds-row` `__head`/`__title`[`--static`]/`__thesis`/`__live`/`__meta`/`__facet`[`--tech`]; one
  `.ds-row--flagship` + `.ds-row__flagship-tag`) →
  `accent`, `accent-subtle`, `on-accent`, `ink`, `muted`, `surface`, `border`, `border-faint`, `radius-sm`, `mono`
- **per-project design structure** (S3: `.project-design-structure`; `.decision-list`/`.decision`
  `__title`/`__summary`/`__source`; `.activity-rail` `__plot`/`__axis`/`__legend`/`__swatch` with
  `.activity-bar`[`--l1..l5`|`--release`]; `.project-provenance`; reuses `.evidence-grid`) →
  `ink`, `muted`, `border-hairline`, `accent-light`, `accent-2`, `mono`

Pages: `colophon.html` (publishing-system) and the feed-driven **body of work** at `/projects/`
(`projects/index.html`, a build artifact) are the project-intelligence surfaces; the S3 panel is spliced
into `projects/*.html` at build time (ADR-0008, ADR-0009, `docs/project-intelligence.md`).

## Hard rules
- Components reference **semantic** tokens only — never primitives, never raw color literals.
- Edit `tokens/*.tokens.json` + `npm run tokens`; **never** hand-edit `assets/tokens.generated.css`.
- One stylesheet (`assets/jeffrey.css`); Vite bundles tokens + rules into one deployed file.
- Reserve `--accent` for the primary action + flagship. AA contrast on changed text/controls.
- Gates (CI + pre-commit): `npm run conformance` (no raw colors) · `npm run tokens:check` (fresh).
- Token / palette / scale / pattern changes are **ask-first**.
