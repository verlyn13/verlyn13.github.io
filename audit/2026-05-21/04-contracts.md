# Phase 4 — Contract Inventory

**Audit spec:** Agentic Architecture Audit Specification v3.1 (2026-05-08)
**Audit date:** 2026-05-22
**Audit mode:** `first-cycle`
**Repo HEAD:** `ee6c7e55331faaf55fa6bb4cde49abd9e1c96f9a`

**Routed AAFs in this phase:** AAF-VGH-002 (DEV_GUIDE.md vs AGENTS.md design-system contradiction), AAF-VGH-008 (cross-repo content-pipeline consumer side; pairs with sibling AAF-NDM-012), AAF-VGH-009 (context7 MCP unpinned + not project-scoped), AAF-VGH-010 (third-party action versions @v\* not SHA-pinned), AAF-VGH-012 (THEMES.md overstated multi-theme capability).

**Cross-repo Phase 4 anchor:** the 6 source→destination mappings declared at `../new-direction-2026/AGENTS.md:131-142` (sibling, producer side) are inventoried here on the consumer side. Pairs with the sibling's audit; cross-repo synthesis layer reconciles in Phase 10.

---

## 1. Method

Per audit spec §7 Phase 4. Located every externally-visible and internally-relied-upon contract surface. For each, recorded §8.5 fields (name, format, surface, location, versioning, schema dialect, protocol version, advertised capabilities, auth, producers, consumers, validation, compatibility policy, flags, citations). Boundaries honored:

- Did not equate "having schemas" with contract discipline (producer/consumer/validation/versioning required).
- Did not require a particular schema technology — ad-hoc and conventional contracts inventoried as such.
- Did not flatten MCP into "tool exists" — context7 receives its own contract row.
- Treated parallel governance contracts (AGENTS.md vs DEV_GUIDE.md) as **two contracts**, not one, with `producer-consumer-drift` flag.

This repo is a static HTML5 portfolio with no HTTP API, no event bus, no RPC, no inter-service messaging. Most contracts are configuration manifests, governance documents, and the page-as-bookmarkable-URL surface. Counted: 22 distinct contract rows across 4 contexts.

---

## 2. Contract inventory

### 2.1 Vite entrypoint-map (the 11-page registry)

| Field | Value |
|---|---|
| Name | `vite.config.js rollupOptions.input` |
| Format | `typescript` (technically JavaScript ES module exporting `defineConfig`) |
| Surface | `config` |
| Location | `vite.config.js:22-37` |
| Versioning | `none` (no schema-version comment, no migration log; depends on Vite 5 schema) |
| Schema dialect | Vite v5 `UserConfig` (`vite` package types) |
| Protocol version | Vite ^5.0.0 (`package.json:19`) |
| Advertised capabilities | 11 keyed page entries (main, cv, contact, projects-{dicee, maat, scopecam, budget-triage, flux, llm-gateway}, experience, research) |
| Producers | operator (`Ask first` per `AGENTS.md:100`); enforced by `.cursor/rules/html.mdc:32-34` "Add entry to vite.config.js rollupOptions.input map" |
| Consumers | (a) CI build job `E-07`; (b) local build `E-03`; (c) GitHub Pages serving `E-HTTP-pages`; (d) the page-as-URL contract (the entries' keys do not appear in URLs, but the file paths do) |
| Validation | implicit: vite's own input validator fails the build if a path doesn't resolve to a readable file; **no test asserts the entry list matches the on-disk HTML inventory** (fitness-function candidate) |
| Compatibility policy | none declared; convention is "add new page → add entry" |
| Flags | `config-without-validation` (no test asserts 1:1 with on-disk pages); `version-drift` (not vite's API drift; the *page-set* drifts vs the file system if entries are added/removed without matching) |
| Citations | `vite.config.js:22-37`, `AGENTS.md:99-100`, `.cursor/rules/html.mdc:32-34` |

### 2.2 Biome lint+format ruleset

| Field | Value |
|---|---|
| Name | `biome.json` ruleset (2.3.8 schema) |
| Format | `json-schema` |
| Surface | `config` |
| Location | `biome.json:1-36` |
| Versioning | `schema-version` — explicit at L1: `"$schema": "https://biomejs.dev/schemas/2.3.8/schema.json"` |
| Schema dialect | Biome 2.3.8 JSON Schema |
| Protocol version | n/a |
| Advertised capabilities | `files.includes` exclusion of `experiments/`; `linter.rules.recommended: true`; 2 rules at `warn` (`complexity.noImportantStyles`, `style.noDescendingSpecificity`); 2-space indent; 100-char line width; single quotes; semicolons-as-needed |
| Producers | operator; `Ask first` for design-system-rule changes |
| Consumers | (a) CI `quality` job `E-06` via `npx biome check .` + `npx biome format .`; (b) local `mise run lint`/`format`; (c) PostToolUse hook `E-12` via `npx biome format --write <file>`; (d) Cursor IDE if Biome plugin is installed (out-of-repo) |
| Validation | the schema itself is referenced for IDE validation; CI runs the linter as the validation step |
| Compatibility policy | major version pin via `^2.3.8` in `package.json:18` |
| Flags | none — this is the cleanest contract in the repo. The 2 `warn`-not-`error` rules (AAF-VGH-003) are a Phase 9 fitness-function tightening candidate, not a contract defect. |
| Citations | `biome.json:1-36`, `package.json:18` |

### 2.3 deploy.yml CI/CD pipeline contract (3 jobs)

| Field | Value |
|---|---|
| Name | `.github/workflows/deploy.yml` (Deploy Portfolio workflow) |
| Format | GitHub Actions workflow YAML (implicit schema) |
| Surface | `workflow` |
| Location | `.github/workflows/deploy.yml:1-83` |
| Versioning | none (no `version:` field; GH Actions schema is server-authored) |
| Schema dialect | GitHub Actions workflow YAML |
| Protocol version | n/a |
| Advertised capabilities | 3 jobs: `quality` (Code Quality), `build` (Build Site, needs: quality), `deploy` (Deploy to GitHub Pages, needs: build); triggers `push:[main]`, `pull_request:[main]`, `workflow_dispatch`; concurrency `group: pages, cancel-in-progress: true`; environment `github-pages` for deploy |
| Auth scheme | `permissions: contents:read + pages:write + id-token:write` (job-level inherited from workflow root L10-13) |
| Producers | operator (`Ask first` per `AGENTS.md:101`); 4 build-system files protected as peers |
| Consumers | GitHub Actions runner; GitHub Pages CDN |
| Validation | GitHub's own YAML validator + Actions runtime |
| Compatibility policy | none declared |
| Flags | `runtime-provenance-missing` (no SLSA attestation; GH Pages embeds run metadata in deployment record but no in-repo provenance manifest) |
| Citations | `.github/workflows/deploy.yml:1-83` |

### 2.4 Third-party GitHub Actions versions (supply-chain contract — AAF-VGH-010)

| Field | Value |
|---|---|
| Name | external action references in `deploy.yml` |
| Format | `ad-hoc` (`<owner>/<repo>@<ref>` GH Actions syntax) |
| Surface | `provenance-build-source` |
| Location | `.github/workflows/deploy.yml` |
| Versioning | major-version tag only — `@v4` / `@v3` |
| Schema dialect | GH Actions `uses:` syntax |
| Protocol version | n/a |
| Producers | external action authors (`actions/*` org) |
| Consumers | `quality` (E-06), `build` (E-07), `deploy` (E-08) |
| Validation | none in-repo |
| Compatibility policy | implicit "trust the action authors" |
| Flags | `version-drift` (action major-version tags are mutable refs; not SHA-pinned); `runtime-provenance-missing` |
| Citations | `.github/workflows/deploy.yml:25` (checkout@v4), `:28` (setup-node@v4), `:48` (checkout@v4), `:51` (setup-node@v4), `:64` (configure-pages@v4), `:68` (upload-pages-artifact@v3), `:83` (deploy-pages@v4) |

**Pinned actions (5):**

| Action | Pin | Job(s) | Hardening recommendation |
|---|---|---|---|
| `actions/checkout` | `@v4` | quality, build | SHA-pin (`@<40-hex>`) since deploy elevates id-token:write |
| `actions/setup-node` | `@v4` | quality, build | SHA-pin |
| `actions/configure-pages` | `@v4` | build (PR-gated) | SHA-pin |
| `actions/upload-pages-artifact` | `@v3` | build (PR-gated) | SHA-pin |
| `actions/deploy-pages` | `@v4` | deploy (elevated) | SHA-pin **highest priority** |

**AAF-VGH-010 RESOLUTION:** confirmed. All 5 actions are major-tag-pinned, none are SHA-pinned. The `deploy` action runs with `pages:write` + `id-token:write`. Phase 6 records the principal-level authority; Phase 10 will propose a SHA-pin remediation. This is a real supply-chain gap. (Cross-repo synthesis: meta-inventory's AAF-006 / new-direction-2026 also have similar action-pinning gaps if they run Actions; not applicable to planning-summer-2026 which is markdown-only.)

### 2.5 `.claude/settings.json` permissions matrix

| Field | Value |
|---|---|
| Name | `.claude/settings.json permissions` (allow + deny lists) |
| Format | `json-schema` (Claude Code permissions JSON schema, implicit) |
| Surface | `policy` |
| Location | `.claude/settings.json:2-26` |
| Versioning | none |
| Schema dialect | Claude Code permissions object schema |
| Producers | operator |
| Consumers | Claude Code CLI at agent-startup; enforced at tool-invocation time |
| Validation | Claude Code itself parses + enforces |
| Compatibility policy | none |
| Advertised capabilities | `permissions.allow` 9 entries (Bash:{npm,npx,biome,git,gh,mise,ls,cat,mkdir}); `permissions.deny` 9 entries ({Read,Write}(.env|.env.*|.envrc.local) + Write/Edit(node_modules/**|dist/**)) |
| Flags | `policy-coarse` — allow entries are wildcarded (`Bash(npm:*)` matches any npm subcommand); not a `route-without-spec` defect but a Phase 6 hardening candidate (operator could narrow to `Bash(npm:install|ci|run)`) |
| Citations | `.claude/settings.json:2-26` |

### 2.6 `.claude/settings.json` PostToolUse hook spec

| Field | Value |
|---|---|
| Name | PostToolUse hook for Write\|Edit matcher |
| Format | `json-schema` (Claude Code hook object schema, implicit) |
| Surface | `policy` |
| Location | `.claude/settings.json:27-37` |
| Versioning | none |
| Schema dialect | Claude Code hook object |
| Producers | operator |
| Consumers | Claude Code CLI at agent-startup |
| Validation | Claude Code parses + executes per hook spec |
| Advertised capabilities | matcher `Write\|Edit`; type `command`; command `bash -c '... biome format --write ... 2>/dev/null; exit 0'`; timeout 10s |
| Flags | `runtime-provenance-missing` (no logging path; silent failures per AAF-VGH-006) |
| Citations | `.claude/settings.json:27-37` |

### 2.7 Claude Code SKILL.md prompts (3) — subagent-boundary contracts

Three slash-command system prompts. Each is a `prompt` surface contract with **only frontmatter** typed (name + description). Per audit-spec §7 Phase 4 flags table, the **body** of each prompt is the subagent-boundary message contract, and it is **untyped**.

| Field | Value |
|---|---|
| Names | `fix-issue`, `review-diff`, `ship-small` |
| Format | `ad-hoc` (markdown with YAML frontmatter) |
| Surface | `prompt` + `subagent` |
| Location | `.claude/skills/{fix-issue,review-diff,ship-small}/SKILL.md` |
| Versioning | none |
| Schema dialect | Claude Code SKILL.md frontmatter (informal: `name`, `description`) |
| Producers | operator |
| Consumers | Claude Code session when operator types `/fix-issue` / `/review-diff` / `/ship-small` |
| Validation | none |
| Compatibility policy | none |
| Advertised capabilities | fix-issue: 6-step workflow (reproduce → isolate → fix → verify → visual → document); review-diff: 9-item checklist; ship-small: 6-rule discipline (1-3 commits, no drive-by refactors, plan if >5 files, etc.) |
| Flags | `subagent-boundary-untyped` (no argument schema, no return-type, no tool-allowlist scoping per skill) |
| Citations | `.claude/skills/fix-issue/SKILL.md:1-12`; `.claude/skills/review-diff/SKILL.md:1-18`; `.claude/skills/ship-small/SKILL.md:1-13` |

### 2.8 Cursor IDE rules (3) — auto-attach contracts

| Field | Value |
|---|---|
| Names | `project.mdc`, `css.mdc`, `html.mdc` |
| Format | `ad-hoc` (markdown with YAML frontmatter) |
| Surface | `prompt` |
| Location | `.cursor/rules/{project,css,html}.mdc` |
| Versioning | none |
| Schema dialect | Cursor rules frontmatter (informal: `description`, `globs`, `alwaysApply`) |
| Producers | operator |
| Consumers | Cursor IDE editor (out-of-repo) |
| Validation | none |
| Compatibility policy | none |
| Advertised capabilities | `project.mdc` `alwaysApply: true` (core project rules); `css.mdc` `globs: "assets/**/*.css"` (CSS design system); `html.mdc` `globs: "*.html, projects/*.html, experience/*.html, research/*.html"` (HTML authoring); each declares 30–60 lines of standing instructions |
| Flags | none unique to this contract; the rules **re-state** AGENTS.md content (governance duplication is recorded under §2.10 below) |
| Citations | `.cursor/rules/project.mdc:1-62`, `.cursor/rules/css.mdc:1-47`, `.cursor/rules/html.mdc:1-42` |

### 2.9 AGENTS.md — canonical project contract

| Field | Value |
|---|---|
| Name | `AGENTS.md` |
| Format | `ad-hoc` (markdown) |
| Surface | `prompt` (governance) |
| Location | `AGENTS.md:1-140` |
| Versioning | none (no version header; could be derived from git log) |
| Schema dialect | informal |
| Producers | operator |
| Consumers | Claude Code (via CLAUDE.md L3 redirect), Cursor IDE (referenced from project.mdc), human readers |
| Validation | none — convention; conflicts surface as collisions (Phase 1) |
| Compatibility policy | none |
| Advertised capabilities | project snapshot; setup/commands; DoD checklist; agent tooling table; workflow rules; **3-tier Always/Ask-first/Never authority taxonomy** (L86-112); design system spec; code style; triage map |
| Flags | none on its own; **paired drift with DEV_GUIDE.md** flagged separately at §2.10 |
| Citations | `AGENTS.md:1-140`, `CLAUDE.md:3` (precedence statement) |

### 2.10 DEV_GUIDE.md vs AGENTS.md — PARALLEL governance contracts (AAF-VGH-002 confirmed)

Two governance documents claim authority over the design system; their claims contradict on **at least 4 dimensions** (per Phase 1 Collision 1). Per audit spec §7 Phase 4 (`producer-consumer-drift` flag), this is **two contracts**, not one with internal drift.

| Field | AGENTS.md | DEV_GUIDE.md |
|---|---|---|
| **Spacing scale** | rem-based `--space-1` to `--space-5` (`AGENTS.md:116`) | 8-point grid `--space-xs` (4px) to `--space-2xl` (64px) (`DEV_GUIDE.md:15-18`) |
| **Typography** | system sans-serif `--font` only; no web fonts; `--mono` for code (`AGENTS.md:118`) | Serif Georgia for body, sans-serif for headings, 14px base × 1.25 ratio (`DEV_GUIDE.md:20-24`) |
| **Layout max-width** | `--measure` = 72ch (`AGENTS.md:119`) | 1200px container (`DEV_GUIDE.md:34`) |
| **Stylesheet path** | `assets/jeffrey.css` (`AGENTS.md:20,94`) | `assets/styles.css` (`DEV_GUIDE.md:52,118`) |
| **Colors** | `--accent` = hsl(212 85% 45%) blue; `--accent-2` = hsl(160 55% 35%) green (`AGENTS.md:117`) | Lapis blue #4C70A0; gold hover #D4AF37 (`DEV_GUIDE.md:26-31`) |
| **File organization** | flat: index, cv, contact, projects/, experience/, research/ (`AGENTS.md:12-28`) | tree includes `research/maat.html`, `research/scopecam.html`, `academic/`, legacy `maat/`, `scopecam/` directories that DO NOT exist in this repo (`DEV_GUIDE.md:43-58`) |

**Field** | **Value**
---|---
Names | `AGENTS.md` (current) ↔ `DEV_GUIDE.md` (stale)
Surface | `prompt`
Versioning | none for either
Producers | operator
Consumers | external agents that may discover either file (Claude Code prefers AGENTS.md via CLAUDE.md L3 precedence; nothing prevents an agent or human from reading DEV_GUIDE.md as authoritative)
Validation | none
Flags | **`producer-consumer-drift`** (active drift between parallel governance contracts, with no in-repo retirement notice on the stale one)
Citations | per the table above

**AAF-VGH-002 RESOLUTION:** confirmed. Remediation choices for Phase 10: (a) delete `DEV_GUIDE.md`, (b) replace it with a stub that redirects to AGENTS.md, (c) supersede with a dated note inside DEV_GUIDE.md, (d) merge accurate content (e.g., the deployment section is mostly correct) into AGENTS.md and delete the rest. Phase 4 does not decide.

### 2.11 THEMES.md — multi-theme switching contract (AAF-VGH-012 confirmed)

| Field | Value |
|---|---|
| Name | `THEMES.md` |
| Format | `ad-hoc` (markdown) |
| Surface | `prompt` (capability documentation) |
| Location | `THEMES.md:1-128` |
| Advertised capability | "site supports multiple visual themes" (L3); 2 themes named (jeffrey.css, styles-academic.css); switch script at L48 uses `sed -i '' 's/styles-academic\.css/jeffrey.css/g'`; the reverse direction at L51 |
| Producers | operator |
| Consumers | operator-facing docs; potentially confused by an agent that takes the document at face value |
| Validation | none |
| **Reality check** | `assets/styles-academic.css` **does not exist** (verified at HEAD via Glob); the actual file is at `experiments/themes/academic.css` — a different path under a different bounded context. The sed-script in the doc would silently no-op (zero substitutions) because nothing references `styles-academic.css` in any HTML file. No HTML file currently links anything other than `jeffrey.css`. |
| Flags | `producer-consumer-drift` (advertised capability vs. on-disk reality); `route-without-spec` (the "Quick Switch" capability is undocumented as not-implemented) |
| Citations | `THEMES.md:25,48,51,58-62,124-127`; `experiments/themes/academic.css` (actual location, verified); `assets/jeffrey.css` (the only stylesheet that actually exists in `assets/`) |

**AAF-VGH-012 RESOLUTION:** confirmed. The multi-theme switching is an overstated capability. Remediation candidates for Phase 10: (a) retire the multi-theme claim from THEMES.md (keep it as a single-theme philosophy doc), (b) move `experiments/themes/academic.css` → `assets/styles-academic.css` and add an HTML-level switcher; (c) document the current as-is (manual hand-edit, with a flag that the file path is currently incorrect).

### 2.12 CNAME custom-domain contract

| Field | Value |
|---|---|
| Name | `CNAME` |
| Format | `ad-hoc` (plain text, 1 line) |
| Surface | `config` |
| Location | `CNAME:1` |
| Versioning | none |
| Producer | operator (committed in `daea00d` per Phase 0 §1) |
| Consumer | GitHub Pages (reads `CNAME` from the deployed artifact on each deploy) |
| Validation | GitHub Pages validates DNS resolution to its IPs externally; not in-repo |
| Advertised capability | custom apex domain `jvjohnson.dev` |
| Compatibility policy | none in-repo; depends on operator-controlled DNS at registrar level |
| Flags | `callback-auth-missing` is **not** the right flag here; **`runtime-provenance-missing`** is not right either; this is a `build-source-provenance-position-missing` candidate (the operator-controlled DNS at the registrar is the secondary credential). Recorded as a **build-source-provenance** position consideration for Phase 6 / Phase 9. |
| Citations | `CNAME:1`; `infrastructure.external_services[0]` in profile |

### 2.13 HTML5 page URL contract (11 pages — bookmarkable URLs)

| Field | Value |
|---|---|
| Name | 11 deployed page URLs at `https://jvjohnson.dev/*` |
| Format | `ad-hoc` (HTML5 living standard + file-system routing per GitHub Pages convention) |
| Surface | `http` |
| Location | the file paths registered at `vite.config.js:23-37` |
| Versioning | none — URL stability is a **convention** at `AGENTS.md:111` "Never break existing page URLs (they may be bookmarked or linked externally)" and at `.claude/skills/ship-small/SKILL.md:11` "Keep public URLs stable" |
| Producer | operator |
| Consumer | the public internet (browsers, bookmarks, external links) |
| Validation | none — there is no URL-stability test or redirect manifest |
| Compatibility policy | "never break"; no redirect file declared (no `_redirects` for GH Pages, no 404-handler beyond GH Pages default) |
| Flags | `route-without-spec` (the URL set is only implied by the input map; no canonical URL list with stability annotation) |
| Citations | `AGENTS.md:111`, `.claude/skills/ship-small/SKILL.md:11`, `vite.config.js:22-37` |

### 2.14 HTML5 page element contracts (`<title>`, `<meta>`, `<link rel>`, `<a href>`)

Each deployed HTML page exposes a per-page element contract. These are inventoried collectively here (full per-page detail is in `01-vocabulary.json` §2.1 and is not re-listed):

| Field | Value |
|---|---|
| Name | per-page `<title>`, `<meta>` viewport/charset/description, `<link rel="stylesheet" href="/assets/jeffrey.css">`, `<link rel="icon" href="/assets/icons/maat_feather_16.svg">`, internal `<a>` links to other pages, external `<a rel="noopener noreferrer">` links |
| Format | HTML5 living standard |
| Surface | `http` (subset: meta/link/anchor elements) |
| Producer | operator |
| Consumer | browsers (SEO crawlers, accessibility tools, link checkers — none of which run in-repo) |
| Validation | none in-repo (no html-validator step in CI; no link-checker) |
| Flags | `config-without-validation` (the rules at `.cursor/rules/html.mdc:21-23` for ARIA/`rel="noopener noreferrer"` are conventional, not machine-enforced) |
| Citations | `.cursor/rules/html.mdc:21-23`, page-by-page surveys from Phase 1 §2.1 |

### 2.15 CSS custom-properties contract (the design tokens)

| Field | Value |
|---|---|
| Name | the 14 CSS custom properties exposed by `assets/jeffrey.css` |
| Format | `ad-hoc` (CSS `:root` declarations) |
| Surface | `config` (consumed by every HTML page's stylesheet load) |
| Location | `assets/jeffrey.css` (not opened in full per Phase 0 §4.2 boundary; the property names are listed in `01-vocabulary.json` §2.4: `--ink, --paper, --muted, --accent, --accent-2, --border, --shadow, --shadow-hard, --radius, --radius-sm, --measure, --font, --mono, --space-1..--space-5`) |
| Versioning | none |
| Producer | operator |
| Consumer | every CSS declaration in `assets/jeffrey.css` itself; every `<style>` would consume them too (but `<style>` is forbidden per `AGENTS.md:94` and `.cursor/rules/html.mdc:27`) |
| Validation | Biome catches some misuses; no test asserts the property set matches the AGENTS.md/`css.mdc` documented set |
| Flags | none — this is the **tightest contract** in the repo by convention (single-source + 3 governance docs cross-reference). Per Phase 1 Collision 4 (DEV_GUIDE.md disagrees on the values), drift is recorded against the DEV_GUIDE.md contract, not this one. |
| Citations | `.cursor/rules/css.mdc:14-46`, `AGENTS.md:116-120`, `01-vocabulary.json` §2.4 |

### 2.16 `.mise.toml` task contract

| Field | Value |
|---|---|
| Name | `.mise.toml` task definitions + Node 24 tool pin |
| Format | TOML (implicit schema) |
| Surface | `config` |
| Location | `.mise.toml:1-42` |
| Versioning | none |
| Schema dialect | mise TOML schema (implicit) |
| Producer | operator |
| Consumers | local `mise run <task>`; documented in `AGENTS.md:32-44` and `.cursor/rules/project.mdc:14-22`; some tasks (notably `ci`) referenced from SKILL.md skills (E-09/E-11) |
| Validation | mise parses + executes |
| Advertised capabilities | `[tools] node = "24"` pin; 10 task verbs: dev, build, preview, lint, lint:fix, format, format:check, clean, deploy, ci |
| Flags | none |
| Citations | `.mise.toml:1-42` |

### 2.17 `package.json` script + dependency contract

| Field | Value |
|---|---|
| Name | `package.json` |
| Format | npm `package.json` JSON Schema |
| Surface | `config` |
| Location | `package.json:1-21` |
| Versioning | `"version": "1.0.0"` (not consumed by any tag; "private": true so unpublished) |
| Producer | operator |
| Consumers | npm CLI; CI `npm ci`; local `npm run <script>` |
| Validation | npm parses + enforces script + dep schema |
| Advertised capabilities | 7 scripts (dev/build/preview/lint/lint:fix/format/format:check/clean/deploy); 2 devDeps (@biomejs/biome ^2.3.8, vite ^5.0.0) |
| Flags | none |
| Citations | `package.json:1-21` |

### 2.18 MCP — context7 (operator-installed, not project-scoped) — AAF-VGH-009 confirmed

| Field | Value |
|---|---|
| Name | `context7` MCP server |
| Format | `mcp-manifest` (advertised externally; not present in repo) |
| Surface | `tool` (MCP tool calls: `resolve-library-id`, `query-docs`) |
| Location | **not in repo** — `.mcp.json` is absent (verified Phase 0 §4.2); context7 is installed at Claude Code global level per operator |
| Versioning | none — protocol version unpinned in-repo |
| Schema dialect | MCP (Model Context Protocol) — version not declared in-repo |
| Protocol version | unknown (operator-installed, not project-pinned) |
| Auth scheme | not declared in-repo |
| Advertised capabilities | 2 tools per CLAUDE.md L29-31: `mcp__context7__resolve-library-id`, `mcp__context7__query-docs` |
| Producers | external (context7 service) |
| Consumers | Claude Code agent sessions in this repo when the operator's global MCP config includes context7 |
| Validation | none in-repo |
| Compatibility policy | none |
| Flags | `mcp-surface-uninventoried` (declared in CLAUDE.md L27-33 but no in-repo manifest); `tool-without-schema` (the schema is whatever context7 advertises at runtime; not pinned in-repo) |
| Citations | `CLAUDE.md:27-33`, `AGENTS.md:60-61`, profile `audit_attention_flags` AAF-VGH-009 |

**AAF-VGH-009 RESOLUTION:** confirmed. context7 is documented as the repo's MCP server but no `.mcp.json` exists. The same gap is paired in sibling new-direction-2026 (AAF-NDM-008). Phase 10 candidates: (a) add a `.mcp.json` that pins the protocol/version, (b) remove the in-repo MCP declaration if it's purely operator-machine config, (c) demote the MCP table in CLAUDE.md to "operator-installed; see https://…" pointer. Phase 4 does not decide.

### 2.19 Cross-repo content-pipeline contract (consumer side) — AAF-VGH-008 / sibling AAF-NDM-012

This is the headline cross-repo contract: the sibling repo `../new-direction-2026/AGENTS.md:131-142` declares 6 source documents that should land in 6 destinations in this repo. Inventoried here on the consumer side; the **producer side** is inventoried in the sibling's audit and the cross-repo synthesis layer reconciles in Phase 10.

| # | Source (sibling repo) | Destination (this repo) | Destination present at HEAD? | Cross-content drift check (Phase 4 method) |
|---|---|---|:---:|---|
| 1 | `career-transition-ready/cv-materials/CV-COMPREHENSIVE-EXTRACT.md` | `cv.html` | ✓ | Manual hand-promotion; no automated diff. CV content in `cv.html` exists; freshness vs source is **unverified** — Phase 4 records the unverified gap, Phase 10 fitness-function candidate: cross-repo content-freshness check. |
| 2 | `career-transition-ready/website-content/PORTFOLIO-QUICK.md` | `index.html` (hero/intro) | ✓ | Hero/intro section confirmed at `index.html:40,70,97-205` per Phase 2 §2.1 citations. Freshness vs source unverified. |
| 3 | `career-transition-ready/technical-projects/ACTIVE-PROJECTS-PORTFOLIO.md` | `projects/*.html` | ✓ (6 project pages: dicee, maat, scopecam, budget-triage, flux, llm-gateway) | The 6 project pages each consume a subset of the source. Phase 0 §4.1 verified all 6 exist. Per-project freshness unverified. **Note:** `homeNetOps` from the operator's project list does not have a project page; that asymmetry (project named but not deployed) is a Phase 10 narrative-coherence consideration. |
| 4 | `career-transition-ready/research-publications/RESEARCH-PUBLICATIONS.md` | `research/` pages | ✓ (`research/index.html`) | Single research page; freshness vs source unverified. |
| 5 | `career-transition-ready/website-content/timeline-component-spec.md` | `experience/` pages | ✓ (`experience/index.html`) | Houses the braid-timeline SVG (E11 cross-context promotion from experiments-sandbox); freshness vs source unverified. |
| 6 | `career-transition-ready/teaching-portfolio/TEACHING-INVENTORY.md` | `cv.html` (teaching section) | ✓ (cv.html has 8 occurrences of "teaching" / "publications" / "research" terminology per Grep) | Teaching section embedded inside cv.html; freshness vs source unverified. |

**Field** | **Value**
---|---
Name | Cross-repo content pipeline (consumer side; producer at sibling AGENTS.md:131-142)
Format | `ad-hoc` (markdown source documents in sibling repo → HTML pages in this repo)
Surface | `file` (manually-promoted content; no event/automation)
Versioning | none on either side
Producer | sibling repo `new-direction-2026` operator (same operator, different repo)
Consumer | this repo (the 11 deployed HTML pages)
Validation | none — manual `/sync-check` in sibling per `AGENTS.md:131`; no machine check
Compatibility policy | "Rule: Verify and finalize source content here before touching the website" (sibling `AGENTS.md:142`)
Flags | `producer-consumer-drift` (no automated freshness check on either side); `content-provenance-position-missing` (no provenance link from destination back to source revision)
Citations | `../new-direction-2026/AGENTS.md:129-142` (sibling producer declaration); per-destination citations in §2.19 table

**AAF-VGH-008 ↔ sibling AAF-NDM-012 PAIRING:**

- **Consumer-side observation (this audit):** 6/6 destinations present at HEAD. No automated freshness check. No content-provenance manifest. Manual promotion via the sibling's `/sync-check` skill is the only sync mechanism.
- **Producer-side cross-reference:** the sibling's audit (driven by AAF-NDM-012) inventories the source documents and their reverse-pointers to this repo. The cross-repo synthesis layer reconciles them in Phase 10.
- **Cross-repo finding pair (placeholder for Phase 10):** F-VGH-NNN ↔ F-NDM-NNN — proposed fitness function = "site CV/projects/research/experience page must declare source-revision provenance comment (e.g., `<!-- source: new-direction-2026 @ <sha> -->`)" so that drift is visible on either side.

### 2.20 Outbound external-link contract (record-only)

| Field | Value |
|---|---|
| Name | external `<a href>` outbound links |
| Format | HTML5 anchor + `rel` attribute |
| Surface | `http` |
| Location | each of the 11 HTML pages |
| Producer | operator (per-page) |
| Consumer | the browser opening the outbound URL |
| Validation | none — no link checker in CI |
| Advertised capability | every external link **should** carry `rel="noopener noreferrer"` per `.cursor/rules/html.mdc:23` |
| Flags | `config-without-validation` (the convention is not enforced by Biome or any other tool) |
| Citations | `.cursor/rules/html.mdc:23`; per-page Grep would enumerate (not done here) |

### 2.21 CLAUDE.md → AGENTS.md precedence statement

| Field | Value |
|---|---|
| Name | CLAUDE.md precedence-of-contracts declaration |
| Format | `ad-hoc` (markdown) |
| Surface | `prompt` (governance precedence) |
| Location | `CLAUDE.md:3` "Primary project contract: @AGENTS.md" |
| Producer | operator |
| Consumer | Claude Code at session start |
| Validation | none; honored by convention |
| Advertised capability | declares which document wins when two governance docs conflict — but **does not name DEV_GUIDE.md as superseded**, so the DEV_GUIDE.md contradiction (§2.10) is not resolved by this precedence declaration alone |
| Flags | none |
| Citations | `CLAUDE.md:3` |

### 2.22 README.md license + project summary (advisory)

| Field | Value |
|---|---|
| Name | `README.md` (license + 2-project blurb) |
| Format | `ad-hoc` (markdown) |
| Surface | `file` |
| Location | `README.md:1-15` |
| Producer | operator |
| Consumer | GitHub UI; humans |
| Validation | none |
| Flags | **`producer-consumer-drift`** (per AAF-VGH-004: license claims `MIT © 2025` but audit date is 2026; mentions only 2 projects (MAAT, ScopeCam) while 6 are deployed). Stale-artifact / advisory class; carried to Phase 8. |
| Citations | `README.md:14` (MIT © 2025 — stale); `README.md:9-11` (only 2 of 6 projects named) |

---

## 3. Flag-count distribution

| Flag | Count | Contracts |
|---|---:|---|
| `config-without-validation` | 3 | §2.1 (vite input map), §2.14 (HTML element contracts), §2.20 (external-link rel) |
| `producer-consumer-drift` | 4 | §2.10 (DEV_GUIDE vs AGENTS.md), §2.11 (THEMES.md vs filesystem), §2.19 (content pipeline freshness), §2.22 (README.md stale) |
| `version-drift` | 2 | §2.1 (page-set vs filesystem), §2.4 (third-party actions @v\*) |
| `mcp-surface-uninventoried` | 1 | §2.18 (context7) |
| `tool-without-schema` | 1 | §2.18 (context7 tools unpinned) |
| `subagent-boundary-untyped` | 1 | §2.7 (3 SKILL.md skills collectively) |
| `runtime-provenance-missing` | 3 | §2.3 (deploy.yml), §2.4 (action SHA-pinning), §2.6 (PostToolUse hook logging) |
| `build-provenance-position-missing` | 1 | §2.12 (CNAME — operator-DNS as secondary credential undocumented) |
| `content-provenance-position-missing` | 1 | §2.19 (cross-repo content pipeline lacks source-revision provenance) |
| `route-without-spec` | 2 | §2.11 (THEMES.md capability), §2.13 (URL list implicit) |
| `policy-coarse` (advisory; non-spec flag) | 1 | §2.5 (Claude Code permissions allowlist wildcards) |

**Total distinct flags:** 12 distinct flag types across 22 contracts (some contracts carry multiple flags; total flag instances = 20).

---

## 4. Per-context contract counts

| Context | Contracts |
|---|---:|
| portfolio-pages | §2.12 CNAME, §2.13 URL contract, §2.14 HTML element contracts, §2.15 CSS custom-properties, §2.19 content pipeline, §2.20 outbound links = **6** |
| build-system | §2.1 vite input, §2.2 biome, §2.3 deploy.yml, §2.4 action versions, §2.16 mise, §2.17 package.json = **6** |
| agent-governance | §2.5 permissions, §2.6 PostToolUse hook, §2.7 3 SKILLs, §2.8 3 Cursor rules, §2.9 AGENTS.md, §2.10 DEV_GUIDE vs AGENTS.md parallel, §2.11 THEMES.md, §2.18 context7 MCP, §2.21 CLAUDE.md precedence, §2.22 README.md = **10** |
| experiments-sandbox | (no formal contracts produced or consumed; the sandbox is by definition contract-free per Phase 2 §2.4) = **0** |
| **Total** | **22** |

---

## 5. Cross-repo Phase 4 hints (for synthesis layer)

For the cross-repo synthesis layer reconciling AAF-VGH-008 ↔ sibling AAF-NDM-012:

1. **6/6 destinations present at HEAD** (this audit verified). Producer-side audit must verify 6/6 sources are present at HEAD with the correct relative paths.
2. **No freshness mechanism on either side.** Manual hand-promotion. The sibling's `/sync-check` skill is the only sync surface, and it lives on the producer side. Phase 10 fitness-function candidate is symmetric: both sides should record source-revision provenance in a machine-readable way.
3. **Asymmetry in project coverage:** the sibling's `ACTIVE-PROJECTS-PORTFOLIO.md` is one document covering many projects; this repo deploys 6 project pages (dicee, maat, scopecam, budget-triage, flux, llm-gateway). The operator's project portfolio also includes `homeNetOps` (referenced in vocabulary) but no `projects/homenetops.html` exists. **Cross-repo synthesis question:** is `homeNetOps` deliberately excluded from the website portfolio, or is this a destination-gap on the consumer side?
4. **MAAT vocabulary collision (AAF-VGH-001):** the favicon is `maat_feather_16.svg` (a MAAT-Framework signal embedded in the operator-positioning surface) while only 1 of 6 projects pages is `projects/maat.html`. Cross-repo synthesis question for the sibling: does the sibling's narrative balance MAAT vs the broader portfolio, or does it carry the same overweighting forward?
5. **AAF-NDM-008 ↔ AAF-VGH-009** are paired: both repos declare `context7` MCP without a `.mcp.json`; consistent finding; consistent remediation.

---

## 6. Exit check (audit spec §7 Phase 4)

- [x] No unflagged ad-hoc external contract remains (22 contracts inventoried; 20 flag instances applied; the rest are explicitly clean — biome.json, AGENTS.md, mise, package.json, Cursor rules, CSS tokens, CLAUDE.md precedence).
- [x] Every tool/action/skill has a schema reference or is flagged:
  - context7 MCP tools → flagged `mcp-surface-uninventoried` + `tool-without-schema`
  - 3 SKILL.md skills → flagged `subagent-boundary-untyped`
  - 5 third-party GH Actions → flagged `version-drift` (no SHA-pin)
- [x] Every MCP surface has its protocol object inventoried separately or a missing-contract flag (§2.18, flagged).
- [x] Every public interface has producer and consumer evidence (all 22 contracts list both, or are flagged `consumer-unknown` if not — none required that flag in this audit).
- [x] Every subagent boundary has a typed message contract or a flag (3 SKILL.md skills → flag, see §2.7).

Phase 4 exit check **passes**. Advancing to Phase 5.

---

## 7. Summary table (top-line)

| # | Contract | Surface | Versioning | Flags |
|---|---|---|---|---|
| §2.1 | Vite input map | config | none | config-without-validation, version-drift |
| §2.2 | Biome ruleset | config | schema-version | (clean) |
| §2.3 | deploy.yml pipeline | workflow | none | runtime-provenance-missing |
| §2.4 | GH Actions @v\* | provenance-build-source | tag-only | version-drift, runtime-provenance-missing |
| §2.5 | Claude permissions | policy | none | policy-coarse (advisory) |
| §2.6 | PostToolUse hook | policy | none | runtime-provenance-missing |
| §2.7 | 3 SKILL.md | prompt + subagent | none | subagent-boundary-untyped |
| §2.8 | 3 Cursor rules | prompt | none | (clean) |
| §2.9 | AGENTS.md | prompt | none | (clean) |
| §2.10 | DEV_GUIDE.md ↔ AGENTS.md | prompt | none | producer-consumer-drift |
| §2.11 | THEMES.md | prompt | none | producer-consumer-drift, route-without-spec |
| §2.12 | CNAME | config | none | build-provenance-position-missing |
| §2.13 | URL stability | http | none | route-without-spec |
| §2.14 | HTML element contracts | http | none | config-without-validation |
| §2.15 | CSS custom properties | config | none | (clean) |
| §2.16 | .mise.toml | config | none | (clean) |
| §2.17 | package.json | config | semver | (clean) |
| §2.18 | context7 MCP | tool | none | mcp-surface-uninventoried, tool-without-schema |
| §2.19 | Cross-repo pipeline | file | none | producer-consumer-drift, content-provenance-position-missing |
| §2.20 | External-link rel | http | none | config-without-validation |
| §2.21 | CLAUDE.md precedence | prompt | none | (clean) |
| §2.22 | README.md | file | none | producer-consumer-drift |
