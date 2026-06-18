---
title: IA, Content & Consistency Audit — jvjohnson.dev
category: audit
component: site-wide
status: active
version: 1.0.0
last_updated: 2026-06-17
tags: [audit, information-architecture, navigation, wayfinding, controlled-vocabulary, content, accessibility, design-system]
priority: high
audience: coding agent + design agent + human reviewer
---

# IA, Content & Consistency Audit — jvjohnson.dev

> This document is **both** a reusable audit specification (Part I — re-runnable) **and** the
> executed baseline of **2026-06-17** (Part II — findings + backlog). It adapts a generic
> large-site IA/content/UX audit framework to this site's reality: a 15-page, single-author,
> JS-minimal static portfolio with an already-canonical design system. Consistency phases
> measure **conformance + drift against existing specs**, not a system re-derived from scratch.
>
> Canonical references this audit measures against: `docs/design-system.md`,
> `design/DESIGN_SPEC.md`, `AGENTS.md` (boundaries + triage map),
> `docs/meta-inventory-website-contract.md` (cross-repo owner boundary).

---

## Part I — Audit design (re-runnable)

### 1. Right-sizing decisions (what changed from the generic framework)

| Generic assumption | Reality here | Decision |
|---|---|---|
| CMS export, analytics, search logs as inputs | Static HTML; no analytics/search; single author | Crawl-based; mark assumptions; drop analytics/search-log phases |
| Many content types (course, worksheet, event…) | 4 templates: home, section index, project detail, document page | Collapse content-modeling to a one-line template-consistency check |
| Taxonomy + metadata schema + governance org plan | No taxonomy layer; "tags" are decorative aspect-pills | Cut taxonomy/metadata-schema; keep controlled vocabulary for **labels** |
| ROT-at-scale across hundreds of pages | 15 curated pages | Cut ROT triage; keep targeted duplicate/canonical check |
| Design system "if available" | **Already canonical** (`design-system.md` + `DESIGN_SPEC.md`) | Re-point component + a11y phases to audit **against** these; drift = findings |
| WCAG referenced loosely | Repo declares a **WCAG 2.1 AA contract** (§7) + token gates | Audit verifies the declared contract holds + WCAG 2.2 3.2.3/3.2.4 |
| Owner: Content/Design/Dev | Design changes route through a **separate Design agent**; tokens are **ask-first** | Owner column reflects ask-first / Design-agent lane / upstream-feed |

Two site-specific rules the auditor must respect:

- **`projects/index.html` is a generated build artifact** (gitignored; rendered from
  `public/data/projects.json` via `scripts/feed-model.mjs` + `design-structure.mjs`). Findings
  there route to the **generator**, never hand-edits.
- **Feed surfaces are dormant** (the portfolio overview band + per-project panels render nothing
  until meta-inventory emits v1 fields). Score them **absent-tolerant, not broken**, and
  **never invent project facts** (`docs/meta-inventory-website-contract.md`).

### 2. Inputs (the real ones)

- **Page set (15 entry points, `vite.config.js`):** `index` · `cv` · `contact` · `colophon` ·
  `projects/index` *(generated)* · `experience/index` · `research/index` · 8 project details
  (`budget-triage, flux, dicee, scopecam, maat, the-nash-group, host-capability-substrate,
  symmetry-groups`).
- **Global nav (identical on every page):** `Jeffrey Johnson` (→`/`) · Approach (→`/#approach`) ·
  Work (→`/projects/`) · Experience · Research · CV · Contact. Mobile = same markup collapsed by
  `assets/menu.js`; active state set by path/anchor.
- **Footer:** home = CTA + copyright + Colophon; inner pages add `← Back to portfolio` + one
  cross-link (Contact, except contact.html → CV).
- **No** sitemap.xml/analytics/search/CMS needed at this size — proceed crawl-based.

### 3. Scope

**In:** global/footer nav consistency · title↔H1↔nav↔URL alignment · MECE/scent of the 6 nav
items · controlled vocabulary for recurring labels · duplicate/canonical content (authored vs
feed-generated) · component conformance to the documented catalog · token-pipeline conformance ·
WCAG 2.1 AA contract + 2.2 predictability · anchor-target integrity.

**Out:** taxonomy/metadata modeling · ROT-at-scale · content-governance org plan ·
analytics/search-driven IA · redirects (URLs stable and few).

### 4. Phases (collapsed 10 → 6)

- **A — Inventory & wayfinding alignment.** Per-page: URL, `<title>`, H1, nav label, template,
  reachable-from, purpose. Flag every title/H1/nav/URL disagreement, missing/dup H1, orphan.
- **B — Navigation & IA.** Score 6 nav items for clarity, mutual exclusivity, coverage, scent,
  coherence. Check page-link vs in-page-anchor mix; confirm polyhierarchy is intentional with one
  canonical source per project; verify all anchor targets resolve.
- **C — Labeling & controlled vocabulary.** One preferred term per recurring concept; flag
  cross-surface drift (nav vs title vs H1 vs footer).
- **D — Duplication & canonical ownership.** Separate intentional shared components and authored
  copy from feed-generated rendering; name a canonical home for each change-sensitive block.
- **E — Component & token conformance.** Each catalog component's variants vs documented standard;
  run `npm run conformance`, `npm run tokens:check`, `mise run ci` as evidence.
- **F — Accessibility predictability.** Verify the declared WCAG 2.1 AA contract (§7) + WCAG 2.2
  3.2.3/3.2.4; re-measure status-pill and text-on-accent contrast.

### 5. Scoring rubric

Score 1–5 each: `IA clarity · Navigation consistency · Labeling / controlled vocabulary ·
Content uniqueness & canonical ownership · Wayfinding alignment · Design-system conformance ·
Accessibility predictability` → roll up to **IA maturity /5 · Design-system conformance /5 ·
Priority risk (Low/Med/High)**.

### 6. Deliverables

Executive summary (top fixes) · Phase-A inventory · navigation assessment · controlled-vocabulary
table · duplicate/canonical map · component + token conformance · accessibility findings ·
prioritized backlog (Issue · Evidence · Impact · Fix · Priority · Effort · Owner · Acceptance).

---

## Part II — Executed baseline (2026-06-17)

### A. Page inventory & wayfinding alignment

| Page | `<title>` | H1 | Nav label | Template | Wayfinding |
|---|---|---|---|---|---|
| `/` | Jeffrey V. Johnson, Ph.D. — Mathematical researcher & systems builder | Jeffrey V. Johnson, Ph.D. | (home) | Home | ✅ |
| `/cv.html` | Curriculum Vitae - Jeffrey Johnson | Jeffrey V. Johnson, Ph.D. | CV | Document | ⚠️ H1 is the person, not "Curriculum Vitae" |
| `/contact.html` | Contact - Jeffrey Johnson | Contact | Contact | Document | ✅ |
| `/colophon.html` | Colophon - Jeffrey Johnson | Colophon | (footer only) | Document | ✅ utility page, intentionally not in nav |
| `/projects/` | Body of work - Jeffrey Johnson | Body of work | **Work** | Section index *(generated)* | ⚠️ nav "Work" ≠ H1/title "Body of work" |
| `/experience/` | Experience \| Jeffrey Johnson | **Jeffrey Johnson** | Experience | Section index | ❌ H1 ≠ title/nav "Experience" |
| `/research/` | Research & Publications \| Jeffrey Johnson | Research & Publications | Research | Section index | ✅ (nav abbreviates, acceptable) |
| `/projects/budget-triage.html` | Budget Triage - Enterprise Architecture \| Jeffrey Johnson | Budget Triage | — | Project detail | ✅ |
| `/projects/flux.html` | Flux Pro Shop - Image Generation Control Plane \| Jeffrey Johnson | Flux Pro Shop | — | Project detail | ⚠️ home "Selected work" labels it "Flux" |
| `/projects/dicee.html` | Dicee - Multiplayer Game Engine \| Jeffrey Johnson | Dicee | — | Project detail | ✅ |
| `/projects/scopecam.html` | ScopeCam — USB Microscope Camera App \| Jeffrey Johnson | ScopeCam | — | Project detail | ✅ |
| `/projects/maat.html` | MAAT Framework - Research Foundation \| Jeffrey Johnson | MAAT Framework | — | Project detail | ✅ |
| `/projects/the-nash-group.html` | The Nash Group - Distributed Architecture Foundation \| Jeffrey Johnson | The Nash Group | — | Project detail | ✅ |
| `/projects/host-capability-substrate.html` | Host Capability Substrate - Capability-Boundary Research \| Jeffrey Johnson | Host Capability Substrate | — | Project detail | ⚠️ home labels it "HCS" |
| `/projects/symmetry-groups.html` | Symmetry Groups - Creative Mathematical Visualization \| Jeffrey Johnson | Symmetry Groups | — | Project detail | ✅ |

**Reachability:** no orphans. All 8 project details are reachable from the home page (Selected
work + Approach case-study cards + the "Research Foundations" card) and from `/projects/`. cv /
research / experience are reachable from nav + home "Background" links + footer.

### B. Navigation & IA

| Nav item | Target | Score | Note |
|---|---|---|---|
| Approach | `/#approach` (in-page anchor) | 4 | Only item that is a home-section anchor, not a page; thematic framing overlaps Work (same project pages) — intentional polyhierarchy |
| Work | `/projects/` | 3 | Label drift (see C) |
| Experience | `/experience/` | 3 | H1 mismatch (see A) |
| Research | `/research/` | 5 | Clear |
| CV | `/cv.html` | 5 | Clear |
| Contact | `/contact.html` | 5 | Clear |

- **MECE:** mostly mutually exclusive. The one soft overlap — Approach (thematic) vs Work (full
  index) — is legitimate polyhierarchy: both route to the same canonical project detail pages.
  Keep, but the "Approach = framing / Work = index" distinction should stay legible.
- **Collective coverage:** Colophon is footer-only (intentional utility nav). No content domain is
  orphaned.
- **Anchor integrity:** `#approach` resolves (`index.html`); `/experience/#alaska` resolves
  (`experience/index.html` `id="alaska"`); all seven era anchors exist. **PASS.**
- **Canonical sources:** each project's detail page is the single source of truth; home cards and
  the Work index are navigation paths to it (home cards carry *thesis summaries*, detail pages
  carry the full treatment — distinct, not copied). **No harmful content duplication of project
  facts.** Maintain this rule.

### C. Labeling & controlled vocabulary

| Concept | Variants found | Recommended | Rule |
|---|---|---|---|
| Title brand delimiter | `—` (2: home, scopecam), ` - ` (cv, contact, colophon, projects), ` \| ` (10: experience, research, all project details) | Pick one — ` \| ` is the plurality (10/14) | One delimiter, all pages |
| Author name (in titles/brand) | "Jeffrey V. Johnson, Ph.D." (home, cv H1), "Jeffrey Johnson" (nav-left, footer, all other titles) | Decide canonical brand string | Consistent across nav/footer/titles |
| Project index | nav "Work" · H1/title "Body of work" · URL `/projects/` | Align nav ↔ H1 (one term) | One label per concept |
| Flux | "Flux" (home Selected) vs "Flux Pro Shop" (Approach card, H1) | One display name | Consistent project name |
| HCS | "HCS" (home) vs "Host Capability Substrate" (H1) | Full name + optional "(HCS)" on first use | Avoid bare abbreviation in nav |

No vague/internal labels ("Info", "More", "Stuff") present — nav vocabulary is otherwise strong.

### D. Duplication & canonical ownership

| Cluster | Where | Type | Action |
|---|---|---|---|
| Nav block | every page (hand-copied, no partials) | Intentional component, copy-maintained | Editing requires touching all pages — drift risk. Consider a build-time partial; or accept as a known MPA tradeoff |
| Footer CTA + copyright | 14 authored pages (+ generated on `/projects/`) | Intentional component, copy-maintained | Same as above; the per-page variation (back-link target) is intentional — extract only the invariant block |
| Positioning statement | `<meta description>`, `og:description`, hero-bio — 3 near-variants | Near-duplicate | Define one canonical "elevator statement"; derive the meta variants from it |

No exact-duplicate **pages** and no competing "main page" for any topic.

### E. Component & token conformance

| Gate | Result |
|---|---|
| `npm run conformance` (no raw colors) | ✅ `assets/jeffrey.css` references design tokens only |
| `npm run tokens:check` (generated CSS fresh) | ✅ `assets/tokens.generated.css` matches token sources |
| `mise run ci` (lint + format-check + build) | Not run this pass (docs-only change does not enter the build/lint surface); run before any source change |

Components conform to the documented catalog (`docs/design-system.md §4`). No undocumented
one-off component variants surfaced in this pass.

### F. Accessibility predictability

Skip-link, consistent global nav (WCAG 2.2 **3.2.3**), consistent identification (**3.2.4**),
ARIA labels on external links, and the documented heading hierarchy are present. **One contract
violation:** the status pills fall below the §7 WCAG 2.1 AA contract for normal text (pills are
`0.75rem` ≈ 12px → require ≥ 4.5:1):

| Pill | Tokens (text on bg) | Ratio | Verdict (normal text) |
|---|---|---|---|
| `.project-status.live` | `--ok` on `--ok-bg` | **3.69:1** | ❌ FAIL (AA-large only) |
| `.project-status.development` | `--accent` on `--accent-light` | **3.91:1** | ❌ FAIL (AA-large only) |
| `.project-status.mvp` | `--amber-ink` on `--amber-bg` | 5.16:1 | ✅ PASS |
| `.project-status.production` | `--accent-2` on `--green-bg` | **3.52:1** | ❌ FAIL (AA-large only) |

Fix = darken the three failing text tokens (or their backgrounds) to ≥ 4.5:1. This is a **token
change → ask-first / Design-agent lane**, paired with a `docs/design-system.md §7` contrast-note
update. (Latent where pills render on feed-driven surfaces; fix regardless — it ships in the
deployed stylesheet.)

### Scores (2026-06-17 baseline)

| Category | Score |
|---|---|
| IA clarity | 4 |
| Navigation consistency | 5 |
| Labeling / controlled vocabulary | 3 |
| Content uniqueness & canonical ownership | 4 |
| Wayfinding alignment | 3 |
| Design-system conformance | 5 |
| Accessibility predictability | 3 |

**IA maturity 4/5 · Design-system conformance 5/5 · Priority risk: Medium** (one AA-breaking
item; everything else is consistency polish).

### Prioritized remediation backlog

| # | Issue | Evidence | Impact | Fix | Priority | Effort | Owner | Acceptance |
|---|---|---|---|---|---|---|---|---|
| 1 | 3/4 status pills below AA contrast | `assets/jeffrey.css:502–520`; ratios 3.52–3.91:1 | Low-vision users can't read status; violates §7 contract | Darken failing text/bg tokens to ≥4.5:1 | High | Med | Design-agent (ask-first, token) | All 4 pills ≥4.5:1; §7 notes updated; `conformance`+`tokens:check` pass |
| 2 | Experience H1 = "Jeffrey Johnson" | `experience/index.html:53` | Weak wayfinding for the section | H1 → "Experience" (or "Teaching & Leadership") | High | Low | Content/Dev | H1 names the section; title/nav/H1 agree |
| 3 | Title brand delimiter inconsistent | titles across 14 pages | Inconsistent identification / SEO | Standardize on ` \| ` (plurality) across all pages | Med | Low | Content/Dev | One delimiter site-wide |
| 4 | "Work" vs "Body of work" | nav vs `/projects/` H1/title | Label scent drift | Align nav label ↔ H1 | Med | Low | Design (nav = ask-first) | One canonical term for the index |
| 5 | Author-name brand string varies | nav/footer "Jeffrey Johnson" vs titles "Jeffrey V. Johnson, Ph.D." | Minor identity inconsistency | Pick canonical brand string | Med | Low | Content | Consistent name in titles/nav/footer |
| 6 | Nav/footer hand-copied (no partial) | 15–16 source files | Edit-drift risk | Extract invariant nav/footer to a build-time include | Med | Med | Dev | Single source for nav + footer invariant |
| 7 | Positioning statement has 3 near-variants | `index.html` meta/og/hero | Minor message drift | One canonical elevator statement | Low | Low | Content | Meta variants derive from one source |
| 8 | Flux / "Flux Pro Shop", "HCS" / full name | home vs detail pages | Minor naming variance | One display name per project | Low | Low | Content | Consistent project names across surfaces |

---

## Re-running this audit (agent prompt)

```text
Audit jvjohnson.dev (this repo — 15 static HTML entry points in vite.config.js) for IA,
wayfinding alignment, labeling consistency, content/canonical ownership, design-system
conformance, and WCAG predictability. Single-author academic portfolio; JS-minimal; single
compiled stylesheet; token-driven.

Audit AGAINST (do not re-derive): docs/design-system.md, design/DESIGN_SPEC.md, AGENTS.md,
docs/meta-inventory-website-contract.md. Treat projects/index.html as a GENERATED artifact
(route findings to scripts/feed-model.mjs / design-structure.mjs). Treat the PI overview band +
per-project panels as DORMANT/absent-tolerant. NEVER invent project facts.

A. Per-page inventory: URL, <title>, H1, nav label, template, reachable-from, purpose. Flag
   every title/H1/nav/URL disagreement, missing H1, orphan.
B. Score the 6 nav items; check page-link vs anchor mix; confirm polyhierarchy has one canonical
   source per project; verify all anchor targets (#approach, #alaska, era IDs) resolve.
C. Controlled vocabulary: one preferred label per concept; flag cross-surface drift.
D. Duplicate/canonical map: separate shared components and authored copy from feed-generated
   rendering; name a canonical home for each change-sensitive block.
E. Component + token conformance: catalog variants vs standard; run npm run conformance,
   npm run tokens:check, mise run ci as evidence.
F. Accessibility: verify the WCAG 2.1 AA contract (§7) + WCAG 2.2 3.2.3/3.2.4; re-measure
   status-pill and text-on-accent contrast.

For every finding: Issue · Evidence (file:line) · User impact · Fix · Priority (H/M/L) ·
Effort (H/M/L) · Owner (Content / Dev / Design-agent-ask-first / Upstream-feed) · Acceptance.
Gate proposed changes against `mise run ci`; flag token/nav/sitemap changes as ask-first.
```
