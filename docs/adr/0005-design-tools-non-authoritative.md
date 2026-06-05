# ADR-0005: Design tools are non-authoritative consumers

- Status: Accepted · Date: 2026-06-05

## Context
The design system is the hub; Claude Design, Figma, and Canva are consumers. Bidirectional sync
tooling is a well-known source of silent drift.

## Decision
Code is authoritative. Design tools **read**: Claude Design extracts a UI kit from the repo;
Figma/Canva ingest via DTCG `.tokens.json`, Figma "Code to Canvas", or Canva export. Changes re-enter
the system **only as human-authored edits to the token sources** — the audited channel.

**No Figma API integration, Code Connect, or sync tooling** without a superseding ADR. (This exists to
stop a future agent from "helpfully" building a sync.)

## Consequences
- Zero bespoke sync to maintain; one provenance model.
- Round-tripping a tool-side visual change requires a human to re-author it in `tokens/`.
