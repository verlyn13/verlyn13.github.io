---
title: Resume and skills landing-page handoff
category: implementation-handoff
component: landing-page
status: implemented
version: 1.0.1
last_updated: 2026-07-15
tags: [landing-page, resume, portfolio, direction, handoff]
priority: high
audience: website implementation agent
---

# Resume and skills landing-page handoff

## Purpose

Adapt `jvjohnson.dev` toward the current career direction without rebuilding the
site concept from scratch. The homepage should become a clear resume, skills,
and evidence entry point. Older site sections can remain available, but they
must not distract from the landing page's current job: making Jeffrey Johnson's
fit legible for evals, agent-security, safeguards, control, and governance
engineering roles.

> **Implementation status (2026-07-15):** The baseline landed on July 7. This document now preserves
> the implemented direction; the "Current mismatch" section below is the pre-implementation snapshot,
> not current site state. Current refinements route through `docs/index.md`.

This is the implemented-direction record for this website repo.

## Source authority

Direction lives in `../new-direction-2026`; this repo is the presentation layer.
Use these upstream files as the factual and messaging source:

- `../new-direction-2026/career-transition-ready/website-content/primary-portfolio-direction.md`
- `../new-direction-2026/career-transition-ready/website-content/website-agent-landing-page-handoff.md`
- `../new-direction-2026/career-transition-ready/cv-current/evals-governance-resume.md`
- `../new-direction-2026/career-transition-ready/professional-narrative/application-targeting-strategy.md`
- `../new-direction-2026/career-transition-ready/technical-projects/governance-security-case-study.md`

If this handoff conflicts with those direction files, the upstream
`new-direction-2026` files win for messaging.

Website-specific implementation constraints still come from this repo:

- `AGENTS.md`
- `docs/index.md`
- `docs/markdown-mirror.md`
- `design/DESIGN_SPEC.md`
- `docs/design-system.md`

## Current mismatch

As of this handoff, `index.html` still presents the older homepage direction:

- headline: "Independent researcher and systems builder";
- selected work: Budget Triage, Flux, Dicee;
- primary approach cards: Agentic governance, deterministic game engine, AI
  image-generation control plane;
- current copy: "Now · Q2 2026";
- skills summary: broad systems / architecture / infrastructure / theory bands.

That material is not wrong as historical/supporting context, but it no longer
leads with the best application strategy. The landing page should now lead with
resume clarity, skills, and the two portfolio pillars.

## Current direction

Use this headline pair unless the operator changes it:

> Evaluations and agent-governance engineer.
>
> I pair probabilistic AI tooling with deterministic, machine-checkable
> verification.

Use this short summary as the homepage anchor:

> Ph.D. mathematician and backend-oriented systems builder focused on agentic AI
> evaluation, governance, and systems engineering. My current portfolio has two
> pillars: an Agentic-Coding Evaluation Lab for empirical model and harness
> evaluation, and an anonymized governance/security case study for agent
> authority, policy-as-code, safeguards, and evidence-first audit.

The broader identity can remain "mathematical researcher and systems builder,"
but it should be supporting context, not the homepage headline.

## Landing-page requirements

The first screen or immediately-following section should communicate:

1. Jeffrey V. Johnson, Ph.D.
2. Evaluations and agent-governance engineer.
3. The one-line machine-checkable verification pitch.
4. Resume / CV entry point.
5. GitHub and LinkedIn links.
6. Compact skill bands.
7. The two evidence pillars.

The landing page should be usable as a resume page without requiring visitors to
click through the whole project archive.

## Recommended homepage structure

### 1. Hero / resume summary

Replace the old "Independent researcher and systems builder" hero with the
current evals/governance positioning. Keep the tone direct and restrained.

Include:

- name,
- target identity,
- one-line pitch,
- short summary,
- location,
- GitHub / LinkedIn / email or contact link,
- a visible "Resume" or "CV" action.

Do not turn this into a marketing hero. Keep it resume-like and useful.

### 2. Resume-ready skills

Add a compact skills section on the landing page. Suggested grouped bands:

- **Evaluations and agentic AI:** model and harness evaluation, statistical
  promotion gates, coding-agent workflows, OpenAI-compatible LLM gateways,
  trace/provenance/evidence pipelines.
- **Governance and policy-as-code:** OPA/Rego, OpenTofu, GitHub-provider
  governance-as-code, Zod, JSON Schema, audit methodology, CI fitness gates.
- **Infrastructure and platform:** Cloudflare Zero Trust, Gateway, WARP,
  Access, Tunnel, Cloudflare Pages/DNS, Hetzner, Proxmox, Docker, GitHub
  Actions, self-hosted runners.
- **Systems, data, and native:** Python, TypeScript, Kotlin, C/C++, Bash,
  PostgreSQL, Redis, Android, USB/UVC, JNI/NDK.
- **Mathematics and statistics:** functional analysis, commutative Banach
  algebras, Wilson intervals, bootstrap confidence intervals, paired sign tests,
  applied statistics.

Use existing components or simple semantic lists. Do not add a new JavaScript
interaction for this.

### 3. Two portfolio pillars

Make the two-pillar model explicit.

**Pillar 1: evaluation methodology**

Lead artifact:

- Agentic-Coding Evaluation Lab.

Primary message:

- empirical coding-agent evaluation,
- separated control/editing/measurement/evidence services,
- Wilson intervals, seeded bootstrap CIs, paired sign tests,
- evidence-based no-go decision,
- provenance verification, allowlisting, isolated workspaces, egress boundaries,
  and no-commit fitness gate.

**Pillar 2: governance and agent security**

Lead artifacts:

- audit-spec,
- Host Capability Substrate,
- Governance-First Infrastructure / anonymized governance-security case study.

Primary message:

- evidence-first audit,
- agent authority boundaries,
- typed capability/evidence/authorization models,
- OPA/Rego and OpenTofu policy gates,
- branch protection as code,
- enforcing versus advisory versus planned honesty.

Do not name or link the private governance estate. Use "private multi-repo
governance estate," "private parent organization," or "governance-first
infrastructure case study."

### 4. Primary evidence projects

The homepage should feature these five projects, in this order:

1. Agentic-Coding Evaluation Lab.
2. audit-spec.
3. Host Capability Substrate.
4. Governance-First Infrastructure / anonymized governance-security case study.
5. ScopeCam.

Supporting work can remain reachable through `/projects/`:

- Dicee,
- Flux,
- Budget Triage,
- MAAT,
- Symmetry Groups,
- teaching tools,
- research/publications.

Older projects should not be visually louder than the five primary evidence
items.

### 5. Experience and publications

Keep the academic and publication context visible, but secondary:

- Associate Professor of Mathematics, tenured;
- 17+ years teaching mathematics/statistics;
- Ph.D. Mathematics, University of Montana, 2013;
- 2023 Pediatric Physical Therapy publication with statistical-analysis role;
- 2012 pure-math publication.

This evidence supports maturity, statistics, and communication. It should not
become the main pitch for evals or agent-security roles.

## Existing pages and likely edit targets

Primary likely source files:

- `index.html` — main landing page and metadata.
- `cv.html` — currently stale relative to the new resume direction; update if
  the implementation pass includes CV alignment.
- `public/content/resume.md`, `public/content/summary.md`, and
  `public/content/research-statement.md` — copy/download surfaces used by the
  homepage credential cards.
- `docs/content/pages/home.md` — Markdown mirror projection of `index.html`;
  refresh with `npm run content:pull` after HTML edits.
- `docs/content/pages/cv.md` — refresh if `cv.html` changes.
- `assets/jeffrey.css` — only if existing components cannot support the new
  layout. Keep styles token-based and inside the shared stylesheet.

Possible metadata updates:

- `<title>` and description in `index.html`;
- Open Graph / Twitter tags;
- JSON-LD `jobTitle`, `description`, and `knowsAbout`.

Do not edit generated or ignored output:

- `dist/`;
- `projects/index.html`.

## Pages to leave subordinate

The following can remain, but should not drive the homepage:

- broad project gallery,
- older project-intelligence feed surface,
- timeline experiments,
- older R&D-not-sales framing,
- MAAT / Dicee / Flux / Budget Triage feature treatments,
- decorative or exploratory sections.

Do not delete those surfaces unless the operator explicitly asks. The requested
change is a homepage emphasis change, not a site teardown.

## Public-safety and accuracy rules

- Do not name or link the private governance estate on the landing page.
- Do not imply ScopeCam is a shipped product. Use "not a shipped product" or an
  equivalent maturity boundary.
- Do not present self-directed research as client work.
- Do not imply design-stage systems are enforcing.
- Do not describe the operator as a staffed-team lead.
- Do not lead with "Research Scientist" or generic Big Tech SWE positioning.
- Keep contact details only where this public website already intentionally
  exposes them; do not add contact details back into `new-direction-2026`.
- If exact project numbers are used publicly, re-check source evidence first.

## Implementation sequence for the website agent

1. Read `AGENTS.md`, `docs/index.md`, this handoff, and the upstream direction
   files listed above.
2. Inspect `index.html`, `cv.html`, `public/content/*.md`, and the matching
   `docs/content/pages/*.md` mirror files.
3. Draft a file-level plan before editing.
4. Update the homepage first. Keep the change scoped to resume/skills/evidence
   presentation.
5. Update copy-ready Markdown files if their visible purpose now conflicts with
   the landing page.
6. Run `npm run content:pull` after HTML edits so the Markdown mirror updates.
7. Run the full local gate:

   ```bash
   mise run ci
   ```

8. If feed/template/model code changes are made, also confirm:

   ```bash
   npm test
   ```

9. Preview visually at desktop and mobile widths. The landing page should show
   resume and skills clearly without requiring navigation.

## Acceptance criteria

The implementation is done when:

- homepage headline uses "Evaluations and agent-governance engineer";
- first screen or immediate next section shows resume/CV access and skill bands;
- the two-pillar evidence model is visible on the homepage;
- primary evidence appears in the current order;
- older projects are available but subordinate;
- the private governance estate remains anonymized;
- ScopeCam has a visible maturity boundary;
- metadata no longer leads with the older "independent researcher and systems
  builder" phrase as the primary site title/description;
- Markdown mirror is refreshed intentionally after HTML edits;
- `mise run ci` passes;
- the final handback states exactly which files changed and which verification
  commands passed.

## Suggested handback format

When the website agent finishes implementation, report:

- files changed;
- summary of the landing-page structure;
- whether `cv.html` and copy-ready Markdown files were also updated;
- mirror command run, if any;
- verification commands and results;
- any intentional leftovers, especially older project pages that remain
  accessible but subordinate.
