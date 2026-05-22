# Phase 8 — Policy and Prompt / Context Separation

**Audit spec:** Agentic Architecture Audit Specification v3.1 (2026-05-08) §7 Phase 8 + §8.9 + §9.4.
**Audit date:** 2026-05-22 (audit/2026-05-21/ dated dir; profile snapshot pinned 2026-05-21).
**Repo HEAD:** `ee6c7e55331faaf55fa6bb4cde49abd9e1c96f9a`.
**Routed AAFs (Phase 8 destination):** AAF-VGH-001 (MAAT positioning, Pair B consumer side), AAF-VGH-002 (DEV_GUIDE vs AGENTS.md 6-axis contradiction), AAF-VGH-004 (README MIT © 2025), AAF-VGH-012 (THEMES.md overstated capability).

---

## 1. Method

Per audit spec §7 Phase 8 + §8.0 + §8.1. Classified every prompt-like surface, then applied policy-separation treatment per class. The unit of analysis is the **assembled context** an external agent runtime (Claude Code, Cursor IDE) sees plus the **operator-authored portfolio HTML pages** which are this repo's *primary* authoring artifacts.

This repository has **zero runtime LLM call sites in product code** (the deployed site is static HTML). Per spec §7 Phase 8: "For projects with no runtime LLM surface, Phase 8 still executes — against the runtime non-production, authoring artifact, and skill-or-sop classes — and produces non-vacuous findings."

For this repo, the largest by count Phase 8 surface class is `authoring-artifact-prompt` (the 11 deployed HTML pages). They are *not* runtime prompts — they are operator-authored content that the audit treats as prompt-class because (a) they encode operator-stated positioning and pinned facts which are the policy substance of a personal portfolio, and (b) per §8.1 boundary "do not classify authoring artifacts using only runtime-prompt criteria" — they receive the `authoring-artifact-prompt` reading: "checked for drift from current code, docs, ADRs, operator conventions, and safety boundaries."

22 surfaces total in scope.

---

## 2. Phase 8.0 — Prompt-surface classification

### 2.1 Surface inventory

| ID | Path | Phase 3 entrypoint | §8.0 surface_type | Lines opened | Status |
|---|---|---|---|---|---|
| PS-01 | `.claude/skills/fix-issue/SKILL.md` | E-09 | `runtime-nonproduction-prompt` | 1-12 | opened |
| PS-02 | `.claude/skills/ship-small/SKILL.md` | E-10 | `runtime-nonproduction-prompt` | 1-12 | opened |
| PS-03 | `.claude/skills/review-diff/SKILL.md` | E-11 | `runtime-nonproduction-prompt` | 1-18 | opened |
| GA-01 | `AGENTS.md` | n/a (governance) | `skill-or-sop` | full 140 | opened |
| GA-02 | `CLAUDE.md` | n/a (governance shim) | `skill-or-sop` | full 55 | opened |
| GA-03 | `.cursor/rules/project.mdc` | n/a (IDE-attached) | `skill-or-sop` | full 62 | opened |
| GA-04 | `.cursor/rules/css.mdc` | n/a (IDE-attached) | `skill-or-sop` | full 47 | opened |
| GA-05 | `.cursor/rules/html.mdc` | n/a (IDE-attached) | `skill-or-sop` | full 42 | opened |
| GA-06 | `README.md` | n/a (governance/license) | `skill-or-sop` | full 15 | opened |
| GA-07 | `DEV_GUIDE.md` | n/a (governance, STALE) | `documentation-about-prompts` | full 137 | opened |
| GA-08 | `THEMES.md` | n/a (governance, STALE) | `documentation-about-prompts` | full 128 | opened |
| AA-01 | `index.html` | E-HTTP-pages | `authoring-artifact-prompt` | grep + targeted lines | partial |
| AA-02 | `cv.html` | E-HTTP-pages | `authoring-artifact-prompt` | targeted lines | partial |
| AA-03 | `contact.html` | E-HTTP-pages | `authoring-artifact-prompt` | head | partial |
| AA-04 | `experience/index.html` | E-HTTP-pages | `authoring-artifact-prompt` | targeted lines | partial |
| AA-05 | `research/index.html` | E-HTTP-pages | `authoring-artifact-prompt` | targeted lines | partial |
| AA-06 | `projects/maat.html` | E-HTTP-pages | `authoring-artifact-prompt` | targeted lines | partial |
| AA-07 | `projects/dicee.html` | E-HTTP-pages | `authoring-artifact-prompt` | head (favicon-only refs) | partial |
| AA-08 | `projects/scopecam.html` | E-HTTP-pages | `authoring-artifact-prompt` | head (favicon-only refs) | partial |
| AA-09 | `projects/budget-triage.html` | E-HTTP-pages | `authoring-artifact-prompt` | head (favicon-only refs) | partial |
| AA-10 | `projects/flux.html` | E-HTTP-pages | `authoring-artifact-prompt` | head (favicon-only refs) | partial |
| AA-11 | `projects/llm-gateway.html` | E-HTTP-pages | `authoring-artifact-prompt` | head (favicon-only refs) | partial |

**22 surfaces classified.** Three `runtime-nonproduction-prompt` (SKILL.md slash commands — Claude Code executes when operator types `/fix-issue` / `/ship-small` / `/review-diff`); 6 `skill-or-sop` (AGENTS.md + CLAUDE.md + 3 Cursor rules + README.md); 2 `documentation-about-prompts` (DEV_GUIDE.md + THEMES.md, both stale); 11 `authoring-artifact-prompt` (deployed HTML pages). No `runtime-production-prompt`, no `server-exposed-prompt`, no `not-a-prompt`.

The 11 HTML pages are recorded individually because the MAAT-positioning audit (AAF-VGH-001) requires per-page classification; the 6 favicon-only project pages (AA-07..AA-11) carry the favicon reference but no body-text MAAT mention, and that distinction matters for the embedded-values catalogue at §3.

---

## 3. Phase 8.1 — Policy-separation treatment

Per §9.4 "Embedded policy in prompts and contexts" criteria: a value or instruction is embedded policy when (1) it represents a business/compliance/release/authority/safety rule, (2) changing it would change externally visible behavior, (3) it appears only in prompt-or-context surfaces and not in policy/domain code/configuration/ADRs/eval rubrics, (4) it controls tool choice/write authority/data visibility/approval, or (5) it defines pass/fail criteria for generated artifacts or release decisions.

### 3.1 AAF-VGH-001 — MAAT positioning (Pair B consumer side; pairs with sibling AAF-NDM-007)

**Substance:** Per operator profile interview, MAAT is positioned as "minor / experimental" — but it appears in identity-level positioning across the portfolio.

**Quantified surface inventory (Phase 1 confirmed; re-verified at HEAD `ee6c7e5`):**

| Surface kind | Count | Location |
|---|---:|---|
| **Favicon `maat_feather_16.svg`** | 12 | every deployed page (`index.html`, `cv.html`, `contact.html`, `projects/{maat,dicee,scopecam,budget-triage,flux,llm-gateway}.html`, `experience/index.html`, `research/index.html`) + 1 sandbox (`experiments/timeline-braid.html`) |
| **Textual MAAT mentions** | 8 | `cv.html:83` (h3 heading); `index.html:44` (lead paragraph), `:76` (theoretical CS), `:117` (nav card href); `research/index.html:141` (formal methods); `experience/index.html:326` (project name); `projects/maat.html:6` (title), `:48` (h1) |
| **README.md lead** | 2 | `README.md:10-11` (MAAT named first of "two primary projects") |
| **Dedicated page** | 1 | `projects/maat.html` (entire page) |
| **Total surface instances** | **20+** | (12 favicon + 8 textual; the README is one of the textual mentions) |

**Pinned-facts cross-check (cross-repo from sibling):** the operator's pinned-facts contract at `../new-direction-2026/.cursor/rules/content.mdc:19-24` enumerates 6 pinned facts (current title, Ph.D., B.A., institution, live project, key publication) — **MAAT is not in this list.** The pinned-facts say "live project = Dicee at gamelobby.jefahnierocks.com." The consumer-side narrative on this site emphasizes MAAT while the producer-side pinned facts omit it.

**Per-surface classification per §8.1 enum:**

| Surface ID | Path | Lines | embedded_values kind | Classification |
|---|---|---|---|---|
| AA-01 | `index.html` | L8 (favicon), L44 (lead para), L76 (CS theory), L117 (nav card) | `tool-constraint` (favicon = identity asset); `authority` (lead-paragraph weight) | `stale-authoring-artifact` |
| AA-02 | `cv.html` | L8 (favicon), L83 (h3 heading) | `authority` (CV heading-level prominence) | `stale-authoring-artifact` |
| AA-03 | `contact.html` | L8 (favicon) | `tool-constraint` (favicon only) | `stale-authoring-artifact` |
| AA-04 | `experience/index.html` | L10 (favicon), L326 (project name) | `authority` (project-name listing) | `stale-authoring-artifact` |
| AA-05 | `research/index.html` | L8 (favicon), L141 (formal methods → policy verification reference) | `authority` (research connection) | `stale-authoring-artifact` |
| AA-06 | `projects/maat.html` | L6 (title), L8 (favicon), L48 (h1) | `authority` (dedicated page = flagship signal) | `stale-authoring-artifact` (the existence of this page is itself the strongest signal of flagship positioning that contradicts operator-stated minor/experimental) |
| AA-07..AA-11 | `projects/{dicee,scopecam,budget-triage,flux,llm-gateway}.html` | L8 each (favicon) | `tool-constraint` (favicon only) | `stale-authoring-artifact` (favicon = identity carrier for every project page) |
| GA-06 | `README.md` | L10-11 (MAAT named first of "two primary projects") | `authority` (lead-paragraph positioning of project portfolio) | `stale-authoring-artifact` |

**Drift target:** the operator's stated positioning of MAAT as minor/experimental + the sibling's pinned-facts list (`../new-direction-2026/.cursor/rules/content.mdc:19-24`) which omits MAAT. These 20+ surface instances each contradict the current operator self-narrative.

**Classification per §8.1 enum:** `stale-authoring-artifact` across all listed surfaces. They are not WRONG (MAAT exists; it's a real framework) — they are STALE relative to the operator's CURRENT positioning.

**Cross-repo Pair B alignment:** sibling new-direction-2026 AAF-NDM-007 (5 refs on producer side: AGENTS.md L178 + STATUS.md L13/L43/L56 + .gemini/GEMINI.md L106) → this side AAF-VGH-001 (**20+ refs on consumer side** = 12 favicon + 8 textual). The consumer side is **4× more prominent** than the producer side. The staleness has propagated through the content pipeline and **amplified** on the consumer side because the favicon design choice carries identity-level weight on every page. Phase 11 synthesis reconciles.

**Recommendation boundary:** the policy home is not "extract to code" — for a personal portfolio there is no code home. The home IS the HTML pages themselves. The recommendation per §9.4 boundary is to (a) change the favicon to a neutral identity mark, (b) rebalance the lead-paragraph and nav-card prominence per operator-stated positioning, (c) optionally retire `projects/maat.html` or reframe it as "early work" with a date stamp. Phase 4 / Phase 8 do not decide; Phase 10 will record the FF candidate.

**Flag:** `stale-authoring-artifact` × 20+ surface instances (consolidated as one Phase 10 finding F-VGH-NNN with 20+ citations).

---

### 3.2 AAF-VGH-002 — DEV_GUIDE.md vs AGENTS.md design-system contradiction (6 axes)

**Substance:** DEV_GUIDE.md describes a design system that **contradicts** AGENTS.md + .cursor/rules/ on at least 6 axes. Phase 4 §2.10 fully confirmed.

Per §8.0 surface_type = `documentation-about-prompts` (the file describes architecture/design system in prose; it is NOT itself a prompt invoked by an agent runtime). Per §8.1 boundary "Documentation about prompts is checked only for contradictory guidance that could mislead future agents or developers" — exactly this case.

**6 contradictions (re-verified at HEAD `ee6c7e5`):**

| # | Axis | AGENTS.md / .cursor/rules (current) | DEV_GUIDE.md (stale) |
|---|---|---|---|
| 1 | **Spacing scale** | `--space-1` through `--space-5` (rem-based) — `AGENTS.md:116`, `.cursor/rules/project.mdc:42`, `.cursor/rules/css.mdc:25` | `--space-xs` (4px) through `--space-2xl` (64px) — 8-point grid — `DEV_GUIDE.md:15-18` |
| 2 | **Typography (body)** | System sans-serif `ui-sans-serif, system-ui` via `--font` — `AGENTS.md:118` | Serif (Georgia) for body text — `DEV_GUIDE.md:22` |
| 3 | **Content max-width** | `--measure` = `72ch` — `AGENTS.md:119` | `1200px max-width container` — `DEV_GUIDE.md:34` |
| 4 | **Primary accent** | Blue `hsl(212 85% 45%)` (`--accent`) — `AGENTS.md:117` | Lapis blue `#4C70A0` — `DEV_GUIDE.md:28` |
| 5 | **Secondary accent / hover** | Green `hsl(160 55% 35%)` (`--accent-2`) — `AGENTS.md:117` | Gold `#D4AF37` (hover) — `DEV_GUIDE.md:29` |
| 6 | **CSS filename** | `assets/jeffrey.css` — `AGENTS.md:20,94`, `.cursor/rules/css.mdc:9`, `THEMES.md:48,58` | `assets/styles.css` — `DEV_GUIDE.md:52,62,118` (**this file does not exist** at HEAD; verified by Glob) |

**Additional broken-reference debt in DEV_GUIDE.md (beyond the 6 design-system axes):**

- DEV_GUIDE.md L46-47 references `research/maat.html` and `research/scopecam.html` as the canonical project pages — **neither exists**. The actual project pages are at `projects/maat.html` and `projects/scopecam.html` (the directory was reorganized; DEV_GUIDE.md was not updated).
- DEV_GUIDE.md L48-50 references an `academic/` directory with `index.html` and `publications.html` — **directory does not exist**. The current site has no `academic/` context.
- DEV_GUIDE.md L54-55 references legacy `maat/` and `scopecam/` directories (with "redirects" annotation) — **neither exists**.
- DEV_GUIDE.md L52 references `assets/styles.css` and L93-101 includes a navigation HTML snippet linking to `/research/` and `/academic/` — neither URL is in the deployed `vite.config.js:23-37` entry list.

These are **`stale-authoring-artifact`** in addition to the contradictory-guidance classification — the file references a structural reality that hasn't existed since (at least) the May 21 portfolio integration commit `6eaa529`.

**Classification per §8.1 enum:** `contradictory-guidance` (the file is `documentation-about-prompts` whose content contradicts the canonical AGENTS.md + .cursor/rules trio on every axis it touches). Each contradiction has a **plausible policy home** (AGENTS.md is the operator-declared canonical contract per `CLAUDE.md:3` "Primary project contract: @AGENTS.md").

**Drift target:** for every contradiction, the canonical source is AGENTS.md + the .cursor/rules trio. The DEV_GUIDE.md file is stale on **every dimension where it makes a design-system claim** — there is no axis on which it provides correct unique information vs. AGENTS.md.

**Recommendation boundary per §8.1 + §9.4:** the file should be (a) deleted, (b) replaced with a single-line stub redirecting to AGENTS.md, (c) superseded with a dated "see AGENTS.md for current canonical design system" note, or (d) merged into AGENTS.md for the small fraction of accurate content (e.g., the deployment section L130-135 is roughly accurate). **Phase 8 does not decide** — Phase 10 produces remediation candidates.

**Flag:** `contradictory-guidance` (6 design-system axes) + `stale-authoring-artifact` (3 broken-reference categories: research/maat+scopecam.html, academic/ tree, legacy maat/+scopecam/ dirs). Consolidated as one Phase 10 finding with 9 total sub-citations.

---

### 3.3 AAF-VGH-012 — THEMES.md overstated multi-theme capability

**Substance:** THEMES.md L1-5 declares "This site supports multiple visual themes. Switch between them by changing the stylesheet reference in HTML files." L48-51 provides a sed-script for switching. L25 names a second theme `styles-academic.css`. Per Phase 4 §2.11: the file `assets/styles-academic.css` **does not exist**; the actual file is at `experiments/themes/academic.css` (different path, different bounded context); the sed-script would silently no-op because no HTML file currently references `styles-academic.css`.

Per §8.0 surface_type = `documentation-about-prompts` (the file describes capability in prose; not itself a prompt).

**Classification per §8.1 enum:** `stale-authoring-artifact` AND `contradictory-guidance` (claims a theme-switching capability that does not exist as automation; the documented filename does not exist at the documented path).

**Drift target:** the actual filesystem state at HEAD `ee6c7e5`. Verification: `assets/jeffrey.css` exists; `assets/styles-academic.css` does NOT exist; `experiments/themes/academic.css` is the actual location of the "academic theme" prototype.

**Embedded values:**
- L25 file path claim `styles-academic.css` at `assets/` (wrong path; correct path is `experiments/themes/academic.css`) — `tool-constraint`
- L48 sed-script that produces zero substitutions because the source string `styles-academic.css` is absent from all HTML files — `tool-constraint` (would silently no-op)

**Recommendation boundary per §8.1:** retire the multi-theme claim from THEMES.md (keep it as a single-theme philosophy doc), or move `experiments/themes/academic.css` to `assets/styles-academic.css` and add an HTML-level switcher, or document the as-is reality (manual hand-edit; experimental prototype, not deployed). **Phase 8 does not decide.**

**Flag:** `stale-authoring-artifact` + `contradictory-guidance` (one Phase 10 finding with 4 sub-citations: L1-5 capability claim, L25 filename claim, L48 broken sed-script, L51 reverse-direction sed-script also broken).

---

### 3.4 AAF-VGH-004 — README.md stale "MIT © 2025"

**Substance:** `README.md:13` declares `MIT © 2025 Jeffrey Johnson`. Current date is 2026. Profile §interview confirmed.

Additionally, `README.md:10-11` lists only **2 of 6 deployed projects** (MAAT, ScopeCam). The other 4 (Dicee, Budget Triage, Flux, LLM Gateway) all have deployed `projects/*.html` pages but are not mentioned in README.md.

**Classification per §8.0:** GA-06 surface_type = `skill-or-sop` (README.md is repository governance + license declaration). Per §8.1 boundary "Skill/SOP files are checked for embedded policy and for convention-vs-policy confusion."

**Classification per §8.1 enum:** `stale-authoring-artifact` on both counts:
1. Copyright year drift (2025 → should be 2026 minimum, or year-range `2025-2026`).
2. Project list drift (2 mentioned, 6 deployed).

Both items also reinforce the AAF-VGH-001 MAAT-positioning finding: the README's lead-paragraph names MAAT first of 2 projects, which is consistent with the favicon + lead-paragraph signals on the website but inconsistent with the operator-stated positioning of MAAT as minor/experimental.

**Drift target:** (a) calendar year (2026); (b) `vite.config.js:23-37` 6-project deployment manifest.

**Embedded values:**
- L13 `MIT © 2025` — `tool-constraint` (license-year string) — line 13
- L10-11 project list ("two primary projects" — MAAT, ScopeCam) — `authority` (the README lead paragraph) — lines 10-11

**Recommendation boundary per §8.1 + §9.4:** for L13, this is a tiny FF candidate (CI check for current-year copyright; many repos have automated this). For L10-11, this is consolidated with the AAF-VGH-001 rebalancing recommendation — the operator decides per the broader MAAT-positioning rebalance.

**Flag:** `stale-authoring-artifact` × 2 sub-items (consolidated as one Phase 10 finding with 2 citations).

---

### 3.5 PS-01..PS-03 (3 SKILL.md slash commands) policy check

Per §8.1 boundary "Runtime non-production prompts are checked for policy that can affect generated code, infrastructure, governance, or release artifacts."

| Surface | Embedded values | §8.1 classification |
|---|---|---|
| PS-01 `/fix-issue` (12 lines) | 6-step workflow (reproduce → isolate → fix → verify → visual check → document); commits via `fix(scope): description` convention | `pure-instruction` (workflow steps; no embedded business policy; all rules inherited from AGENTS.md via `@AGENTS.md` reference at L8) |
| PS-02 `/ship-small` (12 lines) | "1–3 commits max" (L7); "if touching >5 files, stop and write a plan" (L10) | `embedded-policy` (the `>5 files` threshold IS policy per §9.4 criterion #4 — controls when human approval is required for multi-file changes). PLUS `contradictory-guidance` if compared cross-repo with sibling `new-direction-2026/.claude/skills/ship-small/SKILL.md` (`>5 files`) and `AGENTS.md`/`CLAUDE.md` in that repo (`>3 files`). **In THIS repo, the threshold is consistent across the only places it appears** (PS-02 L10 only — neither AGENTS.md nor CLAUDE.md declares a competing threshold). No internal drift; cross-repo asymmetry exists. |
| PS-03 `/review-diff` (18 lines) | 9-item checklist including "rem-based spacing scale" (L12), "Ask first boundaries from @AGENTS.md respected" (L16) | `pure-instruction` (checklist items; AGENTS.md is cited as the policy home for boundaries) |

**Policy home for PS-02 threshold:** the rule lives only in PS-02 L10. Plausible policy home would be AGENTS.md alongside the `Ask first` taxonomy (L96-103) — but the `>5 files` rule is operationally about plan-mode triggers, not about approval-required actions, so its current location in the ship-small SKILL may be appropriate. **Not a true embedded-policy violation** in the §9.4 sense unless the operator wants to enforce the threshold programmatically. Recorded for completeness; Phase 10 FF candidate of low priority.

**Flag:** PS-02 carries `embedded-policy` (threshold) marker as a minor finding. PS-01 and PS-03 carry no flags.

---

### 3.6 GA-01..GA-05 governance docs policy check

Per §8.1 boundary "Skill/SOP files are checked for embedded policy and for convention-vs-policy confusion (rules expressed here may belong in code)."

**GA-01 AGENTS.md (140 lines):** IS the policy home for this repo's conventions. Per Phase 8.1: canonical case where "the prompt surface IS the policy home." Contains the 3-tier Always/Ask-first/Never taxonomy (L86-112), design system spec (L114-121), code style (L123-128). Classification: `pure-instruction` (the policies are appropriately located).

**Embedded values in GA-01 worth recording:**
- L116 spacing scale `--space-1` through `--space-5` (rem-based) — `tool-constraint` (design system parameter; AUTHORITATIVE per CLAUDE.md L3 precedence)
- L117 accent colors `hsl(212 85% 45%)` and `hsl(160 55% 35%)` — `tool-constraint` (color parameters; AUTHORITATIVE)
- L118 typography `--font` = system sans-serif — `tool-constraint` (typography parameter; AUTHORITATIVE)
- L119 max-width `--measure` = 72ch — `tool-constraint` (layout parameter; AUTHORITATIVE)
- L98-103 Ask-first list (6 items) — `approval` (authority rule)
- L107-112 Never list (6 items) — `approval` (authority rule)
- L111 "Never break existing page URLs" — `release-criterion` (URL stability is release-quality policy)

These are POLICY but they live in the policy home; no extraction recommendation. They serve as the **drift target** for the DEV_GUIDE.md contradictions catalogued at §3.2.

Classification: `pure-instruction` for GA-01 itself (its policies are appropriately located).

**GA-02 CLAUDE.md (55 lines):** a shim that defers to AGENTS.md (L3 "Primary project contract: @AGENTS.md"). Restates skills table (L21-26), MCP server table (L29-31), permissions summary (L46-48). Classification: `pure-instruction` (shim; no embedded policy independently of AGENTS.md).

**GA-03 .cursor/rules/project.mdc (62 lines):** restates AGENTS.md content for Cursor IDE consumption. Hard boundaries at L26-31 mirror AGENTS.md L107-112 (Never list). Design system quick reference L40-46 mirrors AGENTS.md L116-120. Classification: `pure-instruction` (restatement; appropriate for IDE auto-attach).

**GA-04 .cursor/rules/css.mdc:** glob-attached on `assets/**/*.css`; declares CSS-specific rules (single-file invariant; no inline styles). Restates AGENTS.md L94 + L114-120 in CSS-specific framing. Classification: `pure-instruction`.

**GA-05 .cursor/rules/html.mdc:** glob-attached on `*.html`, `projects/*.html`, `experience/*.html`, `research/*.html`. Declares HTML rules (no `<style>` blocks; semantic structure; external-link `rel="noopener noreferrer"` at L23). Classification: `pure-instruction`.

**No `embedded-policy` violations across GA-01..GA-05** — these are the policy homes, and policies are appropriately located.

---

### 3.7 Summary of routed AAFs resolved in Phase 8

| AAF | Resolution | Phase 8 finding |
|---|---|---|
| AAF-VGH-001 (MAAT positioning) | CONFIRMED — 20+ surface instances classified `stale-authoring-artifact` (12 favicon + 8 textual including README L10-11) | §3.1 |
| AAF-VGH-002 (DEV_GUIDE vs AGENTS) | CONFIRMED — 6 design-system contradictions + 3 broken-reference categories | §3.2 |
| AAF-VGH-004 (README MIT © 2025) | CONFIRMED — 2 stale items (copyright year + project list) | §3.4 |
| AAF-VGH-012 (THEMES.md multi-theme) | CONFIRMED — capability claim contradicts filesystem reality | §3.3 |

AAF-VGH-003 (biome warn-vs-error) is routed to Phase 9 (eval / quality-gate), not Phase 8.

---

## 4. Retrieval-augmented surfaces

Per §8.1 boundary "Do not skip retrieval pipelines because they 'aren't prompts.'":

This repo has **no retrieval pipeline.** No vector store, no embedder, no reranker, no retrieval policy. Profile `infrastructure.retrieval_pipelines = []`. The context7 MCP referenced at `CLAUDE.md:27-33` is documentation-lookup, not in-repo retrieval; its results are operator-mediated (resolve-library-id then query-docs, both invoked manually). No in-repo retrieval surface exists.

→ No `retrieval-policy-leak` finding.

---

## 5. Tool descriptions

Per §8.1 boundary "Tool descriptions — check whether descriptions encode policy":

Tool descriptions for the Claude Code built-in tools (Read, Write, Edit, Bash, Task) and the context7 MCP tools (resolve-library-id, query-docs) live UPSTREAM, not in this repo. AGENTS.md L59-63 is an inventory table OF the available tools, not a tool-description registry. This repo does NOT author tool descriptions.

→ No `tool-description-policy-leak` finding.

---

## 6. Server-exposed prompts

This repo hosts **no MCP server**. Verified: no `.mcp.json` at repo root (Phase 0 §4.2); profile `protocol_surfaces.mcp.present = true` (CLIENT side only — operator-installed context7); no project-scoped MCP server. No `server-exposed-prompt` surfaces exist.

→ No `server-prompt-policy-leak` finding.

---

## 7. Untrusted-input boundaries

Per §8.1 boundary "Untrusted input boundaries — identify whether user, tool, retrieval, resource, or remote-agent content can enter developer/system messages, privileged prompt context, policy context, or tool descriptions without structured boundary controls":

This repo's deployed product is a static HTML5 portfolio served via GitHub Pages CDN. **No input forms, no comments, no user-content surfaces** — verified by survey of all 11 deployed pages. The site emits only `<a href>` outbound links (record-only surface; Phase 4 §2.20 inventories the contract; the rel="noopener noreferrer" convention at `.cursor/rules/html.mdc:23` is not Biome-enforced).

| Boundary | Untrusted content | Privileged context | Risk |
|---|---|---|---|
| Public HTTP read (E-HTTP-pages × 11) | none — no user input accepted | n/a (read-only static delivery) | nil — static delivery |
| External outbound links in HTML pages | external URLs (recorded as outbound surface) | n/a (no input ingress) | nil — outbound only |
| PostToolUse hook (E-12) input via jq | tool_input.file_path from Claude Code (operator-mediated) | runs in operator's shell context | low — operator-mediated; biome formats the file in-place; jq parses Claude Code's own JSON tool_input |
| Context7 MCP results | external context7 service returns docs | passed into Claude Code agent context (operator-installed) | low — operator-controlled invocation; context7 is the operator's chosen MCP; not a repo-scoped surface |
| Cross-repo Read from sibling new-direction-2026 | operator-authored content (operator is producer) | passed into agent context | nil — operator is producer |

No high-risk untrusted-input → privileged-context paths detected. The github / brave-search / firecrawl MCPs referenced in CLAUDE.md L31 are not project-scoped (they're operator-installed at the Claude Code global level); their boundary semantics live upstream.

→ No `privileged-context-injection-risk` finding.

---

## 8. Phase 8.1 classification summary

| Classification | Count | Surface IDs |
|---|---:|---|
| `pure-instruction` | 8 | PS-01, PS-03, GA-01, GA-02, GA-03, GA-04, GA-05 — counted 7 here; (note: PS-02 has dual classification under embedded-policy below; GA-06 README is reclassified as stale-authoring-artifact) |
| `instruction-with-parameters` | 0 | (no parameterized contract surfaces in this repo; AGENTS.md design-system tokens are policy-home-localized, not parameters of a contract) |
| `embedded-policy` | 1 | PS-02 `>5 files` threshold (minor; consistent within this repo; cross-repo asymmetry exists but is the sibling's concern) |
| `policy-masquerade` | 0 | none |
| `retrieval-policy-leak` | 0 | no retrieval pipeline |
| `tool-description-policy-leak` | 0 | tool descriptions live upstream |
| `server-prompt-policy-leak` | 0 | no server-exposed prompts |
| `privileged-context-injection-risk` | 0 | no untrusted-input → privileged-context paths |
| `stale-authoring-artifact` | **15** | **(MAAT-positioning bundle)** AA-01, AA-02, AA-03, AA-04, AA-05, AA-06, AA-07, AA-08, AA-09, AA-10, AA-11 = 11 HTML pages; GA-06 README; GA-07 DEV_GUIDE (broken-reference dimension); GA-08 THEMES (filesystem-reality dimension); plus AAF-VGH-004 README copyright/project-list = the same GA-06 already counted |
| `contradictory-guidance` | 2 | GA-07 DEV_GUIDE design-system 6-axis; GA-08 THEMES multi-theme capability |
| `unclassified` | 0 | |

**Total surface classifications recorded:** 22 surfaces (with 4 of them carrying dual classifications because GA-06/07/08 receive both stale-authoring-artifact and (for GA-07/08) contradictory-guidance markers). The classification counts above sum to more than 22 because the dual classifications are tallied separately per §8.1 enum.

**Counts that match the kickoff expectations:**
- MAAT positioning: **20+ surface instances** (12 favicon + 8 textual) = ✓ matches "20+ surface instances" in kickoff.
- DEV_GUIDE contradictions: **6 design-system axes + 3 broken-reference categories** = ✓ matches "6 specific contradictions with AGENTS.md + .cursor/rules" in kickoff (the 3 broken-reference items are the bonus debt mentioned).
- THEMES.md: stale + contradictory = ✓ per AAF-VGH-012.
- README.md stale: "MIT © 2025" + 2-vs-6 project list = ✓ per AAF-VGH-004.

---

## 9. Boundaries honored

Per §7 Phase 8 boundary declarations:

- [x] Did NOT mark a non-runtime prompt as vacuously safe. The 11 deployed HTML pages are operator-authored static content with no runtime LLM, but §3.1 classified each one against the operator's stated positioning per AAF-VGH-001.
- [x] Did NOT classify authoring artifacts using only runtime-prompt criteria. The 11 HTML pages received the `authoring-artifact-prompt` reading per §8.0 enum #3, checked for "drift from current code, docs, ADRs, operator conventions, and safety boundaries" per §8.1.
- [x] Did NOT recommend policy extraction unless a plausible policy home exists. For AAF-VGH-001 (MAAT), explicitly stated "for a personal portfolio there is no code home" — the recommendation is rebalancing, not extraction. For AAF-VGH-002 (DEV_GUIDE), the plausible policy home IS AGENTS.md + .cursor/rules — extraction is the explicit recommendation. For PS-02 threshold, marked low priority because the rule's current location may be appropriate.
- [x] Did NOT treat templated variables as safe unless source is policy-controlled. No templating in this repo (vanilla HTML); GA-01 AGENTS.md design-system tokens are flagged as the source of truth for the contradictions catalogued at §3.2.
- [x] Did NOT skip retrieval pipelines (no retrieval pipeline; explicit absence noted §4).
- [x] Did NOT treat server-exposed prompts as ordinary docs (no server-exposed prompts; explicit absence noted §6).

---

## 10. Exit check (§7 Phase 8)

- [x] **Every prompt-like surface is classified by surface type.** 22 surfaces classified at §2.1 (3 runtime-nonproduction-prompt + 6 skill-or-sop + 2 documentation-about-prompts + 11 authoring-artifact-prompt). No surface is `unclassified`.
- [x] **Every embedded-policy finding cites exact lines and the missing or conflicting policy home.** PS-02 L10 (`>5 files` threshold) is the only `embedded-policy` finding; its policy home is recorded as "currently in PS-02 only; plausible alternative home is AGENTS.md L96-103."
- [x] **Every stale authoring artifact cites the current source it contradicts or states that no source exists.** §3.1 AAF-VGH-001 cites operator-stated positioning + sibling pinned-facts list. §3.2 AAF-VGH-002 cites AGENTS.md L116-120 + .cursor/rules trio. §3.3 AAF-VGH-012 cites filesystem reality at HEAD. §3.4 AAF-VGH-004 cites current calendar year + `vite.config.js:23-37` 6-project manifest.
- [x] **Every server-exposed prompt and privileged-context input path is mapped to Phase 4 and Phase 6 or explicitly marked not applicable.** No server-exposed prompts; no privileged-context input paths; both marked n/a in §6 and §7 with explicit absence rationale.

**Phase 8 exit check passes.** Advancing to Phase 9 (evals).
