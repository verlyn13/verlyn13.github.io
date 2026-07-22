---
title: Website coherence, consistency, clarity, organization, posture, and tone audit
category: audit
component: site-wide
status: active
version: 1.0.0
last_updated: 2026-07-21
tags: [audit, content, information-architecture, posture, tone, accessibility, consistency]
priority: high
audience: operator + coding agent + design agent
---

# Website coherence, consistency, clarity, organization, posture, and tone audit

## Executive finding

The site has strong material. The primary projects are specific, the maturity boundaries are unusually
honest, and the new candidate headline is direct. The site does not yet read as one finished editorial
system.

The main problem is contradiction, not empty promotion. The hand-authored homepage, resume, and stronger
case studies have moved ahead of the generated Work page, public feed, social card, `llms.txt`, Colophon,
and parts of Experience. The second problem is excess explanation. Repeated evidence language,
operational detail, negative claim lists, and duplicate actions make the work harder to see.

The target posture should be:

> State what was built. Show the best proof. Name the relevant limit once. Stop.

## Audit boundary

This is a findings document only. No website content, feed, style, metadata, script, generated output, or
deployment change was made as part of this audit.

The audit covered:

- all 17 Vite entry points, including the generated Work index;
- the four public Markdown resources and `public/llms.txt`;
- all 16 committed HTML-to-Markdown page mirrors;
- the project feed, feed model, and Work-page generator;
- the shared stylesheet, design tokens, active design documentation, and page-specific markup;
- live production content at `https://jvjohnson.dev`;
- current public evidence links for Budget Triage, Host Capability Substrate, Agentic Architecture Audit,
  Eval Lab, and Dicee;
- the current dirty working tree as the candidate site.

Audit state:

- `HEAD` and `origin/main`: `8e97e84371d3a149f66c3ff1cdcdd89f7e36a754`
- pre-existing dirty worktree: 14 modified files, preserved without alteration
- production still presents the older "Reliable Agentic Development" headline
- the working tree presents the newer "Building infrastructure for model evaluation and agent systems"
  headline
- the Budget Triage public repository was verified as public, MIT-licensed, and current on 2026-07-21

The in-app browser was unavailable. Screenshot-based desktop, 768 px, and 360 px review is therefore not
claimed. Source-level responsive review, semantic parsing, live HTTP checks, link resolution, local gates,
and build-system inspection were completed.

## What is already strong

- The candidate headline claims work instead of adopting an unheld job title.
- Host Capability Substrate, governance and agent control, and Agentic Architecture Audit form a credible
  foundation layer.
- ScopeCam clearly separates source checks, device evidence, client-alpha delivery, compatibility, and
  production readiness.
- Budget Triage's candidate copy correctly separates a public source snapshot, private active development,
  deployment, certification, and contribution policy.
- The project pages generally place evidence limits near claims.
- Structured Person data does not use an unheld `jobTitle`.
- All authored root-relative page links and fragments resolve in the current workspace.
- Static heading order, skip-link targets, ARIA references, and duplicate IDs passed the audit script.
- The content mirror, token freshness, status contrast, provenance, lint, format, and 50 unit tests pass.

Preserve these strengths. The next pass should edit for hierarchy and restraint, not add more proof language.

## Priority findings

### P0. Correctness and public-truth defects

#### F01. The 2023 publication page range is wrong

Severity: critical credibility defect
Owner: website content + operator fact confirmation

The site gives the Pediatric Physical Therapy article as `35(3):326-331` in:

- `research/index.html:76`
- `cv.html:267`
- `public/content/resume.md:185-187`
- `public/content/resume-ai-scanner.md:245-247`
- the CV and Research Markdown mirrors

PubMed PMID 37071880 and DOI `10.1097/PEP.0000000000001015` give `35(3):314-320`.

The contribution wording also drifts:

- `index.html:104`: led the statistical analysis
- `research/index.html:80`: statistical analysis and methodology
- `public/content/resume-ai-scanner.md:245-247`: statistical analysis

Direction: correct the page range on every public surface in one change. Confirm one supportable contribution
statement and use it consistently.

Acceptance: DOI, volume, issue, pages, author order, and contribution wording agree everywhere.

#### F02. The generated Work page contradicts current project pages

Severity: critical public-truth defect
Owner: upstream feed for project records; website generator for wrapper copy

The checked-in public feed is a 14-project artifact generated on 2026-06-29. `docs/index.md:37-41` records
an accepted 15-project upstream feed whose website delivery is still pending.

Material contradictions:

- Flux is a working prototype in `public/data/projects.json:281-299` and `projects/index.html:75-86`, but
  production-live in `projects/flux.html:60,87`.
- The Work page says Flux compiles an intent and uses content-addressed storage. The detail page says there
  is no compiler or IR and that output keys are run-scoped at `projects/flux.html:88,94`.
- Budget Triage remains pre-public-flip in the feed, while its hand-authored page now links a public source
  snapshot.
- Symmetry Groups is an implemented, axiom-tested game in `projects/index.html:146-155`, while
  `projects/symmetry-groups.html:60,76,85-89` withholds every present capability claim.
- HCS "gives every agent" audited execution in `projects/index.html:91-99`, while its detail page limits
  the evidence to the typed model and source boundaries at `projects/host-capability-substrate.html:109-112`.
- The Work page renders "post academic transition" as a recurring method even though the academic
  appointment continues.
- The Work page claims five languages while describing a Rust/WASM system that the feed records only as
  TypeScript.

Direction: deliver the accepted feed through the separate feed-only path. Do not hand-edit
`projects/index.html`. Fix website-owned heading, description, footer, and social metadata in
`build-feed.mjs` separately. Compare every regenerated status and thesis against its detail page.

Acceptance: no generated status, thesis, technology, or maturity label contradicts its detail page.

#### F03. Public identity surfaces still use retired or unheld labels

Severity: high
Owner: website content + social asset

The live social card and its reproducible source say "Evaluations and agent-governance engineer":

- `assets/og/og-default.svg:22-28`
- `public/og-default.png`
- `build-feed.mjs:134-139`
- `projects/index.html:22-27`
- `public/llms.txt:36-37`

This conflicts with `docs/index.md:20-25` and `AGENTS.md:109-110`, which say headlines claim the work and
do not use an unheld occupational label as identity.

The social card also uses the retired blue palette and the abstract line "Measurable, governable, and
auditable AI-assisted work." Several authored pages use the older "Reliable Agentic Development" social
image alt text, while others use the new headline, name-only text, or "portfolio."

Direction: use the held work claim on the card, simplify its supporting copy, rebuild the PNG from the SVG,
update the generated Work template, update `llms.txt`, and normalize image alt text.

Acceptance: the visible card, SVG source, PNG, page metadata, Work template, and `llms.txt` use one current
identity and current palette.

#### F04. The Colophon presents target automation as routine current operation

Severity: high honesty defect
Owner: website content

`colophon.html:56,60,63,88,103-114` says a scheduled job currently regenerates the feed, suppresses no-op
changes, and opens a draft change. Current operating docs say the website consumes an approved copy,
accepted feed delivery is pending, and policy auto-publish remains future state. See `docs/index.md:34-41`
and `docs/project-intelligence.md:122-134`.

Direction: describe the verified current producer, delivery, operator-review, and deploy path. Label any
unwired or conditional automation as planned.

Acceptance: every present-tense operational statement has current evidence.

#### F05. Experience contains conflicting facts and damaged punctuation

Severity: high
Owner: operator fact confirmation + website content

- First computer: 1995 at `experience/index.html:260`; 1996 at `experience/index.html:575,580`.
- "Thirty years" at `experience/index.html:255,261,394`; the displayed timeline runs from 1992 to 2026.
- Earlier punctuation cleanup appears to have created malformed compounds:
  `New Brunswick-algebraic`, `school-one`, `Systems-stochastic`, `mathematics-the`, and `begins-and` at
  `experience/index.html:460-461,483-486,513-516,543-544,581`.

Direction: verify the year. If it cannot be proven, use "the mid-1990s." Use "more than thirty years."
Repair each damaged sentence by hand.

Acceptance: no contradictory dates and no punctuation-created compounds remain.

### P1. Primary reader-experience defects

#### F06. The homepage repeats actions and delays its best evidence

Severity: high information-architecture defect
Owner: website content; ask first if navigation structure changes

The hero presents six actions at `index.html:117-142`. The next section repeats the same resume choices in
a complete resume-format module at `index.html:146-189`. The academic study appears in the hero and again
near the end. The result is a 1,037-word landing page whose strongest public evidence begins only after the
visitor passes duplicate resume controls and a dense skills list.

Direction: keep one compact resume action cluster. Keep one academic proof statement. Let the foundation
evidence appear sooner. Do not add another module.

Acceptance: one clear primary action, one resume-format surface, and one academic proof statement on the
home page.

#### F07. Claim discipline has become defensive posture

Severity: high tone and clarity defect
Owner: website content

The project template repeats "What is this?", "What is it for?", "How is it used?", "Why does it matter?",
"Evidence and status", and a long negative claim list. The homepage repeats the same pattern for its lead
examples. See `index.html:230-281` and the project pages at `projects/dicee.html:65-96`,
`projects/flux.html:65-95`, and `projects/scopecam.html:65-96`.

Honesty is a strength, but exhaustive denials make the site sound anxious. Some lists deny claims a normal
reader would not infer.

Direction: use four elements per project: direct summary, strongest proof, important technical decision,
and one relevant limit. Keep deeper evidence on the detail page.

Acceptance: each maturity boundary is stated once, beside the claim it limits.

#### F08. Experience makes ChatGPT the source of the engineering transition

Severity: high posture defect
Owner: website content

`experience/index.html:260,295-302` says AI tools made coding less of a barrier, centers "the first
ChatGPT," and claims to have been "riding the front wave." `experience/index.html:394-395` closes with
the broad claims "see systems clearly" and "build things that work."

This is exactly the posture the public narrative contract rejects. Tools should be instruments inside the
system, not the source of the contribution or the evidence of expertise.

Direction: describe the ScopeCam engineering problem, the development responsibilities taken on, and the
controls later built around coding agents. Remove product-history and wave-riding language.

Acceptance: Experience explains engineering growth through work and responsibility, not tool novelty.

#### F09. The Research page mixes research, study, mentoring, education, and credentials

Severity: medium-high organizational defect
Owner: website content; ask first if site map changes

Current agent-systems and evaluation research gets a short, unlinked overview at
`research/index.html:58-67`. Informal theoretical-computer-science study occupies
`research/index.html:112-170` and says broad topics directly inform implementation. Education and
continuing education repeat resume material at `research/index.html:173-202`.

Direction: center the page on current research questions, linked public methods, publications, and verified
results. Move coursework and exploratory study to Experience or Resume, or compress them into background.

Acceptance: a reader can distinguish publication, current research, independent study, mentoring, and
education without inference.

#### F10. Budget Triage reads like an internal handoff

Severity: medium-high clarity defect
Owner: website content

`projects/budget-triage.html:87-107` exposes Phase 3b, Phase 4, current-main wording, exact-tree publication
ceremony, specialist-agent process, 125 migrations, 85 ADRs, and 34 gates. The ten-item denial list at line
95 further hides the actual employer-facing result.

Direction: keep the public snapshot link, one result, two or three concrete controls, and one concise
limitation. Move audit-history and release-ceremony detail out of the first public layer.

Acceptance: the page explains the product, the engineering contribution, the proof, and the limit before
internal process vocabulary appears.

#### F11. Identity and skills labels drift across surfaces

Severity: medium
Owner: website content

Identity variants include:

- Independent Systems Builder
- Independent systems engineer and researcher
- backend-oriented systems researcher
- self-directed systems researcher

Experience labels Go, Rust, React, and Terraform as "Technical Proficiency." Homepage skills omit several
of those tools. The resume omits Go and Rust and uses OpenTofu rather than Terraform.

Direction: describe the work instead of inventing multiple quasi-titles. Establish one evidence-backed
skills taxonomy with primary, working, and project-specific experience.

Acceptance: identity and proficiency labels do not change with the page template.

#### F12. Some words imply more independence or scale than the evidence shows

Severity: medium posture risk
Owner: website content

- "Independent verification" can read as third-party review when the work was recomputed by a separate
  verifier written within the same program.
- "Verified implementation" does not name whether verification is CI, source review, or third-party review.
- Flux uses "production-live" for a private, unlinked operator system while withholding scale, traffic,
  adoption, and some provider wiring.

Direction: use "recomputed by a separate verifier," "CI-verified public implementation," and "active private
operator deployment" where those are the actual evidence classes.

Acceptance: validation terms name the observer and evidence class.

#### F13. The research statement and Contact page overcorrect in opposite directions

Severity: medium tone defect
Owner: website content

The research statement says the current tenured professor is one "by background" and closes by asking for
"supervised, serious work" at `public/content/research-statement.md:101-108`. That undersells current
responsibility. Contact says "I will share whatever you need" at `contact.html:58`, which overpromises
disclosure.

Direction: state the current professorship accurately. Say the methods should be tested within a larger team
and under production constraints. Offer references and public-safe project context when appropriate.

Acceptance: candid limits remain, without neediness or unlimited promises.

### P1. Technical and design-system defects

#### F14. Experience bypasses the single-stylesheet and minimal-JavaScript contracts

Severity: high conformance and maintenance defect
Owner: website code; design changes are ask-first

`experience/index.html:73-224` contains a large SVG-local style block with raw colors, pixel values, type
sizes, and motion rules. `experience/index.html:642-708` contains an inline third script. There is also an
inline `style` attribute at `experience/index.html:393`.

This conflicts with `AGENTS.md:121,137-139` and `design/DESIGN_SPEC.md:76-81`. The current conformance gate
checks `assets/jeffrey.css` and therefore reports green while missing this page-local styling.

Direction: move component styles into `assets/jeffrey.css`, replace raw values with semantic tokens, and
either remove the script or obtain explicit approval for a small named asset. Extend conformance checks to
HTML style blocks and attributes.

Acceptance: no page-local CSS, raw colors, inline style attributes, or unapproved third script remains.

#### F15. Experience places its title and introduction outside `main`

Severity: medium semantic and mirror defect
Owner: website code

The Experience H1, interactive braid, and visible introduction appear before `<main>` at
`experience/index.html:59-264`; `<main>` starts at line 272. The skip link therefore bypasses the page title
and introduction. The Markdown mirror also starts at Synthesis and omits the visible introduction.

Direction: include the page title and visitor-facing introduction in the main content boundary, while
preserving the established visual layout.

Acceptance: the H1 is inside `main`, the skip target lands before the title, and mirror coverage is
intentional.

#### F16. The candidate Budget Triage footer introduces an undefined component class

Severity: medium candidate-only defect
Owner: website code

`projects/budget-triage.html:162` uses `class="secondary-link"`, but no `.secondary-link` rule or documented
component exists. The same change makes the external source link the filled primary action, while the active
design contract specifies "Email me about this" as the project footer's filled primary action and
`.section-link` for secondary actions. See `design/DESIGN_SPEC.md:53-54` and
`docs/design-system.md:262-268`.

Direction: choose the intended action hierarchy, then use documented component classes. A change to the
named project-footer pattern is ask-first.

Acceptance: all actions use existing component classes and the documented primary-action rule.

#### F17. Badge vocabulary and semantics are not coherent

Severity: medium
Owner: website code; token or pattern changes are ask-first

The site carries three badge systems: `.project-status`, `.badge--*`, and dead `.status-badge` or
`.tech-badge` rules. Experience uses `.badge--development` for topical labels such as Evaluation,
Governance, and Applied evidence. HCS uses the development status color for "Public repository" and
"Verified implementation."

Direction: keep one status system, use status colors only for status, and use neutral labels for categories.

Acceptance: each color has one documented meaning and each visible status class matches its text.

#### F18. Keyboard, motion, and navigation controls have confirmed gaps

Severity: medium accessibility defect
Owner: website code

- Experience gives both each SVG hit rectangle and each visible label a `data-era` value, then the script
  makes both sets keyboard links at `experience/index.html:649-660`. This creates 14 focus stops for seven
  destinations and exposes machine-style names such as `peacecorps`.
- The Experience script explicitly requests smooth scrolling at `experience/index.html:662-667,704-706`
  and `752-759`. The CSS reduced-motion rule does not cancel JavaScript `behavior: 'smooth'`.
- The mobile navigation toggle is `32px` by `32px` at `assets/jeffrey.css:178-189`, below the documented
  `44px` minimum target.
- The current navigation item is marked only with `.active`; neither source nor `assets/menu.js` applies
  `aria-current="page"`.
- External-link labelling is inconsistent with the repository contract. Contact and Dicee omit ARIA labels
  that comparable HCS links provide.

Direction: provide one focusable control per timeline destination, respect reduced motion in script, enlarge
the menu target, expose `aria-current`, and normalize external-link semantics.

Acceptance: seven timeline destinations produce seven clear focus stops; scripted motion follows user
preference; navigation targets meet the documented size; current-page state is programmatic.

#### F19. Responsive and visual behavior still needs direct review

Severity: unverified risk, not a confirmed defect
Owner: visual QA

The Experience braid forces a `700px` minimum width inside a horizontally scrolling container below 640 px.
The homepage has six hero pills and dense content. The Work page contains long generated theses. These are
credible mobile-density risks, but screenshot-based review was unavailable.

Direction: review at desktop, 768 px, and 360 px with the real candidate build. Check focus order, mobile
navigation, braid discoverability, long-link wrapping, CTA hierarchy, and project-row density.

Acceptance: visual evidence is recorded for all required widths, with no horizontal page overflow.

### P2. Controlled-vocabulary and consistency cleanup

#### F20. The explicit no-em-dash requirement is not met

Severity: high because it is an explicit operator requirement
Owner: website content + upstream feed for feed-owned prose

Current count:

- 70 em-dash characters in deployed HTML
- 17 em-dash characters in `build-feed.mjs`
- additional mirrored occurrences in `docs/content/pages/`
- none in `public/content/*.md`

Major surfaces: the generated Work page, CV role lines, Research metadata and education lists, social
metadata, project titles, the 404 page, and the Colophon.

Direction: rewrite sentences manually with periods, commas, colons, parentheses, or separate labels.
Do not run a blind character replacement. The malformed Experience compounds show why mechanical removal
is unsafe. Change generator and upstream sources before generated output and mirrors.

Acceptance: zero em-dash characters in public source, public Markdown, generator templates, accepted feed
prose, and generated output.

#### F21. Core vocabulary and metadata need one closed set

Severity: medium
Owner: website content + generator

Normalize:

- `model evaluation` for the field, rather than alternating with `model evaluations`;
- `agent systems` for the system category;
- `agent-assisted development` for the method;
- `Agentic-Coding Evaluation Lab` only as a proper project name;
- one choice among `agent governance`, `agent-control`, and `agent-governance` for each defined concept;
- `Resume` for controls, rather than mixing resume and résumé;
- `real-time` rather than realtime;
- one public display name for Dicee;
- one date-range style on human-facing pages;
- one degree label and one `Ph.D.` style.

The generated Work footer also uses a different role list from the rest of the site. Social-image alt text
has several obsolete variants. The phrase "full body of work" is too strong while the feed is stale and
coverage is undefined.

Acceptance: a controlled-vocabulary search returns only the approved form, except in historical documents
and proper names.

#### F22. Public evidence should link to the proof it claims

Severity: low-medium
Owner: website content

The site says Dicee has public source, and the public `verlyn13/dicee` repository exists, but the Dicee case
study and feed provide only the deployment link. HCS, Budget Triage, Agentic Architecture Audit, and Eval Lab
link their public proof more directly.

Direction: add the verified Dicee repository link where public source is claimed, or narrow the claim to the
public deployment.

Acceptance: each "public source" claim has a direct source link.

#### F23. Sitemap and public-resource ownership need current declarations

Severity: low-medium
Owner: website content + build operations

`public/sitemap.xml` reports `2026-07-15` for every entry, while the candidate Home, Resume, Experience,
and Budget Triage sources are refreshed on 2026-07-21. The public Summary and Research Statement Markdown
files are not linked from an authored page, `llms.txt`, or the sitemap.

The cross-repo Eval Lab methodology path is not a defect. It was verified live as HTTP 200 even though its
source is outside this checkout. Its cross-repo ownership should remain explicit.

Direction: update sitemap dates only for materially changed pages. Decide whether Summary and Research
Statement are intentional direct-only resources or public navigation surfaces, then document and link them
accordingly.

Acceptance: sitemap dates describe the deployed revision, every public Markdown resource has an intentional
discovery policy, and cross-repo routes remain live-verified.

## Recommended remediation sequence

### Batch 1: restore public truth

1. Correct the publication citation and contribution wording.
2. Remove the unheld title from the social card, generated metadata, and `llms.txt`.
3. Deliver the accepted feed through the feed-only path.
4. Reconcile the Colophon with current automation.
5. Resolve Experience dates and punctuation damage.

### Batch 2: simplify the primary narrative

1. Remove duplicate homepage actions and repeated biography.
2. Shorten the project template and keep one relevant limit per claim.
3. Rewrite the Experience opening around engineering work, not ChatGPT chronology.
4. Reorganize Research around actual research outputs.
5. Simplify Budget Triage for an employer-facing reader.

### Batch 3: normalize the public system

1. Establish the controlled vocabulary.
2. Remove em dashes manually and source-first.
3. Normalize footers, social metadata, project names, degree labels, and dates.
4. Reconcile identity and skills claims.

### Batch 4: repair component and accessibility drift

1. Bring Experience CSS and behavior back inside the project contract.
2. Move the Experience title and introduction into `main`.
3. Resolve the Budget Triage action hierarchy and undefined class.
4. Consolidate badge semantics.
5. Expand conformance coverage so HTML-local styles cannot bypass the gate.

### Batch 5: prove the result

1. Run `npm run content:pull` only for changed authored pages.
2. Run `mise run ci` and `npm test`.
3. Build the generated Work page and inspect it against every detail page.
4. Review desktop, 768 px, and 360 px renders.
5. Verify live production only after an approved PR is merged and Pages deployment completes.

## Completion criteria for the later remediation

- zero material contradictions between homepage, resume, Work feed, detail pages, metadata, and downloads;
- zero em-dash characters in public surfaces and their sources;
- zero unheld occupational labels used as identity;
- one concise evidence boundary per claim;
- one resume action surface on the homepage;
- one controlled vocabulary for the core message;
- accurate publication metadata;
- no page-local styles, raw colors, or unapproved scripts;
- full local gates and visual QA recorded;
- production content verified after deployment.

## Verification evidence from this audit

Passed:

- `git diff --check`
- authored internal page and fragment resolution
- `npm run provenance`
- `npm run lint`
- `npm run format:check`
- `npm run content:check`
- `npm run conformance`
- `npm run tokens:check`
- `npm test` with 50 passing tests

Not claimed:

- screenshot-based desktop or mobile visual approval
- a clean working tree
- deployment of the candidate copy
- completion of any remediation in this report
