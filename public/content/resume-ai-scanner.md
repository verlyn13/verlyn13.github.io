# Jeffrey V. Johnson, Ph.D.

Building infrastructure for model evaluation and agent systems

Location: Homer, Alaska
Email: jeffrey@jvjohnson.dev
Website: https://jvjohnson.dev
GitHub: https://github.com/verlyn13
LinkedIn: https://linkedin.com/in/drjeffreyjohnson

## Target roles

Research engineer; model evaluation engineer; agent systems engineer; evaluation
infrastructure engineer; safeguards engineer.

## Summary

Ph.D. mathematician and systems builder focused on the infrastructure that makes
agent-assisted development reliable: typed contracts, explicit permissions,
reproducible environments, automated checks, and reviewable evidence. Applies
these controls while building applications, data pipelines, evaluation systems,
and infrastructure. Strongest fit: agent systems, developer infrastructure,
model evaluation, and safeguards.

## Core skills

Languages: Python, TypeScript, SQL, Bash, Kotlin, C, C++, Ruby.

Contracts and controls: Zod, JSON Schema, OPA, Rego, OpenTofu, typed
authorization, sandboxing, egress policy, provenance, schema drift checks,
policy checks, CI-enforced conformance.

Agent and evaluation systems: model evaluation, harness evaluation, evidence
contracts, separate-verifier result recomputation, OpenAI-compatible LLM gateways,
provider routing, coding-agent workflows, trace pipelines, provenance pipelines.

Infrastructure and data: PostgreSQL, Supabase, TimescaleDB, Redis, pgvector,
Cloudflare Zero Trust, Hetzner, Proxmox, Docker, GitHub Actions, self-hosted
runners, OpenTelemetry, Infisical, 1Password.

Native and application systems: Android, Kotlin, Jetpack Compose, USB, UVC,
libusb, libuvc, JNI, NDK, CMake, WebAssembly.

Mathematics and statistics: functional analysis, applied statistics, Wilson
intervals, bootstrap confidence intervals, paired sign tests, statistical
inference.

## Agent-development infrastructure

### Host Capability Substrate

Typed contracts for host capabilities, operations, execution contexts, policy
decisions, evidence, approvals, leases, audits, and authorization.

Technology: TypeScript, Zod, JSON Schema, GitHub Actions.

Evidence:

- Built 46 Zod entity schemas compiled to 67 generated JSON Schemas, with about
  500 tests.
- Modeled host capabilities, operations, execution contexts, policy decisions,
  provenance-typed evidence, approvals, leases, audit chains, and scoped
  authorization grants.
- Authored a 19-invariant governance charter and four-ring architecture.
- Enforced merge-time discipline with a composed CI policy, boundary, secret,
  and schema-drift gate.
- Public typed model and enforced source boundaries; no universal host-level
  runtime-enforcement claim.

Public proof: https://github.com/jefahnierocks/host-capability-substrate

### Governance and agent-control architecture

An anonymized private case study in agent governance, safeguards, and
policy-as-code.

Technology: OpenTofu, OPA, Rego, TypeScript, Cloudflare, Hetzner, Proxmox,
GitHub governance-as-code.

Evidence:

- Designed a multi-repository architecture that separates human decision rights,
  agent permissions, capability and credential reach,
  infrastructure enforcement, runtime admission, and repository-local authority.
- Modeled agent authority as the intersection of mandate, available capability,
  and credential reach, with structured, secret-free handbacks for human
  judgment or privileged work.
- Implemented selected controls including 26 OPA/conftest plan rules,
  repository governance as code, Zero Trust infrastructure, and scheduled drift
  checks.
- Selected controls are operational; runtime admission is source-tested rather
  than deployed across the organization. Single-operator case study; no
  enterprise-adoption claim.

Public case study: https://jvjohnson.dev/projects/governance-agent-control.html

### Agentic Architecture Audit

Specification and drift verification for agent-operated codebases.

Technology: specification authoring, Python tooling, JSON schemas, pre-commit,
CI.

Evidence:

- Authored a two-stage `audit-spec` of 2,075 lines that keeps evidence collection
  separate from judgment.
- Defined an 11-dimension rubric, 12 JSON output schemas, and a prioritization
  model based on severity, confidence, and weight.
- Built a stdlib-only Python drift linter with 10 deterministic checks,
  including content-hash binding of derived documents to specification bytes.
- Wired a 27-case negative self-test into pre-commit and CI.

Public proof: https://github.com/verlyn13/agentic-architecture-audit

## Selected applications and evaluations

### Agentic-Coding Evaluation Lab

Public methodology and verification prototype for fail-closed model-evaluation
evidence.

Technology: Python, Quarto, JSON contracts.

Evidence:

- Built and published a model-evaluation methodology and verification prototype
  that preserves evidence and withholds a recommendation when scientific
  prerequisites are incomplete.
- Built a draft evidence contract and a separate verifier that
  recalculates a synthetic `NOT_EVALUABLE` outcome and rejects missing,
  inconsistent, or altered evidence.
- Current proof is tested framework behavior and synthetic conformance, with no
  powered real-model result or promotion claim.

Public methodology: https://jvjohnson.dev/eval-lab-methodology/

### Budget Triage

Financial evidence workbench for backend data integrity, model-risk controls,
and human review. A sanitized public source snapshot is available; active
development remains private. Not deployed.

Technology: Bun, TypeScript, Hono, PostgreSQL, Zod, Decimal.js, Plaid,
Infisical, OpenTelemetry.

Evidence:

- Built workflows for statements, receipts, and connected-account data with
  deterministic-first processing and human review.
- Implemented exact monetary arithmetic, tenant-scoped atomic persistence,
  append-only decision records, authentication, Plaid, Infisical, and
  OpenTelemetry.
- Built a synthetic known-answer and service-observation harness. Current result:
  6 passing and 9 pending assertions; incomplete and uncertified.
- Published a sanitized, MIT-licensed source snapshot for employer review on
  2026-07-21. Publication is not deployment or an open contribution surface.
- Public source: https://github.com/jefahnierocks/budget-triage

Public-safe project page: https://jvjohnson.dev/projects/budget-triage.html

### ScopeCam

Private Android USB/UVC microscope application and client-delivered alpha.

Technology: Android, Kotlin, Jetpack Compose, C++20, JNI, NDK, USB, UVC.

Evidence:

- Built a multi-module Android microscope application spanning Compose UI,
  Kotlin orchestration, a native C++ camera engine, USB lifecycle, persistence,
  diagnostics, and physical-device verification.
- Diagnosed a camera-replug ANR across the JVM/native teardown boundary and
  implemented a device-verified recovery with the remaining leak tradeoff
  documented.
- Delivered a signed client alpha. Private source; not broadly released.

Public-safe project page: https://jvjohnson.dev/projects/scopecam.html

### Dicee

Live family multiplayer game for mobile browsers.

Technology: Rust, WebAssembly, SvelteKit, Cloudflare Durable Objects,
WebSockets.

Evidence:

- Built and deployed a family multiplayer game with a Rust-to-WebAssembly rules
  engine, real-time state through Cloudflare Durable Objects and WebSockets, and
  a SvelteKit client.
- Public source and a live deployment demonstrate end-to-end delivery. Traffic,
  performance, bundle-size, and current test-count claims remain withheld.

Public project: https://jvjohnson.dev/projects/dicee.html

## Professional experience

Associate Professor of Mathematics, tenured
Kenai Peninsula College, University of Alaska Anchorage
Homer, Alaska
August 2017-present

- Teach undergraduate mathematics and statistics, including calculus and applied
  statistics.
- Full teaching-and-service appointment; awarded tenure in 2023.
- Consult for local non-profit organizations on statistical interpretation and
  study design.
- Communicate technical and mathematical ideas to audiences with widely varying
  backgrounds.

Assistant Professor of Mathematics
American University in Cairo
2014-2017

Post-doctoral Lecturer / Course Coordinator
University of Montana
2008-2014

Independent systems engineer and researcher
Self-directed; Happy Patterns LLC product entity
Homer, Alaska
2023-present

- Build and maintain a multi-repository engineering program for reliable,
  specification-driven agent development across applications, data pipelines,
  evaluation systems, and infrastructure.
- Develop repository contracts, managed human and agent shell environments,
  typed authority models, and automated verification gates.
- Designed and operate selected controls from an anonymized, single-operator
  governance and agent-control architecture spanning policy-as-code,
  infrastructure as code, Zero Trust networking, local and remote servers, and
  credential custody.

## Education

Ph.D., Mathematics
University of Montana, Missoula, MT
2013
Dissertation: Peripherally-Multiplicative Spectral Preservers Between Function
Algebras.

## Publications

Cadieux, J. M., Pyhala, S. L., and Johnson, J. V. (2023). Pediatric Walking
Speed Normal Reference Values in a Local Population. Pediatric Physical Therapy,
35(3), 314-320. Led the statistical analysis.

Johnson, J. V., and Tonev, T. (2012). Spectral Conditions for Composition
Operators on Algebras of Functions. Communications in Mathematics and
Applications, 3(1).
