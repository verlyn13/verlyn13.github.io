# Jeffrey V. Johnson, Ph.D.

Building foundations for reliable, specification-driven agentic development

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

Ph.D. mathematician and systems builder with a backend orientation. Builds the
foundations that let agents contribute reliable, specification-conforming work:
typed contracts, bounded authority, reproducible tool and runtime environments,
deterministic gates, and evidence-preserving handbacks. Tests those foundations
by using them to build complex applications, data pipelines, evaluation systems,
and infrastructure. Strongest fit: research engineering in model evaluations,
agent systems, and evaluation infrastructure.

## Core skills

Specifications and verification: typed contracts, Zod, JSON Schema, executable
specifications, ADRs, decision ledgers, deterministic fitness gates, conformance
gates, independent recompute-or-refuse verification, provenance,
evidence-preserving handbacks, evidence-first audit methodology.

Agent systems and bounded authority: capability models, operation models,
execution contexts, agent mandates, scoped authorization grants, approvals,
leases, audit chains, sandboxing, egress policy, default-deny command
allowlisting, no-commit gates, safeguards infrastructure, AI control.

Reproducible environments and policy-as-code: managed human and agent shell
modes, mise, direnv, tool resolution, runtime resolution, OPA, Rego, OpenTofu,
GitHub-provider governance-as-code, static policy checks, schema drift checks.

Model evaluation and agent infrastructure: model evaluation, harness evaluation,
evidence contracts, evaluation pipelines, coding-agent workflows,
OpenAI-compatible LLM gateways, capability aliasing, provider resolution,
per-client policy, budget controls, Ollama, trace pipelines, provenance
pipelines, evidence pipelines.

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

## Foundation and public implementation evidence

### Host Capability Substrate

Role and domain: typed capability, operation, execution-context, policy,
evidence, approval, lease, audit, and authorization contracts for host-level
agent work.

Technology: TypeScript, Zod, JSON Schema, GitHub Actions.

Evidence:

- Designed 46 Zod entity schemas compiled to 67 generated JSON Schemas, with
  about 500 tests.
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

Role and domain: anonymized private case study; control framework for
agent-assisted work; agent governance; safeguards; policy-as-code.

Technology: OpenTofu, OPA, Rego, TypeScript, Cloudflare, Hetzner, Proxmox,
GitHub governance-as-code.

Evidence:

- Designed a multi-repository architecture that separates human policy and
  decision rights, agent mandates, capability and credential reach,
  infrastructure enforcement, runtime admission, and repository-local authority.
- Modeled effective agent authority as the intersection of mandate, available
  capability, and credential reach, with value-blind handbacks when human
  judgment or privileged action is required.
- Connected the design to managed human and agent shell modes, reproducible tool
  and runtime resolution, 26 OPA/conftest plan rules, governance as code, Zero
  Trust infrastructure, and scheduled drift checks.
- Selected controls operate today; runtime admission remains source-tested rather
  than a live request-path gate. Single-operator case study; no enterprise-
  adoption claim. Private organization name intentionally omitted.

Public case study: https://jvjohnson.dev/projects/governance-agent-control.html

### Agentic Architecture Audit

Role and domain: independent specification and drift verification for
agent-operated codebases; governance; safeguards; agent security.

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
- Converted audit findings into repeatable fitness functions while keeping
  evidence-first discovery separate from human judgment.

Public proof: https://github.com/verlyn13/agentic-architecture-audit

## Proving grounds and delivery evidence

### Agentic-Coding Evaluation Lab

Role and domain: specialized proving ground for fail-closed model-evaluation
evidence, evidence contracts, and independent verification.

Technology: Python, Quarto, JSON contracts; private gateway, harness, and trace
integrations.

Evidence:

- Built and published a model-evaluation methodology and verification prototype
  that preserves evidence and withholds a recommendation when scientific
  prerequisites are incomplete.
- Built a draft evidence contract and a separate verifier that independently
  recalculates a synthetic `NOT_EVALUABLE` outcome and rejects missing,
  inconsistent, or altered evidence.
- Current proof is tested framework behavior and synthetic conformance, with no
  powered real-model result or promotion claim.

Public methodology: https://jvjohnson.dev/eval-lab-methodology/

### Budget Triage

Role and domain: private financial application and development-substrate proving
ground; backend and data integrity; model-risk controls; human review.

Technology: Bun, TypeScript, Hono, PostgreSQL, Zod, Decimal.js, Plaid,
Infisical, OpenTelemetry.

Evidence:

- Developed under 19 executable specification contracts, machine-readable agent
  authority boundaries, fail-closed pre-write hooks, and a 34-gate validation
  chain shared across local and secretless CI contexts.
- Implemented tenant isolation, exact monetary arithmetic, atomic persistence,
  append-only decisions, authentication, connected-account, secret-custody, and
  observability surfaces.
- Prepared a sanitized, MIT-licensed public source candidate that passed its
  full validation gate on 2026-07-18. It is intended for employer exploration
  after final operator review; no public source link or contribution policy is
  available yet.
- Synthetic known-answer result: 6 passing and 9 pending assertions; incomplete
  and uncertified.
- Private/no-link working prototype. No production, real-user,
  financial-outcome, live-provider-performance, tax-readiness, or completed
  source-through-tax claim.

Public-safe project page: https://jvjohnson.dev/projects/budget-triage.html

### ScopeCam

Role and domain: native Android application and physical-evidence proving ground;
USB/UVC microscope camera runtime; client-delivered alpha.

Technology: Android, Kotlin, Jetpack Compose, C++20, JNI, NDK, USB, UVC.

Evidence:

- Built a multi-module Android microscope application spanning Compose UI,
  Kotlin orchestration, a native C++ camera engine, USB lifecycle, persistence,
  diagnostics, and physical-device verification.
- Used repository operating contracts and explicit PASS/FAIL handbacks to keep
  static validation separate from hardware evidence.
- Delivered a signed client alpha. Private/no-link source; no broad release,
  arbitrary-device compatibility, or production-readiness claim.

Public-safe project page: https://jvjohnson.dev/projects/scopecam.html

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

Independent systems engineer and researcher
Self-directed; Happy Patterns LLC product entity
Homer, Alaska
2023-present

- Develop the specification, authority, environment, and verification foundations
  for reliable agent-assisted software engineering across a multi-repository
  research program.
- Test the substrate by building applications, data pipelines, evaluation
  systems, and infrastructure, with repository contracts, status records,
  decision logs, and deterministic gates as the control surface.
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
