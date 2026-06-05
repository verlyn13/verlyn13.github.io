---
name: token-consolidation
description: Consolidate raw design values into DTCG tokens for this repo. Use when adding or changing a color/spacing/shadow in the design system, or when the no-raw-values gate fails. Clusters near-duplicates into tiers, edits tokens/*.tokens.json, regenerates, and verifies.
---

# Token consolidation

Add or change a design value the token-correct way (see `design/DESIGN_SPEC.md`, ADR-0001/0002).

## Steps
1. **Inventory.** `rg -n 'hsl\(|rgb\(|#[0-9a-fA-F]{3,8}' assets/jeffrey.css` — find raw literals (should be none).
2. **Pick the tier.** A reusable hue/scale → add a **primitive** in `tokens/primitive.tokens.json`.
   The intent-named value components use → add/lift a **semantic** token in `tokens/semantic.tokens.json`
   (flat leaf name == the CSS var; reference a primitive, or hold a verbatim alpha value).
3. **Regenerate.** `npm run tokens` → rewrites `assets/tokens.generated.css` (never hand-edit it).
4. **Use it.** Reference `var(--token)` in `assets/jeffrey.css` — never a raw literal.
5. **Verify.** `npm run conformance && npm run tokens:check && mise run ci`. Update `DESIGN_SPEC.md`
   if the vocabulary changed.

Token / palette / scale changes are **ask-first** (operator-approved).
