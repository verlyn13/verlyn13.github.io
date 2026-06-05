---
name: extract-component
description: Extract a repeated CSS pattern in jeffrey.css into a documented, token-only component class cluster, and record it in DESIGN_SPEC. Use when the same declarations recur across rules in the stylesheet.
---

# Extract component (CSS)

This site has no JS component layer; "components" are documented CSS class clusters in
`assets/jeffrey.css` (see `layers.json`, ADR-0006).

## Steps
1. **Find usages.** `rg -n '<pattern>' assets/jeffrey.css` and the HTML that uses it.
2. **Name a class** for the cluster; move the shared declarations into it; reference **semantic tokens only**.
3. **Migrate call sites** (CSS + HTML) to the new class; keep markup semantic (heading order, ARIA).
4. **Document** the component in `design/DESIGN_SPEC.md` (name → tokens consumed).
5. **Verify** `mise run ci` (incl. conformance) + preview at desktop / 768px / 360px — zero visual diff intended.
