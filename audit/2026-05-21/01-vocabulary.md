# Phase 1 — Domain Vocabulary Extraction

**Audit spec:** Agentic Architecture Audit Specification v3.1 (2026-05-08)
**Audit date:** 2026-05-22
**Audit mode:** `first-cycle`
**Repo HEAD:** `ee6c7e55331faaf55fa6bb4cde49abd9e1c96f9a`

**Routed AAFs touching vocabulary:** AAF-VGH-001 (MAAT positioning), AAF-VGH-002 (design-system contradiction), AAF-VGH-004 (stale copyright), AAF-VGH-008 (cross-repo content-pipeline), AAF-VGH-012 (multi-theme overstated capability)
**Claimed contexts under examination:** all 4 carried from profile (portfolio-pages, build-system, agent-governance, experiments-sandbox)

---

## 1. Method

Extracted terms from in-scope files per Phase 0 §3 (include) and §4 (deployable units). Sources read:

- Governance docs: `AGENTS.md`, `CLAUDE.md`, `DEV_GUIDE.md`, `THEMES.md`, `README.md`
- Cursor rules: `.cursor/rules/{project,css,html}.mdc`
- Claude skills: `.claude/skills/{fix-issue,review-diff,ship-small}/SKILL.md`
- Claude settings: `.claude/settings.json`
- Build vocabulary: `vite.config.js`, `biome.json`, `.mise.toml`, `package.json`, `.github/workflows/deploy.yml`
- Runtime JS: `assets/menu.js`
- Site content: all 11 deployed HTML pages — `<title>`, `<h1>`/`<h2>`/`<h3>`, `<nav>` labels, project names
- Cross-repo reference: `../new-direction-2026/AGENTS.md` L129-142 (content-pipeline table)

Citation discipline per audit spec §8.1 (path, lines, evidence, method). Grouped by concept cluster. Collisions tested for **same-term-different-meaning** and **different-term-same-meaning** synonyms per §7 Phase 1 procedure.

Boundaries honored:
- [x] No definitions inferred from filename alone (every term has a textual citation).
- [x] No collision-renaming proposed in this phase (boundary §7 Phase 1).
- [x] Technical terms (`vite`, `biome`, `mise`) not collapsed into domain terms; recorded separately.

---

## 2. Term inventory (highlights)

Full JSON inventory in `01-vocabulary.json`. Surface terms grouped by concept cluster.

### 2.1 Site / page vocabulary

| Term | Where defined | One-line meaning |
|---|---|---|
| `portfolio` | `README.md:1`, `AGENTS.md:5`, `index.html:6` (`<title>`) | The site as a whole; "Research Portfolio" |
| `page` (entry-point sense) | `vite.config.js:23-37` rollupOptions.input | One of 11 keyed Vite entries → 11 built HTML files |
| `entry point` | `AGENTS.md:99`, `.cursor/rules/project.mdc:35`, `.cursor/rules/html.mdc:34` | Synonym for "page" in build-config context |
| `project page` | `AGENTS.md:138` triage map, `vite.config.js:29-34` | One of 6 pages under `projects/` |
| `experience` | `experience/index.html:8` `<title>`, nav label L37 | Section: braid-timeline + era narratives |
| `research` | `research/index.html:6` `<title>`, nav label | Section: "Research & Publications" h1 L35 |
| `cv` | `cv.html:6` `<title>` "Curriculum Vitae" | Academic CV page |
| `contact` | `contact.html:6,30` | Contact page |
| `home` / `hero-home` | `index.html:38` (`section class="hero-home"`) | Landing page hero |
| `Approach` | `index.html:97,99` (section + h2) | Conceptual cluster of 6 "approach cards" |
| `Background` | `index.html:70` h2 | Hero-adjacent biography section |
| `era` | `experience/index.html:271-608` (7 era-section blocks) | Lifecycle phase in timeline ("Synthesis", "International", "Deep Theory", "Service", "Identity", "First Proofs", "Work Ethic") |
| `braid` / `braid-timeline` | `experience/index.html:53-54` `nav class="braid-container"` + SVG | 3-strand SVG visualization of career |

### 2.2 Project name vocabulary (the 6 deployed `projects/*.html`)

| Term | Where defined | One-line meaning |
|---|---|---|
| `MAAT Framework` | `projects/maat.html:6,48`; index L117; cv L83; experience L326 | Multi-Agent Adaptive Technology / Multi-Agent Orchestration — operator-stated minor/experimental but visually flagship (AAF-VGH-001) |
| `ScopeCam` | `projects/scopecam.html:6,48`; index L186; cv L91; experience L334 | Industrial USB Camera Android Application — second of "two primary projects" per README L11 |
| `Dicee` | `projects/dicee.html:6,48`; index L134; cv L87; experience L350 | Multiplayer Game Engine |
| `Budget Triage` | `projects/budget-triage.html:6,48`; index L116; cv L79; experience L342 | Personal Finance / Enterprise Architecture |
| `Flux Pro Shop` | `projects/flux.html:6,48`; index L152; cv L71 | Image Generation Control Plane |
| `LLM Gateway` | `projects/llm-gateway.html:6,48`; index L169; cv L75 | API Gateway Control Plane |

The 6 project names are also referenced as `case-study-link` targets in the 6 approach-card grid at `index.html:114-203`.

### 2.3 Approach-card cluster (index.html L102-205)

These 6 h3 headings define a sub-vocabulary that does NOT match the project-name vocabulary 1:1:

| approach-card heading | case-study link target |
|---|---|
| `The Governance Laboratory` | Budget Triage + MAAT Framework |
| `Hybrid Intelligence` | Dicee |
| `ML Control Planes` | Flux Pro Shop |
| `API Gateway Governance` | LLM Gateway |
| `Safety-Critical Systems` | ScopeCam |
| `Zero-Trust Infrastructure` | `/experience/#alaska` (HomeNetOps) |

`HomeNetOps` appears only here as an approach-card link target with no dedicated `projects/` page — see Collision 5 below.

### 2.4 Design-system vocabulary

The authoritative trio (AGENTS.md + 2× .cursor/rules) declares ONE design system. DEV_GUIDE.md declares a DIFFERENT one. Captured as Collision 1.

**Authoritative side (rem-based / system-sans / 72ch):**

| Term | Where defined | Value |
|---|---|---|
| `--space-1` .. `--space-5` | `AGENTS.md:116`, `.cursor/rules/project.mdc:42`, `.cursor/rules/css.mdc:24` | Rem-based spacing scale |
| `--ink` | `AGENTS.md:117`, `.cursor/rules/{project,css}.mdc` | Primary text color |
| `--paper` | same | Page background |
| `--muted` | same | Secondary text |
| `--accent` | `AGENTS.md:117`, `.cursor/rules/css.mdc:18` | `hsl(212 85% 45%)` blue |
| `--accent-2` | `AGENTS.md:117`, `.cursor/rules/css.mdc:19` | `hsl(160 55% 35%)` green ("ship-it" green) |
| `--border` | `AGENTS.md:120`, `.cursor/rules/css.mdc:20` | Border color |
| `--shadow`, `--shadow-hard` | `AGENTS.md:120`, `.cursor/rules/css.mdc:39-40` | Box shadows |
| `--radius` (14px), `--radius-sm` (10px) | `AGENTS.md:120`, `.cursor/rules/css.mdc:41-42` | Corner radii |
| `--measure` (72ch) | `AGENTS.md:119`, `.cursor/rules/{project,css}.mdc` | Content max-width |
| `--font`, `--mono` | `AGENTS.md:118`, `.cursor/rules/css.mdc:33-34` | System sans-serif + monospace; "no web fonts" |
| `768px breakpoint` | `AGENTS.md:119,51`, `.cursor/rules/css.mdc:29`, `CLAUDE.md:17` | Mobile breakpoint |

**Stale/contradictory side (DEV_GUIDE.md):**

| Term | Where defined (DEV_GUIDE.md) | Value |
|---|---|---|
| `--space-xs` .. `--space-2xl` | `DEV_GUIDE.md:17` | 4px..64px 8-point grid scale |
| `Serif (Georgia) for body text` | `DEV_GUIDE.md:22` | Contradicts `--font` system sans-serif |
| `1200px max-width container` | `DEV_GUIDE.md:34` | Contradicts `--measure` 72ch |
| `Lapis blue (#4C70A0)` | `DEV_GUIDE.md:28` | Contradicts `--accent hsl(212 85% 45%)` |
| `Gold (#D4AF37)` | `DEV_GUIDE.md:29` | Not in current design system at all |
| `Dark gray (#333)` | `DEV_GUIDE.md:30` | Contradicts `--ink` (which is not specified as #333) |
| `Pure white background` | `DEV_GUIDE.md:31` | Contradicts `--paper` ("warm paper" per `THEMES.md:11`) |
| `Modular scale: 14px base, 1.25 ratio` | `DEV_GUIDE.md:24` | No counterpart in AGENTS.md |
| `assets/styles.css` (filename) | `DEV_GUIDE.md:52,62,118` | **File does not exist.** AGENTS.md L20/L94 says single CSS file is `assets/jeffrey.css` |

### 2.5 Theme-system vocabulary (THEMES.md)

`THEMES.md` declares a vocabulary that overstates capability per AAF-VGH-012:

| Term | Where defined | Status in implementation |
|---|---|---|
| `theme` | `THEMES.md:1` "site supports multiple visual themes" | Documented-but-manual; no automation |
| `jeffrey.css` (current default theme) | `THEMES.md:7-23` | Real, present at `assets/jeffrey.css` |
| `styles-academic.css` (second theme) | `THEMES.md:25-41` | **File not present in `assets/`** (verified: only `assets/jeffrey.css` exists per AGENTS.md L20 + L94). Theme-switch sed-script in `THEMES.md:48` would rewrite all 11 HTML files; no tooling automates it. An academic-styled file does exist at `experiments/themes/academic.css` but it is outside the `assets/` location the THEMES.md sed-script references — this is a path-divergence vocabulary issue. |
| `Philosophy` (jeffrey theme) | `THEMES.md:23` | "Clear constraints beat clever hacks" |
| `Philosophy` (academic theme) | `THEMES.md:41` | "Simple HTML + CSS, no JavaScript unless necessary" |

### 2.6 Build / tooling vocabulary

| Term | Where defined | Meaning |
|---|---|---|
| `vite` | `vite.config.js:2`, `package.json:19`, `.mise.toml:5` | Build tool, v5 |
| `rollupOptions.input` | `vite.config.js:22-37` | The 11-page registry — the authoritative declaration of "what pages exist" |
| `dist/` | `vite.config.js:10`, `AGENTS.md:108`, `.claude/settings.json:22` | Build output; deny-listed for direct edit |
| `biome` | `biome.json:1`, `package.json:18` | Lint + format tool, v2.3.8 |
| `biome check` | `.github/workflows/deploy.yml:37` | Lint command in CI |
| `biome format` | `.github/workflows/deploy.yml:40`, `.claude/settings.json:33` | Format-check + format-write commands |
| `mise` | `.mise.toml`, `AGENTS.md:30-44` | Task runner + Node 24 pin |
| `mise run <task>` | `AGENTS.md:32-44`, `CLAUDE.md:16-17` | Task invocation pattern |
| `ci` (mise task) | `.mise.toml:40-42`, `AGENTS.md:48` | "lint + format-check + build" — the DoD gate |
| `dev` / `build` / `preview` / `lint` / `lint:fix` / `format` / `format:check` / `clean` / `deploy` / `ci` | `.mise.toml:4-42` | 10 task verbs |
| `dist/` artifact | `vite.config.js:10`, `.github/workflows/deploy.yml:70` | Build artifact uploaded to GitHub Pages |
| `Quality` / `Build Site` / `Deploy to GitHub Pages` | `.github/workflows/deploy.yml:20,42,72` | 3-job CI pipeline (job names) |
| `Code Quality` job | `deploy.yml:21` | Lint + format-check stage |
| `lint:fix` | `.mise.toml:20-22`, `AGENTS.md:38` | Auto-fix variant |
| `format:check` | `.mise.toml:28-30`, `AGENTS.md:40` | Read-only formatter check |

### 2.7 Agent / governance vocabulary

| Term | Where defined | Meaning |
|---|---|---|
| `agent` | `AGENTS.md:55-77` (whole AI-agent-tooling section) | External CLI (Claude Code) or IDE (Cursor) consuming this repo's instruction files |
| `skill` (Claude Code sense) | `AGENTS.md:62`, `.claude/skills/{fix-issue,review-diff,ship-small}/SKILL.md` | A slash-command workflow definition |
| `subagent` | `AGENTS.md:63,69`, `CLAUDE.md:35-42` | Claude Code's built-in `Task` tool (Explore, general-purpose); NOT a project-defined agent |
| `slash command` | `AGENTS.md:62` (`/fix-issue`, `/ship-small`, `/review-diff`), `CLAUDE.md:21-25` | Operator invocation pattern for a SKILL.md workflow |
| `Task tool` | `AGENTS.md:63`, `CLAUDE.md:35` | Claude Code's subagent dispatch mechanism |
| `plan mode` | `CLAUDE.md:8`, `AGENTS.md:68` | "explore → draft plan → get approval → implement" |
| `Plan before non-trivial work` | `AGENTS.md:68` | Non-trivial = touching >2 files or architectural judgment |
| `MCP` | `CLAUDE.md:10,27`, `AGENTS.md:61` | Model Context Protocol (acronym not expanded in either doc) |
| `context7` | `CLAUDE.md:10,27-33`, `AGENTS.md:61` | The single MCP server referenced; operator-installed not project-scoped per AAF-VGH-009 |
| `resolve-library-id` → `query-docs` | `CLAUDE.md:33`, `AGENTS.md:61` | 2-step protocol for using context7 |
| `Always` / `Ask first` / `Never` | `AGENTS.md:88-112`, `.cursor/rules/project.mdc:26-38` | 3-tier authority/policy taxonomy |
| `Definition of done` (DoD) | `AGENTS.md:46-53` | 6-bullet checklist gating completion |
| `triage map` | `AGENTS.md:130-139`, `.cursor/rules/project.mdc:53-61` | "Where to look first" table |
| `PostToolUse hook` | `.claude/settings.json:27-37`, `CLAUDE.md:48` | Auto-format hook fired after every Write/Edit |
| `allowlisted` / `denied` | `.claude/settings.json:3-25`, `CLAUDE.md:46-47` | Bash + Read/Write permission patterns |

### 2.8 Workflow / process vocabulary (the 3 SKILLs)

| Term | Where defined | Meaning |
|---|---|---|
| `fix-issue` | `.claude/skills/fix-issue/SKILL.md` | "Reproduce → Isolate → Fix → Verify → Visual check → Document" — 6-step bug workflow |
| `Reproduce` / `Isolate` / `Fix` / `Verify` / `Visual check` / `Document` | `.claude/skills/fix-issue/SKILL.md:7-12` | 6 workflow verbs |
| `review-diff` | `.claude/skills/review-diff/SKILL.md` | 9-item self-review checklist |
| `ship-small` | `.claude/skills/ship-small/SKILL.md` | "1–3 commits max", "no drive-by refactors", "one logical change per commit" — discipline rules |
| `mise run ci` | all 3 SKILLs + AGENTS.md L48 + CLAUDE.md L16 | The single quality gate; appears in 6+ files |
| `Conventional Commits` (`type(scope): description`) | `AGENTS.md:128`, `.claude/skills/fix-issue/SKILL.md:12` | Commit format; signed with GPG per AGENTS.md L128 |
| `Visual check` | `.claude/skills/fix-issue/SKILL.md:11`, `CLAUDE.md:17`, `AGENTS.md:51` | Manual operator check at desktop + 768px mobile |

### 2.9 Sandbox / experiments vocabulary

| Term | Where defined | Meaning |
|---|---|---|
| `experiments/` | `AGENTS.md:23,139`, `biome.json:4`, `.cursor/rules/html.mdc:39-41`, `.cursor/rules/project.mdc:61` | Out-of-build, out-of-lint sandbox |
| `prototype` | `AGENTS.md:23`, `.cursor/rules/html.mdc:41` | What goes in experiments/ |
| `safe to prototype freely there` | `.cursor/rules/html.mdc:41` | Lifecycle declaration: relaxed rules |
| `not deployed` | `AGENTS.md:23`, `.cursor/rules/project.mdc:61` | Lifecycle declaration: not in `rollupOptions.input` |
| `timeline-braid.html` / `timeline-prototype.html` / `page-idea.html` / `preview.html` | files in `experiments/` | Currently-prototyped pages (verified at HEAD) |
| `braid-timeline.src.svg` / `braid-timeline.svg` | `experiments/svg-src/`, `experiments/braid-timeline.svg` | Source-and-compiled SVG asset producing experience-page navigation |
| `themes/academic.css` | `experiments/themes/academic.css` | Out-of-deploy academic stylesheet — see Collision 4 |

### 2.10 Cross-repo content-pipeline vocabulary (CONSUMER end)

Per `../new-direction-2026/AGENTS.md` L131-142, the producer declares 6 source→destination mappings. On the consumer side here:

| Producer term (sibling repo) | Consumer surface (this repo) | Overlap |
|---|---|---|
| `CV-COMPREHENSIVE-EXTRACT.md` | `cv.html` (verified: title L6, h1 L40, 8 h2 sections at L50,69,98,108,134,148,156) | term overlap: "CV", "Curriculum Vitae", "Education", "Publications", "Technical Skills", "Academic Positions", "Teaching Experience", "Service & Leadership" |
| `PORTFOLIO-QUICK.md` | `index.html` hero/intro (verified: hero L38-66 + "Background" h2 L70) | term overlap: "Portfolio", "Background", "Approach" (the h2 cluster), bio paragraph at L44 |
| `ACTIVE-PROJECTS-PORTFOLIO.md` | `projects/*.html` (6 pages: dicee, maat, scopecam, budget-triage, flux, llm-gateway) | term overlap: the 6 project names listed §2.2 above |
| `RESEARCH-PUBLICATIONS.md` | `research/index.html` (h1 "Research & Publications" L35; 5 h2 sections at L40,60,84,147,169) | term overlap: "Research", "Publications", "Clinical Research", "Pure Mathematics", "Education" |
| `timeline-component-spec.md` | `experience/index.html` (h1 "Jeffrey Johnson" L50; 7 era-section h2 blocks at L273,411,450,492,531,570,608) | term overlap: "Experience", "era" (7 named eras: Synthesis, International, Deep Theory, Service, Identity, First Proofs, Work Ethic), "braid"/"timeline" |
| `TEACHING-INVENTORY.md` | `cv.html` (Teaching Experience section h2 L148) | term overlap: "Teaching Experience", "17+ different courses", "Largest teaching range at institution" L150 |

**Coverage:** all 6 source-document terms have corresponding consumer-side vocabulary in this repo's HTML (6/6). The producer→consumer term overlap is non-trivial but not verbatim — the website paraphrases. **Phase 4 will reconcile content-fidelity; Phase 1 just notes the vocabulary anchor pairs exist on both sides.**

---

## 3. Collisions detected

### Collision 1: Design-system spacing/typography/measure/file vocabulary (same-term-different-meaning) — AAF-VGH-002

The most material collision. Two governance documents declare mutually exclusive design systems.

| Surface | Authoritative claim (AGENTS.md + .cursor/rules) | Stale claim (DEV_GUIDE.md) |
|---|---|---|
| Spacing scale | `--space-1` .. `--space-5` (rem-based) — `AGENTS.md:116`, `.cursor/rules/project.mdc:42`, `.cursor/rules/css.mdc:24` | `--space-xs` (4px) .. `--space-2xl` (64px) (8-point grid) — `DEV_GUIDE.md:13-18` |
| Body typography | System sans-serif `ui-sans-serif, system-ui` via `--font` — `AGENTS.md:118`, `.cursor/rules/css.mdc:33` | "Serif (Georgia) for body text" — `DEV_GUIDE.md:22` |
| Content max-width | `--measure` 72ch — `AGENTS.md:119`, `.cursor/rules/css.mdc:28` | "1200px max-width container" — `DEV_GUIDE.md:34` |
| Primary accent | `--accent` hsl(212 85% 45%) — `AGENTS.md:117`, `.cursor/rules/css.mdc:18` | "Lapis blue #4C70A0" — `DEV_GUIDE.md:28` |
| Secondary accent | `--accent-2` hsl(160 55% 35%) green — `AGENTS.md:117`, `.cursor/rules/css.mdc:19` | "Gold #D4AF37 hover states" — `DEV_GUIDE.md:29` (no green) |
| Single stylesheet path | `assets/jeffrey.css` — `AGENTS.md:20,94`, `.cursor/rules/css.mdc:9`, `THEMES.md:7,58` | `assets/styles.css` — `DEV_GUIDE.md:52,62,118` (filename **does not exist**) |

**Collision type:** `same-term-different-meaning` (the term being "design system"; the variables and file paths conflict).

**Evidence DEV_GUIDE is stale, not the other way around:**
- `assets/jeffrey.css` exists at HEAD; `assets/styles.css` does not (verified via Glob `assets/*.css` — only `jeffrey.css` present).
- `THEMES.md:7,58` corroborates `jeffrey.css` is the current default.
- `.cursor/rules/css.mdc:9` ("All styles live in `assets/jeffrey.css`. Do not create additional CSS files.") is a hard rule enforced via auto-attach on `assets/**/*.css` glob.
- `CLAUDE.md:53` ("single CSS file (`assets/jeffrey.css`)") corroborates.
- The DEV_GUIDE.md file-tree at L40-58 references `research/maat.html` and `research/scopecam.html` — these paths do not exist (verified: `projects/maat.html` and `projects/scopecam.html` are the actual paths per `vite.config.js:30-31`). DEV_GUIDE.md describes a previous structure.

**Collision impact:** an agent reading DEV_GUIDE.md before AGENTS.md would write CSS against a non-existent file using a non-existent spacing scale referencing non-existent paths. The DEV_GUIDE.md surface is `documentation-about-prompts` per profile classification, but its drift IS itself a stale-authoring-artifact pattern.

**Recommendation boundary:** rename/supersede only after operator decision; alternative is deleting DEV_GUIDE.md or rewriting its design-system section to match AGENTS.md.

### Collision 2: `MAAT` positioning vocabulary (same-term-different-meaning) — AAF-VGH-001

Three distinct positional senses of the same term:

| Sense | Where | Evidence |
|---|---|---|
| (a) Operator-stated minor/experimental project | profile `known_debt[0]:1037-1056` ("operator-classified as minor/experimental"); profile `open_questions[0]:1103` | self-stated operator positioning |
| (b) Site-favicon-as-brand (visual flagship) | `assets/icons/maat_feather_16.svg` is the favicon on all 11 deployed pages and 1 experiment (12 total `maat_feather` occurrences verified via Grep) — `cv.html:8`, `index.html:8`, `contact.html:8`, all 6 `projects/*.html:8`, `experience/index.html:10`, `research/index.html:8`, `experiments/timeline-braid.html` | site-wide visual anchor |
| (c) Lead-paragraph "primary project" | `README.md:8-11` "two primary projects: MAAT Framework ... ScopeCam"; `index.html:44` (hero bio "distributed multi-agent systems (MAAT)"); `cv.html:83` ("MAAT Framework - Multi-Agent Orchestration"); `experience/index.html:326` ("project__name: MAAT Framework"); `research/index.html:141` (TCS section ties to MAAT); `projects/maat.html:48` h1 "MAAT Framework" + L93 "Exploring Questions" + L103 "Theoretical Foundation" | site-content treatment as flagship |

**Collision type:** `same-term-different-meaning` (the term's POSITIONING differs between operator-stated category and site-content treatment).

**Note on count:** the profile cites "17+ references"; the audit's HEAD grep yields 8 textual `MAAT` mentions in HTML + 12 `maat_feather` icon-asset references = 20 surface occurrences (verified at HEAD `ee6c7e5`). The 6eaa529 commit retained the prominence pattern per profile `meta.evidence_extensions[0].commits_added[1].notes`. Routed to Phase 8 for `stale-authoring-artifact` classification; Phase 10 prioritization weighted under `career-transition-readiness`. Phase 1 records the collision; the judgment is Phase 8's.

**Recommendation boundary:** rebalance is operator-deferred to remediation PR per profile L33-39; Phase 1 does not propose renames.

### Collision 3: Spacing vocabulary subcollision — `8-point grid` vs `rem-based scale`

Subset of Collision 1 but tracked separately because the term "8-point grid" recurs in `THEMES.md:36` as a description of the OTHER (academic) theme:

| Vocabulary | Meaning | Evidence |
|---|---|---|
| "Rem-based `--space-1` through `--space-5`" | The CURRENT jeffrey.css theme | `AGENTS.md:116`, `.cursor/rules/css.mdc:24` |
| "8-point grid `--space-xs` through `--space-2xl`" (DEV_GUIDE.md framing) | An ALLEGED current state | `DEV_GUIDE.md:13-18` (stale) |
| "8-point grid system" (THEMES.md framing) | A FEATURE of the academic theme (not current default) | `THEMES.md:36` |

DEV_GUIDE.md says the current state is "8-point grid". THEMES.md says the 8-point grid is a feature of the academic theme (`styles-academic.css`, which doesn't exist at the expected path). AGENTS.md + .cursor/rules say the current state is rem-based 5-step. **Three different documents, three different stories about the same concept ("the site's spacing system").** Routed to Phase 4 (contract inventory) — same routing as AAF-VGH-002.

### Collision 4: `theme` / `themes/` (same-term-different-meaning + path divergence) — AAF-VGH-012

| Sense | Where | Evidence |
|---|---|---|
| (a) `THEMES.md` declares multi-theme capability with two themes | `THEMES.md:1-3,5-41` | "This site supports multiple visual themes." |
| (b) The "current default" theme | `THEMES.md:7-23,120-122` | `assets/jeffrey.css` (verified present) |
| (c) The "academic theme" expected location | `THEMES.md:25-41,48,58-61` | `assets/styles-academic.css` — **not present at that path**; the sed-script at L48 would silently no-op |
| (d) The academic theme actual location | `experiments/themes/academic.css` (verified) | Lives in the OUT-OF-DEPLOY experiments/ sandbox; NOT in `assets/` |
| (e) `<link rel="stylesheet">` references in deployed HTML | all 11 deployed pages | All reference `/assets/jeffrey.css` only — confirmed via grep |

**Collision impact:** `THEMES.md` documents a switch-mechanism (sed-script L48) that targets a path (`assets/styles-academic.css`) where the file does not exist. The file with similar content does exist at a different path (`experiments/themes/academic.css`) which the sed-script doesn't reach. The documented capability does not work as written. Vocabulary overstates capability per AAF-VGH-012.

**Cross-reference:** Same-substance as Collision 3 (the "academic theme" is the home of the 8-point grid vocabulary that DEV_GUIDE.md mistakenly attributes to the current state). DEV_GUIDE.md may have been written when `styles-academic.css` (or a predecessor) was the default. **DEV_GUIDE.md describes a past state; THEMES.md describes an aspirational state; AGENTS.md + .cursor/rules describe the current state.**

### Collision 5: `HomeNetOps` (different-term-same-meaning + path absence)

| Sense | Where | Evidence |
|---|---|---|
| (a) Approach-card link target | `index.html:202-203` "HomeNetOps →" linking to `/experience/#alaska` | Visible navigation surface |
| (b) Anchor target in experience page | `experience/index.html:271` `<section id="alaska" ...>` "Synthesis" era | Where the link lands |
| (c) **No** dedicated `projects/homenetops.html` | verified: not in `vite.config.js:23-37` rollupOptions.input; not on disk | Asymmetry vs. the 6 other approach-cards which all link to a `projects/*.html` page |

**Collision type:** different-term-same-meaning (the visible "HomeNetOps" doesn't have a project page; it routes to an era-section instead) — plus a structural asymmetry. The 6 approach-cards present uniformly but one is wired differently. Recorded for Phase 2 (context-membership question: does HomeNetOps belong in portfolio-pages or experience?) and Phase 8 (operator-stated minor/experimental position vs. card prominence).

### Collision 6: `agent` vocabulary (same-term-different-meaning, low impact)

| Sense | Where | Meaning |
|---|---|---|
| (a) External CLI agent | `AGENTS.md:55-77` whole "AI agent tooling" section | Claude Code / Cursor — runs OUTSIDE the static site |
| (b) "Subagent" via Task tool | `AGENTS.md:63,69`, `CLAUDE.md:35-42` | Claude Code's built-in `Task` mechanism |
| (c) Conceptual "agent" in product names | `MAAT Framework - Multi-Agent Orchestration` (cv.html:83); `MAAT - Multi-Agent Adaptive Technology` (README:10); "Bicameral agent architecture" in index.html:108 ("architect agents", "builder agents", "auditor agents") | Product narrative — describes the SUBJECT of MAAT, not Claude Code |

The senses are operationally non-conflicting (no agent code runs in this static site; no LLM calls at runtime per profile `agent_surface.model_call_sites: []`). Recorded for completeness; not routed to Phase 2 or 4.

### Collision 7: `ci` and `build` (overloaded between repo-internal vs CI/CD)

| Sense | Where | Meaning |
|---|---|---|
| (a) `mise run ci` (operator-run local check) | `.mise.toml:40-42`, `AGENTS.md:48`, `CLAUDE.md:16`, all 3 SKILLs | "lint + format-check + build" — runs on a developer machine |
| (b) GitHub Actions `quality` job (~CI) | `.github/workflows/deploy.yml:20-40` | Runs lint + format on PR + push |
| (c) GitHub Actions `build` job (~build) | `.github/workflows/deploy.yml:42-70` | Runs vite build; uploads artifact |
| (d) `mise run build` | `.mise.toml:8-10`, `AGENTS.md:35` | Operator-run vite build |

These four are coherent (the GH Actions `quality` + `build` jobs roughly equal `mise run ci` on the hosted runner) but the vocabulary doesn't make that equivalence explicit anywhere. AGENTS.md L48 says "`mise run ci` passes" is the DoD; deploy.yml has 3 jobs (`quality`, `build`, `deploy`). An agent reasoning about "did CI pass?" needs to know they refer to the same gate-set. Low impact, recorded.

### Collision 8: `experiments/` placement of `themes/` (cross-collision with Collision 4)

`experiments/themes/academic.css` is in a directory documented as "out of CI" and "safe to prototype freely". `THEMES.md` documents `styles-academic.css` as a switchable theme as if it were a first-class capability. The same artifact is treated as both production-class (THEMES.md framing) and experimental (filesystem placement). Recorded for Phase 2 (does experiments-sandbox subsume the academic theme, or does the theme straddle two contexts?) and Phase 4.

---

## 4. Synonyms (different-term-same-meaning)

| Concept | Terms used | Citations |
|---|---|---|
| The 11-page registry | `entry points` / `pages` / `entries` / `rollupOptions.input` | `AGENTS.md:99,135` + `.cursor/rules/{project,html}.mdc` + `vite.config.js:22-37` |
| The single stylesheet | `single CSS file` / `single shared stylesheet` / `assets/jeffrey.css` / `the stylesheet` | `AGENTS.md:20,94` + `THEMES.md:7,58` + `.cursor/rules/css.mdc:9` + `CLAUDE.md:53` |
| The mobile-nav toggle | `mobile menu` / `nav-toggle` / `assets/menu.js` / `mobile nav` | `assets/menu.js:14-61` + `AGENTS.md:21,133` + `.cursor/rules/project.mdc:12,56` |
| The 768px breakpoint | "mobile" / "mobile breakpoint" / "responsive" / "768px breakpoint" / `--measure` adjacency | `AGENTS.md:119,51` + `CLAUDE.md:17` + `.cursor/rules/css.mdc:29` + `assets/menu.js` references nav-links class |
| The DoD gate | `mise run ci` / "CI" (local sense) / "the gate" / "lint + format-check + build" | 6+ files; see Collision 7 |
| Operator-rules memory | `.claude/settings.json` / "Claude settings" / "allowlisted / denied" / "permissions" | `CLAUDE.md:44-48` + profile `agent_surface.memory_surfaces_detected[0]` |
| Conventional commits | `Conventional format` / "type(scope): description" / "fix(scope): description" / "signed with GPG" | `AGENTS.md:128` + `.claude/skills/fix-issue/SKILL.md:12` |
| Sandbox prototyping | `experiments/` / "prototypes" / "safe to prototype freely" / "not deployed" | `AGENTS.md:23,139` + `biome.json:4` + `.cursor/rules/html.mdc:39-41` + `.cursor/rules/project.mdc:61` |
| Cross-repo source-of-truth | "content source" / "presentation layer" / "consumer" / "source documents → website destinations" | `../new-direction-2026/AGENTS.md:131-142` + this repo's profile `external_services[2]` |

Most are stylistic. The ones that matter for the architecture are (a) "mise run ci" vs the deploy.yml job names and (b) the stylesheet-naming triplet (`jeffrey.css` / `styles.css` / `styles-academic.css`) which is the substance of Collisions 1 and 4.

---

## 5. Term route table → downstream phases

| Term / Collision | Routed to | Reason |
|---|---|---|
| Collision 1 (design-system contradiction) | Phase 2, Phase 4, Phase 8 (AAF-VGH-002) | Context-boundary: agent-governance owns the contradictory docs. Contract inventory: design-system as policy-bearing contract. Policy/prompt: DEV_GUIDE.md is `stale-authoring-artifact`. |
| Collision 2 (MAAT positioning) | Phase 8 (AAF-VGH-001) | `stale-authoring-artifact` and possibly `contradictory-guidance` per §8.0 surface classification. Phase 10 weights under career-transition-readiness. Phase 1 records collision only. |
| Collision 3 (spacing-vocabulary subcollision) | Phase 4 (with Collision 1) | Same routing as AAF-VGH-002. |
| Collision 4 (`theme` / `themes/` path divergence) | Phase 2, Phase 4, Phase 8 (AAF-VGH-012) | Context-boundary: does experiments-sandbox subsume `experiments/themes/`? Contract: THEMES.md as overstated capability. Policy/prompt: THEMES.md is `stale-authoring-artifact` for a not-built feature. |
| Collision 5 (HomeNetOps asymmetry) | Phase 2, Phase 8 | Context membership: experience or portfolio-pages? Stale-authoring-artifact candidate (operator confirmed in profile open_questions). |
| Collision 6 (`agent` overloaded — low impact) | Phase 8 (low priority) | Documentation-about-prompts; not routed to Phase 2/4. |
| Collision 7 (`ci`/`build` overloaded) | Phase 9 (evals/quality gates) | The DoD gate-naming consistency is a Phase 9 question, not a Phase 1 fault. |
| Collision 8 (`experiments/themes/` cross-collision) | Phase 2, Phase 4 | Bounded-context membership of `experiments/themes/academic.css` is ambiguous. |
| MAAT-favicon-on-every-page surface count | Phase 8 (AAF-VGH-001) | 12 file references confirmed at HEAD (11 deployed + 1 experiment); reinforces site-favicon-as-brand sense in Collision 2. |
| README copyright year `2025` | Phase 8 (AAF-VGH-004) | `stale-authoring-artifact` — small but vocabulary-relevant. |
| Cross-repo content-pipeline source-document terms | Phase 4 (AAF-VGH-008) | Producer-consumer contract check; vocabulary anchors confirmed present on both sides (6/6); fidelity check is Phase 4. |

---

## 6. Cross-repo content-pipeline vocabulary overlap summary

Per the operator directive: "how many of the 6 source-document terms have corresponding consumer-side vocabulary in this repo's HTML?"

**Result: 6 of 6.** Every source document declared in `../new-direction-2026/AGENTS.md:133-142` has a corresponding consumer-side h1/h2/title surface in this repo's HTML. Detailed mapping is §2.10 above. Phase 4 reconciles content-fidelity; Phase 1 confirms the vocabulary anchor pairs exist on both sides.

| # | Sibling source document | This repo's destination | Anchor surface verified |
|---:|---|---|---|
| 1 | `CV-COMPREHENSIVE-EXTRACT.md` | `cv.html` | title L6 + h1 L40 + 8 h2 sections |
| 2 | `PORTFOLIO-QUICK.md` | `index.html` hero/intro | hero L38-66 + Background h2 L70 + Approach h2 L99 |
| 3 | `ACTIVE-PROJECTS-PORTFOLIO.md` | `projects/*.html` | 6 pages all with h1 at L48 |
| 4 | `RESEARCH-PUBLICATIONS.md` | `research/index.html` | h1 L35 + 5 h2 sections |
| 5 | `timeline-component-spec.md` | `experience/index.html` | h1 L50 + 7 era h2 sections |
| 6 | `TEACHING-INVENTORY.md` | `cv.html` Teaching section | h2 L148 |

Vocabulary drift to monitor in Phase 4: project-name granularity (sibling lists 6 active projects; this repo's `projects/` has all 6 pages — matched), era-name granularity (sibling's timeline-component-spec.md vs the 7 era-sections — to be checked).

---

## 7. Exit check (audit spec §7 Phase 1)

- [x] Every extracted term has at least one citation (full inventory in `01-vocabulary.json` with path+lines+evidence+method per §8.1).
- [x] Every collision candidate has citations for each conflicting use (8 collisions, each with ≥2 evidence rows).
- [x] Unsupported terms are removed or marked `unclassified` (no unsupported terms — every term cited above is verified at HEAD `ee6c7e5`).
- [x] AAF-VGH-002 (DEV_GUIDE.md vs AGENTS.md contradiction) recorded as a collision (Collision 1, the highest-impact entry).
- [x] AAF-VGH-001 (MAAT positioning conflict) recorded as a collision (Collision 2).
- [x] AAF-VGH-012 (THEMES.md overstated capability) recorded as a collision (Collision 4).
- [x] Cross-repo content-pipeline vocabulary overlap quantified (§6: 6/6).
- [x] Boundaries honored: no definitions inferred from filename alone; no rename proposals; no collapse of technical terms into domain terms.

Phase 1 exit check **passes**. Advancing to Phase 2 (bounded context mapping).

---

## 8. Term + collision counts (for summary)

| Category | Count |
|---|---|
| Concept clusters surveyed | 10 (§2.1–§2.10) |
| Distinct terms surfaced (cited in §2 tables) | 110+ (full enumeration in `01-vocabulary.json`) |
| Distinct project-name terms | 6 (`MAAT`, `ScopeCam`, `Dicee`, `Budget Triage`, `Flux Pro Shop`, `LLM Gateway`) |
| Distinct workflow-verb terms | 16 (`Reproduce`, `Isolate`, `Fix`, `Verify`, `Visual check`, `Document`, `dev`, `build`, `preview`, `lint`, `lint:fix`, `format`, `format:check`, `clean`, `deploy`, `ci`) |
| Distinct design-system variable terms | 13 (`--space-1`..`--space-5`, `--ink`, `--paper`, `--muted`, `--accent`, `--accent-2`, `--border`, `--shadow`, `--shadow-hard`, `--radius`, `--radius-sm`, `--measure`, `--font`, `--mono`) |
| Collisions detected | **8** (3 material + 5 advisory) |
| Material collisions (Phase 2/4/8 routing) | 5 (Collisions 1, 2, 3, 4, 5) |
| Advisory collisions (Phase 8/9 low-priority routing) | 3 (Collisions 6, 7, 8) |
| Synonym clusters detected | 9 (§4 table) |
| Cross-repo vocabulary anchor pairs verified | 6/6 (§6) |
