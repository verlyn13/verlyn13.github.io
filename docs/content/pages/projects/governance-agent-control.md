---
id: page_governance-agent-control
type: page
source_file: projects/governance-agent-control.html
source_selector: main
route: /projects/governance-agent-control.html
content_hash: b3b6cf2eca847bb5fb0af3de5b018677448ec2be48159ff44b7cafae081a5703
html_hash: 1bf3e6607f02322f3ff95c724d6beb656fe062ae73f1017bad3bdca495071035
normalizer_version: 1
sync_direction: html_to_markdown
protected_fields: [id, type, source_file, source_selector, normalizer_version]
---

← Back to work

[Evidence](/#evidence) · Anonymized private case study

# Governance and agent-control architecture

The control framework around specification-conforming agent work

An anonymized private case study

## Summary

An anonymized governance architecture for agent-assisted work across repositories, services, credentials, shells, and operating environments. It treats specifications, authority, execution context, evidence, and safe action as system properties rather than assumptions hidden in prompts or tool access.

## Strongest proof

Selected managed-workstation, policy-as-code, infrastructure, validation, and scheduled drift-detection controls operate today. Public implementations show the typed capability and architecture-audit parts of the wider approach.

## Technical decision

Access to a capability is kept separate from permission to use it. Delegated work carries explicit scope, environment, evidence, approval, validation, and handback requirements, while the responsible human retains the decision.

## Current limit

Identity and runtime-admission layers are tested prototypes, not organization-wide live enforcement. This is principally a single-operator case study, so it does not establish enterprise adoption.

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
