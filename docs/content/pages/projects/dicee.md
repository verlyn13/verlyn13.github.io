---
id: page_dicee
type: page
source_file: projects/dicee.html
source_selector: main
route: /projects/dicee.html
content_hash: e068bc7999e6b179ae7b50700d22706556f476e2ee2cdbfc40824107d3391844
html_hash: 2230b0c4fc06f1d1a35ff9c7c6a4e3619ae5a46afc8d637f238c500807f8af8a
normalizer_version: 1
sync_direction: html_to_markdown
protected_fields: [id, type, source_file, source_selector, normalizer_version]
---

← Back to work

[Supporting work](/projects/) · Deployed web application

# Dicee

Family-friendly multiplayer game for mobile browsers

Live public deployment

dicee.games →

## What is this?

Dicee is a family-friendly multiplayer dice game that runs in a mobile browser without an app install. Its game engine is written in Rust and compiled to WebAssembly.

The deployed system combines a SvelteKit interface with Cloudflare Durable Objects and WebSockets for real-time room state.

## What is it for?

It provides a usable game while serving as delivery evidence for cross-language browser software, real-time coordination, and serverless state management.

## How is it used?

Players open [dicee.games](https://dicee.games/) in a browser, create or join a game, and exchange state through WebSockets backed by Cloudflare Durable Objects. Supabase provides persistent data services.

## Why does it matter?

Dicee demonstrates end-to-end delivery across a Rust/WebAssembly engine, a SvelteKit client, real-time edge coordination, persistence, and a public deployment.

## Evidence and status

- The canonical public deployment at [dicee.games](https://dicee.games/) returned HTTP 200 during the accepted source review on 2026-07-14.
- Tracked source supports the Rust/WebAssembly engine, SvelteKit client, Cloudflare Durable Objects, WebSockets, and Supabase architecture.

### What this does not demonstrate

No exact binary-size, test-count, user, traffic, latency, or general performance claim is made. Those figures require a fresh source-local build or operational review before outward use.

## Technical shape

### Game engine

- Rust game logic compiled to WebAssembly.
- Browser delivery without a native app install.

### Real-time application

- SvelteKit frontend.
- Cloudflare Durable Objects and WebSockets for multiplayer coordination.
- Supabase for persistent data services.

## Interested in this work?

Happy to talk about this project or the research practice behind it.

Email me about this →

Visit live site ↗
