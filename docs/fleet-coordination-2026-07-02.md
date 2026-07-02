---
title: Fleet coordination ledger — Tier 0/1 remediation
category: operations
component: fleet-coordination
status: active
version: 0.1.0
last_updated: 2026-07-02
tags: [coordination, cross-repo, handoff, handback, audit-remediation]
priority: high
audience: coordinator agent + operator + sibling repo agents
---

# Fleet coordination ledger — Tier 0/1 remediation

This repo's Claude Code session is the **fleet coordinator** for the 2026-07-01/02
four-repo audit remediation (42-agent workflow; 105 findings, every P0/P1 adversarially
verified). Each sibling repo received a handoff document in its own conventions and owes a
**handback** before its item closes. The coordinator verifies handbacks against origin
state and Actions history — a handback is a claim, not proof.

## Handoff → handback tracking

| Repo | Handoff (in target repo) | Scope | Handback expected at | Status |
|---|---|---|---|---|
| new-direction-2026 | `docs/handoffs/2026-07-02-fleet-tier0-handoff.md` | Tier 0: content commits (research-statement rewrite, CLAUDE.md), hygiene fabric, renormalize commit repairing 9 corrupt PDF blobs, cleanup, STATUS.md, push 3 stranded commits | `docs/handoffs/2026-07-02-fleet-tier0-handback.md` | ✅ handback received; coordinator verification pending |
| planning-summer-2026 | `docs/reference/fleet-coordination-handoff-2026-07-02.md` | Tier 0+1: voip-note frontmatter (lint green), hygiene fabric, departure-day record commits, markdown.yml lychee fix, push | `docs/reference/fleet-coordination-handback-2026-07-02.md` | ✅ handback received; coordinator verification pending |
| meta-inventory | `docs/handoff/2026-07-02-fleet-tier1-handoff.md` | Tier 1: ensure_schema() 6-column fix, schema-parity fitness function, cadence failure alerting, merge PR #11, dispatch cadence green, fresh draft feed PR to this repo | `docs/handoff/2026-07-02-fleet-tier1-handback.md` | ⚠️ handback received with pending gates |

Safety note propagated with the new-direction-2026 handoff: **no `git restore` /
`checkout --` / `stash` / `clean` in that repo** until its commit sequence lands — the
9 modified Roscoe PDFs were corrupt in git, original on disk, and the dirty tree held the
only copy of the research-statement rewrite. A handback now claims the repair sequence
landed; verify origin state and the PDF checksum table before treating that hazard as closed.

## Website-local Tier 1 items (this repo, done by coordinator 2026-07-02)

- ✅ `npm test` added to the `ci` script (`package.json`) — feed-model tests now gate
  `mise run ci`.
- ✅ `Feed-model unit tests` step added to the quality job in
  `.github/workflows/deploy.yml` — a feed regression can no longer deploy untested.
- ✅ `.claude/settings.json` PostToolUse hook moved under the required `hooks` key (it had
  never fired); misleading `(exit $?)` dropped from its failure message. Adding
  `"$schema"` was blocked by the policy classifier as agent self-modification — operator
  may add it manually if wanted.

## Operator actions (only you can do these)

1. **Machine backup** — configured 2026-07-02 as an iCloud Drive critical-work mirror
   because Time Machine has no destination and the configured `gdrive:` rclone remote has
   an expired OAuth token. LaunchAgent:
   `~/Library/LaunchAgents/dev.verlyn13.career-critical-backup.plist`; script:
   `~/.local/bin/career-critical-backup.zsh`; cadence: every 7200 seconds; last launchd
   run exited 0. The backup covers the three sibling repos, this repo, and `~/voip` under
   `~/Library/Mobile Documents/com~apple~CloudDocs/Machine Backups/career-critical/`.
2. **Fresh feed PR** — PR #15 was merged to `main` at
   `cc3523055ceccb3614c7d1144bb3735a53bb6078`; stale draft feed PRs **#10, #11, #12**
   were closed and their remote branches deleted. PR #15 carries top-level `portfolio{}`
   but still reports `generatedAt=2026-06-29T13:49:03Z` from the upstream facts layer.
3. **meta-inventory PR #11** — merged by the repo agent at
   `cade604f79ff9e682fbe1168ed404b0e08c6e6d2`; dispatch cadence was green, but the
   handback remains blocked until the next scheduled cadence proof and/or a facts-layer
   refresh that can produce a July 2 `generatedAt`.
4. **Push/PR of this repo's changes** — PR #14 is open:
   `https://github.com/verlyn13/verlyn13.github.io/pull/14`; checks are green and merge
   state is clean. Merging it deploys the CI/coordination changes.

## Verification protocol (coordinator)

On each handback: check the claimed commits exist on `origin/main` (or the PR), the
claimed workflow runs are green in Actions, and acceptance criteria in the handoff are
met. For new-direction-2026 additionally: the PDF checksum table shows on-disk files
unchanged. For meta-inventory additionally: the next **scheduled** (not just dispatched)
cadence run is green, and the delivered feed renders on `mise run dev` (S1 "since /
recurring methods" line populates from `portfolio{}`).

## Queued next waves (not yet handed off)

- **Tier 2 — launch packaging (this repo):** og:image/twitter:image + OG blocks on
  colophon/contact/research-index + `build-feed.mjs` head template; robots.txt, sitemap,
  404.html (ask-first: new entry point), canonical links, JSON-LD Person; `npm audit fix`
  (rollup/postcss in-range); Dependabot (npm + github-actions); phone-number swap tracked
  against the `~/voip` caller-reputation gate; Vite 5→8 proposal (ask-first).
- **Tier 2 — planning:** rewrite plan 02 around the research-engineering target; restart
  weekly cadence.
- **Tier 3 — fabric:** fleet map (home: meta-inventory), Actions major bumps fleet-wide
  with SHA+comment pin policy, meta-inventory engineering floor (mise pin, ruff/mypy,
  generate_feed.py tests, machine-testable feed schema), agent-contract consistency
  (AGENTS.md in meta-inventory, model-pin drift in new-direction-2026, fleet settings
  pattern), deploy concurrency split + branch ruleset here.

## History

- **2026-07-02** — Ledger opened; three handoffs placed; website-local Tier 1 items
  applied and verified (`mise run ci` + `npm test` green).
- **2026-07-02** — Website PR #14 opened for the Tier 1 CI/coordination branch; PR #15
  feed refresh merged; stale draft feed PRs #10-12 closed; iCloud Drive critical-work
  backup configured and verified through launchd.
