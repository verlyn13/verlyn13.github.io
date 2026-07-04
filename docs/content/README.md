# docs/content/ — Markdown mirror (sidecar)

A committed, generated-but-reviewed Markdown mirror of the site's content-bearing regions. It exists
for portability, search, reading, and downstream tooling. **The HTML is authoritative** — this tree
complements it and never drives the deployed site.

> Contract and normalization rules: [`docs/markdown-mirror.md`](../markdown-mirror.md).
> Rationale: [`docs/adr/0010-structured-markdown-mirror.md`](../adr/0010-structured-markdown-mirror.md).

## Layout

```
registry.yaml     # id ↔ file ↔ source map (the sync map)
changes.yaml      # human-curated tombstone / decision log
pages/            # whole-<main> pull_only projection, mirroring route structure
regions/          # <id>.md — editable, push-able two_way units
```

## How to use it

Sync is intentional and directional — you choose the direction each time. Nothing here syncs
automatically, at build time, or in the background.

```bash
npm run content:pull    # HTML → Markdown (refresh the mirror from the site)
npm run content:push    # Markdown → HTML (write edits back into marked prose regions only)
npm run content:diff    # show what a pull/push would change, without writing
npm run content:check   # integrity gate: registry, files, hashes, ids, markers, vocabulary
```

## Rules of the road

- **Do not hand-edit `pull_only` files.** They are regenerated from the HTML; edits are lost on the
  next `pull`. Change the HTML, then `pull`.
- **`two_way` regions may be hand-edited, then `push`ed.** Edit the region file
  `regions/<id>.md` (not the `pages/` projection), then `npm run content:push`. `push` is fail-closed:
  it only rewrites the inner content between `<!-- content-sync:start ID -->` /
  `<!-- content-sync:end ID -->` markers, never structure or attributes, only accepts a constrained
  Markdown vocabulary, and refuses if the HTML changed since the last pull (`html_hash` conflict).
  After a push, run `content:pull` to refresh the `pages/` projection.
- **Drift is allowed and visible.** The mirror may lag the HTML between intentional syncs;
  `content:diff` surfaces it. CI checks integrity, not currency.
- **Deletes need a tombstone.** Record removals in `changes.yaml`; do not silently delete a mirrored
  file whose ID is in the registry.

All 15 authored pages are mirrored (`pull_only`); `dicee.overview` is the first `two_way` region.
See the rollout and contract in `docs/markdown-mirror.md`.
