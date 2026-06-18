import assert from 'node:assert/strict'
import { test } from 'node:test'
import { buildViewModel, computePortfolio, readFeed } from './feed-model.mjs'

const feed = readFeed()
const model = buildViewModel(feed)

test('every feed project appears in exactly one group', () => {
  const grouped = model.groups.flatMap((g) => g.projects.map((p) => p.id))
  assert.equal(grouped.length, feed.projects.length)
  assert.equal(new Set(grouped).size, feed.projects.length)
})

test('portfolio.projectCount matches the feed', () => {
  assert.equal(model.portfolio.projectCount, feed.projects.length)
})

test('groups are in configured kind order', () => {
  const orders = model.groups.map((g) => g.order)
  assert.deepEqual(
    orders,
    [...orders].sort((a, b) => a - b),
  )
})

test('within a group, projects are reverse-chronological', () => {
  for (const group of model.groups) {
    const years = group.projects.map((p) => p.year ?? 0)
    assert.deepEqual(
      years,
      [...years].sort((a, b) => b - a),
    )
  }
})

test('detail href resolves to existing pages only (incl. the alias)', () => {
  const byId = new Map(model.projects.map((p) => [p.id, p]))
  assert.equal(byId.get('dicee').href, '/projects/dicee.html')
  assert.equal(byId.get('budget-triage-fintech').href, '/projects/budget-triage.html')
  assert.equal(byId.get('academic-career-auc').href, null)
})

test('portfolio rollup (local fallback) is populated and honest', () => {
  assert.equal(model.portfolio.source, 'local')
  assert.ok(model.portfolio.domains.length > 0)
  assert.ok(model.portfolio.languages.length > 0)
  assert.equal(model.portfolio.deployedCount, 1) // dicee: deployed-system + live
  assert.equal(model.portfolio.firstActive, null) // asOf-only span left null until the feed sources it
})

test('portfolio rollup adopts feed.portfolio when present', () => {
  const withPortfolio = {
    ...feed,
    portfolio: {
      projectCount: 14,
      domains: ['agents', 'web'],
      languages: ['Python', 'TypeScript'],
      deployedCount: 1,
      firstActive: '2009-09',
      lastActive: '2026-06-11T23:12:51Z',
      recurringMethods: ['governance-driven-development', 'agentic-dev-evolution'],
    },
  }
  const p = buildViewModel(withPortfolio).portfolio
  assert.equal(p.source, 'feed')
  assert.equal(p.firstActive, '2009-09')
  assert.deepEqual(p.recurringMethods, ['governance-driven-development', 'agentic-dev-evolution'])
  assert.equal(p.deployedCount, 1)
  assert.ok(p.kinds.length > 0) // kinds stay locally derived
})

test("'unknown' asOf yields a null year, not a crash", () => {
  const auc = model.projects.find((p) => p.id === 'academic-career-auc')
  assert.equal(auc.asOf, 'unknown')
  assert.equal(auc.year, null)
})

test('kind buckets only count non-empty evidence classes', () => {
  for (const kind of model.portfolio.kinds) assert.ok(kind.count > 0)
})

test('v1 enrichment fields are present and null under schema v0', () => {
  const sample = model.projects[0]
  assert.equal(sample.scope, null)
  assert.equal(sample.decisions, null)
  assert.equal(sample.activity, null)
})

test('computePortfolio is pure over its entries', () => {
  const a = computePortfolio(model.projects)
  const b = computePortfolio(model.projects)
  assert.deepEqual(a, b)
})

test('curated front tier: flagship first, then supporting', () => {
  const ids = model.featured.map((p) => p.id)
  assert.deepEqual(ids, ['budget-triage-fintech', 'dicee', 'host-capability-substrate'])
  assert.equal(model.featured[0].flagship, true)
  assert.equal(model.featured[1].flagship, false)
})
