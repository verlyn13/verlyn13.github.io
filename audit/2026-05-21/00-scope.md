# Phase 0 — Scope, Snapshot, and Orientation

**Audit spec:** Agentic Architecture Audit Specification v3.1 (2026-05-08)
**Profile directive:** Project Profile Discovery Directive v1.2 (2026-05-08)
**Audit date:** 2026-05-22
**Audit mode:** `first-cycle` (no prior `audit/<date>/SUMMARY.md` exists for this project)

---

## 1. Snapshot reference

| Field | Value |
|---|---|
| Profile snapshot date | 2026-05-21 (1 evidence extension at 02:15 UTC same-day) |
| Profile mode | `first-profile` (no prior profile; supersedes a shallow 2026-05-21 capture) |
| Repository root | `/Users/verlyn13/Repos/verlyn13/verlyn13.github.io` |
| Remote | `git@github.com:verlyn13/verlyn13.github.io.git` |
| VCS | git |
| Default branch | `main` |
| Branch at audit start | `main` |
| Revision at audit start | `ee6c7e55331faaf55fa6bb4cde49abd9e1c96f9a` |
| Profile-pinned revision | `ee6c7e55331faaf55fa6bb4cde49abd9e1c96f9a` (**identical** — no drift since profile) |
| Revision at initial profile capture | `2c6924d27fc4128cce44423dd5f2b16539cb6023` (resolved per meta.evidence_extensions[0]) |
| Working-tree state at audit start | clean except `M profile/2026-05-21/project_profile.yaml` (the profile file the audit is consuming was just updated to record this same-day evidence extension; substantive working-tree is clean) |

**Profile→current drift:** none at the commit level. The drift the profile recorded (24 M + 2 U at `2c6924d`) was resolved within the same cycle via three commits (`daea00d` CNAME + `6eaa529` MAAT integration content + `ee6c7e5` profile snapshot), per the operator-approved triage in `meta.evidence_extensions[0]`. AAF-VGH-005 closed accordingly.

**CNAME verification:** `CNAME` file at repository root contains exactly `jvjohnson.dev` (14 bytes incl. trailing newline). Matches the custom domain claimed at `infrastructure.external_services[0]` and aligns with the live site URL declared in `project.primary_purpose`. Committed in `daea00d`.

---

## 2. Audit-mode determination

Per audit spec §1.2:
- `first-cycle` — no prior `audit/<date>/SUMMARY.md` exists on this project. ✓ Selected.
- `steady-state` — would require prior audit summary. None exists.
- `focused-diff` — would require prior audit AND narrow profile diff. Neither exists.

Recorded: **`first-cycle`**.

---

## 3. Scope

Per profile `scope.include_paths` and `scope.exclude_paths`:

**Include:**
- `/Users/verlyn13/Repos/verlyn13/verlyn13.github.io/**`

**Exclude:**
- `node_modules/**` — npm dependency tree; deny-list at `.claude/settings.json` L21-24
- `dist/**` — Vite build artifact; deny-list at `.claude/settings.json` L21-24
- `experiments/**` — explicitly out of CI (biome.json L4 `files.includes` excludes) and out of build (not in `vite.config.js` `rollupOptions.input`); routed to Phase 2 (AAF-VGH-007) as its own bounded context (`experiments-sandbox`), not audited for production discipline
- `.env*` — deny-listed at `.claude/settings.json` L15-17
- `.claude/settings.local.json` — gitignored operator overrides; not visible to audit

**Reference-only (read for cross-repo context; NOT in audit-finding scope):**
- `/Users/verlyn13/Repos/local/new-direction-2026/` — sibling content-source repo; this audit reads its `AGENTS.md` L131-142 and `profile/2026-05-21/project_profile.yaml` for cross-repo contract anchoring (see §11 below); cross-repo findings live in the sibling's audit, paired here via AAF-VGH-008.

---

## 4. In-scope deployable units (from profile)

3 units inherited from `project.deployable_units`. All three verified at HEAD `ee6c7e5`:

| ID | Path | Kind | Runtime | Verified |
|---|---|---|---|---|
| `portfolio-website` | `.` | static-site | Node 24 (build) → static HTML on GitHub Pages | ✓ `index.html` + `vite.config.js` L23-37 present |
| `claude-agent-bundle` | `.claude/` | agent-runtime | Claude Code CLI (claude-opus-4-6 per CLAUDE.md L7) | ✓ `.claude/settings.json` + 3 SKILL.md present |
| `cursor-agent-bundle` | `.cursor/` | agent-runtime | Cursor IDE | ✓ `.cursor/rules/{project,css,html}.mdc` all 3 present |

### 4.1 Deployable-unit substructure verification

**portfolio-website — 11 deployed HTML pages declared in `vite.config.js` L23-37:**

| Entry | Path | Verified at HEAD |
|---|---|:---:|
| `main` | `index.html` | ✓ |
| `cv` | `cv.html` | ✓ |
| `contact` | `contact.html` | ✓ |
| `projects-dicee` | `projects/dicee.html` | ✓ |
| `projects-maat` | `projects/maat.html` | ✓ |
| `projects-scopecam` | `projects/scopecam.html` | ✓ |
| `projects-budget-triage` | `projects/budget-triage.html` | ✓ |
| `projects-flux` | `projects/flux.html` | ✓ |
| `projects-llm-gateway` | `projects/llm-gateway.html` | ✓ |
| `experience` | `experience/index.html` | ✓ |
| `research` | `research/index.html` | ✓ |

All 11 pages exist on disk. Method: `ls -f` against each path; verification by `Read`-equivalent existence check.

**claude-agent-bundle — substructure:**
- `.claude/settings.json` (927 bytes) — allow/deny matrix + PostToolUse hook (L27-37)
- `.claude/settings.local.json` (125 bytes) — gitignored; not consumed
- `.claude/skills/fix-issue/SKILL.md`
- `.claude/skills/review-diff/SKILL.md`
- `.claude/skills/ship-small/SKILL.md`

**cursor-agent-bundle — substructure:**
- `.cursor/rules/project.mdc` (alwaysApply)
- `.cursor/rules/css.mdc` (glob: assets/**/*.css)
- `.cursor/rules/html.mdc` (glob: *.html, projects/*.html, experience/*.html, research/*.html)

### 4.2 Other profile-cited paths (sample)

10 representative paths from the profile verified at HEAD `ee6c7e5`:

| Path | Status |
|---|:---:|
| `AGENTS.md` | ✓ |
| `CLAUDE.md` | ✓ |
| `README.md` | ✓ |
| `DEV_GUIDE.md` | ✓ (contradicts AGENTS.md design-system per AAF-VGH-002) |
| `THEMES.md` | ✓ (capability-overstating doc per AAF-VGH-012) |
| `.mise.toml` | ✓ |
| `biome.json` | ✓ |
| `package.json` | ✓ |
| `vite.config.js` | ✓ |
| `.github/workflows/deploy.yml` | ✓ |
| `assets/jeffrey.css` | ✓ (not opened in detail — single-source stylesheet) |
| `assets/menu.js` | ✓ (only runtime JS) |
| `assets/icons/maat_feather_16.svg` | ✓ (site favicon; AAF-VGH-001) |
| `experiments/` | ✓ (10+ files; out-of-build sandbox) |
| `.mcp.json` | **absent** (confirms profile: context7 is operator-installed at Claude Code global level, not project-scoped; routed AAF-VGH-009) |
| `docs/decisions/`, `docs/adr/` | **absent** (confirms `governance.adr.directories: []`) |

All profile-cited paths that should exist do exist. No silent drift.

---

## 5. Strategic themes (operator-defined; custom)

| Theme | Multiplier | Weighted dimensions (operator-defined custom mapping) |
|---|---:|---|
| `career-transition-readiness` | 1.5× | 11.3 Contract discipline, 11.10 Governance and audit trail, 11.4 Tool surface clarity, 11.5 State and memory clarity |

**Sole theme.** This is a custom operator-defined theme (not one of the eight named in audit spec §11.12). Per §11.12 final paragraph: "Operators may override; custom themes name their own dimensions." The four weighted dimensions are declared in `profile.strategic_themes[0].weighting.dimensions` and are the operator's call.

**Cross-repo coupling:** This is the same theme name and same weighting that the sibling `new-direction-2026` profile declares for its own audit cycle. The website is the presentation layer of the career transition; the sibling repo is the content source. Theme alignment is intentional and is recorded in `profile.strategic_themes[0].description`.

**Rationale per operator (paraphrased from profile):**
- 11.3 Contract discipline — cross-repo source→presentation chain (6 source documents → website destinations per sibling AGENTS.md L131-142).
- 11.10 Governance and audit trail — DEV_GUIDE vs AGENTS.md contradiction is governance debt.
- 11.4 Tool surface clarity — agent governance + mcp context7 declaration.
- 11.5 State and memory clarity — `operator-rules-memory` in `.claude/settings.json` is this repo's only machine-readable authority surface.

**No other themes selected.** All findings not touching the four weighted dimensions are scored `strategic_relevance: none` (1.0×).

---

## 6. Reference anchors (per audit spec §14)

See `00-reference-anchors.json` for the structured form. Headline:

**In scope but operator-declared (informational pin only):**
- **MCP (Model Context Protocol) — context7** — declared in `CLAUDE.md` L27-33 as the project's MCP server, but no `.mcp.json` exists in-repo. context7 is operator-installed at the Claude Code global level, NOT project-scoped. Treated as `operator-installed, not project-scoped, not pinned`. Routed to Phase 4 (AAF-VGH-009). Cross-repo parity: sibling `new-direction-2026` has identical AAF-NDM-008.

**Build-time anchors (informational, not protocol surfaces):**
- **HTML5** — semantic-HTML rules declared in AGENTS.md L92 + .cursor/rules/html.mdc. Not version-pinned (HTML5 is living standard).
- **Vite 5** — `package.json` L19 `"vite": "^5.0.0"`. Build-time only; not a runtime contract.
- **Biome 2.3.8** — `biome.json` L1 `"$schema": "https://biomejs.dev/schemas/2.3.8/schema.json"` + `package.json` L18 `"@biomejs/biome": "^2.3.8"`. Build-time linter/formatter; static-analysis fitness function.

**Explicitly not applicable (no in-repo runtime LLM surface):**
- A2A — absent (no agent cards, advertised skills, task-state contracts)
- OpenAPI / Arazzo / Overlay — absent (static HTML site; no HTTP API)
- OTel semantic conventions (GenAI / agent / MCP) — absent (no tracing, no telemetry; AGENTS.md L112 forbids tracking scripts)
- JSON Schema (formal) — absent (no schema-validated payloads; only Biome JSON schema for tool config)
- C2PA / Content Credentials — absent (no media generation; content is operator-authored static HTML)
- SLSA / build-source provenance — partial (GitHub Actions `actions/deploy-pages@v4` embeds run metadata, but no explicit SLSA attestation declared; per profile `baselines.provenance.build_source_provenance_position`)
- Computer-use / browser-use sandboxing — absent (no such surfaces in this static-site repo)
- Model-provider SDK conventions — absent (no LLM calls in product code; agents are external CLI tools)

**Advisory but not weighted (no relevant operator theme):**
- NIST AI RMF — operator theme is `career-transition-readiness`, not `regulatory-readiness`. Advisory only.
- OWASP GenAI / LLM agentic risk materials — operator theme is `career-transition-readiness`, not `agent-safety-hardening`. Advisory only.

---

## 7. Companion-doc target-version drift check (audit spec §0 Phase 0 step 7)

This audit consumes the canonical 5-file package at `/Users/verlyn13/Downloads/audit spec v3 2/agentic-architecture-audit-v3.1-package/`. The profile's `governance.companion_artifacts` block (L717-742) records all 5 files with `drift_status: aligned`:

| File | Target spec | Read this run |
|---|---|:---:|
| `agentic-audit-spec-v3.md` (v3.1, 2026-05-08) | self-authoritative | ✓ |
| `project-profile-directive.md` (v1.2, 2026-05-08) | self-authoritative | ✓ (referenced) |
| `audit-kickoff-prompt.md` | "Audit Spec v3.1 + Profile Directive v1.2" | ✓ |
| `audit-spec-friendly-explainer.md` | "Audit Spec v3.1 + Profile Directive v1.2" | (referenced, not read this run) |
| `audit-directive-set-manifest.md` (package date 2026-05-08) | "package date 2026-05-08" | (referenced, not read this run) |

**Companion-doc-drift check result:** all 5 derived companions declare the same authority versions as the spec. **No drift.**

---

## 8. Routed audit-attention flags from the profile

12 flags carried forward from `profile.audit_attention_flags`. Route table:

| Phase | Flag IDs | Count |
|---:|---|---:|
| 0 | AAF-VGH-005 (resolved per evidence_extensions), AAF-VGH-011 | 2 |
| 2 | AAF-VGH-007 | 1 |
| 4 | AAF-VGH-002, AAF-VGH-008, AAF-VGH-009, AAF-VGH-012 | 4 |
| 6 | AAF-VGH-010 | 1 |
| 7 | AAF-VGH-006 | 1 |
| 8 | AAF-VGH-001, AAF-VGH-004 | 2 |
| 9 | AAF-VGH-003 | 1 |
| **Total** | | **12** |

### Phase 0 flags resolved here

- **AAF-VGH-005** (initial-capture rev 2c6924d 3 months stale; 24 M + 2 U): **resolved within the profile cycle** per `meta.evidence_extensions[0]`. Three commits landed (`daea00d` CNAME + `6eaa529` MAAT integration + `ee6c7e5` profile). Working tree at audit start is clean except for the profile-yaml file itself (the one being consumed). HEAD = `ee6c7e5`. No commit-level drift.
- **AAF-VGH-011** (PR-time deploy.yml runs quality+build but not deploy; whether they are required-for-merge gated by external GitHub branch protection rules): **recorded as declared-vs-enforced gap**. In-repo CI declaration is complete (`.github/workflows/deploy.yml` L62-74); branch-protection-rule visibility is external. Operator decision needed in remediation; not blocking the audit. Flagged here for SUMMARY caveat carry-forward.

---

## 9. Cross-repo content-pipeline reference (operator-directed; structural anchor)

This repo is the **consumer end** of a 6-document content pipeline declared in the sibling `new-direction-2026/AGENTS.md` L131-142:

| Source (sibling repo) | Destination (this repo) |
|---|---|
| `career-transition-ready/cv-materials/CV-COMPREHENSIVE-EXTRACT.md` | `cv.html` |
| `career-transition-ready/website-content/PORTFOLIO-QUICK.md` | `index.html` (hero/intro section) |
| `career-transition-ready/technical-projects/ACTIVE-PROJECTS-PORTFOLIO.md` | `projects/*.html` |
| `career-transition-ready/research-publications/RESEARCH-PUBLICATIONS.md` | `research/` pages |
| `career-transition-ready/website-content/timeline-component-spec.md` | `experience/` pages |
| `career-transition-ready/teaching-portfolio/TEACHING-INVENTORY.md` | `cv.html` (teaching section) |

The sibling's profile pairs this cross-repo dependency as `AAF-NDM-012`. This repo's profile pairs it as `AAF-VGH-008`. Phase 4 of this audit will inventory the consumer end (the 11 deployed HTML pages) and route the producer-side contract check to the sibling's audit; Phase 10 of both audits cross-reference. Method per audit spec §15 globals: no cross-repo writes; reference-only reads.

**Coordinated finding pair plan:** `F-NNN` (this repo, consumer drift) ↔ `F-NNN` (sibling, producer drift) — to be assigned in Phase 10.

---

## 10. Previous-cycle conventions

None. First cycle. `profile/cycle-history.md` does not exist. The profile's `governance.cycle_history_path: "none"` confirms. Audit may propose candidate conventions in `cycle-history-notes.md` (Phase 11).

---

## 11. Phase-0 boundary declarations honored

Per audit spec §7 Phase 0 boundaries:

- [x] Did NOT re-run profile discovery
- [x] Did NOT expand scope merely because adjacent code is interesting (sibling repo treated reference-only; no audit writes into it)
- [x] Did NOT treat profile claims as audit findings until tested (all `claimed_bounded_contexts` carried forward as claims; verified path existence only)
- [x] Did NOT silently discard profile drift; the working-tree state and AAF-VGH-005 resolution are recorded in §1 and §8 above
- [x] Did NOT treat companion docs as authority over the spec; companions pin to the same spec version (§7)

---

## 12. Exit check

- [x] Scope is bounded and audit mode is recorded (`first-cycle`)
- [x] Every routed audit-attention flag has a target phase (12/12; AAF-VGH-005 closed; AAF-VGH-011 carried for declared-vs-enforced caveat)
- [x] Every profile path missing from the current branch is listed as drift (none missing; all 11 deployed pages + all profile-cited paths present at HEAD ee6c7e5; `.mcp.json` and ADR dirs profile-confirmed-absent)
- [x] Strategic themes are recorded (sole theme: `career-transition-readiness`, custom, 1.5×, dimensions 11.3 + 11.10 + 11.4 + 11.5)
- [x] Required protocol, semantic-convention, and companion-version anchors are pinned (context7 MCP operator-installed-not-pinned per AAF-VGH-009; Vite/Biome/HTML5 informational; others n/a) or explicitly marked not applicable
- [x] CNAME content verified against profile claim (`jvjohnson.dev`; matches)

Phase 0 exit check passes. Advancing to Phase 1 (vocabulary) when the operator schedules the next directive.
