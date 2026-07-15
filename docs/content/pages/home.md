---
id: page_home
type: page
source_file: index.html
source_selector: main
route: /
content_hash: bf851849a987580a917c18030029ee1d5a9f1cfab92bad180ec23280818db0c8
html_hash: 2c8e2f6845e19a7c6cf96fd8904240489f7c0b8b959c2bfaf35c910e6309d539
normalizer_version: 1
sync_direction: html_to_markdown
protected_fields: [id, type, source_file, source_selector, normalizer_version]
---

# Jeffrey V. Johnson, Ph.D.

Evaluations and agent-governance engineer

I pair probabilistic AI tooling with deterministic, machine-checkable verification.

I build systems that make AI-assisted work measurable, governable, and auditable—from deciding whether model evidence supports a change, to defining what agents may do, to preserving evidence and human review in consequential software.

I am also a Ph.D. mathematician and backend-oriented systems researcher. The mathematics supports the work through abstraction, statistical discipline, patience with difficult systems, and clear technical communication.

Homer, Alaska

Selected evidence [Evaluation Lab](#evaluation-lab) [Agent-control architecture](#governance-agent-control) [Budget Triage](#budget-triage)

Current résumé ↓

AI/ATS version ↓

Full resume →

GitHub →

LinkedIn →

Email →

## Resume and skills

Current resume formats and target skill signals for evals, agent governance, safeguards, and control roles.

### Resume formats

- Rendered resume Full human-readable page with evidence links and print styling. [Open resume→](/cv.html)
- Markdown resume Current evals/governance version for application packets and direct review. Copy [Download↓](/content/resume.md)
- AI/ATS Markdown Scanner-ready plain Markdown for portals and automated screeners. Copy [Download↓](/content/resume-ai-scanner.md)

### Skills snapshot

- **Evaluations and agentic AI** Evaluation contracts, evidence pipelines, independent recompute-or-refuse verification, coding-agent workflows, LLM gateways, provenance, sandboxing, and egress policy.
- **Governance and policy-as-code** OPA/Rego, OpenTofu, GitHub-provider governance-as-code, Zod, JSON Schema, audit methodology, CI fitness gates, and status honesty.
- **Infrastructure and platform** Cloudflare Zero Trust, Gateway, WARP, Access, Tunnel, Pages/DNS, Hetzner, Proxmox, Docker, GitHub Actions, and self-hosted runners.
- **Systems, data, and native** Python, TypeScript, Kotlin, C/C++, Bash, PostgreSQL, Redis, Android, USB/UVC, and JNI/NDK.
- **Mathematics and statistics** Functional analysis, commutative Banach algebras, Wilson intervals, bootstrap confidence intervals, paired sign tests, and applied statistics.

## Selected evidence

Three examples show one research-engineering method: measure uncertain systems, bound their authority, preserve their evidence, and test those disciplines in implemented software.

### Agentic-Coding Evaluation Lab

Fail-closed evidence and reporting for model evaluation.

**What is this?** A framework for deciding whether an evaluation contains enough valid evidence to support changing a model or coding-agent configuration.

**What is it for?** It provides a repeatable, inspectable alternative to informal model selection and prevents incomplete experiments from being mistaken for deployment evidence.

**How is it used?** A team defines the systems, tasks, study design, and required decision criteria. The framework validates the evidence and produces a report; a separate verifier recomputes the result or refuses it when evidence is missing or altered.

**Why does it matter?** It helps model-testing, safety, and model-risk teams avoid unsupported model changes and leaves an auditable record of why a decision was made or withheld.

**Evidence and status:** Public prototype with tested statistical, contract, and reporting code. Its strongest current proof is a synthetic, independently recomputed `NOT_EVALUABLE` refusal. It does not establish real-model performance or a promotion recommendation.

Explore the methodology, worked examples, and evidence →

### Governance and agent-control architecture

Federated authority and evidence controls for AI-assisted engineering.

**What is this?** An anonymized governance architecture for AI-assisted work across multiple repositories, services, credentials, and operating environments.

**What is it for?** It makes identity, delegated authority, evidence, and safe refusal explicit before agents or automation can change code, infrastructure, or organizational state.

**How is it used?** Human principles are translated into machine-readable standards, authorization contracts, infrastructure policy checks, runtime-admission prototypes, and project-local restatements.

**Why does it matter?** Organizations need reliable answers to who may act, under what mandate, on which resource, with what evidence, and when the correct result is to stop or escalate.

**Evidence and status:** Selected policy-as-code, infrastructure, validation, and scheduled drift controls operate today. Identity, synthetic-decision, and runtime-admission layers include substantial contracts and tested prototypes but are not organization-wide live enforcement. This is a single-operator case study, not an enterprise-adoption claim.

Review the anonymized case study →

### Budget Triage — financial evidence workbench

Traceable financial records with uncertainty routed to human review.

**What is this?** A private full-stack prototype that turns statements, receipts, and connected-account data into structured, traceable transactions.

**What is it for?** It helps an owner-operator resolve uncertain or conflicting financial facts without silently converting extraction into truth.

**How is it used?** The system runs deterministic extraction first, optionally uses models as auditors or comparison tools, and routes low-confidence or conflicting results to human review.

**Why does it matter?** Financial automation needs exact monetary arithmetic, tenant isolation, traceable decisions, observability, and fail-closed human confirmation.

**Evidence and status:** Current accepted `main` passed full validation. The synthetic known-answer result remains 6 passing / 9 pending, incomplete and uncertified. A separately verified, bounded synthetic observation preserves browser-to-service correlation, but does not prove UI state, production operation, financial correctness, or the source-through-tax path. No real-user, financial-outcome, live-provider-performance, tax-readiness, or completed-certification claim is made.

Budget Triage →

### Public implementation evidence

- **Host Capability Substrate** A public schema-driven layer that turns implicit host access into explicit capabilities and authorization. **Demonstrates:** typed authority, provenance, scoped grants, and CI-enforced architecture. **Evidence and status:** 46 Zod entity schemas, 67 generated JSON Schemas, about 500 tests, and a composed CI gate. [Examine the implementation →](/projects/host-capability-substrate.html)
- **Agentic Architecture Audit** A public evidence-first audit method for AI-agent-operated codebases. **Demonstrates:** machine-readable contracts, deterministic drift checking, and bias-aware workflows. **Evidence and status:** 2,075-line `audit-spec`, 12 JSON schemas, 10 deterministic checks, and a 27-case negative self-test; broader adoption remains unclaimed. [Inspect the public project →](https://github.com/verlyn13/agentic-architecture-audit)

### Representative delivery evidence

- **Dicee** A live family multiplayer game for mobile browsers, built as a complete public system. **Demonstrates:** Rust-to-WebAssembly delivery, realtime state through Cloudflare Durable Objects and WebSockets, SvelteKit, persistence, and end-to-end deployment. **Evidence and status:** public source and a live deployment at the verified canonical URL; traffic, performance, bundle-size, and current test-count claims remain withheld. [Review the delivered system →](/projects/dicee.html)

[Explore the full body of work →](/projects/)

## Academic and publication context

Tenured associate professor of mathematics with 17+ years teaching mathematics and statistics. Ph.D. in Mathematics from the University of Montana, 2013; 2023 *Pediatric Physical Therapy* publication with statistical-analysis role; 2012 pure-math publication. This supports the evaluation and governance work without replacing it as the main pitch.

Teaching & Leadership →

Publications & Research →

Full resume →
