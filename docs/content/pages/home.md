---
id: page_home
type: page
source_file: index.html
source_selector: main
route: /
content_hash: eec2cabd778630a43ddac289537598029b312d949fb0cc5dd56f2fc8cce43151
html_hash: e0e2eb48e770ef0af993252b1aa15ed9e73b136bf56b27e70598eff81115bc4d
normalizer_version: 1
sync_direction: html_to_markdown
protected_fields: [id, type, source_file, source_selector, normalizer_version]
---

# Jeffrey V. Johnson, Ph.D.

Research Engineer | Model Evaluations · Agent Systems · Evaluation Infrastructure

I build systems that make AI-assisted work measurable, governable, and auditable.

I build and align systems based on strict criteria and specification, searching for quality, verifiable results in agentic development.

I am also a Ph.D. mathematician (University of Montana, 2013). I led the statistical analysis for Cadieux, Pyhala, and Johnson, “Pediatric Walking Speed Normal Reference Values in a Local Population” (*Pediatric Physical Therapy*, 2023;35(3):326-331). The study covered 1,593 children ages 5 to 17 in a rural Alaska school district and used a 13×2×2 factorial ANOVA with Type III sums of squares on unbalanced data to produce normative reference values for assessing children with disabilities.

The projects below are extensive self-directed work. I built them end to end to learn and demonstrate AI coding frameworks, model evaluation, and agent governance. Each one states its evidence boundary next to its claim.

Homer, Alaska

Selected evidence [Agentic-Coding Evaluation Lab — model-change evidence](#evaluation-lab) [Budget Triage — traceable financial evidence](#budget-triage)

Current résumé ↓

AI/ATS version ↓

Full resume →

GitHub →

LinkedIn →

Email →

## Resume and skills

Current resume formats and skill signals for research-engineering roles in model evaluation, agent systems, and evaluation infrastructure.

### Resume formats

- Rendered resume Full human-readable page with evidence links and print styling. [Open resume→](/cv.html)
- Markdown resume Current research-engineer version for application packets and direct review. Copy [Download↓](/content/resume.md)
- AI/ATS Markdown Scanner-ready plain Markdown for portals and automated screeners. Copy [Download↓](/content/resume-ai-scanner.md)

### Skills snapshot

- **Evaluations and agentic AI** Evaluation contracts, evidence pipelines, independent recompute-or-refuse verification, coding-agent workflows, LLM gateways, provenance, sandboxing, and egress policy.
- **Governance and policy-as-code** OPA/Rego, OpenTofu, GitHub-provider governance-as-code, Zod, JSON Schema, audit methodology, CI fitness gates, and status honesty.
- **Infrastructure and platform** Cloudflare Zero Trust, Gateway, WARP, Access, Tunnel, Pages/DNS, Hetzner, Proxmox, Docker, GitHub Actions, and self-hosted runners.
- **Systems, data, and native** Python, TypeScript, Kotlin, C/C++, Bash, PostgreSQL, Redis, Android, USB/UVC, and JNI/NDK.
- **Mathematics and statistics** Functional analysis, commutative Banach algebras, Wilson intervals, bootstrap confidence intervals, paired sign tests, and applied statistics.

## Selected evidence

Two featured projects show one research-engineering method: measure uncertain systems, bound their authority, preserve their evidence, and test those disciplines in implemented software.

### Agentic-Coding Evaluation Lab

Fail-closed evidence and reporting for model evaluation.

**What is this?** A framework for deciding whether an evaluation contains enough valid evidence to support changing a model or coding-agent configuration.

**What is it for?** It provides a repeatable, inspectable alternative to informal model selection and prevents incomplete experiments from being mistaken for deployment evidence.

**How is it used?** A team defines the systems, tasks, study design, and required decision criteria. The framework validates the evidence and produces a report; a separate verifier recomputes the result or refuses it when evidence is missing or altered.

**Why does it matter?** It helps model-testing, safety, and model-risk teams avoid unsupported model changes and leaves an auditable record of why a decision was made or withheld.

**Evidence and status:** Public, open-source (Apache-2.0) framework with tested statistical, contract, and reporting code. Its strongest current proof is a synthetic, independently recomputed `NOT_EVALUABLE` refusal: on 2026-07-14 an independent audit reproduced the full 194-test suite and recomputed that refusal from an isolated clone of public `main`. It is in active development; local calibration is the next milestone. It does not establish real-model performance or a promotion recommendation.

Explore the methodology, worked examples, and evidence →

### Budget Triage — financial evidence workbench

Traceable financial records with uncertainty routed to human review.

**What is this?** A private full-stack prototype that turns statements, receipts, and connected-account data into structured, traceable transactions.

**What is it for?** It helps an owner-operator resolve uncertain or conflicting financial facts without silently converting extraction into truth.

**How is it used?** The system runs deterministic extraction first, optionally uses models as auditors or comparison tools, and routes low-confidence or conflicting results to human review.

**Why does it matter?** Financial automation needs exact monetary arithmetic, tenant isolation, traceable decisions, observability, and fail-closed human confirmation.

**Evidence and status:** Current accepted `main` passed full validation. The synthetic known-answer result remains 6 passing / 9 pending, incomplete and uncertified. A separately verified, bounded synthetic observation preserves browser-to-service correlation, but does not prove UI state, production operation, financial correctness, or the source-through-tax path. No real-user, financial-outcome, live-provider-performance, tax-readiness, or completed-certification claim is made. A sanitized, MIT-licensed public release candidate passed its full validation gate on 2026-07-18, including 1,070 integration tests and full secret-history checks. It was rebuilt without history from the private repository. Publication awaits final operator review, so there is no public source link yet.

Budget Triage →

### Also part of the portfolio

- **Governance and agent-control architecture** An anonymized governance architecture for AI-assisted work: identity, delegated authority, evidence, and safe refusal made explicit before agents or automation can act. **Evidence and status:** selected policy-as-code, infrastructure, validation, and scheduled drift controls operate today; a single-operator case study, not an enterprise-adoption claim. [Review the anonymized case study →](/projects/governance-agent-control.html)
- **Host Capability Substrate** A public schema-driven layer that turns implicit host access into explicit capabilities and authorization. **Demonstrates:** typed authority, provenance, scoped grants, and CI-enforced architecture. **Evidence and status:** 46 Zod entity schemas, 67 generated JSON Schemas, about 500 tests, and a composed CI gate. [Examine the implementation →](/projects/host-capability-substrate.html)
- **Agentic Architecture Audit** A public evidence-first audit method for AI-agent-operated codebases. **Demonstrates:** machine-readable contracts, deterministic drift checking, and bias-aware workflows. **Evidence and status:** 2,075-line `audit-spec`, 12 JSON schemas, 10 deterministic checks, and a 27-case negative self-test; broader adoption remains unclaimed. [Inspect the public project →](https://github.com/verlyn13/agentic-architecture-audit)

- **Dicee** A live family multiplayer game for mobile browsers, built as a complete public system. **Demonstrates:** Rust-to-WebAssembly delivery, realtime state through Cloudflare Durable Objects and WebSockets, SvelteKit, persistence, and end-to-end deployment. **Evidence and status:** public source and a [live deployment](https://dicee.games/); traffic, performance, bundle-size, and current test-count claims remain withheld. [Review the delivered system →](/projects/dicee.html)
- **ScopeCam** A private, proprietary Android/Kotlin/C++ USB-microscopy application with a vendored UVC camera stack. **Evidence and status:** a signed `0.1-alpha` client build was delivered in June 2026; no public source link and no broad release. [Details available on request →](/contact.html)

[Explore the full body of work →](/projects/)

## Academic and publication context

Tenured associate professor of mathematics with 17+ years teaching mathematics and statistics. Ph.D. in Mathematics from the University of Montana, 2013; 2023 *Pediatric Physical Therapy* publication with statistical-analysis role; 2012 pure-math publication. This supports the evaluation and governance work without replacing it as the main pitch.

Teaching & Leadership →

Publications & Research →

Full resume →
