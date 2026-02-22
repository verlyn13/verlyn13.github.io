---
name: ship-small
description: Keep changes small, reviewable, and reversible
---
# Ship Small Rules

- Prefer 1–3 commits max per task.
- Each commit should pass `mise run ci` independently.
- Avoid drive-by refactors — only touch files related to the task.
- If touching >5 files, stop and write a brief plan with file paths first.
- Keep public URLs stable — never break existing page paths.
- One logical change per commit. Split visual vs structural changes.
