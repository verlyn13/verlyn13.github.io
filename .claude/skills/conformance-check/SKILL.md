---
name: conformance-check
description: Run the design-system conformance gates for this repo and report pass/fail. Use before committing CSS or token changes, or when CI flags a design-system gate.
---

# Conformance check

Run the gates and return a concise pass/fail summary (don't dump full output into context).

## Steps
1. `npm run conformance` — fails if `assets/jeffrey.css` contains a raw `hsl()/rgb()/#hex` color.
2. `npm run tokens:check` — fails if `assets/tokens.generated.css` is stale vs `tokens/*.tokens.json`.
3. Full gate: `mise run ci` — lint + format-check + the two checks above + build.

## On failure
- **raw color** → replace with a semantic token (use `/token-consolidation`).
- **stale tokens** → `npm run tokens`, then commit the regenerated CSS.
