---
title: Documentation index and current-truth map
category: operations
component: docs-index
status: active
version: 0.1.6
last_updated: 2026-07-20
tags: [documentation, agents, current-state, housekeeping]
priority: high
audience: coding agent + design agent + operator
---

# Documentation index and current-truth map

This file is the repo's housekeeping map. It tells agents which documents are current operating
authority, which are historical handoffs, and where plans live.

## Current operating truth

- **Public positioning:** Jeffrey V. Johnson, Ph.D. is presented as a Research Engineer with one
  identity line (2026-07-20): "I build systems that hold work to specification and evidence, whether
  the work comes from people, models, or agents. A result counts only when it can be verified."
  Discipline is general; AI/agent market keywords live in the role line, skills, and project
  evidence, not the identity sentence. Copy voice: simple, direct, first person, no em-dashes.
  The broader mathematical researcher and systems-builder identity is supporting context, not the
  landing-page headline.
- **Deployment:** merge to `main` deploys through GitHub Pages Actions. `main` is protected by a
  repository ruleset ("main protection"): **direct pushes are blocked — all changes go through a PR**
  with `Code Quality` + `Build Site` + `pre-commit (all files)` green, signed commits, and linear
  history (squash/rebase merge). Do not merge to `main` without explicit operator approval.
- **Local gate:** `mise run ci` is the normal completion gate. It runs provenance/leak checks, Biome
  lint, format check, design-system conformance, token freshness, and the Vite build.
- **Generated files:** `projects/index.html` and `dist/` are generated/ignored. Change
  `build-feed.mjs`, `scripts/feed-model.mjs`, or source HTML instead of hand-editing generated output.
- **Feed delivery:** the website consumes `public/data/projects.json`. The complete envelope is validated
  even when no rendered `feed:` comments exist. Feed updates are PR-delivered and operator-merged;
  checker/model changes are website-owned and land separately. Policy auto-publish is future-state only.
- **Feed producer accepted; delivery pending (2026-07-15):** ScopeCam default-main manifest coverage and
  the refreshed 15-project feed were accepted on `meta-inventory` `origin/main` through PR #14 at
  `447ac1c37c77b4b03c42f95fcfee0625e5cf1ea8`. The accepted tree passes deterministic generation and
  enforced gates (a)–(e). Keep this narrative PR feed-free; deliver the accepted artifact only through a
  separate feed-only PR that changes `public/data/projects.json` and still requires operator approval.
- **Visual system:** tokens are authored in `tokens/*.tokens.json`; component CSS uses semantic tokens in
  `assets/jeffrey.css`. Do not hand-edit `assets/tokens.generated.css`.

## Agent read order

1. `AGENTS.md` — canonical project contract, boundaries, and command surface.
2. `README.md` — public repo overview and source-of-truth split.
3. This file — current docs map, plan state, and historical-vs-active distinction.
4. `docs/meta-inventory-website-contract.md` — cross-repo feed ownership and delivery policy.
5. `docs/project-intelligence.md` — feed rendering plan and current phased status.
6. `design/DESIGN_SPEC.md` + `docs/design-system.md` — design-token and component authority.
7. `docs/adr/*.md` — durable rationale. Read the relevant ADR before changing the corresponding system.

## Active plans

### Recruiter-facing narrative

- The homepage leads with Agentic-Coding Evaluation Lab, Governance and agent-control architecture,
  and Budget Triage — financial evidence workbench. It then uses compact public implementation entries
  for Host Capability Substrate and Agentic Architecture Audit, followed by Dicee as representative
  delivery evidence. ScopeCam remains in the grouped breadth layer.
- `docs/resume-skills-landing-handoff-2026-07-07.md` records the implemented July 7 baseline. It is a
  historical handoff, not the current copy authority; the July 15 source reconciliation superseded its
  two-pillar first layer.
- The homepage owns primary-evidence selection and ordering. The generated project index is a grouped
  body-of-work archive and does not define a competing flagship or primary tier.

### Fleet coordination (2026-07 audit remediation)

- `docs/fleet-coordination-2026-07-02.md` is the live ledger for the four-repo Tier 0/1
  remediation: handoffs placed in new-direction-2026, planning-summer-2026, and
  meta-inventory, each owing a handback; operator actions (backup, feed-PR merge) tracked
  there. Read it before doing cross-repo work.

### Project-intelligence feed

- **Done on the website:** P0 build-time body-of-work index; adopted top-level `portfolio{}` aggregate;
  grouped archive without parallel flagship curation; full-envelope admission; `client-deliverable`
  grouping; no-link deployment URL suppression; generated `/projects/`; S3 per-project
  design-structure hook wired and absent-tolerant.
- **Awaiting upstream feed richness:** per-project `scope{}`, `decisions[]`, `activity[]`, and `method{}`.
  The website must not derive those from private sibling repos.
- **Policy boundary:** event-driven refresh and any feed-only auto-publish path remain future-state until
  explicit operator approval and website-side gate wiring.

### Content mirror (Markdown sidecar)

- **Active (pull-only):** a committed Markdown mirror under `docs/content/` complements the
  authoritative HTML — for portability, search, and downstream tooling. All 16 authored pages are
  mirrored (`projects/index.html` excluded as generated). Contract in `docs/markdown-mirror.md`;
  rationale in `docs/adr/0010-structured-markdown-mirror.md`.
- **Model:** HTML is provenance. Sync is intentional and directional (`content:pull` / `push` /
  `diff` / `check`) — never automatic. Two-way `push` is opt-in **per prose region**, fail-closed,
  and rewrites only marked inner content; layout/data-shaped regions stay `pull_only`. Regenerate the
  mirror with `npm run content:pull` after editing a page's `<main>`; do not hand-edit `pull_only`
  files.
- **CI:** `content:check` (integrity only — registry/files/hashes, not HTML↔MD currency) runs in
  `mise run ci`. Drift between HTML and the mirror is surfaced by `content:diff`, resolved on purpose.
- **Two-way (opt-in):** `content:push` is enabled. `dicee.overview` is the first `two_way` region
  (content-sync markers in `projects/dicee.html`, editable at `docs/content/regions/dicee.overview.md`).
  Push is fail-closed: marked inner content only, constrained vocabulary, refuses on `html_hash`
  conflict. Promote more regions by adding markers + a `two_way_regions` entry after the round-trip
  test passes.

### Design system

- **Done:** DTCG token sources, Style Dictionary generation, token freshness gate, no-raw-color gate,
  status-pill contrast checker, design spec, design-system docs, ADRs 0001-0007.
- **Open only by explicit approval:** token values, palette, type scale, spacing scale, named patterns,
  theming, new dependencies, or new CSS files.

### Content and IA

- **Current:** homepage direction now routes through
  the accepted career source: resume/skills first; the specification-and-evidence narrative;
  three lead examples in the order Evaluation Lab, Governance and agent-control
  architecture, and Budget Triage; then compact implementation evidence.
- **Archive boundary:** `/projects/` groups the full body of work by evidence class. It does not
  define another flagship or primary-evidence order.
- **Watch:** historical audit/directive docs may quote older titles because they preserve past baselines.
  Do not rewrite those quotes unless the task is specifically to revise the historical record.

## Historical docs

These files are useful context but not current instructions by themselves:

- `docs/landing-refresh-directive-2026-06-05.md` — completed landing-page directive with P2 backlog
  notes.
- `docs/resume-skills-landing-handoff-2026-07-07.md` — implemented July 7 baseline superseded by the
  July 15 narrative reconciliation; preserve its dated mismatch and two-pillar language as history.
- `docs/design-critique-2026-06-05.md` — addressed critique; read for rationale, not pending work.
- `docs/ia-content-consistency-audit-2026-06-17.md` — dated baseline; table values are historical.
- `docs/status-pill-contrast-design-brief-2026-06-17.md` — handoff that was implemented by PR #9.
- `docs/project-intelligence-design-brief-2026-06-16.md` and
  `docs/project-intelligence-design-spec-2026-06-16.md` — non-authoritative design handoff/spec that the
  current implementation translated into repo code.
- `docs/meta-inventory-agent-directive-2026-06-17.md` and
  `docs/meta-inventory-feed-update-2026-06-17.md` — cross-repo handoffs; verify upstream state live before
  treating their operational details as current.
- `migration-progress.md` — completed token-migration harness record; not a resume point for ordinary
  site work.

## Lessons for future agents

- Keep four truth lanes separate: repo docs, local git/worktree state, generated build artifacts, and
  upstream/operator-controlled systems.
- Prefer build-time rendering and static HTML. Add client JavaScript only when the user explicitly accepts
  that tradeoff.
- For feed-backed public claims, render only fields present in `public/data/projects.json`; request new
  feed fields upstream instead of scraping sibling repos.
- If a doc claims current behavior, verify it against scripts, workflows, and local git state before
  repeating it.
- If a task touches several files, state the file-level plan, then keep the diff small and reversible.
