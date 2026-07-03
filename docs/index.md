---
title: Documentation index and current-truth map
category: operations
component: docs-index
status: active
version: 0.1.0
last_updated: 2026-07-03
tags: [documentation, agents, current-state, housekeeping]
priority: high
audience: coding agent + design agent + operator
---

# Documentation index and current-truth map

This file is the repo's housekeeping map. It tells agents which documents are current operating
authority, which are historical handoffs, and where plans live.

## Current operating truth

- **Public positioning:** Jeffrey V. Johnson, Ph.D. is presented as an independent researcher and
  systems builder. The target role language is research engineer / research-engineering roles.
- **Deployment:** merge to `main` deploys through GitHub Pages Actions. `main` is protected by a
  repository ruleset ("main protection"): **direct pushes are blocked — all changes go through a PR**
  with `Code Quality` + `Build Site` + `pre-commit (all files)` green, signed commits, and linear
  history (squash/rebase merge). Do not merge to `main` without explicit operator approval.
- **Local gate:** `mise run ci` is the normal completion gate. It runs provenance/leak checks, Biome
  lint, format check, design-system conformance, token freshness, and the Vite build.
- **Generated files:** `projects/index.html` and `dist/` are generated/ignored. Change
  `build-feed.mjs`, `scripts/feed-model.mjs`, or source HTML instead of hand-editing generated output.
- **Feed delivery:** the website consumes `public/data/projects.json`. Feed updates are PR-delivered
  and operator-merged. Policy auto-publish is future-state only.
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

### Fleet coordination (2026-07 audit remediation)

- `docs/fleet-coordination-2026-07-02.md` is the live ledger for the four-repo Tier 0/1
  remediation: handoffs placed in new-direction-2026, planning-summer-2026, and
  meta-inventory, each owing a handback; operator actions (backup, feed-PR merge) tracked
  there. Read it before doing cross-repo work.

### Project-intelligence feed

- **Done on the website:** P0 build-time body-of-work index from v0 feed fields; curated front tier;
  local model/tests; generated `/projects/`; S3 per-project design-structure hook is wired and
  absent-tolerant.
- **Awaiting upstream feed richness:** top-level `portfolio{}` adoption, per-project `scope{}`,
  `decisions[]`, `activity[]`, and `method{}`. The website must not derive those from private sibling
  repos.
- **Policy boundary:** event-driven refresh and any feed-only auto-publish path remain future-state until
  explicit operator approval and website-side gate wiring.

### Content mirror (Markdown sidecar)

- **Proposed (PR-0 docs landed):** a committed Markdown mirror under `docs/content/` that complements
  the authoritative HTML — for portability, search, and downstream tooling. Contract in
  `docs/markdown-mirror.md`; rationale in `docs/adr/0010-structured-markdown-mirror.md`.
- **Model:** HTML is provenance. Sync is intentional and directional (`content:pull` / `push` /
  `diff` / `check`) — never automatic. Two-way `push` is opt-in **per prose region**, fail-closed,
  and rewrites only marked inner content; layout/data-shaped regions stay `pull_only`; generated
  `projects/index.html` is excluded.
- **Rollout:** PR-1 pull MVP (`parse5`, 2–3 pages) → PR-2 expand + wire integrity `check` into CI →
  PR-3 two-way push on opt-in regions. No code or dependency lands until PR-1.

### Design system

- **Done:** DTCG token sources, Style Dictionary generation, token freshness gate, no-raw-color gate,
  status-pill contrast checker, design spec, design-system docs, ADRs 0001-0007.
- **Open only by explicit approval:** token values, palette, type scale, spacing scale, named patterns,
  theming, new dependencies, or new CSS files.

### Content and IA

- **Done:** homepage position refreshed to independent researcher and systems builder; footer CTA now
  names research-engineering roles; Experience social metadata no longer carries the older positioning.
- **Watch:** historical audit/directive docs may quote older titles because they preserve past baselines.
  Do not rewrite those quotes unless the task is specifically to revise the historical record.

## Historical docs

These files are useful context but not current instructions by themselves:

- `docs/landing-refresh-directive-2026-06-05.md` — completed landing-page directive with P2 backlog
  notes.
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
