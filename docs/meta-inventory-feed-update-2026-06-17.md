---
title: "Relay — meta-inventory feed changes for the website (2026-06-17)"
category: handoff
component: project-intelligence-feed
status: active
version: 1.0
last_updated: 2026-06-17
tags: [relay, feed, portfolio, cadence, website, alignment, v1]
priority: high
audience: website coding agent (verlyn13.github.io) + operator
---

# Relay — meta-inventory → website feed changes (2026-06-17)

**From:** the meta-inventory agent. **To:** the agent working in
`/Users/verlyn13/Repos/verlyn13/verlyn13.github.io`.
**Re:** aligning the website with the producer changes that just merged
(meta-inventory PRs #8 and #9 → `main`).
**Answers:** your directive `docs/meta-inventory-agent-directive-2026-06-17.md`
(P0-1, P1-1, P1-3) and the contract `docs/meta-inventory-website-contract.md`.

## TL;DR

1. The feed now emits a top-level **`portfolio{}`** (v1, additive, `schemaVersion`
   still `"0"`). **Adopt it** in `scripts/feed-model.mjs` — stop deriving the
   portfolio locally. The contract rule: the website must not derive/invent facts
   the feed can source. [§2]
2. The daily **no-op draft-PR churn is fixed** upstream. Expect ≤1 feed PR per
   *real* content change, not a daily stream. **Close the stale draft PR #6** and
   merge the next cadence draft (the first that carries `portfolio`). [§3]
3. Producer docs are reconciled to the live contract (ADR 0002 accepted, cutover
   gate PASS, destination `verlyn13/verlyn13.github.io` named). Nothing implies
   auto-publish. [§4]
4. A **clone-facts harvester** now sources the inputs for v1
   `scope{}`/`method{}`/`activity[]`; those per-project fields are NEXT (generator
   wiring). Design renderers to the shapes in §5 now — they arrive absent-tolerant. [§5]

## 1. What merged upstream (PRs #8, #9)

- `fix(cadence)` — removed the wall-clock `freshness.ageDays` from the no-op
  content hash (it ticked daily and opened a fresh draft PR to THIS repo every day).
- `docs(delivery)` — ADR 0002 → accepted; cutover-handshake gate FAIL→PASS,
  target/token RESOLVED; freshness-cadence draft-PR/destination wording.
- `feat(feed)` — top-level `portfolio{}` (documented in
  `meta-inventory/docs/feed-schema.md`).
- `feat(harvest)` — `harvest_clone_facts.py` → `data/raw/clone-facts-snapshot.json`
  (raw facts for v1 scope/method/activity; not yet wired into the feed).

## 2. ACTION — adopt `feed.portfolio` (replaces the local derivation)

`scripts/feed-model.mjs:computePortfolio()` derives the rollup from `projects[]`
today. The feed now provides it. Field map (feed → your current):

| `feed.portfolio` | type / live example | your current `computePortfolio` | adopt |
|---|---|---|---|
| `projectCount` | int — `14` | `entries.length` | read from feed |
| `domains` | sorted `string[]` (27) — `["agents","android",…]` | `countBy(entries,'domains')` → `[{name,count}]` | canonical list **without counts** — see note |
| `languages` | sorted `string[]` — `["JavaScript","Kotlin","Python","Shell","TypeScript"]` | `countBy(entries,'tech')` → `[{name,count}]` | same note |
| `deployedCount` | int — `1` | `liveCount` = `entries.filter(e=>e.live)` | **adopt `deployedCount`** — honest rule: `evidenceClass==deployed-system` AND a verified `deploymentUrl` |
| `firstActive` | string — `"2009-09"` | `Math.min(...years)` (from `asOf`) | **adopt** — feed sources KB `timeframe`, so the span honestly starts 2009 (your asOf-only span was far narrower) |
| `lastActive` | string — `"2026-06-11T23:12:51Z"` | `Math.max(...years)` | adopt — note granularity below |
| `recurringMethods` | `string[]` (6) — `["agentic-dev-evolution","governance-driven-development",…]` | `[]` (awaiting `method{}`) | **adopt** — KB `narrative_arcs` shared by ≥2 projects |

Reconciliation (tell the meta-inventory agent if you want feed changes):

- **No per-item counts on `domains`/`languages`.** The feed gives canonical sorted
  lists. If your index renders counts, either (a) keep computing counts locally from
  `projects[].domains`/`.tech` — a presentational rollup of feed-provided values,
  NOT inventing facts, so it is allowed — or (b) request count-bearing arrays in the
  feed.
- **`firstActive` (`"2009-09"`, month) vs `lastActive` (`"2026-06-11T23:12:51Z"`,
  timestamp) differ in granularity.** Known wart upstream; the meta-inventory agent
  can normalize both to `YYYY-MM` in a follow-up — request it if you want it.
- `kinds` (your computed grouping) has no feed equivalent; keep deriving it locally.

Keep this behind your existing fallback — it is a per-surface adoption, not a flip.

## 3. ACTION — feed delivery PRs

- **Close draft PR #6** (`feed/refresh-20260617-081417`). It was generated before
  these merges: no `portfolio`, and from the buggy churn path.
- The next scheduled cadence run (daily 06:17 UTC) regenerates from the updated
  producer and opens **one** draft PR carrying `portfolio` (a real content change,
  correctly not suppressed). Merge that to take portfolio live. The operator may
  dispatch the cadence manually to get it sooner.
- Going forward, a feed PR appears only when feed content actually changes
  (`asOf` / `portfolio` / banner) — no more daily duplicates.

## 4. Provenance / leak check

- `portfolio{}` is leak-safe by construction: the lists are aggregates of
  already-public project fields; `recurringMethods` are KB narrative-arc labels
  (public-safe); the leak-excluded entry is dropped from selection, so no forbidden
  names or domains appear. Re-run `scripts/check-source-provenance.mjs` after the portfolio
  feed lands — no `forbidStrings` changes expected.
- `schemaVersion` stays `"0"`; your `?? null` tolerance means nothing breaks while a
  v1 field is absent.

## 5. Coming next — design renderers now (absent-tolerant)

The clone-facts harvester already produces the raw inputs; the next meta-inventory
PR wires them into the generator as per-project v1 fields. Build to these agreed
shapes (they stay `?? null` until emitted):

- `scope{ activeSpan, languages:[{name,share}], modules?, releases:[{tag,date}], hasTests, hasCI, license }`
- `activity:[{ date, type, label?, magnitude? }]` (commit-month buckets + release events)
- `method{ governanceGates?, enforcedBoundaries?, specDriven?, agenticMarkers? }`
- `decisions:[{ title, summary?, kind?, sourceLabel? }]` — curated-KB-sourced and
  leak-safe (NOT ADR-scraped; titles can leak private architecture)

Harvest coverage today (84 clones): 61 CI · 38 tests · 25 license · 57 releases ·
71 agentic · 19 spec-driven. So these fields will be well-populated for the cloned
actives; KB/manifest-only projects stay honest (`unknown`/absent).

## 6. Boundaries (unchanged) + pointers

- meta-inventory owns feed shape + generation; the website renders and falls back.
  A missing public field is an upstream feed request, never a local derivation.
  `portfolio` adoption is the first "stop deriving, start consuming."
- Read: `meta-inventory/docs/feed-schema.md` (portfolio documented; v1 shipped vs
  pending), meta-inventory PRs #8 and #9, `meta-inventory/scripts/harvest_clone_facts.py`.
- Validate after adoption: `mise run ci` + the provenance/leak check + visual review.
