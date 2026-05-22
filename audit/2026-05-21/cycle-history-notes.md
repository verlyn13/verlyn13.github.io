# Cycle-History Notes (audit's proposal to profile directive)

**Audit date:** 2026-05-21
**Repo:** verlyn13.github.io
**Audit mode:** `first-cycle`
**Authoring rule:** per audit spec §7 Phase 11 — the audit *proposes* additions. The profile directive (run separately) *commits* approved entries to `profile/cycle-history.md` after operator review.

This file lists conventions and process patterns the audit observed or recommends. **None is committed automatically.** Operator reviews and the profile directive's Phase I appends approved entries to `profile/cycle-history.md`.

---

## 1. DEV_GUIDE.md staleness convention

**Observation:** `DEV_GUIDE.md` contradicts the operator-declared canonical `AGENTS.md` on 6 design-system axes (spacing scale, body typography, content max-width, primary accent, secondary accent, CSS filename) AND references 3 file-path categories that do not exist at HEAD: `assets/styles.css` (actual file is `assets/jeffrey.css`), `research/maat.html` + `research/scopecam.html` (actual files at `projects/`), and the `academic/` tree. This is the highest-impact single docs collision in the four-repo audit family. F-002.

**Cycle-history candidate (CI gate):** introduce a `docs-cross-reference-check` CI gate that verifies every relative-link/file-path reference in markdown governance docs resolves at HEAD. **Reference impl exists at sibling `planning-summer-2026/tools/lint_docs.py`** — same tool family, cross-port to vgh. Pattern: extract path-shaped strings (`[a-z][a-z0-9/_.-]+\.(html|css|js|md|json|yml|svg)`) from AGENTS.md/CLAUDE.md/DEV_GUIDE.md/THEMES.md/README.md/`.cursor/rules/*.mdc`/SKILL.md; assert filesystem existence OR `(historical reference)` annotation. Add to `mise` `ci` task. **FF-007.**

---

## 2. THEMES.md overstated-capability pattern

**Observation:** THEMES.md L1-5 declares "This site supports multiple visual themes…"; L25-41 names `styles-academic.css` as the second theme; L48-51 provides a sed-script for switching. But `assets/styles-academic.css` does NOT exist (the actual file is at `experiments/themes/academic.css`, in a different bounded context), and the sed-script would silently no-op. The capability is declared, implementation is partial-and-broken, no automated implementation exists. F-012.

**Cycle-history candidate (binary decision):** either **build the theme switcher** (move `experiments/themes/academic.css` → `assets/styles-academic.css`, add HTML switcher, wire to CSS class on `<body>`) **OR retire the claim** (keep THEMES.md as a single-theme philosophy doc or delete). The middle state ("documented capability, broken implementation") is the worst of both worlds and FF-007 catches the broken file reference but not the conceptual mismatch. **No CI rule can decide for the operator; this is an authoring decision the next cycle should resolve.**

---

## 3. PostToolUse hook observability convention

**Observation:** `.claude/settings.json` L27-37 PostToolUse hook on `Write|Edit` matcher runs `npx biome format --write … 2>/dev/null; exit 0`. **Silenced stderr + forced exit 0 + 10-second timeout + auto-approved matcher = write-capable automation principal with zero observability.** F-006 + Phase 6 A-04 compound flag (ambient-authority + write-without-approval-policy + approval-not-enforced) + Phase 7 §3.4 single-biggest observability gap.

**Cycle-history candidate:** **hooks must surface errors via either (a) stderr-on-failure OR (b) audit log to `.claude/logs/<hook_event>.log`** — not silent suppression. Specifically: every PostToolUse / PreToolUse / UserPromptSubmit hook must (1) tee stderr to `.claude/logs/`, (2) propagate the underlying tool's exit code (no `exit 0` after a write), (3) emit a structured event line (timestamp + matcher + file_path + tool_exit_code + tool_version). **FF-001 (claude-code-hook-observability).** Companion FF-002 (claude-code-hook-scope-declaration) adds typed `filesystem_scope` + `approval_mode` fields.

This convention is **vgh-current + family-extensible** — any sibling repo that adopts PostToolUse hooks should inherit the convention.

---

## 4. GitHub Actions SHA-pinning convention

**Observation:** `.github/workflows/deploy.yml` uses 5 GitHub Actions at `@v*` (major-tag pinning), not `@<40-hex>` SHA pinning: `actions/checkout@v4`, `setup-node@v4`, `configure-pages@v4`, `upload-pages-artifact@v3`, **`deploy-pages@v4`**. The last is the single highest-risk principal — it receives the OIDC token and publishes to `jvjohnson.dev`. F-010.

**Cycle-history candidate:** **pin GitHub Actions to commit SHA, not `@v*`** — especially `deploy-pages` (OIDC + pages:write) and any other action with elevated permissions. Implementation: simple grep `grep -nE 'uses:.*@v[0-9]' .github/workflows/*.yml && exit 1` in CI; dependabot can auto-update SHA pins. **FF-003.** Companion FF-004 (per-job-actions-permissions): reduce workflow-root `permissions:` block to `contents:read` only; declare `pages:write + id-token:write` at deploy job level only.

This convention is **family-wide applicable** — any sibling adding `.github/workflows/` should inherit it.

---

## 5. Biome rule-severity-progression convention

**Observation:** `biome.json` L15-19 sets `complexity.noImportantStyles: "warn"` and `style.noDescendingSpecificity: "warn"`. `.github/workflows/deploy.yml` L36-37 runs `npx biome check .` **without `--error-on-warnings`**, so CI exits 0 despite style violations. F-003 + AAF-VGH-003.

**Cycle-history candidate:** **biome rules at `warn` must either (a) escalate to `error` OR (b) carry an inline justification comment with a dated escape hatch** — e.g., `// FF-009: warn-temporarily because <reason> until <date|sha>`. Two-step adoption: (1) fix underlying CSS issues that triggered the `warn` setting, (2) escalate severity to `error`. Specifically: escalate `noImportantStyles` + `noDescendingSpecificity` after the underlying CSS is brought into compliance. **FF-009.**

---

## 6. Multi-agent instruction parity (vgh-specific cardinality)

**Observation:** verlyn13.github.io carries a **dual** instruction-surface pair: `CLAUDE.md` (primary) + `.cursor/rules/{project,css,html}.mdc` (Cursor IDE). This is **less than sibling new-direction-2026's 4-way** (AGENTS.md + CLAUDE.md + GEMINI.md + .cursor/rules/project.mdc) and **less than sibling planning-summer-2026's 2-way** (Claude + Codex; planning has a stricter Codex permission subset). meta-inventory is single-primary.

**Cycle-history candidate:** the family-wide FF **`multi-agent-instruction-parity-lint` still applies to vgh**, parameterized to its 2-way cardinality. Pattern: extract the canonical claims (project purpose, file boundaries, tool allowlist, MCP table) from each instruction surface; assert no contradictions. The drift modes new-direction-2026 surfaced (MCP-table omissions, threshold inconsistencies, project-count drift, never-list cardinality) are also possible here at smaller scale. **Cross-repo FF; vgh-applicable.**

---

## 7. README copyright year convention

**Observation:** `README.md:15` declares `MIT © 2025 Jeffrey Johnson`. Current calendar year is 2026. F-004.

**Cycle-history candidate:** either **(a) CI check** that verifies `README.md` (and any LICENSE / COPYRIGHT / HTML footer) declares a copyright year-range including `date +%Y` — implementable as a single-line grep — **OR (b) pin to a template string** like `© current_year Jeffrey Johnson` rendered at build time by the Vite pipeline. **FF-010** prefers (a). **Family-wide applicable** — every sibling has a README; all four repos benefit.

---

## 8. Cross-repo content-pipeline (consumer side; pairs with sibling new-direction-2026 producer side)

**Observation:** Pair A. Sibling `../new-direction-2026/AGENTS.md:131-142` declares 6 source → destination mappings. The 11 deployed HTML pages here consume those sources. **No source-revision provenance comment in destinations. No build-time check. No automated content freshness validation.** F-008 (priority 7.2 — the audit's #1 finding).

**Cycle-history candidate:** propose **`html-source-revision-provenance-comment` as a cross-repo FF** — embed `<!-- source: new-direction-2026 @ <sha> | generated: <timestamp> -->` comment in each generated HTML `<head>`. Implementation: Vite `transformIndexHtml` plugin reads `git -C ../new-direction-2026 rev-parse HEAD`; CI greps for presence; freshness window (e.g., 30 days) raises a warning. **Pair A consumer-side closes when this lands here AND sibling's producer-side check lands at `new-direction-2026 FF-006`. Both halves required for full pipeline integrity.** This is the single most strategically aligned FF for the `career-transition-readiness` theme.

---

## 9. experiments-sandbox bounded context (works cleanly; preserve the pattern)

**Observation:** Phase 2 §2.4 confirmed `experiments/` as a bounded context with `stateless-policy` authority basis. Distinguishing characteristics that make it work cleanly:

- **Excluded from CI** via `biome.json` L4 `files.includes` (relaxed-rules lifecycle)
- **Excluded from build** via `vite.config.js` `rollupOptions.input` (not a deployable entry)
- **Manual cross-context promotion path** documented (`experiments/braid-timeline.svg` → `experience/index.html` L54)
- **17 files** with authored prototypes (3 HTML + svg-src/ subdir + themes/academic.css + timeline)

F-007 (decision record, no remediation).

**Cycle-history candidate:** **preserve the excluded-from-CI + excluded-from-build pattern** for future experiments. The two `excludes` are the entire pattern — if either is removed, experiments-sandbox stops being a real bounded context and starts leaking into production. **Cycle-history records the convention:** experiments-sandbox boundary works because of two specific exclusions; future audits should re-verify both exclusions at Phase 2; future structural changes should not silently include `experiments/` in either gate. Optionally the manual cross-context promotion path can be formalized as an ADR in a later cycle when the ADR catalog exists (governance dim 11.10 = 1; FF-008 noting the gap).

---

## 10. Halt-recovery patterns observed

**None.** No halt conditions triggered during this audit. Smoke-test halt threshold (>33.3% struck or drift-only) was 16.7% (2 of 12). Profile halt threshold was not triggered (zero commit-level drift). **Cycle-history doesn't need a halt-pattern entry for this cycle.**

---

## 11. Strategic-theme observations for next cycle

Operator selected `career-transition-readiness` as the sole theme (custom; 1.5× on 11.3 + 11.4 + 11.5 + 11.10). The findings naturally clustered:

- **3 findings direct-weighted** (F-002 + F-008 + F-009) — all on 11.3 + 11.4
- **1 finding indirect-weighted** (F-001 via Pair B amplification, 1.2×) — on 11.8 (not theme-weighted) but cross-repo strategic
- **2 of the 4 theme-weighted dimensions (11.5 + 11.10) carried no individual finding** — meaning the theme weights dimensions that scored at 2 (state) and 1 (governance) without any specific F-* hitting those dimensions

**Cycle-history candidate:** **next cycle should consider whether to add `agent-runtime-consolidation` as a second theme** (it would weight 11.4 + 11.6, capturing F-009 and F-010). Currently F-010 (5 actions @v*, dim 11.6, severity 3) ranks #6 unweighted; with theme weighting it would lift toward the top. **Compare to sibling new-direction-2026 which carries both themes** — the dual-weighting elevated F-001 there. This is a calibration question for the next cycle, not a current-cycle finding.

---

## 12. Cadence suggestion

Operator chose no explicit cadence. Audit recommends: **steady-state re-audit after PostToolUse hook observability lands (FF-001 + FF-002)** — because 11.7 = 0 is the audit's single sharpest dimension, and once the hook surfaces errors, the bottom-dim shifts to one of the four 1-scored dimensions (11.3, 11.8, 11.9, 11.10), enabling the second cycle to target the theme-weighted ones (11.3 + 11.10).

**Cycle-history candidate:** "first-cycle cadence was operator-implicit; consider steady-state in 3 months IF any of FF-001, FF-002, FF-006, FF-007 are implemented before then. The smoke-test of the re-audit becomes a natural verification of remediation."

**Fresh-first-cycle triggers (not steady-state):**
- Any of the 6 producer→consumer source documents at `../new-direction-2026/` move or rename.
- DEV_GUIDE.md is replaced rather than redirected.
- The site adopts a build-time content pipeline that consumes the sibling repo directly.

---

## 13. Proposals NOT proposed for cycle history

The audit explicitly does NOT propose committing these to cycle-history:

- The 12 findings themselves — those are *findings*, not conventions. They live in `10-findings.md`.
- The 12 fitness functions — those are *proposals*, not adopted conventions. Operator decides per-FF whether to adopt.
- The score table — that's a snapshot, not a convention.
- The drift-only F-011 caveat — recorded in `SUMMARY.md` §6 + drift summary for handoff to next cycle's Phase 0.
- The struck F-005 — already resolved within the profile cycle; recorded in smoke-test log only.

---

## 14. Format note for the profile directive

When the profile directive's next run reads this file and considers committing entries to `profile/cycle-history.md`, the following sections in that file are recommended:

```markdown
# Cycle History — verlyn13.github.io

## Active conventions

### Branching and PR conventions
- conventional commits format (project-level convention; CLAUDE.md operator-confirmed)
- PR-time CI declared in deploy.yml; branch-protection state external (FF-008 manual-review-only)

### Commit and verification conventions
- run `mise run ci` after changes (single gate: lint + format-check + build)
- verify visual changes on desktop AND mobile (768px) (AGENTS.md operator convention)

### ADR conventions
- (none yet; first ADR proposed: ADR-001 docs-cross-reference policy or ADR-001 hook-observability policy)

### Halt and rescope conventions
- record operator-deferred remediation as substantive-deviation caveats (e.g., F-001 MAAT)
- struck findings (F-005 type) retained in smoke-test log, absent from priority

### Audit/profile artifact conventions
- profile/audit two-phase model worked cleanly (zero commit drift)
- AAFs route from profile to specific audit phase (12 AAFs, all resolved)
- evidence_extensions[0] convention from meta-inventory applied (F-005 resolved-in-profile)

### Agent caveat conventions
- substantive-deviation caveats are recorded; cosmetic ones are noted
- drift-only items (F-011 type) carried to SUMMARY caveat, not in priority

### Cross-repo conventions
- Pair A (content pipeline) consumer side here; producer side at sibling new-direction-2026
- Pair B (MAAT positioning) consumer side 4× amplified vs producer side
- MCP family pattern: this repo has 1 (context7); sibling has 5; family-wide FF-011 + FF-012
```

This is a **template**, not a committed file. The profile directive is the authority for what enters `profile/cycle-history.md`.

---

## 15. Cross-references

- Audit findings: [`10-findings.md`](10-findings.md), [`10-findings.json`](10-findings.json)
- Fitness functions: [`10-fitness-functions.md`](10-fitness-functions.md), [`10-fitness-functions.json`](10-fitness-functions.json)
- Smoke-test: [`10.5-finding-smoke-test.md`](10.5-finding-smoke-test.md)
- Sibling audit (Pair A producer + Pair B producer): `../../../../../local/new-direction-2026/audit/2026-05-21/`
- Sibling audit (planning, family member): `../../../planning-summer-2026/audit/2026-05-21/`
- Cross-repo synthesis: `../../../../../local/meta-inventory/audit/2026-05-21/cross-repo-synthesis-2026-05-21.md`
- Reference cycle-history-notes pattern: `../../../../../local/meta-inventory/audit/2026-05-21/cycle-history-notes.md`
