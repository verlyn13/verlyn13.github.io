---
id: page_flux
type: page
source_file: projects/flux.html
source_selector: main
route: /projects/flux.html
content_hash: 49c06b1af654f91b349ccb5647a09177c95a9ed199bb966bb0545fa197f0ee7a
html_hash: 14b341ad27a2da8a068387f5b8e3257e395a4491c91cea16997d19b3e50a33ee
normalizer_version: 1
sync_direction: html_to_markdown
protected_fields: [id, type, source_file, source_selector, normalizer_version]
---

← Back to work

[Evidence](/#work) · ML Control Planes

# Flux

Image Generation Control Plane

Active private operator deployment · Intentionally unlinked

## Summary

Flux is a private creation-and-curation control plane for image generation. It validates a request into a typed generation intent, selects an eligible provider account, streams provider events, and finalizes completed outputs into manifest-backed storage and run projections.

## Strongest proof

The active private operator deployment finalizes outputs with SHA-256 hashes, sizes, sidecars, and a manifest digest. Twenty accepted architecture decision records document the current control plane.

## Technical decision

A validated intent moves through provider and account resolution, privacy guards, a common `execute(intent)` event stream, and manifest-backed finalization. Provider-specific wire formats stay behind the typed boundary.

## Current limit

The repository is private and intentionally unlinked. Some RunPod-BYO wiring remains incomplete, and no traffic, adoption, or performance-at-scale claim is made.

## Technical shape

### Generation pipeline

- Type-safe Python core.
- `GenerateRequest → GenerationIntent → provider resolution → event stream → finalization`.
- Common provider contract with concrete Fal, Replicate, local `mflux`, and readiness-gated RunPod-BYO adapters.

### Artifact evidence

- Manifest-backed storage with SHA-256 hashes, sizes, sidecars, and a manifest digest.
- Run-scoped output object keys and an input by-hash helper.
- Manifest-driven, inspectable run projections.

## Interested in this work?

Happy to talk about this project or the research practice behind it.

Email me about this →
