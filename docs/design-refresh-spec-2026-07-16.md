# Design refresh — spec for jvjohnson.dev (July 2026)

**Date:** 2026-07-16 · **Status:** proposal (ADR-0005 — code is authoritative; this is non-authoritative)
**From:** Claude Design · **For:** the coding agent + operator
**Scope:** P1 design-system consistency + P2 identity & IA + the ask-first batch, in one handback.
**Visual proof:** `previews/design-refresh.html` — the proposed type scale, consolidated pill,
canonical badge, palette nudge, and the type-as-signature hero, all rendered on the *real*
`assets/jeffrey.css` with the proposed tokens layered on top (clearly marked, not production CSS).

**Design against origin/main.** Home findings re-verified against the live "Selected evidence"
Q&A layout (the local checkout is stale). Line numbers are indicative; key off selectors/behavior.

**Non-negotiables honored throughout:** system fonts only; one `--accent` reserved for the primary
action + the single flagship; light theme only; one stylesheet; semantic tokens only (no raw color,
no primitives); WCAG 2.2 AA; `--measure` 72ch / `--measure-wide` 1080px; `header → main → footer`.
Everything below is **serious, not showy** — distinctiveness from contrast, structure, and
disciplined type, not new fonts, animation, or a louder palette.

---

## 0. What changes, at a glance

| # | Work | Priority | Class |
|---|---|---|---|
| 1 | Tokenize the **type layer** (`--text-*` / `--lh-*` / `--fw-*` / `--tracking-*`) | P1 | **ask-first** (type scale) |
| 2 | Add **`--space-6`** + promote **`--section-gap`** to a global token | P1 | **ask-first** (spacing scale) |
| 3 | **One canonical badge** — keep `.project-status`; retire 2 dead systems; fix status-semantics drift | P1 | in-system |
| 4 | **Consolidate the 3× outline pill** into one `.pill` base + modifiers | P1 | in-system |
| 5 | **Palette nudge** — move `--accent` off the generic 212°; optional paper re-temper | ask-first | **ask-first** (palette) |
| 6 | **Merge the two greens** (`--ok` 140° + `--accent-2` 160°) into one | ask-first | **ask-first** (palette) |
| 7 | **Identity:** type-as-signature on the landing (one display-type moment) | P2 | in-system (uses #1) |
| 8 | **IA consistency:** one footer-CTA, one résumé label, one back-link, mono = data only | P2 | in-system |
| 9 | **Nav "Evidence"** — anchor-as-peer decision | P2 | **ask-first** (nav map) |

Items 3, 4, 7, 8 are **in-system** (existing tokens/patterns; implementable once the ask-first
tokens land). Items 1, 2, 5, 6, 9 need operator sign-off before entering the system.

---

# P1 — Design-system consistency

## 1. Type layer — the highest-leverage fix (ask-first: type scale)

**Problem.** There is no type scale. `assets/jeffrey.css` carries ~15 ad-hoc `font-size` values
(`0.65 / 0.68 / 0.7 / 0.72 / 0.75 / 0.78 / 0.8 / 0.85 / 0.9 / 0.92 / 0.95 / 1.05 / 1.08 / 1.15 / 2.2rem`
+ four `clamp()`s), five weights (`400 / 500 / 600 / 650 / 700`), and six line-heights
(`1.15 / 1.2 / 1.4 / 1.45 / 1.5 / 1.55 / 1.6 / 1.65`). Near-duplicates (`0.9` vs `0.92` vs `0.95`;
`1.5` vs `1.55`; `1.05` vs `1.08`) are the root of the drift the brief names. Everything else in the
system is tokenized; type is the gap.

**Fix (lightly tuned — tokenize AND reconcile).** A modular scale rooted at the `16px` base. Fixed
steps for UI/body; three fluid `clamp()` tokens for display/headings. Every current value maps to the
nearest step; near-duplicates collapse.

### 1.1 Size tokens

| Token | Value | ≈px | Replaces (current) | Role |
|---|---|---|---|---|
| `--text-3xs` | `0.75rem` | 12 | `.65 .68 .70 .72 .75` | uppercase eyebrow labels; flagship/status/badge tags; smallest mono facets |
| `--text-2xs` | `0.8125rem` | 13 | `.78 .80 .85` | meta rows, captions, mono stack/source/axis, small pill labels |
| `--text-xs` | `0.9375rem` | 15 | `.90 .92 .95` | secondary body, card thesis/description, list items, `.section-intro`, `.location` |
| `--text-sm` | `1rem` | 16 | `1.0` | **base body** (unchanged) |
| `--text-md` | `1.0625rem` | 17 | `1.05 1.08` | lead/supporting paragraphs, `.hero-bio`, `.hero-pitch`, `.colophon-lead`, `h4` |
| `--text-lg` | `1.1875rem` | 19 | `1.10 1.15` | `h3`, subtitles, `.evidence-card__value` |
| `--text-h2` | `clamp(1.35rem, 1.3vw + 1rem, 1.85rem)` | 22–30 | h2 `…1.9` | section-divider headings (max 1.9 → 1.85) |
| `--text-h1` | `clamp(1.8rem, 2.2vw + 1rem, 2.6rem)` | 29–42 | h1 (unchanged — already clean) | page titles |
| `--text-display` | `clamp(2.35rem, 4.5vw + 1rem, 3.5rem)` | 38–56 | **new** | the home positioning claim only (§7) |

Rationale for the small end: three body-ish sizes (`.90/.92/.95`) collapse to one (`--text-xs`, 15px);
the five sub-`.75` label sizes collapse to `--text-3xs` (12px) — a small legibility gain and a single
"eyebrow" size. `2.2rem` (the old `.highlight-stat h3`, an experience-page stat) folds into `--text-h2`.

### 1.2 Line-height tokens

| Token | Value | Replaces | Role |
|---|---|---|---|
| `--lh-display` | `1.05` | — | `--text-display` + large clamped headings |
| `--lh-heading` | `1.15` | `1.15 1.2` | `h1`–`h4` |
| `--lh-snug` | `1.4` | `1.4 1.45` | compact UI, badges, stat captions |
| `--lh-base` | `1.55` | `1.5 1.55` (= current `--lh`) | body default; keep `--lh` as an alias |
| `--lh-relaxed` | `1.6` | `1.6 1.65` | long prose (`.hero-bio p`, `.era-section__body`) |

### 1.3 Weight + tracking tokens

| Token | Value | Notes |
|---|---|---|
| `--fw-normal` | `400` | body |
| `--fw-medium` | `500` | quiet emphasis, profile links |
| `--fw-semibold` | `600` | headings, primary labels, the display claim |
| `--fw-strong` | `650` | house emphasis — `strong`, eyebrow labels, `.hero-pitch`, `.decision__title` |
| `--tracking-tight` | `-0.02em` | display + headings |
| `--tracking-normal` | `0.01em` | body (current `body` letter-spacing) |
| `--tracking-label` | `0.05em` | uppercase eyebrows (also absorbs the ad-hoc `0.5px` tag tracking) |

The lone `700` (only on `.hero-title`) is retired: at display size, `--fw-semibold` reads plenty bold.
`650` is **kept deliberately** — it is the house "warm-but-not-squishy" emphasis weight; renaming it
away would erase a real texture. Four weights, three tracking steps — closed set.

**States:** type tokens carry no interaction state. **A11y:** all body/label sizes stay ≥ 12px; every
pairing re-checked in §11. **Ask-first:** the scale, line-height, weight, and tracking token sets are
new type-scale vocabulary — sign-off required. No visual redesign: the mapping is 1:1 to today's
sizes with near-duplicates reconciled, so the diff is "quieter and consistent," not "different."

---

## 2. Spacing — `--space-6` + `--section-gap` (ask-first: spacing scale)

**Problem.** The scale stops at `--space-5` (`2rem`). Major section rhythm is ad-hoc: `section` uses
`margin-block: var(--space-5)`, but `.experience-page` declares a **local** `--section-gap:
clamp(3rem, 8vw, 6rem)` that no other page can reach — so the one "big rhythm" value is stranded.

**Fix.**

| Token | Value | ≈px | Role |
|---|---|---|---|
| `--space-6` | `3rem` | 48 | next step (scale ratio holds ≈1.5); big block padding, hero breathing room |
| `--section-gap` | `clamp(2.5rem, 6vw, 4rem)` | 40–64 | **promoted to global**; the standard major-section rhythm |

`--section-gap` becomes a real semantic token; `.experience-page` drops its local override and adopts
it (or keeps a larger `--section-gap-lg` if the braid page wants more air — operator's call, noted).
**Ask-first:** adds a spacing-scale step. **Rationale:** one rhythm system instead of one-page-only.

---

## 3. One canonical badge (P1, in-system)

**Finding (worse than "3 systems, 2 dead").** Three status vocabularies exist:

1. **`.project-status`** (`.live` `.development` `.mvp` `.production`) — **the canonical system.** Used
   on every `projects/*.html`. AA-guarded (pill-scoped `--ok-ink` / `--accent-ink` / `--green-ink`).
2. **`.status-badge` + `.tech-badge`** — **fully dead** (0 markup uses site-wide). Retire.
3. **`.badge--*`** (`production` `live` `development` `tenured`) — a **second** status system stranded
   on `experience/index.html` only; solid fills with `color: white`. Redundant with #1.

**Plus a semantics defect:** every project detail page uses `.project-status development` (blue) as a
catch-all with free-text content — e.g. `flux.html` reads `Production-live · Successor control plane`
inside a *development* (blue) pill; only `dicee.html` uses the correct `.live`. The taxonomy has
collapsed into one decorative chip.

**Fix.**
- **Keep `.project-status` as the single badge.** Retire `.status-badge` / `.tech-badge` (dead) and
  fold `.badge--*` into `.project-status` (map `tenured → .production`-style neutral, `production →
  .production`, `live → .live`, `development → .development`). The experience page loses nothing.
- **Repair the semantics:** each project's pill must use the variant that matches its real state
  (`.live` for live/production-deployed, `.production` for shipped-but-not-public, `.development` for
  active/WIP, `.mvp` for prototype). Keep the free-text label, fix the *class*. This is content-side
  and needs a per-project status pass (list below in §13).
- **Token map (unchanged, canonical):** `.live` → `--ok-bg` / `--ok-ink`; `.development` →
  `--accent-light` / `--accent-ink`; `.mvp` → `--amber-bg` / `--amber-ink`; `.production` →
  `--green-bg` / `--green-ink`. **States:** static (no hover). **A11y:** all four ≥ 4.5:1 (§11) —
  guarded by `npm run check:contrast`; retiring `.badge--*` removes the only `color: white` status text.

**Rationale:** one badge with honest semantics reads as method; three overlapping ones read as drift.

---

## 4. Consolidate the outline pill (P1, in-system)

**Finding.** One recipe is authored three times — `.hero-link`, `.section-link` / `.section-link-btn`,
`.button` — all: `border-radius: 999px; border: 1px solid var(--ring); background: var(--surface-pill);
color: var(--ink); box-shadow: var(--shadow-hard); min-height: 44px;` + the same hover
(`--surface-hover` + `--shadow`) and `:active { translateY(1px) }`. `.cred-copy` is a fourth,
accent-outline variant.

**Fix — one base, thin modifiers:**

| Class | Role | Tokens | States |
|---|---|---|---|
| `.pill` | the shared outline recipe (base) | `--surface-pill`, `--ring`, `--ink`, `--shadow-hard`, `--radius`(999px) | hover `--surface-hover` + `--shadow`; active `translateY(1px)`; focus global `:focus-visible` ring |
| `.pill--primary` | the one filled CTA (was `.hero-link--primary`, `.primary-link`) | `--accent` bg, `--on-accent` text; hover `--accent-dark` | as above |
| `.pill--accent` | accent-outline (was `.cred-copy`) | `--accent` border + text; hover `--accent-subtle`; `.is-copied` → `--accent` fill | as above |
| `.pill--sm` | dense variant (0.85rem label) | inherits | — |

Keep `.hero-link` / `.section-link` / `.button` as **aliases** during migration (same declarations →
`@extend`-style shared rule, or class list `class="pill section-link"`), so no page markup must change
in lockstep. Reserve the filled `--primary` to **one per view** (§5.2 unchanged). **A11y:** `min-height:
44px` stays on the base; focus ring unchanged. **Rationale:** one pill definition = one place to keep
44px targets, hover, and the reserved-accent rule honest.

---

# Ask-first batch — palette (propose with AA-checked values; do not assume)

## 5. Palette nudge — `--accent` off the generic 212° (ask-first)

**Problem.** The brief is right: `hsl(212 85% 45%)` at 85% saturation reads as the default framework
blue, and warm-cream `hsl(45 25% 97%)` amplifies the "template" feel. The paper's hue-complement is
~225°, so the current accent isn't even the most harmonious blue against it.

**Proposal (primary lever — accent).** Shift toward the paper's complement and drop saturation so the
blue reads as *considered ink*, not *UI primary*. Recommended:

| Role (primitive) | Current | **Proposed** | ≈hex |
|---|---|---|---|
| `blue.base` → `--accent` | `212 85% 45%` | **`220 70% 44%`** | `#2256BF` |
| `blue.strong` → `--accent-dark` | `212 85% 35%` | **`220 70% 35%`** | `#1D468F` |
| `blue.ink` → `--accent-ink` | `212 85% 40%` | **`220 70% 40%`** | `#1F4EAD` |
| `blue.light` → `--accent-light` | `212 85% 90%` | **`220 70% 90%`** | `#D4E0F7` |
| `blue.subtle` → `--accent-subtle` | `212 85% 96%` | **`220 70% 96%`** | `#EFF3FC` |
| `ring` / `accent-tint` / `rule-highlight` | `212 85% 45% /α` | **`220 70% 44% /α`** (same α) | — |

**Measured AA (proposed, computed; CI `check:contrast` confirms on build):**
- `--accent` on `--paper`: **6.3:1** (was ~5.0) — text links, ↑ headroom.
- white on `--accent`: **6.7:1** (was ~5.1) — primary CTA, ↑ headroom.
- development pill `--accent-ink` on `--accent-light`: **5.75:1** (was 4.71) — ↑ headroom.

The hue shift is only 8° but combined with S 85→70 and the deeper base it moves decisively off
"bootstrap." A **more distinctive** alternate sits at `225° / 68%` (fuller indigo) if the operator
wants to go further; `220/70/44` is the conservative, all-AA-improving recommendation.

**Proposal (optional secondary lever — paper).** To pull "cream → warm paper-white," lower saturation
only, hold the warmth: `--paper` `45 25% 97%` → **`44 20% 97%`**, with gradient steps
`paper-deep 44 20% 96%`, `paper-deeper 44 20% 94%`, `inset-warm 44 20% 96%`. Near-white luminance is
unchanged, so `--ink`/`--paper` stays **~12.6:1**. This is the lower-risk half — take accent-only,
paper-only, or both. **Do not** touch `--ink` (identity anchor).

**Ask-first:** palette change. **Rationale:** the single ownable color reads as chosen, not defaulted —
and every affected text pair gains contrast, so the nudge is strictly safer, not riskier.

## 6. Merge the two greens (ask-first)

**Problem.** `--ok` `hsl(140 55% 35%)` (success) and `--accent-2` `hsl(160 55% 35%)` ("ship it") are
20° apart — indistinguishable in use, two "meanings" no one can see. You chose **merge**.

**Proposal — one green ramp, both roles alias it:**

| Primitive | **Proposed** | ≈hex | Feeds |
|---|---|---|---|
| `green.base` | **`155 50% 33%`** | `#2A7E5B` | `--ok`, `--accent-2` (both alias this) |
| `green.ink` | **`155 50% 28%`** | `#246C4E` | `--ok-ink`, `--green-ink` (pill text) |
| `green.bg` | **`155 45% 88%`** | `#D3EEE3` | `--ok-bg`, `--green-bg` (pill bg) |

Collapse the separate `ok.*` and `green.*` primitive groups into one `green.*`; point both `--ok` and
`--accent-2` at `green.base` (semantic names stay, single source hue). `155°` sits between the two and
is desaturated a touch for calm; it also separates cleanly from the new `220°` accent and the `22°`
warn. **Measured AA (computed; CI confirms):**
- guarantee ✓ `--ok` / `green.base` on `--paper`: **4.67:1** (small bold text — passes 4.5).
- production/live pill `green.ink` on `green.bg`: **5.2:1** (was ~4.79) — ↑ headroom.

**Note — the one intentional divergence stays:** `.pipeline-step--live` keeps `--ink` text on
`green.bg` (~11:1, body size), distinct from the pill's `green.ink` (small text) — both AA, per
design-system §9. **Ask-first:** palette change. **Rationale:** one green = one meaning; a second
near-identical green was an accident, not a dimension.

---

# P2 — Identity & IA

## 7. The one signature — type as the signature (P2, in-system via §1)

**Problem.** The ownable assets (experience braid, colophon pipeline swimlane, activity-rail) each live
on ≤1 page and **none is on the home**; the landing has no confident moment. The hero currently stacks
three competing lines — `.hero-title` (claim, only `clamp(1.5,…,1.75rem)`), `.hero-pitch`, and a long
`.hero-bio` — so nothing leads at a 2-second glance (violating §5.1 "the claim leads").

**Fix — make the positioning claim the signature, with type alone.** No new graphic, no braid import.

**Home hero hierarchy (top → bottom):**
1. **Name** — `<h1>` kicker, unchanged: `--text-sm` (16px) / `--fw-semibold` / `--muted` /
   `--tracking-label`. (The intentional visual/semantic split, §5.1, is preserved.)
2. **The claim** — `<p class="hero-title">` **"Evaluations and agent-governance engineer"** promoted to
   the display moment: **`--text-display`** (clamp 2.35→3.5rem) / `--fw-semibold` / `--ink` /
   `--lh-display` / `--tracking-tight`. Max-width `18ch` so it wraps to 2–3 taut lines and *owns* the
   first screen. This is the whole signature.
3. **The pitch** — one supporting line: `--text-md` / `--fw-strong` / `--heading`. Keep exactly one
   ("I pair probabilistic AI tooling with deterministic, machine-checkable verification.").
4. **Bio** — condensed to the essential positioning sentence(s), `--text-md` / `--lh-relaxed`,
   `max-width 68ch`. Move the "also a Ph.D. mathematician…" sentence to remain, but tighten so the
   display claim is not pushed below the fold on a laptop.
5. `.location` → `--text-xs` / `--muted`.
6. **Selected-evidence rail** and **pill row** unchanged in structure (§4 pill applies).

**Retire the dead `.hero-now`** CSS (§5.5 pattern, 0 uses) — *or* deploy one real "Now · Q3 2026" line
below the pitch if the operator wants the measured-current signal. Recommend **retire** unless it will
be maintained quarterly; a stale "Now" is worse than none. (Flagged for the coding-agent dead-code
sweep, not folded here.)

**Responsive:** display clamp already fluid — 3.5rem desktop / ~2.8rem @768 / 2.35rem @360; the `18ch`
cap keeps line count sane at every width. **A11y:** claim `--ink` on `--paper` = **12.6:1**; it is a
`<p>`, not a heading, so hierarchy is untouched; at ≥24px it clears large-text AA with vast margin.
**States:** none (static text). **Rationale:** the most restrained possible signature — the site's
actual thesis, set with conviction. Serious, not showy: no ornament, just scale and space doing the work.

## 8. IA consistency (P2, in-system)

### 8.1 Footer-CTA — one message (currently three)

**Finding.** 11 of 13 pages still lead the footer with the **old positioning**: *"Open to
research-engineering roles and research collaboration where mathematical depth meets agentic-systems
engineering."* Only `index.html` and `cv.html` use the new evals/governance pitch — and those two
differ from each other. This directly contradicts the resume handoff's rule that the
"independent researcher / mathematical depth" phrasing must not lead.

**Fix.** One canonical `.footer-cta` string site-wide, aligned to the current positioning — the
home's version is the reference:
> *"Open to evaluations, agent-governance, and safeguards-infrastructure roles where probabilistic AI
> tooling needs deterministic verification. The fastest way to reach me is email: …"*
Apply verbatim to all 13 pages. Component/tokens unchanged (`.footer-cta`, `--ink`, `--text-xs`); the
email stays a plain `--accent` text link (never filled — one filled action per view, §5.2).

### 8.2 Résumé label — one spelling, one word

**Finding.** "Resume" (nav) vs "Current résumé" / "Full resume" / "AI/ATS version" (hero pills) vs
"Open resume" (cv button) vs the page living at `/cv.html`. Mixed accent + mixed noun.

**Fix.** Pick **unaccented "Resume"** as the UI label everywhere (ASCII, ATS-safe, matches nav). Hero
pills: "Current resume ↓", "AI/ATS resume ↓", "Full resume →". Keep "résumé" only inside prose
sentences if desired, never in a control label. (URL `/cv.html` vs `/resume.html` stays the open
decision from the resume spec §7 — out of scope here.)

### 8.3 Back-link — one affordance

**Finding.** Subpages carry up to three back paths: the top `.back-nav` ("← back"), a
"← Back to Evidence" `.section-link` in the conversion band, and `.footer-links`. All point at
`/#evidence`.

**Fix.** Make **`.footer-links` "← Back to portfolio"** the single canonical back affordance (per
design-system §4.8). Drop the top `.back-nav` bar on content subpages (keep only where a page is a
true child needing immediate escape — operator's call per page). In project conversion bands, keep the
*forward* actions (live-site link, "Email me about this") but let the footer own "back." Normalize
casing to **"Back to portfolio"** (not "…Portfolio", not "…Evidence" — see §9). **A11y:** `.footer-links`
is already a labeled `<nav>`; no change.

### 8.4 Mono = machine-checkable data only

**Rule.** `--mono` is reserved for **verifiable machine tokens**: tech stacks (`.tech-tag`,
`.aspect-tag`, `.ds-row__facet--tech`, `.resume-entry__stack`), DOIs (`.doi`), commit/source refs
(`.decision__source`), chart axes (`.activity-rail__axis`), counts/SHAs/paths. It is **not** a
decorative "techy" texture. Audit result: current usage is already close to compliant — enforce the
rule as a written contract in `docs/design-system.md` §2.3 and reject future mono-as-flavor. Counts in
prose (`.portfolio-overview__metric`) correctly use **sans + `tabular-nums`**, not mono — keep that.

### 8.5 Color taxonomy — trim accidental accent

**Finding (§5.4 drift).** `--accent` leaks beyond "primary action + flagship": `.course-cat`,
`.publication-details`, `.theory-area h3`, `.significance-point h3`, `.topic-area h4`, `.year`,
`.pillar-card` top-border all paint accent decoratively. **Fix.** Demote decorative accent to
`--ink`/`--heading`/`--border` on non-flagship, non-CTA elements; keep accent for links, the one CTA,
and the single flagship. (Low-risk cleanup; can ride the dead-code sweep.)

---

## 9. Nav "Evidence" — anchor-as-peer (ask-first: nav map)

**Finding.** Nav lists `Evidence` (→ `/#evidence`, an in-page anchor) as a peer of real pages (`Work`,
`Experience`, `Research`, `Resume`, `Contact`). On every subpage "Evidence" jumps back to a home
anchor — and the on-home section is titled **"Selected evidence,"** so the label doesn't even match.

**Recommendation (operator sign-off — nav-map change).** The home *is* the evidence page. Preferred:
**drop "Evidence" from the top nav** and let the brand/logo (already → `/`) be the path home; the
hero's "Selected evidence" rail carries in-page jumping. Alternative if a nav entry is wanted: rename
to **"Home"** (→ `/`) or keep "Evidence" but point it at `/` (not `/#evidence`) and rename the subpage
back-pills "← Back to portfolio" (§8.3) so no user-facing string says "Evidence" as a destination.
Either way, retire the "Back to Evidence" pill copy. **Rationale:** peers in a nav should be
destinations; an anchor masquerading as a page is the kind of small incoherence that reads as unfinished.

---

## 10. Per-surface layout & hierarchy (desktop / 768 / 360)

Only the **home hero** changes structurally (§7); every other surface inherits the token swaps
(§1–§6) and the consistency fixes (§8) with no layout change. Annotated:

**Home hero** (`main.home > .hero-home > .container`, self-caps at `--measure`):
- **Desktop (≥769px):** kicker → **display claim** (`--text-display` ~3.5rem, `18ch`, 2–3 lines) →
  pitch → bio (`68ch`) → evidence rail (inline, wraps) → pill row (wraps). Claim owns the top third.
- **768px:** claim ~2.8rem (clamp mid); everything else full-width single column; pill row wraps to
  2–3 rows, primary pill first (existing `order:-1`).
- **360px:** claim ~2.35rem (clamp floor), still `18ch` so ~3–4 short lines; kicker/pitch/bio stack;
  pills full-width-ish, 44px targets preserved.
- Below the hero, `.credentials` / `.evidence` / `.background-teaser` unchanged; each opens on a
  `border-top` + `--text-h2` divider; section rhythm can adopt `--section-gap` (§2).

**All other pages:** structure unchanged. They receive: canonical footer-CTA (§8.1), résumé labels
(§8.2), single back-link (§8.3), canonical badge + repaired status classes (§3), consolidated pills
(§4), and the palette/type/green token values (§1, §5, §6). Verify each at desktop / 768 / 360.

---

## 11. Accessibility contract (WCAG 2.2 AA) — measured

Baseline pairs that **do not change**: `--ink`/`--paper` **12.6:1**, `--muted`/`--paper` **5.5:1**,
`--muted`/`--inset-warm` **5.4:1**. Claim as display: `--ink`/`--paper` **12.6:1** (≥24px → far past
large-text 3:1). Kicker `--muted`/`--paper` **5.5:1**.

Pairs that **change (all computed; `npm run check:contrast` + `npm run conformance` are the gate):**

| Pair | Old | Proposed | Floor | Pass |
|---|---|---|---|---|
| `--accent` text on `--paper` | ~5.0 | **6.3** | 4.5 | ✓ |
| white on `--accent` (primary CTA, flagship tag) | ~5.1 | **6.7** | 4.5 | ✓ |
| dev pill `--accent-ink` on `--accent-light` | 4.71 | **5.75** | 4.5 | ✓ |
| live/prod pill `green-ink` on `green-bg` | 4.79 | **5.2** | 4.5 | ✓ |
| guarantee ✓ `--ok`/green on `--paper` (small bold) | — | **4.67** | 4.5 | ✓ |
| `.pipeline-step--live` `--ink` on `green-bg` | ~11 | **~11** | 4.5 | ✓ |

Targets ≥ 44px (pill base, §4). Focus: global `:focus-visible` 3px `--ring` — the `--ring` alpha now
derives from the new `220°` accent; still ≥ 3:1 against `--paper`. Motion + print blocks unchanged.
**Every changed text/control is at or above its old ratio** — the refresh raises the AA floor.

---

## 12. Ask-first summary (gate before entering the system)

| Item | Proposed value(s) | AA-checked | Rationale |
|---|---|---|---|
| **Type scale** (§1) | `--text-*` (12→display), `--lh-*` (1.05–1.6), `--fw-*` (400/500/600/650), `--tracking-*` | all pairs §11 | root-cause fix for drift; 1:1 remap, near-dupes reconciled |
| **`--space-6` + `--section-gap`** (§2) | `3rem`; `clamp(2.5rem,6vw,4rem)` | n/a (spacing) | one rhythm system, not one-page-only |
| **Palette — accent** (§5) | `--accent` `hsl(220 70% 44%)` + ramp | 6.3 / 6.7 | off the default blue; harmonious complement; ↑ contrast |
| **Palette — paper** (§5, optional) | `--paper` `hsl(44 20% 97%)` + steps | ink/paper ~12.6 | "cream → warm paper-white"; lowest risk |
| **Green merge** (§6) | one `green.*` ramp `155°` | 4.67 / 5.2 | one green = one meaning |
| **Nav "Evidence"** (§9) | drop / rename-to-Home / point-at-`/` | n/a | peers should be destinations |

---

## 13. Repo implementation map (for the coding agent)

1. **Tokens first (ask-first-gated):** add `--text-*` / `--lh-*` / `--fw-*` / `--tracking-*` to
   `tokens/*.tokens.json`; add `space.6`; add semantic `--section-gap`. If palette/green approved:
   edit `palette.blue.*`, merge `palette.ok.*`+`palette.green.*` → `palette.green.*`, optional
   `palette.paper.*`. Run `npm run tokens` (never hand-edit `assets/tokens.generated.css`).
2. **Sweep `jeffrey.css`** replacing literal `font-size`/`line-height`/`font-weight`/`letter-spacing`
   with the tokens per §1 tables; `2rem`→`--space-6` / `--section-gap` where appropriate.
3. **Badge (§3):** delete `.status-badge`/`.tech-badge` rules; fold `.badge--*` into `.project-status`;
   fix per-project status classes — `dicee`→`.live`✓; `flux` "Production-live"→`.live`; each of
   `scopecam / host-capability-substrate / maat / symmetry-groups / the-nash-group / budget-triage`
   set to its true state (content pass).
4. **Pill (§4):** introduce `.pill` base + `--primary`/`--accent`/`--sm`; alias existing classes.
5. **Home hero (§7):** promote `.hero-title` to `--text-display`; trim competing lines; retire (or
   deploy) `.hero-now`.
6. **Consistency (§8):** one `.footer-cta` string ×13 pages; résumé labels; single back-link; mono
   contract into `docs/design-system.md` §2.3; demote decorative `--accent`.
7. **Nav (§9):** per operator decision.
8. **Docs:** bump `docs/design-system.md` `version` + `last_updated`; add the type/space tokens to §2,
   the type scale to §3, the badge consolidation to §4.5, the pill base to §4.3; update
   `design/DESIGN_SPEC.md` vocabulary. Gate everything with `mise run ci` (lint + format-check +
   conformance + tokens-fresh + `check:contrast` + build); verify desktop / 768 / 360.

---

## 14. Why this is serious, not showy

Every move removes a source of incoherence rather than adding decoration. The type scale makes the
type *disciplined* (the brief's word); the single badge and single pill make the system *legible*; the
palette nudge makes the one color read as *chosen*; the merged green removes a distinction no one could
see; the type-as-signature hero gives the page *one* confident moment using nothing but the site's own
words at scale. Nothing new is asked of the visitor, and nothing louder is asked of the brand — the
restraint that is the point survives, sharpened. Distinctiveness here is contrast, structure, and type.
