# AGENTS.md — Project Agent Contract (canonical)

## Project snapshot

- **Purpose**: Academic research portfolio for Dr. Jeffrey Johnson — autonomous systems and AI tool integration
- **Stack**: Vanilla HTML/CSS, Vite 5 (build), Biome 2.3+ (lint/format), Node 24 (via mise)
- **Production URL**: https://jvjohnson.dev
- **Deployment**: GitHub Pages via Actions (auto-deploy on push to `main`)

## Repo shape

```
index.html              # Portfolio home
cv.html                 # Curriculum vitae
contact.html            # Contact page
projects/               # Project detail pages (dicee, maat, scopecam, budget-triage)
experience/             # Experience section (braid timeline + era narratives)
research/               # Research & publications
assets/
  jeffrey.css           # Single shared stylesheet (all CSS here)
  menu.js               # Mobile nav toggle + active link state
  icons/                # Favicon and project icons (SVG)
experiments/            # Prototypes and unused assets (not deployed)
.github/workflows/      # CI/CD (deploy.yml)
vite.config.js          # Multi-page Vite build config
biome.json              # Biome linter/formatter config
.mise.toml              # Runtime + task runner config
```

## Setup & common commands

```bash
npm install                  # Install dependencies
mise run dev                 # Dev server at http://localhost:5173
mise run build               # Production build to dist/
mise run preview             # Preview build at http://localhost:4173
mise run lint                # Lint with Biome
mise run lint:fix            # Lint + auto-fix
mise run format              # Format with Biome
mise run format:check        # Check formatting (no write)
mise run ci                  # Full CI: lint + format-check + build
mise run deploy              # Local deploy verification: lint + build + preview
mise run clean               # Remove dist/ and node_modules/
```

## Definition of done (DoD)

- [ ] `mise run ci` passes (lint + format-check + build)
- [ ] All HTML pages render correctly in dev server
- [ ] New/changed pages added to `vite.config.js` input map
- [ ] Responsive layout verified at desktop and mobile (768px breakpoint)
- [ ] Semantic HTML preserved (heading hierarchy, ARIA labels)
- [ ] Design system followed (CSS custom properties from `jeffrey.css`)

## AI agent tooling

### Available agents & MCPs

| Tool | How to invoke | Use case |
|---|---|---|
| **context7** | `mcp__context7__resolve-library-id` → `mcp__context7__query-docs` | Current docs for Vite, Biome, or any library before writing code |
| **Claude Code skills** | `/fix-issue`, `/ship-small`, `/review-diff` | Structured repeatable workflows (defined in `.claude/skills/`) |
| **Task subagents** | Task tool (`Explore`, `general-purpose`) | Multi-file research, codebase exploration, parallel independent work |

### Agent interaction model

- **Explore first**: Read relevant files before proposing changes. Never guess at structure.
- **Plan before non-trivial work**: Use plan mode for tasks touching >2 files or requiring architectural judgment.
- **Subagents for isolation**: Spawn a subagent when the subtask is cleanly separable and shouldn't pollute main context.
- **Direct tools for known paths**: Prefer Read/Glob/Grep over subagents for targeted, predictable lookups.

### Context management (Claude Code)

- Reference files with `@path` syntax (e.g., `@assets/jeffrey.css`).
- Use `/compact` when context is large mid-task before continuing.
- Cursor IDE reads `.cursor/rules/*.mdc` — project, CSS, and HTML rules auto-attach to relevant files.

## Workflow rules

- For non-trivial tasks: explore existing pages → write a short plan (with file paths) → implement.
- Keep diffs small and reversible. Prefer 1–3 focused commits.
- If requirements are ambiguous, stop and ask before coding.
- Run `mise run ci` before considering any change complete.
- Preview changes visually — this is a portfolio site, appearance matters.

## Boundaries (hard rules)

### Always

- Edit only source files + config that match the task.
- Follow the existing design system (CSS custom properties in `jeffrey.css`).
- Use semantic HTML5 with proper heading hierarchy.
- Maintain consistent page structure: header → main → footer.
- Keep all styles in `assets/jeffrey.css` (single CSS file).

### Ask first

- New npm dependencies
- New HTML entry points (pages)
- Changes to `vite.config.js` build configuration
- Changes to `.github/workflows/deploy.yml`
- Changes to the design system (colors, typography, spacing scale)
- Structural changes affecting navigation or site map

### Never

- Commit secrets, keys, or tokens
- Modify `node_modules/`, `dist/`, or `package-lock.json` directly
- Add JavaScript unless absolutely necessary (site is intentionally JS-minimal)
- Disable Biome rules to silence errors
- Break existing page URLs (they may be bookmarked or linked externally)
- Add external font loading, tracking scripts, or heavy dependencies

## Design system (non-obvious rules)

- **Spacing**: Rem-based scale via `--space-1` through `--space-5`. Never use arbitrary pixel values.
- **Colors**: Blue accent `hsl(212 85% 45%)` (`--accent`), green secondary `hsl(160 55% 35%)` (`--accent-2`). Use semantic variables: `--ink` (text), `--paper` (bg), `--muted` (secondary text), `--accent` (links/emphasis).
- **Typography**: System sans-serif (`ui-sans-serif, system-ui`) via `--font`. Monospace via `--mono`. No web fonts.
- **Layout**: `72ch` max-width (`--measure`), 768px mobile breakpoint.
- **Borders/Shadows**: `--border`, `--shadow`, `--shadow-hard`, `--radius` (14px), `--radius-sm` (10px).
- **Philosophy**: Academic credibility over commercial appeal. Clean, fast, respectful of visitor's time.
- **Design philosophy**: jeffrey.css is "rigorous, practical, systems-minded, warm-but-not-squishy" — clear constraints over clever hacks. Other themes
  (e.g., experiments/themes/academic.css) are sandbox-only and not deployed.

## Code style

- HTML: 2-space indent, semantic elements, ARIA labels on external links.
- CSS: Custom properties in `:root`, logical grouping, mobile-first not required but responsive must work.
- JS (if any): Biome-enforced — single quotes, no semicolons (unless needed), 100-char line width.
- Commits: Conventional format `type(scope): description` — signed with GPG.

## Where to look first (triage map)

- **Shared styles**: `assets/jeffrey.css`
- **Mobile nav**: `assets/menu.js`
- **Site structure/nav**: `index.html` (home), individual page headers
- **Build config**: `vite.config.js` (entry points), `.mise.toml` (tasks)
- **CI/CD**: `.github/workflows/deploy.yml`
- **Lint/format rules**: `biome.json`
- **Project pages**: `projects/*.html`
- **Experiments**: `experiments/` (not deployed, safe to iterate)
