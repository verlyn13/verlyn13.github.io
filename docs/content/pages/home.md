---
id: page_home
type: page
source_file: index.html
source_selector: main
route: /
content_hash: 5f00ed7cf32d8447c34c8c9f4907f564995fc6a387b0c1d6ace031b7b7711bc2
html_hash: cece5ab9adcf4299814c8478b62906bb81dd06620402e54712a5d891326ece72
normalizer_version: 1
sync_direction: html_to_markdown
protected_fields: [id, type, source_file, source_selector, normalizer_version]
---

# Jeffrey V. Johnson, Ph.D.

Independent researcher and systems builder

I am a tenured associate professor of mathematics, trained in functional analysis, working now as an independent researcher and systems builder. The role I am aiming at is research engineer: turning research questions into working systems. My recent focus is agentic systems: how to bound what an automated agent is allowed to do, and verify it.

Homer, Alaska

Selected work [Budget Triage](/projects/budget-triage.html) [Flux](/projects/flux.html) [Dicee](/projects/dicee.html)

GitHub →

LinkedIn →

Email →

Now · Q2 2026 Working out a governance substrate for multi-agent systems: who sets policy, who executes it, who audits the result, kept legible to the agents inside it.

## Approach

These are the threads I work across, and the projects where I work them out. They are structured like products because that is the clearest way to describe them. It is not how I think of them. They are a learning programme: real systems built to find out what holds up.

### Agentic governance

Flagship

Splitting authority between the agents that set policy, the agents that execute it, and the agents that audit the result, so an agent stays inside known bounds. The pattern I work out across the projects below.

Policy as code

Audit trail

Role separation

Case Study

Budget Triage →

### AI image-generation control plane

Performance

Flux compiles one intent across local and remote image-generation providers, streams results, and tracks artifact lineage. A private research vehicle, currently paused.

Provider abstraction

Artifact lineage

Reproducible runs

Case Study

Flux →

### Deterministic game engine

Depth

A deterministic Rust and WASM core handles the math, with lightweight personality profiles for human-like variance and no model latency. Dicee is live family software, and the one project I have deployed.

Rust + WASM

Deterministic core

Live

Case Study

Dicee →

### Android camera systems

Rigor

ScopeCam is an Android app for USB microscope and UVC cameras that Google's HAL does not support, on a vendored native stack. I started it before the current AI tools, and it is still alpha. Hardware-adjacent work, where lifecycle mistakes show up immediately on real devices.

UVC

Native stack

On-device testing

Case Study

ScopeCam →

### Self-hosted infrastructure

Architecture

A multi-node home network with no WAN exposure, on OPNsense, a Tailscale mesh, and self-hosted secrets. Where I learn where credentials live, how traffic is routed, and how operational state drifts.

OPNsense

Tailscale mesh

Machine identity

Case Study

HomeNetOps →

### Research foundations

Foundations

Smaller projects, each probing one question: agent coordination, what defines an organization, what a host can safely let an agent do, or the group theory behind symmetry.

Coordination

Capability boundaries

Group theory

Foundations

MAAT →

The Nash Group →

HCS →

Symmetry Groups →

### Teaching tools

In Production

A custom iframe framework for Blackboard Ultra, a LaTeX to Blackboard converter for hundreds of pages, and automated task schedulers. Practical tools built against real teaching constraints.

LMS Integration

LaTeX Processing

Automation

Details

Teaching & tooling →

## Background

A pure-mathematics foundation applied to systems work: a dissertation on spectral preservers between function algebras (with Dr. Thomas Tonev), a recent clinical-research publication in *Pediatric Physical Therapy* (2023), self-hosted infrastructure across Hetzner and Cloudflare, and ongoing theoretical-CS exploration. The full record — teaching, publications, and the complete CV — is below.

Teaching & Leadership →

Publications & Research →

Complete CV →

## Technical Foundation

### Systems

Rust, TypeScript/Bun, Kotlin, Python

### Architecture

gRPC microservices, WebAssembly, serverless patterns

### Infrastructure

Self-hosted services, Cloudflare, Docker

### Theory

Distributed algorithms, type systems, formal methods
