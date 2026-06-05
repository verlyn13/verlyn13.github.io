# Phase 3 — Runtime Map

**Audit spec:** Agentic Architecture Audit Specification v3.1 (2026-05-08)
**Audit date:** 2026-05-22
**Audit mode:** `first-cycle`
**Repo HEAD:** `ee6c7e55331faaf55fa6bb4cde49abd9e1c96f9a`

**Routed AAFs touching runtime:** AAF-VGH-006 (PostToolUse hook silenced errors); AAF-VGH-010 (action versions — supply chain into Phase 6); AAF-VGH-011 (deploy.yml PR-time gates declared-vs-enforced).
**Bounded contexts referenced:** all 4 (portfolio-pages, build-system, agent-governance, experiments-sandbox).

---

## 1. Method

Per audit spec §7 Phase 3. Enumerated every entrypoint inside the four bounded contexts, traced each chain to the first external side effect, classified `sync_model` and `execution_mode`, and noted termination/approval gates. No agent loops are present in product code (per Phase 2 §3.4 — confirmed during this phase). Boundaries declared:

- Did not assume internal entrypoints are harmless.
- Did not stop tracing at an abstraction boundary if side effects continue downstream.
- Did not collapse the PostToolUse hook into a "config detail" — it is an event-triggered write-capable runtime entrypoint and is recorded as such.
- Did not treat the GitHub Pages CDN as a passive concern — it is the public HTTP read surface that the entire portfolio-pages context exists to feed.
- Did not infer termination from "good intent"; explicit stops, build exits, scheduler bounds, or human approvals cited.

Counted as entrypoints: 21 (5 build-time CLI + 3 GH Actions jobs + 1 PostToolUse hook + 3 slash commands + 1 dev/preview pair already counted under CLI but kept as separate dev/preview servers + 11 deployed HTTP pages treated as 1 logical HTTP read surface with 11 routes + the assets static-delivery surface + the CNAME domain resolution + 1 external-link outbound surface). For tractability the 11 HTML pages are recorded as a single HTTP-route entrypoint family (`E-HTTP-pages`) with the 11 routes itemized as sub-paths; this matches the audit-spec treatment of "HTTP routes" as a collective contract surface (§7 Phase 3 step 1).

---

## 2. Entrypoint inventory

### 2.1 Build-time CLI (operator-invoked)

| ID | Entrypoint | Context | Kind | Sync model | Execution mode | First side effect | Termination |
|---|---|---|---|---|---|---|---|
| E-01 | `mise run dev` → `npm run dev` → `vite` (port 5173) | build-system | cli | `streaming` | `streaming` | spawn dev server; HMR push to browser on file change | operator Ctrl-C; no automated bound |
| E-02 | `mise run preview` → `vite preview` (port 4173) | build-system | cli | `streaming` | `streaming` | serve `dist/` from local HTTP server | operator Ctrl-C |
| E-03 | `mise run build` → `vite build` | build-system | cli | `batch` | `batch` | write `dist/**` (11 HTML pages + chunked assets) | vite exit code; no model loop |
| E-04 | `mise run ci` → `npm run lint && npm run format:check && npm run build` | build-system | cli | `batch` | `batch` | (a) biome check exit code (b) biome format check exit code (c) vite build writes `dist/` | per-step exit code; first non-zero stops chain |
| E-05 | `mise run clean` → `rm -rf dist node_modules` | build-system | cli | `sync` | `sync` | filesystem delete of `dist/` + `node_modules/` | command exit |

**Lint/format are also operator entrypoints individually** (`mise run lint`, `mise run lint:fix`, `mise run format`, `mise run format:check`) — they are sub-tasks of `mise run ci` and are not separately listed; their side effects are bounded by biome's exit code or its `--write` filesystem mutations.

### 2.2 GitHub Actions CI/CD jobs (push/PR/workflow_dispatch triggered)

Each GH Actions job is an entrypoint per audit spec §7 Phase 3 step 1 ("schedulers, webhooks, callbacks"). Triggers per `.github/workflows/deploy.yml:3-8`: `push` to `main`, `pull_request` to `main`, `workflow_dispatch`.

| ID | Job | Context | Kind | Sync model | Execution mode | First side effect | Termination | Approval gate |
|---|---|---|---|---|---|---|---|---|
| E-06 | `quality` (Code Quality) | build-system | webhook (GH-Actions runner) | `batch` | `batch` | install deps (`npm ci`) → `npx biome check .` exit code → `npx biome format .` exit code | step exit codes; needs:none | external GitHub branch-protection rules (operator visibility limited; **AAF-VGH-011 declared-vs-enforced**) |
| E-07 | `build` (Build Site) | build-system | webhook (GH-Actions runner) | `batch` | `batch` | install deps → `npm run build` → write `dist/**` → `actions/configure-pages@v4` → `actions/upload-pages-artifact@v3` (last 2 gated on `github.event_name != 'pull_request'`) | step exit codes; `needs: quality` | runs on PR + push; deploy-prep steps PR-gated |
| E-08 | `deploy` (Deploy to GitHub Pages) | build-system | webhook (GH-Actions runner) | `event-triggered` | `event-triggered` | `actions/deploy-pages@v4` exchanges OIDC token + uploads to GitHub Pages CDN; emits `page_url` output | action exit code; `needs: build`; **gated** `if: github.event_name != 'pull_request'`; concurrency group `pages` `cancel-in-progress: true` | **`pages: write` + `id-token: write` elevated permissions** at `.github/workflows/deploy.yml:10-13` (Phase 6 authority boundary); GH environment `github-pages` (manual environment-protection rules optional, not declared in-repo) |

### 2.3 Claude Code subagent invocations (operator-issued slash commands)

| ID | Command | Context | Kind | Sync model | Execution mode | First side effect | Termination |
|---|---|---|---|---|---|---|---|
| E-09 | `/fix-issue` → invokes `.claude/skills/fix-issue/SKILL.md` | agent-governance | subagent-call | `streaming` | `streaming` (interactive Claude Code session) | reads `@AGENTS.md` triage map; may invoke any tool from the permissions allowlist (incl. `Write`, `Edit`, `Bash` for `mise run ci`); each filesystem write triggers E-12 PostToolUse hook | operator stop; `mise run ci` pass; max-tools budget; Claude Code session timeout |
| E-10 | `/ship-small` → invokes `.claude/skills/ship-small/SKILL.md` | agent-governance | subagent-call | `streaming` | `streaming` | reads task context; prefers 1–3 commits; stops & writes a plan if >5 files | operator stop; commit boundary; >5-file threshold triggers plan-mode handoff |
| E-11 | `/review-diff` → invokes `.claude/skills/review-diff/SKILL.md` | agent-governance | subagent-call | `streaming` | `streaming` | reads diff; runs through 9-item checklist (incl. `mise run ci` pass, design-system, URL stability) | checklist completion |

**Authority crossing.** Per audit-spec §7 Phase 3 step 6: each slash command invocation crosses an authority boundary from the operator-driven Claude Code session into the project-scoped permissions matrix at `.claude/settings.json:1-26` (9 allow + 9 deny). The callee authority is the project-scoped Claude Code agent constrained by that matrix. Phase 6 records principal-level scopes; this phase records the invocation.

**Subagent-boundary contract:** none typed. SKILL.md frontmatter declares only `name` + `description`. Per audit spec §7 Phase 4 flags table, this is a `subagent-boundary-untyped` contract gap recorded in `04-contracts.md`.

### 2.4 PostToolUse hook (event-triggered runtime entrypoint with side effects)

| ID | Hook | Context | Kind | Sync model | Execution mode | First side effect | Termination | Audit-attention |
|---|---|---|---|---|---|---|---|---|
| E-12 | `.claude/settings.json:27-37` PostToolUse on `Write\|Edit` matcher | agent-governance | webhook (Claude Code internal event) | `event-triggered` | `event-triggered` | `bash -c 'input=$(cat); file_path=$(echo "$input" \| jq -r ".tool_input.file_path"); case "$file_path" in *.js\|*.json\|*.css) npx biome format --write "$file_path" 2>/dev/null; esac; exit 0'` — runs after every `Write`/`Edit` tool call; if extension matches, mutates that file via biome formatter | `timeout: 10` seconds; `exit 0` unconditionally; **errors silenced via `2>/dev/null` and the unconditional `exit 0`** | **AAF-VGH-006 confirmed** — see §3.1 below |

**Classification rationale.** The hook is *not* a passive config datum. Per audit spec §7 Phase 3 step 1, hooks are entrypoints when they fire in response to events and can produce side effects. This one (a) fires on every `Write`/`Edit` event, (b) produces filesystem writes (biome's `--write` mutates the file in place), and (c) crosses an authority boundary (the Claude Code agent context is the caller; npx + biome runs as the same shell user, no separate identity). It is the only **write-capable event-triggered runtime path** in this repo outside of CI.

### 2.5 Public HTTP read surface (deployed site)

| ID | Surface | Context | Kind | Sync model | Execution mode | Side effects | Termination | Approval |
|---|---|---|---|---|---|---|---|---|
| E-HTTP-pages | 11 deployed HTML pages on GitHub Pages CDN, hosted at `https://jvjohnson.dev` (per `CNAME`) | portfolio-pages | http-route | `sync` | `sync` | **none** (read-only static delivery; no server logic; no telemetry per `AGENTS.md:112` "no tracking scripts") | per HTTP request | none required (public read) |
| E-HTTP-assets | static-asset delivery: `assets/jeffrey-[hash].css`, `assets/menu-[hash].js`, `assets/icons/*` (per `vite.config.js:41-43` `assetFileNames`) | portfolio-pages | http-route | `sync` | `sync` | none (read-only static delivery) | per HTTP request | none |

**11 deployed routes:**

| Route (production) | Source HTML | vite entry key |
|---|---|---|
| `/` (or `/index.html`) | `index.html` | `main` |
| `/cv.html` | `cv.html` | `cv` |
| `/contact.html` | `contact.html` | `contact` |
| `/projects/dicee.html` | `projects/dicee.html` | `projects-dicee` |
| `/projects/maat.html` | `projects/maat.html` | `projects-maat` |
| `/projects/scopecam.html` | `projects/scopecam.html` | `projects-scopecam` |
| `/projects/budget-triage.html` | `projects/budget-triage.html` | `projects-budget-triage` |
| `/projects/flux.html` | `projects/flux.html` | `projects-flux` |
| `/projects/llm-gateway.html` | `projects/llm-gateway.html` | `projects-llm-gateway` |
| `/experience/` (or `/experience/index.html`) | `experience/index.html` | `experience` |
| `/research/` (or `/research/index.html`) | `research/index.html` | `research` |

All 11 verified at HEAD in Phase 0 §4.1.

### 2.6 Domain-resolution dependency (operator-pinned external)

| ID | Surface | Context | Kind | Sync model | Side effect | Termination |
|---|---|---|---|---|---|---|
| E-DNS | `CNAME` file at repo root contains `jvjohnson.dev` (14 bytes) | portfolio-pages / build-system | other (config consumed by GitHub Pages) | `sync` | GitHub Pages reads `CNAME` on each deploy; serves the resulting `dist/**` at the `jvjohnson.dev` apex with an Anycast CDN + TLS cert provisioned externally | n/a (continuous read by external CDN) |

**Note:** the operator-controlled DNS at the registrar level (A/AAAA records pointing at GitHub Pages IPs, or ALIAS) is **outside-repo**. This entrypoint is the *in-repo* contribution to the routing decision.

### 2.7 External outbound link surfaces (record-only)

Each `<a href="...">` in the 11 HTML pages that points to an off-domain target is a one-way outbound network surface. Per audit-spec §7 Phase 3, these are recorded as outbound side effects of the read surface (E-HTTP-pages) but are not local entrypoints. Inventoried in Phase 4 §2.10 as a contract-element class; not enumerated here individually.

### 2.8 Experiments sandbox — local non-deployed surfaces

| ID | Entrypoint | Context | Kind | Sync model | Execution mode | Side effect | Termination |
|---|---|---|---|---|---|---|---|
| E-13 | `experiments/svg-src/build.sh` (operator-invoked locally) | experiments-sandbox | cli | `batch` | `batch` | runs `svgo` (per `svgo.config.js`) to compile `braid-timeline.src.svg` → `experiments/braid-timeline.svg`; not invoked from CI | script exit |

**No CI surface.** Per `biome.json:4` exclusion and the absence from `vite.config.js:23-37`, no experiments path is reached by `mise run ci`. Manual hand-promotion (`experiments/braid-timeline.svg` → inline SVG in `experience/index.html`) is operator-mediated and has no scheduler.

---

## 3. Side-effect tracing (procedure step 2)

For each entrypoint, the first external side effect.

| Entrypoint | First external side effect chain |
|---|---|
| E-01 dev | local TCP listen on `:5173`; serve `index.html` etc. with HMR; file-watch fires HMR push on save |
| E-02 preview | local TCP listen on `:4173`; serve `dist/` |
| E-03 build | filesystem write `dist/index.html`, `dist/cv.html`, …, `dist/assets/jeffrey-<hash>.css`, `dist/assets/menu-<hash>.js`, `dist/assets/[name]-<hash><extname>` |
| E-04 ci | step 1 biome stdout/exit; step 2 biome stdout/exit; step 3 vite writes `dist/**` |
| E-05 clean | `rm -rf dist/` + `rm -rf node_modules/` |
| E-06 quality | runner stdout (biome lint output); job exit on non-zero |
| E-07 build (CI) | runner filesystem write `dist/**`; if `github.event_name != 'pull_request'`: artifact uploaded to GH Pages staging via `actions/upload-pages-artifact@v3` |
| E-08 deploy | OIDC token exchange (id-token:write) → `actions/deploy-pages@v4` issues deploy → GitHub Pages CDN updates `https://jvjohnson.dev` (eventual ~30–60s propagation); output `page_url` set on the deployment record |
| E-09/E-10/E-11 skills | reads governance + repo files; may issue `Write`/`Edit` which fires E-12; may invoke `Bash(mise run ci)` (allowlisted); may issue `Bash(git:*)` / `Bash(gh:*)` for commit/PR — all subject to the permissions matrix at `.claude/settings.json:1-26` |
| E-12 PostToolUse hook | jq parses tool input; case-match on file extension; if `.js`/`.json`/`.css`: npx biome format --write rewrites the file's bytes; stderr silenced; exit 0 |
| E-13 svg-src/build.sh | invokes `svgo` (external; not in package.json); writes `experiments/braid-timeline.svg` |
| E-HTTP-pages / E-HTTP-assets | HTTP 200 response with static bytes from GH Pages CDN; no server-side logic; no logging declared in-repo |
| E-DNS (CNAME) | external — GitHub Pages reads on each deploy; CDN serves `jvjohnson.dev` apex |

---

## 4. Execution modes (procedure step 3)

| Mode | Entrypoints |
|---|---|
| `sync` | E-05, E-HTTP-pages, E-HTTP-assets, E-DNS |
| `streaming` | E-01, E-02, E-09, E-10, E-11 |
| `batch` | E-03, E-04, E-06, E-07, E-13 |
| `event-triggered` | E-08, E-12 |
| `scheduled` | none |
| `durable` | none |
| `background` | none |
| `paused-for-approval` | none in-repo; **AAF-VGH-011 declared-vs-enforced gap**: PR-time `quality` + `build` jobs may be required-for-merge via GitHub branch protection rules that live outside the repo. If those rules exist, they constitute a paused-for-approval gate; in-repo audit cannot confirm. Recorded as caveat. |

No agent-mediated loops are present. Per audit-spec §7 Phase 3 step 5: loops where model/planner/script output feeds back into further actions are absent in product code; the slash-command sessions (E-09/10/11) can loop on tool invocations within the Claude Code session but those loops are bounded by Claude Code's own session controls (operator stop, max-tools budget) and by the project-scoped permissions matrix — they are not project-defined loops. Confirmed: no Mermaid loop diagrams required for this audit; `03-loops/` directory intentionally omitted.

---

## 5. Approval gates (procedure step 7)

| Gate | Where | Effect |
|---|---|---|
| `pull_request` flag at `.github/workflows/deploy.yml:63,67,74` | E-07 / E-08 | PR-time CI runs `quality` + `build` (no upload-artifact, no deploy); push-to-`main` runs all three. |
| Branch-protection rules (external) | GitHub UI; **not visible in repo** | If configured, makes `quality` + `build` required-for-merge → human approval gate. Per **AAF-VGH-011**, in-repo declaration is complete; external enforcement is opaque. Recorded as `declared-vs-enforced gap` caveat. |
| GH environment `github-pages` (`.github/workflows/deploy.yml:75-77`) | E-08 deploy | Optional manual environment-protection rules (reviewers, wait timers) live in GH UI; not declared in repo. Not currently believed to be configured (per operator). |
| Claude Code permissions matrix (`.claude/settings.json:2-25`) | E-09/E-10/E-11 (and any tool-using session) | Allowlist (9) + denylist (9) is enforced by Claude Code at tool-invocation time. **Deny patterns** cover `.env*`, `**/node_modules/**`, `**/dist/**`. **Allow patterns** are coarse (`Bash(npm:*)`, `Bash(gh:*)`, `Bash(git:*)`, `Bash(mise:*)`) — no per-subcommand pinning. |
| `Ask first` taxonomy (`AGENTS.md:96-103`) | E-09/E-10/E-11 SKILL prompts | Conventional gate (read by Claude Code at session start); not machine-enforced. Covers new deps, new HTML entry points, vite.config.js changes, deploy.yml changes, design-system changes, structural nav changes. |

---

## 6. Per-context summary

| Context | Entrypoint count | Write-capable | Notes |
|---|---:|---:|---|
| portfolio-pages | 3 (E-HTTP-pages, E-HTTP-assets, E-DNS) | 0 (all read-only public HTTP) | The deployed site itself emits no side effects to disk; it is a pure read surface. |
| build-system | 8 (E-01..E-08) | 6 (E-01,02,03,04,05 local; E-07,E-08 CI; E-08 is the only one with elevated permissions) | Three CI jobs are inventoried separately; quality and build re-run on PR, deploy gated `pull_request==false`. |
| agent-governance | 4 (E-09,E-10,E-11,E-12) | 1 always (E-12); 3 conditionally (E-09/10/11 via permissions matrix) | E-12 is the only **event-triggered** entrypoint and is the AAF-VGH-006 audit-attention case. |
| experiments-sandbox | 1 (E-13) | 1 (writes to experiments/) | Operator-only; no CI invocation; manual hand-promotion only. |

---

## 7. AAF resolutions in Phase 3

### 7.1 AAF-VGH-006 — PostToolUse hook silent error handling (CONFIRMED)

`.claude/settings.json:33` runs `bash -c '… 2>/dev/null; esac; exit 0'`. Stderr is silenced and the hook unconditionally returns 0. Concrete failure modes that the operator would NOT see:

1. `npx` not available (e.g., `node_modules` missing or new shell PATH variant).
2. `biome` package not installed (e.g., post-`mise run clean` without `npm install`).
3. `biome format --write` syntax error on the target file.
4. The 10-second `timeout` expiring (large file or `npx` cold start).
5. The `jq` binary missing.

**Classification:** `event-triggered runtime entrypoint with silenced errors` — audit-attention because (a) the hook writes to source files and (b) failures are invisible. Phase 7 (observability) inherits this AAF; remediation candidate: tee stderr to `.claude/logs/posttooluse.log` and emit a non-zero exit when biome itself errors (while continuing to exit 0 when the case-match misses, which is the intended no-op branch).

### 7.2 AAF-VGH-010 — third-party action versions @v* (CARRIED to Phase 6)

The five external actions in `deploy.yml` are pinned at major-version tag only:
- `actions/checkout@v4` (L25, L48)
- `actions/setup-node@v4` (L28, L51)
- `actions/configure-pages@v4` (L64)
- `actions/upload-pages-artifact@v3` (L68)
- `actions/deploy-pages@v4` (L83)

This is not a runtime defect but a supply-chain authority concern. Recorded here as a Phase 6 input: the `deploy` job runs with `pages: write` + `id-token: write`, and the actions executing inside it are mutable references. SHA-pinning (`actions/checkout@<40-hex>`) is the typical hardening. **Carried to Phase 6 + Phase 4 supply-chain contract surface.**

### 7.3 AAF-VGH-011 — declared-vs-enforced PR gate (CARRIED to Phase 6 / SUMMARY)

In-repo declaration is complete (E-06, E-07 always run on PR). External GitHub branch-protection rules that would make these required-for-merge live outside the repo. No in-repo audit method can confirm. Recorded as a `paused-for-approval` candidate gate that the audit cannot verify; SUMMARY will carry the caveat.

---

## 8. Exit check (audit spec §7 Phase 3)

- [x] Every entrypoint has a traced chain to first external side effect (21 entrypoints; chains in §3).
- [x] Every loop has a termination condition or is flagged. **No loops exist** in product code; slash-command sessions are bounded by Claude-Code-level session controls.
- [x] Every write-capable runtime path is routed to Phase 6:
  - E-01..E-05, E-07 local + CI writes to `dist/` / `node_modules/`
  - E-08 elevated GH Pages deploy authority
  - E-09..E-11 conditional writes via permissions matrix
  - E-12 PostToolUse hook (event-triggered writes)
  - E-13 experiments local writes
- [x] Every subagent invocation has caller and callee authority recorded (E-09/E-10/E-11 caller = Claude Code operator session; callee = project-scoped permissions matrix; **subagent boundary is untyped per Phase 4**).
- [x] Every event-triggered path has lifecycle evidence: E-08 (concurrency:pages, cancel-in-progress, GH environment); E-12 (matcher Write|Edit, timeout 10s, exit 0 silently).
- [x] No agent-loop diagrams required → `03-loops/` directory not created. Decision recorded explicitly.

Phase 3 exit check **passes**. Advancing to Phase 4.

---

## 9. Summary table

| # | Entrypoint | Context | Kind | Sync model | Side effects | Approval |
|---|---|---|---|---|---|---|
| E-01 | `mise run dev` | build-system | cli | streaming | local HMR server | none |
| E-02 | `mise run preview` | build-system | cli | streaming | local preview server | none |
| E-03 | `mise run build` | build-system | cli | batch | writes `dist/**` | none |
| E-04 | `mise run ci` | build-system | cli | batch | writes `dist/**` (last step) | step exit chain |
| E-05 | `mise run clean` | build-system | cli | sync | deletes `dist/` + `node_modules/` | none |
| E-06 | CI `quality` job | build-system | webhook | batch | runner stdout / exit | external branch protection (AAF-VGH-011) |
| E-07 | CI `build` job | build-system | webhook | batch | writes `dist/`; PR-gated upload | `needs: quality`; PR gate |
| E-08 | CI `deploy` job | build-system | webhook | event-triggered | OIDC + GH Pages update | `pages:write` + `id-token:write`; PR-excluded |
| E-09 | `/fix-issue` | agent-governance | subagent-call | streaming | per Claude Code permissions | `Ask first` conventional + permissions matrix |
| E-10 | `/ship-small` | agent-governance | subagent-call | streaming | per Claude Code permissions | same |
| E-11 | `/review-diff` | agent-governance | subagent-call | streaming | per Claude Code permissions | same |
| E-12 | PostToolUse hook | agent-governance | webhook | event-triggered | rewrites `.js`/`.json`/`.css` on every Write/Edit; **silent errors** | `timeout: 10s`; **AAF-VGH-006** |
| E-13 | `experiments/svg-src/build.sh` | experiments-sandbox | cli | batch | writes `experiments/braid-timeline.svg` | none (local only) |
| E-HTTP-pages | 11 HTTP routes on `https://jvjohnson.dev` | portfolio-pages | http-route | sync | none (read-only) | public |
| E-HTTP-assets | static asset delivery | portfolio-pages | http-route | sync | none | public |
| E-DNS | CNAME → jvjohnson.dev | portfolio-pages | other | sync | GH Pages reads on deploy | n/a |
