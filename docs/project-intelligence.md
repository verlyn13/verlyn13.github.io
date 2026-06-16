---
title: Project Intelligence — the feed-driven project presentation system
category: architecture
component: project-intelligence-feed
status: draft
version: 0.1.0
last_updated: 2026-06-16
tags: [project-intelligence, feed, meta-inventory, provenance, presentation, breadth]
priority: high
audience: coding agent + design agent
---

# Project Intelligence — feed-driven project presentation

> **Status — draft (2026-06-16).** Formalizes the system. The public feed already ships
> (`public/data/projects.json`); this spec defines what it grows into and how the site renders it.
> The presentation P0 is pending the design handback (`docs/project-intelligence-design-brief-2026-06-16.md`).

## 1. Premise
The feed is the **instrument, not the exhibit**. Its job is to keep each project's depth, scope, key
decisions, and activity *current and credible* — evidence that these are planned, researched,
spec-driven, intentional builds, **not two-day agentic shells**. The site presents the **breadth** of
the work (many projects, many domains, one method) with **depth on demand** (drill into any project).

## 2. Two layers, two clocks
**Two layers**
- **Knowledge basket** — rich, *private*, in meta-inventory. Everything extracted from a project.
- **Public feed** — `public/data/projects.json`, a *publish-safe projection* of the baskets. Only the
  fields safe to show, filtered per each project's `tier.portfolioVisibility` / `posture`, and held to
  the existing leak gate (`scripts/check-source-provenance.mjs`).

The basket may know everything; the feed carries only what's public. This is what lets private repos
feed the site without leaking.

**Two clocks**
- **Event-driven** — a project PR/merge fires `repository_dispatch` → meta-inventory re-extracts that
  project's basket and recomputes the cross-project meta-analysis.
- **Scheduled** — daily 08:00 ET → regenerate the feed → no-op gate → auto-publish (see §6).

## 3. Architecture
```
project repos ──PR/merge (repository_dispatch)──▶ meta-inventory
  (provenance                                      • re-extract that project's BASKET (private, full)
   lives here)                                      • recompute cross-project META-ANALYSIS
                                                          │
                          daily 08:00 ET ─────────────────┤ publish-safe projection
                                                          ▼
                                              public feed (projects.json, v1)
                                                          │ no-op gate → policy gate → auto-publish (§6)
                                                          ▼
                                       site renders at BUILD TIME (no client JS)
```
The bottom half is the pipeline ADR-0008 already describes. This spec adds the **event-driven
extraction** (top) and the **daily auto-publish cadence** (middle).

## 4. The knowledge basket (employer / observer lens)
Each field answers *"is this designed, deep work — or an afternoon's agentic output?"*

| Group | Signals | Proves |
|---|---|---|
| **Identity** | thesis, domains, primary tech, status/phase, live URL | what it is *(feed has this)* |
| **Scope & maturity** | active span, commit cadence, languages + share, modules/subsystems, releases/tags, tests + CI present, license | it's *substantial* |
| **Design intentionality** ⭐ | ADR count + titles, spec/design-doc presence, enforced boundaries (CI import rules, ArchUnit), conformance/fitness gates, 2–5 key decisions | it was *designed, spec-driven* |
| **Activity** | dated event series (commit buckets, releases, phase transitions), last-active | it's *sustained* |
| **Meta-analysis** (portfolio) | N projects · M domains · K languages · span of years · recurring methods | *breadth + a house style* |

Design intentionality is the differentiator — and much of it already lives in the v0 theses as prose
("imports enforced in CI from the first commit"; "eleven evidence-first phases"). The basket's job is to
**structure** these so the site can render them uniformly.

## 5. Feed schema
### 5.1 v0 (current, shipping)
- Top-level: `schemaVersion`, `generatedAt`, `banners`, `projects[]`, `provenance{kbSha,kbDirty,stale,…}`.
- Per project: `id`, `slug`, `title`, `displayName`, `thesis`, `domains[]`, `tech[]`, `statusLine`,
  `posture{badge,evidenceClass,allowsLive}`, `deploymentUrls[]`, `asOf`, `freshness{maxUpdatedAt,ageDays,stale,source}`,
  `tier{portfolioVisibility,primaryAudience,status}`, `provenance{kbSha,kbDirty,generatedAt,source}`.

### 5.2 v1 (target additions) — the contract the site consumes
- **Per project:**
  - `scope{}` — `activeSpan` (first→last), `languages:[{name,share}]`, `modules?`, `releases:[{tag,date}]`, `hasTests`, `hasCI`, `license`.
  - `decisions:[{title, summary?, kind?(architecture|governance|research), sourceLabel?}]` — 2–5, publish-safe labels (never private URLs).
  - `activity:[{date, type(commit-bucket|release|milestone|phase), label?, magnitude?}]` — the timeline series.
  - `method{}` — `governanceGates?`, `enforcedBoundaries?`, `specDriven?`, `agenticMarkers?` (AGENTS.md/skills/MCP present).
- **Top-level:** `portfolio{projectCount, domains[], languages[], firstActive, lastActive, deployedCount, recurringMethods[]}` — drives the overview band.

### 5.3 Publish-safety (projection rules)
A field is emitted to the feed only if publish-safe for that project: gated by `tier.portfolioVisibility`
and `posture.allowsLive`; **no private repo URLs, SHAs, secrets, or internal branch names**; held to the
leak gate's `forbidStrings`. The basket keeps the rest privately.

## 6. Cadence & governance
- **Daily 08:00 ET.** GitHub Actions cron is UTC and ignores DST → schedule **12:00 and 13:00 UTC** and
  let the job no-op the wrong one (so 08:00 ET holds across daylight saving).
- **Auto-publish, policy-gated (refines ADR-0008).** A **feed-only** diff that passes every gate
  (no-op-suppressed · provenance · leak · clean-source `kbDirty:false`) **auto-merges and deploys** — the
  gate is **policy, not a person clicking merge**. **Everything else** — code, structure, new claims —
  stays **human-gated** (operator merge).
- **Honesty consequence:** the colophon copy must say this truthfully (feed-only auto-publish; all else
  reviewed). Tracked as S5 in the design brief.

## 7. Presentation (site)
Direction is research-settled (full rationale + sources in the design brief). The serious-not-showy
pattern is a **dense, grouped, build-time index — not a card grid** — with **no interactive filter at
this scale** (15–30 items); facets are printed inline labels, grouping proves breadth, drill-down is the
per-project page. Surfaces:
1. **Portfolio overview** — breadth at a glance (`portfolio{}` meta-analysis).
2. **Body-of-work index** — grouped, dense, inline metadata; a curated front tier leads.
3. **Per-project design structure** — scope + key decisions + activity, on each detail page.
4. **Portfolio activity timeline** — later/optional.

**Rendering:** a feed→HTML **prebuild** (same spirit as `build-tokens.mjs`), **zero client JS**, single
stylesheet, all current gates apply.

## 8. Phasing
- **P0** (no upstream dep): lock the v1 schema; build the templater + portfolio overview + grouped index
  from *today's* fields (`evidenceClass`, `domains`, `tech`, `statusLine`, `asOf`, `deploymentUrls`).
- **P1:** `scope{}` metrics (git-derived).
- **P2:** `activity[]` → per-project + portfolio timelines.
- **P3:** `decisions[]` (ADR/spec extraction) — highest signal.
- **P4:** `repository_dispatch` trigger + 08:00 ET cadence wired in CI.

## 9. Agent roles
- **Coding agent (Claude Code)** — this spec, the build tooling, the implementation. **Authoritative** —
  code is the source of truth.
- **Design agent (Claude Design)** — designs the surfaces from the design brief; hands back a spec the
  coding agent implements. **Non-authoritative** (ADR-0005): a proposal translated to tokens + code.

## 10. References
- Design handoff: `docs/project-intelligence-design-brief-2026-06-16.md`
- Decision record: `docs/adr/0009-project-intelligence-feed.md`
- Pipeline + colophon: `docs/adr/0008-colophon-publishing-system.md`, `colophon.html`
- Tokens + component map: `design/DESIGN_SPEC.md` · patterns + AA contract: `docs/design-system.md`
- The live feed: `public/data/projects.json` · provenance/leak gate: `scripts/check-source-provenance.mjs`
