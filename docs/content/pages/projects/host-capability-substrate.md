---
id: page_host-capability-substrate
type: page
source_file: projects/host-capability-substrate.html
source_selector: main
route: /projects/host-capability-substrate.html
content_hash: 8d16b28bc3b319508f83ec73d25e43324af51eb49e7c12577186f13b214f09c2
html_hash: 02d335a2238c571c3756067b79449e966dbb7f66e814639f51d364b5513c7761
normalizer_version: 1
sync_direction: html_to_markdown
protected_fields: [id, type, source_file, source_selector, normalizer_version]
---

← Back to work

[Evidence](/#evidence) · Public implementation

# Host Capability Substrate

Typed capability, execution-context, authority, and evidence contracts

Working public implementation

## Summary

Host Capability Substrate models the conditions under which work may occur on a local machine. It treats host facts, capabilities, operations, execution contexts, evidence, policy decisions, approvals, leases, audits, and authorization as typed objects instead of implicit shell access.

## Strongest proof

- Typed ontology 46 Zod entity schemas Compiled into 67 generated JSON Schemas.
- Verification About 500 tests Exercises schemas, execution contexts, policy decisions, evidence, audit records, and grants.
- Governance 19 invariants · four rings Import boundaries preserve the direction of authority.
- Merge-time gate A dozen static scanners Policy, boundary, secret, and schema-drift checks run together.

[Inspect the public repository](https://github.com/jefahnierocks/host-capability-substrate)

## Technical decision

Zod types compile to portable JSON Schemas. Scoped, expiring grants bound authority, and layered imports preserve the direction of control. A composed CI gate checks policy, secrets, boundaries, and schema drift.

## Current limit

The public source and CI evidence demonstrate the typed model and enforced repository boundaries. They do not show universal host-level runtime enforcement.

## Technical shape

### Capability and evidence model

- TypeScript and Zod define host facts, capabilities, operations, execution contexts, evidence, policy decisions, approvals, leases, audits, and authorization grants.
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
- Agent authority, execution-context, and evidence boundaries.
- JSON Schema and Zod contract design.
- Governance implemented as executable CI discipline.

## Interested in this work?

Explore the public implementation or get in touch to discuss host-level agent authority and typed governance.

Email me about this →

Public repository ↗
