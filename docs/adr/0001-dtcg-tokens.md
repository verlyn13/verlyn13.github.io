# ADR-0001: Design tokens authored in DTCG 2025.10

- Status: Accepted · Date: 2026-06-05

## Context
The site needs a code-first design system that doubles as the extraction source for design tools
(Claude Design, Figma/Canva). The W3C Design Tokens Community Group format reached its first stable
version (2025.10) and is the portable interchange standard.

## Decision
Author tokens as DTCG `.tokens.json` (`$value`/`$type`/`$description`) in `tokens/`, split into a
**primitive** tier (raw palette + scales) and a **semantic** tier (intent names). Code is the single
source of truth; design tools read, they do not write back.

Token color values are kept as **CSS `hsl()` strings** (not DTCG color objects/hex) so the compiled
output is byte-identical to the prior hand-authored stylesheet — a hard zero-visual-diff requirement
of the migration. Claude Design reads these from the repo directly.

## Consequences
- Maximum fidelity and zero-diff; trivial diffs in review.
- Strict hex-only DTCG importers would need a one-time `color()`/hex transform (a documented future
  option, not built now). Not blocking, since the primary consumer reads the repo's CSS/JSON.
