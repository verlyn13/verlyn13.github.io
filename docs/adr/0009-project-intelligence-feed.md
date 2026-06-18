# ADR-0009: Project-Intelligence feed — presentation, cadence, and the delivery gate

- Status: Accepted · Date: 2026-06-16 · Clarified: 2026-06-17

## Context
The project feed (`public/data/projects.json`; its pipeline is described by ADR-0008 / `colophon.html`)
is currently a thesis-level snapshot rendered nowhere. The goal is to make it the instrument that
surfaces the **breadth + depth + method** of a large body of agentic-development projects — evidence they
are designed, spec-driven work, not two-day shells. Three questions needed deciding: how to present many
projects credibly, how the data flows and refreshes, and how that squares with the human-merge gate
(ADR-0008). The presentation question was settled by a focused research pass (2026-06-16).

## Decision
1. **Two layers.** meta-inventory holds a rich, private **knowledge basket** per project; the public feed
   is a **publish-safe projection** (filtered by `tier`/`posture`, held to the leak gate). Private repos
   feed the site without leaking.
2. **Two clocks.** Event-driven basket updates (a project PR fires `repository_dispatch` → re-extract)
   and a **scheduled daily 08:00 ET** feed refresh.
3. **Delivery gate, current vs target (refines ADR-0008).** Current behavior is **PR-delivered and
   operator-merged**: a feed-only diff that passes every gate (no-op-suppressed · provenance · leak ·
   clean-source `kbDirty:false`) is delivered to the website by PR, draft by default, and merge deploys.
   A future **policy-auto-publish** path is allowed only after explicit operator approval and website-side
   policy gate wiring. **All other changes stay human-gated.** The colophon copy states the current
   contract truthfully and changes only when the policy changes.
4. **Presentation: a dense, build-time-grouped index — not a card grid — with no interactive filter at
   this scale.** Research (DeepMind / Karpathy / Gwern / al-folio exemplars; Baymard + NN/g on filtering)
   shows faceted filtering is clutter below exploratory (hundreds-plus) scale: facets are printed inline
   labels, grouping proves breadth, drill-down is the per-project page. A curated front tier leads.
   Interactive filtering is deferred — and if ever added, a small progressive-enhancement JS filter
   (never CSS-only `:has()`, for screen-reader result announcement), which would be ask-first.
5. **Render at build time.** A feed→HTML prebuild (like `build-tokens.mjs`) emits the index + per-project
   panels. **No client JS**; single stylesheet; all current gates apply.
6. **Feed v1** extends v0 with per-project `scope` / `decisions` / `activity` / `method` and a top-level
   `portfolio` meta-analysis. Enrichments are phased (P0 renders v0 fields now).
7. **Agent split.** Claude Code builds (authoritative); Claude Design designs the surfaces from
   `docs/project-intelligence-design-brief-2026-06-16.md` and hands back a **non-authoritative** spec
   the coding agent implements (ADR-0005).

## Consequences
- The daily feed refresh can run hands-off inside `meta-inventory`, but the current website delivery
  posture is still PR-delivered and operator-merged. The stronger policy-as-gate auto-publish story is a
  target evolution, not a claim about today's deploy behavior.
- The colophon remains accurate by naming the current gate. It should not say feed-only diffs
  auto-publish until that policy is explicitly approved and wired.
- GitHub Actions cron is UTC and ignores DST, so 08:00 ET = run at **12:00 and 13:00 UTC**, the job
  no-op'ing the wrong one.
- A new build input (the feed templater) enters the repo; the single-stylesheet + no-JS rules still hold.
- The decision retires the earlier "faceted card gallery" sketch in favor of the dense grouped index.
- No new tokens, palette, theming, or dependencies are introduced by this decision; any the design pass
  proposes are ask-first.

## References
- Spec: `docs/project-intelligence.md` · Contract: `docs/meta-inventory-website-contract.md` · Design brief:
  `docs/project-intelligence-design-brief-2026-06-16.md`
- Builds on: ADR-0008 (colophon/pipeline), ADR-0007 (measure-wide gallery), ADR-0005 (design tools non-authoritative)
