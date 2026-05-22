# Phase 10 — Fitness Function Candidates (verlyn13.github.io)

**Audit date:** 2026-05-21
**Snapshot ref:** `ee6c7e55331faaf55fa6bb4cde49abd9e1c96f9a` (HEAD)
**Spec anchor:** agentic-audit-spec-v3.1 §8.12

12 fitness function candidates (FF-001..FF-012). Each names rule, enforcement category, scope, failure condition, owner. IDs are independent of finding IDs (§10.2).

---

## 1. Catalog

| ID | Title | Enforcement category | Related findings | Cross-repo |
|---|---|---|---|---|
| FF-001 | claude-code-hook-observability | `telemetry-lint` | F-006 | vgh-specific |
| FF-002 | claude-code-hook-scope-declaration | `authority-manifest` | F-006 | vgh-specific |
| FF-003 | pin-github-actions-to-sha | `static-analysis` | F-010 | family-wide applicable |
| FF-004 | per-job-actions-permissions | `authority-manifest` | F-010 | family-wide applicable |
| FF-005 | maat-positioning-narrative-balance | `manual-review-only` | F-001 | Pair B with NDM FF-005 |
| FF-006 | html-source-revision-provenance-comment | `contract-registry` | F-008 | Pair A consumer-side with NDM FF-006 |
| FF-007 | docs-cross-reference-check | `companion-doc-drift` | F-002, F-012 | vgh-novel, family-extensible |
| FF-008 | branch-protection-declaration | `manual-review-only` | F-011 | cross-cites planning FF-008 |
| FF-009 | biome-rule-severity-progression | `static-analysis` | F-003 | vgh-novel |
| FF-010 | copyright-year-check | `static-analysis` | F-004 | family-wide |
| FF-011 | mcp-project-scoping | `protocol-contract-registry` | F-009 | family-wide, cross-cites NDM FF-007 + AAF-NDM-008 |
| FF-012 | mcp-tool-schema-recorded | `protocol-contract-registry` | F-009 | family-wide, complements FF-011 |

**Distribution by enforcement category:**

- `static-analysis`: 3 (FF-003, FF-009, FF-010)
- `authority-manifest`: 2 (FF-002, FF-004)
- `protocol-contract-registry`: 2 (FF-011, FF-012)
- `telemetry-lint`: 1 (FF-001)
- `contract-registry`: 1 (FF-006)
- `companion-doc-drift`: 1 (FF-007)
- `manual-review-only`: 2 (FF-005, FF-008)

**Cross-repo applicable: 8 of 12** (FF-003, FF-004, FF-005 Pair B, FF-006 Pair A, FF-008, FF-010, FF-011, FF-012). **vgh-specific: 4** (FF-001, FF-002, FF-007, FF-009).

---

## 2. FF-001 — claude-code-hook-observability

**Rule:** Every PostToolUse / PreToolUse / UserPromptSubmit hook in `.claude/settings.json` must (1) tee stderr to `.claude/logs/<hook_event>.log`, (2) propagate the underlying tool's exit code (no `exit 0`), (3) emit a structured event line per invocation (timestamp + matcher + file_path + tool_exit_code + tool_version).

**Enforcement category:** `telemetry-lint`
**Scope:** `.claude/settings.json` + `.claude/logs/`
**Failure condition:** Any `hooks[].command` contains `2>/dev/null` OR `exit 0` after a write-capable command OR omits a tee to `.claude/logs/` OR omits a structured event-line emit.
**Related findings:** F-006.
**Owner:** jeffrey.
**Implementation notes:** Lint via simple regex on `.claude/settings.json` `hooks[].command` strings. Static check; no runtime instrumentation needed. Enforcement tech: `jq + grep` in a CI step.

---

## 3. FF-002 — claude-code-hook-scope-declaration

**Rule:** Every PostToolUse hook must declare a typed `filesystem_scope` (paths it is allowed to modify) and `approval_mode` (auto-approve|ask|deny) explicitly, even when matching `Write|Edit` broadly.

**Enforcement category:** `authority-manifest`
**Scope:** `.claude/settings.json hooks[]`
**Failure condition:** A hook has a Write|Edit matcher but does not declare `filesystem_scope` OR `approval_mode` fields.
**Related findings:** F-006.
**Owner:** jeffrey.
**Implementation notes:** Requires extending Claude Code's hook schema OR adopting a parallel manifest at `.claude/hooks-manifest.json`. Schema validator in CI.

---

## 4. FF-003 — pin-github-actions-to-sha

**Rule:** Every `uses:` reference in `.github/workflows/*.yml` must pin to a 40-hex SHA, not to a major-version tag (`@v4`) or branch.

**Enforcement category:** `static-analysis`
**Scope:** `.github/workflows/**/*.yml`
**Failure condition:** Any `uses:` value matches `@v[0-9]+(\.[0-9]+)*$` or `@<branch>` instead of `@<40-hex>`.
**Related findings:** F-010.
**Cross-repo:** Applicable to any sibling adding Actions later.
**Owner:** jeffrey.
**Implementation notes:** Trivial grep: `grep -nE 'uses:.*@v[0-9]' .github/workflows/*.yml && exit 1`. Dependabot can auto-update SHA pins.

---

## 5. FF-004 — per-job-actions-permissions

**Rule:** GitHub Actions workflow files must declare `permissions:` at job level, not workflow level. Workflow-root `permissions:` block must be either absent or restricted to `contents: read` only.

**Enforcement category:** `authority-manifest`
**Scope:** `.github/workflows/**/*.yml`
**Failure condition:** Workflow-root `permissions:` block contains any write permission OR any job lacks per-job `permissions:` when running with elevated capabilities.
**Related findings:** F-010.
**Owner:** jeffrey.
**Implementation notes:** Static YAML parser check. Tools: `yq + grep`, or `actionlint` with a custom rule.

---

## 6. FF-005 — maat-positioning-narrative-balance (manual-review-only)

**Rule:** Operator maintains a CURRENT-positioning list (e.g., in AGENTS.md or a frontmatter file). Cross-check: no project name appears in `<title>` + favicon + lead-paragraph + dedicated-page + nav-card simultaneously unless it is on the current-positioning list.

**Enforcement category:** `manual-review-only`
**Scope:** All deployed HTML pages + README.md.
**Failure condition:** A project name appears on N≥3 surface kinds while NOT being on the operator-declared current-positioning list (the list does not exist at HEAD `ee6c7e5`, so the FF starts as manual-review-only).
**Related findings:** F-001.
**Cross-repo:** Pair B mirror at sibling new-direction-2026 FF-005.
**Owner:** jeffrey.
**Implementation notes:** Cannot be automated without an operator-declared current-positioning contract. Phase 10.5 demotes to `manual-review-only` if no contract exists.

---

## 7. FF-006 — html-source-revision-provenance-comment

**Rule:** Every generated HTML page in `dist/` must embed a `<!-- source: <sibling-repo> @ <sha> | generated: <timestamp> -->` comment in `<head>` referencing the upstream content-source repository commit SHA.

**Enforcement category:** `contract-registry`
**Scope:** `dist/**/*.html` + build pipeline.
**Failure condition:** A built HTML page lacks the source-comment OR the SHA does not match a real commit in the sibling repo OR the timestamp is more than 30 days old.
**Related findings:** F-008.
**Cross-repo:** Pair A consumer-side; pairs with sibling new-direction-2026 FF-006 producer-side check.
**Owner:** jeffrey.
**Implementation notes:** Vite plugin (transformIndexHtml hook) reads upstream sibling's SHA via `git -C ../new-direction-2026 rev-parse HEAD`. CI grep validates presence.

---

## 8. FF-007 — docs-cross-reference-check

**Rule:** Every file/path reference in governance docs (AGENTS.md, CLAUDE.md, DEV_GUIDE.md, THEMES.md, README.md, `.cursor/rules/*.mdc`, SKILL.md) must point to a file that exists at HEAD, OR be explicitly marked `(historical reference)`.

**Enforcement category:** `companion-doc-drift`
**Scope:** AGENTS.md, CLAUDE.md, DEV_GUIDE.md, THEMES.md, README.md, `.cursor/rules/`, `.claude/skills/`.
**Failure condition:** A path-like string (matching `[a-z][a-z0-9/_.-]+\.(html|css|js|md|json|yml|svg)`) in any listed file does not resolve to a real file at HEAD AND is not annotated as historical.
**Related findings:** F-002, F-012.
**Cross-repo:** vgh-novel; could extend family-wide (planning-summer-2026 has `tools/lint_docs.py` which is a sister tool).
**Owner:** jeffrey.
**Implementation notes:** Python script extracts path-shaped strings, checks filesystem existence. Add to `mise` `ci` task.

---

## 9. FF-008 — branch-protection-declaration (manual-review-only)

**Rule:** Required CI gates (quality, build) must be declared as required-for-merge in a checked-in `.github/branch-protection.json` (or equivalent IaC), even if actual enforcement is at GitHub.com.

**Enforcement category:** `manual-review-only`
**Scope:** `.github/branch-protection.json` or equivalent + AGENTS.md decisions section.
**Failure condition:** AGENTS.md or `.github/branch-protection.json` does not enumerate the required CI gates with a `required: true` flag.
**Related findings:** F-011.
**Cross-repo:** Cross-cites sibling planning-summer-2026 FF-008 (same enforcement-class problem).
**Owner:** jeffrey.
**Implementation notes:** `manual-review-only` by enforcement nature — GitHub branch-protection state can be exported via `gh api repos/:owner/:repo/branches/main/protection` in a scheduled workflow, but the comparison requires admin token.

---

## 10. FF-009 — biome-rule-severity-progression

**Rule:** Every biome rule severity must be `error`, OR have an inline justification comment (`// FF-009: warn-temporarily because <reason> until <date|sha>`) when set to `warn`.

**Enforcement category:** `static-analysis`
**Scope:** `biome.json`.
**Failure condition:** Any rule in `biome.json` is set to `warn` without an adjacent comment matching the justification pattern; rules set to `info` or `off` fail the same check.
**Related findings:** F-003.
**Owner:** jeffrey.
**Implementation notes:** Trivial CI grep on `biome.json`.

---

## 11. FF-010 — copyright-year-check

**Rule:** README.md and any LICENSE/COPYRIGHT files must declare a copyright year-range that includes the current calendar year.

**Enforcement category:** `static-analysis`
**Scope:** README.md, LICENSE, COPYRIGHT, *.html footers.
**Failure condition:** Any matched copyright string (e.g., `© <year>` or `<year> Jeffrey Johnson`) has a max year less than `date +%Y`.
**Related findings:** F-004.
**Cross-repo:** Family-wide applicable.
**Owner:** jeffrey.
**Implementation notes:** Single-line grep with `date +%Y`. Add to `mise` `ci` task.

---

## 12. FF-011 — mcp-project-scoping

**Rule:** Every MCP server referenced by name in CLAUDE.md, AGENTS.md, or any SKILL.md must have a corresponding entry in `.mcp.json` (project-scoped) OR be explicitly annotated `(operator-installed; not project-scoped; see <URL>)`.

**Enforcement category:** `protocol-contract-registry`
**Scope:** `.mcp.json` + CLAUDE.md + AGENTS.md + `.claude/skills/*.md` + `.cursor/rules/*.mdc`.
**Failure condition:** An MCP server name (e.g., `context7`, `memory`, `brave-search`, `firecrawl`, `github`) appears in any listed file without a matching `.mcp.json` entry AND without the operator-installed annotation.
**Related findings:** F-009.
**Cross-repo:** Family-wide; cross-cites sibling new-direction-2026 FF-007 (`mcp-json-presence`) — same pattern, this version is more lenient (allows operator-installed annotation).
**Owner:** jeffrey.
**Implementation notes:** Python script: extract MCP names from CLAUDE.md MCP table, cross-check `.mcp.json` + operator-installed annotations.

---

## 13. FF-012 — mcp-tool-schema-recorded

**Rule:** Every MCP tool referenced in instruction surfaces must have a schema record either in `.mcp.json` OR in `.mcp-schemas/<server>/<tool>.json` with at minimum a tool name, description, and input-parameter shape.

**Enforcement category:** `protocol-contract-registry`
**Scope:** `.mcp.json` + `.mcp-schemas/` + instruction surfaces.
**Failure condition:** An MCP tool name (e.g., `mcp__context7__resolve-library-id`, `mcp__memory__search_nodes`) appears in any instruction surface without a corresponding schema record.
**Related findings:** F-009.
**Cross-repo:** Family-wide; complements FF-011; cross-cites sibling AAF-NDM-008.
**Owner:** jeffrey.
**Implementation notes:** Tool schemas may be retrieved at runtime from each MCP server's `tools/list` endpoint and snapshotted to `.mcp-schemas/`.

---

## 14. Cross-repo FF alignment

| Cross-cited sibling FF | This repo | Status |
|---|---|---|
| sibling NDM FF-016 + planning FF-012 `claude-code-settings-canonicalization-across-repos` | (not duplicated here) | vgh already has `.claude/settings.json`; the cross-repo rule is **satisfied** on this side. Planning + new-direction need the cross-repo FF more. |
| sibling NDM FF-005 `maat-positioning-string-match` | FF-005 here | Pair B mirror; both manual-review-only |
| sibling NDM FF-006 `cross-repo-content-sync-check` | FF-006 here | Pair A consumer-side; the two together close the pipeline |
| sibling NDM FF-007 `mcp-json-presence` | FF-011 here (extended) | family-wide; this version allows operator-installed annotation |
| sibling NDM AAF-NDM-008 (5 MCPs uninventoried) | FF-011 + FF-012 here | family-wide pattern |
| sibling planning FF-008 `CI branch-protection declaration` | FF-008 here | same enforcement-class manual-review-only problem |
| sibling NDM AAF-NDM-013 / FF-014 `gitignore-latex-build-artifacts` | (not applicable) | vgh has no LaTeX artifacts |

---

## 15. Phase 10 exit check (§7 Phase 10)

| Criterion | Status |
|---|---|
| Every fitness function names enforcement category | ✓ (12/12) |
| Every fitness function names scope | ✓ (12/12) |
| Every fitness function names failure condition | ✓ (12/12) |
| Every fitness function names owner recommendation | ✓ (all owner: jeffrey) |
| Findings and fitness functions have separate IDs | ✓ (F-001..F-012 vs FF-001..FF-012; no overlap) |
| Enforcement tech exists OR FF demoted to `manual-review-only` | ✓ (FF-005 + FF-008 are manual-review-only by enforcement nature; remaining 10 have concrete CI-implementable mechanisms) |

See [`10-findings.md`](10-findings.md) for the F-001..F-012 current-state list.
See [`10.5-finding-smoke-test.md`](10.5-finding-smoke-test.md) for Phase 10.5 re-grep against HEAD `ee6c7e5`.
