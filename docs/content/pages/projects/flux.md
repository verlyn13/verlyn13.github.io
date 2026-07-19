---
id: page_flux
type: page
source_file: projects/flux.html
source_selector: main
route: /projects/flux.html
content_hash: 2b2549cadde7f2c051d5de067fe573315a4f7cb884ef9af183a1d5dfdd24a931
html_hash: 8e3725a5697c693f687471cfd65ea5c2667e7377caa159d50993b16024250caa
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
