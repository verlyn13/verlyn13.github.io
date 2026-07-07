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

Ph.D. mathematician and backend-oriented systems builder focused on agentic AI
evaluation, governance, and systems engineering. Strongest fit: evaluations and
agent-governance engineering, pairing probabilistic AI tooling with
deterministic, machine-checkable verification.

Primary portfolio pillars:

- Agentic-Coding Evaluation Lab for empirical model and harness evaluation.
- Anonymized governance/security case study for agent authority, policy-as-code,
  evidence-first audit, safeguards infrastructure, and agent-security controls.

## Core skills

Evaluations and agentic AI: model evaluation, harness evaluation, reliability
evals, capability evals, statistical promotion gates, coding-agent workflows,
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
RedisJSON, RediSearch, pgvector, Android, Kotlin, USB, UVC, libusb, libuvc,
JNI, NDK, C, C++, CMake.

Languages and statistics: Python, TypeScript, Kotlin, C, C++, Ruby, SQL, Bash,
Wilson intervals, bootstrap confidence intervals, paired sign tests, applied
statistics, statistical inference.

## Selected evidence

### Agentic-Coding Evaluation Lab

Role and domain: empirical evaluation of coding agents; model evaluation;
agentic AI; evaluation harnesses.

Technology: Python, Redis, Ollama, TypeScript sibling services,
OpenAI-compatible LLM gateway.

Evidence:

- Built a four-service local stack to make coding-agent deployment decisions
  empirical, separating control and transport, editing, measurement, and
  Redis-backed evidence persistence.
- Implemented reliability, capability, and promotion evaluations with Wilson
  intervals, seeded bootstrap confidence intervals, and paired sign tests behind
  a promotion gate.
- Produced an evidence-based no-go decision that refused to promote a 32B
  candidate model over the incumbent after it failed significance, latency, and
  must-not-break criteria.
- Added fail-closed model-provenance hash verification, default-deny command
  allowlisting, isolated per-evaluation workspaces, explicit egress boundaries,
  and a no-commit fitness gate.

### audit-spec

Role and domain: evidence-first audit methodology for AI-agent-operated
codebases; governance; safeguards; agent security.

Technology: specification authoring, Python tooling, JSON schemas, pre-commit,
CI.

Evidence:

- Authored a two-stage, evidence-first audit specification of more than 2,000
  lines that separates discovery from judgment to counter LLM confirmation bias.
- Defined an 11-dimension rubric, 12 JSON output schemas, and a severity x
  confidence x weight priority model.
- Built a stdlib-only Python drift linter with 10 deterministic checks,
  including content-hash binding of derived documents to specification bytes.
- Wired a 27-case negative self-test into pre-commit and CI.
- Applied the methodology to an external project that adopted seven of its
  fitness functions.

### Host Capability Substrate

Role and domain: typed governance layer for host-level AI agents; capabilities;
policy decisions; authorization grants; audit chains.

Technology: TypeScript, Zod, JSON Schema, GitHub Actions.

Evidence:

- Designed a domain ontology of 46 Zod entity schemas compiled to 67 generated
  JSON Schemas, with 497 tests.
- Modeled capabilities, policy and gateway decisions, provenance-typed evidence
  with an authority hierarchy, tamper-evident audit chains, and scoped, expiring
  authorization grants.
- Authored a 19-invariant governance charter and four-ring layered architecture
  with strict import-boundary discipline.
- Enforced merge-time discipline with a single CI gate composing 12 static
  policy, boundary, secret, and schema-drift scanners on GitHub Actions.

### Governance-First Infrastructure

Role and domain: anonymized policy-as-code case study; private multi-repo
governance estate; agent authority; infrastructure governance; Zero Trust.

Technology: OpenTofu, OPA, Rego, conftest, Cloudflare, Hetzner, Proxmox,
Pulumi, TypeScript, GitHub branch protection.

Evidence:

- Built a blocking policy-as-code gate that converts every OpenTofu plan touched
  by a PR to JSON and evaluates it in CI with OPA/conftest against 26
  least-privilege and Cloudflare-baseline deny rules.
- Backed the gate with GitHub production-environment approval, nightly drift
  detection on a self-hosted runner, and GitHub branch-protection rulesets
  codified in OpenTofu.
- Built a separate Pulumi/TypeScript control plane for a home Cloudflare Zero
  Trust DNS-filtering setup, validated by 168 passing contract tests in CI.
- Private organization name intentionally omitted.

### ScopeCam

Role and domain: native systems proof point; Android USB microscopy; systems
engineering.

Technology: Android, Kotlin, C, C++, JNI, NDK, USB, UVC, libusb, libuvc,
libjpeg-turbo, REST, WebSocket.

Evidence:

- Built a multi-module native Android/UVC imaging engine to master native
  concurrency, JNI/NDK, and USB device handling.
- Compiled libusb, libuvc, and libjpeg-turbo behind a zero-copy ring-buffer
  pipeline.
- Root-caused and fixed a JVM-monitor deadlock in native USB-replug teardown.
- Instrumented runtime telemetry over REST and WebSocket.
- Commercial licensing and SDK discussion is in progress; this is not presented
  as a shipped product.

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

- Pursue a self-directed research program across 150+ repositories in agentic
  AI, evaluation and alignment, systems engineering, and machine-checkable
  governance.
- Use AI agents to learn and stress-test software-engineering paradigms end to
  end, with repo contracts, status records, decision logs, and verification gates
  as the control surface.
- Operate a private, single-operator governance-first infrastructure estate:
  policy-as-code, infrastructure as code, Zero Trust networking, local and remote
  servers, and secrets custody.

## Education

Ph.D., Mathematics
University of Montana, Missoula, MT
2013
Dissertation: Peripherally-Multiplicative Spectral Preservers Between Function
Algebras.

B.A., Mathematics
Humboldt State University
2004

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
