import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// Data layer for the project-intelligence feed -> HTML build (P0, design-independent).
// Reads public/data/projects.json and produces a normalized, grouped, metric-annotated
// view model that the (forthcoming) templater renders. No HTML/template concerns here.
// Contract + presentation: docs/project-intelligence.md (§5, §7), docs/adr/0009-project-intelligence-feed.md.

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const FEED_PATH = 'public/data/projects.json'
const PROJECT_PAGE_DIR = 'projects'
const SUPPORTED_SCHEMA_VERSIONS = new Set(['0'])

// These manifest-health fields are optional in older schema-0 feeds, but any
// present nonzero value contradicts a passing health summary.
const MANIFEST_ERROR_COUNT_FIELDS = [
  'duplicateConflictCount',
  'remoteAmbiguityCount',
  'validationErrorCount',
  'missingIdCount',
  'unjoinedCount',
  'graphErrorCount',
]

// evidenceClass -> display label + sort order (the §S2 grouping). Editorial defaults:
// the design pass may revise labels/order; membership is the feed's, not ours.
const KINDS = [
  { key: 'working-prototype', label: 'Working prototypes' },
  { key: 'client-deliverable', label: 'Client deliverables' },
  { key: 'public-package', label: 'Released packages' },
  { key: 'deployed-system', label: 'Shipped systems' },
  { key: 'published-artifact', label: 'Published research' },
  { key: 'course-taught', label: 'Teaching' },
]
const KIND_BY_KEY = new Map(KINDS.map((k, i) => [k.key, { ...k, order: i }]))
const UNKNOWN_KIND = { key: 'other', label: 'Other', order: KINDS.length }

// Feed slug -> detail-page basename, where they differ (most match 1:1).
const PAGE_ALIASES = { 'budget-triage-fintech': 'budget-triage' }

export function readFeed(feedPath = FEED_PATH) {
  return JSON.parse(readFileSync(path.join(root, feedPath), 'utf8'))
}

const isRecord = (value) => value !== null && typeof value === 'object' && !Array.isArray(value)

function checkZeroCount(errors, owner, field, required = false) {
  const value = owner?.[field]
  if (value === undefined && !required) return
  if (!Number.isInteger(value) || value < 0) {
    errors.push(`${field} must be a non-negative integer`)
  } else if (value !== 0) {
    errors.push(`${field} must be 0 (received ${value})`)
  }
}

// Whole-feed admission is independent of rendered `feed:` comments. Keep this
// pure so the model, build, provenance checker, and tests share one contract.
export function feedEnvelopeErrors(feed) {
  const errors = []
  if (!isRecord(feed)) return ['feed must be a JSON object']

  if (!SUPPORTED_SCHEMA_VERSIONS.has(feed.schemaVersion)) {
    errors.push(
      `schemaVersion must be one of ${[...SUPPORTED_SCHEMA_VERSIONS].join(', ')} ` +
        `(received ${JSON.stringify(feed.schemaVersion)})`,
    )
  }

  const projects = feed.projects
  if (!Array.isArray(projects)) {
    errors.push('projects must be an array')
  } else {
    const seenIds = new Set()
    for (const [index, project] of projects.entries()) {
      const id = project?.id
      if (typeof id !== 'string' || id.length === 0) {
        errors.push(`projects[${index}].id must be a non-empty string`)
      } else if (seenIds.has(id)) {
        errors.push(`projects[${index}].id duplicates project id "${id}"`)
      } else {
        seenIds.add(id)
      }

      if (project?.schemaVersion !== undefined && project.schemaVersion !== feed.schemaVersion) {
        errors.push(
          `projects[${index}].schemaVersion must match feed schemaVersion ` +
            `${JSON.stringify(feed.schemaVersion)}`,
        )
      }

      if (project?.publicLinkable !== undefined && typeof project.publicLinkable !== 'boolean') {
        errors.push(`projects[${index}].publicLinkable must be a boolean when present`)
      }
    }
  }

  const provenance = feed.provenance
  if (!isRecord(provenance)) {
    errors.push('provenance must be an object')
  } else {
    for (const field of ['kbDirty', 'stale', 'degradedNoManifests']) {
      if (provenance[field] !== false) errors.push(`provenance.${field} must be false`)
    }

    const health = provenance.manifestHealth
    if (!isRecord(health)) {
      errors.push('provenance.manifestHealth must be an object')
    } else {
      if (health.status !== 'pass') {
        errors.push('provenance.manifestHealth.status must be "pass"')
      }
      const healthErrors = []
      checkZeroCount(healthErrors, health, 'errorCount', true)
      for (const field of MANIFEST_ERROR_COUNT_FIELDS) {
        checkZeroCount(healthErrors, health, field)
      }
      errors.push(...healthErrors.map((error) => `provenance.manifestHealth.${error}`))
    }

    // The accepted legacy schema-0 feed predates these fields. During the
    // compatibility-first cutover, absence is allowed; any present value must
    // be an integer zero. A later schema discriminator can require presence.
    const selectedErrors = []
    checkZeroCount(selectedErrors, provenance, 'selectedManifestMissingCount')
    checkZeroCount(selectedErrors, provenance, 'selectedManifestDisagreementCount')
    errors.push(...selectedErrors.map((error) => `provenance.${error}`))
  }

  if (feed.portfolio !== undefined) {
    if (!isRecord(feed.portfolio)) {
      errors.push('portfolio must be an object when present')
    } else if (!Number.isInteger(feed.portfolio.projectCount)) {
      errors.push('portfolio.projectCount must be an integer')
    } else if (Array.isArray(projects) && feed.portfolio.projectCount !== projects.length) {
      errors.push(
        `portfolio.projectCount must equal projects.length ` +
          `(${feed.portfolio.projectCount} !== ${projects.length})`,
      )
    }
  }

  return errors
}

export function assertFeedEnvelope(feed) {
  const errors = feedEnvelopeErrors(feed)
  if (errors.length > 0) {
    throw new Error(`Project feed rejected:\n- ${errors.join('\n- ')}`)
  }
  return feed
}

function resolveDetailHref(slug) {
  const base = PAGE_ALIASES[slug] ?? slug
  const rel = `${PROJECT_PAGE_DIR}/${base}.html`
  return existsSync(path.join(root, rel)) ? `/${rel}` : null
}

function yearOf(date) {
  return typeof date === 'string' && /^\d{4}/.test(date) ? Number(date.slice(0, 4)) : null
}

function kindOf(evidenceClass) {
  return KIND_BY_KEY.get(evidenceClass) ?? UNKNOWN_KIND
}

// Normalize one feed project into a flat presentation entry. v1 fields (scope/decisions/
// activity/method) surface when the feed carries them, null otherwise (P1-P3).
export function toEntry(project) {
  const kind = kindOf(project.posture?.evidenceClass)
  const publicLinkable =
    project.publicLinkable === undefined ? true : project.publicLinkable === true
  const liveUrl = publicLinkable ? (project.deploymentUrls?.[0] ?? null) : null
  // Per-project recency is `asOf`; freshness.maxUpdatedAt is feed-wide (identical across
  // projects), so it lives in top-level provenance, not here.
  const lastActive = project.asOf && project.asOf !== 'unknown' ? project.asOf : null
  return {
    id: project.id,
    slug: project.slug,
    title: project.title,
    displayName: project.displayName,
    thesis: project.thesis,
    href: resolveDetailHref(project.slug),
    kind: { key: kind.key, label: kind.label },
    badge: project.posture?.badge ?? null,
    operationalState: project.operationalState ?? null,
    publicLinkable,
    status: project.statusLine ?? null,
    domains: project.domains ?? [],
    tech: project.tech ?? [],
    live: liveUrl ? { url: liveUrl } : null,
    asOf: project.asOf ?? 'unknown',
    lastActive,
    year: yearOf(lastActive),
    visibility: project.tier?.portfolioVisibility ?? null,
    promoted: project.tier?.portfolioVisibility === 'public-promoted',
    scope: project.scope ?? null,
    decisions: project.decisions ?? null,
    activity: project.activity ?? null,
    method: project.method ?? null,
  }
}

const distinctSorted = (entries, key) =>
  [...new Set(entries.flatMap((e) => e[key] ?? []))].sort((a, b) => a.localeCompare(b))

// Honest "deployed" count: a deployed-system kind with a live URL (relay 2026-06-17 §2).
const localDeployed = (entries) =>
  entries.filter((e) => e.kind.key === 'deployed-system' && e.live).length

// Portfolio rollup: adopt the feed's authoritative top-level `portfolio{}` when present,
// else derive from projects[] (contract / relay 2026-06-17 §2 — "stop deriving facts the
// feed can source"). Absent-tolerant: a per-surface adoption, not a flip. `kinds` stays
// local — the feed has no grouping equivalent.
export function computePortfolio(entries, feed) {
  const kinds = KINDS.map(({ key, label }) => ({
    key,
    label,
    count: entries.filter((e) => e.kind.key === key).length,
  })).filter((k) => k.count > 0)

  const fp = feed?.portfolio
  if (fp) {
    return {
      source: 'feed',
      projectCount: fp.projectCount ?? entries.length,
      domains: fp.domains ?? distinctSorted(entries, 'domains'),
      languages: fp.languages ?? distinctSorted(entries, 'tech'),
      deployedCount: fp.deployedCount ?? localDeployed(entries),
      firstActive: fp.firstActive ?? null,
      lastActive: fp.lastActive ?? null,
      recurringMethods: fp.recurringMethods ?? [],
      kinds,
    }
  }
  return {
    source: 'local',
    projectCount: entries.length,
    domains: distinctSorted(entries, 'domains'),
    languages: distinctSorted(entries, 'tech'),
    deployedCount: localDeployed(entries),
    // asOf-only dates are too narrow for an honest span; left null until the feed sources
    // firstActive/lastActive from KB timeframe (relay §2 — the real span starts 2009).
    firstActive: null,
    lastActive: null,
    recurringMethods: [],
    kinds,
  }
}

export function groupByKind(entries) {
  const byKey = new Map()
  for (const entry of entries) {
    const list = byKey.get(entry.kind.key) ?? []
    list.push(entry)
    byKey.set(entry.kind.key, list)
  }
  return [...byKey.entries()]
    .map(([key, list]) => ({
      key,
      label: list[0].kind.label,
      order: kindOf(key).order,
      projects: list.sort(
        (a, b) => (b.year ?? 0) - (a.year ?? 0) || a.title.localeCompare(b.title),
      ),
    }))
    .sort((a, b) => a.order - b.order)
}

export function buildViewModel(feed = readFeed()) {
  assertFeedEnvelope(feed)
  const entries = (feed.projects ?? []).map(toEntry)
  return {
    generatedAt: feed.generatedAt ?? null,
    provenance: {
      kbSha: feed.provenance?.kbSha ?? null,
      kbDirty: feed.provenance?.kbDirty ?? null,
      stale: feed.provenance?.stale ?? null,
      maxUpdatedAt: feed.provenance?.maxUpdatedAt ?? null,
    },
    portfolio: computePortfolio(entries, feed),
    groups: groupByKind(entries),
    projects: entries,
  }
}

export { KINDS }

// CLI: `node scripts/feed-model.mjs` prints a summary; add `--json` to dump the full model.
function main() {
  const model = buildViewModel()
  if (process.argv.includes('--json')) {
    console.log(JSON.stringify(model, null, 2))
    return
  }
  const { portfolio, groups } = model
  console.log(`project-intelligence view model — ${portfolio.projectCount} projects`)
  console.log(
    `  ${portfolio.source} rollup · ${portfolio.domains.length} domains · ` +
      `${portfolio.languages.length} languages · ${portfolio.deployedCount} deployed` +
      `${portfolio.firstActive ? ` · since ${portfolio.firstActive}` : ''}`,
  )
  for (const group of groups) {
    console.log(`\n  ${group.label} (${group.projects.length})`)
    for (const p of group.projects) {
      console.log(`    · [${p.year ?? '????'}] ${p.href ? '→' : ' '} ${p.title.slice(0, 60)}`)
    }
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main()
}
