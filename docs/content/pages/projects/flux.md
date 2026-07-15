---
id: page_flux
type: page
source_file: projects/flux.html
source_selector: main
route: /projects/flux.html
content_hash: 02cb0d3d8530c4f8f05cc06960019b35387180d1a2f13ba8ce93a9ec8adee92a
html_hash: 63fb12e649bd2e34136491d9d50f143bcefae5e10ca980b3515690187976d441
normalizer_version: 1
sync_direction: html_to_markdown
protected_fields: [id, type, source_file, source_selector, normalizer_version]
---

← Back to work

[Evidence](/#evidence) · ML Control Planes

# Flux

Image Generation Control Plane

Production-live · Private and intentionally unlinked

## What is this?

Flux is a private creation-and-curation control plane for image generation. It validates a request into a typed generation intent, selects an eligible provider account, streams provider events, and finalizes completed outputs into manifest-backed storage and run projections.

## What is it for?

It gives local and remote image-generation providers one governed dispatch surface while preserving privacy checks, provider constraints, artifact hashes, sidecars, and a manifest digest.

## How is it used?

A validated intent moves through provider and account resolution, support and privacy guards, a common `execute(intent)` event stream, and manifest-backed finalization. Current adapters cover Fal, Replicate, local `mflux` on Apple Silicon, and readiness-gated RunPod-BYO.

## Why does it matter?

Provider abstraction is useful only when execution and evidence stay inspectable. Flux keeps provider-specific wire shapes behind a typed boundary and records finalized outputs with SHA-256 evidence rather than presenting a successful API call as sufficient provenance.

## Evidence and status

- The successor control plane is production-live and documented through 20 accepted architecture decision records.
- Finalized artifacts record hashes, sizes, sidecars, and a manifest digest; output object keys remain run-scoped rather than content-addressed.
- The repository is private and intentionally unlinked.
- Some RunPod-BYO production wiring remains incomplete.

### What this does not demonstrate

Flux does not implement the previously described compiler/IR. Its MCP surface validates providers and replays fixtures rather than submitting live generation. No additional runtime, traffic, adoption, or performance claim is made.

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

← Back to Evidence
