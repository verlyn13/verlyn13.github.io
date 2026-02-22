---
name: fix-issue
description: Reproduce → isolate → fix → verify workflow
---
# Fix Issue Workflow

1. **Reproduce**: Identify the bug visually or via build error. Note the exact symptoms.
2. **Isolate**: Find the root cause file(s) using the triage map in @AGENTS.md.
3. **Fix**: Make the smallest change that resolves the issue.
4. **Verify**: Run `mise run ci` (lint + format-check + build).
5. **Visual check**: If the fix affects rendering, confirm in `mise run dev` at both desktop and mobile widths.
6. **Document**: Commit with `fix(scope): description` explaining what broke and why.
