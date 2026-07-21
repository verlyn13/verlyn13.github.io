---
id: page_governance-agent-control
type: page
source_file: projects/governance-agent-control.html
source_selector: main
route: /projects/governance-agent-control.html
content_hash: 00f5fb28f4cadc0020faf7f331e1d38af256591505b24bf324acbfc69e1a9d44
html_hash: 94cc026fffaf489785152be47e0e70b09585768b677054d8a5fb0f65d4262e70
normalizer_version: 1
sync_direction: html_to_markdown
protected_fields: [id, type, source_file, source_selector, normalizer_version]
---

← Back to work

[Evidence](/#evidence) · Anonymized private case study

# Governance and agent-control architecture

The control framework around specification-conforming agent work

An anonymized private case study

## What is this?

An anonymized governance architecture for agent-assisted work across repositories, services, credentials, shells, and operating environments. It treats specifications, authority, execution context, evidence, and safe action as system properties rather than assumptions hidden in prompts or tool access.

## What is it for?

It establishes the foundation in which agents can contribute reliable work: identity and mandate, typed contracts, reproducible tools and runtimes, bounded authority, deterministic gates, evidence, and safe refusal before code, infrastructure, or organizational state can change.

## How is it used?

Human principles are translated into machine-readable standards, identity and authorization contracts, managed shell and tool configuration, infrastructure policy checks, tested runtime-admission prototypes, and project-local rules. Delegated work carries explicit scope, environment, evidence, approval, validation, and handback requirements, while the human authority retains the decision.

## Why does it matter?

Agents with tools can create real effects, but the tools are not the source of quality. A governable development system needs reliable answers to which specification controls, who may act, in which environment, on which resource, with what evidence, and when the correct result is to stop or escalate.

## Evidence and status

Selected managed workstation, policy-as-code, infrastructure, validation, and scheduled drift-detection controls operate today. Identity, synthetic-decision, and runtime-admission layers have substantial contracts and tested prototypes, but they are not organization-wide live enforcement.

### What this does not demonstrate

This is a self-directed, principally single-operator research and implementation case study. It does not establish enterprise-scale adoption, independent-principal governance outcomes, a fully deployed identity and authorization runtime, or a finished commercial platform.

## Technical shape

### Bounded authority and delegation

- Effective agent authority is modeled as the intersection of role mandate, host capability, and credential reach.
- Shared standards cross boundaries through explicit restatement, preserving local authority instead of relying on inherited context.
- Structured handbacks preserve scope, evidence references, validation, unresolved risks, and the next responsible actor without carrying secret values.

### Controls earn promotion

- Current-state findings, smoke-test evidence, candidate fitness functions, advisory results, and approved blocking rules remain distinct.
- OpenTofu plans touched by a pull request are converted to JSON and evaluated with OPA/conftest across 26 verified deny rules.
- The plan gate is workflow-level enforcement; it is not proven as a required status check across every repository.
- A verified scheduled run completed its resolver and four registered workspace jobs; one workspace updated an existing finding. This proves detector execution, not a drift-free system.

### Execution environment as part of the contract

- Managed human and agent shell modes keep tool resolution, environment activation, and provenance explicit.
- Repository contracts are shared across coding agents and editors so tool choice does not redefine the specification.
- Live workstation configuration remains a distinct authority from the typed capability substrate; one describes and governs host action, while the other owns the actual shell and tool baseline.

## What the work demonstrates

- Federated authority and agent-delegation design.
- Translation from human intent into schemas, contracts, reproducible environments, gates, and tests.
- Policy-as-code, infrastructure-as-code, CI, and operational evidence.
- Provenance, refusal-path design, and evidence-preserving handbacks.
- Critical self-audit that keeps source, tested, advisory, and live status distinct.

## Interested in this work?

Happy to discuss the public-safe architecture, methods, and maturity boundaries behind this case study.

Email me about this →
