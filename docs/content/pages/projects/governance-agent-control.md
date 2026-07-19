---
id: page_governance-agent-control
type: page
source_file: projects/governance-agent-control.html
source_selector: main
route: /projects/governance-agent-control.html
content_hash: 7146e5ec7434873fb628202d9c4ecf510ff5c7edc7d3b74d8f3ce8ad79d2f148
html_hash: 1cdc9dc5bb0ba62864facff2ea4793cb32fd4dff0dba694aad1a3dacf7fc2e1f
normalizer_version: 1
sync_direction: html_to_markdown
protected_fields: [id, type, source_file, source_selector, normalizer_version]
---

← Back to work

[Evidence](/#evidence) · Anonymized private case study

# Governance and agent-control architecture

Federated authority and evidence controls for AI-assisted engineering

An anonymized private case study

## What is this?

An anonymized governance architecture for AI-assisted work across repositories, services, credentials, and operating environments. It treats authority, evidence, and safe action as system properties rather than assumptions hidden in prompts or tool access.

## What is it for?

It makes identity, delegated authority, evidence, and safe refusal explicit before an agent or automation can change code, infrastructure, or organizational state.

## How is it used?

Human principles are translated into machine-readable standards, identity and authorization contracts, infrastructure policy checks, tested runtime-admission prototypes, and project-local rules. Delegated work carries explicit scope, evidence, approval, and handback requirements, while the human authority retains the decision.

## Why does it matter?

Agents with tools can create real effects. A governable system needs reliable answers to who may act, under what mandate, on which resource, with what evidence, and when the correct result is to stop or escalate.

## Evidence and status

Selected policy-as-code, infrastructure, validation, and scheduled drift-detection controls operate today. Identity, synthetic-decision, and runtime-admission layers have substantial contracts and tested prototypes, but they are not organization-wide live enforcement.

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

## What the work demonstrates

- Federated authority and agent-delegation design.
- Translation from human intent into schemas, contracts, gates, and tests.
- Policy-as-code, infrastructure-as-code, CI, and operational evidence.
- Provenance, refusal-path design, and evidence-preserving handbacks.
- Critical self-audit that keeps source, tested, advisory, and live status distinct.

## Interested in this work?

Happy to discuss the public-safe architecture, methods, and maturity boundaries behind this case study.

Email me about this →
