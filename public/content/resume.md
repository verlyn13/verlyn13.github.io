# Jeffrey V. Johnson, Ph.D.

**Evaluations and agent-governance engineer**
Agentic AI, evaluation and alignment, machine-checkable verification
Homer, Alaska · jeffrey@jvjohnson.dev · github.com/verlyn13 ·
linkedin.com/in/drjeffreyjohnson

## Summary

Ph.D. mathematician and backend-oriented systems builder focused on agentic AI
evaluation, governance, and systems engineering. My strongest fit is evaluations
and agent-governance engineering: pairing probabilistic AI tooling with
deterministic, machine-checkable verification. My portfolio has two pillars: an
Agentic-Coding Evaluation Lab for empirical model and harness evaluation, and an
anonymized governance/security case study for agent authority, policy-as-code,
evidence-first audit, and safeguards infrastructure.

## Selected evidence

### Agentic-Coding Evaluation Lab - empirical evaluation of coding agents

**Python, Redis, Ollama, TypeScript sibling services**

- Built the evaluation and evidence layer of a local stack that separates
  transport (an OpenAI-compatible LLM gateway), editing, measurement, and
  Redis-backed evidence, to make coding-agent deployment decisions empirical.
- Implemented reliability, capability, and promotion evaluations with Wilson
  intervals, seeded bootstrap confidence intervals, and paired sign tests behind
  a promotion gate.
- Produced an evidence-based no-go: the promotion gate withheld a 32B candidate
  that scored higher than the incumbent on raw capability, because the seeded
  bootstrap confidence interval lower bound was zero and the gain was not
  statistically significant.
- Added alignment-relevant governance: fail-closed model-provenance hash
  verification, default-deny command allowlisting, isolated per-evaluation
  workspaces, explicit egress boundaries, and a no-commit fitness gate.

### audit-spec - evidence-first audit methodology for AI-agent-operated codebases

**Specification and Python tooling**

- Authored a two-stage, evidence-first audit specification of more than 2,000
  lines that separates discovery from judgment to counter LLM confirmation bias.
- Defined an 11-dimension rubric, 12 JSON output schemas, and a severity x
  confidence x weight priority model.
- Built a stdlib-only Python drift linter with 10 deterministic checks,
  including content-hash binding of derived documents to specification bytes.
- Wired a 27-case negative self-test into pre-commit and CI; ran three
  self-audit cycles and applied the methodology to an external project that
  adopted seven of its fitness functions.

### Host Capability Substrate - typed governance layer for host-level AI agents

**TypeScript, Zod, JSON Schema**

- Designed a domain ontology of 46 Zod entity schemas compiled to 67 generated
  JSON Schemas, with 498 tests.
- Modeled capabilities, policy and gateway decisions, provenance-typed evidence
  with an authority hierarchy, tamper-evident audit chains, and scoped, expiring
  authorization grants.
- Authored a 19-invariant governance charter and four-ring layered architecture
  with strict import-boundary discipline.
- Enforced merge-time discipline with a single CI gate composing 12 static
  policy, boundary, secret, and schema-drift scanners on GitHub Actions.

### Governance-First Infrastructure - policy-as-code case study

**OpenTofu, OPA/Rego, Cloudflare, Hetzner, Proxmox, Pulumi/TypeScript**

An anonymized private governance/security case study. I do not name the private
organization publicly.

- Built a blocking policy-as-code gate that converts every OpenTofu plan touched
  by a PR to JSON and evaluates it in CI with OPA/conftest against 26
  least-privilege and Cloudflare-baseline deny rules.
- Backed the gate with GitHub production-environment approval, nightly drift
  detection on a self-hosted runner, and GitHub branch-protection rulesets
  codified in OpenTofu.
- Built a separate Pulumi/TypeScript control plane for a home Cloudflare Zero
  Trust DNS-filtering setup, validated by 168 passing contract tests in CI.

### ScopeCam - native systems proof point

**Happy Patterns LLC; Android, Kotlin, C/C++/JNI**

- Built a multi-module native Android/UVC imaging engine to master native
  concurrency, JNI/NDK, and USB device handling.
- Compiled libusb, libuvc, and libjpeg-turbo behind a zero-copy ring-buffer
  pipeline.
- Root-caused and fixed a JVM-monitor deadlock in native USB-replug teardown;
  instrumented runtime telemetry over REST and WebSocket.
- Commercial licensing and SDK discussion is in progress; this is not presented
  as a shipped product.

## Technical skills

- **Evaluations and agentic AI:** model and harness evaluation, reliability and
  capability evals, statistical promotion gates, coding-agent workflows,
  OpenAI-compatible LLM gateways, capability aliasing, provider resolution,
  per-client policy, budget controls, Ollama, trace, provenance, and evidence
  pipelines.
- **Safety and governance controls:** sandboxing, egress policy, provenance
  verification, default-deny command allowlisting, no-commit gates, typed
  authorization grants, audit chains, and evidence-first audit methodology.
- **Policy-as-code and contracts:** OPA/Rego, OpenTofu, GitHub-provider
  governance-as-code, Zod, JSON Schema, ADRs, decision ledgers, fitness gates,
  and conformance gates.
- **Infrastructure and platform:** Cloudflare Zero Trust, Gateway, WARP, Access,
  Tunnel, Cloudflare Pages/DNS, Hetzner, Proxmox VE, Docker, Docker Compose,
  Traefik, GitHub Actions CI/CD, self-hosted runners, OpenTelemetry, Infisical,
  and 1Password custody.
- **Data and native systems:** PostgreSQL, Supabase, TimescaleDB, Redis Stack,
  RedisJSON, RediSearch, pgvector, Android, Kotlin, USB/UVC, libuvc, JNI/NDK,
  C/C++, and CMake.
- **Languages and statistics:** Python, TypeScript, Kotlin, C/C++, Ruby, SQL,
  Bash, Wilson intervals, bootstrap confidence intervals, paired sign tests,
  applied statistics, and statistical inference.

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

- Pursue a self-directed research program across 150+ repositories in agentic
  AI, evaluation and alignment, systems engineering, and machine-checkable
  governance.
- Use AI agents to learn and stress-test software-engineering paradigms end to
  end, with repo contracts, status records, decision logs, and verification gates
  as the control surface.
- Operate a private, single-operator governance-first infrastructure estate:
  policy-as-code, IaC, Zero Trust networking, local and remote servers, and
  secrets custody.

## Education

**Ph.D., Mathematics - University of Montana, Missoula, MT | 2013**
Dissertation: *Peripherally-Multiplicative Spectral Preservers Between Function
Algebras*.

**B.A., Mathematics - Humboldt State University | 2004**

## Publications

- Cadieux, J. M., Pyhala, S. L., & Johnson, J. V. (2023). Pediatric Walking
  Speed Normal Reference Values in a Local Population. *Pediatric Physical
  Therapy*, 35(3), 326-331. Led the statistical analysis.
- Johnson, J. V., & Tonev, T. (2012). Spectral Conditions for Composition
  Operators on Algebras of Functions. *Communications in Mathematics and
  Applications*, 3(1).

## Candid fit note

My path has been academic and self-directed rather than corporate. I have not
worked inside a large company's engineering processes, and my systems have not
yet been tested at production scale. The tradeoff is that I arrive with a habit
of building complete systems end to end, reading unfamiliar stacks quickly, and
making authority, evidence, and failure modes explicit before action.
