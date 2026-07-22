# Research statement: infrastructure for model evaluation and agent systems

**Jeffrey V. Johnson, Ph.D.** | Agent systems, developer infrastructure,
evaluation, and safeguards

I build software and development infrastructure for reliable agent-assisted
work. My focus is clear specifications, explicit permissions, reproducible
environments, automated checks, and evidence that can be reviewed. I use that
infrastructure to build applications, data pipelines, evaluation systems, and
developer tools.

Agents are actors within an engineering system. Quality comes from the
architecture around their work:
clear specifications, explicit authority, controlled execution, observable
state, and separate-verifier recomputation.

I am a tenured associate professor of mathematics, trained in commutative
Banach algebras. Alongside that work, I have built a sustained engineering
program spanning frameworks for agent-assisted development,
policy-as-code, developer environments, infrastructure, applications, data
workflows, and model evaluation.

## The research program

The central question is practical: what project foundations make agent-assisted
development dependable enough for difficult work? I approach that question at
three layers.

1. **Foundation:** define authority, interfaces, execution contexts, state,
   evidence, and failure behavior before an agent acts.
2. **Public implementation:** turn those concepts into typed schemas, audit
   methods, CI gates, and reproducible tooling that another reviewer can inspect.
3. **Proving grounds:** use the foundation to build applications, data
   pipelines, evaluation systems, and infrastructure, then record both what the
   evidence establishes and what it does not.

## Authority, contracts, and execution

The **governance and agent-control architecture** is an anonymized private case
study in applying this model across people, agents, repositories, credentials,
infrastructure, and runtime systems. It separates decision rights, bounded
mandates, identity and authorization, infrastructure enforcement, runtime
admission, and repository-local authority. Value-blind handbacks return
privileged or judgment-heavy work to a human without exposing secret values.

Selected policy-as-code, branch-governance, promotion, Zero Trust, and drift
controls operate today. Runtime admission remains source-tested rather than a
live request-path gate, and the case study is single-operator; it makes no
enterprise-adoption claim.

The same method applies to development environments. Shells, package managers,
repository locations, local services, credentials, and model/tool integrations
are part of the execution context, not incidental setup. Making that context
reproducible and observable is part of the specification; better prompting alone
does not make an ambiguous environment reproducible.

## Public implementation evidence

**Host Capability Substrate** models local-machine capabilities, policy
decisions, provenance-typed evidence, audit chains, and scoped authorization
grants as typed objects rather than implicit shell access. Its public
schema-first implementation and CI boundary checks are substantial; live
runtime enforcement is not implemented.

**Agentic Architecture Audit** turns a two-stage, evidence-first `audit-spec`
into deterministic drift tooling and structured findings. It separates
discovery from judgment to counter confirmation bias, binds derived documents to
the specification, and uses negative self-tests to make architectural claims
reviewable.

Together, these projects show how normative intent can become schemas,
contracts, gates, tests, and evidence without pretending that every control is
already operational.

## Proving grounds

**Budget Triage** tests the foundation in a financial evidence workbench with a
sanitized public source snapshot. It preserves extraction provenance, exact
monetary semantics, tenant isolation, append-only decisions, and human
acceptance of uncertain data. A
merged synthetic known-answer slice exercises rollback and structured
service-level evidence; its 6 passing / 9 pending result remains incomplete and
uncertified. A bounded test preserves browser-to-service correlation for one
local synthetic authenticated, tenant-scoped, read-only request, but
does not prove UI state, production, financial correctness, or source-through-
tax execution. The public snapshot is available at
https://github.com/jefahnierocks/budget-triage; active development remains
private.

**ScopeCam** tests the approach against native Android/Kotlin/C++ hardware
integration. Its multi-module architecture, USB/UVC runtime, JNI boundary, and
device-verified replug recovery require the development substrate to
survive physical-device evidence and cross-language failure modes. A signed
client alpha was delivered in June 2026; the private, intentionally unlinked
application is not broadly released, and broader device/release acceptance
remains open.

**Email Corpus** tests the same foundation in a private data-cleaning pipeline:
canonical records and validators, resumable transformations, shared pipeline
state, lineage fingerprints, privacy-gated releases, and a draft-only serving
design with a never-send boundary. It is evidence that the substrate can
preserve structure and provenance across a long-running data workflow; it is not
a claim that private corpus data is publishable.

For evaluation-specific roles, the **Agentic-Coding Evaluation Lab** is a
specialized proving ground. Its public methodology and verification prototype
preserve decision inputs and use a separate verifier to recompute a result from
frozen bytes. The current draft example returns `NOT_EVALUABLE` because the
scientific method, repetition policy, and decision threshold are not approved.
That synthetic result demonstrates fail-closed reporting, not real-model
performance or a promotion recommendation.

Across these proving grounds, the evidence establishes implemented contracts,
failure controls, and bounded system behavior. It does not yet establish a
comparative improvement in agent productivity, reliability, or outcome quality.

## Mathematical habit

My doctoral work studied maps between algebras of functions and the conditions
that force their structure. The habit from that work is to define the objects,
state the constraints, and understand what follows. That transfers directly to
agent systems: an agent is an actor inside a structure of tools, permissions,
state, and evidence. The design problem is to make that structure explicit
enough to inspect and test.

## What I bring

I bring mathematical maturity, applied statistical discipline, years of
teaching and technical communication, and sustained self-directed engineering
practice. I have not worked inside a large private engineering organization,
and these systems have not yet been tested at production scale. I want to test
and extend these methods within a larger engineering team and under real
organizational and production constraints.

The strongest fit is research and systems engineering for agent-assisted
development infrastructure, model evaluation, safeguards/control systems,
developer platforms, or AI governance where specifications, reproducible
execution, bounded authority, and inspectable evidence matter.
