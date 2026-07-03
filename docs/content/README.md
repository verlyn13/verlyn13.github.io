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
pages/            # mirrored Markdown, mirroring route structure
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
- **`two_way` regions may be hand-edited, then `push`ed.** `push` is fail-closed: it only rewrites the
  inner content between `<!-- content-sync:start ID -->` / `<!-- content-sync:end ID -->` markers,
  never structure or attributes, and only accepts a constrained Markdown vocabulary.
- **Drift is allowed and visible.** The mirror may lag the HTML between intentional syncs;
  `content:diff` surfaces it. CI checks integrity, not currency.
- **Deletes need a tombstone.** Record removals in `changes.yaml`; do not silently delete a mirrored
  file whose ID is in the registry.

Populated starting in PR-1 (see the rollout in `docs/markdown-mirror.md`).
