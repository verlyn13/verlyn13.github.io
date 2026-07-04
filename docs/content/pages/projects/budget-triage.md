---
id: page_budget-triage
type: page
source_file: projects/budget-triage.html
source_selector: main
route: /projects/budget-triage.html
content_hash: 96a53ae3919bc2d0ca501ed32ceb821bc09f7c95eaceff71031d0a6998c59b9c
html_hash: c0e73b8185610dd1312f1a8bf13572b815850e98ede4b4f3a8cb27fcf864916c
normalizer_version: 1
sync_direction: html_to_markdown
protected_fields: [id, type, source_file, source_selector, normalizer_version]
---

← Back to work

[Approach](/#approach) · Learning by doing

# Budget Triage

Agentic governance, enforced in the architecture

Active Development

## Overview

A full-stack personal finance system, and the most worked-out case in my learning programme for agentic governance. The point is not the app. It is enforcing the rules an agent has to follow in the architecture itself, through architecture decision records, rather than hoping a prompt holds.

One validator checks runtime, scripts, and documents together, so the parts cannot drift out of agreement. The document-extraction pipeline is deterministic and checked against a synthetic, PII-free ground-truth corpus I generate for the test.

## Technical Stack

### Runtime & Core

- Bun (modern TypeScript runtime)
- Express + Hono (dual API framework exploration)
- PostgreSQL with type-safe schema generation (Kanel)
- ts-rest for end-to-end type contracts

### Infrastructure & Security

- Infisical (self-hosted secrets management)
- Machine identity patterns for automated access
- Docker containerization
- OpenTelemetry instrumentation throughout

### Governance Framework

- Architecture decision records as enforced governance
- Runtime/config/toolchain compliance verification
- Script governance rules
- Cross-surface validation
- Evidence-based logging

## Key Patterns Explored

### Governance enforced through architecture decision records

Runtime, configuration, and toolchain compliance are checked against declared decisions rather than left to convention, with CI gates enforcing them on every change.

### Deterministic document extraction

A VLM and OCR pipeline checked against a synthetic, PII-free corpus I generate for the test. It reaches an F1 of 1.000 on that corpus, which measures determinism rather than luck. The discipline is the point, not the number.

### High-Volume Test Engineering

Over 7,700+ tests (7,082 backend, 703 frontend, 664 integration) ensuring deterministic performance across complex extraction operations.

## Why This Matters

### Governance you can verify

Agentic systems fail on authority and drift, not syntax. Putting the rules in the architecture keeps an agent inside known bounds.

### Determinism under test

Extraction is checked against ground truth, so behavior is reproducible rather than approximately right.

### Type-safe across boundaries

Typed contracts and generated database types make the parts checkable end to end, from runtime to documents.

### Observable from the start

OpenTelemetry and structured logging throughout, so the system's decisions are inspectable.

## Why build it this way

This is a learning vehicle by design. I take a real problem and hold it to a standard that forces the hard lessons: how to make an agent-built system verifiable, observable, and safe to change.

The governance here is heavier than a budgeting app needs on its own. That is deliberate. The system is small enough to hold in my head and real enough to break, which makes it the right place to work out methods that matter at a much larger scale.

## Technical Depth

What it works through:

- Governance enforced through decision records
- Secrets management and security patterns
- Type-safe architecture across boundaries
- Observability instrumentation (OpenTelemetry)
- Modern TypeScript ecosystem and tooling
- Policy-based development and compliance verification
- Infrastructure as code and containerization

## Interested in this work?

Happy to talk about this project or the research practice behind it.

Email me about this →

← Back to Approach
