---
title: Project-Intelligence presentation — design spec (S1–S5)
for: the code agent in verlyn13.github.io
from: Claude Design (non-authoritative proposal — ADR-0005)
date: 2026-06-16
implements: docs/project-intelligence-design-brief-2026-06-16.md (v1.1.1)
status: proposal
---

# Project-Intelligence presentation — design spec

A proposal for three surfaces — **S1 portfolio overview**, **S2 body-of-work index** (primary
deliverable), **S3 per-project design structure** — plus light notes on **S4** (portfolio timeline)
and **S5** (colophon copy). It is written to be implemented in the **single deployed stylesheet**
`assets/jeffrey.css` using **semantic tokens only**. Every class named here is illustrated, rendered
on the real `jeffrey.css`, in `previews/` (see `README.md`); the literal rule source is
`assets/project-intelligence.proposed.css` — *fold it into `jeffrey.css`; do not ship it as a second
stylesheet.*

**Authority.** This is a design proposal; the code is the source of truth. Nothing here changes a
token, palette, type scale, or spacing scale. New **components** (compositions of existing tokens) are
flagged **ASK-FIRST** in §7 with AA-checked values.

---

## 0. The one idea

> **The grouping proves breadth; the uniform one-line entry, repeated across many projects, proves
> method; the per-project panel delivers depth on demand.**

No card grid, no thumbnails, no filter UI, no hero imagery, no motion. At ~14–30 items the restraint
*is* the signal to this audience (frontier-lab hiring manager → grant officer → independent
researcher). Every decision below serves that sentence.

---

## 1. Token & type vocabulary used (nothing new)

Colors (semantic): `--ink` `--muted` `--accent` `--accent-dark` `--accent-2` `--accent-light`
`--accent-subtle` `--on-accent` `--surface` `--inset-warm` `--border` `--border-faint`
`--border-hairline` `--paper`.
Shape/space/type: `--radius-sm` `--space-1…5` `--measure` `--mono` `--font`, plus the existing type
ramp (`h1`/`h2`/`h3`, `.section-intro`, `.evidence-card__*`).
Reused components: `.site-nav` · `.back-nav` · `h2` section-divider · `.evidence-grid` /
`.evidence-card` (colophon) · `.project-status` · `.primary-link` / `.section-link` · `.site-footer`.

`--accent` stays **reserved** for (a) the one filled primary action per view and (b) the **single**
flagship entry. Everywhere else, links use the base `a` colour (`--accent`) as the site already does;
that is the established link colour, not a second "primary."

---

## 2. S1 — Portfolio overview band

**Intent.** In one band: scale + range + method. A measured *statement*, not a dashboard.

**Layout.** A full-`--measure` band, ruled top and bottom (`--border`), holding two lines:
1. a **definitional line** — a sentence whose counts are emphasized as data;
2. a **recurring-methods line** — a small `--muted` line led by an uppercase label.

```
────────────────────────────────────────────────────────────  (border top)
14 projects across 20+ domains in 5 languages — built
continuously since 2022, one of them deployed and live.
RECURRING METHODS  provenance · ADRs · CI-enforced boundaries · spec-driven phases
────────────────────────────────────────────────────────────  (border bottom)
```

**Component — `.portfolio-overview`** (new; tokens only)

| Element | Token mapping | Type role |
|---|---|---|
| `.portfolio-overview` | `max-width:--measure`; `padding:--space-4 0`; `border-top/-bottom:--border`; `margin:--space-4 auto --space-5` | band |
| `.portfolio-overview__lead` | color `--ink`; `1.05rem`/`1.6` | sentence |
| `.portfolio-overview__metric` | color `--ink`; `font-weight:650`; `tabular-nums`; `white-space:nowrap` | the counts |
| `.portfolio-overview__methods` | color `--muted`; `0.9rem` | methods line |
| `.portfolio-overview__methods-label` | color `--muted`; `0.7rem`; uppercase; `letter-spacing:0.05em`; `font-weight:650` | label |

**States.** Static (no interactive elements). If a count links to its group (optional), it inherits the
base `a` treatment (underline strengthens on hover; `:focus-visible` ring).

**Why a sentence, not stat tiles.** Big-number tiles read as marketing. A sentence with the numbers
weighted reads as a researcher stating the shape of the work — serious, not showy. (Metric chips are a
viable alternative if the operator prefers; same tokens, wrap-friendly. Kept out of the default for
tone.)

**Data.** Lights up from feed `portfolio{projectCount, domains[], languages[], firstActive,
deployedCount, recurringMethods[]}`. Derivable today from `projects[]` (count = 14; distinct
`domains[]` ≈ 27 → render "20+"; distinct `tech[]` = 5; `deployedCount` = 1 via `posture.allowsLive`).
`firstActive`/"since 2022" needs `scope{}` (v1) — until then, render the clause only if the value
exists; never hardcode a year the feed can't back.

---

## 3. S2 — Body-of-work index (primary deliverable)

**Intent.** The breadth surface: every project as a **uniform one-line entry**, grouped by kind,
reverse-chron within, a curated front tier leading.

### 3.1 Page skeleton & hierarchy

```
header → main(.container, capped at --measure) → footer        (unchanged shell)
  h1   Body of work
  p.section-intro
  [S1 band sits here when the two surfaces share a page]
  section.dswork__primary   h2 "Primary projects"   → curated front tier
  section.dswork__group      h2 "Shipped systems"  (1)
  section.dswork__group      h2 "Working prototypes" (7)
  section.dswork__group      h2 "Released packages"  (1)
  section.dswork__group      h2 "Published research" (2)
  section.dswork__group      h2 "Teaching"           (3)
```

Heading hierarchy is continuous: one `h1`, every group an `h2` (reusing the existing `h2`
border-bottom divider), entry titles are **links, not headings** (an entry is a row, not a document —
keeping titles out of the heading outline keeps the page scannable by screen-reader heading nav: 1 `h1`
+ 6 `h2`).

### 3.2 Grouping → kind

Map `posture.evidenceClass` → group, in this print order:

| Group `h2` | `evidenceClass` | count today |
|---|---|---|
| Shipped systems | `deployed-system` | 1 |
| Working prototypes | `working-prototype` | 7 |
| Released packages | `public-package` | 1 |
| Published research | `published-artifact` | 2 |
| Teaching | `course-taught` | 3 |

Reverse-chron within each by last-active (`freshness.maxUpdatedAt` → `asOf` → year). The academic
record sorts itself into *Published research* / *Teaching*, naturally separated from engineering — no
special-casing. Group order is editorial (engineering first); make it a build-config list, not derived,
so the operator can reorder.

### 3.3 The design-structure row — `.ds-row` (the reusable component)

**This is the deliverable component.** One project = one `<li class="ds-row">`. Anatomy:

```
┌ .ds-row ───────────────────────────────────────────────────────────┐
│ .ds-row__head  (flex, baseline, wrap)                              │
│   a.ds-row__title   "Dicee"            .ds-row__live "dicee.games↗"│
│   span.ds-row__thesis  "Install-free multiplayer dice game …"      │
│ .ds-row__meta  (flex, wrap)                                        │
│   web · databases · gaming · TypeScript·Rust/WASM · Live · 2026    │
└────────────────────────────────────────────────────────────────────┘
```

| Element | Token mapping | Type |
|---|---|---|
| `.ds-row` | `padding:--space-3 0`; `border-bottom:1px solid --border-faint` (none on `:last-child`) | row |
| `.ds-row__title` (`<a>` → detail) | color `--accent`; `font-weight:600`; `1.05rem`; `padding:--space-1 0` (tall hit box) | link |
| `.ds-row__thesis` | color `--ink`; `0.95rem`/`1.5`; `flex:1 1 32ch` | one-line thesis |
| `.ds-row__live` (`<a>`, optional) | base `a` colour; `0.85rem`; `font-weight:600`; `↗` suffix | secondary link |
| `.ds-row__meta` | color `--muted`; `0.8rem`; flex-wrap | facet line |
| `.ds-row__facet` | `--muted`; `·` separators via `+ ::before` | facet |
| `.ds-row__facet--tech` | `font-family:--mono`; `0.75rem` | tech facet |

**Facets = printed labels, not controls.** `domain(s) · primary tech · status · year` (+ live link
when `deploymentUrls[]` is non-empty). **Kind is intentionally omitted from the row** — the group
header already states it; repeating it per row is redundant. Tech uses the mono face so it reads as a
token at a glance. Domains capped at ~3 for one-line density; status is the human `statusLine`,
trimmed.

**States.**
- *default* — as above.
- *hover* — `.ds-row__title` / `.ds-row__live` underline strengthens to `currentColor` (the global
  `a:hover` rule); no row-background change by default (keeps the dense list calm). *Optional:* a
  `.ds-row:hover{ background:--inset-warm }` full-row tint is available if the operator wants stronger
  affordance — it's decorative, contrast-safe, and reduced-motion-neutral.
- *focus* — global `:focus-visible` ring (3px `--ring`, 2px offset, 10px radius) on either link.

### 3.4 Curated front tier — `.dswork__primary` + `.ds-row--flagship`

A "Primary projects" `section` of the **same rows**, above the groups (the al-folio "selected work +
full list" pattern; the brief's "a few primary projects lead, the full set follows"). These projects
**also** appear in their kind group — that repetition is intended.

Exactly **one** entry is the flagship and carries the reserved accent, mirroring `.approach-card--
flagship` / the "Now" band idiom:

| Element | Token mapping |
|---|---|
| `.ds-row--flagship` | `border-left:3px solid --accent`; `background:--accent-subtle`; `border-radius:0 --radius-sm --radius-sm 0`; `padding:--space-3` |
| `.ds-row__flagship-tag` | `background:--accent`; color `--on-accent`; pill; `0.68rem`; uppercase |

The other front-tier rows are plain `.ds-row`. Front-tier membership is operator-curated (a build-config
list), not feed-derived. Recommended seed: **Budget Triage** (flagship), **Dicee**, **Host Capability
Substrate** — one provable-governance build, the one live system, the deepest method exemplar.

### 3.5 Optional long-page affordances

Only if the page runs long: a `<nav>` "on this page" anchor list to the groups (`tabindex="-1"`
targets, `aria-current`) and/or native `<details>` group collapse **default-open** (so scanning + print
are intact). At 14 items the page is short — **ship neither.** Never a JS filter (out of scope; printed
facets replace it).

---

## 4. S3 — Per-project design structure

**Intent.** On each `projects/*.html`, a panel that proves the project is *designed*: **scope + key
decisions + activity**. Insert it after **Overview**, before the deep architecture prose.

### 4.1 Skeleton & hierarchy

```
h2  Design structure
  h3  Scope        → .evidence-grid (reused)
  h3  Key decisions → .decision-list (new)
  h3  Activity      → .activity-rail (new; braid idiom at project scale)
  p.project-provenance  → links the colophon
```

`h2` under the page `h1` (project title), three `h3`s — continuous hierarchy.

### 4.2 Scope strip — reuse `.evidence-grid` / `.evidence-card`

No new component. Four cards (1-up < 600px, 2-up ≥ 600px — the colophon's existing behavior):
**Languages** · **Active span** · **Releases** · **Tests & CI**, each `__label` (`--muted`, uppercase)
/ `__value` (`--ink`, 600) / optional `__note` (`--muted`). Data: `scope{languages[], activeSpan,
releases[], hasTests, hasCI}`.

### 4.3 Key decisions — `.decision-list` (new; the differentiator)

2–5 decisions, the highest-signal element ("imports enforced in CI from the first commit"). A list, not
callouts — 2–5 accent callouts would shout; a quiet hairline rule keeps the gravity on the words.

| Element | Token mapping | Type |
|---|---|---|
| `.decision` | `padding-left:--space-4`; `border-left:2px solid --border-hairline` | item |
| `.decision__title` | color `--ink`; `font-weight:650`; `1rem` | decision |
| `.decision__summary` | color `--muted`; `0.9rem`/`1.55` | rationale |
| `.decision__source` | `font-family:--mono`; `0.78rem`; `--muted` | publish-safe label |

`decisions[].sourceLabel` is a **label** ("ADR · edge architecture", "CI · type gate") — never a private
URL/SHA (leak gate). Reserve `--accent` — it is *not* used here.

### 4.4 Activity rail — `.activity-rail` (new; braid idiom, single strand)

The experience **braid/era-timeline** reduced to one project strand: a build-time, **zero-JS** column
plot of monthly magnitude with release months marked, a mono year/quarter axis (reusing the
experience `.year-marker` treatment), and a legend.

| Element | Token mapping | Notes |
|---|---|---|
| `.activity-rail__plot` | `display:grid; grid-auto-flow:column; align-items:end`; `height:64px`* | one column / active month |
| `.activity-bar` | `background:--accent-light`; `min-height:3px`* | commit-bucket magnitude (a soft tint that reads as "activity", distinct from the reserved `--accent`) |
| `.activity-bar--release` | `background:--accent-2` | release month — the green "ship-it" signal; a **real dimension deliberately encoded** (§5.4) |
| `.activity-rail__axis` | `font-family:--mono`; `0.7rem`; `--muted` | year/quarter ticks |
| `.activity-rail__legend` | `0.78rem`; `--muted`; token swatches | commit / release key |

\* `height/min-height/gap` here are **graphical px on a chart**, not layout spacing — the one place px
is appropriate (analogous to the experience braid SVG geometry); everything else uses spacing tokens.

**Accessibility.** The plot is decorative-supportive: the `.activity-rail` carries
`role="img"` + a one-sentence `aria-label` ("Monthly activity from early 2024 to mid-2026: sustained
commits with three releases"); the plot itself is `aria-hidden`. The **readable** facts live in the
mono axis (5.1:1) and the scope strip — the bars never carry information available nowhere else. Data:
`activity[]{date,type,magnitude}` (commit-bucket / release / milestone / phase).

**S4 relationship.** S4 (later) is this same idiom at portfolio scale — the full multi-strand braid
over all projects' `activity[]`. Out of scope now; the single-strand rail is the building block.

### 4.5 Provenance line — `.project-provenance`

One quiet `--muted` line: "Scope and activity are feed-derived and cadence-refreshed. How this
portfolio is published →", the last clause a base `a` link to `colophon.html`. Ties depth to the
publishing system and sets honest expectations about freshness without claiming auto-deploy behavior.

---

## 5. S5 — Colophon copy alignment (no redesign)

Keep `colophon.html` and its `.pipeline` / `.evidence-grid`; only reconcile copy to the current
delivery contract (§6 of the system spec): *feed-only, gate-passing diffs are PR-delivered from
`meta-inventory` and operator-merged on the website; everything else stays human-gated.* If a
feed-only policy-auto-publish path is later approved and wired, update the copy then. No structural or
token change.

---

## 6. Responsive (verified desktop / 768 / 360)

The index is a prose column capped at `--measure` (72ch) — it never needs `--measure-wide`. Reflow is
mostly free:

- **Desktop (≥769px).** Title + thesis share row line 1 (thesis `flex:1 1 32ch`); live link trails
  right; meta on line 2. Group `h2` dividers carry rhythm. S1 band is one or two visual lines.
- **768px.** Identical — single column already; nav collapses to the existing hamburger; nothing in
  these components depends on the wide measure.
- **≤480 / 360px.** `.ds-row__head` switches to `flex-direction:column` (title → thesis → live), meta
  wraps to 2–3 lines, separators hold. S1 sentence wraps to ~4 lines, counts stay `nowrap` so a number
  never breaks mid-token. Evidence grid is 1-up; activity plot keeps `1fr` columns and simply gets
  narrower (bars stay ≥3px). No horizontal scroll at 360px.

Focus order = DOM order (title → live → next row). Reduced-motion: nothing animates; the rail is static
by construction. Print: rows are ink-on-white text; the activity plot is decorative and may be hidden
via the existing `@media print` patterns if desired (the scope strip + decisions carry the facts).

---

## 7. Contrast pairings (measured) & ASK-FIRST items

### 7.1 Contrast (sRGB, against `--paper` unless noted)

| Pairing | Used for | Ratio | Verdict |
|---|---|---|---|
| `--ink` on `--paper` | thesis, decision title, evidence value, metric counts | ≈ 14.2 : 1 | AA/AAA ✓ |
| `--muted` on `--paper` | meta facets, methods line, axis, provenance, decision summary | ≈ 5.1 : 1 | AA ✓ (normal) |
| `--accent` on `--paper` | row titles, live links, base links | ≈ 4.8 : 1 | AA ✓ (normal) |
| `--accent-dark` on `--paper` | (if used for emphasis labels) | ≈ 7.0 : 1 | AA/AAA ✓ |
| `--on-accent` on `--accent` | flagship tag | ≈ 5.1 : 1 | AA ✓ |
| `--accent` on `--accent-subtle` | flagship row title on its tint | ≈ 4.6 : 1 | AA ✓ (normal) |
| `--accent-2` tick on `--paper` | release marker (graphical) | ≈ 4.0 : 1 | AA ✓ (non-text ≥ 3) |
| `--accent-light` bar on `--paper` | commit magnitude (graphical, supportive) | ≈ 1.1 : 1 | decorative — info is in axis/aria ✓ |

`--accent-2` is **graphical only** (release ticks); it is never used as body text — consistent with the
existing note that `.pipeline-step--live` uses `--ink` text, not `--accent-2` text.

### 7.2 New components — ASK-FIRST (zero new tokens)

All compose existing semantic tokens; none adds a colour, font, type step, or spacing step. Approve
before they enter `jeffrey.css`:

1. **`.portfolio-overview`** (S1 band).
2. **`.dswork` / `.dswork__group` / `.ds-list` / `.ds-row` (+ `--flagship`, `__title`, `__thesis`,
   `__live`, `__meta`, `__facet`, `__flagship-tag`)** (S2 index + the design-structure row).
3. **`.decision-list` / `.decision`** (S3 key decisions).
4. **`.activity-rail`** (S3 activity; introduces the only legitimate graphical px — chart geometry).

No new **tokens** are requested. No palette/type/spacing change. If during implementation a genuine
gap appears (e.g. a dedicated "activity tint" token instead of borrowing `--accent-light`), raise it
ask-first rather than assuming.

### 7.3 Open questions for the operator

- **Where S2 lives** — a new top-level page (e.g. `/work/`) vs. a section on an existing page. This
  touches nav/site-map, which is ask-first; the previews assume a "Work" destination but don't decide
  it.
- **Front-tier membership & the single flagship** — editorial. Seed proposed in §3.4.
- **Group order & labels** — proposed in §3.2; trivially reorderable in build config.

---

## 8. Rationale (kept serious, not showy)

| Decision | Ties to settled direction |
|---|---|
| Grouped one-line index, no card grid / thumbnails | "dense, build-time-grouped index" — grouping proves breadth |
| Printed inline facets, no filter UI | "facets are printed labels, not controls" at 15–30 items |
| Uniform `.ds-row` skeleton across all 14 | "the uniformity is the proof of method" |
| Curated front tier + single flagship | "a few primary projects lead, then the full body"; §5.3 flagship |
| `--accent` only on flagship + the one CTA | §5.2 / §5.4 colour discipline preserved |
| Key decisions as a quiet hairline list | the differentiator, weighted by words not chrome |
| Activity = single-strand braid, zero JS | reuse the experience idiom; no client JS |
| Sentence overview, not stat tiles | "not a stats hero"; academic register |
| No new tokens; one stylesheet | "design system is fixed" |

Restraint throughout: no hero imagery, animation, parallax, gradients, or 3D. Typographic discipline and
whitespace carry the confidence.
