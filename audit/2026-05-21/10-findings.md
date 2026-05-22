# Phase 10 — Findings, Scoring, and Fitness Functions (verlyn13.github.io)

**Audit date:** 2026-05-21
**Snapshot ref:** `ee6c7e55331faaf55fa6bb4cde49abd9e1c96f9a` (HEAD at audit start)
**Audit mode:** first-cycle
**Strategic theme:** `career-transition-readiness` (custom, 1.5× direct on 11.3 + 11.4 + 11.5 + 11.10)
**Spec:** agentic-audit-spec-v3.1 §7 Phase 10 + §8.11/§8.12 + §11.
**Sibling Phase 10s:** `new-direction-2026/audit/2026-05-21/10-findings.md` (15 findings + 16 FFs); `planning-summer-2026/audit/2026-05-21/10-findings.md` (15 findings + 12 FFs).

---

## 1. Dimension scorecard (per §11)

| Dim | Title | Score | Theme weight | Headline |
|---|---|---:|:---:|---|
| 11.1 | Bounded contexts | **2** | — | 4 contexts confirmed (incl. experiments-sandbox per AAF-VGH-007); not machine-verifiable |
| 11.2 | Domain/application separation | **2** | — | Pure static-site; no business logic in JS |
| 11.3 | Contract discipline | **1** | ✓ 1.5× | **Cross-repo content-pipeline has no validation; DEV_GUIDE↔AGENTS parallel contracts drift on 6 axes** |
| 11.4 | Tool/action surface clarity | **2** | ✓ 1.5× | 3 SKILLs untyped; context7 MCP unpinned; modest surface |
| 11.5 | State and memory clarity | **2** | ✓ 1.5× | Stores classified; no machine-readable registry |
| 11.6 | Authority boundaries | **2** | — | `.claude/settings.json` + PostToolUse + OIDC; 5 actions @v* not @SHA |
| 11.7 | Observability semantics | **0** | — | **LOWEST IN AUDIT.** Zero telemetry; PostToolUse hook silent-error swallow on write-capable principal |
| 11.8 | Policy/prompt separation | **1** | — | 20+ MAAT stale-authoring-artifact; DEV_GUIDE contradictory-guidance; THEMES.md overstated |
| 11.9 | Evals and quality gates | **1** | — | 6 CI gates; 0 behavior evals; no lychee gap vs sibling |
| 11.10 | Governance and audit trail | **1** | ✓ 1.5× | No ADR catalog; DEV_GUIDE stale governance |
| 11.11 | Architectural fitness functions | **2** | — | 6 CI gates; biome 2 rules at warn-not-error (AAF-VGH-003) |

**Aggregate:** mean 1.45 / max 3. Lowest dim is **11.7 (0)** — the audit's single sharpest dimension. Five dimensions tie at 1 (11.3, 11.7-floor, 11.8, 11.9, 11.10).

---

## 2. Findings (F-001..F-012)

12 findings drafted; 10 active, 1 struck (F-005, resolved-in-profile), 1 drift-only (F-011, declared-vs-enforced caveat).

### F-001 — MAAT framework narrative dominance across 20+ portfolio surfaces (Pair B consumer side)

- **AAF origin:** AAF-VGH-001 (Phase 8 routing).
- **Dimension:** 11.8 policy-prompt-separation. **Severity:** 3. **Confidence:** 1.0. **Reversibility:** 1.2. **Priority:** 5.4.
- **Strategic relevance:** indirect (1.2×) — Pair B has cross-repo amplification through the content pipeline.
- **Status:** active. **Smoke-test:** see §10.5 below.
- **Cross-repo pair:** Pair B with sibling **new-direction-2026 F-002 (AAF-NDM-007)**. Consumer side here is **4× more prominent** than producer side (20+ refs here vs 5 narrative refs sibling). The staleness propagated through the content pipeline and was amplified by the favicon design choice (identity-level signal on every page).

**Quantified evidence (re-verified at HEAD `ee6c7e5`):**

- 12 favicon refs: `assets/icons/maat_feather_16.svg` on every deployed page L8 + experiments page.
- 8 textual MAAT mentions across 7 HTML files (`index.html` L44 lead-para + L76 CS-theory + L117 nav card; `cv.html` L83 h3; `research/index.html` L141; `experience/index.html` L326; `projects/maat.html` L6 title + L48 h1).
- README.md L10-11: lead-paragraph names MAAT first of "two primary projects".
- Dedicated page: `projects/maat.html` (entire page).
- Sibling pinned-facts contract at `../new-direction-2026/.cursor/rules/content.mdc:19-24` enumerates 6 pinned facts — MAAT is NOT in this list. Internal contradiction.

**Recommendation boundary:** the policy home is the HTML pages themselves (no code extraction possible for a static portfolio). Operator-deferred remediation. Candidate edits: (a) change favicon to neutral identity mark, (b) rebalance lead-paragraph + nav-card prominence, (c) optionally retire `projects/maat.html` or reframe as "early work" with date stamp. Phase 10 records the FF candidate (**FF-005**) as `manual-review-only`.

**Related FF:** FF-005.

---

### F-002 — DEV_GUIDE.md contradicts AGENTS.md design system on 6 axes + 3 broken-reference categories

- **AAF origin:** AAF-VGH-002 (Phase 4 routing).
- **Dimension:** 11.3 contract-discipline. **Severity:** 3. **Confidence:** 1.0. **Reversibility:** 1.2. **Priority:** 5.4 (severity 3 × confidence 1.0 × strategic_weight 1.5 × reversibility 1.2 = 5.4).
- **Strategic relevance:** direct (1.5×) — 11.3 is the theme-weighted dimension.
- **Status:** active.

**6 contradictions (re-verified at HEAD `ee6c7e5`):**

| Axis | AGENTS.md (canonical) | DEV_GUIDE.md (stale) |
|---|---|---|
| Spacing scale | `--space-1..--space-5` rem-based (L116) | `--space-xs..--space-2xl` 8-point grid (L15-18) |
| Body typography | System sans-serif (L118) | Georgia serif (L22) |
| Content max-width | `--measure` 72ch (L119) | 1200px container (L34) |
| Primary accent | `hsl(212 85% 45%)` (L117) | `#4C70A0` lapis (L28) |
| Secondary accent | `hsl(160 55% 35%)` (L117) | `#D4AF37` gold (L29) |
| CSS filename | `assets/jeffrey.css` (L20,94) | `assets/styles.css` (L52) — **does not exist** |

**3 broken-reference categories (also in DEV_GUIDE.md):**

- L46-47: `research/maat.html` + `research/scopecam.html` (don't exist; actual at `projects/`).
- L48-50: `academic/` tree (does not exist).
- L54-55: legacy `maat/` + `scopecam/` dirs (do not exist).

**Recommendation boundary:** AGENTS.md is the operator-declared canonical contract per `CLAUDE.md:3`. DEV_GUIDE.md options: (a) delete, (b) replace with one-line redirect stub, (c) supersede with dated "see AGENTS.md" note, (d) merge accurate fragments into AGENTS.md. Phase 10 does not decide. **FF-007** (docs-cross-reference-check) prevents recurrence.

**Related FF:** FF-007.

---

### F-003 — Biome 2 rules at `warn` not `error` — CI passes with style violations

- **AAF origin:** AAF-VGH-003 (Phase 9 routing).
- **Dimension:** 11.11. **Severity:** 2. **Confidence:** 1.0. **Reversibility:** 1.0. **Priority:** 2.0.
- **Status:** active.

`biome.json` L15-19 sets `complexity.noImportantStyles: "warn"` and `style.noDescendingSpecificity: "warn"`. `.github/workflows/deploy.yml` L36-37 runs `npx biome check .` without `--error-on-warnings`. CI exits 0 with warnings.

**Recommendation boundary:** Two-step: (a) fix underlying CSS issues, (b) escalate `warn` → `error`. Single-line edit per rule. **FF-009** (biome-rule-severity-progression) prevents new rules being added at warn without ADR-style justification.

**Related FF:** FF-009.

---

### F-004 — README.md L13 stale `MIT © 2025` + L10-11 project list omits 4 of 6 deployed projects

- **AAF origin:** AAF-VGH-004 (Phase 8 routing).
- **Dimension:** 11.8. **Severity:** 1. **Confidence:** 1.0. **Reversibility:** 1.0. **Priority:** 1.0.
- **Status:** active.

L13 declares `MIT © 2025 Jeffrey Johnson` — current date 2026-05-22. L10-11 lists 2 of 6 deployed projects.

**Recommendation boundary:** L13: trivial single-line edit to current year-range. L10-11: consolidated with F-001 operator decision. **FF-010** (copyright-year-check) is a CI grep.

**Related FF:** FF-010.

---

### F-005 — Working-tree drift between profile initial-capture rev (2c6924d) and audit start — resolved within profile cycle (STRUCK)

- **AAF origin:** AAF-VGH-005 (Phase 0 routing; resolved-in-profile).
- **Dimension:** 11.10. **Severity:** 1. **Confidence:** 1.0. **Priority:** 1.0.
- **Status:** **struck** — retained in smoke-test log per §10.5 for audit-trail but absent from final priority ranking.

3 commits landed within the profile cycle (`daea00d` CNAME + `6eaa529` MAAT integration + `ee6c7e5` profile snapshot) per `meta.evidence_extensions[0]`. Working tree clean at audit start at HEAD `ee6c7e5`.

**Recommendation boundary:** No action required. Resolution captured in profile per operator-approved same-day triage convention (matches meta-inventory's pattern).

---

### F-006 — PostToolUse hook silent-error swallow — write-capable automation principal with zero observability

- **AAF origin:** AAF-VGH-006 (Phase 7 routing).
- **Dimension:** 11.7 observability-semantics. **Severity:** 4. **Confidence:** 1.0. **Reversibility:** 1.5 (delaying makes hook drift harder to detect). **Priority:** 6.0.
- **Status:** active.

`.claude/settings.json` L27-37: PostToolUse hook on `Write|Edit` calls runs `npx biome format --write … 2>/dev/null; exit 0`. Silenced stderr + forced exit 0. 10-second timeout. Auto-approved on Write|Edit matcher.

Compound flag at Phase 6 A-04: **ambient-authority + write-without-approval-policy + approval-not-enforced**. Phase 7 §3.4 confirms this is the single biggest observability gap in the repo: write-capable automation principal that emits no log, no event, no metric, no exit-code signal.

**Recommendation boundary:** Single-file edit to `.claude/settings.json`. Replace `2>/dev/null; exit 0` with tee to `.claude/logs/posttooluse.log`, propagate biome's actual exit code, emit a structured event line (timestamp + file_path + biome_exit_code + biome_version). **FF-001** (claude-code-hook-observability) + **FF-002** (claude-code-hook-scope-declaration) make this enforceable.

**Related FFs:** FF-001, FF-002.

---

### F-007 — experiments-sandbox bounded-context decision recorded — stateless-policy authority basis

- **AAF origin:** AAF-VGH-007 (Phase 2 routing).
- **Dimension:** 11.1. **Severity:** 1. **Confidence:** 1.0. **Priority:** 1.0.
- **Status:** active (DECISION RECORD).

Phase 2 §2.4 confirmed experiments-sandbox as a bounded context with `stateless-policy` authority basis (explicit exclusion + relaxed-rules lifecycle). 17 files. Five evidence types satisfied. Has manual cross-context promotion path (`experiments/braid-timeline.svg` → `experience/index.html` L54).

**Recommendation boundary:** DECISION RECORD — no remediation. Open operator decision: formalize the manual cross-context promotion path as an ADR? Phase 2 confirmed boundary; future ADR catalog (see governance dimension 11.10) could capture it.

---

### F-008 — Cross-repo content-pipeline 6-row producer-consumer contract — consumer side has zero validation (Pair A consumer side)

- **AAF origin:** AAF-VGH-008 (Phase 4 routing).
- **Dimension:** 11.3 contract-discipline. **Severity:** 4. **Confidence:** 1.0. **Reversibility:** 1.2. **Priority:** 7.2 (severity 4 × confidence 1.0 × strategic_weight 1.5 × reversibility 1.2 = 7.2).
- **Strategic relevance:** direct (1.5×) — career-transition-readiness theme directly weights this.
- **Status:** active.
- **Cross-repo pair:** Pair A with sibling **new-direction-2026 F-003 (AAF-NDM-012)** producer side.

Sibling `../new-direction-2026/AGENTS.md:131-142` declares 6 source → destination mappings. The 11 deployed HTML pages here consume those sources. **No source-revision provenance comment in destinations. No build-time check. No automated content freshness validation.**

**Recommendation boundary:** Build-time enhancement — insert `<!-- source: new-direction-2026 @ <sha> -->` comment into each generated HTML head. Producer-side complement at sibling. Pair A both repos cooperate. **FF-006** (html-source-revision-provenance-comment) is consumer-side enforceable; full pipeline check requires the producer-consumer handshake.

**Related FF:** FF-006.

---

### F-009 — context7 MCP referenced in CLAUDE.md L27-33 but no `.mcp.json` — operator-installed at Claude Code global level

- **AAF origin:** AAF-VGH-009 (Phase 4 routing).
- **Dimension:** 11.4 tool-action-surface-clarity. **Severity:** 2. **Confidence:** 1.0. **Reversibility:** 1.0. **Priority:** 3.6 (severity 2 × confidence 1.0 × strategic_weight 1.5 × reversibility 1.2 = 3.6).
- **Strategic relevance:** direct (1.5×) — 11.4 is theme-weighted.
- **Status:** active.
- **Cross-repo pair:** Family-wide pattern. Cross-cites sibling **new-direction-2026 F-004 (AAF-NDM-008)**. Sibling has 5 operator-installed MCPs uninventoried; vgh has 1 (context7). Same root cause.

**Recommendation boundary:** Operator chooses one of three: (a) add `.mcp.json` pinning context7 + protocol + tool schemas, (b) remove in-repo MCP declaration if purely operator-machine config, (c) demote CLAUDE.md MCP table to "operator-installed; see <URL>" pointer. Phase 10 does not decide. **FF-011** (mcp-project-scoping) + **FF-012** (mcp-tool-schema-recorded) cover the family-wide enforcement.

**Related FFs:** FF-011, FF-012.

---

### F-010 — 5 GitHub Actions @v* not @SHA-pinned — supply-chain authority surfaces unbounded

- **AAF origin:** AAF-VGH-010 (Phase 6 routing).
- **Dimension:** 11.6. **Severity:** 3. **Confidence:** 1.0. **Reversibility:** 1.2. **Priority:** 3.6.
- **Status:** active.

`.github/workflows/deploy.yml`: 5 actions @major-tag-pinned, none @SHA-pinned.

| Action | Pin | Risk |
|---|---|---|
| `actions/checkout` | `@v4` | moderate |
| `actions/setup-node` | `@v4` | moderate |
| `actions/configure-pages` | `@v4` | moderate |
| `actions/upload-pages-artifact` | `@v3` | moderate |
| **`actions/deploy-pages`** | **`@v4`** | **HIGH — receives OIDC token; publishes to jvjohnson.dev** |

Compounding: `deploy-pages@v4` is the SINGLE action with elevated permissions + OIDC token + publish authority + major-tag pin. Workflow-root permissions block (deploy.yml L10-13) escalates `contents:read + pages:write + id-token:write` to all 3 jobs (deploy is the only consumer).

**Recommendation boundary:** Two parts: (a) SHA-pin all 5 actions, (b) reduce workflow-root permissions to `contents:read` only and declare `pages:write + id-token:write` at deploy job level only. **FF-003** (pin-github-actions-to-sha) + **FF-004** (per-job-actions-permissions). Cross-repo applicable to any sibling adding Actions later.

**Related FFs:** FF-003, FF-004.

---

### F-011 — PR-time CI declared but required-for-merge gate is GitHub branch-protection external to repo (DRIFT-ONLY caveat)

- **AAF origin:** AAF-VGH-011 (Phase 0 routing; declared-vs-enforced caveat).
- **Dimension:** 11.11. **Severity:** 2. **Confidence:** 0.75. **Priority:** 1.5.
- **Status:** **drift-only** per §10.5 classification — the discrepancy between profile claim (declared CI gate) and external enforcement state (branch protection rules visible only to repo admin) is itself the finding. The audit cannot observe GitHub-API-level state from a reference-only Phase 10 re-grep.

**Recommendation boundary:** Operator decision in remediation PR: (a) verify branch-protection rules at github.com require quality + build before merge, (b) document the rule state in AGENTS.md + an ADR, (c) **FF-008** names the recurring check as `manual-review-only`. Carried to SUMMARY caveat.

**Related FF:** FF-008.

---

### F-012 — THEMES.md overstates multi-theme capability — file does not exist; sed-scripts silently no-op

- **AAF origin:** AAF-VGH-012 (Phase 4 routing).
- **Dimension:** 11.8. **Severity:** 2. **Confidence:** 1.0. **Priority:** 2.0.
- **Status:** active.

`THEMES.md` L1-5: "This site supports multiple visual themes…" L25-41: names `styles-academic.css` as second theme. L48-51: sed-script for switching. `assets/styles-academic.css` does NOT exist; actual file is at `experiments/themes/academic.css`. sed-script would silently no-op.

**Recommendation boundary:** Three options: (a) retire multi-theme claim (keep as single-theme philosophy doc), (b) move `experiments/themes/academic.css` → `assets/styles-academic.css` + add HTML switcher, (c) document as-is reality. Phase 8 does not decide. **FF-007** (docs-cross-reference-check) catches the L25 broken filename reference.

**Related FF:** FF-007.

---

## 3. Priority ranking (active findings only; struck/drift-only excluded)

| Rank | ID | Title | Priority | Dim | Strategic |
|---:|---|---|---:|---|---|
| 1 | F-008 | Cross-repo content-pipeline consumer side no validation (Pair A) | **7.2** | 11.3 | direct |
| 2 | F-006 | PostToolUse hook silent-error swallow | **6.0** | 11.7 | none |
| 3 | F-001 | MAAT 20+ stale-authoring-artifact (Pair B) | 5.4 | 11.8 | indirect |
| 4 | F-002 | DEV_GUIDE.md vs AGENTS.md 6-axis + 3-broken-ref contradiction | 5.4 | 11.3 | direct |
| 5 | F-009 | context7 MCP uninventoried | 3.6 | 11.4 | direct |
| 6 | F-010 | 5 GH Actions @v* not @SHA | 3.6 | 11.6 | none |
| 7 | F-003 | Biome 2 rules warn-not-error | 2.0 | 11.11 | none |
| 8 | F-012 | THEMES.md overstated capability | 2.0 | 11.8 | none |
| 9 | F-007 | experiments-sandbox boundary decision recorded | 1.0 | 11.1 | none |
| 10 | F-004 | README MIT © 2025 + project list stale | 1.0 | 11.8 | none |

**Drift-only / struck (not in priority):**
- F-005 (struck, AAF-VGH-005) — resolved within profile cycle.
- F-011 (drift-only, AAF-VGH-011) — declared-vs-enforced caveat carried to SUMMARY.

---

## 4. Cross-repo pair citations

| Pair | This repo | Sibling | Synthesis |
|---|---|---|---|
| **Pair A — content-pipeline** | F-008 (AAF-VGH-008, consumer) | new-direction-2026 F-003 (AAF-NDM-012, producer) | §0.4 of meta-inventory cross-repo synthesis; both ends require cooperative remediation |
| **Pair B — MAAT positioning** | F-001 (AAF-VGH-001, 20+ refs) | new-direction-2026 F-002 (AAF-NDM-007, 5 narrative refs) | Consumer side 4× more prominent; operator-deferred per stated intent |
| **MCP family pattern** | F-009 (AAF-VGH-009, 1 MCP) | new-direction-2026 F-004 (AAF-NDM-008, 5 MCPs) | Same root cause; family-wide FF-011 + FF-012 |

---

## 5. Strategic-theme weighting summary

`career-transition-readiness` (custom 1.5× on 11.3 + 11.4 + 11.5 + 11.10) elevates 3 findings to `direct`:

- **F-002** (11.3) priority 5.4
- **F-008** (11.3) priority 7.2 — **#1 ranked**
- **F-009** (11.4) priority 3.6

F-001 is `indirect` (1.2×, Pair B amplification through pipeline). All others are `none`.

---

## 6. Exit check (§7 Phase 10)

| Criterion | Status |
|---|---|
| Every score cites evidence from phase artifacts | ✓ (`10-scores.json` cites 02-context-map.md, 04-contracts.md, 06-authority.md, 07-observability.md, 08-policy.md, 09-evals.md) |
| Every finding has source evidence and confidence level | ✓ (12 findings, 3-9 citations each, confidence 0.75-1.0) |
| Every fitness function names enforcement category + scope + failure condition + owner recommendation | ✓ (see `10-fitness-functions.md`) |
| Findings and fitness functions have separate IDs | ✓ (F-001..F-012 vs FF-001..FF-012) |

---

See [`10-fitness-functions.md`](10-fitness-functions.md) for FF-001..FF-012 future safeguards.
See [`10.5-finding-smoke-test.md`](10.5-finding-smoke-test.md) for Phase 10.5 re-grep against HEAD `ee6c7e5`.
