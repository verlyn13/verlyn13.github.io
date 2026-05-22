# Audit Summary — verlyn13.github.io (first-cycle, 2026-05-21)

**Audit spec:** Agentic Architecture Audit Specification v3.1 (2026-05-08)
**Profile snapshot:** [`profile/2026-05-21/`](../../profile/2026-05-21/) (1 evidence extension; same-day extended per the meta-inventory convention)
**Repository revision at audit start:** `ee6c7e55331faaf55fa6bb4cde49abd9e1c96f9a` (identical to profile-pinned revision — zero commit-level drift)
**Audit mode:** `first-cycle` — no prior audit existed for this project
**Strategic theme:** `career-transition-readiness` (custom; operator-defined; sole theme; 1.5x weight on dimensions **11.3**, **11.10**, **11.4**, **11.5**)

This is the consumer endpoint of the cross-repo career pipeline rooted at sibling `new-direction-2026`. The theme directly weights the producer-to-consumer content contract and the agent-surface/state/governance dimensions that make that pipeline credible.

---

## Scorecard

| # | Dimension | Score | Weighted? |
|---|---|:---:|:---:|
| 11.1 | Bounded contexts | 2 | |
| 11.2 | Domain/application separation | 2 | |
| 11.3 | Contract discipline | **1** | x |
| 11.4 | Tool/action surface clarity | 2 | x |
| 11.5 | State and memory clarity | 2 | x |
| 11.6 | Authority boundaries | 2 | |
| 11.7 | Observability semantics | **0** | |
| 11.8 | Policy/prompt separation | **1** | |
| 11.9 | Evals and quality gates | **1** | |
| 11.10 | Governance and audit trail | **1** | x |
| 11.11 | Architectural fitness functions | 2 | |

Aggregate (informational): **1.45**. Distribution: 0x1 / 1x4 / 2x6. **Tied with sibling `meta-inventory` (1.45)** in the four-repo family (planning 1.73 > vgh = meta-inv 1.45 > new-direction 1.18). The single 0 on Observability is the sharpest dimension — a write-capable PostToolUse hook with zero in-repo telemetry. The four 1 scores cluster on contract discipline, policy/prompt separation, evals, and governance — the dimensions the strategic theme directly elevates (11.3 and 11.10 are theme-weighted).

Detail: [`10-scores.json`](10-scores.json).

---

## Top 10 findings by priority (smoke-tested; active only)

| # | ID | AAF | Title | Sev | Priority | Phase | Dim |
|---|---|---|---|:---:|---:|---|---|
| 1 | F-008 | AAF-VGH-008 | Cross-repo content-pipeline consumer side has zero validation (Pair A) | 4 | **7.2** | 4 | 11.3 |
| 2 | F-006 | AAF-VGH-006 | PostToolUse hook silent-error swallow on write-capable principal | 4 | **6.0** | 7 | 11.7 |
| 3 | F-001 | AAF-VGH-001 | MAAT framework narrative dominance across 20+ portfolio surfaces (Pair B) | 3 | 5.4 | 8 | 11.8 |
| 4 | F-002 | AAF-VGH-002 | DEV_GUIDE.md contradicts AGENTS.md on 6 design-system axes + 3 broken-reference categories | 3 | 5.4 | 4 | 11.3 |
| 5 | F-009 | AAF-VGH-009 | context7 MCP referenced in CLAUDE.md but no `.mcp.json` (operator-installed at Claude Code global level) | 2 | 3.6 | 4 | 11.4 |
| 6 | F-010 | AAF-VGH-010 | 5 GitHub Actions `@v*` not `@SHA`-pinned (`deploy-pages@v4` highest risk: OIDC + pages:write) | 3 | 3.6 | 6 | 11.6 |
| 7 | F-003 | AAF-VGH-003 | Biome 2 rules at `warn` not `error` — CI passes with style violations | 2 | 2.0 | 9 | 11.11 |
| 8 | F-012 | AAF-VGH-012 | THEMES.md overstates multi-theme capability — file does not exist; sed-script silently no-ops | 2 | 2.0 | 4 | 11.8 |
| 9 | F-007 | AAF-VGH-007 | experiments-sandbox bounded-context decision recorded (stateless-policy authority) | 1 | 1.0 | 2 | 11.1 |
| 10 | F-004 | AAF-VGH-004 | README.md L15 `MIT (c) 2025` stale + L11-12 project list omits 4 of 6 deployed projects | 1 | 1.0 | 8 | 11.8 |

**10 active findings. 1 struck (F-005, see Drift summary). 1 drift-only (F-011, see Caveats). 12 drafted total.** Smoke-test outcome: 9 confirmed-current + 1 re-evidenced (F-004 line shift +/- 2) + 1 struck + 1 drift-only. Stale-evidence rate 16.7% (under 33.3% halt threshold). Detail: [`10-findings.md`](10-findings.md), [`10.5-finding-smoke-test.md`](10.5-finding-smoke-test.md).

---

## Strategic-theme effects

| Theme | Weight | Findings touching weighted dimensions |
|---|:---:|---|
| `career-transition-readiness` | 1.5x on **11.3**, **11.10**, **11.4**, **11.5** | **F-008** (11.3, direct, priority 7.2), **F-002** (11.3, direct, priority 5.4), **F-009** (11.4, direct, priority 3.6), F-001 (11.8 + Pair B cross-repo amplification, indirect 1.2x) |

**Three findings carry direct strategic weight; one carries indirect via Pair B cross-repo amplification.** All three weighted-dimension findings touch the producer-to-consumer career pipeline: **F-008 (the content contract itself), F-002 (the design-system contract that renders it), F-009 (the agent tool surface that authored both)**. Without theme weighting, F-006 would tie F-008 at the top (both severity 4). The theme elevates F-008 to #1 — and the operator's theme choice tracks the audit's actual structural concern (the cross-repo content pipeline has no validation despite being the connective tissue between this repo and sibling `new-direction-2026`).

---

## Proposed fitness functions

**12 candidates (FF-001..FF-012). 8 of 12 cross-repo applicable.** Distribution: static-analysis x 3, authority-manifest x 2, protocol-contract-registry x 2, telemetry-lint x 1, contract-registry x 1, companion-doc-drift x 1, manual-review-only x 2. All are `candidate-advisory`; none promoted to live-blocking in this cycle. Detail: [`10-fitness-functions.md`](10-fitness-functions.md), [`10-fitness-functions.json`](10-fitness-functions.json).

Top 5 by paired-finding priority:

| FF | Paired finding(s) | What it does | Tech | Scope |
|---|---|---|---|---|
| **FF-006** | F-008 (priority 7.2; Pair A) | Embed `<!-- source: new-direction-2026 @ <sha> -->` comment in each generated HTML head; CI lints SHA and freshness | Vite `transformIndexHtml` + CI grep | cross-repo (consumer side pairs with sibling FF-006) |
| **FF-001** | F-006 (priority 6.0) | PostToolUse / PreToolUse hooks tee stderr to `.claude/logs/`, propagate underlying tool exit code, emit structured event line per invocation | jq + grep + tee in CI | vgh-specific (extends to any repo adopting hooks) |
| **FF-007** | F-002 + F-012 (priority 5.4 + 2.0) | Every file/path reference in governance docs (AGENTS.md, CLAUDE.md, DEV_GUIDE.md, THEMES.md, README.md, `.cursor/rules/*.mdc`, SKILL.md) must resolve at HEAD or be annotated `(historical reference)` | Python + ripgrep (planning's `tools/lint_docs.py` is the sister impl) | family-extensible |
| **FF-003** | F-010 (priority 3.6) | Pin every `uses:` in `.github/workflows/*.yml` to a 40-hex SHA, not a major-version tag | grep + dependabot auto-update | family-wide |
| **FF-011** + **FF-012** | F-009 (priority 3.6) | Every MCP server named in CLAUDE.md/AGENTS.md/SKILL.md must have a `.mcp.json` entry OR be explicitly annotated `(operator-installed; not project-scoped)`; tool schemas snapshotted to `.mcp-schemas/` | Python + MCP `tools/list` snapshot | family-wide (cross-cites sibling NDM FF-007 + AAF-NDM-008) |

Two FFs (FF-005 maat-positioning-narrative-balance; FF-008 branch-protection-declaration) are `manual-review-only` by enforcement nature — full automation requires an operator-declared positioning contract or an admin-token GitHub-API export that the audit cannot generate.

---

## Profile / current-branch drift summary

**Zero commit-level drift.** The audit ran against the same revision (`ee6c7e5`) the profile snapshots. The working-tree drift the profile initially recorded at `2c6924d` (24 M + 2 U) was resolved within the same profile cycle via three commits (`daea00d` CNAME + `6eaa529` MAAT integration + `ee6c7e5` profile snapshot) per `meta.evidence_extensions[0]`. AAF-VGH-005 closed accordingly.

**Smoke-test outcomes per Phase 10.5:**

- **9 confirmed-current** — F-001, F-002, F-003, F-006, F-007, F-008, F-009, F-010, F-012 all re-verified at HEAD without substantive change.
- **1 re-evidenced** — F-004 README.md citations shifted +/- 2 lines (`README.md:13` -> `README.md:15`; `README.md:10-11` -> `README.md:11-12`). Substance preserved.
- **1 struck** — **F-005** (working-tree drift): **resolved within profile cycle per `meta.evidence_extensions[0]`.** Retained in smoke-test log; **absent from final priority ranking** per Sec. 10.5 step 5.
- **1 drift-only** — **F-011** (PR-time CI declared but required-for-merge gate is GitHub branch-protection external to repo): **the substance IS the drift.** PR-time CI is declared in `.github/workflows/deploy.yml` L63/L67/L74 (`if: github.event_name != 'pull_request'`) but external GitHub branch-protection state is not observable from a Phase 10.5 re-grep. Recorded as drift per Sec. 10.5 step 4; carried to caveats below; not in priority ranking.

Stale-evidence rate 16.7% (2/12). Halt threshold (>33.3%) NOT approached. Audit ships.

---

## Caveats and halt/resume history

**Halts:** zero. No halt artifacts produced.

**Caveats** (per audit spec Sec. 9.6):

| Caveat | Classification | Notes |
|---|---|---|
| MAAT positioning surface 4x amplified on consumer side vs operator-stated "interesting but much work has been done in other projects since, and probably more impressive" (20+ refs incl. favicon on every page + dedicated `/projects/maat.html` + nav card + lead-paragraph; sibling has 5 narrative refs) | `substantive-deviation` | F-001 + Pair B. Operator-deferred remediation per stated intent. The favicon-as-identity choice is the single biggest amplifier (12 refs vs 8 textual). |
| DEV_GUIDE.md contradicts AGENTS.md on 6 design-system axes + 3 broken-reference categories (`assets/styles.css` does not exist; `research/maat.html`/`research/scopecam.html` referenced but do not exist; `academic/` tree referenced but does not exist) | `substantive-deviation` | F-002. AGENTS.md is operator-declared canonical per `CLAUDE.md:3`. DEV_GUIDE.md is in producer-consumer-drift state — recommend delete, redirect stub, or supersede. |
| Biome 2 rules at `warn` not `error` — `complexity.noImportantStyles` + `style.noDescendingSpecificity`; CI runs `npx biome check .` without `--error-on-warnings`, so the gate passes with style violations present | `substantive-deviation` | F-003. Two-step remediation: fix underlying CSS issues, then escalate severity. |
| 5 GitHub Actions `@v*` not `@SHA`-pinned — `actions/checkout@v4`, `setup-node@v4`, `configure-pages@v4`, `upload-pages-artifact@v3`, `deploy-pages@v4`. Highest risk: `deploy-pages@v4` (OIDC token + pages:write). Workflow-root permissions block escalates `contents:read + pages:write + id-token:write` to all 3 jobs (deploy is the only consumer) | `substantive-deviation` | F-010. Supply-chain authority surface. Two-part remediation: SHA-pin all 5 actions + reduce workflow-root permissions to `contents:read` only, declare `pages:write + id-token:write` at deploy job level. |
| PR-time CI declared in deploy.yml but required-for-merge gate is GitHub branch-protection external to repo — not observable from Phase 10.5 re-grep | `drift-only` (per Sec. 10.5) | F-011. Carried here as caveat per Phase 0 routing; not in priority ranking. Resolve via `.github/branch-protection.json` (or equivalent IaC) + AGENTS.md decisions section + FF-008 (manual-review-only). |
| README.md L15 declares `MIT (c) 2025 Jeffrey Johnson` — current calendar year is 2026 | `cosmetic-or-framing-deviation` | F-004. Single-line edit. FF-010 (copyright-year-check) is a CI grep against `date +%Y`. |
| 0 score on Observability (11.7) — PostToolUse hook silent-error swallow (`2>/dev/null; exit 0`) on write-capable principal; zero in-repo telemetry | `substantive-deviation` | F-006. The single sharpest dimension in the audit. Partially justified by static-site context (no in-product LLM runtime to instrument) but the hook itself is a write-capable automation that should not be invisible. |

**No findings hidden. No halt history hidden (there is none).**

---

## Recommended fix order (per audit spec Sec. 12)

Audit-spec default order (vocabulary -> contracts -> authority -> state -> runtime -> policy/prompt -> observability -> evals -> governance -> FFs) applied to vgh's findings:

| # | Findings | Why now |
|---|---|---|
| 1 | F-002 + FF-007 | **Vocabulary/contracts:** DEV_GUIDE.md vs AGENTS.md contradiction is the highest-impact single docs collision in the audit family. Resolve before any other docs work touches the same surface. |
| 2 | F-008 + FF-006 | **Contracts (cross-repo):** Pair A producer-consumer pipeline. Highest-priority finding at 7.2. Cooperative with sibling `new-direction-2026 F-003 + FF-006`. |
| 3 | F-010 + FF-003 + FF-004 | **Authority:** SHA-pin GH Actions and reduce workflow-root permissions. `deploy-pages@v4` is the single highest-risk principal (OIDC + pages:write). |
| 4 | F-009 + FF-011 + FF-012 | **Tool surface:** `.mcp.json` for context7 OR explicit operator-installed annotation. Family-wide pattern; cross-cites sibling NDM. |
| 5 | F-006 + FF-001 + FF-002 | **Runtime + observability:** PostToolUse hook observability + scope declaration. The 0 on dim 11.7 lifts as soon as the hook surfaces errors. |
| 6 | F-001 + FF-005 | **Policy/prompt:** MAAT rebalance. Operator-deferred. Manual-review-only FF until operator-declared positioning contract exists. |
| 7 | F-012 + (catches in FF-007) | **Policy/prompt:** retire or implement theme-switching claim in THEMES.md. |
| 8 | F-003 + FF-009 | **Evals:** escalate biome warn -> error after fixing underlying CSS issues. |
| 9 | F-011 + FF-008 | **Governance:** declare branch-protection rules in `.github/branch-protection.json` (or AGENTS.md) for in-repo visibility. |
| 10 | F-004 + FF-010 | **Governance hygiene:** copyright year + project-list refresh (consolidate with F-001 operator decision on which projects to list). |
| - | F-007 (no remediation) | **Decision record** — experiments-sandbox boundary confirmed; no action required; optionally formalize cross-context promotion path as future ADR. |

---

## Recommended next-audit cadence

**Since 11.7 = 0 (the audit's sharpest dimension) but 11.11 = 2 (the highest of the four "infrastructure" dimensions 11.7/11.9/11.10/11.11), recommend: steady-state re-audit after the PostToolUse hook observability lands (FF-001 + FF-002).** The hook's silent-error pattern is the only structurally invisible runtime path in the repo; once it surfaces errors, 11.7 likely lifts from 0 to 1, the audit's lowest dimension shifts, and the second cycle can target the four 1-scored dimensions (11.3, 11.8, 11.9, 11.10) which are the theme-weighted ones.

**Trigger conditions for a fresh first-cycle (not steady-state):**

- Any of the 6 producer-to-consumer source documents at `../new-direction-2026/` move or rename — re-snapshot the content-pipeline contract.
- DEV_GUIDE.md is replaced rather than redirected — recompute the contract inventory.
- The site adopts a build-time content pipeline that consumes the sibling repo directly — Pair A reconfigures into a checked-in build step.

If none of the above trigger before the next cycle, **steady-state re-audit in 3 months** is sufficient. The smoke-test of the next cycle naturally validates remediation of F-002, F-008, F-010, F-006.

---

## Cycle-history proposals

The audit proposes — but does NOT commit — additions to `profile/cycle-history.md`. Detail in [`cycle-history-notes.md`](cycle-history-notes.md). **9 themes** covering:

- DEV_GUIDE.md staleness convention -> CI gate (docs-cross-reference-check).
- THEMES.md overstated-capability pattern -> build the switcher or retire the claim.
- PostToolUse hook observability convention -> stderr-on-failure OR audit log.
- GitHub Actions SHA-pinning convention -> pin to commit SHA, not `@v*`.
- Biome rule-severity-progression convention -> `warn` rules require dated justification or escalate to `error`.
- Multi-agent instruction parity (vgh: Claude + Cursor; less than new-direction's 4-way; less than planning's 2-way) -> cross-repo FF applies with per-repo cardinality.
- README copyright year -> CI check (or pin to "(c) current_year Jeffrey Johnson").
- Cross-repo content-pipeline consumer side -> cross-repo FF `html-source-revision-provenance-comment`.
- experiments-sandbox bounded context works cleanly -> preserve excluded-from-CI + excluded-from-build pattern.

The next profile directive run will read this and commit operator-approved entries to `profile/cycle-history.md`.

---

## Artifact map

| Phase | File | What it contains |
|---|---|---|
| 0 | [`00-scope.md`](00-scope.md), [`00-scope.json`](00-scope.json), [`00-reference-anchors.json`](00-reference-anchors.json) | Scope + audit mode (`first-cycle`) + reference-anchor pins (HTML5/CSS3, MCP, Vite/Biome) |
| 1 | [`01-vocabulary.md`](01-vocabulary.md), [`01-vocabulary.json`](01-vocabulary.json) | 110+ terms + 8 collisions (5 material + 3 advisory) including the 6-axis DEV_GUIDE-AGENTS design-system polysemy |
| 2 | [`02-context-map.md`](02-context-map.md), [`02-contexts.json`](02-contexts.json), [`02-context-map.mmd`](02-context-map.mmd) | 4 contexts confirmed (portfolio-pages, build-system, agent-governance, experiments-sandbox) |
| 3 | [`03-runtime.md`](03-runtime.md), [`03-runtime.json`](03-runtime.json) | 16 entrypoints + 0 loops + 4 write-capable paths routed to Phase 6 |
| 4 | [`04-contracts.md`](04-contracts.md), [`04-contracts.json`](04-contracts.json) | 22 contracts inventoried + flags (producer-consumer-drift x multiple, mcp-surface-uninventoried x 1, route-without-spec x 2) |
| 5 | [`05-state.md`](05-state.md), [`05-state.json`](05-state.json) | 12 in-repo stores + 1 external (CNAME / DNS); classification across 7 classes |
| 6 | [`06-authority.md`](06-authority.md), [`06-authority.json`](06-authority.json) | 11 principals + 14 flag instances + PostToolUse hook compound-flag + 5 actions @v* + OIDC escalation |
| 7 | [`07-observability.md`](07-observability.md), [`07-observability.json`](07-observability.json) | Evidence-of-absence dominant; build-source provenance `partial` (Pages deployment record); content + runtime-action provenance `absent` |
| 8 | [`08-policy.md`](08-policy.md), [`08-prompt-surfaces.json`](08-prompt-surfaces.json), [`08-policy.json`](08-policy.json) | 22 prompt-like surfaces classified; 15 stale-authoring-artifact (incl. 20 MAAT refs) + 2 contradictory-guidance |
| 9 | [`09-evals.md`](09-evals.md), [`09-evals.json`](09-evals.json) | 0 behavior-quality evals + 6 CI/release gates (biome lint, biome format-check, vite build, Pages deploy, PostToolUse hook, deny manifest) — `lychee link-check` absent (gap vs sibling planning) |
| 10 | [`10-findings.md`](10-findings.md), [`10-findings.json`](10-findings.json), [`10-scores.json`](10-scores.json), [`10-fitness-functions.md`](10-fitness-functions.md), [`10-fitness-functions.json`](10-fitness-functions.json) | 12 drafted findings + 12 FFs + 11-dim scores (aggregate 1.45) |
| 10.5 | [`10.5-finding-smoke-test.md`](10.5-finding-smoke-test.md), [`10.5-finding-smoke-test.json`](10.5-finding-smoke-test.json) | 9 confirmed-current + 1 re-evidenced + 1 struck (F-005) + 1 drift-only (F-011) |
| 11 | [`SUMMARY.md`](SUMMARY.md) (this file), [`cycle-history-notes.md`](cycle-history-notes.md) | Operator entry point + cycle-history proposals |

**12 audit-attention flags from the profile (AAF-VGH-001..012) were all routed and resolved across phases.** Zero dangling.

**Cross-repo synthesis:** the sibling four-repo synthesis lives at [`/Users/verlyn13/Repos/local/meta-inventory/audit/2026-05-21/cross-repo-synthesis-2026-05-21.md`](../../../../../local/meta-inventory/audit/2026-05-21/cross-repo-synthesis-2026-05-21.md). This audit is the consumer side of Pair A and Pair B and the third leaf of the synthesis.

---

## Boundary declarations (per Sec. 7 Phase 11)

- No struck finding (F-005) appears as an active finding in the priority ranking. It appears only in the drift summary ("Profile / current-branch drift summary") and in the smoke-test log.
- No drift-only item (F-011) appears as an active finding in the priority ranking. It appears in the drift summary and the caveats table.
- No caveats hidden. No halt history hidden (there is none).
- No new findings introduced in this summary. Every finding referenced exists in `10-findings.md` and was smoke-tested in `10.5-finding-smoke-test.md`.
- No edits to `profile/cycle-history.md`. The audit *proposes* additions in `cycle-history-notes.md`; the profile directive *commits* operator-approved entries on its next run.

---

## One-line takeaway

**verlyn13.github.io is structurally clean for a static portfolio site, but the cross-repo content pipeline to sibling new-direction-2026 has zero validation (F-008, priority 7.2) and a write-capable PostToolUse hook silently swallows all failures (F-006, priority 6.0) — close those two and the audit's lowest dimensions (11.3 contract discipline and 11.7 observability) both lift, lifting aggregate above 1.5 and meaningfully strengthening the career-transition pipeline this site exists to support.**
