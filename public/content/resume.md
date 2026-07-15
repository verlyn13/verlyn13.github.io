# Jeffrey V. Johnson, Ph.D.

**Evaluations and agent-governance engineer**
Agentic AI, evaluation and alignment, machine-checkable verification
Homer, Alaska · jeffrey@jvjohnson.dev · github.com/verlyn13 ·
linkedin.com/in/drjeffreyjohnson

## Summary

Ph.D. mathematician and self-directed systems researcher with a backend
orientation. My strongest fit is evaluations and agent-governance engineering:
pairing probabilistic AI tooling with deterministic, machine-checkable
verification. I build systems that make AI-assisted work measurable,
governable, and auditable: deciding whether model evidence supports a change,
defining what agents may do, and preserving evidence and human review in
consequential workflows. I am strongest where the work needs engineering
judgment, evidence discipline, and clear boundaries around agentic systems.

## Selected systems and research evidence

The first three projects show the throughline from evaluation evidence, to agent
authority, to an applied financial workflow. The remaining projects provide
focused evidence in typed authorization, audit methodology, and delivered
software.

### Agentic-Coding Evaluation Lab - fail-closed evaluation evidence

**Python, Quarto, JSON contracts; private gateway, harness, and trace integrations**

- Built and published a model-evaluation methodology and verification prototype
  that preserves evidence and withholds a recommendation when scientific
  prerequisites are incomplete.
- Built a draft evidence contract and a separate verifier that independently
  recalculates a synthetic `NOT_EVALUABLE` outcome and rejects missing,
  inconsistent, or altered evidence.
- Connected private evaluation components with byte-for-byte contract checks and
  controls that keep scored runs disabled until prerequisites are met; kept
  operational trace data separate from the authoritative study record.
- Documented the evidence boundary explicitly: tested framework behavior and
  synthetic conformance, with no powered real-model result or promotion claim.

Methodology and evidence: https://jvjohnson.dev/eval-lab-methodology/

### Governance and agent-control architecture - federated authority for AI-assisted work

**An anonymized private case study; OpenTofu, OPA/Rego, TypeScript, Cloudflare,
Hetzner, Proxmox**

- Designed a multi-repository architecture that separates human policy and
  decision rights, agent mandates, identity and authorization, infrastructure
  enforcement, runtime admission, and repository-local authority.
- Modeled effective agent authority as the intersection of mandate, available
  capability, and credential reach, with value-blind handbacks when human
  judgment or privileged action is required.
- Connected the design to selected operational controls: 26 OPA/conftest plan
  rules, branch and repository governance as code, same-run saved-plan
  promotion, Zero Trust infrastructure, and scheduled drift checks across four
  workspaces.
- Kept maturity boundaries explicit: selected controls operate today, while
  runtime admission remains source-tested rather than a live request-path gate;
  the case study is single-operator and makes no enterprise-adoption claim.

Public case study: https://jvjohnson.dev/projects/governance-agent-control.html

### Budget Triage - financial evidence workbench

**Private Bun/TypeScript/Hono/PostgreSQL working prototype**

Private financial evidence workbench combining deterministic-first document
processing, provenance, tenant isolation, exact monetary semantics, and
fail-closed human review. Private technical walkthrough available during an
interview process.

- Implemented tenant isolation, exact monetary arithmetic, atomic persistence,
  append-only categorization decisions, authentication, connected-account,
  secret-custody, and OpenTelemetry surfaces; accepted `main` passed full
  validation.
- Added a merged synthetic known-answer certification slice with rollback
  validation and structured service-level evidence events; its current result is
  6 passing and 9 pending assertions, explicitly incomplete and uncertified.
- Established an independently verified, bounded synthetic browser-to-service
  observation with matching correlation evidence; this does not prove UI state,
  production operation, financial correctness, or source-through-tax execution.
- Makes no production, real-user, financial-outcome, live-provider-performance,
  tax-readiness, or completed source-through-tax claim.

Public-safe project page: https://jvjohnson.dev/projects/budget-triage.html

### Host Capability Substrate - typed governance layer for host-level AI agents

**TypeScript, Zod, JSON Schema**

- Designed a domain ontology of 46 Zod entity schemas compiled to 67 generated
  JSON Schemas, with about 500 tests.
- Modeled capabilities, policy/gateway decisions, provenance-typed evidence with
  an authority hierarchy, tamper-evident audit chains, and scoped, expiring
  authorization grants.
- Authored a 19-invariant governance charter and four-ring layered architecture
  with strict import-boundary discipline.
- Enforced merge-time discipline with a single CI gate composing 12 static
  policy, boundary, secret, and schema-drift scanners on GitHub Actions.

Public proof: https://github.com/jefahnierocks/host-capability-substrate

### Agentic Architecture Audit - evidence-first audit methodology for AI-agent-operated codebases

**Specification and Python tooling**

- Authored a two-stage, evidence-first `audit-spec` of 2,075 lines that separates
  discovery from judgment to counter LLM confirmation bias.
- Defined an 11-dimension rubric, 12 JSON output schemas, and a severity x
  confidence x weight priority model.
- Built a stdlib-only Python drift linter with 10 deterministic checks,
  including content-hash binding of derived documents to specification bytes.
- Wired a 27-case negative self-test into pre-commit and CI.

Public proof: https://github.com/verlyn13/agentic-architecture-audit

### Dicee - representative delivered software

**Rust, WebAssembly, SvelteKit, Cloudflare Durable Objects, WebSockets**

- Built and deployed a family multiplayer game with a Rust-to-WebAssembly rules
  engine, realtime state through Cloudflare Durable Objects and WebSockets, and
  a SvelteKit client.
- Public source and a live deployment demonstrate end-to-end delivery; traffic,
  performance, bundle-size, and current test-count claims remain withheld.

Public project: https://jvjohnson.dev/projects/dicee.html

## Technical skills

- **Evaluations and agentic AI:** model and harness evaluation, evidence
  contracts, recompute-or-refuse verification, coding-agent workflows,
  OpenAI-compatible LLM gateways, capability aliasing, provider resolution,
  per-client policy, budget controls, Ollama, trace/provenance/evidence
  pipelines.
- **Safety and governance controls:** sandboxing, egress policy, provenance
  verification, default-deny command allowlisting, no-commit gates, typed
  authorization grants, audit chains, evidence-first audit methodology.
- **Policy-as-code and contracts:** OPA/Rego, OpenTofu, GitHub-provider
  governance-as-code, Zod, JSON Schema, ADRs, decision ledgers, fitness and
  conformance gates.
- **Infrastructure and platform:** Cloudflare Zero Trust, Gateway, WARP, Access,
  Tunnel, Cloudflare Pages/DNS, Hetzner, Proxmox VE, Docker, Docker Compose,
  Traefik, GitHub Actions CI/CD, self-hosted runners, OpenTelemetry, Infisical,
  1Password custody.
- **Data and systems:** PostgreSQL, Supabase, TimescaleDB, Redis Stack,
  RedisJSON, RediSearch, pgvector, Android, Kotlin, Jetpack Compose, USB/UVC,
  JNI/NDK, C/C++, CMake.
- **Languages and statistics:** Python as primary, TypeScript, Kotlin, C/C++,
  Ruby, SQL, Bash; Wilson intervals, bootstrap confidence intervals, paired sign
  tests, applied statistics, statistical inference.

## Professional experience

### Associate Professor of Mathematics (tenured) - Kenai Peninsula College, University of Alaska Anchorage

**Homer, Alaska | August 2017-present**
Previously American University in Cairo, 2014-2017; University of Montana,
2008-2014.

- Teach undergraduate mathematics and statistics, including calculus and applied
  statistics; full teaching-and-service appointment; awarded tenure in 2023.
- Consult for local non-profit organizations on statistical interpretation and
  study design.
- Communicate technical and mathematical ideas to audiences with widely varying
  backgrounds.

### Independent systems engineer and applied-AI researcher (self-directed)

**Self-directed; Happy Patterns LLC product entity | Homer, Alaska | 2023-present**

- Pursue a multi-repository self-directed research program in agentic AI,
  evaluation and alignment, systems engineering, and machine-checkable
  governance.
- Use AI agents to build and stress-test software-engineering systems end to end,
  with repository contracts, status records, decision logs, and verification
  gates as the control surface.
- Designed and operate selected controls from an anonymized, single-operator
  governance and agent-control architecture spanning policy-as-code, IaC, Zero
  Trust networking, local and remote servers, and credential custody.

## Education

**Ph.D., Mathematics - University of Montana, Missoula, MT | 2013**
Dissertation: *Peripherally-Multiplicative Spectral Preservers Between Function
Algebras*.

## Publications

- Cadieux, J. M., Pyhala, S. L., & Johnson, J. V. (2023). Pediatric Walking
  Speed Normal Reference Values in a Local Population. *Pediatric Physical
  Therapy*, 35(3), 326-331. Led the statistical analysis.
- Johnson, J. V., & Tonev, T. (2012). Spectral Conditions for Composition
  Operators on Algebras of Functions. *Communications in Mathematics and
  Applications*, 3(1).
