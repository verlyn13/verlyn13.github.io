---
title: Design assessment and design-agent handoff — jvjohnson.dev
category: design
component: design-handoff
status: active
version: 1.0.0
last_updated: 2026-07-16
audience: design agent + coding agent + operator
tags: [design, audit, accessibility, design-system, handoff, wcag-2.2]
priority: high
---

# Design assessment and design-agent handoff — jvjohnson.dev (2026-07-16)

Multi-dimensional July-2026 frontend audit prepared for the downstream Claude **design** agent.
Eleven dimensions were each authored and then adversarially re-verified against the code
(typography, color/tokens, layout/spacing, responsive, cross-browser, WCAG 2.2 AA, CSS
architecture, performance, IA/copy, distinctiveness, SEO/meta), plus a live-rendered visual recon
of production.

Goal for the design pass: **simple, straightforward, professional, clear, direct** — the bar a
working professional sets in July 2026 — that works perfectly on any major device/browser, **without
breaking the site's intentional constraints** (system fonts, one accent, light-only, single CSS
file, token-only, JS-minimal, academic-credibility-over-commercial voice).

---

## 0. Read this first — provenance and the reconcile gate (BLOCKING)

At audit time, local `main` was **4 commits / 58 files behind `origin/main`** (commits #42–#45,
including **#44 "reconcile recruiter-facing narrative"** and **#45 "align public evidence
hierarchy"**). The dimension agents read the **stale local tree**; the visual recon read
**production**. Consequences:

- **The deployed home page is a newer design** ("Selected evidence" Q&A cards) than the local
  `index.html` (older pillar-grid). Home-specific IA/pillar findings below are marked
  **[RE-VERIFY]** — re-derive them from the current production home, not the stale local file.
- **All line numbers in this brief are indicative and have drifted** (local `jeffrey.css` 3025 lines
  vs `origin/main` 2946). Findings are keyed to **selectors / components / behavior**, which are
  stable; confirm exact lines after reconciling.

**Action 0 (operator, blocking):** reconcile local `main` with `origin/main` (rebase/pull) before
any design work, then re-verify. Every finding tagged **[VERIFIED-PROD]** was confirmed still
present on `origin/main` after the divergence was discovered; those are safe to action.

Owner tags used throughout: **coding-agent** (mechanical, within constraints) ·
**design-agent** (needs design judgment) · **operator-ask-first** (touches a hard rule / needs
approval — token/palette/type-scale/spacing-scale/named-pattern/nav-map changes).

---

## 1. Verdict

The site already does the hard part: it reads as the work of a rigorous, honest systems person —
fast (all 2026 Core Web Vitals met with wide margin), accessible at the foundation (skip link,
focus-visible, reduced-motion, print styles, AA-remediated status pills), token-disciplined (DTCG
pipeline with CI gates), and restrained (system fonts, one accent, prose measure). **That restraint
is correct and should be defended, not redesigned away.**

The gap between "credible" and "polished July-2026 professional" is four things:
1. **A few embarrassing defects** (an 8× duplicated paragraph, a near-invisible focus ring).
2. **An un-systematized type/spacing layer** — color/space/shadow are tokenized, but type size,
   line-height, and weight are ad-hoc, which is the root cause of most drift.
3. **Component multiplicity** — three status-pill systems (two dead), the outline-pill pattern
   declared three times, ~57 dead selectors, one eyebrow idiom copied seven times.
4. **No signature on the landing** — the genuinely distinctive assets (the braid, the colophon
   pipeline, the activity-rail) each live on exactly one page and none appears on the home page.

**None** of the recommended work requires web fonts, dark mode, a third script, or a palette beyond
ask-first token moves.

---

## 2. Priority 0 — defects to fix first (all [VERIFIED-PROD])

| # | Defect | Owner | Fix |
|---|--------|-------|-----|
| P0-1 | **Experience page repeats its 3-paragraph intro 8×** — once under the hero (correct) then verbatim inside all 7 era sections. Live on production right now; ~120 words read 8 times; mobile render ~15,000px tall. | coding-agent | Delete the seven `.timeline-intro` blocks nested inside `.era-section`; keep only the hero one. Pure content removal. |
| P0-2 | **Focus ring fails WCAG 2.2 SC 1.4.11** — `:focus-visible { outline: 3px solid var(--ring) }` with `--ring = hsl(212 85% 45% / 0.35)` renders ~1.67:1 on paper (needs ≥3:1), on **every** focusable control. | design-agent | Give focus its own high-contrast value referencing an existing semantic token: `outline: 3px solid var(--accent)` (~5.08:1). Keep it a `var(--token)` reference — a new ring token or `--ring`/palette edit is operator-ask-first. |
| P0-3 | **Sticky nav hides anchor targets** (WCAG 2.2 SC 2.4.11) — 64px sticky nav + `scroll-behavior: smooth`, but **no `scroll-padding-top`** anywhere. Skip link, `#evidence`, and the experience braid's JS `scrollIntoView` all land under the bar. | coding-agent | Add `scroll-padding-top: calc(64px + var(--space-2))` (~5rem) to the `html`/scroll container. Fixes both CSS and JS scroll. |
| P0-4 | **Experience inline `<style>` island ships 16 raw `hsl()` literals** (strand/label/marker/interactive-state colors incl. an un-tokenized orange `hsl(22 90% 52%)`) — outside `jeffrey.css`, so the no-raw-color gate can't see it. It also carries dead dark-theme cruft: `.timeline-intro` `background: hsla(0 0% 100% / .03)` (invisible on light paper) + `backdrop-filter: blur(8px)` over nothing. | operator-ask-first (relocate CSS + tokenize strand colors) / coding-agent (delete dark cruft) | Move the braid rules into `jeffrey.css`; map the two known hues to `var(--accent)`/`var(--accent-2)`; decide if the orange third strand earns a token; delete the invisible dark-theme background + `backdrop-filter`. |

---

## 3. Priority 1 — design-system consistency (the "systems-minded" credibility layer)

**Type is the one part of the system that isn't a system.** Color, spacing, shadow, radius, and
measure are tokenized; type size, line-height, and weight are hand-picked per component. This is the
single highest-leverage design-system item and the root of most drift below. *(ask-first: type-scale
tokens.)*
- ~11 ad-hoc small sizes (0.65/0.68/0.70/0.72/0.75/0.78/0.80/0.85/0.90/0.92/0.95rem) with no
  `--text-*` tokens; several steps are visually indistinguishable noise.
- `h3` (1.15rem) ≈ `h4` (1.05rem), separated mostly by a subtle ink shift; `h5`/`h6` undefined;
  base heading sizes are re-overridden in ~6 components.
- `line-height` drift: base `--lh: 1.55` is manually bumped to `1.6` in prose **16×**, with
  1.4–1.7 across the file. No line-height scale.
- The uppercase **eyebrow** label idiom is copied ~7× with **mixed-unit tracking** (`0.05em` vs
  `0.5px` vs `0.03em`) and 5 sizes. px tracking doesn't scale with text.
- Weight `650` is load-bearing (11×, more than `700`) but rounds to 600/700 on static system fonts.
- **Free win (coding-agent, no tokens):** add `text-wrap: balance` to headings and `text-wrap:
  pretty` to prose — pure progressive enhancement, currently used nowhere.
- **Recommendation:** propose a small modular type scale + a 2–3 value line-height scale + a
  weight set as semantic tokens (ask-first), then bind `h1–h6` and collapse the literals.

**Spacing scale tops out at 2rem with no section-level step.** *(ask-first: spacing-scale.)*
`--space-1..5 = 0.35/0.6/0.95/1.4/2rem`; `--space-5` is overloaded for card padding *and*
section gaps *and* main padding, so major sections lean on border dividers rather than whitespace.
The experience page had to invent a local `--section-gap: clamp(3rem, 8vw, 6rem)` because nothing
global reaches past 2rem. **Propose `--space-6` (~3rem) + a semantic `--section-gap` token** applied
once via `section { margin-block }`, and fold the experience page's ad-hoc value into it.

**One badge, not three.** *(design-agent.)* Three parallel status-pill systems exist:
`.project-status.*` (dead), `.badge--*` (live, on the experience page), `.status-badge`/`.tech-badge`
(dead) — plus two near-identical accent flagship tags (`.approach-flagship-tag`,
`.ds-row__flagship-tag`). Declare `.badge--*` canonical, delete the dead systems (folds into the
dead-code sweep), and merge the flagship tags into one with a size modifier. **AA note:**
`.badge--production` is white-on-`--ok` = **4.34:1** (fails small-bold AA); repoint it to the
pill tint-bg + dark-ink pattern already used by `.project-status` (no palette change).

**Consolidate the outline-pill pattern.** *(design-agent / coding-agent.)* The same cluster
(inline-flex + `border-radius:999px` + `1px var(--ring)` border + `--surface-pill` + `--shadow-hard`
+ identical hover/active/transition) is declared three times across `.hero-link`, `.section-link`,
and `.button`. Group them into shared base+hover+active rules (~30 duplicated lines); while there,
give `.button` the missing `min-height: 44px` and token-based spacing. Introducing a new `.pill`
class is a named pattern → ask-first; the in-place selector grouping is not.

**Dead-code sweep — ~57 orphan selectors [VERIFIED-PROD still present].** *(coding-agent.)*
Confirmed-dead subsystems with no consumer in any HTML/feed/JS: `project-card`/`project-header`/
`project-tech`/`project-links`; `position-*`; `tech-project-card`/`status-badge`/`tech-badge`;
`skills-translation`/`translation-grid`/`from-skill`/`to-skill`; `dev-grid`/`dev-item`;
`highlights-grid`/`highlight-stat`; `callout`/`service-card`; `course-cat`; `cv-download`/`cv-more`;
`hero-now`; `constrain`; `section-link-btn`; and more. **PRESERVE the feed-dormant S3 set**
(`activity-rail`, `activity-bar--l1..l5`, `activity-bar--release`, `decision*`,
`project-design-structure`, `project-provenance`) — intentionally reserved for meta-inventory feed
v1, not dead. Run `npm test` + build after.

**Naming convention.** *(design-agent.)* BEM, flat-legacy, and compound-modifier styles coexist;
most offenders disappear with the dead-code sweep. Standardize survivors on
`block__element--modifier` and record it in `design/DESIGN_SPEC.md`.

---

## 4. Priority 2 — IA, copy, and identity

**[RE-VERIFY all home-page items below against the new production home before acting — #44/#45
reshaped this area.]**

- **Nav "Evidence" is a same-page anchor sitting as a peer to real pages** and overlaps "Work"
  (`/#evidence` vs `/projects/`). On every non-home page it jumps into a deep section of a different
  page and can never show `.active`. *(operator-ask-first — nav/site-map change.)* Recommend
  collapsing to one "things I built" entry.
- **Footer CTA carries two competing value propositions** — the current "evaluations/agent-governance"
  pitch on home+cv, a stale "research-engineering / mathematical depth" pitch on the other pages.
  It's the most-repeated sentence on the site. *(design-agent picks one; propagation is mechanical.
  RE-VERIFY — #44 may have touched footers.)*
- **One résumé, six-plus labels** — "Current résumé / Full resume / Open resume / Rendered resume /
  Markdown resume / Resume", plus `résumé`↔`resume` spelling drift. Adopt one canonical label set.
- **Back-links resolve to three destinations with mixed casing** ("← Back to work" / "← Back to
  Evidence" / "← Back to Portfolio" vs "portfolio"). Standardize target + label + casing.
- **SEO/meta consistency** *(coding-agent, mostly mechanical):*
  - Stale `og:image:alt`/`twitter:image:alt` = "Independent researcher and systems builder" on ~12
    subpages + `build-feed.mjs` template; align to the current tagline. If `og-default.png` itself
    still shows the old tagline, regenerating it is an operator/design task.
  - All 8 project pages emit **zero JSON-LD**; add `CreativeWork`/`SoftwareSourceCode` linked to the
    `#person` node, populated from `public/data/projects.json`.
  - `<title>` separators/name-forms drift (`—` vs `|` vs ` - `; "Jeffrey Johnson" vs "Jeffrey V.
    Johnson, Ph.D."); `contact.html` disagrees with its own OG tags ("PhD" vs "Ph.D.").
  - **No `apple-touch-icon`** — iOS Add-to-Home-Screen falls back to a blank tile. Add a 180×180 PNG.
  - `flux.html` meta description (223 chars) truncates in SERPs → tighten to ~155.

**Distinctiveness — surface ONE signature on the landing.** *(design-agent; a new recurring pattern
is operator-ask-first.)* Honest read: the base look (warm-cream paper + one azure accent + system
sans) is competent-but-generic, and the three ownable assets (braid SVG, colophon pipeline swimlane,
activity-rail sparkbars) plus the token-backed `.rule-of-thumb` highlighter each live on ≤1 page —
**none on the home page**, per the live recon. Options, all constraint-safe:
- Re-site one existing device above the fold (the strand/rail "track" idiom is the strongest
  candidate and ties the braid to the activity-rail).
- Create **one confident display-type moment** on the positioning claim — distinctiveness inside a
  system-font constraint comes from *contrast* (a decisive size/weight jump), not new typefaces.
- Give **monospace one job** — verifiable machine data (SHAs, counts, dates, DOIs, provenance) with
  `tabular-nums` — and stop using it for decorative tech chips. This makes the "machine-checkable"
  thesis visible with zero web fonts.
- The `.rule-of-thumb` highlighter already exists under a "signature move" comment and ships in zero
  HTML — deploy it on recurring thesis lines, or delete it. Don't leave a phantom signature.

**Live visual recon of the production home (the current design):** above-the-fold is text-dense; the
"Selected evidence" cards repeat an identical four-question scaffold ("What is this / What is it for
/ How is it used / Why does it matter / Evidence and status") 5+ times, which signals rigor but
reads mechanical and monotonous on scroll; the person's name is the faintest line in the hero; and
the wide `container--wide` evidence band makes the page's left edge visibly jump vs the narrower
sections above/below. Mobile (390px) holds up with no horizontal overflow. These are the valid
home-page observations — the design agent should re-capture screenshots from production.

---

## 5. Priority 3 — cross-browser and performance polish (all coding-agent, mechanical)

- `body { min-height: 100vh }` → `100dvh` (iOS Safari over-tall body / footer gap).
- Add `-webkit-text-size-adjust: 100%; text-size-adjust: 100%;` to `html` (iOS landscape inflation
  overrides the clamp scale).
- Add `-webkit-backdrop-filter` beside `backdrop-filter`, and `-webkit-user-select` beside
  `user-select`, in the braid styles (Safari ≤17 / older WebKit) — or delete the barely-visible
  glass effect entirely (design call).
- **JS smooth-scroll ignores `prefers-reduced-motion`** — the experience script forces
  `behavior:'smooth'`; gate on `matchMedia('(prefers-reduced-motion: reduce)')` and pass `'auto'`.
- **Mobile nav toggle is inserted *after* the menu it controls** (`appendChild`), breaking keyboard
  order, and has no `aria-controls`. Insert before `.nav-links`, add an `id` + `aria-controls`.
- Braid exposes **two redundant tab stops per era (14 total)** to the same target — make only one
  element per era focusable.
- Primary `<nav>` has no accessible name where 2–3 navs coexist — add `aria-label="Primary"`.
- `content-visibility: auto` + `contain-intrinsic-size` on the long experience/project sections
  (tune the estimate to avoid CLS; verify anchor scroll).
- `copy-md.js` prefetches every résumé `.md` on load — move the cache-warm to first
  `pointerdown`/hover of a copy button.

---

## 6. What's already excellent — preserve, don't "improve"

- DTCG token pipeline (primitive→semantic, Style Dictionary) with **three CI gates**
  (no-raw-values, tokens-fresh, contrast). `--accent` discipline is real and defended in comments.
- Status-pill AA remediation is done right (`--ok-ink`/`--accent-ink`/`--green-ink` carry their
  measured ratios; `check-contrast.mjs` resolves them live).
- Accessibility baseline: skip link, semantic landmarks, clean heading order, reduced-motion block,
  print styles (real 11pt résumé spec), `aria-live` copy feedback, boolean `aria-expanded` nav.
- Performance: text LCP in system fonts (LCP≈FCP), one 7.6 kB-gzip minified stylesheet (Vite inlines
  the token `@import`), deferred module scripts, zero third-party origins, no scroll-driven repaint.
- SEO baseline: unique titles/descriptions/canonicals, complete OG+Twitter with a correct 1200×630
  `og-default.png`, valid `robots.txt`/`sitemap.xml`, `llms.txt`, `noindex` 404, Person/WebSite
  JSON-LD on home/cv.
- `tabular-nums` on tables and data metrics; consistent mono for code/provenance.

---

## 7. Suggested sequencing for the design agent

1. **Reconcile** local↔`origin/main`, then re-verify (§0).
2. **P0 defects** (§2) — safe, high-visibility, mostly mechanical.
3. **Propose the ask-first token batch to the operator** (§9) before touching tokens.
4. **Consolidate components** (badge / pill / eyebrow) + **dead-code sweep** (§3).
5. **Landing hierarchy + one signature** (§4 distinctiveness).
6. **Cross-browser / perf / a11y polish** (§5).
7. Gate every step: `mise run ci` + `npm test`; visually verify at **320 / 375 / 768 / 1440px** on
   Chrome, Safari (incl. iOS), and Firefox.

---

## 8. Ask-first batch (operator sign-off required before the design agent proceeds)

- Type-scale tokens (`--text-*`), line-height tokens, weight tokens.
- Spacing-scale addition (`--space-6`) + `--section-gap` semantic token.
- Focus-ring treatment if it needs anything beyond referencing existing `var(--accent)`.
- Any palette-hue nudge (e.g. warming the cool-220° neutrals toward the paper's 45°, or moving
  `--accent` off the generic 212°) — currently a background-only warmth over a cool-gray kit.
- Merging the two near-identical greens (`--ok` 140° / `--accent-2` 160°) that encode "live/production"
  inconsistently.
- Nav/site-map change (the "Evidence" item).
- Any new named pattern (`.pill`, `.eyebrow`, a re-sited signature device).
- Removing/merging sprawl tokens (`--paper-deeper` = 0 refs; `--heading-2` = 1 ref).

---

## 9. Reference

- Full per-dimension audit (23 agents, adversarially verified) captured during this session; the
  `responsive` verify pass failed on a tooling cap — responsive concerns are folded into §3 (five
  ad-hoc breakpoints 480/600/640/768/769; braid forces horizontal scroll on mobile; overflow is
  otherwise well-defended via pervasive `min-width:0` + `overflow-wrap`).
- Constraints of record: `AGENTS.md`, `design/DESIGN_SPEC.md`, `docs/design-system.md`, `docs/adr/*`.
- Truth map: `docs/index.md`.
