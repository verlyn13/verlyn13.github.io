# Phase 9 — Evals and Quality Gates

**Audit spec:** Agentic Architecture Audit Specification v3.1 (2026-05-08) §7 Phase 9 + §8.10.
**Audit date:** 2026-05-22 (audit/2026-05-21/ dated dir).
**Repo HEAD:** `ee6c7e55331faaf55fa6bb4cde49abd9e1c96f9a`.
**Routed AAFs (Phase 9 destination):** AAF-VGH-003 (biome `warn`-not-`error` rule severity).
**Inputs:** Phase 3 runtime map (16 entrypoints in scope: E-01..E-13 + E-HTTP-pages + E-HTTP-assets + E-DNS); Phase 4 contracts (22 contracts); Phase 6 authority (deny manifest + Ask-first taxonomy); Phase 7 observability baseline.

---

## 1. Method

Per audit spec §7 Phase 9. Located every eval-like surface (test runner, eval suite, golden dataset, regression fixture, automated scorer, model/prompt comparison, CI quality gate, release gate, drift tracker, protocol-conformance test, approval-path test, lifecycle test, safety/security test). Classified each found surface per §8.10 schema. Flagged uncovered entrypoints and write-capable paths per §7 Phase 9 step "Flag." Boundaries honored per §7 Phase 9:

- Did NOT require LLM judges (classified scoring method actually used).
- Did NOT treat unit tests as evals unless they test behavior quality against expected outputs or rubrics (no unit tests exist either; both absent).
- Did NOT assume no eval is required without justification (justification recorded §6).
- Did NOT credit a single passing eval as coverage.
- Did NOT treat protocol schema validation as behavior coverage.

This repo has **zero behavior-quality eval suites**, **zero LLM-as-judge surfaces**, **zero golden datasets**, **zero calibration data**, **zero regression fixtures**. It DOES have **6 quality gates** (CI fitness-functions and operator-enforced hooks), recorded below as the actually-existing surface. Per §7 Phase 9: "Do not treat unit tests as evals unless they test behavior quality against expected outputs or rubrics" — the 6 gates are quality gates, not behavior-quality evals.

---

## 2. Existing CI quality gates and operator-enforced hooks (6 surfaces, none behavior-quality)

### 2.1 Biome lint (CI quality gate)

| Field | Value |
|---|---|
| Name | `npx biome check .` (Biome lint) |
| Mode | `n/a` (no eval mode — this is a static-analysis gate, not a behavior eval) |
| Covers | static-analysis on `**` except `experiments/**` per `biome.json:4`; lint rules: recommended + 2 at `warn` (`complexity.noImportantStyles`, `style.noDescendingSpecificity`) |
| Scoring method | `exact-match` (biome's own rule fail/pass) |
| CI integrated | **true** — `.github/workflows/deploy.yml:36-37` quality job |
| Release gate | **true** — deploy job `needs: build` `needs: quality`; PR-time runs without deploy (`if: github.event_name != 'pull_request'` per L74) |
| Drift tracking | **false** (no historical pass-rate record; CI logs are GH Actions retention only) |
| Judge calibrated | n/a |
| Golden dataset | n/a |
| Owner | jeffrey |
| Citations | `.github/workflows/deploy.yml:36-37`, `biome.json:1-36`, `package.json:18` |
| Flags applied | (none on the gate itself; **AAF-VGH-003** flagged 2 rules at `warn` not `error` — see §3 below) |

### 2.2 Biome format-check (CI quality gate)

| Field | Value |
|---|---|
| Name | `npx biome format .` (Biome format-check) |
| Mode | `n/a` |
| Covers | format consistency on **/* except experiments/; 2-space indent, 100-char line width, single quotes, semicolons asNeeded |
| Scoring method | `exact-match` |
| CI integrated | **true** — `.github/workflows/deploy.yml:39-40` quality job |
| Release gate | **true** — same chain as §2.1 |
| Drift tracking | **false** |
| Citations | `.github/workflows/deploy.yml:39-40`, `biome.json:23-34` |
| Flags applied | none |

### 2.3 Vite build (CI quality gate / compile gate)

| Field | Value |
|---|---|
| Name | `npm run build` → `vite build` |
| Mode | `n/a` |
| Covers | build verification across 11 entry points (`vite.config.js:22-37`); fails if any HTML page fails to resolve or any input is missing |
| Scoring method | `exact-match` (vite's own exit code) |
| CI integrated | **true** — `.github/workflows/deploy.yml:59-60` build job |
| Release gate | **true** — deploy `needs: build` |
| Drift tracking | **false** |
| Citations | `.github/workflows/deploy.yml:59-60`, `vite.config.js:1-66`, `package.json:8` |
| Flags applied | none |

### 2.4 GitHub Pages deploy (release gate)

| Field | Value |
|---|---|
| Name | `actions/deploy-pages@v4` |
| Mode | `n/a` |
| Covers | OIDC-token-authenticated artifact upload to GitHub Pages CDN at `https://jvjohnson.dev` |
| Scoring method | `exact-match` (action exit code + GH Pages deployment record) |
| CI integrated | **true** — `.github/workflows/deploy.yml:80-83` deploy job |
| Release gate | **true** — this IS the release |
| Approval path | gated `if: github.event_name != 'pull_request'`; needs `pages:write` + `id-token:write` (L10-13); concurrency group `pages` cancel-in-progress |
| Drift tracking | **false** |
| Citations | `.github/workflows/deploy.yml:72-83` |
| Flags applied | `runtime-provenance-missing` (no SLSA attestation), `version-drift` (action @v4 not SHA-pinned) — both routed to Phase 6 from Phase 4 §2.3-2.4 |

### 2.5 PostToolUse biome auto-format hook (operator-enforced)

| Field | Value |
|---|---|
| Name | `.claude/settings.json:27-37` PostToolUse hook |
| Mode | `n/a` |
| Covers | every `Write`/`Edit` tool call from Claude Code on `.js`/`.json`/`.css` files; runs `npx biome format --write` |
| Scoring method | `exact-match` (biome exit code, but stderr silenced and exit always 0 per E-12 spec) |
| CI integrated | **false** — runs locally in operator's Claude Code session, NOT in GH Actions |
| Release gate | **false** — pre-CI hook only |
| Drift tracking | **false** |
| Approval path | auto-approved (Write/Edit matcher; no operator confirmation) |
| Citations | `.claude/settings.json:27-37` |
| Flags applied | **`runtime-provenance-missing`** (per AAF-VGH-006 — silent error handling; tee stderr to log is FF candidate). The hook is a write-capable runtime path with auto-approved policy. |

### 2.6 Claude Code deny-manifest (write-authority gate)

| Field | Value |
|---|---|
| Name | `.claude/settings.json:14-25` permissions.deny |
| Mode | `n/a` |
| Covers | Read deny: `.env`, `.env.*`, `.envrc.local`; Write deny: `**/node_modules/**`, `**/dist/**`; Edit deny: `**/node_modules/**`, `**/dist/**` |
| Scoring method | `exact-match` (Claude Code enforcement at tool-invocation time) |
| CI integrated | **n/a** (runs in operator's Claude Code session) |
| Release gate | **n/a** |
| Drift tracking | **false** (no test asserts the deny patterns still match the intended set) |
| Citations | `.claude/settings.json:14-25` |
| Flags applied | none on the gate itself; the deny patterns are appropriately scoped per Phase 6 |

---

## 3. AAF-VGH-003 — biome `warn`-not-`error` rule severity (FF candidate)

**Substance:** `biome.json:15-19` sets 2 rules at `warn` severity:
- `complexity.noImportantStyles: "warn"`
- `style.noDescendingSpecificity: "warn"`

Per AGENTS.md L110 ("Never disable Biome rules to silence errors"), the operator-stated invariant is "don't silence rules" — but `warn` IS a partial silencing because `warn` does not fail CI; only `error` fails. The 2 rules emit advisory warnings on `assets/jeffrey.css` (per profile §interview) that CI tolerates.

**Classification:** this is a **CI-fitness-function-strictness** finding, not a behavior-quality eval gap. The Phase 4 contract (§2.2 biome ruleset) was clean; this is the *strictness* dimension of that contract.

**FF candidate (Phase 10):** `biome-rule-severity-progression` — a fitness function that asserts every rule referenced in `biome.json` is at `error` severity, OR that two specific rules (`noImportantStyles`, `noDescendingSpecificity`) are tracked with a remediation deadline and a CSS-side fix landed within N cycles.

**Drift target:** the operator-stated invariant at AGENTS.md L110.

**Flag:** `regression-silenced` (the `warn` setting hides what would otherwise be a CI failure).

---

## 4. Behavior-quality eval coverage gaps

Per audit spec §7 Phase 9 "Flag" step: each entrypoint and write-capable path is checked for eval coverage.

### 4.1 Subagent / agent-mediated path coverage

The 3 Claude Code slash commands (E-09 `/fix-issue`, E-10 `/ship-small`, E-11 `/review-diff`) are operator-invoked subagent boundaries. They have **no eval**:

| Entrypoint | Behavior to test | Eval present? | Flag |
|---|---|---|---|
| E-09 `/fix-issue` | does the 6-step workflow (reproduce → isolate → fix → verify → visual → document) actually produce a fix that passes `mise run ci` without unrelated diff? | **none** | `subagent-surface-uncovered`, `prompt-untested` |
| E-10 `/ship-small` | does the >5-files threshold trigger plan-mode? does the 1-3 commit rule hold? | **none** | `subagent-surface-uncovered`, `prompt-untested` |
| E-11 `/review-diff` | does the 9-item checklist catch the issues it should? | **none** | `subagent-surface-uncovered`, `prompt-untested` |

→ Flags: `subagent-surface-uncovered` × 3, `prompt-untested` × 3.

### 4.2 HTTP route coverage (the deployed site, 11 routes)

The 11 deployed pages (E-HTTP-pages) are operator-verified by visual rendering per CLAUDE.md L17 ("Visual changes: run `mise run dev`, check both desktop and mobile (768px)"). This is **manual review without rubric** — operator-stated boundary.

| Route family | Behavior to test | Eval present? | Notes |
|---|---|---|---|
| 11 HTML pages (`/`, `/cv.html`, `/contact.html`, `/projects/{6}.html`, `/experience/`, `/research/`) | render correctly; semantic HTML; design system; ARIA; 768px responsive | **none — operator manual review only** | per CLAUDE.md L17 |
| 11 HTML pages | URL stability (per AGENTS.md L111 "Never break existing page URLs") | **none — no URL-stability test** | per Phase 4 §2.13 `route-without-spec` flag |
| External outbound links across all pages | `rel="noopener noreferrer"` per `.cursor/rules/html.mdc:23` | **none — no link-checker in CI** | sibling planning-summer-2026 has `lychee` link-check; this repo does NOT |
| HTML element contracts (`<title>`, `<meta>`, `<link rel>`) | per-page coverage of meta + link tags | **none — no html-validator step** | per Phase 4 §2.14 `config-without-validation` flag |
| CSS custom-properties contract | the 14 design tokens in `assets/jeffrey.css` match the AGENTS.md L116-120 documented set | **none — no test asserts property-set parity** | per Phase 4 §2.15 |

→ Flags: `high-risk behavior requiring only manual review with no rubric` (the operator-verified visual rendering); `route-without-spec` echo from Phase 4; **missing lychee link-check** is a specific Phase 9 gap vs. the sibling planning-summer-2026.

### 4.3 Write-capable runtime paths

| Path | Eval present? | Flag | Notes |
|---|---|---|---|
| E-03 `mise run build` (local) | exit code only; no eval | `write-tool-untested` | build verifies but doesn't assert behavior quality |
| E-04 `mise run ci` | exit code chain only; no eval | `write-tool-untested` | gates exist but evals don't |
| E-05 `mise run clean` | none | `write-tool-untested` | deletes dist + node_modules; no test that the deletion is correct |
| E-07 CI `build` | exit code only | `write-tool-untested` | per Phase 6 G-07; PR-gated upload-pages-artifact |
| E-08 CI `deploy` (elevated authority) | none on deploy correctness; no SLSA attestation in-repo | `write-tool-untested`, `protocol-surface-uncovered` (no protocol-conformance test on the deploy artifact) | per Phase 4 §2.3-2.4; the elevated `pages:write`+`id-token:write` permissions have no integration test |
| E-12 PostToolUse hook | none | `write-tool-untested`, `regression-silenced` | per AAF-VGH-006 silent error handling |
| E-13 `experiments/svg-src/build.sh` | none | `write-tool-untested` | operator-local; not deployed |

→ Flags: `write-tool-untested` × 7.

### 4.4 Approval gate coverage

Per Phase 6 the approval gates are:
- PR-time CI (E-06 quality + E-07 build) — gated by external GitHub branch protection (AAF-VGH-011 declared-vs-enforced gap)
- GH environment `github-pages` (no manual reviewers configured per operator)
- Claude Code permissions matrix (`.claude/settings.json:2-25`)
- AGENTS.md Ask-first taxonomy (L96-103, conventional)

**No eval suite tests** that:
- the PR-gate actually blocks deploy on PR (the `if: github.event_name != 'pull_request'` line — no negative test that asserts a PR cannot trigger deploy)
- the deny manifest patterns work (no negative test that asserts Claude Code refuses `Read(.env)` / `Write(node_modules/)`)
- the Ask-first list is followed (conventional only; no FF)

→ Flag: `approval-path-untested`.

### 4.5 Protocol surfaces

This repo's only protocol surface is `context7` MCP (CLIENT side; operator-installed per CLAUDE.md L27-33). Phase 4 §2.18 flagged `mcp-surface-uninventoried` + `tool-without-schema`. No eval tests:
- context7 protocol-conformance (resolve-library-id → query-docs flow)
- the operator's call-resolve-then-query convention from CLAUDE.md L33 actually being followed
- context7 results being plausibly fresh / accurate

→ Flag: `protocol-surface-uncovered` (context7 MCP).

### 4.6 Async/lifecycle paths

Per Phase 3 §4: no `background`, `paused-for-approval`, `resumable`, `durable`, or `callback-mediated` runtime paths exist in this repo. The `event-triggered` paths are E-08 (CI deploy job) and E-12 (PostToolUse hook). Both are flagged above; the async-lifecycle dimension is otherwise **not-applicable**.

→ Flag: `async-lifecycle-untested` is **n/a** (no async paths exist).

### 4.7 Memory lifecycle paths

Per Phase 5: memory surfaces are `.claude/settings.json` (operator-rules-memory) and `.claude/settings.local.json` (untracked operator-local-memory). The deletion/reset paths are documented but **not tested**.

→ Flag: `memory-lifecycle-untested` for the operator-rules-memory deletion path (low risk; no business state at stake).

### 4.8 Content-pipeline cross-repo (AAF-VGH-008 echo from Phase 4)

The 6 source→destination mappings from sibling new-direction-2026/AGENTS.md:131-142 are NOT verified by any automated check (per Phase 4 §2.19). No eval surface asserts content freshness, source-revision provenance, or destination-source alignment.

→ Flag: `content-provenance-position-missing` (Phase 4) becomes `prompt-untested` here (the destination HTML pages are the "prompts" in the §8.0 sense, classified at §3.1 of Phase 8 as `stale-authoring-artifact` for the MAAT subset; the rest are unverified-but-not-classified).

---

## 5. EvalSuite inventory per §8.10 schema

Per §8.10 schema, **6 quality gates** recorded; **0 behavior-quality eval suites**. Recording the existing 6 below and the absence of behavior evals as one EvalSuite entry per §7 Phase 9 boundary "Do not assume no eval is required."

See `09-evals.json` for the structured §8.10 records. Summary:

| Name | Mode | Scoring method | CI | Release gate | Flags |
|---|---|---|---|---|---|
| biome-lint | n/a (static-analysis gate) | exact-match | true | true | `regression-silenced` (2 rules at warn per AAF-VGH-003) |
| biome-format-check | n/a (static-analysis gate) | exact-match | true | true | (none) |
| vite-build | n/a (compile gate) | exact-match | true | true | (none) |
| github-pages-deploy | n/a (release gate) | exact-match | true | true | `runtime-provenance-missing`, supply-chain `version-drift` |
| posttooluse-biome-format-hook | n/a (operator hook) | exact-match | false | false | `runtime-provenance-missing` (silent errors per AAF-VGH-006) |
| claude-deny-manifest | n/a (authority gate) | exact-match | n/a | n/a | (none) |
| (absence: behavior-quality evals) | n/a | unknown | false | false | **all flags below per §6** |

---

## 6. Justification for no behavior-quality evals

Per audit spec §7 Phase 9 boundary "Do not assume no eval is required; require an operator or artifact justification."

**Operator justification (from profile §interview + §baselines.evals):**
- `baselines.evals.suites_directory: "none"`
- `baselines.evals.suite_count: 0`
- CLAUDE.md L17 declares visual rendering as operator-verified manual review (not rubric-scored).

**Artifact-side justification:**
- The deployed product is a static HTML5 portfolio. No LLM call sites in product code (per Phase 0 + Phase 3). No business logic to behavior-test. No model-mediated paths in deployed runtime.
- The 3 SKILL.md surfaces (E-09/E-10/E-11) are operator-invoked workflows in Claude Code; their "behavior quality" is dependent on the model + the operator's session-time judgment, not on the SKILL.md content alone. A behavior eval would require an LLM-as-judge plus a calibrated rubric, which is high overhead for a 1-operator portfolio site.
- The agentic surfaces (`.claude/skills/`, `.cursor/rules/`) are consumed by external runtimes (Claude Code, Cursor IDE) whose own eval coverage is upstream.

**Audit verdict:** the absence is **partially justified**. The static-site nature means LLM behavior-quality evals are not load-bearing. But several specific gaps remain unjustifiable in any project context:

1. **HTML link-checking** (`lychee` or equivalent) — the sibling planning-summer-2026 has it; this repo does NOT, despite serving public URLs that MUST be stable per AGENTS.md L111. A broken internal link is a visible-to-public defect that the existing CI does not catch. **Phase 10 FF candidate: `lychee-link-check-ci-job`.**
2. **Cross-repo content freshness** (per AAF-VGH-008) — the consumer-side has no automated check that destinations match sources. **Phase 10 FF candidate: `content-source-revision-provenance`** (a build-time check that the destination HTML pages contain a `<!-- source: new-direction-2026 @ <sha> -->` comment referencing the sibling source).
3. **PostToolUse hook error surface** (per AAF-VGH-006) — the hook silently swallows errors. A simple integration test (or even a log file with a non-empty error indicator) would catch this. **Phase 10 FF candidate: `posttooluse-error-surfacing`.**
4. **Biome rule severity** (AAF-VGH-003) — the 2 `warn` rules should escalate to `error` after the corresponding CSS-side fixes land. **Phase 10 FF candidate: `biome-rule-severity-progression`.**
5. **URL stability across pages** (per AGENTS.md L111) — no test asserts the 11 deployed URLs from `vite.config.js:23-37` continue to resolve. **Phase 10 FF candidate: `url-stability-test` (could be a static check that the entry-map keys remain consistent across commits).**

Phase 10 records these as fitness-function candidates with priority weighted by `career-transition-readiness` theme (1.5× direct relevance per profile §strategic_themes).

---

## 7. CI integration vs release gate (separately recorded per §7 Phase 9 boundary)

| State | Value |
|---|---|
| **CI integrated** | **true** for biome-lint + biome-format-check + vite-build (3 of 6 gates run in `.github/workflows/deploy.yml`) |
| **Release gate** | **true** for the same 3 + the deploy job itself (chain: quality → build → deploy; PR-gated) |
| **External branch protection** | **not visible from in-repo declarations** per AAF-VGH-011; whether the PR-time quality+build jobs are required-for-merge depends on external GitHub UI settings the audit cannot inspect |
| **Behavior-eval CI integration** | **n/a** (no behavior evals exist) |
| **Behavior-eval release gate** | **n/a** |

---

## 8. AAF resolutions in Phase 9

| AAF | Phase 9 finding |
|---|---|
| AAF-VGH-003 (biome warn-vs-error) | CONFIRMED — 2 rules at `warn` (`complexity.noImportantStyles`, `style.noDescendingSpecificity`); FF candidate `biome-rule-severity-progression`. See §3. |

Other AAFs touch Phase 9 indirectly but are not Phase 9-routed:
- AAF-VGH-006 (PostToolUse silent errors) — Phase 7 routed; recorded here as flag on the hook (§2.5) and FF candidate.
- AAF-VGH-011 (declared-vs-enforced PR gate) — Phase 0 / SUMMARY routed; recorded here as the external-branch-protection caveat (§7).
- AAF-VGH-010 (third-party action versions @v* not SHA-pinned) — Phase 6 routed; recorded as flag on the deploy gate (§2.4).
- AAF-VGH-008 (cross-repo content pipeline freshness) — Phase 4 routed; recorded here as `prompt-untested` flag for the destination pages (§4.8).

---

## 9. Boundaries honored

Per audit spec §7 Phase 9 boundary declarations:

- [x] Did NOT require LLM judges — classified the scoring method actually used (`exact-match` for all 6 existing gates; behavior evals do not exist).
- [x] Did NOT treat unit tests as evals — there ARE no unit tests, and the 6 quality gates are explicitly recorded as quality gates, not behavior evals.
- [x] Did NOT assume no eval is required without justification — §6 records operator and artifact-side justification + lists 5 specific gaps that remain unjustifiable.
- [x] Did NOT credit a single passing eval as coverage (no single passing eval exists to credit).
- [x] Did NOT treat protocol schema validation as behavior coverage — context7 MCP is flagged `protocol-surface-uncovered` per §4.5.

---

## 10. Exit check (§7 Phase 9)

- [x] **Every model-mediated or agent-mediated entrypoint maps to an eval suite or a cited `no-eval-required` justification.** §4.1 maps E-09/E-10/E-11; §6 records the justification (partial — 5 specific gaps remain).
- [x] **Every write-capable tool/action has some quality, safety, or policy gate identified or flagged.** §4.3 enumerates all 7 write-capable paths with flags; §2.1-2.6 records the 6 actually-existing gates.
- [x] **Every protocol-advertised remote capability and async/resume path has conformance or lifecycle coverage identified or flagged.** §4.5 records context7 as `protocol-surface-uncovered`; §4.6 records async paths as not-applicable.
- [x] **CI and release-gate integration status are recorded separately.** §7 separately enumerates CI integration (3 of 6) and release gate (4 of 6 in the deploy chain) and external branch protection (AAF-VGH-011 caveat).

---

## 11. Summary table (Phase 9 flags)

| Surface | Eval count | Flags |
|---|---:|---|
| E-09 `/fix-issue` | 0 | `subagent-surface-uncovered`, `prompt-untested` |
| E-10 `/ship-small` | 0 | `subagent-surface-uncovered`, `prompt-untested` |
| E-11 `/review-diff` | 0 | `subagent-surface-uncovered`, `prompt-untested` |
| E-HTTP-pages (11 routes) | 0 | `high-risk manual-only` (operator visual review); `route-without-spec`; missing lychee link-check |
| E-HTTP-assets | 0 | `config-without-validation` echo from Phase 4 |
| E-03/E-04 `mise run build`/`ci` | 0 | `write-tool-untested` |
| E-05 `mise run clean` | 0 | `write-tool-untested` |
| E-07 CI `build` | 0 | `write-tool-untested` |
| E-08 CI `deploy` | 0 | `write-tool-untested`, `protocol-surface-uncovered` (deploy artifact provenance) |
| E-12 PostToolUse hook | 0 | `write-tool-untested`, `regression-silenced` (silent errors per AAF-VGH-006) |
| E-13 svg-src/build.sh | 0 | `write-tool-untested` |
| context7 MCP | 0 | `protocol-surface-uncovered` |
| approval gates | 0 | `approval-path-untested` |
| memory lifecycle (operator-rules) | 0 | `memory-lifecycle-untested` |
| cross-repo content pipeline | 0 | `prompt-untested` (destination HTML; classified as stale-authoring-artifact in Phase 8 for MAAT subset) |
| biome ruleset | n/a | `regression-silenced` (2 rules at warn per AAF-VGH-003) |

**Total flag instances:** 16+ across 16 entrypoint families. Phase 10 will produce FF candidates aligned with these flags + the career-transition-readiness strategic theme weighting.

---

**Phase 9 exit check passes.** Advancing to Phase 10 (findings, scoring, fitness functions).
