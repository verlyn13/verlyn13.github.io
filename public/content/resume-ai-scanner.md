# Jeffrey V. Johnson, Ph.D.

Building infrastructure for model evaluation and agent systems

Location: Homer, Alaska
Email: jeffrey@jvjohnson.dev
Website: https://jvjohnson.dev
GitHub: https://github.com/verlyn13
LinkedIn: https://linkedin.com/in/drjeffreyjohnson

## Target roles

Research engineer; model evaluation engineer; agent systems engineer;
evaluation infrastructure engineer; specialized systems engineer.
These are target roles, not previously held appointments.

## Summary

Ph.D. mathematician and systems builder working across native applications,
data pipelines, web systems, and agent infrastructure. Builds verification
tools, investigates failures across system boundaries, and directs and reviews
agent-assisted implementation. Combines that engineering practice with
published mathematical and statistical research, university teaching, and
large-course coordination. Seeking research engineering and systems work with
meaningful ownership on a specialized team.

## Core skills

Languages: Python, TypeScript, JavaScript, SQL, R, Bash, Kotlin, C++, Rust.

Systems and data: Android, JNI, NDK, PostgreSQL, Redis, Docker, Cloudflare,
GitHub Actions, OpenTelemetry.

Verification and controls: Zod, JSON Schema, OPA, Rego, OpenTofu, CI checks,
evidence provenance, negative controls, prototype evaluation tooling.

Agent-assisted engineering: task decomposition, context preparation, bounded
delegation, implementation review, failure analysis, validation of agent-produced
work.

Research and communication: functional analysis, applied statistics,
experimental design, technical writing, cross-disciplinary teaching.

## Agent-development infrastructure

Independent, unpaid projects developed alongside a full-time faculty
appointment, using coding agents in implementation and test development.

### Host Capability Substrate

Technology: TypeScript, Zod, JSON Schema. Public source.

- Modeled host capabilities, authorization, policy decisions, and evidence as
  explicit typed contracts, with schema and architecture checks.
- Made execution contexts, scoped permissions, approvals, and evidence
  provenance inspectable in the public model.
- Evidence covers implemented contracts and source checks; organization-wide
  runtime enforcement remains unestablished.

Public source: https://github.com/jefahnierocks/host-capability-substrate

### Agentic Architecture Audit

Technology: specification authoring, Python, JSON Schema. Public source.

- Authored an audit method separating evidence collection from judgment and
  producing structured findings.
- Built a Python drift linter that binds derived documentation to specification
  content and checks conformance, with negative self-tests.

Public source: https://github.com/verlyn13/agentic-architecture-audit

### Governance and agent-control architecture

Technology: OpenTofu, OPA, Rego, TypeScript. Anonymized private case study.

- Designed a multi-repository architecture separating human decision rights,
  agent permissions, identity and authorization, infrastructure controls,
  runtime admission, and repository-local authority.
- Modeled agent authority through mandate, available capability, and credential
  reach, with structured handbacks for human judgment and privileged work.
- Implemented selected policy-as-code, repository-governance, and drift controls.
  Runtime admission is source-tested; this single-operator case study does not
  establish organization-wide deployment or enterprise adoption.

Public case study: https://jvjohnson.dev/projects/governance-agent-control.html

## Selected applications and evaluations

### ScopeCam

Technology: Kotlin, Jetpack Compose, C++, JNI, USB, UVC.
Private proprietary Android microscope application; client-delivered alpha.

- Built a multi-module application spanning camera discovery, preview,
  photo/video capture, media review, native rendering, persistence, and debug/QA
  telemetry.
- Traced a camera-replug deadlock across Kotlin, JNI, and native teardown;
  implemented bounded recovery and documented its resource-leak tradeoff after
  timeout.
- Delivered a signed client alpha in June 2026; broader release remains open.
- Corrected a CI dependency gap that could report success after an upstream
  failure skipped the actual checks. Source change reviewed in September 2026.

Public case study: https://jvjohnson.dev/projects/scopecam.html

### Budget Triage

Technology: TypeScript, Hono, React, PostgreSQL.
Public source snapshot; active development private.

- Built document-processing and review workflows that retain provenance, use
  exact monetary arithmetic, and route uncertain extraction to human review.
- Implemented context-specific data relationships with explicit transitions,
  tenant checks, database row locks, and stale-update protection.
- Diagnosed an authentication test that failed on database reuse, tracing the
  interaction between rollback and persistent audit records.
- Implemented synthetic known-answer and browser/API observation harnesses.
  Recorded evidence covers bounded workflows; end-to-end financial
  certification and production operation remain unestablished.

Public source snapshot: https://github.com/jefahnierocks/budget-triage

### Agentic-Coding Evaluation Lab

Technology: Python, Quarto, JSON contracts.
Public methodology and verifier prototype.

- Built evaluation reporting and a separate verifier that recomputes a synthetic
  NOT_EVALUABLE result and rejects missing, inconsistent, or altered evidence.
- Distinguished framework verification from scientific findings: the public
  sample does not establish a powered real-model comparison.

Public methodology and source: https://github.com/verlyn13/eval-lab-methodology

### Additional systems

- Agent-runtime experiments: built Python/C request-guard and process-launch
  experiments with faulty senders, receiver-side checks, and paired event-order
  tests. Source and recorded bounded experiments support failure analysis;
  overall runtime acceptance remains open.
- Dicee: built and deployed a multiplayer browser game using Rust, WebAssembly,
  SvelteKit, Cloudflare Durable Objects, and WebSockets.
  Live game: https://dicee.games/
- Fall course publishing: built a registry-driven pipeline with isolated public
  output, checksummed manifests, and executable checks for broken links and
  accidental source publication.

## Upstream contribution

### Inspect Scout reliability correction

Technology: Python, multiprocessing, pytest. Upstream PR under review.

Submitted a correction on September 10, 2026, for provider-error diagnostics lost
between spawned workers and the parent process. The proposed change includes
baseline-versus-patch regression evidence and checks for worker execution,
parent-visible diagnostics, cleanup, and cancellation. Responded to maintainer
scope feedback with further validation and a proposal to narrow the change.
As of September 12, the PR remains under review, awaiting the maintainer's
response; merge and successful Linux CI remain unestablished.

Submitted contribution: https://github.com/meridianlabs-ai/inspect_scout/pull/632

## Professional experience

### Kenai Peninsula College, University of Alaska Anchorage

Associate Professor of Mathematics, tenured, 2023-present.
Assistant Professor of Mathematics, 2017-2023.

- Teach mathematics and statistics, develop course materials, and communicate
  technical ideas to audiences with varied backgrounds.
- Developed a five-part introductory R module for applied statistics and
  online instructional materials for computational methods.
- Led statistical analysis for a peer-reviewed study of 1,593 children and
  adolescents, collaborating with physical therapy researchers using R and SPSS.
- Contribute to institutional service and mathematics outreach.

### American University in Cairo

Assistant Professor of Mathematics, 2014-2017.

- Taught mathematics from calculus through advanced courses; contributed to
  curriculum development and external-review implementation.

### University of Montana

Post-doctoral Lecturer, 2012-2014.
Course Coordinator, 2013.
Instructor, 2008-2012.

- Coordinated two statistics lectures serving 480 students; supervised lab
  instructors and graduate teaching assistants and developed teaching materials.
- Conducted doctoral research in functional analysis and co-authored a
  peer-reviewed mathematics paper.

## Education

Ph.D., Mathematical Sciences, University of Montana, 2013.
Dissertation: Peripherally-Multiplicative Spectral Preservers Between Function
Algebras.

B.A., Mathematics, Humboldt State University, 2004.

## Publications

Cadieux, J. M., Pyhala, S. L., and Johnson, J. V. (2023). Pediatric Walking
Speed Normal Reference Values in a Local Population. Pediatric Physical Therapy,
35(3), 314-320. Led the statistical analysis.

Johnson, J. V., and Tonev, T. (2012). Spectral Conditions for Composition
Operators on Algebras of Functions. Communications in Mathematics and
Applications, 3(1).

## Service

U.S. Peace Corps, Republic of South Africa, 2005-2007; MathCounts coaching;
Economic Development Council, Homer, Alaska, 2020-2022.
