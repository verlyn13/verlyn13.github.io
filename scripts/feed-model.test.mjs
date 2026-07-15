import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { copyFileSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { test } from 'node:test'
import { buildViewModel, computePortfolio, feedEnvelopeErrors, readFeed } from './feed-model.mjs'

const feed = readFeed()
const model = buildViewModel(feed)
const cloneFeed = () => structuredClone(feed)

test('the accepted feed passes whole-envelope admission', () => {
  assert.deepEqual(feedEnvelopeErrors(feed), [])
})

const invalidEnvelopeCases = [
  [
    'unsupported schema',
    (candidate) => {
      candidate.schemaVersion = '99'
    },
    /schemaVersion must be one of/,
  ],
  [
    'missing projects array',
    (candidate) => {
      candidate.projects = null
    },
    /projects must be an array/,
  ],
  [
    'dirty KB',
    (candidate) => {
      candidate.provenance.kbDirty = true
    },
    /provenance\.kbDirty must be false/,
  ],
  [
    'missing staleness verdict',
    (candidate) => {
      delete candidate.provenance.stale
    },
    /provenance\.stale must be false/,
  ],
  [
    'degraded manifest mode',
    (candidate) => {
      candidate.provenance.degradedNoManifests = true
    },
    /provenance\.degradedNoManifests must be false/,
  ],
  [
    'missing manifest health',
    (candidate) => {
      delete candidate.provenance.manifestHealth
    },
    /provenance\.manifestHealth must be an object/,
  ],
  [
    'non-passing manifest health',
    (candidate) => {
      candidate.provenance.manifestHealth.status = 'skipped'
    },
    /provenance\.manifestHealth\.status must be "pass"/,
  ],
  [
    'manifest error summary',
    (candidate) => {
      candidate.provenance.manifestHealth.errorCount = 1
    },
    /provenance\.manifestHealth\.errorCount must be 0/,
  ],
  [
    'inconsistent manifest error detail',
    (candidate) => {
      candidate.provenance.manifestHealth.validationErrorCount = 1
    },
    /provenance\.manifestHealth\.validationErrorCount must be 0/,
  ],
  [
    'selected project missing a manifest',
    (candidate) => {
      candidate.provenance.selectedManifestMissingCount = 1
    },
    /provenance\.selectedManifestMissingCount must be 0/,
  ],
  [
    'selected project disagrees with its manifest',
    (candidate) => {
      candidate.provenance.selectedManifestDisagreementCount = 1
    },
    /provenance\.selectedManifestDisagreementCount must be 0/,
  ],
  [
    'malformed selected-manifest count',
    (candidate) => {
      candidate.provenance.selectedManifestMissingCount = '0'
    },
    /provenance\.selectedManifestMissingCount must be a non-negative integer/,
  ],
  [
    'duplicate project ID',
    (candidate) => {
      candidate.projects.push(structuredClone(candidate.projects[0]))
      candidate.portfolio.projectCount += 1
    },
    /duplicates project id/,
  ],
  [
    'portfolio count mismatch',
    (candidate) => {
      candidate.portfolio.projectCount += 1
    },
    /portfolio\.projectCount must equal projects\.length/,
  ],
  [
    'malformed public linkability',
    (candidate) => {
      candidate.projects.find((project) => project.id === 'dicee').publicLinkable = 'false'
    },
    /publicLinkable must be a boolean when present/,
  ],
]

for (const [name, mutate, expected] of invalidEnvelopeCases) {
  test(`whole-envelope admission rejects ${name}`, () => {
    const candidate = cloneFeed()
    mutate(candidate)
    assert.match(feedEnvelopeErrors(candidate).join('\n'), expected)
    assert.throws(() => buildViewModel(candidate), /Project feed rejected/)
  })
}

test('legacy schema-0 feeds may omit selected-manifest counts during compatibility cutover', () => {
  const candidate = cloneFeed()
  delete candidate.provenance.selectedManifestMissingCount
  delete candidate.provenance.selectedManifestDisagreementCount
  assert.deepEqual(feedEnvelopeErrors(candidate), [])
})

test('provenance CLI rejects an invalid feed when there are zero feed comments', () => {
  const fixtureRoot = mkdtempSync(path.join(tmpdir(), 'website-feed-provenance-'))
  try {
    mkdirSync(path.join(fixtureRoot, 'scripts'), { recursive: true })
    mkdirSync(path.join(fixtureRoot, 'public/data'), { recursive: true })
    copyFileSync(
      new URL('./check-source-provenance.mjs', import.meta.url),
      path.join(fixtureRoot, 'scripts/check-source-provenance.mjs'),
    )
    copyFileSync(
      new URL('./feed-model.mjs', import.meta.url),
      path.join(fixtureRoot, 'scripts/feed-model.mjs'),
    )

    const candidate = cloneFeed()
    candidate.provenance.kbDirty = true
    writeFileSync(
      path.join(fixtureRoot, 'public/data/projects.json'),
      `${JSON.stringify(candidate, null, 2)}\n`,
    )
    writeFileSync(
      path.join(fixtureRoot, 'scripts/provenance-producers.json'),
      `${JSON.stringify([
        {
          name: 'fixture-feed',
          kind: 'feed',
          feedPath: 'public/data/projects.json',
          requireFeedFile: true,
          surfaceGlobs: ['.'],
          leakChecks: { forbidStrings: [], failIfDirtyTrue: true },
        },
      ])}\n`,
    )

    const result = spawnSync(process.execPath, ['scripts/check-source-provenance.mjs'], {
      cwd: fixtureRoot,
      encoding: 'utf8',
    })
    assert.equal(result.status, 1)
    assert.match(result.stderr, /provenance\.kbDirty must be false/)
  } finally {
    rmSync(fixtureRoot, { recursive: true, force: true })
  }
})

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
  const { portfolio: _portfolio, ...feedWithoutPortfolio } = feed
  const fallback = buildViewModel(feedWithoutPortfolio).portfolio
  const expectedDeployed = feed.projects.filter(
    (project) =>
      project.posture?.evidenceClass === 'deployed-system' &&
      project.publicLinkable !== false &&
      project.deploymentUrls?.length,
  ).length
  assert.equal(fallback.source, 'local')
  assert.ok(fallback.domains.length > 0)
  assert.ok(fallback.languages.length > 0)
  assert.equal(fallback.deployedCount, expectedDeployed)
  assert.equal(fallback.firstActive, null) // asOf-only span left null until the feed sources it
})

test('portfolio rollup adopts feed.portfolio when present', () => {
  const withPortfolio = {
    ...feed,
    portfolio: {
      projectCount: feed.projects.length,
      domains: ['agents', 'web'],
      languages: ['Python', 'TypeScript'],
      deployedCount: 2,
      firstActive: '2009-09',
      lastActive: '2026-06-11T23:12:51Z',
      recurringMethods: ['governance-driven-development', 'agentic-dev-evolution'],
    },
  }
  const p = buildViewModel(withPortfolio).portfolio
  assert.equal(p.source, 'feed')
  assert.equal(p.firstActive, '2009-09')
  assert.deepEqual(p.recurringMethods, ['governance-driven-development', 'agentic-dev-evolution'])
  assert.equal(p.deployedCount, 2)
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

test('client-deliverable receives its own presentation group', () => {
  const candidate = cloneFeed()
  const scopecam = candidate.projects.find((project) => project.id === 'scopecam')
  scopecam.posture.evidenceClass = 'client-deliverable'

  const group = buildViewModel(candidate).groups.find((entry) => entry.key === 'client-deliverable')
  assert.equal(group.label, 'Client deliverables')
  assert.deepEqual(
    group.projects.map((project) => project.id),
    ['scopecam'],
  )
})

test('publicLinkable false suppresses a deployment URL without hiding the detail page', () => {
  const candidate = cloneFeed()
  const dicee = candidate.projects.find((project) => project.id === 'dicee')
  dicee.publicLinkable = false
  assert.ok(dicee.deploymentUrls.length > 0)

  const entry = buildViewModel(candidate).projects.find((project) => project.id === 'dicee')
  assert.equal(entry.publicLinkable, false)
  assert.equal(entry.live, null)
  assert.equal(entry.href, '/projects/dicee.html')
})

test('fallback deployment count includes Dicee and Symmetry Groups but excludes no-link Flux', () => {
  const candidate = cloneFeed()
  delete candidate.portfolio

  for (const id of ['dicee', 'symmetry-groups', 'flux']) {
    const project = candidate.projects.find((entry) => entry.id === id)
    project.posture = {
      ...project.posture,
      allowsLive: true,
      badge: 'deployed',
      evidenceClass: 'deployed-system',
    }
    project.deploymentUrls = [`https://example.com/${id}`]
    project.publicLinkable = id !== 'flux'
  }

  const candidateModel = buildViewModel(candidate)
  assert.equal(candidateModel.portfolio.deployedCount, 2)
  assert.equal(candidateModel.projects.find((project) => project.id === 'flux').live, null)
})
