---
title: Design Critique & Refinement Brief — jvjohnson.dev
category: design
component: design-layer
status: active
version: 1.0.0
last_updated: 2026-06-05
tags: [design-critique, user-journeys, wireframes, attention, handoff-brief]
priority: high
audience: design agent (refinement pass)
---

# Design Critique & Refinement Brief — jvjohnson.dev

Deep critique of the live site through three lenses — **user journeys, attention & focus, wireframe
structure** — written as a brief for a design agent. Reviewed: all 13 pages (homepage, Contact, CV,
Research, Experience, 8 project pages). Stage: refinement, post design-token system.

**Target readers (in order):** (1) frontier-lab hiring manager / senior researcher, (2) AI-safety
grant officer, (3) independent researcher in the same orbit.

## Overall
The hero lands "serious researcher-builder" in two seconds and the token system makes the surface
consistent. The opportunities are **structural**: the differentiated work sits entirely below a
text-dense fold; the Approach section is a one-column scroll that under-uses the screen; and the
conversion path leaks at the ends of journeys.

## Findings

### Resolved this pass
- **Footer regression fixed.** All 12 subpages use `<nav class="footer-links">`; the CSS had been
  dropped in the landing refresh, leaving them unstyled. Restored (tokenized) in `jeffrey.css`.

### User journeys
- **Hiring manager:** proof is **below the fold** — above it is all words (kicker + claim + 2 bio
  paragraphs + location + 3 pills + Now band). Six near-equal Approach cards (+ a 7th, differently
  styled) tax "show me your best thing." The Approach intro ends on the *"not shipped products"* hedge
  before establishing substance.
- **Grant officer:** **flagship semantic gap** — the "Governance Laboratory" card's case study is
  **Budget Triage** (a fintech app); the "bicameral agents governing a real build" link isn't legible
  from the card.
- **All readers — project pages dead-end:** following a card into `projects/*.html` ends at a
  back-link with **no email CTA**. The most engaged readers get no conversion prompt.

### Attention & focus
- Eye order is correct (claim first) but two bio paragraphs delay any proof or action.
- **Mobile:** the primary **Email** pill wraps below GitHub/LinkedIn — primary action sits last.
- Large hero top padding pushes the message down on desktop and mobile.
- Dilution: "Research Foundations" crams **4** links; "Educational Technology" is a `.project-card`
  inside the `.approach-card` grid (a different component, breaking rhythm).

### Wireframe / structure (biggest lever)
The page is locked to the `72ch` prose measure, so the **Approach grid renders as one column at every
width** — six tall cards become a long slog and waste desktop horizontal space. `72ch` is right for
prose, wrong for a card gallery.

```
CURRENT (desktop)                         PROPOSED (direction)
[nav]                                     [nav]
  (big top gap)                           ┌ claim + 1-line bio + [Email*][GH][LI] ┐│ ▎Now
  kicker/claim/bio×2/loc/pills/▎Now       └                                        ┘│ Selected work →
  ───── fold ─────                        ## Approach  (wider "gallery" container)
  ## Approach + intro                     ▢ FLAGSHIP (full-width banner)
  ▢ FLAGSHIP (full width)                 ▢ card  ▢ card
  ▢ card  (×5, single column)             ▢ card  ▢ card   ← 2-up
  ▢ Educational Tech (diff component)     ▢ card  ▢ card   (Ed-Tech folded in; Foundations condensed)
  ## Background / Technical Foundation    ## Background / Technical Foundation
  footer: email CTA                       footer: email CTA

PROJECT-PAGE FOOTER
  current:  …content…  ← Back to Portfolio                    (dead-end)
  proposed: …content…  [ What next? — Email me about this →   ← Back to Approach ]
```

### Consistency
- "Educational Technology" should be an `.approach-card` peer (or leave `#approach`).
- Footer system differs across home (email CTA) / subpages (back-nav) / project pages (neither email):
  unify to back-nav **+** email CTA everywhere.
- `contact.html` provenance is stale (`@ b688384`) vs `index.html` (`@ 1e458f2`) — minor, separate.

### Accessibility
AA verified (5.1–14.2:1), ≥44px targets, skip link, focus rings, reduced-motion, print — all intact.
The footer restore also re-fixes the Experience footer's run-together links.

### What works
Claim-leads hero · primary Email CTA · flagship-first grid · token discipline · calm academic tone ·
strong contrast · the "Now" line.

## Prioritized tasks (for the design agent)
1. **Footer system** — unify back-nav + email CTA across home/subpages/project pages. *(footer CSS
   already restored; this is the structural unification.)*
2. **Project-page conversion footer** — "what next?" band with an email CTA on every `projects/*`.
3. **Approach as a 2-up gallery** — wider container; fold in "Educational Technology" as a peer;
   condense "Research Foundations"; make the flagship→project mapping legible.
4. **Proof above the fold** — condense hero to one bio line + a "Selected work" rail (or a 2–3 item
   flagship teaser); tighten top padding; fix the mobile Email wrap order.

## Guardrails (stay on-system — see `design/DESIGN_SPEC.md`, `docs/design-system.md`)
- Vanilla HTML + single `assets/jeffrey.css`; **tokens only — no raw colors** (the `no-raw-values` CI
  gate fails otherwise; add tokens in `tokens/*.tokens.json` + `npm run tokens`).
- No web fonts; JS stays `assets/menu.js` only; WCAG AA on every changed text/control; verify at
  desktop / 768px / 360px; `mise run ci` must pass.
- **Ask-first / needs an ADR:** a wider "gallery" container (breaking the `72ch` measure) + a
  2-column grid are design-system changes — add a `--measure-wide` token and record in `docs/adr/`.
  Reserve `--accent` for the primary action and the flagship.
- One focused commit per task; zero visual diff except where the change is the point.
