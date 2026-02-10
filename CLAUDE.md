# CLAUDE.md — Claude Code instructions

Primary project contract: @AGENTS.md

## Workflow

- Explore → plan → implement → verify with `mise run ci`.
- Reference files with `@path` when discussing specifics.
- Use skills for repeatable workflows (fix-issue, ship-small, review-diff).
- Preview visual changes in dev server before marking done.

## Verification

- `mise run ci` is the single gate: lint + format-check + build.
- For visual work: `mise run dev` and check both desktop and mobile widths.
- No test framework — verification is CI pass + visual inspection.

## Permissions & safety

- Safe commands allowlisted in `.claude/settings.json` (npm, biome, git, gh, mise).
- Secrets (.env, .envrc.local) are denied in settings.
- Hooks enforce formatting after JS/CSS edits.

## Project context

Academic research portfolio — prioritize clarity, performance, and credibility.
Site is intentionally JS-minimal with system fonts and a single CSS file.
See @AGENTS.md for full boundaries, design system, and triage map.
