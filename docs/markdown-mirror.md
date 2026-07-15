---
title: Structured Markdown mirror — contract and normalization spec
category: operations
component: content-sync
status: active
version: 0.3.1
last_updated: 2026-07-15
tags: [content, markdown, sync, mirror, provenance]
priority: high
audience: coding agent + operator
---

# Structured Markdown mirror — contract and normalization spec

Machine-readable orientation for the `docs/content/` mirror and the `scripts/sync-content.mjs` tool.
Durable rationale lives in **ADR-0010**; this file is the operational contract. HTML is authoritative;
the mirror is a committed **sidecar** for portability, search, reading, and downstream tooling.

## Content-shape taxonomy

Sync mode is decided per region by content shape, not per page.

| Shape | Signature | Examples | Mode |
|---|---|---|---|
| Layout / data-shaped | class-bearing, design-meaningful wrappers | home `<main>`, `cv-entry`/`cv-institution`, `significance-grid`, `approach-card` | `pull_only` |
| Prose section | flat `h2`/`p`/`ul` inside a classed section wrapper | dicee *Overview* / *Technical Depth* / *Development Context*, narrative prose | `two_way` (opt-in) |
| Generated | build artifact from a data source | `projects/index.html` (from `public/data/projects.json`) | excluded |

Default is `pull_only`. A region becomes `two_way` only after it has markers and passes the
round-trip proof (below).

## Directory layout

```
docs/content/
  registry.yaml     # id ↔ file ↔ source map; the sync map (script never invents structure)
  changes.yaml      # human-curated tombstone / decision log (no auto-timestamps)
  README.md         # what the sidecar is + how to use the commands
  pages/            # whole-<main> pull_only projection, mirroring route structure
  regions/          # <id>.md — the editable, push-able two_way units
    home.md
    cv.md
    projects/
      dicee.md
```

## Commands

```jsonc
// package.json scripts
"content:pull":  "node scripts/sync-content.mjs pull",   // HTML → MD (all shapes)
"content:push":  "node scripts/sync-content.mjs push",   // MD → HTML (marked prose regions only, fail-closed)
"content:diff":  "node scripts/sync-content.mjs diff",   // planned changes, no writes; surfaces drift
"content:check": "node scripts/sync-content.mjs check"   // integrity gate (no writes)
```

The operator chooses direction each time. There is no automatic, background, or prebuild sync.

## Registry schema (`registry.yaml`)

```yaml
pages:
  - id: page_dicee              # stable; existing id always wins
    file: pages/projects/dicee.md
    source_file: projects/dicee.html
    source_selector: main       # pull scope within the HTML file
    route: /projects/dicee.html
    mode: pull_only             # pull_only (default) | two_way
    two_way_regions: []         # region ids, e.g. [dicee.overview], once markers + proof exist
```

Rules: existing registry ID wins; a route/title/slug rename does **not** regenerate an ID; a delete
requires a tombstone entry in `changes.yaml`; a new source gets a deterministic proposed ID
(`page_<slug-of-route>`).

## Frontmatter schema (per mirror file)

```yaml
id: page_dicee
type: page
source_file: projects/dicee.html
source_selector: main
route: /projects/dicee.html
content_hash: <sha256 of normalized MD body>
html_hash: <sha256 of normalized HTML content region>   # marker-scoped for two_way regions
normalizer_version: 1                                     # bump = intentional re-baseline
sync_direction: html_to_markdown
protected_fields: [id, type, source_file, source_selector, normalizer_version]
```

`content_hash` gates rewrites: if the normalized body is unchanged, the file is not rewritten.
`html_hash` gates push: push refuses if the HTML region changed since the last pull.

## Normalization v1 (`normalizer_version: 1`)

The normalization function is the crux of round-trip fidelity. v1 rules:

- Extract the region named by `source_selector` (default `<main>`).
- **Exclude** from both content and hash: site nav, footer, skip-link; and the existing
  `<!-- source: … @sha -->`, `<!-- @design-structure: X -->`, and feed comments. These are
  **preserved in place** on push.
- Element mapping: `h1`–`h4` → `#`…`####`; `p` → paragraph; `ul`/`ol`/`li` → lists;
  `blockquote` → `>`; `pre`/`code` → code; inline `strong`/`em`/`a`/`code` preserved.
- Collapse insignificant whitespace; normalize HTML entities to their text form; stable attribute
  handling for links (`href` preserved, other attributes dropped from the MD projection).
- Anything outside this mapping is preserved in the HTML but is **not** part of a `two_way` region
  (it can still appear in a `pull_only` projection, flattened).

Any change to these rules is a `normalizer_version` bump plus an intentional re-pull baseline.

## Two-way markers and push rules

A `two_way` region is delimited in the HTML by paired comments:

```html
<section class="project-overview">
  <h2>Overview</h2>
  <!-- content-sync:start dicee.overview -->
  <p>Family-friendly multiplayer dice game…</p>
  <p>Solo development from architecture through deployment…</p>
  <!-- content-sync:end dicee.overview -->
</section>
```

`push` is **fail-closed**. It rewrites only the inner content between the markers — never the wrapper
element or its attributes — and refuses when:

- the region has no `content-sync` markers, or the `ID` is missing/duplicated;
- the Markdown uses anything outside the allowed vocabulary
  (`h2`–`h4`, `p`, `ul`/`ol`/`li`, `strong`, `em`, `a`, `code`, `blockquote`);
- `html_hash` no longer matches the current HTML region (un-pulled change → potential conflict);
- there is no matching registry entry.

Push emits at the marker block's indentation so the diff stays minimal.

Each `two_way` region is mirrored to its own file `docs/content/regions/<id>.md` (frontmatter
`type: region`, `page`, `marker`, `content_hash`, `html_hash`). That region file — **not** the
whole-page `pages/*.md` projection — is the push source: edit it, then `content:push`. After a push,
run `content:pull` to refresh the page-level projection, which the push intentionally leaves stale
(surfaced by `content:diff`).

## Round-trip promotion gate

A region is promoted to `two_way` only when `pull → push → pull` is byte-identical for **both** the
HTML region and the Markdown. This is enforced by the `region round-trip` tests in
`scripts/sync-content.test.mjs`.

## `content:check` semantics (integrity, not currency)

`check` validates and never writes. It fails on:

- registry references a missing file, or a file has no registry entry;
- duplicate IDs;
- a `two_way` region missing its markers;
- Markdown in a `two_way` region using illegal vocabulary;
- a stored `content_hash` that disagrees with the committed Markdown body.

It does **not** require HTML and Markdown to be mutually current — drift is surfaced by `content:diff`
and resolved by an intentional `pull`/`push`. As of PR-2, `check` runs inside `mise run ci`
(integrity only), so a stale or orphaned mirror file fails CI while HTML edits do not.

## Rollout

- **PR-0 (done):** ADR-0010 + this spec + `docs/content/README.md`. No code, no deps.
- **PR-1 (done):** `scripts/sync-content.mjs` (`pull`/`diff`/`check`), `parse5`, `registry.yaml`,
  3 pages, `scripts/sync-content.test.mjs`. `check` not yet in CI.
- **PR-2 (done):** the initial 15 authored pages mirrored (`projects/index.html` excluded as
  generated); the registry now contains 16 after the anonymized governance route was added.
  integrity `check` wired into `mise run ci`.
- **PR-3 (done):** first `two_way` region (`dicee.overview`) with content-sync markers, fail-closed
  `push` (constrained MD→HTML renderer), and round-trip idempotency tests.

## Tests

- deterministic pull output (same HTML → same MD);
- unchanged `content_hash` does not rewrite the file;
- ID persists through a title/slug/route change when the registry maps it;
- stable registry ordering;
- known-fixture conversion (a pinned page → expected MD);
- (PR-3) round-trip idempotency per `two_way` region;
- (PR-3) push refuses on missing marker, illegal vocabulary, and stale `html_hash`.

## Known v1 simplifications (`normalizer_version: 1`)

- The whole `<main>` is flattened, so **in-`main` back-nav and CTA links** (e.g. "← Back to work",
  "Visit live site ↗") appear in the `pull_only` body. Site-level nav/footer/skip-link are excluded
  by scoping to `<main>`. Class-based content filtering of in-`main` chrome is deferred to a later
  `normalizer_version` (candidate for PR-2) so v1 stays deterministic and rule-simple.
- Structural wrappers (`div`/`section`/`article`/`header`) are unwrapped; their classes do not appear
  in the mirror. This is expected — the mirror is a content projection, not a layout copy.

## Open items (tracked, not blocking)

- Which specific prose regions get promoted to `two_way` first (candidate: `dicee.overview`).
- Whether `title`/`description` from `<head>` are whitelisted into frontmatter or left out of scope.
- Optional non-blocking CI annotation that reports N drifted regions from `content:diff`.
