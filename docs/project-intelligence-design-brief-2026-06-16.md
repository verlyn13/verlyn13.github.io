---
title: Design Brief — Project-Intelligence presentation (body-of-work + per-project design structure)
category: design
component: project-intelligence-feed
status: handoff
version: 1.1.0
last_updated: 2026-06-16
tags: [design-brief, handoff, project-intelligence, breadth, body-of-work, activity-timeline]
priority: high
audience: Claude Design agent
---

# Design Brief — Project-Intelligence presentation

**For:** the Claude Design agent — a separate, specialized design pass.
**From:** the code agent in `verlyn13.github.io`.
**Date:** 2026-06-16.
**Origin:** the project-intelligence reframe — *the feed is the instrument; the projects are the exhibit.*
**Read with:** `docs/project-intelligence.md` (system spec + data contract), `design/DESIGN_SPEC.md`
(tokens + component map), `docs/design-system.md` (patterns + AA contract), and the **live site**
(https://jvjohnson.dev) + screenshots. Our system is vanilla HTML/CSS + DTCG tokens — there is **no
synced component kit** (`/design-sync` targets React libraries); design against these references, with
`assets/jeffrey.css` as the implementation truth.
**Authority:** code is the source of truth (ADR-0005). Your output is a **design proposal** the code
agent translates to semantic tokens + vanilla HTML/CSS — not production code, and not authoritative.

## Goal & readers
Present a **large body of agentic-development projects** so a serious visitor reads **breadth + depth +
method** in seconds — many substantial projects, across many domains, all built with deliberate,
researched, spec-driven method (not two-day shells) — with **depth on demand** (drill into any one).
Readers, in order: (1) frontier-lab hiring manager / senior researcher, (2) AI-safety grant officer,
(3) independent researcher in the same orbit. **Tone: academic-serious, not a marketing showcase.**

## Settled direction (do NOT re-litigate — researched 2026-06-16)
A focused research pass settled the pattern (exemplars: DeepMind publications, Karpathy, Gwern, the
al-folio academic theme; filtering evidence: Baymard, NN/g). Design **within** it:
- **A dense, build-time-grouped index — NOT a card grid.** Sections by category, reverse-chron within;
  each item a **one-line entry with inline metadata** (`kind · domain · tech · status · year`) linking to
  its detail page. Grouping proves breadth; the metadata line signals method without thumbnails.
- **No interactive filtering.** At 15–30 items a filter UI reads as clutter. Facets are **printed labels,
  not controls.** (If the set later grows past ~40, a tiny progressive-enhancement JS filter — never
  CSS-only `:has()`, for screen-reader result announcement — is the future path. Out of scope now.)
- **Curated front tier, then the full body.** A few primary/flagship projects lead; the full grouped set
  follows. (Addresses "primary projects yes, but show the multitude.")
- **Restraint is the aesthetic.** No hero imagery, animation, parallax, gradients, particle/3D effects.
  Typographic discipline + whitespace read as taste and confidence to this audience.

## Hard constraints (do not violate)
- **Design system is fixed.** Use existing **semantic tokens only** (see `DESIGN_SPEC` vocabulary). **No
  new colors, fonts, type scale, or spacing scale.** If a surface genuinely needs a new token or
  component, **propose it in the handback, flagged ask-first** — do not assume it.
- **Reserve `--accent`** for the primary action / flagship (§5.4). One filled primary action per view.
- **No client JS.** The index renders at build time from the feed; interactions beyond links are out — no
  filter widgets, sort controls, carousels, or tabs in v1.
- **Single stylesheet, vanilla HTML.** Reuse the existing component vocabulary: cards, tags, the new
  `.pipeline` / `.evidence` components (colophon), and the experience **braid / era-timeline** idiom for
  activity.
- **WCAG 2.1 AA** (`design-system.md` §7): changed text ≥ 4.5:1 (≥ 3:1 large), interactive targets
  ≥ 44px, continuous heading hierarchy, skip link / focus rings / reduced-motion / print intact.
- **Layout system:** `--measure` (72ch) for prose; `--measure-wide` (1080px) only where a gallery needs
  it (ADR-0007). Verify desktop / 768px / 360px. Keep `header → main → footer`.
- **Honesty + safety:** present only feed-derived facts; **never name the feed-suppressed project** (the
  leak gate); no private repo URLs, SHAs, or internal branch names on any surface.

## Surfaces to design
### S1 — Portfolio overview (breadth at a glance)
- **Intent:** in one band, the scale + range + method — e.g. *N projects · M domains · K languages · built
  continuously since 2022 · recurring methods: provenance, ADRs, CI-enforced boundaries.*
- **Data:** top-level `portfolio{}` (feed v1); derivable from `projects[]` / `domains` / `tech` today.
- **Design:** compact, scannable — metric chips or a tight definitional line. **Not** a stats "hero."

### S2 — Body-of-work index (the multitude, arranged) — *primary deliverable*
- **Intent:** the breadth surface — every project as a **uniform one-line entry**, grouped and scannable.
  The uniformity is the proof of method; the volume is the breadth.
- **Content per entry:** title (→ detail page) · one-line thesis · inline metadata (`kind · domain(s) ·
  primary tech · status · last-active year`) · live link if any.
- **Grouping:** by **kind** (`posture.evidenceClass`: shipped systems / working prototypes / published
  artifacts / teaching) — the operator's lean; reverse-chron within each. A **curated front tier** of
  primary projects sits above the groups.
- **Optional:** a small "on this page" anchor nav to the groups *only if the page runs long* — done
  accessibly (`tabindex="-1"` targets, `aria-current`). Native `<details>` allowed for group collapse but
  **default-open** (scanning + print). Skip both if the page is short.
- **Deliver the entry as a reusable component** ("design-structure row") specified in tokens + states
  (default / hover / focus), at desktop / 768 / 360.

### S3 — Per-project design structure (depth, on the detail page)
- **Intent:** on each `projects/*.html`, a panel that proves the project is *designed*: scope + key
  decisions + activity.
- **Content (feed v1):** a scope strip (languages, active span, releases, tests/CI present); 2–5 **key
  decisions** (the differentiator — already latent in v0 theses, e.g. "imports enforced in CI from the
  first commit"); a compact **activity timeline**; a quiet provenance line linking the colophon.
- **Design:** reuse the experience **braid / era-timeline** idiom for activity (project-scoped,
  data-driven) and the `.evidence` / `.pipeline` components for the facts. Token-only.

### S4 — Portfolio activity timeline (later / optional)
- **Intent:** all projects' activity over time → "sustained, parallel building." The braid idiom at
  portfolio scale. Lower priority — design only if it's cheap to include.

### S5 — Colophon alignment (minor, no redesign)
- The existing `colophon.html` (kept, **demoted**) must reflect the **auto-publish** cadence: feed-only,
  gate-passing diffs auto-publish daily; everything else stays human-gated. Light copy/visual touch.

## Data contract (design against real data)
Fields available **now** (`public/data/projects.json`, schema v0): `title`, `thesis`, `domains[]`,
`tech[]`, `statusLine`, `posture.{badge,evidenceClass,allowsLive}`, `deploymentUrls[]`, `asOf`,
`freshness.maxUpdatedAt`, `tier.portfolioVisibility`. **v1 adds** `scope{}`, `decisions[]`, `activity[]`,
`method{}` per project + top-level `portfolio{}` (spec §5.2). Design for v1; v0 lights up first (P0).

Representative real entries:
- **Dicee** — *deployed-system* — "A solo-built, install-free multiplayer dice game … a deterministic
  Rust/WASM engine paired with real-time edge infrastructure." tech: TypeScript (+Rust/WASM); live:
  dicee.games; domains: web, infra-as-code, databases, gaming.
- **Host Capability Substrate** — *working-prototype* — "An operations kernel … designed ring-by-ring
  with imports enforced in CI from the first commit." domains: agents, infra, security, identity, cli.
- **Agentic Architecture Audit** — *public-package* — "audits agent-built systems in eleven evidence-first
  phases — every finding cites the exact path, line range, and command that produced it."

The feed also carries the **academic record** (dissertation, course series, Peace Corps, a clinical
study) — the **kind** grouping naturally separates this from the engineering work.

## Out of scope
- The meta-inventory side (extraction, schema authoring) — operator/upstream.
- Any client JS, filter/sort widgets, new palette/type scale.
- Redesigning the home, nav, or existing pages beyond adding S1–S3 and the S5 colophon touch.

## What to hand back
For each surface (S1–S3 at minimum):
1. **Layout & hierarchy** — structure at desktop / 768 / 360 (the overview band, the index entry, the
   panel), annotated.
2. **Component spec in design-system terms** — each element mapped to **semantic tokens** (color, space,
   radius, type role), with states (default / hover / focus) and which existing components it reuses or
   extends.
3. **Responsive + a11y notes** — reflow, heading levels, focus order, and contrast pairings *with ratios.*
4. **Any new tokens/components proposed** — explicitly flagged **ask-first**, with rationale and
   AA-checked values, so the code agent + operator can approve before they enter the system.
5. **Rationale** tied to the settled direction (so we can confirm it stayed serious-not-showy).

Hand back as a **markdown spec**. **No production HTML/CSS needed** — tokens + structure + states is
enough for the code agent to implement.

## References
- System spec + schema + cadence: `docs/project-intelligence.md`
- Decision record: `docs/adr/0009-project-intelligence-feed.md`
- Tokens + component map: `design/DESIGN_SPEC.md` · patterns + AA contract: `docs/design-system.md`
- Layout precedent: `docs/adr/0007-measure-wide-gallery.md` · non-authoritative design output:
  `docs/adr/0005-design-tools-non-authoritative.md`
- The live feed: `public/data/projects.json` · provenance/leak gate: `scripts/check-source-provenance.mjs`
- Activity-timeline idiom to reuse: `experience/index.html` (braid + era sections),
  `experiments/timeline-data.json`
