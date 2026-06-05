# CLAUDE.md — Claude Code instructions

Primary project contract: @AGENTS.md

## Model & CLI context

- **Model**: Claude Opus 4.6 (`claude-opus-4-6`)
- **Plan mode**: Enter plan mode before non-trivial changes — explore → draft plan with file paths → get approval → implement.
- **Context**: Reference files with `@path`. Use `/compact` when context is large before continuing.
- **MCP**: `context7` is available — resolve a library ID, then query docs before writing code against any framework.

## Workflow

1. Read relevant files before proposing changes — never guess at structure.
2. Non-trivial changes: plan mode → explore → written plan → implement.
3. Verify with `mise run ci` — single gate: lint + format-check + build.
4. Visual changes: run `mise run dev`, check both desktop and mobile (768px).

## Skills

| Invoke | When |
|---|---|
| `/fix-issue` | Bug: reproduce → isolate → fix → verify |
| `/ship-small` | Before committing — enforce small, focused diffs |
| `/review-diff` | Self-review checklist before handing back |

## MCP servers

| Server | Tools | When to use |
|---|---|---|
| `context7` | `resolve-library-id` → `query-docs` | Look up current Vite, Biome, or any lib docs before coding |

Always call `resolve-library-id` first to get the correct library ID, then pass it to `query-docs`.

## Subagents

Use the Task tool for:
- Codebase exploration when a targeted Glob/Grep won't suffice
- Isolated research that doesn't need to block the main thread
- Parallel work on independent subtasks

Prefer direct tool calls (Read, Glob, Grep) for targeted, known-path lookups.

## Permissions & safety

- Allowlisted: `npm`, `npx`, `biome`, `git`, `gh`, `mise`, `ls`, `cat`, `mkdir`
- Denied: `.env`, `.env.*`, `.envrc.local`
- PostToolUse hook: auto-formats `.js`, `.json`, `.css` after every write via Biome

## Project context

Academic research portfolio — clarity, performance, and credibility above all.
JS-minimal (only `assets/menu.js`), system fonts, single CSS file (`assets/jeffrey.css`).
See @AGENTS.md for design system, hard boundaries, and triage map.

## Automated hygiene — do NOT hand-maintain

Line endings, trailing whitespace, file encoding, and YAML/JSON/TOML validity
are enforced automatically. Never fix these by hand, and never add a manual
"clean up line endings / whitespace" step to any doc, task, or checklist:

- `.gitattributes` stores all text as LF and checks it out as LF on every OS —
  CRLF↔LF churn is structurally impossible. A diff that is purely line-ending
  or whitespace is a mistake: discard it (`git restore <path>`), do not commit it.
- `.editorconfig` keeps editors consistent (passive; no setup required).
- `.pre-commit-config.yaml` defines the hygiene hooks; the `Hygiene` GitHub
  Action (`.github/workflows/hygiene.yml`) runs `pre-commit run --all-files` on
  every push, so enforcement holds whether or not anyone ran `pre-commit install`.

Canonical standard + rationale + how-to-apply-to-a-new-repo:
`meta-inventory/docs/standards/repo-hygiene.md`.
