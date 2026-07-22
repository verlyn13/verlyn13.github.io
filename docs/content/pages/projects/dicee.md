---
id: page_dicee
type: page
source_file: projects/dicee.html
source_selector: main
route: /projects/dicee.html
content_hash: 7b896edaf30d494320aaef4accd2fdf3fec20511ca68868f5567dbead19b91e6
html_hash: af35cc7a3c1fd864e19cba158264511469ef9dc5c4d594d6267e9ef691fca2dc
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

## Summary

Dicee is a family-friendly multiplayer dice game that runs in a mobile browser without an app install. Its game engine is written in Rust and compiled to WebAssembly.

The deployed system combines a SvelteKit interface with Cloudflare Durable Objects and WebSockets for real-time room state.

## Strongest proof

Both the [live deployment](https://dicee.games/) and the [public source](https://github.com/verlyn13/dicee) are available for review.

## Technical decision

The rules engine is written in Rust and compiled to WebAssembly, while Cloudflare Durable Objects and WebSockets coordinate real-time room state across browser clients.

## Current limit

The public evidence supports the architecture and live delivery. It does not establish traffic, latency, or general performance at scale.

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

Public source ↗
