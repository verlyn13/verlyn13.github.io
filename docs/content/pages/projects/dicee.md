---
id: page_dicee
type: page
source_file: projects/dicee.html
source_selector: main
route: /projects/dicee.html
content_hash: 83096808fc65fff28478e6e77ad0d73850b6f7af9299a67d8df51f4037e9c919
html_hash: 5b5f7abf07074d10656b9bb6ad6087a77467db6820e08a9336b183a1527e09cf
normalizer_version: 1
sync_direction: html_to_markdown
protected_fields: [id, type, source_file, source_selector, normalizer_version]
---

← Back to work

[Evidence](/#evidence) · Hybrid Intelligence

# Dicee

Multiplayer Game Engine

Live Production

dicee.games →

## Overview

Family-friendly multiplayer dice game demonstrating serverless real-time coordination at scale. Built to explore Cloudflare's edge computing model and WebAssembly optimization.

Solo development from architecture through deployment. Live users, real monitoring, production infrastructure.

## Technical Architecture

### Game Engine

- Rust compiled to WebAssembly (45KB optimized bundle)
- Deterministic game logic, zero external dependencies
- 1800+ automated tests ensuring correctness

### Backend Infrastructure

- Cloudflare Durable Objects (SQLite-backed) for isolated game state
- Hibernatable WebSockets for cost-optimized real-time gameplay
- Workers AI binding for audio transcription
- PostgreSQL (Supabase) for persistence

### Frontend

- SvelteKit (Svelte 5) on Cloudflare Pages
- **Service Bindings:** Zero-latency internal RPC to the isolated Worker
- ts-rest for type-safe API contracts

## Why This Matters

### Production Deployment

Live users, real monitoring, operational experience managing production infrastructure.

### Advanced Edge Architecture

Zero-latency Service Bindings between Pages and Workers. Utilizing SQLite-backed Durable Objects for transactional consistency without traditional servers.

### Performance Optimization

45KB WASM bundle demonstrates understanding of compilation targets and performance constraints.

### Type Safety

End-to-end type contracts from Rust through TypeScript. Type-driven development.

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

Visit live site ↗

← Back to Evidence
