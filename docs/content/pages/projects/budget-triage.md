---
id: page_budget-triage
type: page
source_file: projects/budget-triage.html
source_selector: main
route: /projects/budget-triage.html
content_hash: 0e5ef31af168bb1bfe29d3504eddc0275b765b8d67b05f48e44ddfff7aff2ce8
html_hash: 313fbf6c1e65fa1877f7249c7141249dbc831b2239c01a620d0b9293b1ee44b6
normalizer_version: 1
sync_direction: html_to_markdown
protected_fields: [id, type, source_file, source_selector, normalizer_version]
---

← Back to work

[Evidence](/#evidence) · Applied evidence engineering

# Budget Triage — financial evidence workbench

Traceable financial records with uncertainty routed to human review

Private working prototype · Sanitized public release candidate in final review · No public source link yet

## What is this?

Budget Triage is a private full-stack workbench for turning statements, receipts, and feature-gated connected-account data into structured, traceable transactions.

## What is it for?

It helps an owner-operator compare evidence sources, resolve uncertain information, reconcile records, and prepare dependable financial views without allowing uncertain extraction to silently become financial truth.

## How is it used?

Implemented workflows resolve the tenant, hash and deduplicate an uploaded document or connected-account input, classify and extract financial facts, validate the result, and persist evidence and transactions atomically. Deterministic extraction runs first; optional model-assisted paths can audit or compare results, while low-confidence, invalid, or missing-confidence output is routed to human review.

## Why does it matter?

Financial automation needs provenance, exact arithmetic, tenant isolation, human confirmation, and explicit uncertainty. Budget Triage demonstrates those controls in an integrated system rather than treating document extraction as an isolated model call.

## Evidence and status

- Accepted remote `main` at `a451189590ee55d53fb5b3b4695505e1a1a49a18`, merged through PR #285, passed full validation in run `29450681929`.
- The Phase 3b-specific claim receipt remains PR #284 at `427ce40e3bc80c45c151f2f62357405e49f9e5ee`, with successful full-validation run `29437790176`.
- The merged synthetic known-answer and service-observation harness reports 6 passing / 9 pending; it is explicitly incomplete and uncertified.
- A bounded synthetic Phase 3b observation preserves matching correlation across one local synthetic authenticated, tenant-scoped, read-only browser request, backend observation, response, client log, and diagnostic timeline. It does not prove UI state, production telemetry, financial correctness, or source-through-tax execution.
- The bounded Phase 4 CSV sub-slice on current `main` passed independent source review and its governed synthetic-corpus check. It does not establish real-data performance, broader Phase 4 completion, or product readiness.
- A sanitized, MIT-licensed public release candidate passed its full validation gate on 2026-07-18, including 1,070 integration tests and full secret-history checks. It was rebuilt without history from the private repository and follows the organization's secure-repo-lifecycle standard. A first personal-identifier audit checkpoint is complete and remediated. A public source release intended for employer exploration is in final operator review.

Private source today; a sanitized public release intended for employer exploration is in final review. No public source link or external contribution policy is available yet. Sanitized architecture materials, synthetic evidence, and a guided technical walkthrough are available for relevant hiring conversations.

### What this does not demonstrate

No production deployment, public application, real-user adoption, financial outcome, live-provider performance, tax-filing readiness, financial correctness, real-data performance, broader Phase 4 completion, or completed source-through-tax certification is claimed.

## How it was built

The depth of this project is in the development substrate as much as the product. Coding agents and editors must all follow the same versioned specifications, machine-readable authority manifests, boundary contracts, and deterministic gates. Reusable workflows and specialist agents operate inside that framework; fail-closed pre-write hooks block architectural anti-patterns at edit time. Secrets and personal or financial data are forbidden agent inputs by contract.

- Executable governance: 19 YAML specification contracts and registries covering CI, configuration, environment, secrets, logging, metrics, runtime, toolchain, and tests, with on-disk validators and a documentation check that fails on dangling path references.
- A value-blind personal-data scanner reports only locators and counts, never the matched text, with a ratchet-toward-zero allowlist requiring owner, reason, and expiry on every exception.
- Engineering record: 125 SQL migrations, 85 architecture decision records in the private lineage, and a 34-gate validation chain designed to run the same way in local development and secretless CI.

These figures are validated by the project's own executable gates and recorded status; they are not yet independently inspectable at a public link.

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
- A cross-tool, specification-driven development framework tested against a consequential application.
- Security and governance controls integrated into application architecture.
- Claim discipline that separates implemented workflows from certified outcomes.

## Interested in this work?

Happy to discuss the public-safe architecture, evidence workflow, and verification boundaries behind this private prototype.

Email me about this →
