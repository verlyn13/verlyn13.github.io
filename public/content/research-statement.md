# Research statement: infrastructure for model evaluation and agent systems

**Jeffrey V. Johnson, Ph.D.**

I build software and development infrastructure for reliable agent-assisted
work. My focus is clear specifications, explicit permissions, reproducible
environments, automated checks, and evidence that can be reviewed. I use that
infrastructure to build applications, data pipelines, evaluation systems, and
developer tools.

I investigate how specifications, authority boundaries, observable execution,
and separate verification can make agent-assisted work easier to inspect and
test. The practical question is whether a system behaves as intended and
whether its evidence supports the claimed result.

I am a tenured associate professor of mathematics, trained in commutative
Banach algebras. These engineering projects are independent, unpaid work
alongside my full-time faculty appointment, using coding agents for
implementation and verification. Their shared methods emerged through varied
practical and exploratory projects.

## Research direction

What project foundations make agent-assisted development dependable enough for
difficult work? I approach that question at three layers:

1. Define authority, interfaces, execution contexts, state, evidence, and failure
   behavior before an agent acts.
2. Turn those concepts into typed schemas, audit methods, CI checks, and
   reproducible tooling that another reviewer can inspect.
3. Apply them to applications, data pipelines, evaluation systems, and
   infrastructure, then record what the evidence establishes and what remains
   unresolved.

## Authority, contracts, and execution

The [governance and agent-control architecture](https://jvjohnson.dev/projects/governance-agent-control.html)
is an anonymized private case study spanning people, agents, repositories,
credentials, infrastructure, and runtime systems. It separates decision rights,
bounded mandates, identity and authorization, infrastructure controls, runtime
admission, and repository-local authority. Structured handbacks return work
requiring human judgment or privileges without exposing secret values.

A July 15, 2026 review found selected policy-as-code, branch-governance,
promotion, Zero Trust, and drift controls operational. Runtime admission was
source-tested; organization-wide live enforcement remains unestablished. This
is a single-operator case study, not evidence of enterprise adoption.

Development environments are part of this problem. Shells, package managers,
repository locations, local services, credentials, and model/tool integrations
shape what an agent can do. Making that context reproducible and observable
helps make the work itself inspectable.

## Public implementation evidence

[Host Capability Substrate](https://github.com/jefahnierocks/host-capability-substrate)
models host capabilities, policy decisions, evidence provenance, and scoped
authorization grants as typed objects. Public schemas and automated boundary
checks establish implemented contracts and source conformance; they do not
establish universal live runtime enforcement.

[Agentic Architecture Audit](https://github.com/verlyn13/agentic-architecture-audit)
combines a two-stage audit method with Python drift tooling and structured
findings. It separates discovery from judgment, binds derived documents to
specification content, and uses negative self-tests to check the verifier.

Together, these projects turn written requirements into schemas, contracts,
tests, and evidence. Source controls and runtime acceptance are assessed
separately.

## Applications and evaluation work

[Budget Triage](https://github.com/jefahnierocks/budget-triage) is a financial
evidence workbench with extraction provenance, exact monetary arithmetic,
tenant-scoped records, append-only decisions, and human review of uncertain
data. Synthetic known-answer and browser/API observation harnesses provide
bounded workflow evidence. The recorded known-answer result remains incomplete
and uncertified; production operation and end-to-end financial correctness
remain unestablished. A sanitized source snapshot is public, while active
development remains private.

[ScopeCam](https://jvjohnson.dev/projects/scopecam.html) applies the same
engineering discipline to Android/Kotlin/C++ hardware integration. Camera
capture, native rendering, USB lifecycle, persistence, and diagnostics meet at
the managed/native boundary. A camera-replug deadlock investigation led to
bounded recovery with an explicit resource-leak tradeoff after timeout. A signed
client alpha was delivered in June 2026; broader device acceptance and release
remain open.

Email Corpus provides experience with a private data pipeline: canonical
records and validators, resumable transformations, lineage, holdout isolation,
and checksummed release packaging. Its value is in preserving structure and
provenance across data processing; the private source and data are not public
work samples.

The [Agentic-Coding Evaluation Lab](https://github.com/verlyn13/eval-lab-methodology)
focuses on whether an experiment contains enough valid evidence to support a
model-change decision. Its public methodology and verifier prototype preserve
decision inputs and recompute a result from bound evidence. The synthetic
example returns `NOT_EVALUABLE` when scientific prerequisites are incomplete.
That demonstrates framework behavior and refusal to overinterpret evidence;
it does not establish real-model performance or a promotion recommendation.

Across these projects, the evidence establishes implemented contracts, failure
controls, and bounded system behavior. Comparative improvement in agent
productivity, reliability, or outcome quality remains a question to test.

## Upstream contribution

On September 10, 2026, I submitted a Python reliability correction to
[Inspect Scout](https://github.com/meridianlabs-ai/inspect_scout/pull/632) for
provider-error diagnostics lost between spawned workers and the parent process.
The proposed change includes baseline-versus-patch regression evidence and
checks for worker execution, parent-visible diagnostics, cleanup, and
cancellation. I responded to maintainer scope feedback with further validation
and a proposal to narrow the change. As of September 12, it remains under review,
awaiting the maintainer's response; merge and successful Linux CI remain
unestablished.

## Mathematical and collaborative foundation

My doctoral work studied maps between algebras of functions and the conditions
that force their structure. It developed the habit of defining objects,
stating constraints, and understanding what follows from an assumption. Those
habits carry into software design and verification.

I also led statistical analysis for a published study of 1,593 children and
adolescents, using R and SPSS in collaboration with physical therapy
researchers. Teaching mathematics in the United States and Egypt and
coordinating statistics lectures serving 480 students developed technical
explanation, shared planning, and responsibility for work others depend on.

## Intended contribution

I bring mathematical research, applied statistical discipline, systems
development, and experience explaining technical work to varied audiences.
I am seeking research engineering or specialized systems work where I can
apply that combination to a shared technical problem and develop it through
collaboration and external review. Evaluation tooling, agent infrastructure,
and developer systems are the strongest current directions.

[Resume](https://jvjohnson.dev/cv.html) | [Research and publications](https://jvjohnson.dev/research/)
