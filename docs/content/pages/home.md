---
id: page_home
type: page
source_file: index.html
source_selector: main
route: /
content_hash: 087da19141a68d8d5f47cb39f1c89c7e25b75d26a9094fd349164a5f4d23358c
html_hash: 3ba4c890670eb5ab2153bfe499e463398d3ebf74534362488777f62f525af890
normalizer_version: 1
sync_direction: html_to_markdown
protected_fields: [id, type, source_file, source_selector, normalizer_version]
---

# Jeffrey V. Johnson, Ph.D.

Building infrastructure for model evaluation and agent systems

I build systems that hold work to specification and evidence, whether the work comes from people, models, or agents. A result counts only when it can be verified.

I work daily with modern agentic tools and know them in practice: what they do well, where they fail, and when their output should not be trusted without checking.

I am also a Ph.D. mathematician (University of Montana, 2013). I led the statistical analysis for a 2023 study in *Pediatric Physical Therapy* that produced walking-speed reference values from 1,593 children in a rural Alaska school district. The full citation and methods are on the [research page](/research/).

The projects below are self-directed. I built them end to end to learn and demonstrate AI coding frameworks, model evaluation, and agent governance. Each one states its evidence boundary next to its claim.

Homer, Alaska

Selected evidence [Agentic-Coding Evaluation Lab: model-change evidence](#evaluation-lab) [Budget Triage: traceable financial evidence](#budget-triage)

Current résumé ↓

AI/ATS version ↓

Full resume →

GitHub →

LinkedIn →

Email →

## Resume and skills

Current resume formats and a skills summary for research-engineering roles in model evaluation, agent systems, and evaluation infrastructure.

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

Two featured projects show one method: measure uncertain systems, bound their authority, and preserve the evidence.

### Agentic-Coding Evaluation Lab

Fail-closed evidence and reporting for model evaluation.

**What is this?** A framework for deciding whether an evaluation contains enough valid evidence to support changing a model or coding-agent configuration.

**What is it for?** It provides a repeatable, inspectable alternative to informal model selection and prevents incomplete experiments from being mistaken for deployment evidence.

**How is it used?** A team defines the systems, tasks, study design, and required decision criteria. The framework validates the evidence and produces a report; a separate verifier recomputes the result or refuses it when evidence is missing or altered.

**Why does it matter?** It helps model-testing, safety, and model-risk teams avoid unsupported model changes and leaves an auditable record of why a decision was made or withheld.

**Evidence and status:** Public, open-source (Apache-2.0) framework with tested statistical, contract, and reporting code. Its strongest current proof is a synthetic `NOT_EVALUABLE` refusal: on 2026-07-14 an independent audit ran the full 194-test suite and recomputed that refusal from an isolated clone of public `main`. It is in active development; local calibration is the next milestone. It does not establish real-model performance or a promotion recommendation.

Explore the methodology, worked examples, and evidence →

### Budget Triage: financial evidence workbench

Traceable financial records with uncertainty routed to human review.

**What is this?** A private full-stack prototype that turns statements, receipts, and connected-account data into structured, traceable transactions.

**What is it for?** It helps an owner-operator resolve uncertain or conflicting financial facts without silently converting extraction into truth.

**How is it used?** The system runs deterministic extraction first, optionally uses models as auditors or comparison tools, and routes low-confidence or conflicting results to human review.

**Why does it matter?** Financial automation needs exact monetary arithmetic, tenant isolation, traceable decisions, observability, and fail-closed human confirmation.

**Evidence and status:** The accepted `main` branch passes full validation. A sanitized, MIT-licensed public release candidate passed its validation gate on 2026-07-18, including 1,070 integration tests and full secret-history checks; it was rebuilt without history from the private repository. The synthetic known-answer harness is incomplete: 6 assertions pass and 9 are pending, so it is uncertified. I claim no real-user results, financial outcomes, live-provider performance, tax readiness, or completed certification. Publication waits on my final review, so there is no public source link yet.

Budget Triage →

### Also part of the portfolio

- **Governance and agent-control architecture** An anonymized governance architecture for AI-assisted work: identity, delegated authority, evidence, and safe refusal made explicit before agents or automation can act. **Evidence and status:** selected policy-as-code, infrastructure, validation, and scheduled drift controls operate today; a single-operator case study, not an enterprise-adoption claim. [Review the anonymized case study →](/projects/governance-agent-control.html)
- **Host Capability Substrate** A public schema-driven layer that turns implicit host access into explicit capabilities and authorization. **Demonstrates:** typed authority, provenance, scoped grants, and CI-enforced architecture. **Evidence and status:** 46 Zod entity schemas, 67 generated JSON Schemas, about 500 tests, and a composed CI gate. [Examine the implementation →](/projects/host-capability-substrate.html)
- **Agentic Architecture Audit** A public evidence-first audit method for AI-agent-operated codebases. **Demonstrates:** machine-readable contracts, deterministic drift checking, and bias-aware workflows. **Evidence and status:** 2,075-line `audit-spec`, 12 JSON schemas, 10 deterministic checks, and a 27-case negative self-test; broader adoption remains unclaimed. [Inspect the public project →](https://github.com/verlyn13/agentic-architecture-audit)

- **Dicee** A live family multiplayer game for mobile browsers, built as a complete public system. **Demonstrates:** Rust-to-WebAssembly delivery, realtime state through Cloudflare Durable Objects and WebSockets, SvelteKit, persistence, and end-to-end deployment. **Evidence and status:** public source and a [live deployment](https://dicee.games/); traffic, performance, bundle-size, and current test-count claims remain withheld. [Review the delivered system →](/projects/dicee.html)
- **ScopeCam** A private, proprietary Android/Kotlin/C++ USB-microscopy application with a vendored UVC camera stack. **Evidence and status:** a signed `0.1-alpha` client build was delivered in June 2026; no public source link and no broad release. [Details available on request →](/contact.html)

[Explore the full body of work →](/projects/)

## Academic and publication context

Tenured associate professor of mathematics with 17+ years teaching mathematics and statistics. Ph.D. in Mathematics, University of Montana, 2013; statistical lead for the 2023 *Pediatric Physical Therapy* study; a 2012 pure-mathematics publication. That background supports the evaluation and governance work above.

Teaching & Leadership →

Publications & Research →

Full resume →
