# Jeffrey V. Johnson, Ph.D.

**Building foundations for reliable, specification-driven agentic development**
Specifications, bounded agent systems, reproducible environments, verification
Homer, Alaska · jeffrey@jvjohnson.dev · github.com/verlyn13 ·
linkedin.com/in/drjeffreyjohnson

## Summary

Ph.D. mathematician and systems builder with a backend orientation. I build the
foundations that let agents contribute reliable, specification-conforming work:
typed contracts, bounded authority, reproducible tool and runtime environments,
deterministic gates, and evidence-preserving handbacks. I test those foundations
by using them to build complex applications, data pipelines, evaluation systems,
and infrastructure. My strongest fit is research engineering in model
evaluations, agent systems, and evaluation infrastructure.

## Foundation and public implementation evidence

### Host Capability Substrate - typed capability and evidence contracts

**TypeScript, Zod, JSON Schema, GitHub Actions**

- Designed 46 Zod entity schemas compiled to 67 generated JSON Schemas, with
  about 500 tests.
- Modeled host capabilities, operations, execution contexts, policy decisions,
  provenance-typed evidence, approvals, leases, audit chains, and scoped
  authorization grants.
- Authored a 19-invariant governance charter and four-ring architecture with a
  composed CI gate for policy, boundary, secret, and schema-drift checks.
- Kept the evidence boundary explicit: public typed model and enforced source
  boundaries, not universal host-level runtime enforcement.

Public proof: https://github.com/jefahnierocks/host-capability-substrate

### Governance and agent-control architecture - control framework for agent-assisted work

**An anonymized private case study; OpenTofu, OPA/Rego, TypeScript, Cloudflare,
Hetzner, Proxmox**

- Designed a multi-repository architecture that separates human policy and
  decision rights, agent mandates, capability and credential reach,
  infrastructure enforcement, runtime admission, and repository-local authority.
- Modeled effective agent authority as the intersection of mandate, available
  capability, and credential reach, with value-blind handbacks when human
  judgment or privileged action is required.
- Connected the design to managed human and agent shell modes, reproducible tool
  and runtime resolution, 26 OPA/conftest plan rules, governance as code, Zero
  Trust infrastructure, and scheduled drift checks.
- Kept maturity boundaries explicit: selected controls operate today, while
  runtime admission remains source-tested rather than a live request-path gate;
  the case study is single-operator and makes no enterprise-adoption claim.

Public case study: https://jvjohnson.dev/projects/governance-agent-control.html

### Agentic Architecture Audit - independent specification and drift verification

**Specification and Python tooling**

- Authored a two-stage, evidence-first `audit-spec` of 2,075 lines that separates
  discovery from judgment to counter LLM confirmation bias.
- Defined an 11-dimension rubric, 12 JSON output schemas, and a severity x
  confidence x weight priority model.
- Built a stdlib-only Python drift linter with 10 deterministic checks,
  including content-hash binding of derived documents to specification bytes.
- Wired a 27-case negative self-test into pre-commit and CI.
- Converted audit findings into repeatable fitness functions while keeping
  evidence-first discovery separate from human judgment.

Public proof: https://github.com/verlyn13/agentic-architecture-audit

## Proving grounds and delivery evidence

### Agentic-Coding Evaluation Lab - fail-closed evaluation evidence

**Python, Quarto, JSON contracts; private gateway, harness, and trace integrations**

- Built and published a model-evaluation methodology and verification prototype
  that preserves evidence and withholds a recommendation when scientific
  prerequisites are incomplete.
- Built a draft evidence contract and a separate verifier that independently
  recalculates a synthetic `NOT_EVALUABLE` outcome and rejects missing,
  inconsistent, or altered evidence.
- Documented the evidence boundary explicitly: tested framework behavior and
  synthetic conformance, with no powered real-model result or promotion claim.

Methodology and evidence: https://jvjohnson.dev/eval-lab-methodology/

### Budget Triage - financial application and development-substrate proving ground

**Private Bun/TypeScript/Hono/PostgreSQL working prototype**

Private financial evidence workbench combining deterministic-first document
processing, provenance, tenant isolation, exact monetary semantics, and
fail-closed human review. Private technical walkthrough available during an
interview process.

- Developed under 19 executable specification contracts, machine-readable agent
  authority boundaries, fail-closed pre-write hooks, and a 34-gate validation
  chain shared across local and secretless CI contexts.
- Implemented tenant isolation, exact monetary arithmetic, atomic persistence,
  append-only decisions, authentication, connected-account, secret-custody, and
  OpenTelemetry surfaces.
- Prepared a sanitized, MIT-licensed public source candidate that passed its
  full validation gate on 2026-07-18. It is intended for employer exploration
  after final operator review; no public source link or contribution policy is
  available yet.
- Its synthetic known-answer result is 6 passing and 9 pending assertions,
  explicitly incomplete and uncertified; no production, financial-outcome,
  live-provider-performance, or source-through-tax claim.

Public-safe project page: https://jvjohnson.dev/projects/budget-triage.html

### ScopeCam - native application and physical-evidence proving ground

**Private Android/Kotlin/Jetpack Compose/C++20/JNI/NDK/USB/UVC application**

- Built a multi-module Android microscope application spanning Compose UI,
  Kotlin orchestration, a native C++ camera engine, USB lifecycle, persistence,
  diagnostics, and physical-device verification.
- Used repository operating contracts and explicit PASS/FAIL handbacks to keep
  static validation separate from hardware evidence.
- Delivered a signed client alpha; no public source, broad release,
  arbitrary-device compatibility, or production-readiness claim.

Public-safe project page: https://jvjohnson.dev/projects/scopecam.html

### Dicee - representative delivered software

**Rust, WebAssembly, SvelteKit, Cloudflare Durable Objects, WebSockets**

- Built and deployed a family multiplayer game with a Rust-to-WebAssembly rules
  engine, realtime state through Cloudflare Durable Objects and WebSockets, and
  a SvelteKit client.
- Public source and a live deployment demonstrate end-to-end delivery; traffic,
  performance, bundle-size, and current test-count claims remain withheld.

Public project: https://jvjohnson.dev/projects/dicee.html

## Technical skills

- **Specifications and verification:** typed contracts, Zod, JSON Schema,
  executable specifications, ADRs, decision ledgers, deterministic fitness and
  conformance gates, independent recompute-or-refuse verification, provenance,
  and evidence-preserving handbacks.
- **Agent systems and bounded authority:** capability and operation models,
  execution contexts, agent mandates, scoped authorization grants, approvals,
  leases, audit chains, sandboxing, egress policy, default-deny command
  allowlisting, and no-commit gates.
- **Reproducible environments and policy-as-code:** managed human and agent shell
  modes, mise, direnv, tool and runtime resolution, OPA/Rego, OpenTofu,
  GitHub-provider governance-as-code, and CI policy checks.
- **Model evaluation and infrastructure:** model and harness evaluation,
  evidence contracts, evaluation pipelines, coding-agent workflows,
  OpenAI-compatible LLM gateways, provider resolution, per-client policy,
  Cloudflare Zero Trust, Hetzner, Proxmox VE, Docker, GitHub Actions CI/CD,
  self-hosted runners, and OpenTelemetry.
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

### Independent systems engineer and researcher (self-directed)

**Self-directed; Happy Patterns LLC product entity | Homer, Alaska | 2023-present**

- Develop the specification, authority, environment, and verification foundations
  for reliable agent-assisted software engineering across a multi-repository
  research program.
- Test the substrate by building applications, data pipelines, evaluation
  systems, and infrastructure, with repository contracts, status records,
  decision logs, and deterministic gates as the control surface.
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
