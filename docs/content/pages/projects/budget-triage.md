---
id: page_budget-triage
type: page
source_file: projects/budget-triage.html
source_selector: main
route: /projects/budget-triage.html
content_hash: 3595bbf30a4603eb7275742b7e1e1b1a4ddc95e2331d29b6c05c7b691019e68f
html_hash: 291bfc836186c4995ab915fb69f15bd1f97771cae7543479058012bd377c3a28
normalizer_version: 1
sync_direction: html_to_markdown
protected_fields: [id, type, source_file, source_selector, normalizer_version]
---

← Back to work

[Evidence](/#evidence) · Applied evidence engineering

# Budget Triage — financial evidence workbench

Traceable financial records with uncertainty routed to human review

Private working prototype · No public source link

## What is this?

Budget Triage is a private full-stack workbench for turning statements, receipts, and feature-gated connected-account data into structured, traceable transactions.

## What is it for?

It helps an owner-operator compare evidence sources, resolve uncertain information, reconcile records, and prepare dependable financial views without allowing uncertain extraction to silently become financial truth.

## How is it used?

Implemented workflows resolve the tenant, hash and deduplicate an uploaded document or connected-account input, classify and extract financial facts, validate the result, and persist evidence and transactions atomically. Deterministic extraction runs first; optional model-assisted paths can audit or compare results, while low-confidence, invalid, or missing-confidence output is routed to human review.

## Why does it matter?

Financial automation needs provenance, exact arithmetic, tenant isolation, human confirmation, and explicit uncertainty. Budget Triage demonstrates those controls in an integrated system rather than treating document extraction as an isolated model call.

## Evidence and status

- Accepted remote `main` at `c4b399db` passed its complete validation suite in run `29431070131`.
- The merged synthetic known-answer and service-observation harness reports 6 pass and 9 pending; it is explicitly incomplete and uncertified.
- The repository is private and intentionally unlinked.

### What this does not demonstrate

No production deployment, public application, real-user adoption, financial outcome, live-provider performance, tax-filing readiness, HTTP/browser observation, or completed source-through-tax certification is claimed.

## Technical shape

### Current application stack

- Bun 1.3.10 with strict TypeScript and pure Hono RPC.
- React, Vite, and Tailwind on the client.
- PostgreSQL repositories and migrations, Zod validation, and Decimal.js for exact monetary arithmetic.
- Vitest and Biome in the verification toolchain.

### Evidence-aware processing

- Tenant-scoped upload, hashing, deduplication, storage, classification, and deterministic-first extraction.
- Optional model-assisted audit and comparison paths without a model-accuracy claim.
- Atomic evidence and transaction persistence with append-only decision provenance.
- Fail-closed review routing when confidence or validation is insufficient.

### Security and governance

- Session and API-key authentication, Argon2id, hashed tokens, tenant guards, and secret scanning.
- Machine-checked governance specifications and validation scripts.
- Connected-account, secrets, and observability integration surfaces exist, but live provider operation was not independently verified.

## What the work demonstrates

- Evidence-aware automation with explicit human review.
- Backend and PostgreSQL engineering with tenant-scoped persistence.
- Exact monetary arithmetic and traceable decision provenance.
- Security and governance controls integrated into application architecture.
- Claim discipline that separates implemented workflows from certified outcomes.

## Interested in this work?

Happy to discuss the public-safe architecture, evidence workflow, and verification boundaries behind this private prototype.

Email me about this →

← Back to Evidence
