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

// evidenceClass -> display label + sort order (the §S2 grouping). Editorial defaults:
// the design pass may revise labels/order; membership is the feed's, not ours.
const KINDS = [
  { key: 'deployed-system', label: 'Shipped systems' },
  { key: 'working-prototype', label: 'Working prototypes' },
  { key: 'public-package', label: 'Released packages' },
  { key: 'published-artifact', label: 'Published research' },
  { key: 'course-taught', label: 'Teaching' },
]
const KIND_BY_KEY = new Map(KINDS.map((k, i) => [k.key, { ...k, order: i }]))
const UNKNOWN_KIND = { key: 'other', label: 'Other', order: KINDS.length }

// Feed slug -> detail-page basename, where they differ (most match 1:1).
const PAGE_ALIASES = { 'budget-triage-fintech': 'budget-triage' }

// Editorial: ids of the curated front tier. Empty until the operator/design picks them;
// `promoted` (tier.portfolioVisibility) is exposed separately as a feed fact, not curation.
const FEATURED_IDS = []

export function readFeed(feedPath = FEED_PATH) {
  return JSON.parse(readFileSync(path.join(root, feedPath), 'utf8'))
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
  const liveUrl = project.deploymentUrls?.[0] ?? null
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

function countBy(entries, key) {
  const counts = new Map()
  for (const entry of entries) {
    for (const value of entry[key] ?? []) counts.set(value, (counts.get(value) ?? 0) + 1)
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}

export function computePortfolio(entries) {
  const years = entries.map((e) => e.year).filter((y) => typeof y === 'number')
  const kinds = KINDS.map(({ key, label }) => ({
    key,
    label,
    count: entries.filter((e) => e.kind.key === key).length,
  })).filter((k) => k.count > 0)
  return {
    projectCount: entries.length,
    domains: countBy(entries, 'domains'),
    languages: countBy(entries, 'tech'),
    liveCount: entries.filter((e) => e.live).length,
    kinds,
    // Span is bounded by available `asOf` dates (many academic entries are unknown);
    // the v1 feed's scope.activeSpan will widen this. Honest to v0 today.
    firstActive: years.length ? Math.min(...years) : null,
    lastActive: years.length ? Math.max(...years) : null,
    recurringMethods: [], // filled when the feed carries method{} (P3)
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
  const entries = (feed.projects ?? []).map(toEntry)
  const byId = new Map(entries.map((e) => [e.id, e]))
  return {
    generatedAt: feed.generatedAt ?? null,
    provenance: {
      kbSha: feed.provenance?.kbSha ?? null,
      kbDirty: feed.provenance?.kbDirty ?? null,
      stale: feed.provenance?.stale ?? null,
      maxUpdatedAt: feed.provenance?.maxUpdatedAt ?? null,
    },
    portfolio: computePortfolio(entries),
    groups: groupByKind(entries),
    featured: FEATURED_IDS.map((id) => byId.get(id)).filter(Boolean),
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
    `  span ${portfolio.firstActive ?? '?'}–${portfolio.lastActive ?? '?'} · ` +
      `${portfolio.domains.length} domains · ${portfolio.languages.length} languages · ` +
      `${portfolio.liveCount} live`,
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
