---
title: Fleet coordination ledger — Tier 0/1 remediation
category: operations
component: fleet-coordination
status: active
version: 0.2.0
last_updated: 2026-07-03
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
| new-direction-2026 | `docs/handoffs/2026-07-02-fleet-tier0-handoff.md` | Tier 0: content commits (research-statement rewrite, CLAUDE.md), hygiene fabric, renormalize commit repairing 9 corrupt PDF blobs, cleanup, STATUS.md, push 3 stranded commits | `docs/handoffs/2026-07-02-fleet-tier0-handback.md` | ✅ **VERIFIED & CLOSED 2026-07-02** — all 7 checks reproduced; PDF invariant held (git blobs repaired at `7969c75`, all 9 disk checksums unchanged vs preflight); Hygiene green on final `de95130` |
| planning-summer-2026 | `docs/reference/fleet-coordination-handoff-2026-07-02.md` | Tier 0+1: voip-note frontmatter (lint green), hygiene fabric, departure-day record commits, markdown.yml lychee fix, push | `docs/reference/fleet-coordination-handback-2026-07-02.md` | ✅ **VERIFIED & CLOSED 2026-07-02** — all checks reproduced; CI/Hygiene/Markdown green on final `ed3acff` (Markdown green for the first time since 2026-05-11); repo confirmed PRIVATE |
| meta-inventory | `docs/handoff/2026-07-02-fleet-tier1-handoff.md` | Tier 1: ensure_schema() 6-column fix, schema-parity fitness function, cadence failure alerting, merge PR #11, dispatch cadence green, fresh draft feed PR to this repo | `docs/handoff/2026-07-02-fleet-tier1-handback.md` | 🟢 **VERIFIED 2026-07-03** — all 8 checks passed (fix `9bd478a`, merged `cade604`); scheduled-run gate now closed (run `28645484291` green); 2 minor follow-ups remain (facts refresh, commit handback) |
| planning-summer-2026 (Tier 2) | `docs/reference/plan-02-rewrite-handoff-2026-07-03.md` | Tier 2: rewrite plan 02 around the research-engineering target, refresh the career gate, restart the weekly cadence | `docs/reference/plan-02-rewrite-handback-2026-07-03.md` | ⏳ **HANDED OFF 2026-07-03** — awaiting handback (lints clean against planning's own gate) |

~~Safety note propagated with the new-direction-2026 handoff~~ — **hazard closed
2026-07-02**: coordinator verification reproduced the repair from git objects and disk
(commit `7969c75` carried exactly the 16 sanctioned files; every PDF's HEAD blob size now
equals its disk size; all 9 disk SHA-256 values match the handback's preflight table, so
disk was never touched). Normal git hygiene rules apply in that repo again.

### Open gates (meta-inventory — carried until closed)

1. ~~Scheduled-run proof~~ — **CLOSED 2026-07-03**: the scheduled cadence run at 07:28 UTC
   (run `28645484291` on `cade604`) succeeded — the first green scheduled run after four
   consecutive daily failures on the old `07af640`. The daily producer pipeline is healthy.
2. **Facts-layer refresh** (harvest/collect + snapshot commit + re-dispatch) if a feed
   `generatedAt` ≥ 2026-07-02 is required — current feed is correct but input-dated
   2026-06-29. Queue with meta-inventory's next work session. *(Still open.)*
3. **Commit the handback**: `docs/handoff/2026-07-02-fleet-tier1-handback.md` is untracked
   in meta-inventory; house convention commits handoffs/handbacks. *(Still open.)*

## Website-local Tier 1 items (this repo, done by coordinator 2026-07-02)

- ✅ `npm test` added to the `ci` script (`package.json`) — feed-model tests now gate
  `mise run ci`.
- ✅ `Feed-model unit tests` step added to the quality job in
  `.github/workflows/deploy.yml` — a feed regression can no longer deploy untested.
- ✅ `.claude/settings.json` PostToolUse hook moved under the required `hooks` key (it had
  never fired); misleading `(exit $?)` dropped from its failure message. Adding
  `"$schema"` was blocked by the policy classifier as agent self-modification — operator
  may add it manually if wanted.

## Tier 2 — launch packaging (this repo, 2026-07-03)

Branch `feat/launch-packaging` (off `main`), CI green (`mise run ci` exit 0, 12/12 tests),
adversarially verified (3 verifiers, PASS_WITH_NITS, no blockers):

- ✅ On-brand 1200×630 OG share image (`public/og-default.png`; reproducible source
  `assets/og/og-default.svg`) + per-page Open Graph / Twitter cards on all 15 content
  pages, with **per-project** titles/descriptions (not identical previews).
- ✅ `rel=canonical` on every page; JSON-LD Person+WebSite (index) and ProfilePage (cv),
  real URLs only (GitHub + LinkedIn; no fabricated ORCID).
- ✅ `robots.txt`, `sitemap.xml` (15 URLs), noindex `404.html` wired into the Vite input
  map (ask-first vite.config change, authorized under "proceed in full").
- ✅ `npm audit fix` cleared 2 of 4 advisories (rollup high + postcss moderate); Dependabot
  added (npm + github-actions).
- ✅ Personal cell removed from the public contact page (privacy; matches the VoIP note's
  documented intent).
- 🐛 Fixed a real content bug: `flux.html` page + meta description were Dicee's copy
  (dice game) — now correct.
- **Decisions made autonomously** (operator away at ask time): deferred Vite 5→8 to
  post-launch (audit-fix now); removed the contact phone rather than publish it. Both
  launch-safe and reversible.
- **Known nit (deliberately deferred):** no `twitter:image:alt` (X-specific); `og:image:alt`
  is present and covers LinkedIn/Slack/Facebook. One-line fix if wanted later.

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
4. ~~Merge the launch-packaging branch~~ — **DONE 2026-07-03** by coordinator: PR #16
   merged (merge commit `2a861f9`), branch deleted, `docs/fleet-ledger-verification`
   deleted. Deploy required a manual re-trigger: the merge's deploy run (`28673890942`)
   had its Deploy job **cancelled** by the `pages` concurrency group (`cancel-in-progress:
   true`) after Build succeeded; a fresh `workflow_dispatch` run (`28674093337`) deployed
   cleanly. Live-verified on `https://jvjohnson.dev/`: og-default.png (200, image/png,
   125713 B), robots.txt + sitemap.xml served, homepage canonical + og:image present,
   `/does-not-exist` → HTTP 404 with the custom page, contact page has zero `tel:` links.
5. **Post-deploy checks still worth a human pass** (external tools): LinkedIn Post
   Inspector on `https://jvjohnson.dev/` + a couple of project URLs to prime the share
   cards, Google Rich Results Test on `/` and `/cv.html`, and an eyes-on pass at desktop +
   mobile (768px).
6. **Phone/VoIP swap follow-up** — the contact page no longer shows a phone number. When the
   VoIP job line (715-388-8457) clears its caller-reputation gate (tracked in `~/voip` +
   planning's voip note), decide whether to add it back to the contact page.

## Verification protocol (coordinator)

On each handback: check the claimed commits exist on `origin/main` (or the PR), the
claimed workflow runs are green in Actions, and acceptance criteria in the handoff are
met. For new-direction-2026 additionally: the PDF checksum table shows on-disk files
unchanged. For meta-inventory additionally: the next **scheduled** (not just dispatched)
cadence run is green, and the delivered feed renders on `mise run dev` (S1 "since /
recurring methods" line populates from `portfolio{}`).

## Queued next waves (not yet handed off)

- ~~**Tier 2 — launch packaging (this repo)**~~ — **DONE 2026-07-03** on
  `feat/launch-packaging` (see the Tier 2 section above). One sub-item deferred:
  **Vite 5→8** major upgrade (post-launch, isolated branch; clears the last 2 dev-only
  advisories).
- ~~**Tier 2 — planning**~~ — **HANDED OFF 2026-07-03** (rewrite plan 02 + restart cadence):
  `planning-summer-2026/docs/reference/plan-02-rewrite-handoff-2026-07-03.md`.
- ~~**Tier 3 — fabric**~~ — **DONE 2026-07-03** (coordinator, full git/GitHub authority):
  - **Fleet map** authored: `meta-inventory/docs/standards/fleet-map.md` (5 repos, roles,
    feed/hygiene/audit/provenance contracts). **AGENTS.md** added to meta-inventory (entry-
    point parity across the fleet); linked from CLAUDE.md.
  - **Actions bumped fleet-wide** to current SHA-pinned majors (checkout v7, setup-node v6,
    setup-python v6, configure-pages v6, upload-pages-artifact v5, deploy-pages v5, setup-uv
    v8, upload-artifact v7, pre-commit/action SHA) + **pre-commit-hooks v5→v6 in all four
    repos** — Node 20 deprecation warnings cleared everywhere.
  - **new-direction-2026:** stale model pins (Opus 4.6 / gemini-3.1-pro-preview) →
    session-dependent; unconfigured `github` MCP row removed.
  - **planning:** `uv sync --frozen` fallback removed (lockfile drift now fails CI).
  - **Deploy concurrency FIXED** (`cancel-in-progress: false` + `actions: read`, PR #24) —
    the 2026-07-03 production cancellation cannot recur.
  - **Vite 5→8** shipped (PR #25): npm audit **0 vulnerabilities**. **twitter:image:alt**
    added to every page.

### Deliberately NOT done — documented reasons / operator-gated

- **meta ruff/mypy gate + `.mise.toml`:** meta's buildplan **D-OP-1/AC16** explicitly forbids
  `.mise.toml`/`.python-version`/`pyproject.toml`, and a ruff gate would reformat 18 core
  scripts against that documented minimalism. Left as an **operator decision** (relax D-OP-1
  first). CI already pins Python 3.13; FF-001..005 + feed-check already guard the producer.
- **meta facts-layer refresh** (fresh feed `generatedAt`): requires
  `run_freshness_cadence.sh --mode collect` (multi-account `gh` re-query) + `WEBSITE_PR_TOKEN`
  — **operator-credentialed**. Forcing a timestamp would violate the generator's determinism
  contract (I2). The current feed (2026-06-29) is correct and deterministic; run when facts
  actually change.
- **planning `source-register` `last_checked`:** intentionally **not backfilled** — writing a
  verification date I did not perform would fabricate data; needs real per-source checks.
- **plan-02 rewrite:** handed off; awaits the operator / a planning session (career-strategy
  specifics are the operator's to set).
- **meta `generate_feed.py` tests:** delegated (stdlib `unittest`, respecting no-pytest/no-
  pyproject); pending review before commit.
- **branch rulesets:** GitHub repo-settings policy — operator call.

## History

- **2026-07-02** — Ledger opened; three handoffs placed; website-local Tier 1 items
  applied and verified (`mise run ci` + `npm test` green).
- **2026-07-02** — Website PR #14 opened for the Tier 1 CI/coordination branch; PR #15
  feed refresh merged; stale draft feed PRs #10-12 closed; iCloud Drive critical-work
  backup configured and verified through launchd.
- **2026-07-02** — Coordinator verification complete (3 parallel adversarial verifiers +
  local rendering check): new-direction-2026 VERIFIED (PDF invariant reproduced),
  planning-summer-2026 VERIFIED, meta-inventory VERIFIED WITH NOTES (gates above).
  Website: PR #14 merged; `portfolio{}` renders on `/projects/` — "14 projects across
  20+ domains in 5 languages — built continuously since 2009" + recurring-methods row;
  `npm run ci` green on merged main (12/12 tests). **Tier 0/1 remediation complete** save
  the three meta-inventory gates.
- **2026-07-03** — Meta gate #1 **closed**: scheduled cadence run `28645484291` green
  (first scheduled success after 4 daily failures). **Tier 2 launch packaging** landed on
  `feat/launch-packaging` — OG share image + per-page cards, canonical, JSON-LD,
  robots/sitemap/404, `npm audit fix`, Dependabot, contact-phone removal, and a Flux
  description copy-paste fix; `mise run ci` green (12/12) and adversarially verified
  (PASS_WITH_NITS, no blockers). **Plan-02 rewrite handed off** to planning-summer-2026.
  Vite 5→8 deferred to post-launch.
- **2026-07-03** — Coordinator took over git/GitHub with operator authorization. **Website
  PR #16 merged and deployed** (`2a861f9`); deploy needed a manual re-dispatch after the
  `pages` concurrency group cancelled the merge's Deploy job (see Tier 3 note); live-verified
  on jvjohnson.dev. **Sibling pushes:** meta-inventory `main` pushed (`5b11900` — the loose
  Tier 1 handback committed, plus a pre-existing local entity-lane commit `16aaa39` that had
  been sitting unpushed; repo is private, diff carries only `.pub` key refs); planning-summer
  `main` pushed (`0d2649a` — plan-02 handoff committed). Plan-02 handback now awaited from
  planning.
- **2026-07-03** — **Tier 3 fabric hardening complete** across all four repos (full git/GitHub
  authority). Website: deploy concurrency fixed + Actions currency (PR #24), **Vite 5→8** with
  0 audit vulnerabilities (PR #25), twitter:image:alt, pre-commit v6 (`119fa18`). meta: fleet
  map + AGENTS.md + Actions + pre-commit v6 (`d3cf780`). new-direction: model-pin + github-MCP
  cleanup + Actions + pre-commit v6 (`b1dd23d`). planning: Actions + setup-uv v8 + `--frozen`
  enforcement + pre-commit v6 (`e722bdd`). All sibling CI green. Six items deliberately left
  for operator decision / credentials / honesty (see "Deliberately NOT done" above);
  `generate_feed.py` tests delegated and pending review.
