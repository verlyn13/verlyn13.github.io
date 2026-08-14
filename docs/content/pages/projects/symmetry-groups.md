---
id: page_symmetry-groups
type: page
source_file: projects/symmetry-groups.html
source_selector: main
route: /projects/symmetry-groups.html
content_hash: bc12471596bacdce951ecc6a6147ffe3957b285b31bbba7e971b6cf564fe9d61
html_hash: 1ddd04e2a4a1fc4b19621bf6167a72a1aae081d1e2e6691b6e8adb8d5a1f9483
normalizer_version: 1
sync_direction: html_to_markdown
protected_fields: [id, type, source_file, source_selector, normalizer_version]
---

← Back to work

[Supporting work](/projects/) · Source-verified 2026-08-13

# Symmetry Groups

Finite-group theory taught through play, with the axioms enforced as tests

Working prototype · playable MVP deployed for testing

## What is this?

A learning game for finite group theory. A player manipulates the symmetries of a shape, composes them, and progressively fills in a Cayley table. The first playable target is D4, the symmetry group of the square; S3 and D3 are seeded.

Underneath the game is a generic `FiniteGroup<ElementId>` domain rather than a hard-coded table for one group, so additional families can be added without rewriting the rules.

## What is it for?

Group theory is usually taught symbolically before it is taught structurally. The intent here is to let the structure be manipulated first, so that closure, identity, inverses, and associativity are observed before they are stated.

## Technical decision

The mathematical content is expressed as tests rather than as prose. The group axioms are enforced against the domain, so a change that breaks the algebra fails the build instead of producing a game that is playable but wrong. The same suite carries governance fitness-function tests alongside the mathematical ones.

## Evidence and status

- 30 test files, 328 tests, all passing. Verified by running the suite on 2026-08-13.
- Roughly 600 lines of domain and runtime code, in TypeScript with React 19 and Vite.
- Six architecture decision records.
- Continuous integration runs type checking, tests, and lint on the default branch.
- A playable build is deployed and publicly reachable.

## What it does not do

- The deployment is staging-live for MVP testing. It is not a production service, and no uptime or availability claim is made.
- No classroom use, adoption, learning-outcome, or pedagogical-effectiveness result is claimed. It has not been studied.
- Only D4 is a complete playable target. S3 and D3 are seeded; cyclic, alternating, and product families are not built.
- The source repository is private, so the test counts above are stated rather than independently checkable. The deployed build is the part a reader can open.

## Interested in this work?

The deployed build is open to anyone. Happy to talk about the domain model, the axiom tests, or the instructional design behind it.

Email me about this →

Open the playable build ↗
