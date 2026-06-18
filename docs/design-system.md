---
title: jvjohnson.dev Design System
category: design
component: design-layer
status: active
version: 2.5.0
last_updated: 2026-06-17
tags: [design-system, css, design-tokens, components, accessibility, jeffrey-css]
priority: high
---

# Design System — jvjohnson.dev

The human reference for the site's design layer (rationale, component catalog, accessibility). The
**machine-readable** companion is `design/DESIGN_SPEC.md`; **`assets/jeffrey.css` is the
implementation**. When docs and CSS disagree, treat it as a bug and reconcile.

- **Tokens are code (v2.0).** Authored in `tokens/*.tokens.json` (DTCG 2025.10) → compiled by Style
  Dictionary (`npm run tokens`) to `assets/tokens.generated.css`, which `jeffrey.css` `@import`s.
  Never hand-edit the generated file; never add raw colors — the `no-raw-values` and `tokens-fresh`
  gates enforce both (in `mise run ci`, pre-commit, and the deploy quality job).
- **Where things defer.** `AGENTS.md` and `.cursor/rules/css.mdc` point here and to `design/DESIGN_SPEC.md`.
- **Change control:** edits to tokens, palette, type scale, spacing scale, or a named pattern are
  **ask-first**. Edit the `.tokens.json` sources (not the generated CSS); bump `version` here.

---

## 1. Philosophy

> "Rigorous, practical, systems-minded, warm-but-not-squishy — always aiming for *make it solid*."
> Clear constraints beat clever hacks.

Academic credibility over commercial appeal. Clean, fast, and respectful of the visitor's time.
The visual system exists to make the *work* legible and the *next action* obvious — never to decorate.

---

## 2. Design tokens

All tokens are CSS custom properties declared in `:root` in `assets/jeffrey.css`. **Use tokens; never
hardcode** (spacing especially — no arbitrary px). Colors are authored in modern space-separated
`hsl()`.

### 2.1 Color

| Token | Value | Role |
|---|---|---|
| `--ink` | `hsl(220 18% 18%)` | Primary text |
| `--paper` | `hsl(45 25% 97%)` | Page background (warm white); `body` is a gradient `--paper → hsl(45 25% 95%)` |
| `--muted` | `hsl(220 12% 45%)` | Secondary/subdued text, hero kicker, meta, captions |
| `--accent` | `hsl(212 85% 45%)` | **Primary blue** — links, emphasis, the one primary CTA, the flagship. **Reserved** (see §5). |
| `--accent-light` | `hsl(212 85% 90%)` | Light accent background (e.g., `status.development`) |
| `--accent-subtle` | `hsl(212 85% 96%)` | Subtle accent tint — flagship card bg, "Now" band, soft hover |
| `--accent-dark` | `hsl(212 85% 35%)` | Accent emphasis/hover — primary-CTA hover, "Now" label |
| `--accent-2` | `hsl(160 55% 35%)` | Secondary green — "ship it" / production accents |
| `--warn` | `hsl(22 90% 52%)` | Practical caution (orange) |
| `--ok` | `hsl(140 55% 35%)` | Success (green) |

White on `--accent` is the standard inverted pairing (≈5.1:1, AA-pass). See §7.

### 2.2 Spacing (rem scale — never arbitrary px)

| Token | Value |
|---|---|
| `--space-1` | `0.35rem` |
| `--space-2` | `0.6rem` |
| `--space-3` | `0.95rem` |
| `--space-4` | `1.4rem` |
| `--space-5` | `2rem` |

### 2.3 Typography

| Token | Value |
|---|---|
| `--font` | `ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif` |
| `--mono` | `ui-monospace, SFMono-Regular, Menlo, Consolas, "Liberation Mono", monospace` |
| `--lh` | `1.55` (base line-height) |

Base: `html { font-size: 16px }`; `body` letter-spacing `0.01em`. **No web fonts, ever** — system
stacks only.

### 2.4 Layout

| Token | Value |
|---|---|
| `--measure` | `72ch` — max-width of `main` and `.container` |
| `--measure-wide` | `1080px` — wide gallery container for the Approach 2-up grid (home `<main class="home">` + `.container--wide`); see `docs/adr/0007-measure-wide-gallery.md` |

Mobile breakpoint: **768px** (`@media (max-width: 768px)`); full nav at `≥769px`. The Experience page
adds a `640px` breakpoint for its braid/bento.

### 2.5 Elevation & shape

| Token | Value |
|---|---|
| `--radius` | `14px` |
| `--radius-sm` | `10px` |
| `--border` | `1px solid hsl(220 18% 88%)` |
| `--shadow` | `0 10px 30px hsl(220 25% 15% / 0.1)` |
| `--shadow-hard` | `0 1px 0 hsl(220 25% 15% / 0.15)` |

---

## 3. Type scale

| Element / class | Size | Weight | Notes |
|---|---|---|---|
| `h1` | `clamp(1.8rem, 2.2vw + 1rem, 2.6rem)` | 600 | letter-spacing `-0.02em`, line-height 1.15 |
| `h2` | `clamp(1.35rem, 1.3vw + 1rem, 1.9rem)` | 600 | `border-bottom: var(--border)` — section divider |
| `h3` | `1.15rem` | 600 | color `hsl(220 18% 26%)` |
| `h4` | `1.05rem` | 600 | color `hsl(220 18% 30%)` |
| `.hero-title` (the **claim**) | `clamp(1.5rem, 1.5vw + 1rem, 1.75rem)` | 700 | color `--ink` — the hero's visual lead |
| `.hero-home h1` (the **name/kicker**) | `1rem` | 600 | color `--muted`, letter-spacing `0.02em` |

**Heading semantics:** every page has exactly one `<h1>`; hierarchy is continuous (never skip levels).
On the home hero the `<h1>` (the name) is *styled down* to a kicker while the positioning claim (a
`<p class="hero-title">`) carries the visual weight — a deliberate visual/semantic split, not a
hierarchy violation (see §5.1).

---

## 4. Component catalog

Each entry lists the classes and the intent. Properties live in `assets/jeffrey.css`.

### 4.1 Navigation — `.site-nav`
Sticky top bar; `.nav-left` brand, `.nav-links` list. Collapses to a hamburger (`.nav-toggle`,
`.nav-toggle__bar`, `.nav-links--open`) at `≤768px` (toggled by `assets/menu.js`). `.back-nav` is the
secondary "← back" bar on subpages.

### 4.2 Hero (home) — `.hero-home`
- `.hero-home h1` — name, styled as a kicker (small, `--muted`).
- `.hero-title` — the **positioning claim**, the visual lead (large, bold, `--ink`).
- `.hero-bio` (+ `.location`) — one condensed positioning line, `68ch` max.
- `.hero-selected` (+ `.hero-selected__label`) — the "Selected work" rail (flagship + 2 key project
  links) that surfaces proof above the fold.
- `.hero-links` — the CTA pill row (see §4.3); on mobile the primary Email pill is ordered first.
- `.hero-now` + `.hero-now__label` — the measured "Now" band (see §5.5).

### 4.3 Buttons, links & pills
| Class | Role |
|---|---|
| Base `a` | `--accent` text, subtle underline that strengthens on hover; `:focus-visible` ring |
| `.hero-link` | Secondary pill — outline on translucent white, `min-height: 44px` |
| `.hero-link--primary` | **Primary CTA** — filled `--accent`, white label, `--accent-dark` on hover |
| `.primary-link` | Filled `--accent` CTA used on project-detail footers (same inverted pairing) |
| `.button` | Generic pill button |
| `.section-link`, `.section-link-btn` | Pill nav between sections/pages |
| `.background-link`, `.case-study-link`, `.project-link` | Inline `--accent` text links with `→` |

Rule: **exactly one primary (filled) action per view**; everything else is a secondary outline pill
(see §5.2).

### 4.4 Cards
- **Shared base** (`.card, .project-card, .position-card, .publication, .tech-project-card,
  .service-card`) — translucent white surface, `--border`, `--radius`, `--shadow` + `--shadow-hard`,
  `--space-4` padding; lifts on hover.
- **Approach grid** — `.approach-grid` is single-column on mobile and **2-up at ≥769px** inside a wider
  `.container--wide` (`--measure-wide`), with the flagship spanning both columns as a full-width banner
  (ADR-0007). Inner anatomy: `.approach-header` (`h3` + `.approach-tag`), `.approach-thesis`,
  `.approach-aspects` (`.aspect-tag` chips), `.approach-case-study` (`.case-study-label` +
  `.case-study-link`).
- **Flagship** — `.approach-card--flagship`: `--accent` border (3px top), `--accent-subtle` tint, and
  a filled `.approach-flagship-tag` ("Flagship"). Exactly one per grid (see §5.3).
- **Bento** (`.bento-grid`, `.bento-card`) — Experience-page layout.

### 4.5 Tags & badges
| Class | Use |
|---|---|
| `.approach-tag` | Muted descriptor chip in an approach card header |
| `.approach-flagship-tag` | Filled `--accent` "Flagship" marker |
| `.aspect-tag` | Mono inset chip (sub-capabilities) |
| `.tech-tag`, `.tech-badge`, `.status-badge` | Mono/neutral tech & status chips |
| `.project-status` (`.live` / `.development` / `.mvp` / `.production`) | Status pills (green/blue/amber/green-2) |
| `.badge--*` (`production` / `live` / `development` / `tenured`) | Solid status badges (Experience) |

### 4.6 Callouts — `.callout` (+ `.ok`, `.warn`)
Left-accent panel with tinted background. `.service-card` shares the treatment. The "Now" band reuses
this idiom (left `--accent` border + `--accent-subtle`).

### 4.7 Sections
`.background-teaser` (+ `.background-summary`, `.background-links`), `.approach-section`,
`.technical-foundation` (+ `.foundation-grid`, `.foundation-area`). Each non-hero section opens with a
`border-top: var(--border)` for rhythm.

### 4.8 Footer — `.site-footer`
Centered and muted, with one consistent structure on every page: `.footer-cta` (the email conversion
line — `--ink`, the only prominent element) → `.footer-links` (footer nav: `← Back to portfolio` + a
sibling link on every non-home page; the home footer omits the back-nav since it *is* the portfolio) →
a muted colophon `<p>` (`© <year> Jeffrey Johnson · Homer, Alaska · Colophon`, the last word linking to
the publishing-system page `colophon.html` — present site-wide, omitted only on `colophon.html` itself).
The email inside `.footer-cta`
stays a plain `--accent` text link — never a filled button — so each page keeps exactly one filled
primary action (§5.2). `.footer-links` is tokenized and in use on every subpage — keep it.

### 4.9 Accessibility primitives
`.skip-link`, `.sr-only`, the global `:focus-visible` ring, the `prefers-reduced-motion` block, and the
`@media print` block. See §7.

### 4.10 Publishing pipeline & evidence (colophon) — `.pipeline`, `.evidence-grid`
The `colophon.html` page ("how this portfolio is published") adds two token-only components:
- **`.pipeline`** — a three-lane swimlane (`.pipeline-lane` + `.pipeline-lane__label` +
  `.pipeline-track` of `.pipeline-step`s): source of truth → automation → public site. Steps connect
  with a CSS `::before` arrow; lanes stack and steps wrap on mobile. The single **`.pipeline-step--gate`**
  (human merge) is the page's one `--accent` use — the governance pivot; **`.pipeline-step--live`** marks
  the live endpoint with an `--accent-2` border + `--green-bg` tint and `--ink` text (AA, see §9).
- **`.evidence-grid`** / **`.evidence-card`** (`__label` / `__value` / `__note`) — compact factual cards
  about the feed (2-up ≥600px, 1-up below). **`.guarantee-list`** is a checklist variant (✓ in `--ok`).

The page is descriptive, not feed-coupled: it links the live `/data/projects.json` rather than mirroring
volatile values (counts, SHAs, `asOf` dates). See `docs/adr/0008-colophon-publishing-system.md`.

### 4.11 Project-intelligence surfaces (S1–S3) — `.portfolio-overview`, `.ds-row`, `.project-design-structure`
The feed-driven **body of work** (`/projects/`, rendered at build time from `public/data/projects.json`
via `build-feed.mjs`) plus a per-project panel. Token-only; the design proposal + measured AA table are
`docs/project-intelligence-design-spec-2026-06-16.md`, the system `docs/project-intelligence.md`.
- **S1 — `.portfolio-overview`** (`__lead` / `__metric` / `__methods` / `__methods-label`): a definitional
  band ("N projects across M domains in K languages …") — counts as data (`--ink`, tabular figures), not a
  stats hero. The "built continuously since `<year>`" clause and the methods line render only when the feed
  provides `portfolio.firstActive` / `recurringMethods` (absent-tolerant).
- **S2 — the body-of-work index** (`.dswork` / `.dswork__group` / `.ds-list` + the reusable **`.ds-row`**):
  one project = one entry. `.ds-row__title` is the `--accent` link to the detail page (`--static` → `--ink`
  when no page exists); `.ds-row__thesis` (`--ink`); `.ds-row__meta` of `.ds-row__facet` chips
  (`domain · tech · status · year`, `--muted`; `--tech` in `--mono`). Grouped by kind, reverse-chron, a
  curated front tier above; the single `.ds-row--flagship` carries the reserved accent (left band +
  `--accent-subtle` + filled `.ds-row__flagship-tag`), per §5.3. No card grid, no filter UI (§5.7).
- **S3 — `.project-design-structure`** (spliced into `projects/*.html` at a `<!-- @design-structure -->`
  marker by a Vite `transformIndexHtml` plugin; absent-tolerant): a **scope strip** (reuses
  `.evidence-grid`), a **`.decision-list`** (`.decision` `__title`/`__summary`/`__source` — a hairline
  list, NOT accent; source labels in `--mono`), and a zero-JS **`.activity-rail`** (a magnitude column plot
  — `.activity-bar` bucketed into `--l1..l5` height classes to avoid inline styles; `--release` months in
  `--accent-2`; a `role="img"` figure whose readable facts live in the `--mono` axis + the scope strip).

---

## 5. Patterns (established by the 2026-06 landing refresh)

### 5.1 The claim leads
The hero's most important sentence is its largest, highest-contrast element. The name is a kicker; the
positioning claim is the lead. At a 2-second glance, the *claim* — not the name — should register.

### 5.2 One primary action
Per view, exactly one filled `--accent` CTA (`.hero-link--primary` / `.primary-link`). All sibling
actions stay secondary outline pills. Avoid three identical pills competing for the same click.

### 5.3 Flagship emphasis
When a set of peers has a lead item, elevate exactly one with the flagship treatment (accent border +
`--accent-subtle` tint + a filled "Flagship" tag) and let the rest read as supporting. Place it first.

### 5.4 Color taxonomy
`--accent` is **reserved** for the primary action and the flagship. Do **not** give peer cards
decorative top-border colors that collide in meaning (the pre-refresh grid had two greens and two
oranges by accident). If a real dimension needs encoding, map colors to that dimension deliberately;
otherwise use none.

### 5.5 The "Now" line
One short, current, work-focused sentence near the hero (Sivers `/now` style): a left-accent band
(`--accent` border + `--accent-subtle`) with an uppercase `--accent-dark` label. Confident and
specific — **not** an "open to work" badge. Easy to update quarterly (`Now · Q2 2026`).

### 5.6 Conversion footer
Every page ends on a clear next action, never a dead-end. Two surfaces carry it: the global
`.site-footer` leads with `.footer-cta` (email) on all pages (§4.8), and every project detail page
adds a "what next?" band — `.project-links-footer` holding one filled `.primary-link` (**Email me
about this**, per-project `?subject=`) plus secondary `.section-link` pills (`← Back to Approach`, and
a live-site link where one exists). One filled action per band (§5.2); reuses the existing pill
components — no new tokens.

### 5.7 The dense grouped index (serious, not showy)
A large body of work reads as a **dense, build-time-grouped index — not a card grid**: sections by kind,
reverse-chron within, each item a one-line `.ds-row` with **printed** inline facets (no interactive filter
UI at this scale — ~15–30 items). The grouping proves breadth; the uniform row skeleton across many
entries proves method; the per-project page (and the S3 panel) carries depth on demand. Researched
2026-06-16 (DeepMind / Karpathy / al-folio exemplars; Baymard / NN-g on filtering); rationale in
`docs/project-intelligence-design-brief-2026-06-16.md`.

---

## 6. Responsive system

- `main` and `.container` cap at `--measure` (72ch ≈ ~726px) and center, so prose columns are ~726px
  wide **even on large desktops**. The home `<main class="home">` is the one exception: it may widen to
  `--measure-wide`, but each section still self-caps at `--measure` via `.container` — only the Approach
  gallery opts into the wider measure (ADR-0007).
- The `.approach-grid` is single-column on mobile and **2-up at ≥769px** (flagship full-width). The
  earlier `minmax(320px, 1fr)` single-column behavior — and its `<410px` overflow — is retired.
- The **body-of-work index** (`/projects/`) is a prose column at `--measure` (never `--measure-wide`); at
  `≤480px` the `.ds-row__head` stacks (title → thesis → live), and the S3 `.activity-rail` keeps `1fr`
  columns and simply narrows (bars stay ≥3px).
- `≤768px`: nav collapses to the hamburger.
- Always verify changes at **desktop**, **768px**, and **360px** (`mise run dev`).

---

## 7. Accessibility contract (WCAG 2.1 AA)

- **Contrast:** text ≥ 4.5:1 (≥ 3:1 for large text ≥ 24px / ≥ 18.66px bold). Measured pairings after
  the refresh: claim **14.18**, kicker **5.12**, primary-CTA white-on-`--accent` **5.1**, flagship tag
  **5.1**, "Now" label **6.69**, "Now" line **12.78**. Project-intelligence (full table in the design
  spec §7.1): `.ds-row__title` `--accent`-on-`--paper` **≈4.8**, flagship title on `--accent-subtle`
  **≈4.6**, decision/scope `--ink`/`--muted` **14.2 / 5.1**; the `.activity-bar` tint is decorative — the
  facts live in the `--mono` axis + the figure's `aria-label`.
- **Status pills (`.project-status`, ~12px/600 → normal-text AA 4.5:1, not the 3:1 large-text
  floor):** the three previously-failing pills were repointed off shared semantic tokens onto
  pill-scoped ink tokens — lightness-only darkenings of each status hue, so `--accent` / `--ok` /
  `--accent-2` keep their site-wide roles. Measured: live `--ok-ink` on `--ok-bg` **4.76**,
  development `--accent-ink` on `--accent-light` **4.71**, production `--green-ink` on `--green-bg`
  **4.79**, mvp `--amber-ink` on `--amber-bg` **5.16** (already passing). Guarded by
  `npm run check:contrast`.
- **Targets:** interactive controls ≥ **44px** (`min-height: 44px` on pills/buttons).
- **Keyboard/SR:** `.skip-link` first in `<body>`; visible `:focus-visible` ring (3px `--accent` @ 0.35);
  `aria-label` on icon/external links; continuous heading hierarchy.
- **Motion:** `@media (prefers-reduced-motion: reduce)` disables transitions/smooth-scroll.
- **Print:** `@media print` hides nav/CTAs/links and flattens to ink-on-white.

---

## 8. Boundaries & drift control

**Always**
- One stylesheet (`assets/jeffrey.css`); use tokens; semantic HTML5; `<header>→<main>→<footer>`.
- Reserve `--accent` for the primary action and flagship.

**Never**
- New CSS files, `<style>` blocks, or inline `style=""`.
- Web fonts, tracking, CDN links, or heavy deps.
- `!important` (Biome `noImportantStyles`) or descending-specificity selectors (Biome
  `noDescendingSpecificity`); never disable a Biome rule to silence it.
- Arbitrary px for spacing; raw colors for new work (use tokens).
- Add JS beyond `assets/menu.js` without asking.

**Ask first**
- Any change to tokens, palette, type scale, spacing scale, or a named pattern (§5).
- New pages/entry points, nav/site-map structure, build or deploy config.

**Tooling:** Biome 2.3+ (2-space, 100-col); a PostToolUse hook auto-formats `.css`. Gate every change
with `mise run ci` (lint + format-check + conformance + tokens-fresh + build).

---

## 9. Drift watch

- **✅ Raw colors fully tokenized (v2.0).** The 64 `hsl()` + 2 print `#000` that lived in component
  rules are now semantic tokens (`surface*`, `ring`, `inset-warm`/`-cool`, `heading*`, `shadow-*`,
  status colors, `ink-print`). The `no-raw-values` gate keeps it that way.
- **✅ Status-pill ink tokens (AA contract).** All four `.project-status` pills must stay
  **≥ 4.5:1** — at ~12px/600 they sit below the large-text threshold, so the normal-text minimum
  applies. The live / development / production pills now use pill-scoped `--ok-ink` /
  `--accent-ink` / `--green-ink` instead of the shared `--ok` / `--accent` / `--accent-2` semantic
  tokens (those kept their site-wide link/action/accent roles); `--amber-ink` already passed.
  `npm run check:contrast` resolves whatever tokens the `.project-status` rules point at and is the
  regression guard (wired into `npm run conformance`).
- **✅ Resolved — `.approach-grid` overflow < ~410px:** the grid is now `1fr` (mobile) /
  `repeat(2, 1fr)` (≥769px), so it no longer forces 320px cards (ADR-0007).
- **Note — token values are CSS `hsl()` strings,** not DTCG color objects/hex. Chosen for byte-exact
  zero-diff; Claude Design reads them from the repo directly. A hex/`color()` transform for strict
  DTCG importers is a documented future option (`docs/adr/0001-dtcg-tokens.md`).
- **Intentional — hero `h1` split** (§5.1): the name is a styled-down kicker; noted so it isn't "fixed".
- **Intentional — `.pipeline-step--live` ≠ `.project-status.production`:** both use the `--green-bg` tint,
  but the live pipeline chip uses `--ink` text (≈11:1) because it carries body-size text, while the
  production pill uses pill-scoped `--green-ink` (4.79:1) for its ~12px text. Both AA; noted so the
  divergence isn't "reconciled" away.
- **Intentional — `.activity-bar` height via `--l1..l5` classes, not inline styles.** Bar height is
  data-driven; bucketing magnitude into five percentage classes keeps the no-inline-`style` rule intact
  (the one place graphical px appear — chart geometry — is flagged in the design spec §4.4).
- **Intentional — `.ds-row__title--static`** (`--ink`, non-link) for feed entries without a detail page, so
  the index never shows a false link affordance (~6 of 14 projects have detail pages today).
- **Note — `/projects/index.html` is a build artifact**, generated by `build-feed.mjs` in `pre(dev|build)`
  and **gitignored** (Biome `vcs.useIgnoreFile` skips it); the S3 panel is spliced by a Vite plugin. Feed
  updates stay feed-only and the rendered surfaces can't drift from `projects.json`.

---

## 10. Change checklist (DoD for any design change)

- [ ] Uses existing tokens; no new raw values.
- [ ] AA contrast verified on every changed text/control (§7).
- [ ] Verified at desktop, 768px, and 360px.
- [ ] `mise run ci` clean; no `!important`, no rule-disabling.
- [ ] If a token/scale/pattern changed: updated this doc and bumped `version` + `last_updated`.

---

## 11. References

- Machine-readable spec: `design/DESIGN_SPEC.md`. Token sources: `tokens/*.tokens.json` → `assets/tokens.generated.css`.
- Implementation: `assets/jeffrey.css` (component rules; `@import`s the generated tokens).
- Mobile nav behavior: `assets/menu.js`.
- Project contract & boundaries: `AGENTS.md`, `CLAUDE.md`.
- Editor rules: `.cursor/rules/css.mdc`, `.cursor/rules/html.mdc`, `.cursor/rules/project.mdc`.
- Origin of the §5 patterns: `docs/landing-refresh-directive-2026-06-05.md`; the §5.7 grouped index:
  `docs/project-intelligence-design-brief-2026-06-16.md`.
- Project-intelligence: `docs/project-intelligence.md` (system),
  `docs/project-intelligence-design-spec-2026-06-16.md` (design proposal + AA table),
  `docs/adr/0009-project-intelligence-feed.md`, `docs/meta-inventory-website-contract.md`.
- Sandbox-only theme (not deployed): `experiments/themes/academic.css`.
