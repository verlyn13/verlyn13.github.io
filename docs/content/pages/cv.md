---
id: page_cv
type: page
source_file: cv.html
source_selector: main
route: /cv.html
content_hash: acc523d3f56e30ba5a20d0c90ddacbc9a21ee5c0fc9f277a30d26765197276bb
html_hash: 5cc6920a5c95b7706b53fed8c64975daf694cafc73aed918b79b9f423bc53841
normalizer_version: 1
sync_direction: html_to_markdown
protected_fields: [id, type, source_file, source_selector, normalizer_version]
---

# Jeffrey V. Johnson, Ph.D.

Research Engineer | Model Evaluations · Agent Systems · Evaluation Infrastructure

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

Ph.D. mathematician and systems builder with a backend orientation. I build systems that hold work to specification and evidence, whether the work comes from people, models, or agents: deciding whether model evidence supports a change, defining what agents may do, and preserving evidence and human review in consequential workflows. My strongest fit is research engineering in model evaluations, agent systems, and evaluation infrastructure. The underlying skills are general: engineering practice, mathematical training, and clear communication.

## Selected systems and research evidence

### [Agentic-Coding Evaluation Lab](https://github.com/verlyn13/eval-lab-methodology) — fail-closed evaluation evidence

Python · Quarto · JSON contracts · private gateway, harness, and trace integrations

- Built and published a model-evaluation methodology and verification prototype that preserves evidence and withholds a recommendation when scientific prerequisites are incomplete.
- Built a draft evidence contract and a separate verifier that independently recalculates a synthetic `NOT_EVALUABLE` outcome and rejects missing, inconsistent, or altered evidence.
- Connected private evaluation components with byte-for-byte contract checks and controls that keep scored runs disabled until prerequisites are met; kept operational trace data separate from the authoritative study record.
- Documented the evidence boundary explicitly: tested framework behavior and synthetic conformance, with no powered real-model result or promotion claim.

### [Governance and agent-control architecture](/projects/governance-agent-control.html) — federated authority for AI-assisted work

An anonymized private case study · OpenTofu · OPA/Rego · TypeScript · Cloudflare · Hetzner · Proxmox

- Designed a multi-repository architecture that separates human policy and decision rights, agent mandates, identity and authorization, infrastructure enforcement, runtime admission, and repository-local authority.
- Modeled effective agent authority as the intersection of mandate, available capability, and credential reach, with value-blind handbacks when human judgment or privileged action is required.
- Connected the design to selected operational controls: 26 OPA/conftest plan rules, branch and repository governance as code, same-run saved-plan promotion, Zero Trust infrastructure, and scheduled drift checks across four workspaces.
- Kept maturity boundaries explicit: selected controls operate today, while runtime admission remains source-tested rather than a live request-path gate; the case study is single-operator and makes no enterprise-adoption claim.

### [Budget Triage](/projects/budget-triage.html) — financial evidence workbench

Private Bun · TypeScript · Hono · PostgreSQL working prototype

Private financial evidence workbench combining deterministic-first document processing, provenance, tenant isolation, exact monetary semantics, and fail-closed human review. Private technical walkthrough available during an interview process.

- Implemented tenant isolation, exact monetary arithmetic, atomic persistence, append-only categorization decisions, authentication, connected-account, secret-custody, and OpenTelemetry surfaces; accepted `main` passed full validation.
- Added a merged synthetic known-answer certification slice with rollback validation and structured service-level evidence events; its current result is 6 passing and 9 pending assertions, explicitly incomplete and uncertified.
- Established an independently verified, bounded synthetic browser-to-service observation with matching correlation evidence; this does not prove UI state, production operation, financial correctness, or source-through-tax execution.
- Makes no production, real-user, financial-outcome, live-provider-performance, tax-readiness, or completed source-through-tax claim.

### [Host Capability Substrate](/projects/host-capability-substrate.html) — typed governance for host-level AI agents

TypeScript · Zod · JSON Schema

- Designed 46 Zod entity schemas compiled to 67 generated JSON Schemas, with about 500 tests.
- Modeled capabilities, policy decisions, provenance-typed evidence, audit chains, and scoped authorization grants under a 19-invariant governance charter and composed CI gate.

### [Agentic Architecture Audit](https://github.com/verlyn13/agentic-architecture-audit) — evidence-first audit methodology

Specification · Python tooling

- Authored a two-stage, evidence-first `audit-spec` of 2,075 lines with an 11-dimension rubric and 12 JSON output schemas.
- Built a stdlib-only Python drift linter with 10 deterministic checks and a 27-case negative self-test wired into pre-commit and CI.

### [Dicee](/projects/dicee.html) — representative delivered software

Rust · WebAssembly · SvelteKit · Cloudflare Durable Objects · WebSockets

- Built and deployed a family multiplayer game with a Rust-to-WebAssembly rules engine, realtime state through Cloudflare Durable Objects and WebSockets, and a SvelteKit client.
- Public source and a live deployment demonstrate end-to-end delivery; traffic, performance, bundle-size, and current test-count claims remain withheld.

## Technical skills

- **Evaluations and agentic AI:** model and harness evaluation, evidence contracts, recompute-or-refuse verification, coding-agent workflows, OpenAI-compatible LLM gateways, capability aliasing, provider resolution, per-client policy, budget controls, Ollama, trace, provenance, and evidence pipelines.
- **Safety and governance controls:** sandboxing, egress policy, provenance verification, default-deny command allowlisting, no-commit gates, typed authorization grants, audit chains, and evidence-first audit methodology.
- **Policy-as-code and contracts:** OPA/Rego, OpenTofu, GitHub-provider governance-as-code, Zod, JSON Schema, ADRs, decision ledgers, fitness gates, and conformance gates.
- **Infrastructure and platform:** Cloudflare Zero Trust, Gateway, WARP, Access, Tunnel, Cloudflare Pages/DNS, Hetzner, Proxmox VE, Docker, Docker Compose, Traefik, GitHub Actions CI/CD, self-hosted runners, OpenTelemetry, Infisical, and 1Password custody.
- **Data and systems:** PostgreSQL, Supabase, TimescaleDB, Redis Stack, RedisJSON, RediSearch, pgvector, Android, Kotlin, Jetpack Compose, USB/UVC, JNI/NDK, C/C++, and CMake.
- **Languages and statistics:** Python as primary, TypeScript, Kotlin, C/C++, Ruby, SQL, Bash, Wilson intervals, bootstrap confidence intervals, paired sign tests, applied statistics, and statistical inference.

## Professional experience

### Associate Professor of Mathematics (tenured)

Kenai Peninsula College, University of Alaska Anchorage · Homer, Alaska · August 2017-present

Previously American University in Cairo, 2014-2017; University of Montana, 2008-2014.

- Teach undergraduate mathematics and statistics, including calculus and applied statistics; full teaching-and-service appointment; awarded tenure in 2023.
- Consult for local non-profit organizations on statistical interpretation and study design.
- Communicate technical and mathematical ideas to audiences with widely varying backgrounds.

### Independent systems engineer and applied-AI researcher (self-directed)

Self-directed; Happy Patterns LLC product entity · Homer, Alaska · 2023-present

- Pursue a multi-repository self-directed research program in agentic AI, evaluation and alignment, systems engineering, and machine-checkable governance.
- Use AI agents to build and stress-test software-engineering systems end to end, with repository contracts, status records, decision logs, and verification gates as the control surface.
- Designed and operate selected controls from an anonymized, single-operator governance and agent-control architecture spanning policy-as-code, IaC, Zero Trust networking, local and remote servers, and credential custody.

## Education

### Ph.D., Mathematics

University of Montana, Missoula, MT · 2013

Dissertation: *Peripherally-Multiplicative Spectral Preservers Between Function Algebras*.

## Publications

Cadieux, J. M., Pyhala, S. L., & Johnson, J. V. (2023). Pediatric Walking Speed Normal Reference Values in a Local Population. *Pediatric Physical Therapy*, 35(3), 326-331. Led the statistical analysis.

Johnson, J. V., & Tonev, T. (2012). Spectral Conditions for Composition Operators on Algebras of Functions. *Communications in Mathematics and Applications*, 3(1).
