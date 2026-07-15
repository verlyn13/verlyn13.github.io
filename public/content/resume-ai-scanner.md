# Jeffrey V. Johnson, Ph.D.

Evaluations and agent-governance engineer

Location: Homer, Alaska
Email: jeffrey@jvjohnson.dev
Website: https://jvjohnson.dev
GitHub: https://github.com/verlyn13
LinkedIn: https://linkedin.com/in/drjeffreyjohnson

## Target roles

Evaluations engineer; AI evaluation engineer; agent-governance engineer;
safeguards engineer; AI control engineer; agent-security engineer; AI
infrastructure engineer; research engineer; policy-as-code engineer.

## Summary

Ph.D. mathematician and self-directed systems researcher with a backend
orientation. Strongest fit: evaluations and agent-governance engineering,
pairing probabilistic AI tooling with deterministic, machine-checkable
verification. Builds systems that make AI-assisted work measurable, governable,
and auditable: deciding whether model evidence supports a change, defining what
agents may do, and preserving evidence and human review in consequential
workflows.

## Core skills

Evaluations and agentic AI: model evaluation, harness evaluation, evidence
contracts, recompute-or-refuse verification, coding-agent workflows,
OpenAI-compatible LLM gateways, capability aliasing, provider resolution,
per-client policy, budget controls, Ollama, trace pipelines, provenance
pipelines, evidence pipelines.

Safety and governance controls: sandboxing, egress policy, provenance
verification, default-deny command allowlisting, no-commit gates, typed
authorization grants, audit chains, evidence-first audit methodology, agent
authority boundaries, safeguards infrastructure, AI control.

Policy-as-code and contracts: OPA, Rego, OpenTofu, GitHub-provider
governance-as-code, Zod, JSON Schema, ADRs, decision ledgers, fitness gates,
conformance gates, static policy checks, schema drift checks.

Infrastructure and platform: Cloudflare Zero Trust, Cloudflare Gateway,
Cloudflare WARP, Cloudflare Access, Cloudflare Tunnel, Cloudflare Pages,
Cloudflare DNS, Hetzner, Proxmox VE, Docker, Docker Compose, Traefik, GitHub
Actions, self-hosted runners, OpenTelemetry, Infisical, 1Password custody.

Data and native systems: PostgreSQL, Supabase, TimescaleDB, Redis Stack,
RedisJSON, RediSearch, pgvector, Android, Kotlin, Jetpack Compose, USB, UVC,
libusb, libuvc, JNI, NDK, C, C++, CMake.

Languages and statistics: Python, TypeScript, Kotlin, C, C++, Ruby, SQL, Bash,
Wilson intervals, bootstrap confidence intervals, paired sign tests, applied
statistics, statistical inference.

## Selected systems and research evidence

### Agentic-Coding Evaluation Lab

Role and domain: fail-closed model-evaluation evidence and reporting; evidence
contracts; independent verification; agentic AI.

Technology: Python, Quarto, JSON contracts; private gateway, harness, and trace
integrations.

Evidence:

- Built and published a model-evaluation methodology and verification prototype
  that preserves evidence and withholds a recommendation when scientific
  prerequisites are incomplete.
- Built a draft evidence contract and a separate verifier that independently
  recalculates a synthetic `NOT_EVALUABLE` outcome and rejects missing,
  inconsistent, or altered evidence.
- Connected private evaluation components with byte-for-byte contract checks and
  controls that keep scored runs disabled until prerequisites are met; kept
  operational trace data separate from the authoritative study record.
- Current proof is tested framework behavior and synthetic conformance, with no
  powered real-model result or promotion claim.

Public methodology: https://jvjohnson.dev/eval-lab-methodology/

### Governance and agent-control architecture

Role and domain: anonymized private case study; federated authority for
AI-assisted work; agent governance; safeguards; policy-as-code.

Technology: OpenTofu, OPA, Rego, TypeScript, Cloudflare, Hetzner, Proxmox,
GitHub governance-as-code.

Evidence:

- Designed a multi-repository architecture that separates human policy and
  decision rights, agent mandates, identity and authorization, infrastructure
  enforcement, runtime admission, and repository-local authority.
- Modeled effective agent authority as the intersection of mandate, available
  capability, and credential reach, with value-blind handbacks when human
  judgment or privileged action is required.
- Connected the design to 26 OPA/conftest plan rules, branch and repository
  governance as code, same-run saved-plan promotion, Zero Trust infrastructure,
  and scheduled drift checks across four workspaces.
- Selected controls operate today; runtime admission remains source-tested rather
  than a live request-path gate. Single-operator case study; no enterprise-
  adoption claim. Private organization name intentionally omitted.

Public case study: https://jvjohnson.dev/projects/governance-agent-control.html

### Budget Triage

Role and domain: private financial evidence workbench; backend and data
integrity; model-risk controls; human review.

Technology: Bun, TypeScript, Hono, PostgreSQL, Zod, Decimal.js, Plaid,
Infisical, OpenTelemetry.

Private financial evidence workbench combining deterministic-first document
processing, provenance, tenant isolation, exact monetary semantics, and
fail-closed human review. Private technical walkthrough available during an
interview process.

Evidence:

- Implemented tenant isolation, exact monetary arithmetic, atomic persistence,
  append-only decisions, authentication, connected-account, secret-custody, and
  observability surfaces; the independently verified Phase 3b receipt passed
  full validation.
- A merged synthetic known-answer certification slice reports 6 passing and 9
  pending assertions; it remains incomplete and uncertified.
- Established bounded synthetic Phase 3b browser-to-service correlation. This
  does not prove UI state, production operation, financial correctness, or
  source-through-tax execution.
- Private/no-link working prototype. No production, real-user,
  financial-outcome, live-provider-performance, tax-readiness, or completed
  source-through-tax claim.

Public-safe project page: https://jvjohnson.dev/projects/budget-triage.html

### Host Capability Substrate

Role and domain: typed governance layer for host-level AI agents; capabilities;
policy decisions; authorization grants; audit chains.

Technology: TypeScript, Zod, JSON Schema, GitHub Actions.

Evidence:

- Designed 46 Zod entity schemas compiled to 67 generated JSON Schemas, with
  about 500 tests.
- Modeled capabilities, policy and gateway decisions, provenance-typed evidence,
  tamper-evident audit chains, and scoped, expiring authorization grants.
- Authored a 19-invariant governance charter and four-ring layered architecture.
- Enforced merge-time discipline with a composed CI policy gate.

Public proof: https://github.com/jefahnierocks/host-capability-substrate

### Agentic Architecture Audit

Role and domain: evidence-first audit methodology for AI-agent-operated
codebases; governance; safeguards; agent security.

Technology: specification authoring, Python tooling, JSON schemas, pre-commit,
CI.

Evidence:

- Authored a two-stage, evidence-first `audit-spec` of 2,075 lines that
  separates discovery from judgment to counter LLM confirmation bias.
- Defined an 11-dimension rubric, 12 JSON output schemas, and a severity x
  confidence x weight priority model.
- Built a stdlib-only Python drift linter with 10 deterministic checks,
  including content-hash binding of derived documents to specification bytes.
- Wired a 27-case negative self-test into pre-commit and CI.

Public proof: https://github.com/verlyn13/agentic-architecture-audit

### Dicee

Role and domain: representative delivered software; live family multiplayer game
for mobile browsers.

Technology: Rust, WebAssembly, SvelteKit, Cloudflare Durable Objects,
WebSockets.

Evidence:

- Built and deployed a family multiplayer game with a Rust-to-WebAssembly rules
  engine, realtime state through Cloudflare Durable Objects and WebSockets, and
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

Independent systems engineer and applied-AI researcher
Self-directed; Happy Patterns LLC product entity
Homer, Alaska
2023-present

- Pursue a multi-repository self-directed research program in agentic AI,
  evaluation and alignment, systems engineering, and machine-checkable
  governance.
- Use AI agents to build and stress-test software-engineering systems end to end,
  with repository contracts, status records, decision logs, and verification
  gates as the control surface.
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
35(3), 326-331. Statistical analysis.

Johnson, J. V., and Tonev, T. (2012). Spectral Conditions for Composition
Operators on Algebras of Functions. Communications in Mathematics and
Applications, 3(1).

## Candid fit note

Academic and self-directed background rather than corporate engineering
background. Systems have not yet been tested at production scale. Strengths:
complete end-to-end system building, fast reading of unfamiliar stacks,
evidence discipline, explicit authority boundaries, and explicit failure-mode
analysis.
