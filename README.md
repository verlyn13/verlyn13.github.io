# jvjohnson.dev — Research portfolio

**Jeffrey V. Johnson, Ph.D.** — Researcher + builder. Tenured Associate
Professor of Mathematics (KPC/UAA) building agentic systems as a research
practice. Ph.D. Mathematics, University of Montana 2013 (commutative
Banach algebras); clinical-research publication in *Pediatric Physical
Therapy* 2023;35(3):326-331.

Live site: <https://jvjohnson.dev>

## What's here

A multi-page static site (Vanilla HTML/CSS, Vite 5, Biome 2.3+, Node 24
via mise) built around three exploration threads:

| Thread | Tag | Case study |
|---|---|---|
| ML Control Planes | Performance | `projects/flux.html` |
| Hybrid Intelligence | Depth | `projects/dicee.html` |
| Safety-Critical Systems | Rigor | `projects/scopecam.html` |

Additional project pages on the agentic-substrate work
(`projects/the-nash-group.html`, `projects/host-capability-substrate.html`)
and on the research-foundation side
(`projects/symmetry-groups.html`, `projects/budget-triage.html`,
`projects/maat.html`).

A three-tier framing — flagship agentic substrate / production-grade
personal-use engineering / creative-and-framework outputs — landed
2026-05-22 as the D-001 rebalance (commit `88e15ca` and surrounding).
MAAT was moved from flagship to tertiary "creative early work" pending
a presentation refresh.

## Content source of truth

This repo is the *presentation layer*. Source content lives in
`../new-direction-2026/career-transition-ready/`, with per-page
provenance comments at the top of each HTML file recording which
source document and which git SHA was used to produce the current
page. Use `/sync-check` (from the new-direction-2026 repo's
`.claude/skills/`) to surface drift between the two sides.

## Local development

```bash
npm install            # install dependencies
mise run dev           # dev server at http://localhost:5173
mise run build         # production build to dist/
mise run preview       # preview build at http://localhost:4173
mise run lint          # Biome lint
mise run format:check  # Biome format check
mise run ci            # full CI: lint + format-check + build
mise run deploy        # local deploy verification
```

Deployment is GitHub Pages via Actions; auto-deploys on push to `main`.

## Design system

Single shared stylesheet at `assets/jeffrey.css` — CSS custom properties
in `:root`, system fonts (`ui-sans-serif`, `system-ui`), `72ch`
max-width, 768px mobile breakpoint. No web fonts, no tracking, no
external scripts. JS is intentionally minimal — only `assets/menu.js`
(mobile nav toggle + active link state).

Philosophy: academic credibility over commercial appeal. Clean, fast,
respectful of the visitor's time.

## Repo conventions

- AGENTS.md is the canonical project contract for agent tooling.
- CLAUDE.md is the Claude Code shim.
- Decisions are tracked in commit messages (D-NNN, AAF-VGH-NNN,
  H-NN identifiers) referencing
  `../meta-inventory/audit/2026-05-21/remediation-roadmap-2026-05-21.md`
  rather than a local `docs/decisions/` directory.

## License

MIT © 2025–2026 Jeffrey V. Johnson
