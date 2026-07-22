---
id: page_colophon
type: page
source_file: colophon.html
source_selector: main
route: /colophon.html
content_hash: a82f397b0aad74cf333219fc9f222d895a8717b41121d5872f921a1f75a01f51
html_hash: 9d1c5bbc496d64f7a0a37a0dc8421159bd7d1b80e4225846e1cb5ff26e5f26c4
normalizer_version: 1
sync_direction: html_to_markdown
protected_fields: [id, type, source_file, source_selector, normalizer_version]
---

← Back to Portfolio

# Colophon

How this portfolio is published

The project index is built from a public JSON feed. A separate inventory repository produces and validates candidate feed updates. This website validates the accepted copy again, renders it at build time, and deploys only after operator review.

## The publishing pipeline

The current path is feed-only pull-request delivery. The producer prepares a candidate artifact; the operator reviews and merges any website update.

The publishing pipeline runs in three stages. Source: a controlled inventory is validated and a public feed candidate is generated. Delivery: a feed-only pull request is prepared when configured. Website: the operator reviews and merges the change, then the site validates, builds, and deploys it.

Source of truth

1. meta-inventory
2. validate

Delivery

1. generate feed candidate
2. feed-only pull request

Public site

1. operator review
2. validate and build
3. jvjohnson.dev

The producer can open a draft feed-only pull request when its delivery target and credentials are configured. That is not an automatic publication path. Website checks cover provenance, disclosure boundaries, schema compatibility, formatting, tests, and the production build. Merging remains a deliberate operator action.

## What the feed carries

The feed is a public artifact with a stable shape. Each record states what it is, how current it is, and where it came from.

- Current live feed Public JSON feed Published at [`/data/projects.json`](/data/projects.json) with a versioned schema.
- Freshness Dated records Every record carries an `asOf` date. A newer accepted producer feed may remain pending until its separate website review is complete.
- Deployment gate Merge to deploy Feed delivery uses a separate pull request; merging it to the live site is a manual step.
- Current boundary No automatic publication Policy-based automatic publication is a possible future change, not current behavior.

## Guarantees

- The feed records whether its source was clean (`kbDirty: false`); a build from an unclean source is blocked.
- Every record is provenance-stamped with the exact source revision and the time it was generated.
- A provenance and leak check runs on every change before it can merge.
- Nothing reaches the live site without operator review. The merge is the gate.

## The feed is public

The published feed is a dated, reviewed artifact, not a real-time stream. Read the raw JSON at [`/data/projects.json`](/data/projects.json).
