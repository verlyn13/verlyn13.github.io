# Directive — jvjohnson.dev landing refresh (first-impression + conversion)

**For:** the code agent working in this repo (`verlyn13.github.io`).
**Date:** 2026-06-05
**Origin:** design critique of `index.html` (post-2026-06-05 hero edit).
**Status of work already done (do NOT redo):** hero copy rewritten (researcher-builder
lead), Background compressed to one paragraph, footer hedge replaced with an email CTA,
`<title>` + meta description aligned. This directive covers the *remaining* changes.

---

## Goal

A visitor — typically arriving because Jeffrey emailed them from `jeffrey@jvjohnson.dev`
— should, in two seconds, read **"serious researcher-builder"** (not "professor's CV"),
find the interesting work fast, and have one obvious way to make contact. Primary reader
archetypes, in order: (1) a frontier-lab hiring manager / senior researcher, (2) an
AI-safety grant officer, (3) an independent researcher in the same orbit.

## Hard constraints (do not violate)

- **Vanilla HTML/CSS only.** Single stylesheet `assets/jeffrey.css`; JS stays minimal
  (`assets/menu.js` only). No frameworks, no new dependencies, no build-step additions.
- **Reuse existing design tokens** (`--ink`, `--muted`, `--accent`, `--accent-2`,
  `--space-1..5`, `--measure`, `--radius`, `--shadow`). Do **not** introduce new colors,
  fonts, or a second type scale.
- **WCAG 2.1 AA**: changed text ≥ 4.5:1 (≥ 3:1 for large text); interactive targets
  ≥ 44px; keep the skip link, `prefers-reduced-motion`, and print styles intact.
- **Responsive**: verify at the existing `768px` breakpoint (desktop + mobile).
- **Do NOT touch `/research`** — the research statement is an operator-owned rewrite,
  pending and out of scope.
- **Source-first pipeline**: the hero is provenance-tagged to
  `../new-direction-2026/career-transition-ready/website-content/PORTFOLIO-QUICK.md`.
  After landing-page changes, reconcile that source to match and refresh the
  `<!-- source: … @ <sha>; refreshed: <date> -->` comment (see Task 7).
- **Reversible**: commit locally; **do not push**. The operator reviews and pushes
  host-side. Gate every change through `mise run ci` (lint + format-check + build) and
  eyeball `mise run dev`.

## Tasks — do P0, then P1. P2 is backlog; do NOT start it this pass.

### P0-1 — Reweight the hero so the claim leads, not the name
- **Problem**: `.hero-title` is `1.1rem`, `--muted`, weight 400 — the page's most
  important sentence is its quietest element; the `<h1>` name dominates.
- **Change**: promote the positioning line ("Mathematical researcher & systems builder")
  to the visual lead — larger (around `1.5–1.8rem`), `color: var(--ink)`, weight ≥ 600.
  Keep the `<h1>` name present but let the claim carry equal-or-greater weight. The name
  may become a smaller eyebrow/kicker above the claim if that reads cleaner.
- **Files**: `index.html` (hero block), `assets/jeffrey.css` (`.hero-title`, `.hero-home h1`).
- **Acceptance**: at a 2-second glance the *claim* is what registers; contrast of the
  claim ≥ 4.5:1; mobile hero still legible, no overflow at 360px width.

### P0-2 — Make Email the primary call-to-action
- **Problem**: GitHub / LinkedIn / Email are three identical pills; the conversion goal
  has no primary action.
- **Change**: give the Email `.hero-link` a primary treatment (filled `--accent`
  background, white label, or equivalent), keeping GitHub/LinkedIn as the existing
  secondary outline pills. One primary, two secondary.
- **Files**: `index.html` (add a modifier class to the email link), `assets/jeffrey.css`
  (new `.hero-link--primary` rule using existing tokens).
- **Acceptance**: Email is unmistakably the dominant action; primary button text contrast
  ≥ 4.5:1; still ≥ 44px target; hover/active states consistent with existing pills.

### P0-3 — Reorder: Approach above Background
- **Problem**: the differentiated work (Approach cards) sits third, behind credibility.
- **Change**: move the `#approach` `<section>` to immediately follow the hero, before
  `.background-teaser`. Pure block move — keep the in-page anchor `#approach` and the nav
  link working.
- **Files**: `index.html`.
- **Acceptance**: source order is Hero → Approach → Background → Technical Foundation →
  footer; `/#approach` still scrolls correctly; section `border-top` rhythm still reads.

### P1-1 — Signal the flagship in the Approach grid
- **Problem**: six equal cards give no signal about what's lead work. Per the D-001
  rebalance the flagship is the agentic-substrate / governance thread.
- **Change**: visually elevate the flagship card (e.g., span full width at the top of the
  grid, or a subtle "Flagship" tag + stronger border using `--accent`), and let the
  remaining cards read as supporting. Do not add new cards or taxonomy.
- **Files**: `index.html`, `assets/jeffrey.css`.
- **Acceptance**: one card clearly reads as primary; the grid still reflows cleanly at
  768px; no card left visually orphaned.

### P1-2 — Fix the color taxonomy + remove dead CSS
- **Change**: the card top-border colors currently collide (`--ml` & `--complexity` both
  green; `--hardware` & `--infra` both orange). Either map the colors to a real dimension
  or drop per-card color and reserve `--accent` for the flagship only. Delete the unused
  `.approach-card--gateway` rule (LLM Gateway was removed under D-001). Resolve
  `.footer-links` — either use it as footer nav or remove it.
- **Files**: `assets/jeffrey.css` (and `index.html` if adding footer nav).
- **Acceptance**: no two cards share a "meaning" color by accident; no dead selectors for
  removed components; `mise run ci` clean.

### P1-3 — Add a measured "Now" line
- **Change**: add one short, current line near the hero or as a slim band — Sivers
  `/now` style — that signals active work and gives the right reader a reason to reach
  out. Keep it about the *work*, confident, **not** an "Open to work" badge and **not**
  the broadened target-framing. One sentence. Easy to update quarterly.
- **Files**: `index.html` (+ minimal CSS if needed, existing tokens only).
- **Acceptance**: reads as alive and specific, not job-seeking; ≤ 1 sentence; passes AA.

### P2 — BACKLOG (do not start without explicit operator go-ahead)
A `/notes` writing surface (1–3 essays); reader-archetype entry points ("For hiring
managers / collaborators / funders"); a quarterly "Research statement (2026-MM)" page
(operator-owned content — agent must not author it); a CV-download link in the hero;
"what next?" conversion footers on each `/projects/*` page. These are the §7 expansion
from the contemplation doc — valuable, but out of scope for this pass.

## Task 7 — Source reconciliation (after P0/P1 land)
Update `../new-direction-2026/.../PORTFOLIO-QUICK.md` so the hero copy matches the site,
then refresh the provenance comment at the top of `index.html`
(`<!-- source: … @ <new-sha>; refreshed: 2026-06-MM -->`). Commit in nd-2026 locally;
that repo's push stays operator-gated.

## Definition of done
- Source order Hero → Approach → Background; claim leads the hero; Email is the primary
  CTA; flagship card is visually primary; color taxonomy intentional; dead CSS gone; one
  "now" line present.
- `mise run ci` passes; `mise run dev` verified at desktop **and** 768px.
- AA contrast confirmed on every changed text/control.
- Nothing pushed; changes staged for operator review. Source + provenance reconciled.
- P2 left untouched.
