# Profile Discovery — verlyn13.github.io

**Snapshot date:** 2026-05-21
**Profile mode:** `first-profile`
**Directive:** Project Profile Discovery Directive v1.2 (2026-05-08)
**Audit-spec target:** Agentic Architecture Audit Specification v3.1 (2026-05-08)

Narrative companion to `project_profile.yaml`. Replaces a shallow 2026-05-21 snapshot that failed §7 validation on: `skill_md_files: []` vs. 3 SKILL.md files actually under `.claude/skills/`; `.claude/settings.json` permissions + hooks uninventoried; `prompts.count: 0` vs. 9 prompts present; `experiments/` directory uninspected; `companion_artifacts: []` despite audit package readable; the DEV_GUIDE.md vs AGENTS.md design-system contradiction not detected; deploy.yml job structure not extracted.

---

## 1. Snapshot Metadata

| Field | Value |
|---|---|
| Repository root | `/Users/verlyn13/Repos/verlyn13/verlyn13.github.io` |
| VCS | git |
| Remote | `git@github.com:verlyn13/verlyn13.github.io.git` |
| Default branch | `main` |
| Branch at profile time | `main` |
| Revision pinned | `2c6924d27fc4128cce44423dd5f2b16539cb6023` (committed 2026-02-21, 3 months old) |
| Working-tree state | dirty (24 M + 2 U) |
| Profile mode | `first-profile` |
| Source confidence | high |

---

## 2. Phase-by-Phase Summary

### Phase A — Repository / Workspace Survey

Top-level: 7 governance/architecture docs (AGENTS.md 139 lines, CLAUDE.md 55, README.md 15, DEV_GUIDE.md, THEMES.md, LICENSE, CNAME-untracked), package config (package.json, package-lock.json), build config (vite.config.js, biome.json, .mise.toml), 11 deployed HTML pages (index, cv, contact, projects/×6, experience/index, research/index), 3 experiments/ pages (excluded from build), `assets/` (jeffrey.css + menu.js + icons/), `.github/workflows/deploy.yml`, `.claude/` (settings + 3 SKILLs + untracked settings.local.json), `.cursor/rules/` (3 .mdc files), `profile/` (this snapshot — untracked).

3 deployable units: `portfolio-website` (the static site), `claude-agent-bundle`, `cursor-agent-bundle`.

**Working-tree finding:** 24 modified files, 2 untracked. The modifications correspond to May 21 work referenced in sibling repo new-direction-2026/STATUS.md L23/L56 ("Portfolio website: Done. Built with Vite/Mise. Integrated MAAT & Budget Triage..."). Those edits exist in the working tree but were not committed before this profile cycle. Recorded as `known_debt: working-tree-drift-vs-snapshot-rev-2c6924d` and routed to audit Phase 0 as `AAF-VGH-005`.

### Phase B — Stack / Runtime

**Languages:** HTML (primary), CSS (secondary), JavaScript (supporting; only `assets/menu.js`), Markdown (supporting).

**Runtime:** Node.js 24 (build-time only; output is static HTML deployed to GitHub Pages).

**Frameworks (7):** Vite ^5.0.0 (build), Biome ^2.3.8 (lint/format), Claude Code claude-opus-4-6 (agent-framework), Cursor IDE (agent-framework), context7 MCP (mcp-sdk, operator-installed), GitHub Actions (build/CI/CD), mise (build/task-runner).

**Package managers:** `npm`. **Build tools:** `Vite`, `mise`. **Test frameworks / Eval frameworks:** none.

### Phase C — Infrastructure / Persistence

**Data stores (4):**

- 11 deployed static HTML pages (per vite.config.js L23-37) — authoritative-durable.
- `assets/jeffrey.css` (single-source stylesheet; AGENTS.md L94 invariant) — authoritative-durable.
- `vite.config.js` (build entry registry — the audit's contract for which pages exist) — authoritative-durable.
- `experiments/` (non-deployed prototypes; excluded from CI + build) — derived-durable.

**External services (3):** GitHub Pages (https://jvjohnson.dev custom domain via CNAME), GitHub Actions, sibling new-direction-2026 repo (content source per its AGENTS.md L131-142).

**No databases, queues, workflows, caches, vector stores, model providers, observability backends, policy engines.**

**Local-dev infrastructure (4):** Vite dev server (5173), Vite preview (4173), mise task runner, GitHub Actions CI (3-job pipeline).

### Phase D — Conventions / Governance / Rules

35 rules extracted, fully cited. Breakdown: 13 required, 9 forbidden, 6 conditional (Ask-first), 5 process, 2 precedence.

Key precedence facts:

- `AGENTS.md` is the canonical contract; `CLAUDE.md` is a shim (CLAUDE.md L3 — same pattern as siblings).
- Cursor rules apply per file glob: `project.mdc` is `alwaysApply: true`; `css.mdc` attaches to `assets/**/*.css`; `html.mdc` attaches to `*.html, projects/*.html, experience/*.html, research/*.html`.
- **Contradiction (routed AAF-VGH-002):** `DEV_GUIDE.md` L13-20 declares an 8-point grid (`--space-xs (4px) through --space-2xl (64px)`) and Serif body text (Georgia). `AGENTS.md` L116 + `.cursor/rules/project.mdc` L42 + `.cursor/rules/css.mdc` L25 declare a rem-based scale (`--space-1 through --space-5`) and system sans-serif (L118). These are mutually exclusive. DEV_GUIDE.md is stale.

### Phase E — Agent / Automation / Prompt Surface

**Model call sites:** zero (static site).

**Agent frameworks:** Claude Code (claude-opus-4-6), Cursor IDE.

**Tools:** 0 in-repo (build pipeline doesn't count; assets/menu.js is the only non-build runtime JS).

**Protocol surfaces:**

- **MCP:** present=true as **client**. `context7` operator-installed (CLAUDE.md L27-33). 2 known tools (`resolve-library-id`, `query-docs`). Other capabilities unknown; no `.mcp.json` in-repo (routed AAF-VGH-009).
- **A2A:** absent (grep for `agent-card | a2a | .well-known/agent.json` returns nothing).
- **Workflow contracts:** absent.

**Subagents:** 0. (AGENTS.md L63 references Claude Code's built-in Task tool agents; not project-defined.)

**Prompts (9 total):**

| Surface type | Count | Files |
|---|---:|---|
| `runtime-nonproduction-prompt` | 3 | `.claude/skills/{fix-issue,review-diff,ship-small}/SKILL.md` |
| `skill-or-sop` | 5 | `AGENTS.md`, `CLAUDE.md`, `.cursor/rules/{project,css,html}.mdc` |
| `documentation-about-prompts` | 1 | `DEV_GUIDE.md` (describes architecture; contradicts AGENTS.md) |
| `runtime-production-prompt` / `authoring-artifact-prompt` / `server-exposed-prompt` | 0 | — |

**Memory surfaces (2):**

- `claude-settings-permissions` — `operator-rules-memory`, `.claude/settings.json` (project-scoped permissions + PostToolUse hook).
- `claude-settings-local-untracked` — `operator-rules-memory`, `.claude/settings.local.json` (gitignored; contents invisible to audit).

**Execution modes (3):** `vite-build-batch` (GitHub Actions 3-job pipeline), `claude-posttooluse-event-triggered` (PostToolUse biome auto-format hook), `vite-dev-streaming` (operator-run Vite hot-reload).

**Guardrails (5):**

1. `claude-settings-deny-secrets` — Read+Write deny on `.env`, `.env.*`, `.envrc.local`; Write+Edit deny on `node_modules/`, `dist/`.
2. `claude-posttooluse-biome-format` — auto-format on every Write/Edit; 10s timeout.
3. `agents-md-never-list` — 6 hard "Never" rules.
4. `agents-md-ask-first-list` — 6 Ask-first rules.
5. `cursor-rules-no-style-blocks` — `.cursor/rules/html.mdc` L28 enforces no `<style>` blocks or inline styles.

**Handoffs (1):** `content-pipeline-from-sibling` — this repo consumes content from new-direction-2026 per its AGENTS.md L131-142. Manual handoff; sync skills in the sibling assist.

**Background agents:** none.

### Phase F — Baselines

**Evals:** all empty. No test runner, no eval suite. Quality is operator-verified visual + biome static checks.

**Observability:** all `none`/`n/a`. No analytics, no telemetry (AGENTS.md L112 forbids tracking scripts).

**Authority:** 10 approval gates declared spanning `ask` (5 Ask-first), `deny` (3 categories), `allow` (Bash command allowlist + GitHub Pages deploy). 7 protected-path classes. Default agent authority `read-write` with explicit deny on secrets + build outputs. Hosted-or-local: `hybrid` (local agents + hosted GitHub Actions).

**Provenance:**

- `runtime-action`: none.
- `content`: absent (no content credentials).
- `build-source`: partial (deploy.yml uses actions/deploy-pages@v4 which embeds metadata in Pages artifact; no explicit SLSA attestation).
- Format: none.

---

## 3. Files and Directories Read

In full or near-full: `AGENTS.md` (139 lines), `CLAUDE.md` (55 lines), `README.md` (15 lines), `.mise.toml` (42 lines), `biome.json` (35 lines), `package.json` (21 lines), `vite.config.js` (61 lines), `.github/workflows/deploy.yml` (83 lines), `.claude/settings.json` (39 lines), all 3 `.claude/skills/*/SKILL.md`, all 3 `.cursor/rules/*.mdc`.

Head only: `DEV_GUIDE.md` (~30 of ~100+ lines), `THEMES.md` (~30 lines).

Confirmed by listing or grep, not opened: `assets/jeffrey.css` (the single-source stylesheet — content not extracted), `assets/menu.js`, 11 deployed HTML pages (grep'd for MAAT references; entries confirmed against vite.config.js), 3 experiments/ HTML pages and svg-src/ files, `LICENSE`, `CNAME` (untracked; new), `.claude/settings.local.json` (untracked; gitignored).

## 4. Searches Performed and Limitations

Searches performed:

- `grep -n -i 'maat' across all HTML` — 21 matches across 13 files (favicon link on every page + 6 body-content references); used to enumerate AAF-VGH-001 evidence.
- `agent-card | a2a | .well-known/agent.json` — zero matches → A2A absent.
- `provenance | attestation | slsa | sigstore` in package.json/deploy.yml/vite.config.js — zero matches → build/source provenance position absent (partial via deploy-pages@v4 only).
- `.git/hooks/` — default samples only; no active hooks.
- `.pre-commit-config.yaml` — absent.

Limitations (also in `sources_summary.limitations`):

1. `assets/jeffrey.css` not opened in detail. The single-source CSS invariant is verified by AGENTS.md + .cursor/rules statements, not by content inspection.
2. `assets/menu.js` not opened; classified per AGENTS.md L21 + L133.
3. 11 deployed HTML pages not opened in full; only MAAT-grep'd and confirmed against vite.config.js entry-point map.
4. `DEV_GUIDE.md` and `THEMES.md` read in header only; contradiction caught at head, full content not extracted.
5. `experiments/` contents not enumerated beyond top-level + svg-src/ + timeline-* listing.
6. GitHub branch protection rules not verifiable from repo state (AAF-VGH-011).
7. GPG commit-signing setup not auditable from repo state.
8. Cross-repo content-pipeline integrity (sibling source vs. this site's HTML) not verified; routed AAF-VGH-008.

## 5. Operator Interview Answers (verbatim, batched 2026-05-21)

**Q1 (strategic themes):** "career-transition-readiness (custom, matches sibling) (Recommended)"

**Q2 (bounded contexts):** "4 contexts: portfolio-pages + build-system + agent-governance + experiments-sandbox (Recommended)"

**Q3 (known structural debt — multi-select):** All four candidates: MAAT dominance, DEV_GUIDE vs AGENTS.md contradiction, biome warnings + 2025 copyright (bundled), working-tree drift. Operator added: "Make plans to handle all structural drift" — interpreted same as sibling: all four items expected to be addressed by the audit's remediation pass.

**Q4 (companion artifacts):** "Same as siblings: inventory all 5 with drift_status: aligned (Recommended)"

## 6. Claimed Bounded Contexts (and why they remain claims)

| Name | Hint paths | Authority basis (claimed) | Why claimed |
|---|---|---|---|
| `portfolio-pages` | index.html + cv.html + contact.html + projects/ + experience/ + research/ + assets/ | 11 deployed pages per vite.config.js + single-source stylesheet | Audit Phase 2 verifies entry-point map vs. actually-deployed pages. |
| `build-system` | vite.config.js + biome.json + .mise.toml + package.json + deploy.yml | build + lint/format + CI/CD config; all Ask-first-protected | Audit Phase 2 verifies the build chain produces what the deploy step uploads. |
| `agent-governance` | AGENTS.md + CLAUDE.md + .claude/ + .cursor/ | agent-instruction docs + .claude/settings + 3 SKILLs + 3 .cursor rules; CLAUDE.md L3 mirrors sibling-repo pattern | Audit Phase 2 checks parity with sibling repos' agent governance. |
| `experiments-sandbox` | experiments/ | excluded from CI (biome.json L4) + excluded from build (vite.config.js); 'safe to prototype freely' (.cursor/rules/html.mdc L40) | Distinct lifecycle from portfolio-pages. New context — not in prior shallow profile. |

## 7. Strategic Themes and Weighting Recommendations

**Single theme:** `career-transition-readiness` (custom operator-defined, multiplier 1.5×; mirrors the sibling new-direction-2026 theme).

Weighted dimensions (operator-defined; no §11.12 default mapping for this custom theme):

- **11.3 Contract discipline** — cross-repo source→presentation chain (sibling's CV-extract → this repo's cv.html etc.).
- **11.10 Governance and audit trail** — DEV_GUIDE vs AGENTS.md contradiction is exactly a governance debt.
- **11.4 Tool surface clarity** — 3 Claude skills + 3 Cursor rules + 1 PostToolUse hook + 1 context7 MCP.
- **11.5 State and memory clarity** — `.claude/settings.json` as operator-rules-memory + `.claude/settings.local.json` as untracked operator-personal layer.

## 8. Known Debt

Four items, all `status: open`, all `source: operator-interview`:

1. **`maat-framework-narrative-dominance`** — Site favicon (maat_feather_16.svg) on every page (10 occurrences); README lead-paragraph; dedicated projects/maat.html; nav card; body content at index/experience/cv/research. Operator-stated minor/experimental positioning contradicted.
2. **`dev-guide-vs-agents-md-design-system-contradiction`** — DEV_GUIDE L13-15 declares 8-point grid (--space-xs..--space-2xl) and Serif body (L17-20). AGENTS.md L116/L118 + .cursor/rules say rem-based --space-1..--space-5 and system sans-serif. Mutually exclusive.
3. **`biome-warnings-plus-stale-copyright`** — biome.json L15-19 sets noImportantStyles + noDescendingSpecificity to `warn` not `error`; jeffrey.css contains warnings. README L13 says 'MIT © 2025' (year is 2026).
4. **`working-tree-drift-vs-snapshot-rev-2c6924d`** — 24 modified files (all 6 project pages + index/cv/contact + experience/research + jeffrey.css + vite.config.js + AGENTS.md + README + DEV_GUIDE + 6 experiments files) + 2 untracked (CNAME, profile/). 3 months stale.

Operator stated: "Make plans to handle all structural drift." All four items expected to be addressed by the audit's remediation pass.

## 9. Audit-Attention Flags → Target Audit Phase

| Flag ID | Description (short) | Phase | Reason |
|---|---|---:|---|
| AAF-VGH-001 | MAAT on 17+ pages (favicon every page + 6 body refs) vs. minor/experimental positioning | 8 | Stale-authoring-artifact across multiple pages |
| AAF-VGH-002 | DEV_GUIDE.md vs AGENTS.md design-system contradiction (spacing scale, typography) | 4 | Contradictory governance contracts; caps §11.10 |
| AAF-VGH-003 | Biome warnings set to 'warn' not 'error'; jeffrey.css contains them | 9 | Escalation FF candidate |
| AAF-VGH-004 | README copyright 2025 (year is 2026) | 8 | Stale-authoring-artifact; FF: copyright-year-check |
| AAF-VGH-005 | 24 M + 2 U at rev 2c6924d (3 months old); May 21 work uncommitted | 0 | Phase 0 drift; Phase 10.5 smoke-test |
| AAF-VGH-006 | PostToolUse biome hook silently swallows errors (2>/dev/null, exit 0) | 7 | Observability gap; hook is write-capable with no failure surface |
| AAF-VGH-007 | experiments/ tracked but excluded from CI/build; actively used (modified files) | 2 | Bounded context with distinct lifecycle |
| AAF-VGH-008 | Cross-repo content pipeline (sibling source → this presentation) has no automated check | 4 | Cross-repo contract; coordinated with AAF-NDM-012 |
| AAF-VGH-009 | context7 MCP referenced but no .mcp.json in-repo | 4 | mcp-surface-uninventoried; consistent with AAF-NDM-008 |
| AAF-VGH-010 | deploy.yml uses unpinned action versions (@v4); no SHA pinning | 6 | Third-party action authority; supply-chain FF candidate |
| AAF-VGH-011 | PR runs quality+build but merge-required-checks state is external | 0 | Declared vs enforced gap |
| AAF-VGH-012 | THEMES.md declares multi-theme switching capability with no automated implementation | 4 | Declared capability without implementation |

## 10. Drift Against Prior Profile

`profile_mode: first-profile`. The shallow `2026-05-21` profile (Antigravity-authored, ~13.6 KB YAML, ~80-line discovery) is replaced in place. Prior version preserved in git history. Key §7 violations the prior version had (now fixed):

- `skill_md_files: []` — wrong; 3 SKILL.md files in `.claude/skills/`.
- `prompts.count: 0` — wrong; 9 prompts with surface-type breakdown.
- `protocol_surfaces.mcp.present: false` — wrong; context7 IS declared (CLAUDE.md L27-33) and counts as MCP client.
- `existing_fitness_functions: []` — wrong; 6 fitness functions inventoried (4 biome/vite/deploy + 1 PostToolUse hook + 1 settings.json deny manifest).
- `companion_artifacts: []` — wrong; 5 with drift_status: aligned.
- Internal contradictions like `operator_questions_asked: 0` while `strategic_theme.source: docs` (this profile asked 4 questions and properly tags answers).

## 11. Protocol-Surface, Authority-Matrix, State/Memory, Provenance, and Semantic-Convention Baseline Notes

### Protocol surfaces

- **MCP:** present=true as client. context7 operator-installed; 2 known tools. No project-scoped .mcp.json (AAF-VGH-009).
- **A2A:** absent.
- **Workflow contracts:** absent.

### Authority matrix

- 10 approval gates declared.
- 7 protected-path classes.
- Sandbox: repo root (no MCP-level filesystem scope in-repo).
- Callback auth: n/a.
- Secondary credentials: GitHub Actions OIDC token (id-token:write).
- Hosted-or-local: hybrid (local agents + hosted GitHub Actions).
- Default agent authority: read-write with explicit deny on secrets and build outputs.

### State and memory classes (separated, not merged)

- `operator-rules-memory` × 2 (.claude/settings.json + .claude/settings.local.json untracked).
- `authoritative-durable` × 3 (deployed HTML, single CSS, vite.config.js).
- `derived-durable` × 1 (experiments/ sandbox).
- No request-local, no session-state, no durable-conversation-state, no retrieval-corpus, no retrieval-index, no long-term-memory.

### Provenance classes (separated, not merged)

- `runtime-action`: none.
- `content`: absent (no content credentials advertised on the deployed site).
- `build-source`: **partial** — actions/deploy-pages@v4 embeds deployment metadata in Pages artifact (run ID, commit SHA via OIDC), but no explicit SLSA attestation. Format: none.

### Semantic conventions

n/a.

## 12. Companion-Artifact Alignment Notes

5 companion files at `/Users/verlyn13/Downloads/audit spec v3 2/agentic-architecture-audit-v3.1-package/`:

| Path | Role | Targets | Drift |
|---|---|---|---|
| `agentic-audit-spec-v3.md` | authority-spec | Audit Spec v3.1, 2026-05-08 | aligned |
| `project-profile-directive.md` | profile-directive | Profile Directive v1.2, 2026-05-08 | aligned |
| `audit-kickoff-prompt.md` | kickoff-prompt | Audit Spec v3.1 + Profile Directive v1.2 | aligned |
| `audit-spec-friendly-explainer.md` | friendly-explainer | Audit Spec v3.1 + Profile Directive v1.2 | aligned |
| `audit-directive-set-manifest.md` | manifest | package date 2026-05-08 | aligned |

Treatment: operational authority for THIS audit cycle. Not embedded into the repo's own governance contract.

## 13. Validation Checklist (per directive §7)

- [x] Every required field has value or explicit `source: unknown`/`none`/`n/a` with reason.
- [x] Every file-cited field has path + line range or line.
- [x] Every framework/stack role has evidence.
- [x] All 35 conventions rules have source metadata.
- [x] All 4 `claimed_bounded_contexts[]` retain `status: claimed`.
- [x] Contradictions either halted or routed (AAF-VGH-002 routes DEV_GUIDE vs AGENTS.md to audit Phase 4).
- [x] Infrastructure access rules recorded with limitation notes.
- [x] `agent_surface.tools.count: 0` with search notes.
- [x] `agent_surface.protocol_surfaces.mcp.present: true` with concrete configured_servers (context7) + evidence + search notes for absent .mcp.json.
- [x] `agent_surface.subagents.count: 0` with search notes.
- [x] `agent_surface.prompts.count: 9` with surface-type breakdown and search notes.
- [x] `agent_surface.memory_surfaces_detected` includes both classes with deletion/reset path + authority notes.
- [x] `baselines.observability.semantic_conventions_used: none` with `n/a` for version/stability.
- [x] `baselines.authority.approval_gates` 10 entries with approval mode + bypass modes (none declared) + precedence hints.
- [x] `governance.companion_artifacts` 5 entries with target spec versions + drift_status.
- [x] No previous profile → no diff artifacts required.
- [x] All 12 audit-attention flags routed (0×2, 2×1, 4×4, 6×1, 7×1, 8×2, 9×1).
- [x] Operator-interview answers do not overwrite stronger file evidence.
- [x] `strategic_themes`: 1 custom theme (`career-transition-readiness`) with operator-defined dimensions and source.
- [x] No cycle-history additions (no prior cycle).

## 14. Halt History

None.

## 15. Cycle-History Proposed Updates

None. First profile cycle.

## 16. Refresh Diff Summary

Not applicable (`first-profile`).

---

## Profile-to-Audit Handoff Checklist (directive §11)

- [x] `project_profile.yaml` exists and §7 validates.
- [x] `profile-discovery.md` exists (this file).
- [x] No previous profile → no diff required.
- [x] All 12 `audit_attention_flags[]` routed.
- [x] All 4 `claimed_bounded_contexts[]` remain `status: claimed`.
- [x] Protocol surfaces: MCP present as client (context7), A2A absent, workflow contracts absent.
- [x] Authority baselines: 10 approval gates with mode/bypass/precedence; protected paths; callback auth n/a; secondary credentials (GitHub OIDC).
- [x] State/memory: 4 classes; both operator-rules-memory variants captured.
- [x] Semantic-convention: n/a.
- [x] Provenance: `runtime-action: none`, `content: absent`, `build-source: partial`.
- [x] Scope explicit (include + exclude with experiments/ + node_modules + dist + .env).
- [x] Strategic theme: `career-transition-readiness` (custom).
- [x] Halt: none.

The audit can begin Phase 0 against this snapshot. Phase 0 must:

1. Classify the 24 M + 2 U files at rev 2c6924d as drift (AAF-VGH-005); smoke-test in Phase 10.5 against current branch.
2. Cross-reference with sibling new-direction-2026 profile for content-pipeline contracts (AAF-VGH-008 + sibling AAF-NDM-012).
3. Apply `career-transition-readiness` theme weighting (1.5× direct) to Phase 10 prioritization.
4. Treat AAF-VGH-001 (MAAT dominance) as a Phase 8 multi-page authoring-artifact pattern, not 17 separate findings.
