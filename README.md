# jvjohnson.dev — Evaluations and agent-governance portfolio

**Jeffrey V. Johnson, Ph.D.** — evaluations and agent-governance engineer.

I build systems that make AI-assisted work measurable, governable, and auditable—from deciding
whether model evidence supports a change, to defining what agents may do, to preserving evidence and
human review in consequential software.

Live site: <https://jvjohnson.dev>

## What the site emphasizes

The recruiter-facing first layer uses three connected examples:

- **Agentic-Coding Evaluation Lab** — independent recomputation and fail-closed refusal when evidence
  does not support a model or agent change;
- **Governance and agent-control architecture** — bounded authority, evidence-preserving delegation,
  policy controls, and safe escalation; and
- **Budget Triage** — provenance, exact monetary handling, uncertainty, observability, and human review
  in a private financial evidence workbench.

`audit-spec`, Host Capability Substrate, and ScopeCam provide compact supporting evidence. The grouped
`/projects/` index presents the wider body of work without creating a second portfolio hierarchy.
Academic experience, publications, applied statistics, teaching, and earlier systems work remain
available as relevant background.

## Architecture

This is a multi-page static site built with vanilla HTML/CSS, Vite 8, Biome 2.5, and Node 24 through
mise. GitHub Pages deploys through Actions after an operator-approved merge to `main`.

The site intentionally stays small:

- one shared component stylesheet, `assets/jeffrey.css`;
- DTCG token sources compiled into `assets/tokens.generated.css`;
- build-time project-feed rendering with no client-side feed application; and
- two sanctioned browser scripts: `assets/menu.js` for navigation and `assets/copy-md.js` for
  copy-as-Markdown actions.

## Evidence and privacy boundaries

This repository owns public presentation and deployment. Privacy-sanitized provenance comments contain
only a source-document basename and refresh date; they do not expose sibling-repository paths or commit
SHAs.

The website consumes the accepted project feed at `public/data/projects.json` and validates its complete
envelope before building `/projects/`. Private project repositories remain unlinked, and public copy
states material evidence and maturity limits beside each claim.

The cross-repository feed boundary is documented in `docs/meta-inventory-website-contract.md`.
Documentation currentness and historical handoffs are indexed in `docs/index.md`.

## Local development

```bash
npm install            # install dependencies
mise run dev           # dev server at http://localhost:5173
mise run build         # production build to dist/
mise run preview       # preview build at http://localhost:4173
mise run lint          # Biome lint
mise run format:check  # Biome format check
mise run ci            # full local completion gate
npm test               # feed-model and content-sync tests
```

Design authority lives in `design/DESIGN_SPEC.md` and `docs/design-system.md`; durable decisions live in
`docs/adr/`. Change authored pages and templates, never generated `dist/` or `projects/index.html`.

## License

MIT © 2025–2026 Jeffrey V. Johnson
