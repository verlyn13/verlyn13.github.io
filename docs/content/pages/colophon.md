---
id: page_colophon
type: page
source_file: colophon.html
source_selector: main
route: /colophon.html
content_hash: 0251c20450f8107bb459e2b74f5853fcbfb4d7713e34ab383760642a74bede9b
html_hash: 695f6b0eaae8ccc699e9d96c5d6fc5b7c585bfc03db573e4a7c63f38e6e465cf
normalizer_version: 1
sync_direction: html_to_markdown
protected_fields: [id, type, source_file, source_selector, normalizer_version]
---

← Back to Portfolio

# Colophon

How this portfolio is published

The portfolio's project feed is machine-generated, provenance-checked, and approval-gated. What was once a hand-maintained surface is now a governed feed: source data is validated, transformed into a public JSON feed, checked for provenance and accidental disclosure, delivered only when its content changes, and published to this site only after human review.

## The publishing pipeline

A scheduled job turns a controlled inventory into the feed and proposes the update. The automation prepares the change; the operator decides what deploys.

The publishing pipeline runs in three stages. Source of truth: a controlled inventory is validated. Automation: a feed is generated, an unchanged feed is suppressed by a no-op diff gate, and a draft change is opened carrying provenance and leak checks. Public site: the operator merges the change, which deploys to the live site.

Source of truth

1. meta-inventory
2. validate

Automation

1. generate feed
2. no-op diff gate
3. draft change + checks

Public site

1. human merge
2. jvjohnson.dev

Each run regenerates the feed from a pinned source revision, compares it against what is already published, and opens a draft change only when the content actually differs. That draft carries a provenance and leak check; merging it is a deliberate, manual step.

## What the feed carries

The feed is a public artifact with a stable shape. Each record states what it is, how current it is, and where it came from.

- Current live feed Public JSON feed Published at [`/data/projects.json`](/data/projects.json) with a versioned schema.
- Freshness Scheduled cadence Refreshed on a schedule with content-change detection; every record carries an `asOf` date.
- Deployment gate Merge to deploy Automation opens a draft change; merging it to the live site is a manual step.
- No-op behavior Suppressed when unchanged A refresh whose content is identical opens no change at all.

## Guarantees

- The feed records whether its source was clean (`kbDirty: false`); a build from an unclean source is blocked.
- Every record is provenance-stamped with the exact source revision and the time it was generated.
- A provenance and leak check runs on every change before it can merge.
- Nothing reaches the live site without human review — the merge is the gate.

## The feed is public

Freshness here is a scheduled cadence with content-change detection — not a real-time stream. Because the feed is public, the claims above are checkable: read the raw JSON at [`/data/projects.json`](/data/projects.json).
