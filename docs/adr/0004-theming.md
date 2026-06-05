# ADR-0004: Theming — light-only today

- Status: Accepted · Date: 2026-06-05

## Context
DTCG supports theming via token resolvers (spec-native, tooling still maturing) or multi-file token
sets (pragmatic). The site is intentionally light-only (`color-scheme: light`); there is no dark-mode
requirement.

## Decision
Ship **light-only**. If a mode (dark/density/brand) is later needed, add it as a **multi-file token
set** (`semantic.dark.tokens.json`) compiled to a mode-scoped output, and revisit resolvers when
Style Dictionary support is solid. Do not mix both mechanisms.

## Consequences
- No theming machinery now; the tier structure already supports adding modes without touching
  component CSS.
