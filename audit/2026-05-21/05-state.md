# Phase 5 — State and Memory Inventory

**Audit spec:** Agentic Architecture Audit Specification v3.1 (2026-05-08)
**Audit date:** 2026-05-22
**Audit mode:** `first-cycle`
**Repo HEAD:** `ee6c7e55331faaf55fa6bb4cde49abd9e1c96f9a`

**Routed AAFs:** none directly route here (AAF-VGH-005 closed in Phase 0; AAF-VGH-007 closed in Phase 2). Memory-classification inputs come from `infrastructure.data_stores` and `governance.memory_surfaces_detected` in the profile.

---

## 1. Method

Per audit spec §7 Phase 5. Classified every store and memory surface inside the four bounded contexts by the 24-class enum (§8.6). For each, recorded owner context, retention, deletion or reset path, write authority, read authority, invalidation trigger, lifecycle, sensitivity classification if evident, and citations. Boundaries honored:

- Did not multi-classify a store without explaining the split.
- Did not treat caches as authoritative (e.g., `node_modules/`, `dist/` are classified as `cache` / `artifact`, not as authoritative).
- Did not merge governance docs, operator settings, build artifacts into one `memory` bucket.
- Did not infer retention from deployment defaults — recorded what the repo declares, flagged the rest as "no retention policy declared".
- Did not skip the cross-repo content-source pointer as state (it is an external pointer, not a store, and is recorded as such).

This repo is a static-site project. It has **no runtime data stores**, no databases, no caches outside build tooling. The "state" surfaces are governance files, build artifacts, gitignored caches, the operator-controlled domain pointer, and the cross-repo source repository (external; reference-only).

Counted: 11 stores across 4 contexts plus 1 external pointer.

---

## 2. State / memory surfaces

### S-01 — 11 deployed HTML pages (`index.html`, `cv.html`, `contact.html`, `projects/*.html`, `experience/index.html`, `research/index.html`)

| Field | Value |
|---|---|
| Name | The 11 git-tracked HTML files registered at `vite.config.js:23-37` |
| Classification | **`authoritative-durable`** |
| Owner context | portfolio-pages |
| Retention | unbounded (git-tracked; never deleted in normal operation; URL stability protected per `AGENTS.md:111`) |
| Read authority | (a) git history (anyone with repo access); (b) public via `https://jvjohnson.dev/*` after deploy; (c) Claude Code / Cursor IDE during operator session |
| Write authority | operator only, via Claude Code (subject to permissions matrix `.claude/settings.json:2-26` deny patterns) or Cursor IDE or direct git commit |
| Invalidation trigger | none — pages persist; on edit, vite rebuild on next `mise run build` / CI |
| Deletion or reset path | git revert (only legitimate path); `AGENTS.md:111` "Never break existing page URLs" is the operator-declared constraint against deletion |
| Lifecycle | persistent; each page has its own per-page lifecycle (independent commits) |
| Sensitivity | low — public content; no PII beyond operator's chosen self-presentation; no secrets |
| Citations | `vite.config.js:22-37`; `AGENTS.md:111`; Phase 0 §4.1 verification of all 11 pages at HEAD |

### S-02 — `assets/jeffrey.css` (single stylesheet)

| Field | Value |
|---|---|
| Name | `assets/jeffrey.css` |
| Classification | **`authoritative-durable`** |
| Owner context | portfolio-pages |
| Retention | unbounded (git-tracked; never deleted) |
| Read authority | (a) every deployed HTML page via `<link rel="stylesheet">`; (b) git readers; (c) public via `https://jvjohnson.dev/assets/jeffrey-<hash>.css` after vite build hashes the filename |
| Write authority | operator only; **enforced rule** `AGENTS.md:94` "Keep all styles in `assets/jeffrey.css` (single CSS file)" and `.cursor/rules/css.mdc:9` "All styles live in `assets/jeffrey.css`. Do not create additional CSS files." |
| Invalidation trigger | content-hash in filename invalidates CDN cache automatically on build (per `vite.config.js:41` `assetFileNames: 'assets/[name]-[hash][extname]'`) |
| Deletion or reset path | git revert |
| Lifecycle | persistent; the CSS file is the design-system store (the 14 custom properties at `:root`) |
| Sensitivity | low — public content |
| Citations | `AGENTS.md:94`; `.cursor/rules/css.mdc:9`; `vite.config.js:41` |

### S-03 — `assets/menu.js` (mobile nav runtime JS)

| Field | Value |
|---|---|
| Name | `assets/menu.js` |
| Classification | **`authoritative-durable`** |
| Owner context | portfolio-pages |
| Retention | unbounded (git-tracked) |
| Read authority | every deployed HTML page (via `<script src>`); git readers; public |
| Write authority | operator only; `AGENTS.md:109`/`.cursor/rules/project.mdc:12` "Minimal JS: only `assets/menu.js` for mobile nav — ask before adding any script" |
| Invalidation trigger | content-hash filename on build |
| Deletion or reset path | git revert |
| Lifecycle | persistent |
| Sensitivity | low |
| Citations | `AGENTS.md:21,109`; `.cursor/rules/project.mdc:12`; profile `infrastructure.data_stores` |

### S-04 — `assets/icons/*.svg` (favicon + project icons)

| Field | Value |
|---|---|
| Name | `assets/icons/{maat_feather,maat_feather_16,scopecam_color,scopecam_favicon}.svg` (4 files) |
| Classification | **`authoritative-durable`** |
| Owner context | portfolio-pages |
| Retention | unbounded |
| Read authority | every deployed page (favicon); the 2 project pages using each icon; git readers |
| Write authority | operator |
| Invalidation trigger | content-hash filename on build |
| Deletion or reset path | git revert |
| Lifecycle | persistent; the `maat_feather_16.svg` favicon is referenced by all 11 deployed pages (AAF-VGH-001 vocabulary overweighting; recorded in Phase 1) |
| Sensitivity | low |
| Citations | `assets/icons/*.svg` (verified via Glob); Phase 1 §2.6 |

### S-05 — `vite.config.js` (the 11-page registry)

| Field | Value |
|---|---|
| Name | `vite.config.js` |
| Classification | **`authoritative-durable`** (it is the build-input registry, not "config" because mutations to this file are first-class architectural decisions per `AGENTS.md:100`) |
| Owner context | build-system |
| Retention | unbounded |
| Read authority | vite at build time; CI runner; operator |
| Write authority | operator (**Ask first** per `AGENTS.md:100`); enforced conventionally |
| Invalidation trigger | n/a (consumed only at build) |
| Deletion or reset path | git revert |
| Lifecycle | persistent; the 11-entry input map is the architectural ground truth for "what counts as a deployed page" |
| Sensitivity | low |
| Citations | `vite.config.js:1-61`; `AGENTS.md:100`; `.cursor/rules/project.mdc:35` |

### S-06 — `experiments/` (sandbox content; gitignored from build & lint)

| Field | Value |
|---|---|
| Name | `experiments/` directory tree (17 files per Phase 0 §4.2 and Phase 2 §2.4 inventory) |
| Classification | **`derived-durable`** (git-tracked operator authoring; but explicitly excluded from CI + build per `biome.json:4` + `vite.config.js:22-37` — they exist durably but are not part of the authoritative artifact set) |
| Owner context | experiments-sandbox |
| Retention | unbounded (git-tracked) |
| Read authority | operator; git readers (Cursor IDE; Claude Code); none of the deployed pages link to anything in `experiments/` except via the hand-promoted braid SVG (Phase 2 E11) |
| Write authority | operator; "safe to prototype freely" per `.cursor/rules/html.mdc:39-41` |
| Invalidation trigger | none |
| Deletion or reset path | git revert |
| Lifecycle | persistent but isolated; hand-promotion to portfolio-pages is the only "publish" mechanism (no automation) |
| Sensitivity | low |
| Citations | `biome.json:4`; `vite.config.js:22-37` (excluded); `.cursor/rules/html.mdc:39-41`; `AGENTS.md:23,139` |

**Sub-note:** the file `experiments/themes/academic.css` is the misplaced theme referenced by THEMES.md (AAF-VGH-012 / Phase 1 Collision 8). It is part of S-06 as a sandbox artifact; THEMES.md's reference to `assets/styles-academic.css` is a documentation drift, not a state issue.

### S-07 — `.claude/settings.json` (project-scoped Claude Code permissions + PostToolUse hook)

| Field | Value |
|---|---|
| Name | `.claude/settings.json` |
| Classification | **`operator-rules-memory`** |
| Owner context | agent-governance |
| Retention | unbounded (git-tracked) |
| Read authority | Claude Code CLI at session start (project-scoped) |
| Write authority | operator (the operator decides what Claude Code may do in this repo); Claude Code itself **must not** write this file (no such rule declared, but the file's purpose is to constrain Claude Code, not be edited by it) |
| Invalidation trigger | session restart by Claude Code re-reads on next start |
| Deletion or reset path | git revert |
| Lifecycle | persistent; revisions to permissions or the PostToolUse hook are governance decisions (the file is in the agent-governance authoritative-store set per Phase 2 §2.3) |
| Sensitivity | low (no secrets; declares paths only) |
| Citations | `.claude/settings.json:1-39`; profile `governance.memory_surfaces_detected[0]` |

### S-08 — `.claude/settings.local.json` (gitignored operator overrides)

| Field | Value |
|---|---|
| Name | `.claude/settings.local.json` (gitignored; 125 bytes per Phase 0 §4.1) |
| Classification | **`operator-rules-memory`** |
| Owner context | agent-governance |
| Retention | unbounded (in operator's working copy; gitignored) |
| Read authority | Claude Code CLI at session start |
| Write authority | operator (locally); per `AGENTS.md` denylist for `.env*` is not the same path; this file is allowed in the operator's working copy |
| Invalidation trigger | session restart re-reads |
| Deletion or reset path | operator deletes locally; **AUDITOR HAS NO VISIBILITY** (gitignored; not in scope per Phase 0 §3) |
| Lifecycle | persistent in operator's copy; never committed |
| Sensitivity | possibly higher than `.claude/settings.json` (may contain operator-specific allowlists or local overrides) |
| Flag | `owner-known-but-content-unknown` (gitignored; auditor cannot inspect content) — recorded so Phase 6/Phase 10 know this surface exists but is opaque to audit |
| Citations | Phase 0 §4.1 (file exists with 125 bytes); `.gitignore` |

### S-09 — 8 governance markdown files in `agent-governance`

| File | Classification | Notes |
|---|---|---|
| `AGENTS.md` | **`prompt-policy-config`** | canonical; consumed by external agents at session start; per Phase 2 |
| `CLAUDE.md` | **`prompt-policy-config`** | Claude-Code-specific shim with precedence statement |
| `DEV_GUIDE.md` | **`prompt-policy-config`** (with `producer-consumer-drift` flag from Phase 4 §2.10) | stale; in same cluster but contradicts |
| `THEMES.md` | **`prompt-policy-config`** (with overstated-capability flag from Phase 4 §2.11) | documentation of a capability that doesn't fully exist |
| `README.md` | **`prompt-policy-config`** (with stale-content flag from Phase 4 §2.22 / AAF-VGH-004) | GitHub-UI-facing; mostly advisory |
| `.claude/skills/{fix-issue,review-diff,ship-small}/SKILL.md` | **`prompt-policy-config`** | 3 slash-command system prompts |
| `.cursor/rules/{project,css,html}.mdc` | **`prompt-policy-config`** | 3 IDE-auto-attach rules |

**Field** | **Value (collective for the 11 governance files)**
---|---
Classification | **`prompt-policy-config`**
Owner context | agent-governance
Retention | unbounded (git-tracked)
Read authority | external agents (Claude Code, Cursor IDE) at session start; human readers
Write authority | operator only
Invalidation trigger | session restart re-reads
Deletion or reset path | git revert (with the operator-declared intent that AGENTS.md is canonical)
Lifecycle | persistent; the AGENTS.md / CLAUDE.md precedence is in-repo; the DEV_GUIDE.md drift is unmanaged
Sensitivity | low
Flag | `prompt-args-without-schema` is NOT the right Phase 4 flag (these are not parameterized prompts); they are policy texts. The Phase 4 flags listed in the contract entries (C-10, C-11, C-22) apply.
Citations | per the table above; full content cited in Phase 4 contract entries

### S-10 — `CNAME` (custom apex domain pointer)

| Field | Value |
|---|---|
| Name | `CNAME` file (1 line: `jvjohnson.dev`) |
| Classification | **`prompt-policy-config`** with a build-source-provenance flavor — **recorded explicitly as `prompt-policy-config`** for the §8.6 enum because (a) it is consumed by an external system (GitHub Pages) at build/deploy time as a directive, and (b) it represents an operator decision encoded as a file. Considered `operator-rules-memory` and rejected (it is not a memory of operator's preferences; it is a binding configuration for an external system). Considered `authoritative-durable` and rejected (the file is a pointer, not the artifact itself). The classification reflects "the file is the configuration that the external CDN reads, with operator authority over its content." |
| Owner context | portfolio-pages / build-system (boundary case; the CNAME affects portfolio-pages serving but is part of the build-system's deploy contract) |
| Retention | unbounded |
| Read authority | GitHub Pages CDN on each deploy; git readers |
| Write authority | operator |
| Invalidation trigger | next deploy re-reads |
| Deletion or reset path | git revert (would cause GitHub Pages to revert to default `<account>.github.io` URL) |
| Lifecycle | persistent; coupled to operator-controlled registrar DNS (out-of-repo) — recorded under Phase 4 §2.12 as `build-provenance-position-missing` because the operator-DNS secondary credential is undocumented in-repo |
| Sensitivity | low (the domain is public) |
| Citations | `CNAME:1`; `infrastructure.external_services[0]`; Phase 0 §1 (CNAME-verification) |

### S-11 — `dist/` (vite build artifact; gitignored)

| Field | Value |
|---|---|
| Name | `dist/` |
| Classification | **`artifact`** |
| Owner context | build-system |
| Retention | per-build (deleted by `mise run clean`; written fresh by every `vite build`) |
| Read authority | local preview (`mise run preview`); CI `actions/upload-pages-artifact@v3` |
| Write authority | vite (during `mise run build` / CI E-07) |
| Invalidation trigger | every build overwrites |
| Deletion or reset path | `mise run clean` (`rm -rf dist node_modules`); `.claude/settings.json:22` deny `Write(**/dist/**)` and L24 `Edit(**/dist/**)` prevent agent writes |
| Lifecycle | ephemeral by design; rebuilt each CI run |
| Sensitivity | low (same content as deployed site) |
| Citations | `vite.config.js:10`; `.claude/settings.json:22-24`; `.gitignore` (dist gitignored) |

### S-12 — `node_modules/` (npm dependency cache; gitignored)

| Field | Value |
|---|---|
| Name | `node_modules/` |
| Classification | **`cache`** |
| Owner context | build-system |
| Retention | until `mise run clean` or `npm ci` re-installs |
| Read authority | npm/npx/vite/biome at runtime |
| Write authority | npm (`npm install`, `npm ci`); `.claude/settings.json:21,23` denies Write/Edit by Claude Code |
| Invalidation trigger | `package.json` / `package-lock.json` change → `npm ci` rebuilds |
| Deletion or reset path | `mise run clean` (`rm -rf dist node_modules`) |
| Lifecycle | derived from `package-lock.json`; deterministic for any given lockfile |
| Sensitivity | low |
| Citations | `.claude/settings.json:21,23`; `.gitignore`; `package.json:14` (`clean` script) |

### S-EXT — `../new-direction-2026/career-transition-ready/` (external content source)

| Field | Value |
|---|---|
| Name | sibling repo content directory: 6 source documents per the producer-side declaration |
| Classification | **n/a (external pointer, not a store in this repo)** — recorded explicitly to honor the spec boundary "do not skip retrieval corpora" (it isn't a retrieval corpus either; it is a manual content-source pointer) |
| Owner context | portfolio-pages (consumer side); the actual store lives in the sibling repo |
| Retention | unbounded in the sibling repo (out-of-repo state) |
| Read authority | operator; manual hand-promotion via `/sync-check` skill in sibling |
| Write authority | operator (in the sibling repo, not here) |
| Invalidation trigger | when the sibling's source document changes, the destination page in this repo becomes stale until manually re-promoted (no automated propagation; see C-19) |
| Deletion or reset path | n/a from this repo |
| Lifecycle | external; lifecycle managed in sibling repo |
| Sensitivity | low |
| Flag | `content-provenance-position-missing` (per Phase 4 §2.19); pairs with sibling AAF-NDM-012 |
| Citations | `../new-direction-2026/AGENTS.md:131-142`; Phase 4 §2.19; Phase 2 E10 |

---

## 3. Class distribution

| Classification | Count | Stores |
|---|---:|---|
| `authoritative-durable` | 4 | S-01 (11 HTML pages), S-02 (jeffrey.css), S-03 (menu.js), S-04 (icons), S-05 (vite.config.js) — **5 actually** (let me re-count below) |
| `derived-durable` | 1 | S-06 (`experiments/`) |
| `operator-rules-memory` | 2 | S-07 (.claude/settings.json), S-08 (.claude/settings.local.json) |
| `prompt-policy-config` | 2 entries (one collective + CNAME) | S-09 (governance files), S-10 (CNAME) |
| `artifact` | 1 | S-11 (`dist/`) |
| `cache` | 1 | S-12 (`node_modules/`) |
| (external pointer; not classified) | 1 | S-EXT |
| **Total in-repo stores** | **11** | (5 authoritative-durable + 1 derived-durable + 2 operator-rules-memory + 2 prompt-policy-config + 1 artifact + 1 cache) — plus the gitignored S-08 we cannot inspect |

**Recount of `authoritative-durable`:** S-01 (11 HTML pages), S-02 (jeffrey.css), S-03 (menu.js), S-04 (icons), S-05 (vite.config.js). **5 entries.**

**Final distribution:**

| Classification | Count |
|---|---:|
| `authoritative-durable` | 5 |
| `derived-durable` | 1 |
| `operator-rules-memory` | 2 |
| `prompt-policy-config` | 2 |
| `artifact` | 1 |
| `cache` | 1 |
| **TOTAL** | **12** |
| (external pointer recorded but not classified) | 1 |

---

## 4. Per-context store counts

| Context | Stores |
|---|---:|
| portfolio-pages | S-01, S-02, S-03, S-04, S-10 (CNAME shared with build-system) = **5** (CNAME counted half) |
| build-system | S-05, S-10 (shared), S-11, S-12 = **4** |
| agent-governance | S-07, S-08, S-09 (collective: 8 governance files) = **3** (or 10 if S-09 is exploded into its 8 constituent files) |
| experiments-sandbox | S-06 = **1** |

The S-10 CNAME boundary-case is documented under S-10 itself; for accounting it's recorded under portfolio-pages primarily because the operator-purpose is the deployed site's URL. Build-system reads it during deploy.

---

## 5. CNAME classification — explicit decision

The directive asked: "CNAME (operator-rules-memory or build-source-provenance — classify carefully)."

**Decision:** `prompt-policy-config`.

**Reasoning:** the §8.6 enum has no `build-source-provenance` class — that is a Phase 4 contract flag (`build-provenance-position-missing` per §8.5), not a Phase 5 store class. The remaining choices were:

- `operator-rules-memory` (rejected) — CNAME does not encode operator's persistent preferences for an agent; it is a binding configuration for an external system (GitHub Pages CDN).
- `authoritative-durable` (rejected) — CNAME is not the authoritative artifact for any consumer; it is a *pointer* that an external system reads. The authoritative artifact is the resolved DNS+TLS surface at the operator's registrar + GitHub's Anycast IPs.
- `prompt-policy-config` (chosen) — CNAME is a *policy-config file* whose content is a directive for an external consumer. It fits the spec's intent for "policy-config" as "a configuration that drives behavior at a boundary" rather than "memory of preferences" or "the artifact itself".

The associated authority concern (operator-controlled DNS at registrar is the secondary credential that makes the CDN-cert handshake work) is recorded in Phase 4 §2.12 as `build-provenance-position-missing` (a contract flag, per the spec).

---

## 6. README.md (MIT © 2025) — explicit decision

The directive asked about README's "MIT © 2025 (stale-artifact / advisory)."

**Decision:** classified as **`prompt-policy-config`** (under S-09 governance cluster) with a Phase 4 `producer-consumer-drift` flag at Phase 4 §2.22 / C-22 / AAF-VGH-004 (stale year + incomplete project list).

**Reasoning:** README is not the artifact itself, not a cache, not operator memory; it is a public-facing policy-and-summary document with a license declaration. The "stale" property is a content-freshness gap (Phase 4 flag), not a state-classification issue. Carried to Phase 8 for narrative-coherence.

---

## 7. Authority crossings touching state surfaces

(Forwarded to Phase 6; recorded here as triggers for Phase 6 inputs)

| Crossing | Caller → Callee | Stores touched |
|---|---|---|
| Operator → Claude Code session | Claude Code reads governance files (S-09) + permissions matrix (S-07) at session start | S-07, S-09 |
| Claude Code agent → filesystem write | Subject to permissions matrix (S-07) deny list (S-11 dist/, S-12 node_modules/) and allow list | S-01..S-05 writable; S-08 conditionally; S-11+S-12 denied |
| PostToolUse hook → filesystem write | E-12 fires on every Write/Edit; writes back to S-01..S-05 via biome format --write; AAF-VGH-006 silent errors | S-01..S-05 (`.js/.json/.css` subset) |
| GitHub Actions deploy job → GitHub Pages CDN | E-08 with id-token:write + pages:write authority writes `dist/` (S-11) to the external CDN | S-11 read; external write (out-of-scope state) |
| Operator → sibling repo `/sync-check` | Manual hand-promotion of content S-EXT → S-01 | S-EXT → S-01 |

---

## 8. Exit check (audit spec §7 Phase 5)

- [x] Every store has an owner or an `owner-unknown` flag. All 12 in-repo stores have an owner_context; S-EXT is external (owner = sibling repo's operator, same person).
- [x] Every writable store has write-authority evidence:
  - S-01..S-06 (operator only, with conventional or matrix-enforced rules)
  - S-07/S-08 (operator only)
  - S-09 (operator only)
  - S-10 (operator only)
  - S-11 (vite during build; agent writes denied at .claude/settings.json:22)
  - S-12 (npm only; agent writes denied at .claude/settings.json:21,23)
- [x] Every memory surface is classified by purpose, durability, owner, and deletion/reset semantics. CNAME classification explained in §5; README classification explained in §6.
- [x] Did not multi-classify without explanation (the only boundary case, S-10 CNAME, has an explicit §5 decision; S-09 is treated as a collective of homogeneous prompt-policy-config files).
- [x] Did not infer retention from defaults (retention noted as "unbounded — git-tracked" where applicable; declared "ephemeral" only where the tool's default explicitly says so — `dist/`, `node_modules/`).
- [x] Did not merge governance docs / build artifacts / caches into one bucket (S-07/S-08 vs S-09 vs S-11 vs S-12 are kept distinct).
- [x] Did not skip the cross-repo content-source pointer (recorded as S-EXT with explicit non-classification reason).

Phase 5 exit check **passes**.

---

## 9. Summary table

| # | Store | Classification | Owner | Retention | Write authority |
|---|---|---|---|---|---|
| S-01 | 11 HTML pages | authoritative-durable | portfolio-pages | unbounded | operator (subject to URL-stability) |
| S-02 | assets/jeffrey.css | authoritative-durable | portfolio-pages | unbounded | operator (single-source rule) |
| S-03 | assets/menu.js | authoritative-durable | portfolio-pages | unbounded | operator (Ask before adding JS) |
| S-04 | assets/icons/\*.svg | authoritative-durable | portfolio-pages | unbounded | operator |
| S-05 | vite.config.js | authoritative-durable | build-system | unbounded | operator (Ask-first) |
| S-06 | experiments/ | derived-durable | experiments-sandbox | unbounded | operator (relaxed) |
| S-07 | .claude/settings.json | operator-rules-memory | agent-governance | unbounded | operator |
| S-08 | .claude/settings.local.json | operator-rules-memory | agent-governance | unbounded (local) | operator (gitignored — opaque) |
| S-09 | 8 governance markdown files | prompt-policy-config (collective) | agent-governance | unbounded | operator |
| S-10 | CNAME | prompt-policy-config | portfolio-pages / build-system | unbounded | operator |
| S-11 | dist/ | artifact | build-system | per-build | vite (agent denied) |
| S-12 | node_modules/ | cache | build-system | per-install | npm (agent denied) |
| S-EXT | sibling repo content | (external; not classified) | (sibling) | (out of scope) | (out of scope) |
