---
id: page_budget-triage
type: page
source_file: projects/budget-triage.html
source_selector: main
route: /projects/budget-triage.html
content_hash: 66e0a1e2aeb2a87de6c22fee3557cd720b17cee3c0a808deef9a5d408282cab0
html_hash: 509124b41b2e75d5a93ff569f923727784921a22d6186541ac4b6714f0719c9b
normalizer_version: 1
sync_direction: html_to_markdown
protected_fields: [id, type, source_file, source_selector, normalizer_version]
---

← Back to work

[Evidence](/#evidence) · Applied evidence engineering

# Budget Triage: financial evidence workbench

Traceable financial records with uncertainty routed to human review

Public employer-facing source snapshot · Active development private · Not deployed

## Summary

Budget Triage is a full-stack workbench for turning statements, receipts, and feature-gated connected-account data into structured, traceable transactions. It keeps uncertain extraction from silently becoming financial truth.

## Strongest proof

The synthetic known-answer and service-observation harness currently reports 6 passing and 9 pending assertions. The result is incomplete and uncertified. A sanitized, MIT-licensed [public source snapshot](https://github.com/jefahnierocks/budget-triage) lets reviewers inspect the application, agent configuration, specifications, validators, and synthetic fixtures.

## Technical decisions

- Deterministic extraction runs first; low-confidence or invalid output is routed to human review.
- Exact monetary arithmetic and append-only provenance preserve the basis for each decision.
- Tenant-scoped, atomic persistence keeps evidence and transactions aligned.

Versioned specifications, machine-readable authority manifests, pre-write checks, and the same validation chain across local development and secretless CI govern agent-assisted changes.

## Current limit

The project is not deployed, and the current evidence does not establish financial correctness, real-data performance, real-user outcomes, or completed source-through-tax certification. Active development remains private; publication is not an open contribution surface.

## Technical shape

### Current application stack

- Bun with strict TypeScript and pure Hono RPC.
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
- Connected-account, secrets, and observability integration surfaces exist, but they have not been exercised in a live-provider verification run.

## What the work demonstrates

- Evidence-aware automation with explicit human review.
- Backend and PostgreSQL engineering with tenant-scoped persistence.
- Exact monetary arithmetic and traceable decision provenance.
- A cross-tool, specification-driven development framework tested against a consequential application.
- Security and governance controls integrated into application architecture.
- Claim discipline that separates implemented workflows from certified outcomes.

## Interested in this work?

Review the source snapshot or contact me to discuss the architecture, evidence workflow, and verification boundaries.

Email me about this →

Explore the public source ↗
