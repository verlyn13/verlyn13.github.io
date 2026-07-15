---
id: page_host-capability-substrate
type: page
source_file: projects/host-capability-substrate.html
source_selector: main
route: /projects/host-capability-substrate.html
content_hash: d39d21a94c994a5353f9c60026d05c9bcc55dd7dd6549fe934fdeab82b132031
html_hash: 6b7696cadb5ce5a9f511c892d62dcb94b158fcbad58e079a6973223337beed8a
normalizer_version: 1
sync_direction: html_to_markdown
protected_fields: [id, type, source_file, source_selector, normalizer_version]
---

← Back to work

[Evidence](/#evidence) · Public implementation

# Host Capability Substrate

Typed governance for host-level AI agents

Public repository · Verified implementation

## What is this?

Host Capability Substrate models what a local machine can safely expose to an AI agent. It treats host capabilities, policy decisions, evidence, and authorization grants as typed objects instead of implicit shell access.

## What is it for?

It gives an agent and its operator a machine-checkable description of what can be inspected, what can be modified, what evidence is required, and what still needs explicit approval.

## How is it used?

Host facts and capability declarations are represented with Zod types and generated JSON Schemas. Policy and evidence objects describe the authority behind an action, while scoped, expiring grants bound what an agent may do. A layered architecture and merge-time CI gate check schema drift, policy rules, secret boundaries, and forbidden dependencies.

## Why does it matter?

Agentic tools are most useful when they can act and most risky when their authority is implicit. Typed capability and authorization boundaries make local automation inspectable, testable, and easier to refuse safely.

## Evidence and status

- Typed ontology 46 Zod entity schemas Compiled into 67 generated JSON Schemas.
- Verification About 500 tests Exercises schemas, policy decisions, evidence, audit records, and grants.
- Governance 19 invariants · four rings Import boundaries preserve the direction of authority.
- Merge-time gate A dozen static scanners Policy, boundary, secret, and schema-drift checks run together.

[Inspect the public repository](https://github.com/jefahnierocks/host-capability-substrate)

Host Capability Substrate is maintained in [Jefahnierocks](https://github.com/jefahnierocks), a public home for independently governed engineering and learning projects. Governance is currently repository-local; organization-wide controls remain conditional rather than active enforcement.

### What this does not demonstrate

The public implementation and CI evidence show a typed governance model and enforced source boundaries. They do not prove that every modeled capability is deployed as universal host-level runtime enforcement.

## Technical shape

### Capability and evidence model

- TypeScript and Zod define host facts, capabilities, evidence, policy decisions, and authorization grants.
- Generated JSON Schemas make the contracts portable and inspectable outside the TypeScript runtime.
- Provenance-typed evidence, an authority hierarchy, and tamper-evident audit chains keep decisions attached to their basis.
- Scoped, expiring grants express bounded authorization instead of permanent ambient access.

### Governance as CI discipline

- A 19-invariant implementation charter defines non-negotiable boundaries.
- A four-ring architecture prevents higher-level workflows from becoming foundational authority.
- The composed verification gate checks policy, imports, secrets, schemas, generated artifacts, and agent-contract identity.

## What the work demonstrates

- Type-driven systems design.
- Host-level security and capability modeling.
- Agent authority and evidence boundaries.
- JSON Schema and Zod contract design.
- Governance implemented as executable CI discipline.

## Interested in this work?

Explore the public implementation or get in touch to discuss host-level agent authority and typed governance.

Email me about this →

Public repository ↗

← Back to Evidence
