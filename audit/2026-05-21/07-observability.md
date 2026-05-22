# Phase 7 — Observability Semantics

**Repo:** verlyn13.github.io
**Audit spec:** v3.1 (§7 Phase 7 + §8.8 + §9.8)
**Audit mode:** first-cycle
**Snapshot:** 2026-05-21 / `ee6c7e55331faaf55fa6bb4cde49abd9e1c96f9a`

---

## 1. Method

Per §7 Phase 7. Inventoried telemetry (spans, events, metrics, logs, trace context, audit logs), assessed the cost/latency/quality/provenance quartet, and split provenance into runtime-action, content, and build-source per §9.8. Honored the boundary declarations: did not require a specific vendor; did not treat logging as sufficient tracing; did not credit token logging as cost attribution; recorded the not-applicable positions explicitly.

---

## 2. Applicability scope

**verlyn13.github.io is a static site.** No LLM is called at deploy-time, run-time, or by visitors. The deployed artifact is HTML + CSS + one ~minimal JS file (`assets/menu.js`).

The only agentic activity is the OPERATOR's Claude Code / Cursor IDE sessions during authoring — that activity is hosted out of repo and produces no telemetry observable here. The §7 Phase 7 quartet (cost / latency / quality / provenance) is therefore largely **not-applicable** for cost and quality; **partial** for latency and provenance.

The provenance split (§9.8) IS applicable because:

1. The deployed HTML is generated content (handwritten by operator + agents).
2. The CI/CD pipeline emits build-source provenance signals (commit SHA + run ID via `actions/deploy-pages@v4`).
3. The **PostToolUse hook (Phase 6 A-04) is a write-capable automation principal that emits NO provenance** — the single biggest observability gap in the repo.

---

## 3. Telemetry inventory

### 3.1 Spans, events, metrics

| Class | Present? | Evidence |
|---|:---:|---|
| OpenTelemetry SDK | **no** | no `opentelemetry-*` imports anywhere; no `otel` config files |
| OTel GenAI / agent / MCP semantic conventions | **no** | no semconv attributes emitted |
| Trace context propagation | **no** | no W3C `traceparent` propagation |
| Custom span emission | **no** | no `span.*` in any file |
| Metrics export | **no** | no Prometheus client, no DataDog SDK |
| Event bus / audit-log emission | **no** | no event sink |
| Client-side analytics | **no** (forbidden) | AGENTS.md:112 — "Never: Add external font loading, **tracking scripts**, or heavy dependencies" |
| Client-side RUM | **no** (forbidden) | same rule |

**Forbidden-by-policy note:** Client-side observability is a deliberate non-feature. AGENTS.md:121 — "Academic credibility over commercial appeal. Clean, fast, respectful of visitor's time." The audit records ABSENCE here as POLICY-CONFORMING absence, not a gap.

### 3.2 Logging surfaces

| ID | Source | What it emits | Destination | Structured? | Trace correlation? | Retention |
|---|---|---|---|---|---|---|
| L-01 | GitHub Actions runner stdout/stderr (3 jobs) | ANSI text via npm + biome + vite + actions/* | ephemeral GitHub Actions logs (`gh run view`) | no | no | GitHub default 90 days |
| L-02 | GitHub Pages deployment record | deployment metadata (commit SHA, run ID, environment, page_url) | GitHub Deployments API + repo Environments UI | **yes (partial)** | deployment ↔ workflow run ↔ commit SHA (3-way) | permanent |
| L-03 | local mise / npm / biome / vite stdout | terminal text | operator's terminal | no | no | operator session |
| L-04 | Claude Code session UI | tool invocation history | Claude Code's session storage (out of repo) | implementation-dependent | per-session | operator-level |
| L-05 | Cursor IDE session log | out of repo | Cursor's backend | n/a | n/a | Cursor user-level |

**Critical observation at L-04:** PostToolUse hook (A-04) invocations are NOT recorded here. Claude Code records the Write/Edit tool call, but the hook's bash subprocess output is silenced via `2>/dev/null` and forced to `exit 0`. This is the cross-phase tie to Phase 3 E-12 + Phase 4 C-06 + Phase 6 A-04 (AAF-VGH-006).

### 3.3 Audit log surrogates

| Surface | Class (loose) | Limitations |
|---|---|---|
| git commit history (signed per AGENTS.md:128) | build-source-provenance proxy | GPG signing declared in AGENTS.md, not auditable from repo state alone (would require `git log --show-signature`); no audit of agent-vs-human authorship |
| GitHub Actions run logs (L-01) | runtime/action-provenance proxy for CI/CD only | ephemeral 90-day retention; free-form text; no semantic-convention attribution; no eval correlation |
| GitHub deployment record (L-02) | build-source-provenance — **partial** | records commit SHA + run ID; does NOT include SLSA attestation, dependency graph, or signed artifact hash |

### 3.4 The PostToolUse hook observability gap (cross-cite Phase 6 AAF-VGH-006)

The single biggest observability gap in the repo.

The hook (`.claude/settings.json:27-37`) is a **write-capable automation principal** (Phase 6 A-04) that:

- fires on every `Write|Edit` tool call (Phase 3 E-12 sync_model: event-triggered);
- silences stderr (`2>/dev/null`);
- exits `0` unconditionally;
- has a 10-second timeout;
- writes files via `npx biome format --write`;
- **emits no log, no event, no metric, no exit-code signal**.

7 failure modes invisible from logs / exit code / surface telemetry:

1. `npx` not available on PATH;
2. biome missing or not installed;
3. biome parse error in file (formatter rejects, file unchanged or partially overwritten);
4. timeout at 10s (formatter cut mid-operation);
5. `jq` missing;
6. malformed input JSON from Claude Code;
7. file write race with concurrent Claude Code tool calls.

**Cross-phase finding:** the flag combination is **ambient-authority (Phase 6) + write-without-approval-policy (Phase 6) + approval-not-enforced (Phase 6) + no-runtime-action-provenance (Phase 7)**. These compound to make the hook the single most concerning automation surface in the repo despite its narrow blast radius (file re-format only, in a git-tracked repo where every change is recoverable).

---

## 4. The cost / latency / quality / provenance quartet

Per §7 Phase 7, the quartet is REQUIRED for agentic and model-mediated paths. This repo has none in its deployed artifact. The quartet is assessed against the CI/CD pipeline + PostToolUse hook (the only automation surfaces).

| Dimension | Applicable? | State | Flag |
|---|---|---|---|
| **Cost** | no | no LLM call sites in product or pipeline; no token accounting required; operator's Claude Code session cost is hosted out of repo | not-applicable |
| **Latency** | partial | build latency is implicit in GitHub Actions logs but not structured per-step; PostToolUse hook has 10s timeout but no latency telemetry | no-cost-attribution (low severity) |
| **Quality** | no | no evals exist; Phase 9 will record this explicitly | not-applicable |
| **Provenance** | **partial** | see §5 below — only build-source is partial; runtime-action absent; content absent | partial |

---

## 5. Provenance split per §9.8

### 5.1 `runtime-action` — **NONE**

No agentic runtime in deployed artifact. No in-repo automation emits runtime/action provenance.

**Subordinate paths examined:**

| Path | Emits provenance? | Evidence required if emitted | Evidence emitted |
|---|---|---|---|
| **PostToolUse hook** (`.claude/settings.json:27-37`; Phase 6 A-04, Phase 3 E-12, Phase 4 C-06) | **no** | timestamp + file_path + biome_exit_code + biome_version + which Write/Edit fired | nothing |
| **CI jobs** (`deploy.yml` jobs quality, build, deploy) | **no** | job_id + step_id + tool_versions (biome, vite, node) + step_duration + exit_code | nothing in-repo |

Note: GitHub Actions DOES emit per-step telemetry to its own backend (visible via `gh run view --log`), but this is not in-repo runtime-action provenance and is not consumed by any downstream system.

**FF candidate:** `FF-claude-code-hook-observability` — every PostToolUse hook tees stderr to `.claude/logs/posttooluse.log`, propagates exit code, and emits a structured event line per invocation. Ties to AAF-VGH-006.

### 5.2 `content` — **ABSENT (explicit position not taken)**

The site does NOT advertise content credentials, content-authenticity manifests, or any kind of generated-content provenance on the deployed HTML.

**Applicability assessment per §9.8 ("explicit not-applicable position"):**

| Considered class | Current position |
|---|---|
| Content Credentials manifest | not present |
| C2PA manifest | not present |
| HTML provenance meta tags | not present |
| Explicit "not-applicable" declaration in governance docs | not present |

**Is this a gap?** Yes, in the sense that a research-portfolio site COULD reasonably take a position (either: embed source-of-truth SHA in HTML comment, OR declare "not-applicable for academic-portfolio static content authored by the operator"). The current state takes no position. Severity is **low** for an academic portfolio without LLM-generated content; severity rises if the site begins to host LLM-generated content where authenticity matters.

**FF candidate:** `FF-content-provenance-position-declared` — AGENTS.md must declare an explicit content-provenance position.

### 5.3 `build-source` — **PARTIAL**

GitHub Pages deployment record (L-02) embeds commit SHA + run ID via `actions/deploy-pages@v4`. This is BUILD-SOURCE PROVENANCE PARTIAL — it ties the deployed site to a commit, but does NOT include SLSA attestation, dependency graph attestation, signed artifact hash, or reproducibility evidence.

**Evidence present:**

| What | Where | Citation |
|---|---|---|
| `deployment.commit_sha` — tied to the run that produced the artifact | GitHub Deployments API / actions/deploy-pages@v4 output | deploy.yml:75-83 |
| Workflow run ID — embedded in Pages artifact | actions/upload-pages-artifact@v3 emits to Actions artifact store | deploy.yml:67-70 |
| GPG-signed commits (operator-declared) | AGENTS.md:128 | DECLARED but not auditable from repo state alone; no CI step verifies signatures |

**Evidence absent:**

- SLSA provenance attestation (would require an attestation step in CI; not present);
- Signed artifact hash (Pages artifact is not signed);
- Dependency graph attestation;
- Branch protection rules visible in-repo (AAF-VGH-011 declared-vs-enforced);
- Formal reproducibility evidence (package-lock.json is committed — partial reproducibility — but not asserted as attestation).

**Position per §9.8:** `build-source: partial`. Confirmed via `actions/deploy-pages@v4` metadata.

**FF candidates:**

- `FF-deploy-attestation` — deploy.yml adds `actions/attest-build-provenance@v1` (or equivalent) before `deploy-pages@v4` runs; emits SLSA provenance for the Pages artifact;
- `FF-gpg-verify-in-ci` — CI step verifies GPG signatures on commits merging to main; AGENTS.md:128 convention becomes an enforced gate.

---

## 6. Semantic-convention state

No conventions claimed. No version pinning required. No stability status applicable.

| Field | Value |
|---|---|
| Convention used | none |
| Version | n/a |
| Stability | n/a |

---

## 7. Flags summary

| Flag | Applicable? | Severity | Context |
|---|:---:|---|---|
| `no-runtime-action-provenance` | **yes** | moderate | PostToolUse hook (A-04) is the highlighted case; cross-cite AAF-VGH-006 |
| `no-content-provenance-position` | **yes** | low | site doesn't declare content credentials or explicit not-applicable position |
| `no-build-source-provenance-position` | **partial** (downgraded) | low | partial coverage via Pages deployment record; SLSA absent |
| `no-token-accounting` | n/a | — | no in-product LLM |
| `no-cost-attribution` | n/a | — | no LLM costs |
| `no-quality-attribution` | n/a | — | no evals (Phase 9 deferral) |
| `semantic-stability-unpinned` | n/a | — | no conventions claimed |
| `trace-break` | no | — | no traces |
| `no-eval-correlation` | deferred | — | Phase 9 |

---

## 8. Dimension 11.7 score assessment (informational; Phase 10 finalizes)

**Score band:** **1** (structured telemetry exists but naming and units inconsistent — read charitably; score 0 "logs only" is also defensible).

**Rationale:**

- **Score-1 reading:** GitHub Actions logs + deployment record are structured-enough (per-step, per-deploy) and partial build-source provenance exists.
- **Score-0 reading:** no telemetry-as-product-of-the-repo exists; all signals are platform-emitted.

Both are defensible. The operationally important point is the **asymmetry**:

| Dimension | Strength |
|---|---|
| 11.11 (architectural fitness functions) | strong static-analysis enforcement: biome lint + format-check, gated in CI (Phase 4 C-02 + Phase 3 E-04, E-06) |
| 11.7 (observability semantics) | weak: no telemetry surface at all |

This asymmetry should be recorded in Phase 10 explicitly — penalizing 11.7 on absolute terms without the asymmetry caveat would misclassify a static-site repo as worse than a model-mediated system, when in fact the structural ceiling for 11.7 in a static-site context is lower by design.

---

## 9. Cross-phase ties

| Cross-phase tie | Description |
|---|---|
| Phase 3 E-12 → Phase 7 §3.4 | PostToolUse hook classified event-triggered with `audit_attention=AAF-VGH-006`; Phase 7 confirms the empirical no-runtime-action-provenance |
| Phase 4 C-06 → Phase 7 §3.4 | Contract C-06 carries `runtime-provenance-missing` flag; Phase 7 confirms content |
| Phase 6 A-04 → Phase 7 §3.4 | Principal A-04 flags `ambient-authority + write-without-approval-policy + approval-not-enforced`; Phase 7 adds the observability dimension; together these compound to make the hook the single most concerning surface |
| Phase 6 A-10 → Phase 7 §5.3 | Deploy job carries elevation + OIDC pattern; Phase 7 confirms partial build-source provenance via Pages deployment record + absence of SLSA |
| CI static-analysis → 11.7 score asymmetry | Strong CI gates (biome + vite build) vs. weak telemetry — dimension 11.7 scored with asymmetry caveat |

---

## 10. FF candidates from Phase 7

| ID proposal | Enforcement category | Rule | Ties to |
|---|---|---|---|
| `FF-claude-code-hook-observability` | telemetry-lint | Every PostToolUse hook tees stderr to `.claude/logs/posttooluse.log`, propagates the underlying tool's exit code, and emits a structured log line per invocation | AAF-VGH-006 (also Phase 6) |
| `FF-deploy-attestation` | provenance-attestation | deploy.yml must include an attestation step (e.g., `actions/attest-build-provenance@v1`) before `deploy-pages@v4` runs | §5.3 build-source partial → attested |
| `FF-gpg-verify-in-ci` | release-gate | CI verifies GPG signatures on commits merging to main; AGENTS.md:128 declared convention becomes enforced gate | §5.3 build-source evidence (operator-declared signing) |
| `FF-content-provenance-position-declared` | companion-doc-drift | AGENTS.md must declare an explicit content-provenance position: embed source-of-truth SHA OR declare "not-applicable for academic-portfolio static content" | §5.2 no-content-provenance-position |

---

## 11. Exit check (§7 Phase 7)

| Criterion | Status |
|---|---|
| Naming inconsistencies flagged | n/a (no signals) |
| Convention alignment scored with citations | n/a (no conventions claimed) |
| Agentic paths have cost / latency / quality / provenance coverage or explicit gaps | ✓ (quartet explicitly scored: cost=not-applicable, latency=partial with flag, quality=not-applicable, provenance=partial) |
| Semantic-convention version and stability status recorded when conventions are claimed | n/a (none claimed) |

**Notes for Phase 10:** The provenance split is explicitly per §9.8 — `runtime-action: none`, `content: absent`, `build-source: partial`. The not-applicable positions are recorded with rationale, not implied. The PostToolUse hook is cross-cited to Phase 3 + Phase 4 + Phase 6.

**Phase 7 exit check: passes.**
