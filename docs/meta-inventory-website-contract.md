---
title: Meta-inventory / website project-intelligence contract
category: architecture
component: project-intelligence-feed
status: active
version: 0.2.1
last_updated: 2026-07-15
tags: [project-intelligence, meta-inventory, website, feed, provenance, responsibility]
priority: high
audience: coding agent + design agent + operator
---

# Meta-inventory / website project-intelligence contract

This document fixes the boundary between `../meta-inventory` and this website repo for the
project-intelligence feed. The short version:

- `meta-inventory` owns the private knowledge baskets, validation, feed generation, freshness cadence,
  and cross-repo delivery proposal.
- `verlyn13.github.io` owns the public presentation, the consumed feed copy, build-time rendering,
  website-side leak/provenance checks, and deploy behavior.
- Project repos own their own manifests and status-of-record files.
- The operator owns source-of-truth flips, token provisioning, merges, and pushes to deployment branches.

Companion handoff for the upstream agent:
`docs/meta-inventory-agent-directive-2026-06-17.md`.

## Current state vs target evolution

Current contract:

- `meta-inventory` generates `exports/projects.json`.
- The website consumes that artifact at `public/data/projects.json`; Vite publishes it as
  `/data/projects.json`.
- Producer delivery stages only the feed artifact. The website's model, checker, and checker
  configuration are consumer-owned; the producer's retired `--include-checker` option is not an intake
  path.
- Delivery is PR-only. The `meta-inventory` helper opens a draft PR by default when the target repo,
  destination path, and `WEBSITE_PR_TOKEN` gate are configured.
- The operator reviews and merges the website PR. On this repo, merge or push to `main` deploys.
- Website compatibility code and feed delivery use separate PRs. A compatibility PR starts from clean
  remote website `main`; a later feed-only PR starts only after every producer gate passes.

Current intake verdict (2026-07-15): **HOLD**. ScopeCam default-main manifest coverage is complete, and
the refreshed producer candidate in draft PR #14 passes its enforced gates, but that state is not yet
accepted on `meta-inventory` `origin/main`. Do not copy the candidate into this narrative branch or use
an active dirty website checkout as a delivery target. Feed delivery begins only after the producer
change is accepted on its default branch and the gates pass from that accepted state.

Target evolution:

- A feed-only, gate-passing diff may later become policy-auto-published on a daily cadence.
- That is not the current live delivery contract. It requires an explicit operator decision, website-side
  policy gate wiring, and updated public copy.
- Non-feed changes always remain human-gated: HTML, CSS, design-system changes, build scripts, workflow
  edits, and new public claims do not auto-publish.

## Responsibility matrix

| Owner | Owns | Does not own |
|---|---|---|
| Project repos | `project.yaml` manifests, local status-of-record files, repo-specific truth, optional event triggers after PR/merge | Public portfolio layout, cross-project ranking, website deploys |
| `meta-inventory` | Private knowledge baskets, enum vocabulary, KB validation, manifest harvesting, `exports/projects.json`, feed schema, freshness/staleness measurement, run logs, draft website PR delivery | Final website presentation, live deploy approval, hand-authored detail-page prose |
| `verlyn13.github.io` | `public/data/projects.json`, feed-to-view model, build-time HTML rendering, fallback behavior, provenance/leak CI, colophon, public UX, GitHub Pages deploy | Private KB fields, source project scraping, upstream enrichment, token issuance |
| Operator | Delivery target confirmation, `WEBSITE_PR_TOKEN`, surface flips, review/merge, push approval for `main` | Automated derivation, schema enforcement, no-op detection |

## Interfaces

### Feed file

- Producer: `../meta-inventory/exports/projects.json`.
- Consumer copy: `public/data/projects.json`.
- Deployed URL: `/data/projects.json`.
- Current schema: v0, documented upstream in `../meta-inventory/docs/feed-schema.md`.
- Website model: `scripts/feed-model.mjs`, which normalizes the feed for build-time presentation.

The website may render only fields present in the public feed. It must not scrape sibling repos or
private upstream files to fill presentation holes. If a public surface needs a new fact, that is an
upstream feed requirement, not a website-local derivation.

### Provenance and leak checks

- `scripts/provenance-producers.json` configures the `meta-inventory-feed` producer.
- `scripts/check-source-provenance.mjs` validates the entire feed before it discovers rendered
  `<!-- feed: ... -->` comments. Zero comments do not disable admission.
- Whole-feed admission rejects unsupported schema, dirty/stale/degraded provenance, non-passing or
  nonzero-error manifest health, nonzero selected-manifest missing/disagreement counts, duplicate IDs,
  and a `portfolio.projectCount` / `projects.length` mismatch.
- Feed comments remain supplemental record-level provenance: the checker compares their feed path,
  `kbSha`, `asOf`, dirty state, and project ID with the admitted feed.
- Configured forbidden strings are checked in both the feed data and each rendered feed surface.

### Freshness and delivery gates

`meta-inventory` must pass, at minimum:

- `python3 scripts/validate_knowledge_base.py --emit-projection`
- `python3 scripts/generate_feed.py --check`
- `python3 scripts/generate_feed.py --gate-report --require-gate-pass`

The website must pass, at minimum:

- `mise run ci`
- the provenance/leak check configured in the deploy workflow
- visual review when a surface flip changes public presentation

## Adopted and pending feed fields

Already adopted in the accepted feed:

- Top-level `portfolio{}`: project count, domains, languages, first/last active dates, deployed count,
  and recurring methods. The website uses this block when present and retains a compatibility fallback
  only for older schema-0 feeds that omit it.
- Verified `deploymentUrls[]` for public-linkable deployed systems.

Consumer support implemented for the gate-green producer candidate (not yet accepted upstream or
present in the accepted website copy):

- Per-project `operationalState` and `publicLinkable`. Runtime state does not imply a public URL;
  `publicLinkable=false` suppresses every deployment link regardless of other link fields.

Pending per-project richness:

- Per-project `scope{}`: active span, languages, modules, releases, tests/CI, license.
- Per-project `decisions[]`: two to five publish-safe decision labels/summaries, with no private URLs.
- Per-project `activity[]`: dated commit buckets, releases, milestones, and phase transitions.
- Per-project `method{}`: governance gates, enforced boundaries, spec-driven markers, agentic workflow
  markers.

Until the pending fields are present and gated, their presentation remains absent-tolerant and long-form
detail-page prose remains hand-authored.

## Source-of-truth rules

- The private basket may know more than the public feed. The public feed is a publish-safe projection,
  not a complete export.
- `unknown` is honest data. It may render quietly, but it blocks a surface flip when it would replace
  richer hand-authored public copy.
- `kbDirty: true`, stale or degraded feed state, manifest-health/coverage failures, duplicate IDs,
  unsupported schema, aggregate-count mismatch, forbidden strings, or a mismatched `asOf` comment stop
  publication.
- The website owns fallback behavior. When a project fails the feed-as-source-of-truth gate, the site
  keeps its hand-authored copy for that surface.
- The feed is an input to presentation, not the exhibit. Public pages should make projects, scope, and
  evidence legible without making the feed mechanics the main story.

## Change protocol

- Upstream schema changes start in `meta-inventory` and must be reflected here before website rendering
  depends on them.
- Feed delivery may update only `public/data/projects.json`; checker/model changes originate in this
  repository and land independently.
- Website presentation changes can request new feed fields, but should name them as feed requirements
  rather than deriving them locally.
- Auto-publish is an explicit future policy change, not an implication of the feed existing.
- Any change that touches GitHub Actions, delivery tokens, site map, or design-system tokens remains
  ask-first under `AGENTS.md`.
