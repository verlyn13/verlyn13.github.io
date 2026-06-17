# Directive — meta-inventory project-intelligence work for jvjohnson.dev

**For:** the coding agent working in `/Users/verlyn13/Repos/verlyn13/meta-inventory`.
**Date:** 2026-06-17
**Origin:** website-side role clarification in
`/Users/verlyn13/Repos/verlyn13/verlyn13.github.io/docs/meta-inventory-website-contract.md`.
**Status:** directive / handoff. Do not treat this as proof the upstream work is done.

---

## Goal

Strengthen `meta-inventory` as the project-intelligence producer for
`/Users/verlyn13/Repos/verlyn13/verlyn13.github.io` without blurring ownership.

The website needs `meta-inventory` to host and generate richer project information as a
publish-safe projection. The website should not invent missing project facts locally. It should consume
`/Users/verlyn13/Repos/verlyn13/meta-inventory/exports/projects.json` after delivery to
`/Users/verlyn13/Repos/verlyn13/verlyn13.github.io/public/data/projects.json`, render public facts at
build time, and retain hand-authored fallbacks until a surface is explicitly flipped.

## Read first

Website-side contract and consumer requirements:

- `/Users/verlyn13/Repos/verlyn13/verlyn13.github.io/docs/meta-inventory-website-contract.md`
- `/Users/verlyn13/Repos/verlyn13/verlyn13.github.io/docs/project-intelligence.md`
- `/Users/verlyn13/Repos/verlyn13/verlyn13.github.io/docs/adr/0009-project-intelligence-feed.md`
- `/Users/verlyn13/Repos/verlyn13/verlyn13.github.io/scripts/feed-model.mjs`
- `/Users/verlyn13/Repos/verlyn13/verlyn13.github.io/public/data/projects.json`
- `/Users/verlyn13/Repos/verlyn13/verlyn13.github.io/scripts/check-source-provenance.mjs`
- `/Users/verlyn13/Repos/verlyn13/verlyn13.github.io/scripts/provenance-producers.json`

Upstream producer and delivery context:

- `/Users/verlyn13/Repos/verlyn13/meta-inventory/CLAUDE.md`
- `/Users/verlyn13/Repos/verlyn13/meta-inventory/docs/feed-schema.md`
- `/Users/verlyn13/Repos/verlyn13/meta-inventory/docs/decisions/0002-project-intelligence-spec.md`
- `/Users/verlyn13/Repos/verlyn13/meta-inventory/docs/runbooks/freshness-cadence.md`
- `/Users/verlyn13/Repos/verlyn13/meta-inventory/docs/delivery/cutover-handshake.md`
- `/Users/verlyn13/Repos/verlyn13/meta-inventory/docs/delivery/provenance-checker-generalization.md`
- `/Users/verlyn13/Repos/verlyn13/meta-inventory/scripts/validate_knowledge_base.py`
- `/Users/verlyn13/Repos/verlyn13/meta-inventory/scripts/generate_feed.py`
- `/Users/verlyn13/Repos/verlyn13/meta-inventory/scripts/run_freshness_cadence.sh`
- `/Users/verlyn13/Repos/verlyn13/meta-inventory/scripts/open_website_pr.sh`
- `/Users/verlyn13/Repos/verlyn13/meta-inventory/config/feed-overrides.yaml`
- `/Users/verlyn13/Repos/verlyn13/meta-inventory/data/raw/manifests-snapshot.json`
- `/Users/verlyn13/Repos/verlyn13/meta-inventory/exports/projects.json`

## Current contract to preserve

- `meta-inventory` owns private knowledge baskets, validation, feed generation, schema evolution,
  freshness/staleness measurement, run logs, and website delivery proposal.
- `verlyn13.github.io` owns public rendering, the consumed feed copy, fallback behavior, provenance/leak
  checks, public copy, and GitHub Pages deployment.
- Project repos own their own `project.yaml` manifests and local status-of-record files.
- The operator owns `WEBSITE_PR_TOKEN`, target confirmation, source-of-truth surface flips, merges, and
  pushes to deployment branches.

Current website delivery is **PR-delivered and operator-merged**. A feed-only auto-publish path is a
future policy option only after explicit operator approval and website-side policy gate wiring. Do not
write docs or PR bodies that imply auto-publish is already live.

## Non-negotiable boundaries

- Do not push directly to `/Users/verlyn13/Repos/verlyn13/verlyn13.github.io` `main`.
- Do not bypass `WEBSITE_PR_TOKEN`; absence of that token is a delivery gate, not a problem to route
  around.
- Do not make the website scrape private `meta-inventory` files or sibling repos to fill presentation
  holes. Missing public fields are upstream feed requirements.
- Do not leak private repo names, private URLs, branch names, spend/infra details, notes, internal
  source SHAs, or anonymized organization names into the public feed.
- Do not replace richer hand-authored website copy with `unknown` feed fields. `unknown` is honest data,
  but it blocks source-of-truth flips where it would reduce public quality.

## Work needed in meta-inventory

### P0-1 — Reconcile producer docs with the website contract

Update upstream docs so they match the current delivery truth:

- `/Users/verlyn13/Repos/verlyn13/meta-inventory/docs/runbooks/freshness-cadence.md`
- `/Users/verlyn13/Repos/verlyn13/meta-inventory/docs/delivery/cutover-handshake.md`
- `/Users/verlyn13/Repos/verlyn13/meta-inventory/docs/feed-schema.md`
- `/Users/verlyn13/Repos/verlyn13/meta-inventory/docs/decisions/0002-project-intelligence-spec.md`

Required wording:

- Current delivery: feed-only diffs are generated in `meta-inventory`, delivered to the website by PR,
  draft by default, and deployed only after operator merge.
- Future target: feed-only, gate-passing auto-publish is allowed only after an explicit policy decision
  and website-side wiring.
- Non-feed website changes remain human-gated.

Acceptance:

- No upstream doc says or implies that feed-only website changes auto-publish today.
- The target destination is explicit:
  `/Users/verlyn13/Repos/verlyn13/verlyn13.github.io/public/data/projects.json`.

### P0-2 — Keep the delivery helper gated and narrow

Preserve and verify the current delivery shape in:

- `/Users/verlyn13/Repos/verlyn13/meta-inventory/scripts/open_website_pr.sh`
- `/Users/verlyn13/Repos/verlyn13/meta-inventory/scripts/run_freshness_cadence.sh`
- `/Users/verlyn13/Repos/verlyn13/meta-inventory/config/cadence.conf.example`
- `/Users/verlyn13/Repos/verlyn13/meta-inventory/.github/workflows/freshness-cadence.yml`

Expected behavior:

- No target repo, no destination path, or no `WEBSITE_PR_TOKEN` means no cross-repo GitHub write.
- Delivery opens a website PR, draft by default.
- Delivery never pushes to the website default branch and never auto-merges.
- Feed path remains `exports/projects.json` upstream and `public/data/projects.json` in the website.

Suggested config values to document, not hardcode into tracked secrets:

```bash
WEBSITE_REPO=verlyn13/verlyn13.github.io
WEBSITE_BASE=main
FEED_DEST_PATH=public/data/projects.json
```

### P0-3 — Preserve source-of-truth gates

The feed should become a source of truth only per surface, not all at once. Preserve or improve checks
around:

- `kbDirty == false`
- stale/freshness signal derived from commit freshness, not CI run time
- leak/allowlist violations
- schema validity
- manifest join validity
- `thesis` and `statusLine` not `unknown` for flipped surfaces
- verified `deploymentUrls[]` for deployed systems
- operator approval for each surface flip

Relevant files:

- `/Users/verlyn13/Repos/verlyn13/meta-inventory/scripts/validate_knowledge_base.py`
- `/Users/verlyn13/Repos/verlyn13/meta-inventory/scripts/generate_feed.py`
- `/Users/verlyn13/Repos/verlyn13/meta-inventory/docs/delivery/cutover-handshake.md`

Acceptance:

- `python3 scripts/generate_feed.py --gate-report` keeps reporting why a surface is not eligible.
- Unknown fields are visible and honest, but they do not silently pass the flip gate.

### P1-1 — Host the website-required v1 fields upstream

Add the schema and generator path for the fields the website needs. Do not derive these in
`verlyn13.github.io`.

Required top-level field:

- `portfolio{projectCount, domains[], languages[], firstActive, lastActive, deployedCount, recurringMethods[]}`

Required per-project fields:

- `scope{activeSpan, languages:[{name,share}], modules?, releases:[{tag,date}], hasTests, hasCI, license}`
- `decisions:[{title, summary?, kind?, sourceLabel?}]`
- `activity:[{date, type, label?, magnitude?}]`
- `method{governanceGates?, enforcedBoundaries?, specDriven?, agenticMarkers?}`
- `deploymentUrls[]` verified for deployed systems
- data-backed `link_policy` and `public_alias`

Likely files:

- `/Users/verlyn13/Repos/verlyn13/meta-inventory/docs/feed-schema.md`
- `/Users/verlyn13/Repos/verlyn13/meta-inventory/docs/ontology/dimensions.yaml`
- `/Users/verlyn13/Repos/verlyn13/meta-inventory/docs/knowledge-base/entries.yaml`
- `/Users/verlyn13/Repos/verlyn13/meta-inventory/config/feed-overrides.yaml`
- `/Users/verlyn13/Repos/verlyn13/meta-inventory/scripts/validate_knowledge_base.py`
- `/Users/verlyn13/Repos/verlyn13/meta-inventory/scripts/generate_feed.py`
- `/Users/verlyn13/Repos/verlyn13/meta-inventory/exports/projects.json`

Acceptance:

- The feed remains publish-safe and field-allowlisted.
- Website P0 can continue to render v0 fields while v1 fields progressively appear.
- The website can detect absent v1 fields without failing the build.

### P1-2 — Replace ad hoc exclusions with data-backed safety

The website needs anonymization and no-link behavior to be enforced by data, not by fragile public text.
Focus on these upstream paths:

- `/Users/verlyn13/Repos/verlyn13/meta-inventory/config/feed-overrides.yaml`
- `/Users/verlyn13/Repos/verlyn13/meta-inventory/data/raw/manifests-snapshot.json`
- `/Users/verlyn13/Repos/verlyn13/meta-inventory/scripts/generate_feed.py`
- `/Users/verlyn13/Repos/verlyn13/meta-inventory/docs/feed-schema.md`

Required behavior:

- `link_policy: no-link` suppresses repo URLs.
- `public_alias` replaces private or sensitive project naming before anything reaches the public feed.
- Force-exclude remains acceptable while enforcement is incomplete.
- Remove force-exclude only after the generator enforces alias/no-link from data and the leak gate proves
  the public artifact is clean.

Acceptance:

- The public feed contains no forbidden private organization or repo names.
- `scripts/check-source-provenance.mjs` in the website remains defense-in-depth, not the first line of
  anonymization.

### P1-3 — Fill richness for the first flipped website surfaces

Prioritize fields that unblock the website's index/status surfaces:

- `thesis`
- `statusLine`
- `asOf`
- `deploymentUrls[]` for deployed systems
- `domains[]`
- `tech[]`
- `posture.evidenceClass`
- `tier.portfolioVisibility`

Relevant upstream files:

- `/Users/verlyn13/Repos/verlyn13/meta-inventory/docs/knowledge-base/entries.yaml`
- `/Users/verlyn13/Repos/verlyn13/meta-inventory/config/feed-overrides.yaml`
- `/Users/verlyn13/Repos/verlyn13/meta-inventory/data/raw/manifests-snapshot.json`
- `/Users/verlyn13/Repos/verlyn13/meta-inventory/exports/projects.json`

Acceptance:

- The first website surface can render a dense body-of-work index without replacing meaningful copy with
  `unknown`.
- Deployed-system projects have verified live URLs or they do not pass the richness gate.

### P2 — Event-driven refresh after project PRs

After P0/P1 are stable, wire project repo PR/merge events into basket refresh:

- project repo event or dispatch trigger
- re-extract that project's basket
- recompute cross-project portfolio/meta-analysis
- regenerate `exports/projects.json`
- run no-op/content hash gate
- propose website PR only when public feed content changed

Do not start P2 by weakening delivery gates. Event-driven freshness is useful only if the same
projection, leak, and operator gates still hold.

## Required validation before handoff

From `/Users/verlyn13/Repos/verlyn13/meta-inventory`:

```bash
python3 scripts/validate_knowledge_base.py --emit-projection
python3 scripts/generate_feed.py
python3 scripts/generate_feed.py --check
python3 scripts/generate_feed.py --gate-report
bash scripts/run_freshness_cadence.sh --mode reconstruct --deliver no
```

If a website delivery PR is attempted, first confirm the operator has intentionally provided:

- `WEBSITE_REPO=verlyn13/verlyn13.github.io`
- `WEBSITE_BASE=main`
- `FEED_DEST_PATH=public/data/projects.json`
- `WEBSITE_PR_TOKEN` with the required cross-repo contents and pull-request permissions

From `/Users/verlyn13/Repos/verlyn13/verlyn13.github.io`, after any delivered feed PR:

```bash
mise run ci
```

Visual review is required before a public surface flip.

## Stop conditions

Stop and hand back instead of improvising if:

- `WEBSITE_PR_TOKEN` is missing.
- The generated feed is dirty, stale, or fails leak/allowlist checks.
- The target surface would render `unknown` where current hand-authored website copy is richer.
- The change requires website workflow edits, auto-merge, auto-publish, new tokens, or a deploy policy
  change without explicit operator approval.
- `meta-inventory` and the website disagree about schema or destination path.

## Definition of done

- Upstream docs distinguish current PR delivery from future auto-publish policy.
- `exports/projects.json` remains deterministic, publish-safe, and gate-reportable.
- Website-required v1 fields are either implemented or explicitly tracked with schema/generator tasks.
- Richness blockers are named per project and per surface.
- Delivery remains draft-PR/operator-merge unless the operator explicitly changes the policy.
- All required `meta-inventory` validation commands pass, or blockers are named exactly.
