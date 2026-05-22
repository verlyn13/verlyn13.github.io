# Phase 6 — Authority Boundaries

**Repo:** verlyn13.github.io
**Audit spec:** v3.1 (§7 Phase 6 + §8.7 + §9.7)
**Audit mode:** first-cycle
**Snapshot:** 2026-05-21 / `ee6c7e55331faaf55fa6bb4cde49abd9e1c96f9a`

**Routed AAFs:** AAF-VGH-006 (PostToolUse hook silent errors), AAF-VGH-009 (context7 MCP), AAF-VGH-010 (GH Actions @v* not @SHA-pinned).

---

## 1. Method

Per §7 Phase 6 + §9.7 completeness table. Inventoried every principal that has any read or write authority over the repo or the deployed site. For each: readable scopes, writable scopes, callable capabilities, callable subagents, callable externals, workspace roots, browser scope, filesystem scope, secrets, approval mode + precedence, bypass modes, protected paths, secondary credentials, outbound network scope, callback auth, hosted-vs-local, token delegation, sandbox model, flags. Cited Phase 3 entrypoint IDs (E-NN), Phase 4 contract IDs (C-NN), and Phase 5 store IDs (S-NN).

Boundary discipline (§7 Phase 6):

- Did not assume least privilege from narrow tool names.
- Did not infer approval policy from comments unless enforced by a policy layer.
- Did not score "approval exists" as sufficient where bypass modes / protected paths / secondary credentials / enforcement were unverified.
- Recorded supply-chain authority for 3rd-party actions separately from CI-job authority.

---

## 2. Principal inventory

11 principals total: 1 human, 1 Claude Code agent, 1 Cursor IDE, 1 PostToolUse hook (automation), 3 SKILLs (subagents), 3 GitHub Actions jobs, 5 third-party actions (inventoried in §3), 1 MCP server.

### A-01 — Operator (Jeffrey Johnson, human)

| Facet | Value |
|---|---|
| Principal class | human-operator (single human) |
| Readable scopes | unrestricted on local filesystem; full git access to remote |
| Writable scopes | unrestricted on local filesystem; remote `git@github.com:verlyn13/verlyn13.github.io.git`; **operator-controlled DNS at jvjohnson.dev registrar (out of repo)** |
| Callable capabilities | all CLI; `mise run *`; `gh CLI`; direct git push |
| Approval mode | n/a — operator IS the approver |
| Secrets access | gh CLI tokens; **GPG signing key (AGENTS.md:128)**; operator-DNS for jvjohnson.dev |
| Secondary credentials | gh CLI tokens (auth scope per `gh auth`); operator-DNS at registrar (undocumented, out of repo) |
| Outbound network scope | unrestricted |
| Hosted/local | local |
| Sandbox model | OS user perms |
| Citations | AGENTS.md:128 (GPG signing declared but not auditable from repo state); CNAME:1 (binds deployed site to jvjohnson.dev) |

**Notes:** The operator-DNS path is a secondary credential surface that cannot be audited from this repo. CNAME at repo root depends on registrar-side DNS ownership. This is a "secondary credential too broad" candidate only if the registrar account is shared; per Phase 0 evidence (single-operator project), it is recorded as a known scope rather than a flag.

### A-02 — Claude Code agent (project-scoped via .claude/settings.json)

| Facet | Value |
|---|---|
| Principal class | claude-code-agent |
| Readable scopes | filesystem under repo root EXCEPT `Read(**/.env)`, `Read(**/.env.*)`, `Read(**/.envrc.local)` |
| Writable scopes | filesystem under repo root EXCEPT `Write/Edit(**/.env*)`, `Write/Edit(**/.envrc.local)`, `Write/Edit(**/node_modules/**)`, `Write/Edit(**/dist/**)` |
| Allow list (9 patterns, Bash-only) | `Bash(npm:*)`, `Bash(npx:*)`, `Bash(biome:*)`, `Bash(git:*)`, `Bash(gh:*)`, `Bash(mise:*)`, `Bash(ls:*)`, `Bash(cat:*)`, `Bash(mkdir:*)` |
| Deny list (9 patterns) | Read+Write on `.env`, `.env.*`, `.envrc.local`; Write+Edit on `node_modules/`, `dist/` |
| Callable subagents | `/fix-issue` (A-05), `/review-diff` (A-06), `/ship-small` (A-07) |
| Callable externals | gh CLI subprocess, npm/npx subprocesses, git, biome, mise |
| Workspace roots | `/Users/verlyn13/Repos/verlyn13/verlyn13.github.io` |
| Approval mode | `allow` (Bash whitelisted patterns) / `deny` (env+build-artifact paths) / **`unknown` for non-Bash tools** |
| Approval precedence | deny overrides allow (Claude Code's deny-takes-precedence semantics); project rules override user rules |
| Bypass modes | `.claude/settings.local.json` (gitignored, 125 bytes, **content invisible to audit — S-08**); AGENTS.md "Ask first" conventions (L96-103) are conventional, **not machine-enforced** |
| Protected paths | `.env`, `.env.*`, `.envrc.local`, `node_modules/`, `dist/`, `package-lock.json` (Ask-first by AGENTS.md:108) |
| Secondary credentials | gh CLI tokens via operator session |
| Outbound network scope | unrestricted via `Bash(npm/npx/gh:*)` |
| Hosted/local | local |
| Flags | **ambient-authority** (Read/Write/Edit/Grep/Glob/Task not enumerated in allow), **approval-precedence-unclear** (non-Bash tools depend on Claude Code default UX, not project settings) |
| Citations | `.claude/settings.json:2-13` (9 Bash allow); `:14-25` (9 deny); AGENTS.md:96-103 (Ask-first conventions) |

**Ambient authority explanation:** Read/Write/Edit/Grep/Glob/Task are not listed in `permissions.allow`. Claude Code's default permission model (operator prompts per-call) governs them, not the project-scoped settings. This is auditable behavior at the tool layer, but not bounded by repo-level policy.

### A-03 — Cursor IDE (rule-attached editor agent)

| Facet | Value |
|---|---|
| Principal class | cursor-ide |
| Readable / writable scopes | filesystem under repo root (no Cursor-side deny declared in-repo) |
| Rule attachment | `project.mdc` alwaysApply:true (L1-3); `css.mdc` globs `assets/**/*.css` alwaysApply:false (L1-4); `html.mdc` globs `*.html, projects/*.html, experience/*.html, research/*.html` alwaysApply:false (L1-4) |
| Approval mode | unknown — Cursor's own (per-user, not project-scoped) |
| Bypass modes | none in-repo |
| Hosted/local | hybrid (editor local; model hosted by Cursor's backend) |
| Flags | **ambient-authority** — .cursor/rules/*.mdc are RULES, not permissions. They influence model behavior but do not enforce filesystem authority. Cursor's actual authority is determined by per-user Cursor settings that the auditor cannot inspect. |
| Citations | `.cursor/rules/project.mdc:1-3`; `css.mdc:1-4`; `html.mdc:1-4` |

### A-04 — PostToolUse hook (automation principal) — AAF-VGH-006 RESOLUTION

| Facet | Value |
|---|---|
| Principal class | automation-hook |
| Readable scopes | stdin (tool_input.file_path); jq parses JSON |
| Writable scopes | **any `*.js`, `*.json`, `*.css` path that Claude Code Write/Edit just touched, regardless of repo location**; scope is NOT restricted by the project deny-list (those apply to Claude Code's Write/Edit, not to the bash subprocess the hook spawns) |
| Callable capabilities | `bash -c '<inline script>'` → `npx biome format --write <path>` |
| Callable externals | npx, biome (via npx), jq |
| Approval mode | **auto-approved** — fires unconditionally on every Write|Edit matcher hit; no operator prompt; 10-second timeout |
| Approval precedence | post-tool — runs AFTER the Write/Edit; cannot prevent the write, only re-format the result |
| Bypass modes | delete hook from `.claude/settings.json`; or override in `.claude/settings.local.json` (S-08, gitignored) |
| Outbound network | npx may resolve+fetch packages on first run; after install, none |
| Hosted/local | local |
| Sandbox model | operator's shell environment; **no isolation, no path-prefix allowlist, no logging** |
| Flags | **ambient-authority + write-without-approval-policy + approval-not-enforced** |
| Citations | `.claude/settings.json:27-37`; cross-cite Phase 3 E-12; Phase 4 C-06 (runtime-provenance-missing) |

**AAF-VGH-006 resolution:** Confirmed. The hook silences stderr via `2>/dev/null`, exits `0` unconditionally, and times out at 10 seconds. Failure modes invisible from logs / exit code / surface telemetry:

1. `npx` not available on PATH;
2. biome missing or not installed;
3. biome parse error in file (formatter rejects, file unchanged);
4. timeout at 10s (formatter cut mid-operation);
5. `jq` missing;
6. malformed input JSON;
7. file write race with concurrent Claude Code tool calls.

**Severity in Phase 10:** moderate. File corruption from a biome parse error is recoverable (git revert). The architectural concern is the precedent: a write-capable, auto-approved, silent automation principal with no observability surface — directly cross-cited to Phase 7 §3.4 (no-runtime-action-provenance).

**FF candidates:**

- `FF-claude-code-hook-observability` — every PostToolUse hook must (1) tee stderr to `.claude/logs/posttooluse.log`, (2) propagate biome's exit code rather than masking it with `exit 0`, (3) emit a structured event line per invocation with timestamp + file_path + biome_exit_code.
- `FF-claude-code-hook-scope-declaration` — every hook must declare its filesystem-scope as part of the hook object (path-prefix allowlist enforced at hook-invocation time, not inside the inline bash).

### A-05 — SKILL `/fix-issue` (write-capable subagent via inheritance)

| Facet | Value |
|---|---|
| Principal class | skill-subagent-write-capable |
| Readable / writable scopes | inherits from A-02 — fix-issue can edit code and configs subject to permissions matrix |
| Callable capabilities | reproduce → isolate (AGENTS.md triage map) → fix (smallest change) → verify (`mise run ci`) → visual check → document |
| Approval mode | inherited from A-02 |
| Bypass modes | none own |
| Flags | **subagent-without-policy** — SKILL.md frontmatter declares name+description only; no input-schema, no output-schema, no authority manifest. Phase 4 C-07a flagged subagent-boundary-untyped; this phase records the corresponding authority-side gap. |
| Citations | `.claude/skills/fix-issue/SKILL.md:1-12` |

### A-06 — SKILL `/review-diff` (read-only checklist)

| Facet | Value |
|---|---|
| Principal class | skill-subagent-readonly |
| Readable scopes | inherits from A-02 |
| Writable scopes | **none** (read-only by content; the 9-item checklist instructs review only) |
| Callable capabilities | 9-item diff review checklist; may invoke `mise run ci` |
| Flags | **subagent-without-policy** — read-only intent expressed only in prompt prose; no machine-readable manifest declares the read-only authority |
| Citations | `.claude/skills/review-diff/SKILL.md:1-18` |

### A-07 — SKILL `/ship-small` (advisory checklist)

| Facet | Value |
|---|---|
| Principal class | skill-subagent-readonly |
| Readable scopes | inherits from A-02 |
| Writable scopes | none own |
| Callable capabilities | 6-rule discipline: 1-3 commits, no drive-by refactors, plan if >5 files, URL stability, etc. |
| Flags | **subagent-without-policy** — the URL-stability rule (L11) is a structural-finding-class invariant expressed only in prompt prose. No fitness function enforces it (carried to Phase 10 as candidate FF-url-stability-test). |
| Citations | `.claude/skills/ship-small/SKILL.md:1-13` |

### A-08 — GitHub Actions job `quality` (CI runner)

| Facet | Value |
|---|---|
| Principal class | ci-cd-job |
| Readable scopes | repo contents at the checkout SHA |
| Writable scopes | runner-local filesystem (ephemeral); no persistent write |
| Callable capabilities | actions/checkout@v4, actions/setup-node@v4, npm ci, npx biome check, npx biome format |
| Permissions | inherits workflow-root `contents:read` only (effectively; pages:write + id-token:write are unused here) |
| Approval mode | auto-approved on push:main / PR:main / workflow_dispatch |
| Approval precedence | GitHub branch-protection (if configured at org level) would override — **declared-vs-enforced gap per AAF-VGH-011** |
| Bypass modes | workflow_dispatch (manual run); force-push to main if branch protection absent |
| Secondary credentials | GITHUB_TOKEN scoped per workflow-level permissions block (contents:read for this job effectively) |
| Outbound network | npm registry + GitHub Actions infrastructure |
| Hosted/local | hosted (GitHub-hosted ubuntu-latest) |
| Sandbox model | ephemeral runner |
| Flags | (none for this job's scope; supply-chain risk inventoried separately for the 2 actions it uses) |
| Citations | deploy.yml:10-11 (workflow-root permissions); deploy.yml:20-40 (job body) |

### A-09 — GitHub Actions job `build` (CI runner; needs: quality)

| Facet | Value |
|---|---|
| Principal class | ci-cd-job |
| Readable scopes | repo contents at the checkout SHA |
| Writable scopes | runner-local filesystem (dist/ build output); **Pages artifact store via upload-pages-artifact@v3 (if !pull_request)** |
| Callable capabilities | checkout@v4, setup-node@v4, npm ci, npm run build, configure-pages@v4 (PR-excluded), upload-pages-artifact@v3 (PR-excluded) |
| Permissions | inherits workflow-root (effectively uses contents:read; the upload action uses Actions-internal artifact storage, not pages:write) |
| Approval mode | auto-approved (CI trigger); PR-excluded for upload steps |
| Approval precedence | `if: github.event_name != 'pull_request'` at L63 + L67 |
| Bypass modes | workflow_dispatch on main; force-push to main if branch protection absent |
| Citations | deploy.yml:42-70; L63,L67 (PR-exclusion guards on upload steps) |

### A-10 — GitHub Actions job `deploy` (HIGH-AUTHORITY PRINCIPAL) — explicit elevation

| Facet | Value |
|---|---|
| Principal class | ci-cd-job (elevated) |
| Readable scopes | the Pages artifact produced by A-09 |
| Writable scopes | **`https://jvjohnson.dev` (the deployed site) — full content replacement on each deploy**; GitHub Pages deployment record (deployment metadata + page_url output) |
| Callable capabilities | `actions/deploy-pages@v4` (out-of-repo action @major-tag, NOT @SHA — AAF-VGH-010) |
| Callable externals | GitHub Pages publishing service via OIDC token exchange |
| Permissions | **contents:read + pages:write + id-token:write** (workflow-root, inherited by all 3 jobs) |
| Approval mode | (1) PR-excluded via `if: github.event_name != 'pull_request'` (L74); (2) `environment: github-pages` could carry required reviewer rules but NONE DECLARED IN REPO (would live at GitHub org level); (3) `concurrency: pages` with cancel-in-progress; (4) `needs: build` |
| Approval precedence | PR-exclusion + needs:build + concurrency:pages; org-level environment rules would override but are not declared in-repo |
| Bypass modes | workflow_dispatch on main → runs deploy directly, no PR review; force-push to main if branch protection absent; operator with GitHub-org admin rights can relax environment rules |
| Protected paths | Pages artifact is auto-built by upstream; deploy doesn't checkout source |
| Secondary credentials | **OIDC token (id-token:write) — short-lived JWT minted by GitHub's identity provider, exchanged for Pages publish credentials. This is the cornerstone authority for deploying to jvjohnson.dev.** Operator-controlled DNS at the registrar (out of repo) is the second binding credential. |
| Outbound network | GitHub Pages publish endpoint (the deployed HTML thereafter served by GitHub's CDN; no in-repo outbound from this principal beyond the deploy call) |
| Callback auth | GitHub deployment status callback (deploys emit deployment_status events back to the repo — receivable but not custom-handled here) |
| Hosted/local | hosted (GitHub-hosted runner + GitHub Pages publish service) |
| Token delegation | **Token-exchange model**: id-token:write mints OIDC JWT → deploy-pages@v4 trades JWT for Pages publish authorization. Token scope: site at jvjohnson.dev only (Pages domain bound by configure-pages + CNAME). Token lifetime: short, per-workflow-run. |
| Sandbox model | GitHub-hosted ubuntu-latest; OIDC restricts the token's audience to GitHub Pages |
| Flags | **escalation** |
| Citations | deploy.yml:10-13 (workflow-root permissions); L15-17 (concurrency); L72-83 (deploy job body); cross-cite Phase 3 E-08 (event-triggered); Phase 4 C-04 (5 actions @v* not @SHA) |

**Authority elevation — explicit record per §9.7:** Workflow-root `permissions:` block at `.github/workflows/deploy.yml:10-13` grants `contents:read + pages:write + id-token:write` to **every job in the file**. Jobs `quality` and `build` do not need pages:write + id-token:write — they inherit them. The deploy action is the only consumer, but the elevation is workflow-wide.

The current configuration follows the GitHub-recommended Pages template. The §9.7 boundary declaration ("Do not score 'approval exists' as sufficient unless bypass modes, protected paths, secondary credentials, and enforcement evidence were checked") requires recording this escalation explicitly.

**AAF-VGH-010 resolution:** Confirmed at A-10 + §3 below. The 5 actions are `@major-tag-pinned`, not `@SHA-pinned`. `actions/deploy-pages@v4` is the highest priority because it receives the OIDC token and publishes to `jvjohnson.dev`. The other 4 actions are moderate-risk supply chain surfaces with the same pin pattern.

**FF candidates:**

- `FF-pin-github-actions-to-sha` — every `uses:` in `.github/workflows/*.yml` must be `@<40-hex-sha>`; comment with version tag for humans (renovate/dependabot can update + re-pin).
- `FF-per-job-actions-permissions` — workflow-root permissions tightens to `contents:read` only; deploy job declares `pages:write + id-token:write` at job-level only.

### A-11 — context7 MCP server (operator-installed; declared, not configured in-repo) — AAF-VGH-009 RESOLUTION

| Facet | Value |
|---|---|
| Principal class | mcp-server-out-of-repo |
| Readable scopes | **unknown** — not declared in-repo |
| Writable scopes | unknown (read-only by intent per CLAUDE.md L27 "Look up current docs") |
| Callable capabilities | `mcp__context7__resolve-library-id`, `mcp__context7__query-docs` |
| Callable externals | upstream context7 service (out of repo) |
| Approval mode | **unknown** — no .mcp.json in repo to declare scope or auth |
| Bypass modes | none observable from this repo |
| Secondary credentials | unknown — context7 account/API key managed at operator user level |
| Outbound network | context7 backend (out of repo) |
| Hosted/local | hybrid (MCP client local; service hosted) |
| Token delegation | unknown — operator credentials at user level; not project-scoped |
| Flags | **remote-agent-token-scope-unknown + undeclared-scope + ambient-authority** |
| Citations | CLAUDE.md:27-33 (declared); AGENTS.md:60-61 (listed); `.mcp.json` does not exist (Phase 0 verified); Phase 4 C-18 (mcp-surface-uninventoried + tool-without-schema) |

**AAF-VGH-009 resolution:** Confirmed. context7 is declared in governance docs but NOT project-scoped via `.mcp.json`. The audit cannot inspect its actual authority. Paired with sibling AAF-NDM-008 (new-direction-2026 has the same pattern across 5 declared MCPs).

**Severity in Phase 10:** low-to-moderate. context7 is read-only docs lookup by intent; the authority gap is documentation-vs-enforcement, not active risk.

**FF candidates:**

- `FF-mcp-project-scoping` — every MCP server named in CLAUDE.md or AGENTS.md must have a corresponding entry in `.mcp.json` (or explicit declaration that it is intentionally user-scoped); CI lints.
- `FF-mcp-tool-schema-recorded` — every callable MCP tool must have an in-repo schema citation so Phase 4 contract inventory can verify the surface.

---

## 3. Third-party action authority inventory (supply chain)

Per AAF-VGH-010, the 5 actions in `.github/workflows/deploy.yml` are inventoried separately because each is an authority-elevation surface in its own right. None is SHA-pinned.

| Action | Jobs | Lines | Permissions required | Authority class | Supply-chain risk | Flag |
|---|---|---|---|---|---|---|
| `actions/checkout@v4` | quality, build | 25, 48 | contents:read | code-checkout (read-only on source) | moderate (official actions/ org; @v4 not @SHA) | supply-chain-action-unpinned |
| `actions/setup-node@v4` | quality, build | 28, 51 | (none repo-scoped) | build-toolchain-install (runner-local) | moderate | supply-chain-action-unpinned |
| `actions/configure-pages@v4` | build | 64 | pages:write (workflow-root) | pages-configuration (org-side) | moderate | supply-chain-action-unpinned |
| `actions/upload-pages-artifact@v3` | build | 68 | (artifact API) | artifact-upload | moderate | supply-chain-action-unpinned |
| **`actions/deploy-pages@v4`** | **deploy** | **83** | **pages:write + id-token:write** | **PUBLISH — replaces public-site content at jvjohnson.dev via OIDC-mediated Pages publish** | **HIGH — receives the OIDC token. Compromise or breaking change in @v4's HEAD directly affects deploys.** | supply-chain-action-unpinned |

**Compounding observation:** `deploy-pages@v4` is the SINGLE action that combines (1) elevated permissions, (2) secondary credential acquisition (OIDC token exchange), (3) outbound publish authority, (4) major-tag pinning. The other 4 actions are moderate-risk only.

---

## 4. Approval gate matrix

| Gate | Principal governed | Approval mode | Precedence | Bypass modes | Enforcement evidence |
|---|---|---|---|---|---|
| **G-permissions-matrix** | A-02 (Claude Code) | allow (9 Bash) / deny (paths) / unknown (non-Bash) | deny > allow; project > user | settings.local.json (S-08); AGENTS.md "Ask first" conventions | `.claude/settings.json:2-26`; Claude Code enforces; no audit log of decisions |
| **G-post-tool-hook** | A-04 (PostToolUse) | auto-approved on Write|Edit | post-tool (can't block, only re-format) | delete hook | `.claude/settings.json:27-37`; Claude Code invokes; **NO audit log of invocations — AAF-VGH-006** |
| **G-PR-deploy-exclude** | A-09 upload + A-10 deploy | auto-deny on pull_request; auto-approve on push:main | `if: github.event_name != 'pull_request'` | workflow_dispatch on main; force-push if no branch protection | deploy.yml:63,67,74 |
| **G-elevated-deploy** | A-10 (deploy job) | elevated permissions: pages:write + id-token:write | workflow-root permissions inherited by all jobs (escalation) | per-job permissions block not used; admin-level relaxation of GitHub-environment rules | deploy.yml:10-13 |
| **G-branch-protection-declared-vs-enforced** | A-08, A-09, A-10 | unknown — no in-repo declaration of GitHub branch-protection rules | GitHub branch-protection (if configured at org) gates merges + triggers | admin override at org level | AAF-VGH-011 (carried to SUMMARY) |

---

## 5. Cross-repo authority comparison (informs common FF candidate)

Three operator-owned repos diverge sharply on Claude Code authority declaration:

| Repo | `.claude/settings.json` present? | Permissions model | Ambient authority | Approval-precedence clarity |
|---|---|---|---|---|
| `planning-summer-2026` | yes | broad allow (Read/Edit/Write + uv/ruff/pytest/mypy/mise/git-subcommands/gh-pr-list) + explicit `ask` (git push, gh pr create, gh repo *) + explicit `deny` (rm -rf, git push --force, git reset --hard) | **low** — non-Bash tools EXPLICITLY in allow | **high** — exhaustive ask/allow/deny |
| `verlyn13.github.io` (this repo) | yes | narrow allow (9 Bash patterns only) + deny (env paths + build artifacts) | **moderate** — Read/Write/Edit/Grep/Glob/Task not in allow; rely on Claude Code default per-call prompting | **moderate** — deny explicit; allow Bash-only |
| `new-direction-2026` | **no** | n/a — only `.claude/settings.local.json` (gitignored, content unknown) | **high** — entire authority surface is operator-local and invisible to audit | **low** — no project-scoped declaration |

**Common FF candidate: `FF-claude-code-settings-canonicalization-across-repos`**

- **Rationale:** Three operator-owned repos exhibit three different Claude Code authority models. Common operator + common agent surface + 3 inconsistent authority declarations = drift surface. A canonical `.claude/settings.json` template (or shared base profile) committed to each repo would (a) close the ambient-authority gap here, (b) eliminate the no-settings gap in new-direction-2026, (c) align the three models so cross-repo workflows have predictable authority.
- **Enforcement category:** `authority-manifest`.
- **Scope:** all operator-owned repos with `.claude/` presence.
- **Failure condition:** missing `.claude/settings.json`; OR settings.json that does not declare Read/Write/Edit/Task in allow OR ask; OR settings.json with deny list smaller than the canonical-minimum (env paths + build artifacts + force-write git).
- **Implementation note:** could live as a shared `.claude/settings.shared.json` + copy script, or as a meta-inventory FF that scans every repo on disk for the canonical pattern (meta-inventory already has `scan_local_repos.py`).

---

## 6. AAF resolutions summary

| AAF | Disposition | Where resolved | FF candidates |
|---|---|---|---|
| **AAF-VGH-006** (PostToolUse hook silent errors) | RESOLVED | A-04: write-capable automation principal with auto-approved policy + no enforced filesystem scope + silenced errors. Flag combo: `ambient-authority + write-without-approval-policy + approval-not-enforced`. Cross-cites Phase 7 §3.4. | FF-claude-code-hook-observability; FF-claude-code-hook-scope-declaration |
| **AAF-VGH-009** (context7 MCP unscoped) | RESOLVED | A-11: declared in CLAUDE.md:27-33 + AGENTS.md:60-61 without .mcp.json. Flag combo: `remote-agent-token-scope-unknown + undeclared-scope + ambient-authority`. Paired with sibling AAF-NDM-008. | FF-mcp-project-scoping; FF-mcp-tool-schema-recorded |
| **AAF-VGH-010** (GH Actions @v* not @SHA) | RESOLVED | A-10 + §3: 5 actions @major-tag-only. Highest-priority is deploy-pages@v4 because it receives the OIDC token + publishes to jvjohnson.dev. | FF-pin-github-actions-to-sha; FF-per-job-actions-permissions |
| AAF-VGH-011 (branch-protection declared-vs-enforced) | Carried to SUMMARY | G-branch-protection-declared-vs-enforced gate; in-repo CI declaration complete; external branch-protection visibility opaque | — |

---

## 7. Exit check (§7 Phase 6)

| Criterion | Status |
|---|---|
| Every write-capable path has an approval policy value, even if `none-required` | ✓ (4 write-capable: A-01 operator, A-02 Claude Code, A-04 PostToolUse hook, A-10 deploy job — all carry recorded approval-mode values; A-05 fix-issue inherits A-02) |
| Every authority escalation is either explained or flagged | ✓ (A-10 deploy job `escalation` flag with workflow-root permissions inheritance explanation) |
| Every principal has readable and writable scopes recorded | ✓ (11 principals; all recorded; 3 SKILLs inherit; A-11 records `unknown` explicitly) |
| Every browser-use, computer-use, or filesystem-use agent has a declared scope | ✓ (A-02, A-03, A-04 record filesystem scope; no browser-use or computer-use agents in this repo) |
| Every callback-capable, hosted-tool, or remote-agent principal has authentication and token-scope evidence or a missing-authority flag | ✓ (A-10 records token delegation via OIDC; A-11 flagged `remote-agent-token-scope-unknown`; third-party actions inventoried in §3) |

**Phase 6 exit check: passes.**
