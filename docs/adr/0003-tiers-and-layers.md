# ADR-0003: Three token tiers + a five-layer model

- Status: Accepted · Date: 2026-06-05

## Context
Modern design systems separate raw values from intent and from page structure so they can re-skin
and stay legible to both humans and extraction tools.

## Decision
- **Token tiers:** `primitive` (raw palette/scale) → `semantic` (intent names, the component
  vocabulary). The optional **component** tier is not used (YAGNI for a small site).
- **Layer model** (`layers.json`): tokens(0) → base(1) → components(2) → patterns(3) → pages(4).
  Higher layers reference only lower ones.

For this single-stylesheet site the layers are **conceptual sections of `jeffrey.css`** plus the HTML
pages, not separate files (see ADR-0006).

## Consequences
- Clear, extractable structure; semantic names map cleanly to a UI kit.
- The cross-file layer-boundary check has no target here — documented, not enforced (ADR-0006).
