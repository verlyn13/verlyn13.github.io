# Phase 2 — Bounded Context Mapping

**Audit spec:** Agentic Architecture Audit Specification v3.1 (2026-05-08)
**Audit date:** 2026-05-22
**Audit mode:** `first-cycle`
**Repo HEAD:** `ee6c7e55331faaf55fa6bb4cde49abd9e1c96f9a`

**Routed AAFs touching context boundaries:** AAF-VGH-007 (experiments-sandbox lifecycle); collisions from Phase 1 also feed context-membership questions (Collisions 1, 4, 5, 8).
**Claimed contexts under examination:** 4 carried from profile (portfolio-pages, build-system, agent-governance, experiments-sandbox).

---

## 1. Method

For each of the 4 profile-claimed bounded contexts, gathered evidence types per audit spec §7 Phase 2 procedure. Status determined by evidence-count threshold:

| Status | Threshold |
|---|---|
| `confirmed` | ≥ 3 distinct evidence types supporting coherent boundary |
| `candidate` | 1–2 evidence types |
| `claimed-only` | docs/folder names claim it but code evidence insufficient |
| `rejected` | claim contradicts evidence |
| `merged` | evidence shows claim is part of another context |
| `split` | evidence shows claim contains multiple contexts |

Audit-spec §6.3 tie-breakers applied as needed.

Boundary declarations honored:
- [x] Did not upgrade `claimed-only` to `confirmed` without three independent evidence types.
- [x] Did not treat shared infrastructure (mise, biome, GitHub Actions runners) as proof of one bounded context.
- [x] Did not recommend folder moves.
- [x] Did not decide ownership when ownership is absent (all 4 owned by `jeffrey` per profile `claimed_ownership`).

---

## 2. Per-context decisions

### 2.1 `portfolio-pages` → **CONFIRMED**

| Field | Value |
|---|---|
| Status | `confirmed` |
| Owner | `jeffrey` (single-operator project; no CODEOWNERS, no contributors file) |
| Authority basis | `authoritative-store` (the 11 deployed HTML files + `assets/jeffrey.css` + `assets/menu.js` ARE the artifact) + `external-authority` (cross-repo content source — `../new-direction-2026` per `AGENTS.md L131-142` of sibling, AAF-VGH-008) |
| Authoritative store | The 11 HTML files registered in `vite.config.js:23-37` rollupOptions.input; the single stylesheet `assets/jeffrey.css`; the runtime JS `assets/menu.js` |
| Evidence types satisfied | (1) Build registry [`vite.config.js:22-37` declaring 11 entries], (2) Filesystem evidence [all 11 .html files verified at HEAD; `assets/jeffrey.css` + `assets/menu.js` present], (3) Authoring rules [`.cursor/rules/html.mdc` glob targets `*.html, projects/*.html, experience/*.html, research/*.html`], (4) Site content vocabulary [titles, h1/h2 hierarchies, nav labels — full inventory §2.1 of `01-vocabulary.md`], (5) Cross-repo content-source contract [sibling AGENTS.md L131-142 declares 6 source→destination mappings, 6/6 anchors verified] |
| Inbound commands | `mise run dev` (vite dev server at :5173), `mise run preview` (vite preview at :4173); operator-edits via Claude Code / Cursor IDE (read-write subject to `.claude/settings.json` deny patterns) |
| Outbound events | none (no event bus); side effects = file writes to `*.html` / `assets/jeffrey.css` / `assets/menu.js`; downstream consumer is `build-system` (vite build → `dist/` → GitHub Pages) |
| External dependencies | Browser rendering at https://jvjohnson.dev (GitHub Pages serving `dist/`); cross-repo content source `../new-direction-2026` (manual handoff via `/sync-check` skill in the sibling) |
| Consumed contracts | Sibling's content-pipeline declaration at `../new-direction-2026/AGENTS.md:131-142` (6 source documents) — Phase 4 inventory. HTML5 living standard. CSS custom-properties contract from `assets/jeffrey.css`. |
| Produced contracts | The 11 deployed pages as themselves are the produced contract — bookmarked URLs per `AGENTS.md:111` "Never break existing page URLs". |
| Subagents consumed | none (no Claude Code subagents in `.claude/agents/`; `Task` tool subagents are Claude Code built-ins per profile `subagents.count: 0`) |
| Citations | see `02-contexts.json` |

**Decision rationale — confirming portfolio-pages distinct from build-system:**

The page-files (the artifact) and the build configuration (the producer) operate on different evidence types and different lifecycles. The page-files are operator-authored content; the build configuration declares HOW they are built. Distinct lifecycles: a page can change without changing the build; the build can change without changing pages. Confirmed as separate context.

**Decision rationale — should assets/ split into its own context (design-system-assets)?**

Considered per the operator question. Evidence reviewed:
- `assets/jeffrey.css` — single stylesheet, hard-rule single-source per `AGENTS.md:94` + `.cursor/rules/css.mdc:9`.
- `assets/menu.js` — only runtime JS; mobile-nav toggle + active-link state.
- `assets/icons/maat_feather_16.svg` — favicon used by all 11 deployed pages.

Decision: **no split.** The assets/ directory shares the same authority basis (the deployed pages-as-artifact), same owner (`jeffrey`), and same lifecycle (changes propagate via vite build → dist → GitHub Pages). A separate "design-system-assets" context would require a separate authority basis (e.g., a published design-token package) which does not exist. Per spec §6.3: "do not treat shared infrastructure as proof of one bounded context" — but the converse also holds: the absence of a distinct authority surface is reason NOT to split. Audit records this as a Phase 1 design-system **vocabulary** collision (Collisions 1, 3, 4 in `01-vocabulary.md`), not a Phase 2 context split.

### 2.2 `build-system` → **CONFIRMED** (and DOES NOT split deploy.yml)

| Field | Value |
|---|---|
| Status | `confirmed` |
| Owner | `jeffrey` |
| Authority basis | `stateless-policy` (the build configuration is rules + config consumed by external tools — vite, biome, mise, GitHub Actions) |
| Authoritative store | `vite.config.js` (the 11-page registry) + `biome.json` (lint/format rules) + `.mise.toml` (task definitions + Node 24 pin) + `package.json` (npm scripts + dep manifest) + `.github/workflows/deploy.yml` (CI/CD pipeline) |
| Evidence types satisfied | (1) Config files [5 files: vite.config.js, biome.json, .mise.toml, package.json, deploy.yml], (2) Task vocabulary [10 mise tasks declared at .mise.toml L4-42; the `mise run ci` gate appears in 6+ files], (3) Ask-first protection [`AGENTS.md:96-103` lists 4 build-config files as ask-first; `.cursor/rules/project.mdc:33-38` mirrors], (4) CI execution evidence [3 GH Actions jobs at `.github/workflows/deploy.yml:20-83`: quality → build → deploy], (5) Existing fitness functions [biome check / biome format check / vite build / GH Pages deploy gate — profile `governance.existing_fitness_functions`] |
| Inbound commands | `mise run {dev, build, preview, lint, lint:fix, format, format:check, clean, deploy, ci}` (10 task verbs); `npm` direct invocations; `git push` to `main` (triggers GH Actions); `git push` to a PR branch (triggers quality + build, not deploy) |
| Outbound events | (a) `dist/` artifact at end of `vite build` — consumed by `actions/upload-pages-artifact@v3`; (b) GitHub Pages deployment event via `actions/deploy-pages@v4` — consumed by https://jvjohnson.dev; (c) Biome auto-format side effects (consumed by `.claude/settings.json` PostToolUse hook) |
| External dependencies | Node 24 (mise-pinned), npm (Vite ^5.0.0 + Biome ^2.3.8 per `package.json:18-19`), GitHub Actions runners (`ubuntu-latest`), 5 GitHub Actions (`actions/checkout@v4`, `setup-node@v4`, `configure-pages@v4`, `upload-pages-artifact@v3`, `deploy-pages@v4` per `deploy.yml`) — Phase 6 supply-chain note via AAF-VGH-010 |
| Consumed contracts | npm package.json schema; Biome 2.3.8 JSON schema (`biome.json:1` `"$schema": "https://biomejs.dev/schemas/2.3.8/schema.json"`); GitHub Actions workflow YAML schema (implicit); mise.toml TOML schema (implicit) |
| Produced contracts | The 10 mise tasks (operator-facing); the 3 GH Actions job names ("Code Quality", "Build Site", "Deploy to GitHub Pages") — consumed by GH UI + branch protection rules (external, see AAF-VGH-011) |
| Subagents consumed | none |
| Citations | see `02-contexts.json` |

**Decision rationale — should `.github/workflows/deploy.yml` split into its own context (ci-cd or deployment)?**

Considered per the operator question. Evidence reviewed:
- `deploy.yml` is treated by `AGENTS.md:101` as Ask-first-protected on equal footing with `vite.config.js` — same authority class.
- The CI pipeline (`quality` + `build` jobs) re-runs the same `mise run ci` gate that operators run locally; this is one logical gate, two execution surfaces.
- The `deploy` job adds GitHub-Pages-specific authority (`pages: write`, `id-token: write` per L12-13) — that IS distinct authority, but it does not require a separate context: the deploy job's authority is recorded in Phase 6 against this context.
- All 5 build-config files share lifecycle (changes land in one PR per the Ask-first ask), same operator, same protection model.

Decision: **no split.** `deploy.yml` is part of `build-system`. The deploy-time elevated permissions are recorded in Phase 6 as a principal-level boundary (CI runner with id-token:write) inside the build-system context, not as a separate context. Per spec §6.3 tie-breaker: when a "service" orchestrates I/O, the I/O belongs in an adapter — but here all 3 GH Actions jobs are part of one orchestration (build → deploy is a 3-step pipeline, not 3 independent contexts).

**Cross-cutting observation:** `deploy.yml`'s deploy-job authority (pages:write + id-token:write per L10-13) is real but is local to one job inside this context. AAF-VGH-010 (unpinned actions @v4) and AAF-VGH-011 (PR-time gates declared but external branch protection unknown) are Phase 6 / Phase 0 concerns, not Phase 2 split triggers.

### 2.3 `agent-governance` → **CONFIRMED**

| Field | Value |
|---|---|
| Status | `confirmed` |
| Owner | `jeffrey` |
| Authority basis | `stateless-policy` (instruction files consumed by external agents — Claude Code, Cursor IDE) + `operator-rules-memory` (`.claude/settings.json` is project-scoped Claude permissions per profile `memory_surfaces_detected[0]`) |
| Authoritative store | `AGENTS.md` (canonical project contract — per `CLAUDE.md:3` "Primary project contract: @AGENTS.md") + `CLAUDE.md` (Claude-Code-specific shim) + `.claude/settings.json` + 3× `.claude/skills/<name>/SKILL.md` + 3× `.cursor/rules/*.mdc` + `DEV_GUIDE.md` (stale, see Phase 1 Collision 1) + `THEMES.md` (overstated capability, see Phase 1 Collision 4) + `README.md` (license + project summary) |
| Evidence types satisfied | (1) Canonical-contract declaration [`CLAUDE.md:3` declares AGENTS.md primary], (2) 3 Claude SKILL.md files [fix-issue, review-diff, ship-small — verified at HEAD per Phase 0 §4.1], (3) 3 Cursor rule files with auto-attach globs [project.mdc alwaysApply, css.mdc on assets/**/*.css, html.mdc on *.html + project/experience/research/*.html], (4) `.claude/settings.json` permissions+PostToolUse hook [9 allow + 9 deny patterns + 1 hook per L1-39], (5) Precedence statement [CLAUDE.md L3 "Primary project contract: @AGENTS.md"], (6) MCP declaration [CLAUDE.md L27-33 declares context7 as the project's MCP server], (7) Cross-repo agent-governance pattern [same triadic AGENTS.md + CLAUDE.md + .cursor/rules pattern declared in 2 sibling repos: `new-direction-2026` and `planning-summer-2026`] |
| Inbound commands | (read by external agents — Claude Code CLI, Cursor IDE — when those tools open this directory); operator-invoked slash commands `/fix-issue`, `/ship-small`, `/review-diff` |
| Outbound events | PostToolUse hook fires after every Write/Edit (Claude Code event) — runs `npx biome format --write` on `.js`/`.json`/`.css` files with 10s timeout and silenced errors (`2>/dev/null; exit 0`) — see AAF-VGH-006 |
| External dependencies | Claude Code CLI (Anthropic), Cursor IDE, npx + biome at runtime (PostToolUse hook), context7 MCP server (operator-installed at Claude Code global level, not project-scoped — AAF-VGH-009), `jq` (referenced in the PostToolUse hook command at `.claude/settings.json:33`) |
| Consumed contracts | Claude Code hooks specification (PreToolUse / PostToolUse — only PostToolUse used here); Claude Code permissions schema (the `permissions` object at L2-26); Cursor rule frontmatter schema (`description`, `globs`, `alwaysApply` at top of each .mdc); Claude Code SKILL.md frontmatter schema (`name`, `description`); MCP protocol (whatever version context7 implements — unpinned, AAF-VGH-009) |
| Produced contracts | 3 SKILL.md system prompts (workflow definitions), 3 Cursor rule files (auto-attached standing instructions), 1 PostToolUse hook command spec, 1 permissions allow/deny matrix; the `Always`/`Ask first`/`Never` 3-tier authority taxonomy at AGENTS.md L86-112 |
| Subagents consumed | none (`Task` tool subagents Explore + general-purpose are Claude Code built-ins, not project-defined per profile `subagents.count: 0`) |
| Citations | see `02-contexts.json` |

**Decision rationale — `agent-governance` distinct from `portfolio-pages`:**

Evidence for distinctness:
- **Authority basis differs:** stateless-policy (governance docs) vs. authoritative-store (deployed pages).
- **Consumer differs:** Claude Code + Cursor IDE consume agent-governance; browsers consume portfolio-pages.
- **Lifecycle differs:** governance changes affect agent behavior; page changes affect site rendering. The two CAN co-change (e.g., a new approach-card requires both content and possibly a vocabulary update), but their primary lifecycles are independent.
- **Sibling parity:** the same triadic governance pattern (AGENTS.md + CLAUDE.md + .cursor/rules) exists in 2 sibling repos. This is a pattern of "agent-governance as a stable bounded context" across the operator's project family.

**Decision rationale — DEV_GUIDE.md membership:**

DEV_GUIDE.md belongs to `agent-governance` (it is in the same governance-doc cluster) but contradicts the rest of the cluster per Collision 1 of Phase 1. This is **intra-context drift**, not a context-boundary problem. DEV_GUIDE.md is governance per audit-spec §6.1 #10. The fact that it's stale does not move it to a different context.

**Decision rationale — THEMES.md membership:**

THEMES.md is a hybrid document — it is `documentation-about-prompts` (per profile `prompts.surface_types`) AND it declares an overstated capability. It belongs to `agent-governance` (documentation surface) but its claim about `experiments/themes/academic.css` is cross-context (the file lives in `experiments-sandbox`). Recorded as Collision 4 / Collision 8 in Phase 1; in Phase 2, treated as a governance doc with a cross-context reference, not as proof of a context split.

### 2.4 `experiments-sandbox` → **CONFIRMED** (as a non-deployable working-context, NOT a "non-context working directory")

| Field | Value |
|---|---|
| Status | `confirmed` (as a bounded context with distinct lifecycle, not as a §6.3 "non-context working directory") |
| Owner | `jeffrey` |
| Authority basis | `stateless-policy` (explicit exclusion rules + lifecycle declaration) — NOT `authoritative-store` because the contents are not authoritative for any consumer (they are not deployed) |
| Authoritative store | n/a — derived-durable per profile `infrastructure.data_stores[3]` |
| Evidence types satisfied | (1) Build exclusion [`vite.config.js:22-37` rollupOptions.input does NOT list any `experiments/` path — verified], (2) Lint exclusion [`biome.json:4` `"includes": ["**", "!experiments"]`], (3) Lifecycle declaration [`.cursor/rules/html.mdc:39-41` "Pages under experiments/ are excluded from CI and deployment — safe to prototype freely there"; `.cursor/rules/project.mdc:61` "Safe sandbox (not deployed) → experiments/"; `AGENTS.md:23,139` "Prototypes and unused assets (not deployed)"], (4) Filesystem evidence [17 files in `experiments/` verified at HEAD: 3 HTML prototypes (timeline-braid, timeline-prototype, page-idea), an svg-src/ subdir with build.sh + README + svgo.config.js + 3 svg source files, 2 mono icon SVGs, 1 themes/ subdir with academic.css, 1 timeline-data.json, 1 braid-timeline.svg], (5) Active-use evidence [working-tree at initial profile capture had `experiments/svg-src/*` modified — operator IS using the sandbox actively per AAF-VGH-007] |
| Inbound commands | operator-edits via Claude Code / Cursor IDE; `experiments/svg-src/build.sh` (local build script for the braid timeline SVG, present but not invoked from CI) |
| Outbound events | (a) Hand-promoted artifacts — the produced `braid-timeline.svg` in `experiments/` is referenced by `experience/index.html` at L54 (`<svg class="braid-svg" id="braid-timeline-svg">` is inlined, but the source under svg-src/ feeds it); this is a manual promotion path from experiments → portfolio-pages; (b) `experiments/themes/academic.css` — referenced by `THEMES.md` as a switchable theme that overstates capability (Collision 4); no automated outbound |
| External dependencies | `svgo` (per `experiments/svg-src/svgo.config.js` — not in `package.json` so requires global install or `npx`); the `experiments/svg-src/build.sh` script |
| Consumed contracts | none formal — it is a sandbox by definition |
| Produced contracts | none formal; produces artifacts that may be hand-promoted (the braid timeline being the active example) |
| Subagents consumed | none |
| Citations | see `02-contexts.json` |

**Decision rationale — is `experiments-sandbox` a real bounded context or a §6.3 "non-context working directory"?**

The spec's §6.3 hint (a directory may not be a context if it has "only adapters, only generated artifacts, or only contracts with no domain behavior") is the relevant test. Evidence reviewed:

- **Not "only generated artifacts":** the sandbox contains hand-authored prototypes (3 HTML pages with distinct content), governance-style files (`svg-src/README.md`, `svg-src/TEMPLATE-STRUCTURE.md`, `svg-src/NAVIGATOR-CONCEPTS.md`), a build script, and a stylesheet (`themes/academic.css`). These are authored artifacts, not pure generated output.
- **Has distinct lifecycle:** explicitly excluded from CI (`biome.json:4`) AND from build (`vite.config.js:22-37` omits all experiments/ paths) AND has its own behavior contract ("safe to prototype freely"). This is a deliberate authority surface, not an absence of authority.
- **Has outbound hand-promotion path:** the braid timeline (verified: `experiments/braid-timeline.svg` exists, and `experiments/svg-src/braid-timeline.src.svg` is the source) appears to feed the experience page. This is a real cross-context flow — manual but real.
- **Has consumer evidence outside itself:** `THEMES.md:25-41` documents `styles-academic.css` as a switchable theme; the actual file lives at `experiments/themes/academic.css`. Even though the documented switch-mechanism doesn't work (Collision 4), the documentation establishes that this sandbox produces artifacts that other parts of the system reference.

Status: **`confirmed`** — meets the ≥3-evidence-type threshold. Has authority basis (`stateless-policy` via explicit exclusion rules). Has identifiable consumers (manual promotion to portfolio-pages; reference from THEMES.md).

**Sub-decision: AAF-VGH-007 outcome.** AAF-VGH-007 asked "experiments/ context is git-tracked but excluded from CI and excluded from build — is this a real bounded context?" Phase 2 answer: **yes, real**, with the distinguishing characteristic that the authority basis is "explicit exclusion + stated relaxed-rules lifecycle" rather than "deployed artifact". The Phase 10 question (whether `experiments/` should be subject to relaxed lint or remain ungated) remains open as a remediation decision; Phase 2 only confirms the context boundary.

---

## 3. Cross-cutting structural observations

### 3.1 The `assets/` directory belongs to `portfolio-pages`, NOT a separate design-system context

The operator question asked whether `assets/` should split into a `design-system-assets` context. Phase 2 answer: **no.** The assets are not a separate authority; they are part of the portfolio-pages authoritative store. The single-stylesheet rule (`AGENTS.md:94`) and the rem-based design-token vocabulary (Phase 1 §2.4) are governance over the portfolio-pages context, not declarations of a separate context.

### 3.2 `.github/workflows/deploy.yml` belongs to `build-system`, NOT a separate CI/CD context

The operator question asked whether `deploy.yml` should be its own context. Phase 2 answer: **no.** The deploy job's elevated permissions (`pages: write`, `id-token: write`) ARE a real authority boundary, but the boundary is recorded inside `build-system` as a principal-level concern for Phase 6. The 3-job pipeline (quality → build → deploy) is one orchestration with one authoritative artifact (`dist/`), not three contexts.

### 3.3 The `experiments/themes/` cross-collision (Phase 1 Collision 8)

`experiments/themes/academic.css` is **inside** the `experiments-sandbox` context per filesystem placement and the exclusion rules. The `THEMES.md` documentation that references it (and uses the path `assets/styles-academic.css` which doesn't exist) is **inside** the `agent-governance` context. This is a documented capability that crosses two contexts incorrectly. Recorded in Phase 1; in Phase 2, treated as evidence that `THEMES.md` overstates the agent-governance context's authority (it claims to govern a switch-mechanism that doesn't exist as written).

**Phase 4 / Phase 10 remediation choice:** (a) move `themes/academic.css` to `assets/styles-academic.css` and build a real switcher, (b) retire the multi-theme claim from THEMES.md, or (c) document the current as-is state (manual hand-edit to switch). Phase 2 does not decide.

### 3.4 No subagents, no agent-runtime, no LLM call surfaces in product code

Across all 4 contexts, there are zero `.claude/agents/` files, zero runtime LLM calls in the static site, zero agent-runtime code paths. The Claude Code + Cursor IDE agents operate OUTSIDE this repo (as external CLI/IDE tools), reading the governance files at agent-startup. This is recorded in `agent-governance` context as the authority basis (`stateless-policy`).

This means **Phase 3 (Runtime Map) will have minimal agentic content** for this repo — most entrypoints are operator-invoked tasks (mise) or git-triggered CI runs. Phase 8 will still execute against the non-runtime prompts (SKILL.md as `runtime-nonproduction-prompt`, governance docs as `skill-or-sop`).

### 3.5 Cross-repo context-edge: portfolio-pages consumes new-direction-2026's content-pipeline

Per AAF-VGH-008 and `../new-direction-2026/AGENTS.md:131-142`, the portfolio-pages context has an inbound content-contract edge from the sibling repo. Six source documents → six destination surfaces in this repo (all 6 anchors verified per Phase 1 §6). The edge is real and is recorded in `02-contexts.json` and the Mermaid diagram. No automated check exists for source-consumer drift (Phase 4 / Phase 10 fitness-function candidate).

### 3.6 No claimed bounded contexts were `merged`, `split`, or `rejected`

All 4 claimed contexts confirmed as-claimed. The operator's claim set is coherent and matches code evidence. This is unusual for a first-cycle audit and reflects the operator's careful Phase G interview.

**No `claimed-only` carry-forward.** Unlike sibling meta-inventory which carries `external-organizational-target` as claimed-only, this repo has no scoped-out claim.

---

## 4. Context map (textual; Mermaid in `02-context-map.mmd`)

```
                  ┌──────────────────────────────────────────────────────────────┐
                  │            verlyn13.github.io project root                   │
                  │                                                              │
                  │  ┌────────────────────────────────────────────────────────┐  │
                  │  │           Context: agent-governance                    │  │
                  │  │   AGENTS.md (canonical) · CLAUDE.md (shim)             │  │
                  │  │   DEV_GUIDE.md (STALE — Collision 1)                   │  │
                  │  │   THEMES.md (overstated capability — Collision 4)      │  │
                  │  │   README.md                                            │  │
                  │  │   .claude/settings.json + 3 SKILL.md                   │  │
                  │  │   .cursor/rules/{project,css,html}.mdc                 │  │
                  │  │   Authority: stateless-policy + operator-rules-memory  │  │
                  │  └────────────────────────────────────────────────────────┘  │
                  │            │ (consumed by external agents:                   │
                  │            │  Claude Code, Cursor IDE)                       │
                  │            │ (PostToolUse hook fires biome format            │
                  │            │  on .js/.json/.css after every Write/Edit)      │
                  │            ▼                                                 │
                  │  ┌────────────────────────────────────────────────────────┐  │
                  │  │           Context: portfolio-pages                     │  │
                  │  │   11 deployed HTML pages (vite.config.js L23-37):      │  │
                  │  │     main, cv, contact, projects-{dicee, maat,          │  │
                  │  │     scopecam, budget-triage, flux, llm-gateway},       │  │
                  │  │     experience, research                               │  │
                  │  │   assets/jeffrey.css (single stylesheet)               │  │
                  │  │   assets/menu.js (mobile-nav toggle)                   │  │
                  │  │   assets/icons/maat_feather_16.svg (favicon — all 11)  │  │
                  │  │   Authority: authoritative-store + external-authority  │  │
                  │  │              (cross-repo content source)               │  │
                  │  └────────────────────────────────────────────────────────┘  │
                  │            │ (built by mise run build /                      │
                  │            │  vite build → dist/)                            │
                  │            ▼                                                 │
                  │  ┌────────────────────────────────────────────────────────┐  │
                  │  │           Context: build-system                        │  │
                  │  │   vite.config.js (11-page registry)                    │  │
                  │  │   biome.json (lint+format; 2 rules warn-not-error)     │  │
                  │  │   .mise.toml (10 tasks)                                │  │
                  │  │   package.json (npm scripts + deps)                    │  │
                  │  │   .github/workflows/deploy.yml (3-job CI:              │  │
                  │  │     quality → build → deploy)                          │  │
                  │  │   Authority: stateless-policy + GH-Pages id-token      │  │
                  │  └────────────────────────────────────────────────────────┘  │
                  │            │ (produces dist/ artifact)                       │
                  │            │ (deploys via actions/deploy-pages@v4)           │
                  │            ▼                                                 │
                  │       https://jvjohnson.dev (GitHub Pages)                   │
                  │                                                              │
                  │  ┌────────────────────────────────────────────────────────┐  │
                  │  │       Context: experiments-sandbox (non-deployed)      │  │
                  │  │   experiments/ (excluded from CI + build)              │  │
                  │  │     timeline-braid.html, timeline-prototype.html,      │  │
                  │  │       page-idea.html (3 HTML prototypes)               │  │
                  │  │     svg-src/{build.sh, README.md, NAVIGATOR-CONCEPTS,  │  │
                  │  │       TEMPLATE-STRUCTURE, svgo.config.js,              │  │
                  │  │       braid-timeline.src.svg + backups}                │  │
                  │  │     themes/academic.css (overstated capability         │  │
                  │  │       per Collision 4)                                 │  │
                  │  │     {maat_feather_mono, scopecam_mono}.svg             │  │
                  │  │     timeline-data.json, braid-timeline.svg             │  │
                  │  │   Authority: stateless-policy via explicit exclusion   │  │
                  │  └────────────────────────────────────────────────────────┘  │
                  │            │ (manual hand-promotion of                       │
                  │            │  braid-timeline.svg → experience/)              │
                  │            └─────────────────────┐                           │
                  │                                  ▼                           │
                  │                       (back to portfolio-pages)              │
                  │                                                              │
                  └──────────────────────────────────────────────────────────────┘
                              ▲
                              │ inbound content-pipeline contract
                              │ (6 source→destination mappings;
                              │  6/6 anchors verified per Phase 1 §6)
                              │
                  ┌──────────────────────────────────────────────────────────────┐
                  │  EXTERNAL: ../new-direction-2026 (sibling repo)              │
                  │  Producer end of the content pipeline declared in            │
                  │  its AGENTS.md L131-142. Cross-repo finding pair             │
                  │  AAF-VGH-008 ↔ sibling AAF-NDM-012.                          │
                  │  Reference-only per Phase 0; no audit writes.                │
                  └──────────────────────────────────────────────────────────────┘
```

### 4.1 Edges (with evidence)

| Edge | From | To | Kind | Evidence |
|---|---|---|---|---|
| E1 | agent-governance | portfolio-pages | governance (`stateless-policy`) | `AGENTS.md:86-128` design system + boundary rules applied to portfolio-pages |
| E2 | agent-governance | build-system | governance (`stateless-policy`) | `AGENTS.md:96-103` Ask-first protection over vite.config.js + deploy.yml |
| E3 | agent-governance | experiments-sandbox | governance (`stateless-policy`) | `.cursor/rules/html.mdc:39-41` lifecycle declaration |
| E4 | agent-governance | (Claude Code external) | hook + permissions | `.claude/settings.json:1-39` consumed by Claude Code at agent-startup |
| E5 | agent-governance | (Cursor IDE external) | rule auto-attach | `.cursor/rules/*.mdc` frontmatter globs |
| E6 | agent-governance (PostToolUse hook) | portfolio-pages + build-system | event-triggered side effect | `.claude/settings.json:27-37` runs `biome format --write` on .js/.json/.css after every Write/Edit |
| E7 | portfolio-pages | build-system | build input | `vite.config.js:22-37` registers 11 HTML pages |
| E8 | build-system | (GitHub Pages external) | release | `.github/workflows/deploy.yml:72-83` deploy job with `actions/deploy-pages@v4` |
| E9 | (browser external) | portfolio-pages | runtime read | https://jvjohnson.dev serves dist/ |
| E10 | (new-direction-2026 external producer) | portfolio-pages | content-pipeline contract | `../new-direction-2026/AGENTS.md:131-142` 6 source→destination mappings; all 6 anchors verified in Phase 1 §6 |
| E11 | experiments-sandbox | portfolio-pages | manual artifact promotion | `experiments/braid-timeline.svg` → `experience/index.html` (inline SVG); no automated promotion |
| E12 | THEMES.md (in agent-governance) | experiments-sandbox | overstated reference (broken) | THEMES.md L48 sed-script targets `assets/styles-academic.css` which doesn't exist; the file is at `experiments/themes/academic.css` (Collision 4) |
| E13 | build-system (deploy job) | (GitHub Pages OIDC) | secondary-credential | `deploy.yml:13` `id-token: write` for OIDC token exchange (Phase 6) |

---

## 5. Exit check (audit spec §7 Phase 2)

- [x] Every claimed bounded context is confirmed (4), retained as candidate (0), rejected (0), merged (0), or split (0). All 4 → `confirmed`.
- [x] Every confirmed context has an authority basis:
  - portfolio-pages → `authoritative-store` + `external-authority`
  - build-system → `stateless-policy`
  - agent-governance → `stateless-policy` + `operator-rules-memory`
  - experiments-sandbox → `stateless-policy` (via explicit exclusion)
- [x] No context map edge lacks evidence (13 edges, each with citation in §4.1).
- [x] Did not upgrade a claimed-only to confirmed without ≥3 evidence types (all 4 cleared the threshold with 4-7 evidence types each).
- [x] Did not treat shared infrastructure as proof of one context (mise, biome, GH Actions runners are tools, not context-merging evidence).
- [x] Did not recommend folder moves (the question of `assets/` split was answered NO; the question of `deploy.yml` split was answered NO; no remediation moves proposed).
- [x] Did not decide ownership when absent (all 4 owned by `jeffrey` per profile `claimed_ownership`).

Phase 2 exit check **passes**. Advancing to Phase 3 (runtime map).

---

## 6. Summary

| Question | Answer |
|---|---|
| 4 contexts confirmed? | Yes (4/4: portfolio-pages, build-system, agent-governance, experiments-sandbox) |
| `assets/` split into its own context? | No — stays in portfolio-pages |
| `deploy.yml` split into its own context? | No — stays in build-system (deploy-job elevated permissions recorded as Phase 6 boundary inside build-system) |
| `experiments-sandbox` confirmed as a real bounded context or reclassified to "non-context working directory" per §6.3? | **Confirmed** as a real bounded context — has explicit authority basis (stateless-policy via exclusion rules), distinct lifecycle, identifiable consumers (manual artifact promotion + THEMES.md cross-reference), and multiple evidence types. NOT a §6.3 non-context. |
| Any contexts merged / split / rejected? | None |
| Any contexts claimed-only carry-forward? | None |
| MAAT-related vocabulary as a collision? | Yes — Collision 2 in Phase 1 (operator-positioning vs site-content). Phase 1 records; Phase 8 will judge. |
| Cross-repo content-pipeline anchors verified? | 6 of 6 (Phase 1 §6); inbound edge to portfolio-pages recorded in §4.1 as E10. |
