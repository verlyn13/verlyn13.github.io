---
id: page_flux
type: page
source_file: projects/flux.html
source_selector: main
route: /projects/flux.html
content_hash: 3c9acc120bf3630cc9c85374d2bb4957fe7e93e211b296efac45ab2e08c16830
html_hash: 5806ffd00962f10ae2ecfa63d22882226fde29ed63f407efdff3f03dcb8db73e
normalizer_version: 1
sync_direction: html_to_markdown
protected_fields: [id, type, source_file, source_selector, normalizer_version]
---

← Back to work

[Approach](/#approach) · ML Control Planes

# Flux Pro Shop

Image Generation Control Plane

Production Infrastructure

## Overview

Production-grade image generation control plane built on HuggingFace Diffusers, optimized for Apple Silicon (MPS). It manages local GPU generation, remote API runners, and complex artifact lineage for full reproducibility.

By designing a unified Compile/Execute Intermediate Representation (IR), this architecture abstracts the generation paths for complex ML models (Flux, SDXL/Pony, and GGUF).

## Technical Architecture

### Core Engine & IR

- Python 3.12+ type-safe core
- Unified IR: WorkflowSpec → Compiler → ExecutionPlan → Runner → Result
- Backend abstraction (DiffusersBackend, SDXLBackend, ComfyUIBackend, ApiBackend)

### Data & Lineage

- Content-addressed storage for immutable generation results
- Automated lineage tracking (source_run, derivation)
- JSON-based metadata-driven reproducibility

## Why This Matters

### Artifact Immutability

Mathematical guarantee of 100% artifact reproducibility through rigorous lineage tracking.

### Performance Engineering

Backed by an incredibly fast test suite (4,600+ tests executing in under 20 seconds).

### Hardware Abstraction

Dynamic routing capability between MPS (Metal Performance Shaders) and remote API execution environments.

### Production Quality

Enterprise-grade structural resilience, bringing software engineering rigor to experimental ML pipelines.

## Technical Depth

This project demonstrates understanding of:

- Distributed state management and coordination
- WebSocket protocols and real-time systems
- Serverless architecture patterns and edge computing
- WebAssembly compilation and optimization
- Production deployment and operational monitoring
- Type-safe system design across language boundaries

## Development Context

Built as a learning platform to explore modern web infrastructure while creating something family members could actually use. The constraints—real users, need for reliability, performance requirements—drove architectural decisions and forced engagement with production concerns beyond local development.

## Interested in this work?

Happy to talk about this project or the research practice behind it.

Email me about this →

← Back to Approach
