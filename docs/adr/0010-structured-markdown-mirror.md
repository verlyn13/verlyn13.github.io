# ADR-0010: Structured Markdown mirror — a two-way, on-demand content sidecar with HTML as provenance

- Status: Proposed · Date: 2026-07-03

## Context
The site is hand-authored HTML (authoritative for authored pages) plus a feed-generated
`/projects/` index (`build-feed.mjs` from `public/data/projects.json`, ADR-0009). We want a
committed Markdown mirror of the content-bearing regions — for portability, search, reading, and
downstream tooling — that **complements** the site without becoming a second site generator.

The operator wants sync to be **two-way but intentional**: `pull` (HTML→MD) and `push` (MD→HTML)
are run on purpose, never automatically. The hard constraint is that the mirror must not disturb
site structure or design. HTML stays the provenance.

Fidelity is the load-bearing problem. Markdown cannot represent class attributes, `aria-label`s,
span micro-structure, or grid wrappers, so a naïve MD→HTML push destroys design structure. The
actual pages confirm this splits three ways:

- **Layout / data-shaped** (class-bearing, design-meaningful): the home `<main>` (`hero-bio`,
  `aspect-tag`, `approach-card` articles), `cv-entry`/`cv-institution` blocks, dicee's
  `significance-grid`. Nearly every text node is wrapped in a design-bearing element.
- **Prose sections** (plain `h2`/`p`/`ul` inside a classed section wrapper): dicee's *Overview*,
  *Technical Depth*, *Development Context*; narrative regions in research/experience.
- **Generated**: `projects/index.html`, which is derived from the feed and is a build artifact.

Two-way at whole-`<main>` granularity is therefore infeasible without loss. This is not a limitation
to paper over — pull-first, region-scoped push is what honors "HTML is provenance, don't disturb
structure, just complement it."

## Decision
1. **HTML stays authoritative; `docs/content/` is a committed sidecar mirror.** It is never a source
   of truth for the deployed site. Generated surfaces (`projects/index.html`) and `dist/` are
   excluded from the mirror entirely.
2. **Content shape determines sync mode, per region.** Layout/data-shaped → `pull_only`; flat prose
   → `two_way`-eligible; generated → excluded. The default is `pull_only`. Two-way is opt-in **per
   region**, never a per-page default.
3. **Sync is explicit and directional.** `content:pull`, `content:push`, `content:diff`,
   `content:check`. No automatic or background sync, no prebuild mutation, no hidden rewrite. The
   operator chooses the direction each time.
4. **Push is fail-closed and structure-preserving.** It rewrites only the inner content between
   `<!-- content-sync:start ID -->` … `<!-- content-sync:end ID -->` markers — never the wrapper
   element or its attributes. It accepts only a constrained Markdown vocabulary
   (`h2`–`h4`, `p`, `ul`/`ol`/`li`, `strong`, `em`, `a`, `code`, `blockquote`). It refuses on a
   missing marker, illegal vocabulary, a stale `html_hash` (HTML changed since the last pull), or a
   missing registry entry.
5. **Round-trip idempotency is the promotion gate.** A region earns `two_way` status only after
   `pull → push → pull` is byte-identical for both the HTML region and the Markdown. Deterministic
   output alone is table stakes; the round-trip is the test that matters.
6. **Registry-first identity.** `docs/content/registry.yaml` maps `id` ↔ `file` ↔ `source`. An
   existing registry ID wins; a route/title/slug rename does not regenerate the ID; a delete requires
   an explicit tombstone entry in `docs/content/changes.yaml`.
7. **Minimal dependency surface.** `parse5` is added for the HTML side (parsing and serialization).
   Push uses a small in-repo constrained Markdown renderer — **no Markdown library** — so push is
   fail-closed by construction (it can only emit the allowed vocabulary). This dependency was
   approved in planning; it is build/tooling only and is never shipped to the site.
8. **CI posture: integrity, not currency.** `content:check` enforces internal integrity only
   (registry ↔ files ↔ hashes, no duplicate IDs, markers present for `two_way` regions,
   vocabulary-legal Markdown). It does **not** require HTML and Markdown to be mutually current;
   drift between intentional syncs is a visible, accepted state surfaced by `content:diff`. `check`
   enters `mise run ci` only after the mirror stabilizes (PR-2), and even then as an integrity gate.
9. **Existing provenance comments are preserved.** The `<!-- source: … @sha -->`,
   `<!-- @design-structure: X -->`, and feed comments already in the HTML are excluded from content
   and from the content hash, and are preserved across `push`.

## Consequences
- PR-1 delivers portability/search value immediately at zero structural risk (pull-only).
- Two-way exists but is deliberately narrow. Most mirrored content is a lossy projection **by
  design** — that is the point of a complement rather than a second generator.
- `parse5` enters the repo as a build/tooling dependency. The site's single-stylesheet and
  no-client-JS rules are unaffected: the mirror runs at author time, nothing ships to the site.
- The mirror may legitimately drift from the HTML between intentional syncs. `content:diff` surfaces
  drift; CI will not force a paired sync commit on every content edit — consistent with "on demand,
  on purpose."
- A `normalizer_version` is stamped in each mirror file's frontmatter so a future change to the
  normalization rules is detectable and can be re-baselined intentionally rather than silently.
- A new machine-readable spec (`docs/markdown-mirror.md`) and a sidecar tree (`docs/content/`) enter
  the docs surface. `changes.yaml` is a human-curated tombstone/decision log, not an auto-appended
  timestamped history — git already records sync history, and timestamps would break determinism.

## References
- Spec: `docs/markdown-mirror.md` · Sidecar: `docs/content/README.md`
- Related: ADR-0009 (project-intelligence feed — the generated `/projects/` index is excluded),
  ADR-0008 (colophon/publishing pipeline), ADR-0005 (design tools non-authoritative)
- Rollout: PR-0 docs (this ADR + spec), PR-1 pull MVP (`parse5`, `pull`/`diff`/`check`, 2–3 pages),
  PR-2 expand pull + wire integrity `check` into CI, PR-3 two-way `push` on opt-in prose regions
