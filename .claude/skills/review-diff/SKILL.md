---
name: review-diff
description: Self-review checklist before handing back to a human
---
# Diff Review Checklist

Before marking a task complete, verify:

- [ ] Diff matches the request exactly — no unrelated changes.
- [ ] No Biome rules disabled or bypassed.
- [ ] `mise run ci` passes clean.
- [ ] Design system followed (CSS custom properties, rem-based spacing scale, semantic colors).
- [ ] HTML heading hierarchy preserved (no skipped levels).
- [ ] No new JavaScript added without explicit justification.
- [ ] No broken links or changed URLs that could affect bookmarks.
- [ ] Any "Ask first" boundaries from @AGENTS.md respected (new deps, CI changes, etc.).
- [ ] Responsive layout intact at 768px breakpoint.
