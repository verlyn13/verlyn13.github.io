# jvjohnson.dev — Reliable agent-development systems portfolio

**Jeffrey V. Johnson, Ph.D.** builds foundations for reliable, specification-driven agentic
development.

I build the foundations that let agents contribute reliable, specification-conforming work: typed
contracts, bounded authority, reproducible tool and runtime environments, deterministic gates, and
evidence-preserving handbacks. I test those foundations by using them to build complex applications,
data pipelines, evaluation systems, and infrastructure.

Live site: <https://jvjohnson.dev>

## What the site emphasizes

The recruiter-facing first layer presents the foundation and its public implementation evidence:

- **Host Capability Substrate** — typed capabilities, execution contexts, policy evidence, approvals,
  leases, audits, and bounded authorization;
- **Governance and agent-control architecture** — bounded authority, evidence-preserving delegation,
  reproducible environments, policy controls, deterministic gates, and safe escalation; and
- **Agentic Architecture Audit** — independent conformance and drift verification against explicit
  specifications.

Agentic-Coding Evaluation Lab, Budget Triage, ScopeCam, data-cleaning pipelines, Dicee, and other
applications are presented as proving grounds for the method. AI tools remain instruments inside the
system, not the identity or source of quality. Academic experience, publications, applied statistics,
teaching, and earlier systems work remain available as relevant background.

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
