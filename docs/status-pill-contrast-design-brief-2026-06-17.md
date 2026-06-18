---
title: Design Brief — status-pill contrast remediation (WCAG AA)
category: design
component: design-layer
status: handoff
version: 1.0.0
last_updated: 2026-06-17
tags: [design-brief, handoff, accessibility, wcag, design-tokens, status-pill, contrast]
priority: high
audience: Claude Design agent
---

# Design Brief — status-pill contrast remediation

**For:** the Claude Design agent — a separate, specialized design pass.
**From:** the code agent in `verlyn13.github.io`.
**Source finding:** backlog #1 in `docs/ia-content-consistency-audit-2026-06-17.md` (the only
AA-breaking item in the 2026-06-17 audit).

## Problem

The `.project-status` pills carry text below the WCAG 2.1 AA contrast minimum for normal text.
The pills are `0.75rem` (~12px), so they require **≥ 4.5:1** (not the 3:1 large-text threshold).
Measured against the current generated token values:

| Pill | Tokens (text on bg) | Ratio | Verdict |
|---|---|---|---|
| `.project-status.live` | `--ok` on `--ok-bg` | 3.69:1 | ❌ FAIL |
| `.project-status.development` | `--accent` on `--accent-light` | 3.91:1 | ❌ FAIL |
| `.project-status.mvp` | `--amber-ink` on `--amber-bg` | 5.16:1 | ✅ PASS (leave as-is) |
| `.project-status.production` | `--accent-2` on `--green-bg` | 3.52:1 | ❌ FAIL |

Rules: `assets/jeffrey.css:492–520`. This violates the design system's own WCAG 2.1 AA contract
(`docs/design-system.md §7`).

## Why this is not a one-line darken

The pills reuse **shared semantic tokens** with site-wide roles — darkening the text token in
place would regress unrelated surfaces. Blast radius in `assets/jeffrey.css`:

| Token | Uses | Other roles (cannot move freely) |
|---|---|---|
| `--accent` | **36** | Primary action + **all link text**. Hard no-touch. |
| `--ok` | 5 | "OK" callouts/affordances besides the live pill |
| `--accent-2` | 5 | Green secondary accent elsewhere |
| `--accent-light` / `--ok-bg` / `--green-bg` | 3 / 2 / 2 | Tint backgrounds shared by other components |

So the text color for the three failing pills must come from **new, pill-scoped "ink" tokens**,
not from the existing semantic tokens.

## Recommended approach

Add three darker, pill-scoped text tokens in `tokens/semantic.tokens.json` and point the three
failing rules at them. Keep hue/saturation identical to the current tokens so the visual family is
unchanged — only lightness drops. Computed maximum lightness that clears 4.5:1 on the *current*
backgrounds (with a little headroom baked into the suggestion):

| New token (suggested name) | Suggested value | On bg | Resulting ratio |
|---|---|---|---|
| `--ok-ink` (live text) | `hsl(140 55% 30%)` | `--ok-bg` | ~4.6:1 ✅ |
| `--accent-ink` (development text) | `hsl(212 85% 40%)` | `--accent-light` | ~4.5:1 ✅ |
| `--accent-2-ink` (production text) | `hsl(160 55% 29%)` | `--green-bg` | ~4.6:1 ✅ |

(Max passing lightness measured: live ≤31%, development ≤41%, production ≤30%; the suggestions sit
just under for margin. `mvp` already passes and needs no change.)

Names are a suggestion — the design agent owns the token vocabulary. An equally valid alternative
is below.

## Alternatives (design agent's call)

- **Darken the tint backgrounds instead** (e.g. deepen `--*-bg` toward ~80% L). Rejected as the
  default because those bg tokens are shared (2–3 uses) and lightening/darkening them shifts other
  components; new text tokens are the more surgical fix.
- **Single neutral pill ink** (one dark token for all pills). Simpler, but loses the green/blue
  status color-coding that the `§5.4 color taxonomy` pattern relies on.

## Constraints (hard rules — see AGENTS.md)

- Tokens are authored in `tokens/*.tokens.json` (DTCG) → regenerated via `npm run tokens`. **Never**
  hand-edit `assets/tokens.generated.css`.
- Components reference **semantic** tokens only; no raw `hsl()` in `assets/jeffrey.css`
  (`npm run conformance` enforces).
- Reserve `--accent` for the primary action / flagship — do not repurpose it here.

## Verify loop

Run **`npm run check:contrast`** (`scripts/check-contrast.mjs`) — it resolves whatever tokens the
`.project-status` rules point at and prints each pill's ratio, exiting non-zero until all four clear
4.5:1. It currently reports the three failures above; it will pass once the new ink tokens land. Use
it as the tight feedback loop while iterating.

## Acceptance criteria

- [ ] `npm run check:contrast` reports all four `.project-status` pills **≥ 4.5:1** (exit 0).
- [ ] `--accent`, `--ok`, `--accent-2` and all link/callout surfaces are visually unchanged.
- [ ] New tokens authored in `tokens/semantic.tokens.json`; `assets/jeffrey.css` references them via
      `var(--token)` only.
- [ ] `npm run tokens` regenerated; `npm run conformance` + `npm run tokens:check` pass; `mise run ci` green.
- [ ] `docs/design-system.md §7` contrast notes updated to record the pill tokens and ratios.
- [ ] Pills verified rendering at desktop / 768 / 360.

## Out of scope

Pill geometry, spacing, font-size, and the dormant feed-driven surfaces that host the pills. This
brief is contrast-only.
