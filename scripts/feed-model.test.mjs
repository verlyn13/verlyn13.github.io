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

test('portfolio metrics are populated', () => {
  assert.ok(model.portfolio.domains.length > 0)
  assert.ok(model.portfolio.languages.length > 0)
  assert.ok(model.portfolio.liveCount >= 1) // dicee is live
  assert.ok(model.portfolio.firstActive && model.portfolio.lastActive)
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
