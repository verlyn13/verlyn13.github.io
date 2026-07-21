---
id: page_cv
type: page
source_file: cv.html
source_selector: main
route: /cv.html
content_hash: 2f19a469f503803dd523cc67dad7bea7cc490c9c932e1b422bf38e521ac3880a
html_hash: 2adbd3c4423a92c89cf03e3882911eb30c922b0663a4a53a8c57bb0ebf113141
normalizer_version: 1
sync_direction: html_to_markdown
protected_fields: [id, type, source_file, source_selector, normalizer_version]
---

# Jeffrey V. Johnson, Ph.D.

Building foundations for reliable, specification-driven agentic development

- Homer, Alaska
- [jeffrey@jvjohnson.dev](mailto:jeffrey@jvjohnson.dev)
- [github.com/verlyn13](https://github.com/verlyn13)
- [linkedin.com/in/drjeffreyjohnson](https://linkedin.com/in/drjeffreyjohnson)

Resume actions

Print / save PDF

Copy for agents

Markdown↓

AI/ATS↓

## Summary

Ph.D. mathematician and systems builder focused on the infrastructure that makes agent-assisted development reliable: typed contracts, explicit permissions, reproducible environments, automated checks, and reviewable evidence. I apply these controls while building applications, data pipelines, evaluation systems, and infrastructure. My strongest fit is research engineering in agent systems, developer infrastructure, model evaluation, and safeguards.

## Agent-development infrastructure

### [Host Capability Substrate](/projects/host-capability-substrate.html) — typed capability and evidence contracts

TypeScript · Zod · JSON Schema · GitHub Actions

- Built 46 Zod entity schemas compiled to 67 generated JSON Schemas, with about 500 tests.
- Modeled host capabilities, operations, execution contexts, policy decisions, provenance-typed evidence, approvals, leases, audit chains, and scoped authorization grants.
- Wrote a 19-invariant governance charter and four-ring architecture, enforced by import boundaries and one CI gate for policy, boundary, secret, and schema-drift checks.
- The public repository demonstrates the typed model and source boundaries, not universal host-level runtime enforcement.

### [Agentic Architecture Audit](https://github.com/verlyn13/agentic-architecture-audit) — specification and drift checks for agent-operated codebases

Specification · JSON Schema · Python tooling

- Authored a two-stage `audit-spec` of 2,075 lines that keeps evidence collection separate from judgment.
- Defined an 11-dimension rubric, 12 JSON output schemas, and a prioritization model based on severity, confidence, and weight.
- Built a stdlib-only Python drift linter with 10 deterministic checks and a 27-case negative self-test in pre-commit and CI.

### [Governance and agent-control architecture](/projects/governance-agent-control.html) — federated authority for agent-assisted work

An anonymized private case study · OpenTofu · OPA/Rego · TypeScript · Cloudflare · Hetzner · Proxmox

- Designed a multi-repository architecture that separates human decision rights, agent permissions, identity and authorization, infrastructure enforcement, runtime admission, and repository-local authority.
- Modeled agent authority as the intersection of mandate, available capability, and credential reach, with structured, secret-free handbacks for human judgment or privileged work.
- Implemented selected controls including 26 OPA/conftest plan rules, repository governance as code, Zero Trust infrastructure, and scheduled drift checks.
- Selected controls are operational; runtime admission is source-tested rather than deployed across the organization. This is a single-operator case study, not an enterprise-adoption claim.

## Selected applications and evaluations

### [Agentic-Coding Evaluation Lab](https://github.com/verlyn13/eval-lab-methodology) — fail-closed evaluation evidence

Public methodology and verification prototype · Python · Quarto · JSON contracts

- Built and published a model-evaluation methodology and verification prototype that preserves evidence and withholds a recommendation when scientific prerequisites are incomplete.
- Built a draft evidence contract and a separate verifier that independently recalculates a synthetic `NOT_EVALUABLE` outcome and rejects missing, inconsistent, or altered evidence.
- Current evidence covers framework behavior and synthetic conformance, not a powered real-model result or promotion recommendation.

### [Budget Triage](/projects/budget-triage.html) — financial evidence workbench

Private working prototype · Bun · TypeScript · Hono · PostgreSQL · not deployed to production

- Built a financial evidence workbench for statements, receipts, and connected-account data with deterministic-first processing and human review.
- Implemented exact monetary arithmetic, tenant-scoped atomic persistence, append-only decision records, authentication, Plaid, Infisical, and OpenTelemetry.
- Built a synthetic known-answer and service-observation harness. Its current result is 6 passing and 9 pending assertions, so it remains incomplete and uncertified.
- Prepared a sanitized, MIT-licensed public source candidate that passed its full validation gate on 2026-07-18. It is intended for employer exploration after final operator review; no public source link or contribution policy is available yet.

### [ScopeCam](/projects/scopecam.html) — native Android UVC camera application

Private Android · Kotlin · Jetpack Compose · C++20 · JNI/NDK · USB/UVC

- Built a multi-module Android microscope application spanning Compose UI, Kotlin orchestration, a native C++ camera engine, USB lifecycle, persistence, diagnostics, and physical-device verification.
- Diagnosed a camera-replug ANR across the JVM/native teardown boundary and implemented a device-verified recovery with the remaining leak tradeoff documented.
- Delivered a signed client alpha; the private product is not broadly released.

### [Dicee](/projects/dicee.html) — representative delivered software

Rust · WebAssembly · SvelteKit · Cloudflare Durable Objects · WebSockets

- Built and deployed a family multiplayer game with a Rust-to-WebAssembly rules engine, realtime state through Cloudflare Durable Objects and WebSockets, and a SvelteKit client.
- Public source and a live deployment demonstrate end-to-end delivery; traffic, performance, bundle-size, and current test-count claims remain withheld.

## Technical skills

- **Languages:** Python, TypeScript, SQL, Bash, Kotlin, C/C++, Ruby.
- **Contracts and controls:** Zod, JSON Schema, OPA/Rego, OpenTofu, typed authorization, sandboxing, egress policy, provenance, and CI-enforced conformance checks.
- **Agent and evaluation systems:** model and harness evaluation, evidence contracts, OpenAI-compatible gateways, provider routing, coding-agent workflows, and trace/provenance pipelines.
- **Infrastructure and data:** PostgreSQL, Supabase, TimescaleDB, Redis, pgvector, Cloudflare Zero Trust, Hetzner, Proxmox, Docker, GitHub Actions, self-hosted runners, OpenTelemetry, Infisical, and 1Password.
- **Native and application systems:** Android, Jetpack Compose, USB/UVC, JNI/NDK, CMake, and WebAssembly.
- **Mathematics and statistics:** functional analysis, applied statistics, Wilson intervals, bootstrap confidence intervals, and paired sign tests.

## Professional experience

### Associate Professor of Mathematics (tenured)

Kenai Peninsula College, University of Alaska Anchorage · Homer, Alaska · August 2017-present

Previously American University in Cairo, 2014-2017; University of Montana, 2008-2014.

- Teach undergraduate mathematics and statistics, including calculus and applied statistics; full teaching-and-service appointment; awarded tenure in 2023.
- Consult for local non-profit organizations on statistical interpretation and study design.
- Communicate technical and mathematical ideas to audiences with widely varying backgrounds.

### Independent systems engineer and researcher (self-directed)

Self-directed; Happy Patterns LLC product entity · Homer, Alaska · 2023-present

- Build and maintain a multi-repository engineering program for reliable, specification-driven agent development across applications, data pipelines, evaluation systems, and infrastructure.
- Develop repository contracts, managed human and agent shell environments, typed authority models, and automated verification gates.
- Designed and operate selected controls from an anonymized, single-operator governance and agent-control architecture spanning policy-as-code, IaC, Zero Trust networking, local and remote servers, and credential custody.

## Education

### Ph.D., Mathematics

University of Montana, Missoula, MT · 2013

Dissertation: *Peripherally-Multiplicative Spectral Preservers Between Function Algebras*.

## Publications

Cadieux, J. M., Pyhala, S. L., & Johnson, J. V. (2023). Pediatric Walking Speed Normal Reference Values in a Local Population. *Pediatric Physical Therapy*, 35(3), 326-331. Led the statistical analysis.

Johnson, J. V., & Tonev, T. (2012). Spectral Conditions for Composition Operators on Algebras of Functions. *Communications in Mathematics and Applications*, 3(1).
